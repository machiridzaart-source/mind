import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { MindmapService, MindmapNode } from '../../services/mindmap.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface NodeObject extends THREE.Mesh {
  nodeData?: MindmapNode;
  isSelected?: boolean;
}

interface LineObject extends THREE.Line {
  parentId?: string;
  childId?: string;
}

@Component({
  selector: 'app-mindmap-visualizer',
  templateUrl: './mindmap-visualizer.component.html',
  styleUrls: ['./mindmap-visualizer.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class MindmapVisualizerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // UI state
  controlsPanelMinimized = false;
  showAddNodeModal = false;
  addNodeModalMinimized = false;
  newNodeLabel = '';
  newNodeParentId = '';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private nodeObjects = new Map<string, NodeObject>();
  private lineObjects = new Map<string, LineObject>();
  private selectedNode: NodeObject | null = null;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private isDragging = false;
  private dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private dragPoint = new THREE.Vector3();
  private controls!: { position: THREE.Vector3; target: THREE.Vector3; zoom: number };

  // Camera movement controls
  private cameraTarget = new THREE.Vector3(0, 0, 0);
  private cameraDistance = 800;
  private sphericalCoords = { theta: 0, phi: Math.PI / 4 };
  private previousMouse = new THREE.Vector2();
  private isOrbiting = false;
  private isPanning = false;
  private mouseButton = 0;

  private destroy$ = new Subject<void>();

  constructor(private mindmapService: MindmapService) {}

  ngOnInit(): void {
    this.mindmapService.getMindmap()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateVisualization();
      });
  }

  ngAfterViewInit(): void {
    this.initializeThreeJS();
    this.setupEventListeners();
    this.animate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.renderer.dispose();
  }

  private initializeThreeJS(): void {
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    this.cameraTarget.set(0, 0, 0);
    this.cameraDistance = 800;
    this.updateCameraPosition();

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(500, 500, 500);
    this.scene.add(directionalLight);

    // Initialize controls state
    this.controls = {
      position: this.camera.position.clone(),
      target: new THREE.Vector3(0, 0, 0),
      zoom: 1
    };

    // Create initial mindmap visualization
    this.updateVisualization();
  }

  private updateVisualization(): void {
    const nodes = this.mindmapService.getNodes();

    // Remove old node objects that no longer exist
    this.nodeObjects.forEach((nodeObject, nodeId) => {
      if (!nodes.has(nodeId)) {
        this.scene.remove(nodeObject);
        this.nodeObjects.delete(nodeId);
      }
    });

    // Update or create node objects
    nodes.forEach((nodeData: MindmapNode, nodeId: string) => {
      let nodeObject = this.nodeObjects.get(nodeId);

      if (!nodeObject) {
        nodeObject = this.createNodeMesh(nodeData);
        this.nodeObjects.set(nodeId, nodeObject);
        this.scene.add(nodeObject);
      } else {
        nodeObject.position.set(nodeData.x, nodeData.y, nodeData.z);
        nodeObject.nodeData = nodeData;
      }
    });

    // Update lines
    this.updateLines();
  }

  private createNodeMesh(nodeData: MindmapNode): NodeObject {
    const geometry = new THREE.SphereGeometry(30, 32, 32);
    const color = new THREE.Color(nodeData.color || '#FF6B6B');
    const material = new THREE.MeshPhongMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material) as NodeObject;

    sphere.position.set(nodeData.x, nodeData.y, nodeData.z);
    sphere.nodeData = nodeData;
    sphere.isSelected = false;

    // Add text label
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 256;

    context.fillStyle = '#ffffff';
    context.font = 'bold 24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(nodeData.label, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    const labelGeometry = new THREE.PlaneGeometry(60, 60);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.z = 35;
    sphere.add(labelMesh);

    return sphere;
  }

  private updateLines(): void {
    const nodes = this.mindmapService.getNodes();

    // Clear old lines
    this.lineObjects.forEach(line => this.scene.remove(line));
    this.lineObjects.clear();

    // Create new lines
    nodes.forEach((nodeData: MindmapNode) => {
      if (nodeData.parentId) {
        const parentNode = this.nodeObjects.get(nodeData.parentId);
        const childNode = this.nodeObjects.get(nodeData.id);

        if (parentNode && childNode) {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(
              new Float32Array([
                parentNode.position.x, parentNode.position.y, parentNode.position.z,
                childNode.position.x, childNode.position.y, childNode.position.z
              ]),
              3
            )
          );

          const material = new THREE.LineBasicMaterial({ color: 0x888888, linewidth: 2 });
          const line = new THREE.Line(geometry, material) as LineObject;
          line.parentId = nodeData.parentId;
          line.childId = nodeData.id;

          this.scene.add(line);
          this.lineObjects.set(`${nodeData.parentId}-${nodeData.id}`, line);
        }
      }
    });
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => this.onWindowResize());
    this.canvasRef.nativeElement.addEventListener('mousemove', (e: MouseEvent) => this.onMouseMove(e));
    this.canvasRef.nativeElement.addEventListener('mousedown', (e: MouseEvent) => this.onMouseDown(e));
    this.canvasRef.nativeElement.addEventListener('mouseup', () => this.onMouseUp());
    this.canvasRef.nativeElement.addEventListener('wheel', (e: WheelEvent) => this.onMouseWheel(e), false);
    this.canvasRef.nativeElement.addEventListener('dblclick', (e: MouseEvent) => this.onDoubleClick(e));
    this.canvasRef.nativeElement.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault());
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Handle camera orbiting (right-click drag)
    if (this.isOrbiting) {
      const deltaX = (this.mouse.x - this.previousMouse.x) * Math.PI;
      const deltaY = (this.mouse.y - this.previousMouse.y) * Math.PI;
      
      this.sphericalCoords.theta -= deltaX;
      this.sphericalCoords.phi -= deltaY;
      
      // Clamp phi to avoid flipping
      this.sphericalCoords.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.sphericalCoords.phi));
      
      this.updateCameraPosition();
      this.previousMouse.copy(this.mouse);
      return;
    }

    // Handle camera panning (middle-click drag)
    if (this.isPanning) {
      const deltaX = (this.mouse.x - this.previousMouse.x) * 500;
      const deltaY = (this.mouse.y - this.previousMouse.y) * 500;
      
      const upVector = new THREE.Vector3(0, 1, 0);
      const rightVector = new THREE.Vector3();
      const forwardVector = this.camera.position.clone().sub(this.cameraTarget).normalize();
      
      rightVector.crossVectors(upVector, forwardVector).normalize();
      upVector.crossVectors(forwardVector, rightVector).normalize();
      
      this.cameraTarget.addScaledVector(rightVector, -deltaX);
      this.cameraTarget.addScaledVector(upVector, deltaY);
      
      this.updateCameraPosition();
      this.previousMouse.copy(this.mouse);
      return;
    }

    // Handle node dragging (left-click drag)
    if (this.isDragging && this.selectedNode) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.raycaster.ray.intersectPlane(this.dragPlane, this.dragPoint);
      this.selectedNode.position.copy(this.dragPoint);
      
      if (this.selectedNode.nodeData) {
        this.mindmapService.updateNodePosition(
          this.selectedNode.nodeData.id,
          this.dragPoint.x,
          this.dragPoint.y,
          this.dragPoint.z
        );
      }
      this.updateLines();
    } else {
      // Highlight nodes on hover
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        Array.from(this.nodeObjects.values())
      );

      this.nodeObjects.forEach(node => {
        if (node.isSelected) {
          const material = node.material as THREE.MeshPhongMaterial;
          material.emissive.setHex(0x000000);
          node.isSelected = false;
        }
      });

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object as NodeObject;
        if (selectedObject.isSelected !== undefined) {
          const material = selectedObject.material as THREE.MeshPhongMaterial;
          material.emissive.setHex(0x444444);
          selectedObject.isSelected = true;
        }
      }
    }
  }

  private onMouseDown(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.previousMouse.copy(this.mouse);
    this.mouseButton = event.button;

    // Right-click (button 2) for camera orbit
    if (event.button === 2) {
      this.isOrbiting = true;
      return;
    }

    // Middle-click (button 1) for pan
    if (event.button === 1) {
      this.isPanning = true;
      return;
    }

    // Left-click (button 0) for node dragging
    if (event.button === 0) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        Array.from(this.nodeObjects.values())
      );

      if (intersects.length > 0) {
        this.selectedNode = intersects[0].object as NodeObject;
        this.isDragging = true;
        this.dragPlane.setFromNormalAndCoplanarPoint(
          this.camera.getWorldDirection(new THREE.Vector3()),
          this.selectedNode.position
        );
      }
    }
  }

  private onMouseUp(): void {
    this.isDragging = false;
    this.isOrbiting = false;
    this.isPanning = false;
    this.selectedNode = null;
  }

  private onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    const zoomSpeed = 50;
    const direction = event.deltaY > 0 ? 1 : -1;
    
    this.cameraDistance += direction * zoomSpeed;
    
    if (this.cameraDistance > 200 && this.cameraDistance < 3000) {
      this.updateCameraPosition();
    } else {
      // Reset if out of bounds
      this.cameraDistance = Math.max(200, Math.min(3000, this.cameraDistance));
    }
  }

  private updateCameraPosition(): void {
    // Convert spherical to cartesian coordinates
    const x = this.cameraDistance * Math.sin(this.sphericalCoords.phi) * Math.cos(this.sphericalCoords.theta);
    const y = this.cameraDistance * Math.cos(this.sphericalCoords.phi);
    const z = this.cameraDistance * Math.sin(this.sphericalCoords.phi) * Math.sin(this.sphericalCoords.theta);
    
    this.camera.position.set(
      this.cameraTarget.x + x,
      this.cameraTarget.y + y,
      this.cameraTarget.z + z
    );
    
    this.camera.lookAt(this.cameraTarget);
  }

  private onWindowResize(): void {
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private onDoubleClick(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      Array.from(this.nodeObjects.values())
    );

    if (intersects.length > 0) {
      const nodeObject = intersects[0].object as NodeObject;
      if (nodeObject.nodeData) {
        const newNodeLabel = prompt('Enter new node label:');
        if (newNodeLabel) {
          this.mindmapService.createNewNode(newNodeLabel, nodeObject.nodeData.id);
        }
      }
    }
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  deleteSelectedNode(): void {
    if (this.selectedNode && this.selectedNode.nodeData) {
      this.mindmapService.deleteNode(this.selectedNode.nodeData.id);
      this.selectedNode = null;
    }
  }

  resetView(): void {
    this.cameraTarget.set(0, 0, 0);
    this.cameraDistance = 800;
    this.sphericalCoords = { theta: 0, phi: Math.PI / 4 };
    this.updateCameraPosition();
  }

  toggleControlsPanel(): void {
    this.controlsPanelMinimized = !this.controlsPanelMinimized;
  }

  openAddNodeModal(): void {
    this.showAddNodeModal = true;
    this.addNodeModalMinimized = false;
    this.newNodeLabel = '';
    this.newNodeParentId = '';
  }

  closeAddNodeModal(): void {
    this.showAddNodeModal = false;
    this.newNodeLabel = '';
    this.newNodeParentId = '';
  }

  toggleAddNodeModal(): void {
    this.addNodeModalMinimized = !this.addNodeModalMinimized;
  }

  addNode(): void {
    if (!this.newNodeLabel.trim()) {
      alert('Please enter a node label');
      return;
    }

    try {
      if (this.newNodeParentId) {
        this.mindmapService.createNewNode(this.newNodeLabel, this.newNodeParentId);
      } else {
        // Add as root node
        this.mindmapService.addNode(
          `node_${Date.now()}`,
          this.newNodeLabel,
          Math.random() * 400 - 200,
          Math.random() * 400 - 200,
          0,
          null
        );
      }
      this.closeAddNodeModal();
    } catch (error) {
      alert('Error adding node: ' + (error as Error).message);
    }
  }

  getAvailableParents(): MindmapNode[] {
    const nodes = Array.from(this.mindmapService.getNodes().values());
    return nodes.sort((a, b) => a.label.localeCompare(b.label));
  }
}
