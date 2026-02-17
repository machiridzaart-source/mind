# BrainFix SaaS Platform - Setup & Launch Guide

🎉 **Your intelligent troubleshooting SaaS is ready!**

---

## ⚡ Quick Start (Choose One)

### 🥇 Fastest: Open in Browser

**Windows:**
```bash
start index.html
```

**Mac:**
```bash
open index.html
```

**Linux:**
```bash
xdg-open index.html
```

### 🥈 Local Server

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### 🥉 Angular Dev Server

```bash
cd mindmap-3d
ng serve

# Visit: http://localhost:4200
```

---

## 📚 NEW: SaaS Troubleshooting Platform

This project now includes a **complete SaaS application** with:

- 🧠 Interactive 3D brain as hero section
- 🔍 Intelligent search for 50+ solutions  
- 📚 Knowledge base linked to brain regions
- 🎨 Professional SaaS UI
- 📱 Fully responsive design
- 🚀 Ready to deploy

**Read `SAAS_GETTING_STARTED.md` for complete guide!**

---

## Original Setup (Still Available)

### Prerequisites
- Node.js v18+
- npm v9+
- Angular CLI v19+
- Modern browser with WebGL

### Full Setup
```bash
cd mindmap-3d
npm install --legacy-peer-deps
ng serve
```

Visit: http://localhost:4200

---

## System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher  
- **Angular CLI**: v19+ (will be installed automatically)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebGL support
- **Disk Space**: ~500MB for node_modules

## Detailed Installation

### Step 1: Check Prerequisites

Before installing, verify you have the required tools:

```bash
# Check Node.js version
node --version
# Should be v18.0.0 or higher

# Check npm version
npm --version
# Should be v9.0.0 or higher
```

### Step 2: Install Dependencies

Navigate to the project directory and install:

```bash
cd mindmap-3d
npm install --legacy-peer-deps
```

**What is `--legacy-peer-deps`?**
This flag allows npm to install packages with peer dependency conflicts, which is necessary for Angular 21 with some package versions.

**If installation fails:**

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete existing node_modules**
   ```bash
   rm -r node_modules
   rm package-lock.json
   ```

3. **Try installing again**
   ```bash
   npm install --legacy-peer-deps
   ```

### Step 3: Run Development Server

```bash
ng serve
```

This will:
- Compile your Angular application
- Start a development server on `http://localhost:4200`
- Watch for file changes and automatically reload

**Expected output:**
```
✔ Compiled successfully.
✔ built successfully
Application bundle generated successfully in 15.32 seconds.

Watch mode enabled. Watching for file changes...
Local:    http://localhost:4200/
```

### Step 4: Open in Browser

Open your web browser and navigate to:
```
http://localhost:4200
```

You should see the 3D mindmap application with interactive visualization.

## Troubleshooting

### Issue: "npm ERR! code ERESOLVE"

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue: "Cannot find module 'three'"

**Solution:**
```bash
npm install three @types/three --legacy-peer-deps
```

### Issue: "Port 4200 already in use"

**Solution:** Use a different port:
```bash
ng serve --port 4300
```

### Issue: "Error: Angular Schematics not installed"

**Solution:**
```bash
npm install -g @angular/cli@latest
ng version
```

### Issue: WebGL errors in console

**Solutions:**
- Your browser doesn't support WebGL (try Chrome or Firefox)
- GPU drivers need update
- Hardware acceleration is disabled in browser settings

### Issue: 3D canvas is blank/black

**Solutions:**
1. Check browser console for errors (F12)
2. Hard refresh the page (Ctrl+Shift+R)
3. Ensure Three.js is loaded: `console.log(window.THREE)`

## Configuration

### Build for Production

```bash
ng build --configuration=production
```

Output files will be in the `dist/mindmap-3d/` directory.

### Change Development Port

```bash
ng serve --port 3000
```

### Enable Strict Mode

Add to `angular.json` compiler options:
```json
"strictTemplates": true,
"strict": true
```

## Project Structure

```
mindmap-3d/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── mindmap-visualizer/
│   │   │   │   ├── mindmap-visualizer.component.ts
│   │   │   │   ├── mindmap-visualizer.component.html
│   │   │   │   ├── mindmap-visualizer.component.css
│   │   │   │   └── mindmap-visualizer.component.spec.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── mindmap.service.ts
│   │   │   ├── mindmap.service.spec.ts
│   │   │   └── index.ts
│   │   ├── app.ts (root component)
│   │   ├── app.html (root template)
│   │   ├── app.css (styles)
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── main.ts (entry point)
│   └── index.html
├── angular.json (Angular config)
├── tsconfig.json (TypeScript config)
├── package.json (dependencies)
└── README.md (documentation)
```

## What's Included

### Components
- **MindmapVisualizerComponent**: Main 3D visualization with:
  - Three.js scene management
  - Mouse interaction (drag, zoom, click)
  - Real-time rendering
  - Control UI panel

### Services
- **MindmapService**: Data management with:
  - Node CRUD operations
  - Hierarchical relationships
  - Observable data flow (RxJS)
  - Sample mindmap initialization

### Features
- ✅ 3D node visualization
- ✅ Drag and drop nodes
- ✅ Mouse wheel zoom
- ✅ Node selection/highlighting
- ✅ Add child nodes (double-click)
- ✅ Delete nodes
- ✅ Reset camera view
- ✅ Parent-child connection lines
- ✅ Color-coded nodes

## Development Tips

### Add a New Component

```bash
ng generate component components/my-component
# or
ng g c components/my-component
```

### Add a New Service

```bash
ng generate service services/my-service
# or
ng g s services/my-service
```

### Run Unit Tests

```bash
ng test
```

### Linting

```bash
ng lint
```

### Generate All Documentation

```bash
npx compodoc -p tsconfig.json -d docs
```

## Next Steps

1. **Explore the Code**
   - Read `src/app/components/mindmap-visualizer/mindmap-visualizer.component.ts`
   - Understand `src/app/services/mindmap.service.ts`

2. **Customize It**
   - Change node colors in mindmap.service.ts
   - Modify initial mindmap structure
   - Adjust camera settings
   - Style the UI panel

3. **Extend Features**
   - Add save/load functionality
   - Implement keyboard shortcuts
   - Add edit mode for node labels
   - Create export to image feature

4. **Deploy**
   - Build for production: `ng build`
   - Deploy `dist/mindmap-3d/` to your hosting

## Getting Help

### Check Logs
```bash
# View compilation errors
ng build

# Check in browser console (F12)
```

### Reset Everything
```bash
rm -r node_modules
rm package-lock.json
npm install --legacy-peer-deps
ng serve
```

### Additional Resources
- [Angular Documentation](https://angular.dev)
- [Three.js Documentation](https://threejs.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Common Commands

```bash
# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Check for linting errors
ng lint

# Generate a component
ng generate component components/name

# Generate a service
ng generate service services/name

# Format code
ng format

# View Angular CLI version
ng version
```

## Tips & Tricks

### Fast Development
1. Use `ng serve` with automatic reload
2. Use Angular DevTools browser extension
3. Use keyboard shortcuts in IDE

### Performance
1. Use `ng build --prod` for smaller bundles
2. Enable lazy loading for routes
3. Implement OnPush change detection

### Debugging
1. Use browser DevTools (F12)
2. Enable source maps in angular.json
3. Use `ng serve` for better debugging

## Need More Help?

- Check the main [README.md](./README.md)
- Review component code comments
- Check browser console for errors (F12 → Console)
- Visit Angular docs: https://angular.dev

---

**Congratulations! You're all set to create amazing 3D mindmaps! 🚀**
