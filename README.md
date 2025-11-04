# Web-Cam — README

## Project Overview

**Web-Cam** is a lightweight browser-based webcam toy that lets visitors take selfies, view sample images, and interact with a simple, playful UI. The live demo is hosted at: `https://pyx-hash.github.io/Web-Cam/`.

This repository aims to be a minimal, easy-to-understand example for using the browser MediaDevices API to access a user camera, capture images, and display thumbnails.

---

## Features

- Access the device camera (permission required).
- Live preview from webcam.
- Take snapshots (selfies) and display captured images as thumbnails.
- Simple, mobile-friendly layout ideal for demos and learning.

---

## File Structure (example)

```
/ (root)
├─ index.html       # main UI and webcam markup
├─ styles.css       # (optional) styles for layout and thumbnails
├─ script.js        # camera access, capture logic, and DOM handling
└─ README.md        # this file
```

> Note: The hosted demo may inline styles and script in `index.html` for simplicity.

---

## Usage

1. Open the demo in a modern browser that supports `getUserMedia` (Chrome, Edge, Firefox, Safari).
2. Grant camera permission when prompted.
3. Use the `Ready? Smile!` or capture button to take a snapshot.
4. Captured images appear as thumbnails below the preview. Click a thumbnail to view a larger version (if enabled in the UI).

---

## Development / Local Testing

To run the site locally:

1. Clone the repository:

```bash
git clone https://github.com/pyx-hash/Web-Cam.git
cd Web-Cam
```

2. Serve files with a simple HTTP server (some browser policies require a server for `getUserMedia` to work):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

3. Edit `index.html` / `script.js` and refresh the browser to see changes.

---

## Key Implementation Notes

- Uses `navigator.mediaDevices.getUserMedia({ video: true })` to request the camera stream.
- Video element receives the media stream via `video.srcObject = stream`.
- To capture a snapshot, draw the current video frame onto an offscreen `<canvas>` and call `canvas.toDataURL()`.
- Consider handling different camera constraints (front vs rear camera) using `facingMode: { exact: "user" }` or `facingMode: "environment"` where supported.
- Handle permission denial gracefully with a friendly message and fallback UI.

---

## Accessibility

- Provide clear text labels for the capture button (e.g., `aria-label="Take photo"`).
- Ensure thumbnails have descriptive `alt` attributes when possible.
- Make interactive elements keyboard-accessible.

---

## Customization Ideas

- Add filters (CSS or canvas-based) and sticker overlays.
- Allow image download or share via Web Share API.
- Integrate with a lightweight backend to upload/save photos.
- Add a gallery view with delete and rename features.

---

## Deployment

The demo is suitable for static hosting (GitHub Pages, Netlify, Vercel). For GitHub Pages, push this repository to a GitHub repo and enable Pages on the `main` branch (or place contents in the `gh-pages` branch).

---

## Troubleshooting

- **No camera detected / permission denied:** Ensure the page is served over HTTPS or `localhost`, and the browser has camera permissions enabled.
- **Black or frozen video:** Try stopping and re-requesting the media stream, or test in another browser.
- **Mobile camera selection:** Mobile browsers may require explicit constraints to choose front/rear cameras.

---

## License & Credits

- MIT License — feel free to reuse and modify.
- Built as a small demo by the repository owner.

---

## Contact

For questions or improvements, open an issue or submit a pull request on the repository hosting the demo.
