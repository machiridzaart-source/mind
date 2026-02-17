# 🧠 Brain Visualizer Module

A standalone, reusable JavaScript module for creating interactive 3D brain visualizations with node graphs. Drop it into any website to add a beautiful, physics-based neural network visualization.

## Features

✨ **Interactive 3D Visualization**
- Beautiful physics-based node layout (d3-force)
- Smooth camera controls (orbit, pan, zoom)
- Real-time connection highlighting
- Click-to-zoom functionality

🧠 **Brain Structure** (~400 nodes)
- Complete anatomical brain structure
- Multi-level hierarchical organization
- ~500 interconnections simulating neural pathways
- Persistent data via localStorage

🔧 **Easy Integration**
- Single JavaScript file
- Works with any HTML/CSS
- CDN-based dependencies
- Minimal configuration required

## Quick Start

### 1. Basic HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; height: 100vh; overflow: hidden; }
        #graph { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="graph"></div>

    <!-- Load required libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js"></script>

    <!-- Load the Brain Visualizer module -->
    <script src="brain-visualizer.js"></script>

    <script>
        const brain = new BrainVisualizer('#graph');
        brain.initialize();
    </script>
</body>
</html>
```

### 2. With Custom Options

```javascript
const brain = new BrainVisualizer('#graph', {
    backgroundColor: '#0b0f19',
    nodeSize: 6,
    nodeTextHeight: 4,
    linkOpacity: 0.25,
    chargeStrength: -200,    // Increased = more spread out
    linkDistance: 100,        // Decreased = tighter clusters
    velocityDecay: 0.5        // Higher = slower, smoother motion
});

brain.initialize();
```

### 3. With Custom Events

```javascript
// Listen for node clicks
document.addEventListener('brainNodeClicked', (event) => {
    const node = event.detail;
    console.log('Clicked node:', node.label);
    updateUI(node);
});
```

## API Reference

### Constructor
```javascript
new BrainVisualizer(containerSelector, options)
```

**Parameters:**
- `containerSelector` (string): CSS selector for graph container (e.g., '#graph')
- `options` (object): Configuration object with optional properties

**Options:**
```javascript
{
    backgroundColor: '#0b0f19',      // Graph background color
    nodeSize: 6,                     // Base node size
    nodeTextHeight: 4,               // Label text height (px)
    linkOpacity: 0.25,               // Link transparency (0-1)
    chargeStrength: -200,            // Node repulsion (-300 = more spread, -100 = more dense)
    linkDistance: 100,               // Desired link length
    velocityDecay: 0.5               // Physics dampening (0.3-1.0)
}
```

### Methods

#### `initialize()`
Initialize the visualizer asynchronously. Must be called after DOM is ready.

```javascript
const success = await brain.initialize();
if (success) {
    console.log('Ready!');
}
```

**Returns:** Promise<boolean>

---

#### `addNode(id, label, parentId)`
Add a custom node to the graph.

```javascript
brain.addNode('my-node', 'My Node', 'parent-id');
```

**Parameters:**
- `id` (string): Unique node identifier
- `label` (string): Display name
- `parentId` (string, optional): ID of parent node

**Returns:** boolean (success)

---

#### `removeNode(id)`
Remove a node and all its connections.

```javascript
brain.removeNode('my-node');
```

**Parameters:**
- `id` (string): Node to remove

**Returns:** boolean (success)

---

#### `exportData()`
Export graph as JSON string.

```javascript
const json = brain.exportData();
console.log(json);
```

**Returns:** string (JSON)

---

#### `getData()`
Get the raw graph data object.

```javascript
const data = brain.getData();
console.log(data.nodes);   // Array of nodes
console.log(data.links);   // Array of connections
```

**Returns:** object `{ nodes, links }`

---

#### `getNodeCount()`
Get number of nodes in graph.

```javascript
const count = brain.getNodeCount();
```

**Returns:** number

---

#### `getLinkCount()`
Get number of links/connections.

```javascript
const links = brain.getLinkCount();
```

**Returns:** number

---

#### `clear()`
Delete all data and reset graph.

```javascript
brain.clear();
```

---

#### `saveData()`
Manually save data to localStorage (auto-saved by default).

```javascript
brain.saveData();
```

---

## Data Format

### Node Object
```javascript
{
    id: 'unique-id',           // Required: unique identifier
    label: 'Display Name',     // Optional: shown in graph
    group: 'region'            // Optional: for categorization
}
```

### Link Object
```javascript
{
    source: 'node-id-1',       // Node ID or object reference
    target: 'node-id-2'        // Node ID or object reference
}
```

### Full Graph Data
```javascript
{
    nodes: [
        { id: 'node1', label: 'Node 1' },
        { id: 'node2', label: 'Node 2' }
    ],
    links: [
        { source: 'node1', target: 'node2' }
    ]
}
```

## Integration Examples

### React Component

```jsx
import { useEffect, useRef } from 'react';
import BrainVisualizer from './brain-visualizer.js';

export function BrainGraph() {
    const containerRef = useRef(null);
    const brainRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        brainRef.current = new BrainVisualizer(containerRef.current, {
            nodeSize: 6
        });

        brainRef.current.initialize();

        return () => {
            // Cleanup if needed
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}
```

### Vue Component

```vue
<template>
    <div ref="graphContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BrainVisualizer from './brain-visualizer.js';

const graphContainer = ref(null);
const brain = ref(null);

onMounted(async () => {
    brain.value = new BrainVisualizer(graphContainer.value, {
        nodeSize: 6
    });
    await brain.value.initialize();
});
</script>
```

### Svelte Component

```svelte
<script>
    import { onMount } from 'svelte';
    import BrainVisualizer from './brain-visualizer.js';

    let container;
    let brain;

    onMount(async () => {
        brain = new BrainVisualizer(container, {
            nodeSize: 6
        });
        await brain.initialize();
    });
</script>

<div bind:this={container} style="width: 100%; height: 100vh;"></div>
```

## Customization

### Change Colors

Modify node and link colors via CSS or update the graph initialization:

```javascript
brain.graph.nodeColor(node => {
    if (node.group === 'region') return '#e74c3c';
    if (node.group === 'leaf') return '#3498db';
    return '#95a5a6';
});

brain.graph.linkColor(link => '#7f8c8d');
```

### Add Node Categories

Customize the brain structure in `generateBrainStructure()`:

```javascript
const brainRegions = {
    'My Section': {
        'Subsection': ['Item 1', 'Item 2']
    }
};
```

### Performance Tuning

For different network sizes:

```javascript
// Small graphs (< 100 nodes)
{ chargeStrength: -300, linkDistance: 150, velocityDecay: 0.3 }

// Medium graphs (100-400 nodes)
{ chargeStrength: -200, linkDistance: 100, velocityDecay: 0.5 }

// Large graphs (> 400 nodes)
{ chargeStrength: -100, linkDistance: 80, velocityDecay: 0.7 }
```

## Dependencies

All dependencies are loaded from CDN (no npm required):

- **Three.js** (r128+) - 3D graphics
- **three-spritetext** (1.8.0+) - 3D text labels
- **3d-force-graph** (1.77.0+) - Force-directed graph layout

CDN URLs:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js"></script>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers (may have reduced FPS)

## Troubleshooting

### CDN scripts not loading?
Check browser console for 404 errors. Verify URLs are correct and accessible.

### Graph not rendering?
1. Ensure container exists and is visible
2. Check that all three libraries are loaded
3. Call `initialize()` after DOM is ready
4. Check browser console for errors

### Poor performance with many nodes?
1. Reduce `nodeSize` and `nodeTextHeight`
2. Increase `chargeStrength` (less negative)
3. Increase `velocityDecay`
4. Consider hiding labels with CSS

### Data not persisting?
Check localStorage size limits. Clear browser storage if needed:
```javascript
localStorage.removeItem('brainMapData');
```

## License

Open source - free to use and modify

## Support Files

- `brain-visualizer.js` - Main module file
- `example.html` - Complete working example with UI
- `README.md` - This documentation

## Next Steps

1. Copy `brain-visualizer.js` to your project
2. Include the three CDN scripts
3. Create a container element
4. Initialize with `new BrainVisualizer()` 
5. Use the API to customize data and behavior

Happy neural mapping! 🧠✨
