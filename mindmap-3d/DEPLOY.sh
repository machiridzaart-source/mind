#!/bin/bash
# Brain Visualizer Module - Quick Deploy Script
# Use this to quickly deploy your module to a website

# This script helps you copy the module to your website

echo "🧠 Brain Visualizer Module Deploy"
echo "==================================="
echo ""
echo "To deploy to your website, copy these files:"
echo ""
echo "1. REQUIRED:"
echo "   brain-visualizer.js"
echo ""
echo "2. OPTIONAL (for reference):"
echo "   - example.html (working example)"
echo "   - MODULE_DOCS.md (API documentation)"  
echo "   - INTEGRATION_GUIDE.md (setup help)"
echo ""
echo "Then add 10 lines of code to your HTML file:"
echo ""
echo '  <div id="brain" style="width:100%; height:600px;"></div>'
echo '  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'
echo '  <script src="https://cdn.jsdelivr.net/npm/three-spritetext@1.8.0/dist/index.min.js"></script>'
echo '  <script src="https://cdn.jsdelivr.net/npm/3d-force-graph@1.77.0/dist/3d-force-graph.min.js"></script>'
echo '  <script src="path/to/brain-visualizer.js"></script>'
echo '  <script>'
echo '    new BrainVisualizer("#brain").initialize();'
echo '  </script>'
echo ""
echo "That's it! Your 3D brain visualization is live."
echo ""
echo "📚 For more help, read QUICK_START.md or INTEGRATION_GUIDE.md"
