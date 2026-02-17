# 3D Interactive Angular Mindmap

A fully interactive 3D mindmap visualization built with Angular and Three.js. Create, manipulate, and explore your ideas in a beautiful 3D space.

## Features

### 🎯 Core Features
- **3D Visualization**: Interactive 3D mindmap visualization using Three.js
- **Node Management**: Create, delete, and organize nodes hierarchically
- **Drag & Drop**: Drag nodes to reposition them in 3D space
- **Zoom & Pan**: Intuitive zoom and pan controls with mouse wheel
- **Node Selection**: Click to select/highlight nodes
- **Dynamic Node Adding**: Double-click any node to add child nodes
- **Color-Coded Nodes**: Each node type gets a unique color for better visualization

### 🎮 Interactive Controls
- **Mouse Drag**: Drag nodes to reposition them
- **Mouse Wheel**: Scroll to zoom in/out 
- **Double-Click**: Double-click a node to add a child node
- **Click**: Click to select/highlight a node
- **Reset View**: Button to reset camera position

### 🏗️ Architecture

#### Components
- **MindmapVisualizerComponent**: Main 3D visualization and interaction component
  - Manages Three.js scene, camera, and renderer
  - Handles all user interactions (mouse, keyboard)
  - Updates visualization based on service data

#### Services
- **MindmapService**: Manages mindmap data structure
  - Node CRUD operations
  - Observable-based data flow for reactive updates
  - Hierarchical node relationships

## Project Structure

```
mindmap-3d/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── mindmap-visualizer/
│   │   │       ├── mindmap-visualizer.component.ts  # Main component
│   │   │       ├── mindmap-visualizer.component.html # Template
│   │   │       └── mindmap-visualizer.component.css  # Styles
│   │   ├── services/
│   │   │   └── mindmap.service.ts      # Data management service
│   │   ├── app.ts                      # Root component
│   │   ├── app.html                    # Root template
│   │   └── app.css                     # Global styles
│   └── ...
├── package.json                        # Dependencies
├── angular.json                        # Angular config
├── tsconfig.json                       # TypeScript config
└── README.md                           # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 19+

### Step 1: Install Dependencies

```bash
cd mindmap-3d
npm install --legacy-peer-deps
```

**Note**: If you encounter disk space issues, you may need to:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `rm -r node_modules`
3. Try installing again with: `npm install --legacy-peer-deps`

### Step 2: Start Development Server

```bash
ng serve
```

The application will be available at `http://localhost:4200`

### Step 3: Build for Production

```bash
ng build --configuration=production
```

Output will be in the `dist/` directory.

## Usage Guide

### Starting the App
1. Run `ng serve`
2. Open browser to `http://localhost:4200`
3. You'll see a 3D mindmap with a central "Mind Map" node and several child nodes

### Adding Nodes
1. **Double-click** any existing node
2. Enter the label for your new node in the prompt
3. The new node will appear as a child of the selected node

### Managing Nodes
- **Click** a node to select it (highlighted in gray)
- **Drag** a selected node to move it in 3D space
- **Delete**: Select a node and click "Delete Node" button
- **Reset View**: Click "Reset View" to return to default camera position

### Navigation
- **Zoom**: Use mouse wheel to zoom in/out (range: 200-3000 units)
- **Pan**: The camera automatically adjusts based on node positions

## Technical Details

### Dependencies
- **Angular 19+**: Modern Angular with standalone components
- **Three.js**: 3D graphics library
- **TypeScript**: Type-safe JavaScript
- **RxJS**: Reactive programming

### Key Implementation Details

#### Three.js Setup
- Scene with ambient and directional lighting
- Perspective camera for 3D view
- Sphere geometry for nodes with canvas texture for labels
- Line geometry for parent-child connections

#### Interaction System
- Raycaster for mouse picking
- Dragging via plane intersection
- Zoom with scroll wheel distance calculation
- Double-click detection for node creation

#### Data Binding
- Service uses RxJS BehaviorSubject for reactive updates
- Components subscribe to data changes
- Automatic UI updates when mindmap changes

## Customization

### Change Node Colors
Edit the `getRandomColor()` method in `mindmap.service.ts`:

```typescript
private getRandomColor(): string {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', ...];
  return colors[Math.floor(Math.random() * colors.length)];
}
```

### Adjust Camera View
Modify the camera position in `mindmap-visualizer.component.ts`:

```typescript
this.camera.position.set(0, 0, 800); // Change these values
```

### Change Initial Mindmap Structure
Edit the `initializeSampleMindmap()` method in `mindmap.service.ts` to create your own hierarchy.

### Customize Styling
Edit `mindmap-visualizer.component.css` for the UI panel and `app.css` for global styles.

## Troubleshooting

### 3D canvas not showing
- Check browser console for WebGL errors
- Ensure Three.js is properly installed: `npm ls three`
- Try hard refresh (Ctrl+Shift+R)

### Nodes not interactive
- Ensure browser supports WebGL
- Check that mouse events are firing in DevTools
- Verify raycaster is initialized

### Disk space errors during installation
- Clear npm cache: `npm cache clean --force`
- Install with legacy peer deps: `npm install --legacy-peer-deps`
- Consider installing on a different drive

### Unexpected node positions
- Click "Reset View" button
- Drag nodes to desired positions
- Note: Positions are in 3D space (x, y, z coordinates)

## Future Enhancements

- [ ] Save/load mindmap to JSON
- [ ] Export mindmap as image
- [ ] Force-directed layout algorithm
- [ ] Keyboard shortcuts
- [ ] Edit node labels
- [ ] Node property panel
- [ ] Undo/Redo functionality
- [ ] Collaboration features
- [ ] Mobile touch support
- [ ] Theme customization

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

(Requires WebGL support)

## Performance Notes

- The app handles 100+ nodes smoothly
- For large mindmaps (500+nodes), consider implementing:
  - LOD (Level of Detail) rendering
  - Frustum culling
  - Instanced rendering

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues, questions, or suggestions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Angular and Three.js**

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
