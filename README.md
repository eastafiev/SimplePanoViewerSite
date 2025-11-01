# SimplePanoViewerWebSite

Simple Panorama Viewer web site built with Unity WebGL.

## Project Structure

- `PlayerApp/` - Web build output from Unity
  - `index.html` - Main HTML entry point
  - `ServiceWorker.js` - PWA service worker for offline support
  - `Build/` - Unity WebGL build artifacts (`.unityweb`, `.wasm` files)
  - `TemplateData/` - UI assets, styles, and diagnostic tools

## Development with Cursor

This project is configured for editing with Cursor/VS Code:

### Setup
1. Open the workspace file: `SimplePanoViewerWebSite.code-workspace`
2. Install recommended extensions (Cursor will prompt you)
3. Start editing!

### Key Files to Edit
- **`PlayerApp/index.html`** - Main page structure, Unity loader configuration
- **`PlayerApp/TemplateData/style.css`** - UI styling
- **`PlayerApp/ServiceWorker.js`** - PWA caching strategy
- **`PlayerApp/manifest.webmanifest`** - PWA manifest

### Testing Locally
1. Use the **Live Server** extension (recommended)
2. Or serve with any local web server pointing to `PlayerApp/` directory
3. Debug configuration is available in `.vscode/launch.json` (Chrome on localhost:8080)

### Notes
- Unity build files (`.unityweb`, `.wasm`) are tracked in Git - these are required for the PWA
- Binary files are excluded from search (but visible in explorer)
- Formatting: 2 spaces, UTF-8, LF line endings

## Unity Build Process

When updating the Unity project:
1. Build for WebGL in Unity
2. Copy build output to `PlayerApp/Build/`
3. Update version number in:
   - `index.html` (productVersion)
   - `ServiceWorker.js` (cacheName)

## Service Worker

The service worker implements a network-first caching strategy. Update the `cacheName` version when deploying new builds to force cache refresh.
