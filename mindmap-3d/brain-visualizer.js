/**
 * Brain Visualizer Module - 3D Interactive Brain Map
 * A standalone module that creates an interactive 3D brain visualization
 * 
 * Usage:
 *   const brain = new BrainVisualizer('#container', options);
 *   brain.initialize();
 */

class BrainVisualizer {
  constructor(containerSelector, options = {}) {
    this.containerSelector = containerSelector;
    this.options = {
      backgroundColor: '#0b0f19',
      nodeSize: 6,
      nodeTextHeight: 4,
      linkOpacity: 0.25,
      chargeStrength: -200,
      linkDistance: 100,
      velocityDecay: 0.5,
      ...options
    };

    this.graphData = { nodes: [], links: [] };
    this.graph = null;
    this.highlightNodes = new Set();
    this.highlightLinks = new Set();
  }

  /**
   * Initialize the brain visualizer
   */
  async initialize() {
    // Check if required libraries are loaded
    if (!window.THREE || !window.SpriteText || !window.ForceGraph3D) {
      console.error('Required libraries not loaded. Make sure to include:');
      console.error('- Three.js');
      console.error('- SpriteText');
      console.error('- 3D Force Graph');
      return false;
    }

    // Load data
    this.loadData();

    // Create graph
    const graphCreated = this.createGraph();
    if (!graphCreated) {
      console.error('Failed to create graph');
      return false;
    }

    // Setup interactions
    this.setupInteractions();

    console.log(`Brain Visualizer initialized: ${this.graphData.nodes.length} nodes, ${this.graphData.links.length} connections`);
    return true;
  }

  /**
   * Load data from localStorage or create default brain structure
   */
  loadData() {
    const saved = localStorage.getItem('brainMapData');
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.nodes && data.nodes.length < 50) {
          localStorage.removeItem('brainMapData');
          this.generateBrainStructure();
        } else {
          this.graphData = data;
          console.log('Loaded brain data from cache');
        }
      } catch (e) {
        console.error('Failed to load data:', e);
        this.generateBrainStructure();
      }
    } else {
      this.generateBrainStructure();
    }
  }

  /**
   * Generate ~400 node brain structure
   */
  generateBrainStructure() {
    const brainRegions = {
      'Cerebral Cortex': {
        'Frontal Lobe': {
          'Prefrontal Cortex': ['Dorsolateral PFC', 'Medial PFC', 'Orbital PFC', 'Ventromedial PFC'],
          'Motor Areas': ['Primary Motor Cortex', 'Premotor Cortex', 'Supplementary Motor Area'],
          'Anterior Cingulate': ['Dorsal Anterior Cingulate', 'Subgenual Cingulate', 'Pregenual Cingulate'],
          'Inferior Frontal': ['Broca Area', 'Pars Opercularis', 'Pars Triangularis']
        },
        'Parietal Lobe': {
          'Somatosensory': ['Primary Somatosensory Cortex', 'S1 Hand Area', 'S1 Head Area'],
          'Posterior Parietal': ['Superior Parietal Lobule', 'Precuneus', 'Posterior Cingulate'],
          'Inferior Parietal': ['Supramarginal Gyrus', 'Angular Gyrus', 'Temporoparietal Junction']
        },
        'Temporal Lobe': {
          'Auditory Cortex': ['Primary Auditory Cortex', 'Secondary Auditory Cortex', 'Superior Temporal Gyrus'],
          'Language Areas': ['Wernicke Area', 'Superior Temporal Sulcus', 'Temporal Pole'],
          'Inferior Temporal': ['Inferior Temporal Gyrus', 'Fusiform Gyrus', 'Parahippocampal Gyrus']
        },
        'Occipital Lobe': {
          'Visual Cortex': ['Primary Visual Cortex', 'V2', 'V3', 'V4', 'V5/MT']
        }
      },
      'Limbic System': {
        'Hippocampal Formation': {
          'Hippocampus': ['CA1', 'CA2', 'CA3', 'Dentate Gyrus', 'Subiculum'],
          'Associated Cortex': ['Perirhinal Cortex', 'Parahippocampal Cortex', 'Entorhinal Cortex']
        },
        'Amygdala': {
          'Amygdaloid Complex': ['Basolateral Amygdala', 'Medial Amygdala', 'Central Amygdala']
        },
        'Cingulate': {
          'Cingulate Cortex': ['Anterior Cingulate', 'Posterior Cingulate', 'Retrosplenial Cortex']
        }
      },
      'Diencephalon': {
        'Thalamus': {
          'Sensory Relays': ['Lateral Geniculate Nucleus', 'Medial Geniculate Nucleus', 'Ventral Posterior'],
          'Other Thalamic': ['Dorsomedial Nucleus', 'Anterior Thalamus']
        },
        'Hypothalamus': {
          'Hypothalamic Regions': ['Suprachiasmatic Nucleus', 'Paraventricular Nucleus', 'Anterior Hypothalamus']
        }
      },
      'Cerebellum': {
        'Cerebellar Structures': {
          'Lobules': ['Anterior Lobe', 'Posterior Lobe', 'Flocculonodular Lobe'],
          'Nuclei': ['Dentate Nucleus', 'Fastigial Nucleus']
        }
      },
      'Brainstem': {
        'Midbrain': {
          'Tegmentum': ['Substantia Nigra', 'Ventral Tegmental Area', 'Red Nucleus'],
          'Tectum': ['Superior Colliculus', 'Inferior Colliculus']
        },
        'Pons': {
          'Brainstem Nuclei': ['Locus Coeruleus', 'Raphe Pontis', 'Superior Olive']
        },
        'Medulla': {
          'Medullary Regions': ['Nucleus Gracilis', 'Hypoglossal Nucleus', 'Solitary Nucleus']
        }
      },
      'Basal Ganglia': {
        'Basal Structures': {
          'Striatum': ['Caudate Nucleus', 'Putamen', 'Nucleus Accumbens'],
          'Other': ['Globus Pallidus', 'Subthalamic Nucleus']
        }
      }
    };

    this.graphData.nodes = [{ id: 'Brain', label: 'Brain', group: 'root' }];
    this.graphData.links = [];

    const addNodesRecursively = (parentId, obj) => {
      if (Array.isArray(obj)) {
        obj.forEach(itemName => {
          const nodeId = itemName;
          this.graphData.nodes.push({ id: nodeId, label: itemName, group: 'leaf' });
          this.graphData.links.push({ source: parentId, target: nodeId });
        });
      } else if (typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          this.graphData.nodes.push({ id: key, label: key, group: 'internal' });
          this.graphData.links.push({ source: parentId, target: key });
          addNodesRecursively(key, value);
        });
      }
    };

    Object.entries(brainRegions).forEach(([regionName, regionData]) => {
      this.graphData.nodes.push({ id: regionName, label: regionName, group: 'region' });
      this.graphData.links.push({ source: 'Brain', target: regionName });
      addNodesRecursively(regionName, regionData);
    });

    // Add cross-region connections
    for (let i = 0; i < this.graphData.nodes.length * 0.5; i++) {
      const sourceIdx = Math.floor(Math.random() * this.graphData.nodes.length);
      const targetIdx = Math.floor(Math.random() * this.graphData.nodes.length);
      
      if (sourceIdx !== targetIdx) {
        const source = this.graphData.nodes[sourceIdx].id;
        const target = this.graphData.nodes[targetIdx].id;
        
        if (!this.graphData.links.find(l => 
          (l.source === source && l.target === target) ||
          (l.source === target && l.target === source)
        )) {
          this.graphData.links.push({ source, target });
        }
      }
    }

    this.saveData();
    console.log(`Generated brain structure: ${this.graphData.nodes.length} nodes, ${this.graphData.links.length} connections`);
  }

  /**
   * Create the 3D force graph
   */
  createGraph() {
    try {
      const container = document.querySelector(this.containerSelector);
      if (!container) {
        console.error(`Container not found: ${this.containerSelector}`);
        return false;
      }

      console.log('🎯 Creating 3D graph...');
      this.graph = ForceGraph3D()(container)
        .backgroundColor(this.options.backgroundColor)
        .nodeRelSize(this.options.nodeSize)
        .linkWidth(1)
        .linkOpacity(this.options.linkOpacity)
        .nodeResolution(16);

      console.log('📊 Loading graph data...');
      this.graph.graphData(this.graphData);

      // Node labels
      this.graph.nodeThreeObject(node => {
        const sprite = new SpriteText(node.label || node.id);
        sprite.color = '#7dd3fc';
        sprite.textHeight = this.options.nodeTextHeight;
        return sprite;
      });

      // Physics
      this.graph.d3Force('charge').strength(this.options.chargeStrength);
      this.graph.d3Force('link').distance(this.options.linkDistance).strength(0.8);
      this.graph.d3VelocityDecay(this.options.velocityDecay);
      this.graph.warmupTicks(100);

      console.log('✅ Graph created successfully');
      return true;
    } catch (error) {
      console.error('❌ Error creating graph:', error);
      return false;
    }
  }

  /**
   * Setup user interactions
   */
  setupInteractions() {
    // Hover highlight
    this.graph.onNodeHover(node => {
      this.highlightNodes.clear();
      this.highlightLinks.clear();

      if (node) {
        this.highlightNodes.add(node);
        this.graphData.links.forEach(link => {
          if ((link.source.id || link.source) === node.id || 
              (link.target.id || link.target) === node.id) {
            this.highlightLinks.add(link);
            const sourceNode = typeof link.source === 'string' ? 
              this.graphData.nodes.find(n => n.id === link.source) : link.source;
            const targetNode = typeof link.target === 'string' ? 
              this.graphData.nodes.find(n => n.id === link.target) : link.target;
            if (sourceNode) this.highlightNodes.add(sourceNode);
            if (targetNode) this.highlightNodes.add(targetNode);
          }
        });
      }
    });

    this.graph.nodeColor(node =>
      this.highlightNodes.size === 0
        ? '#38bdf8'
        : this.highlightNodes.has(node)
        ? '#22d3ee'
        : 'rgba(100,100,100,0.2)'
    );

    this.graph.linkColor(link =>
      this.highlightLinks.size === 0
        ? 'rgba(125,211,252,0.3)'
        : this.highlightLinks.has(link)
        ? '#22d3ee'
        : 'rgba(100,100,100,0.1)'
    );

    // Click to zoom
    this.graph.onNodeClick(node => {
      const distance = 150;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      this.graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
        node,
        1000
      );

      // Emit custom event
      document.dispatchEvent(new CustomEvent('brainNodeClicked', { detail: node }));
    });
  }

  /**
   * Save data to localStorage
   */
  saveData() {
    localStorage.setItem('brainMapData', JSON.stringify(this.graphData));
  }

  /**
   * Add a custom node
   */
  addNode(id, label, parentId = null) {
    if (this.graphData.nodes.find(n => n.id === id)) {
      console.warn(`Node ${id} already exists`);
      return false;
    }

    this.graphData.nodes.push({ id, label: label || id });
    if (parentId) {
      this.graphData.links.push({ source: parentId, target: id });
    }

    this.saveData();
    if (this.graph) {
      this.graph.graphData(this.graphData);
    }
    return true;
  }

  /**
   * Remove a node
   */
  removeNode(id) {
    this.graphData.nodes = this.graphData.nodes.filter(n => n.id !== id);
    this.graphData.links = this.graphData.links.filter(l => l.source !== id && l.target !== id);

    this.saveData();
    if (this.graph) {
      this.graph.graphData(this.graphData);
    }
    return true;
  }

  /**
   * Export data as JSON
   */
  exportData() {
    return JSON.stringify(this.graphData, null, 2);
  }

  /**
   * Clear all data
   */
  clear() {
    this.graphData = { nodes: [], links: [] };
    localStorage.removeItem('brainMapData');
    if (this.graph) {
      this.graph.graphData(this.graphData);
    }
  }

  /**
   * Get graph data
   */
  getData() {
    return this.graphData;
  }

  /**
   * Get node count
   */
  getNodeCount() {
    return this.graphData.nodes.length;
  }

  /**
   * Get link count
   */
  getLinkCount() {
    return this.graphData.links.length;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrainVisualizer;
}
