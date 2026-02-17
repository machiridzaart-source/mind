# 🚀 Brain Visualizer - Integration Guide

This guide shows how to add Brain Visualizer to your website or web application.

## Files You Need

1. **brain-visualizer.js** - The main module (required)
2. **MODULE_DOCS.md** - Detailed API documentation
3. **example.html** - Complete working example (optional, for reference)

## Three-Step Integration

### Step 1: Copy Files
Copy `brain-visualizer.js` to your project directory.

### Step 2: Add to HTML
Include THREE.js libraries and the module in your HTML:

```html
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js"></script>
    <script src="path/to/brain-visualizer.js"></script>
</head>
```

### Step 3: Initialize
Create a container and initialize:

```html
<div id="brain-container" style="width: 100%; height: 100vh;"></div>

<script>
    const brain = new BrainVisualizer('#brain-container');
    brain.initialize();
</script>
```

## Common Website Setups

### WordPress

1. Copy `brain-visualizer.js` to `/wp-content/plugins/brain-viz/`
2. Create a shortcode in functions.php:
```php
add_shortcode('brain_viz', function() {
    wp_enqueue_script('three', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    wp_enqueue_script('spritetext', 'https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js');
    wp_enqueue_script('forcegraph', 'https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js');
    wp_enqueue_script('brain', plugins_url('brain-visualizer.js', __FILE__));
    
    return '<div id="brain-container" style="width:100%;height:600px;"></div>
            <script>
                new BrainVisualizer("#brain-container").initialize();
            </script>';
});
```

### Wix/Website Builder

1. Use "Embed Code" element
2. Add this HTML:
```html
<div id="brain" style="width:100%; height:600px;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js"></script>
<script src="your-cdn/brain-visualizer.js"></script>
<script>
    new BrainVisualizer('#brain').initialize();
</script>
```

### Next.js / React

```jsx
import { useEffect, useRef } from 'react';

export default function BrainPage() {
    const container = useRef(null);

    useEffect(() => {
        // Load scripts dynamically
        const scripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
            'https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js',
            'https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js',
            '/brain-visualizer.js'
        ];

        Promise.all(scripts.map(src => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        })).then(() => {
            new window.BrainVisualizer(container.current).initialize();
        });
    }, []);

    return <div ref={container} style={{ width: '100%', height: '100vh' }} />;
}
```

### Vue.js

```vue
<template>
    <div ref="brainContainer" class="brain-container"></div>
</template>

<script>
export default {
    mounted() {
        this.loadAndInitialize();
    },
    methods: {
        async loadAndInitialize() {
            // Load libraries
            const scripts = [
                'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
                'https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js',
                'https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js',
                '/brain-visualizer.js'
            ];

            for (const src of scripts) {
                await this.loadScript(src);
            }

            // Initialize
            this.brain = new window.BrainVisualizer(this.$refs.brainContainer);
            await this.brain.initialize();
        },
        loadScript(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
    }
};
</script>

<style>
.brain-container {
    width: 100%;
    height: 600px;
}
</style>
```

### Static HTML Site

Save as `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brain Visualizer</title>
    <style>
        * { margin: 0; padding: 0; }
        body { height: 100vh; overflow: hidden; }
        #brain { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="brain"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js"></script>
    <script src="brain-visualizer.js"></script>

    <script>
        new BrainVisualizer('#brain').initialize();
    </script>
</body>
</html>
```

## Hosting brain-visualizer.js

### Option 1: CDN (Recommended)
Upload to a CDN like Cloudflare, Netlify, or jsDelivr for fast global access.

### Option 2: Same Server
Place in web root or assets folder, load locally:
```html
<script src="/assets/brain-visualizer.js"></script>
```

### Option 3: GitHub Raw
Link directly from GitHub:
```html
<script src="https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/brain-visualizer.js"></script>
```

## Customization for Your Site

### Embed in Sidebar
```html
<aside style="width: 400px; height: 600px;">
    <div id="brain"></div>
</aside>
```

### Embed in Modal
```html
<div id="modal" style="width: 800px; height: 600px; max-width: 90vw;">
    <div id="brain" style="width: 100%; height: 100%;"></div>
</div>
```

### Responsive Container
```html
<div id="brain" style="width: 100%; aspect-ratio: 16/9;"></div>
```

### With Custom Styling
```css
#brain {
    border: 2px solid #007bff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

## Configuration for Your Site

```javascript
const brain = new BrainVisualizer('#brain', {
    // Darker background
    backgroundColor: '#000000',
    
    // Larger nodes
    nodeSize: 8,
    
    // More spread out
    chargeStrength: -300,
    
    // Slower movement
    velocityDecay: 0.7
});

brain.initialize();
```

## Add Controls to Your Site

Example control panel:

```html
<div style="padding: 20px;">
    <h3>Brain Controls</h3>
    <button onclick="addCustomNode()">Add Node</button>
    <button onclick="exportData()">Export</button>
    <button onclick="resetBrain()">Reset</button>
</div>

<div id="brain"></div>

<script>
    let brain = new BrainVisualizer('#brain');
    brain.initialize();

    function addCustomNode() {
        const name = prompt('Node name:');
        if (name) brain.addNode(name, name);
    }

    function exportData() {
        const data = brain.exportData();
        console.log(data);
    }

    function resetBrain() {
        if (confirm('Reset all data?')) {
            brain.clear();
            brain.generateBrainStructure();
            brain.createGraph();
            brain.setupInteractions();
        }
    }
</script>
```

## Troubleshooting

**Q: Getting CORS errors?**
A: Use a CDN node.js that supports CORS, or host files on same domain

**Q: Graph not showing?**
A: Check browser console, ensure all libraries loaded, verify HTML is valid

**Q: Need custom data?**
A: See `brain.addNode()` and `brain.getData()` in MODULE_DOCS.md

**Q: Performance issues?**
A: Reduce node size, increase chargeStrength, or hide labels

## Need Help?

1. Check `MODULE_DOCS.md` for complete API reference
2. Review `example.html` for working code
3. Inspect browser console for error messages

That's it! Your brain visualizer is ready to explore. 🧠✨
