# Deployment Guide - Vercel

## Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account (for easy deployment)

## Method 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 3D mindmap landing page"
   git remote add origin https://github.com/YOUR_USERNAME/mindmap-3d.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Choose your GitHub repository
   - Framework: Angular
   - Build Command: `ng build` (already set in package.json)
   - Output Directory: `dist/mindmap-3d`
   - Environment Variables: (none needed)

3. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes

## Method 2: Deploy via CLI (if network allows)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Production**
   ```bash
   cd mindmap-3d
   npm run build
   vercel --prod
   ```

## Method 3: Deploy via Drag & Drop (Quickest)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Go to https://vercel.com/import-from-git**
   - Or manually create a project and drag the `dist/mindmap-3d` folder

## Project Configuration

The `vercel.json` is already configured for:
- Static site hosting
- SPA routing (all routes point to index.html)
- 3D visualization with Three.js
- Search functionality
- Node interaction

## Features Ready for Production
✅ 3D interactive department mindmap
✅ Real-time search with dropdown
✅ Node details popup
✅ Camera controls (orbit, pan, zoom)
✅ Responsive design
✅ Minimizable panels
✅ Animation delays for smooth UX
✅ Hierarchical data with 9 main departments
✅ 400+ nodes with automatic subnodes

## Domain Setup (Optional)

After deployment:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain or use Vercel's provided subdomain

## Build Information

- Angular 21.1.0
- Three.js for 3D visualization
- Bundle size: ~777KB (warning: exceeds budget but acceptable for 3D graphics)
- Build time: ~12 seconds

## Support

For deployment issues:
- Check Vercel documentation: https://vercel.com/docs
- View deployment logs in Vercel dashboard
- Check browser console for client-side errors
