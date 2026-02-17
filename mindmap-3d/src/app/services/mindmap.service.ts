import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MindmapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  children: string[];
  parentId: string | null;
  color?: string;
}

export interface Mindmap {
  nodes: Map<string, MindmapNode>;
  rootId: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MindmapService {
  private mindmap = new Map<string, MindmapNode>();
  private mindmapSubject = new BehaviorSubject<Map<string, MindmapNode>>(this.mindmap);
  private nodeCounter = 0;

  constructor() {
    this.initializeSampleMindmap();
  }

  private initializeSampleMindmap(): void {
    // Root node
    this.addNode('root', 'Mind Map', 0, 0, 0, null);
    
    // First level nodes
    this.addNode('node1', 'Topic 1', 300, 0, 0, 'root');
    this.addNode('node2', 'Topic 2', -300, 0, 0, 'root');
    this.addNode('node3', 'Topic 3', 0, 300, 0, 'root');
    this.addNode('node4', 'Topic 4', 0, -300, 0, 'root');
    
    // Second level nodes
    this.addNode('node5', 'Subtopic 1.1', 500, 100, 0, 'node1');
    this.addNode('node6', 'Subtopic 1.2', 500, -100, 0, 'node1');
    this.addNode('node7', 'Subtopic 2.1', -500, 100, 0, 'node2');
    this.addNode('node8', 'Subtopic 2.2', -500, -100, 0, 'node2');
  }

  getMindmap(): Observable<Map<string, MindmapNode>> {
    return this.mindmapSubject.asObservable();
  }

  getNodes(): Map<string, MindmapNode> {
    return this.mindmap;
  }

  addNode(id: string, label: string, x: number, y: number, z: number, parentId: string | null): MindmapNode {
    const node: MindmapNode = {
      id,
      label,
      x,
      y,
      z,
      children: [],
      parentId,
      color: this.getRandomColor()
    };

    this.mindmap.set(id, node);

    if (parentId) {
      const parent = this.mindmap.get(parentId);
      if (parent) {
        parent.children.push(id);
      }
    }

    this.mindmapSubject.next(this.mindmap);
    return node;
  }

  createNewNode(label: string, parentId: string): MindmapNode {
    const id = `node_${++this.nodeCounter}`;
    const parent = this.mindmap.get(parentId);
    
    if (!parent) {
      throw new Error(`Parent node ${parentId} not found`);
    }

    // Position new node relative to parent
    const angle = (parent.children.length * Math.PI * 2) / 4;
    const distance = 200;
    const x = parent.x + distance * Math.cos(angle);
    const y = parent.y + distance * Math.sin(angle);
    const z = parent.z;

    return this.addNode(id, label, x, y, z, parentId);
  }

  updateNodePosition(nodeId: string, x: number, y: number, z: number): void {
    const node = this.mindmap.get(nodeId);
    if (node) {
      node.x = x;
      node.y = y;
      node.z = z;
      this.mindmapSubject.next(this.mindmap);
    }
  }

  deleteNode(nodeId: string): void {
    const node = this.mindmap.get(nodeId);
    if (!node) return;

    // Delete all children recursively
    node.children.forEach(childId => this.deleteNode(childId));

    // Remove from parent's children list
    if (node.parentId) {
      const parent = this.mindmap.get(node.parentId);
      if (parent) {
        parent.children = parent.children.filter(id => id !== nodeId);
      }
    }

    this.mindmap.delete(nodeId);
    this.mindmapSubject.next(this.mindmap);
  }

  getNode(nodeId: string): MindmapNode | undefined {
    return this.mindmap.get(nodeId);
  }

  private getRandomColor(): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
