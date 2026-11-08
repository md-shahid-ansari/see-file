// js/modules/pdf/pdf-renderer.js

export function renderPdfPage(page, shell, options = {}) {
  const {
    fitWidth,
    zoom = 1
  } = options;

  const originalViewport = page.getViewport({ scale: 1 });

  const scale = fitWidth / originalViewport.width;

  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", {
    alpha: false
  });

  if (!context) {
    throw new Error("Unable to create PDF canvas.");
  }

  // High-resolution rendering with a memory limit.
  const devicePixelRatio = window.devicePixelRatio || 1;

  const maxCanvasPixels = 16_000_000;

  const pixelRatio = Math.min(
    devicePixelRatio * 1.5,
    3,
    Math.sqrt(
      maxCanvasPixels /
      Math.max(1, viewport.width * viewport.height)
    )
  );

  canvas.width = Math.ceil(viewport.width * pixelRatio);
  canvas.height = Math.ceil(viewport.height * pixelRatio);

  // CSS dimensions remain at fit width.
  // Zoom is applied separately by the viewer.
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;

  canvas.className = "pdf-page-canvas";

  canvas.setAttribute(
    "aria-label",
    `PDF page ${page.pageNumber}`
  );

  canvas.style.transform = `scale(${zoom})`;

  shell.replaceChildren(canvas);

  const renderTask = page.render({
    canvasContext: context,
    viewport,
    transform: [
      pixelRatio, 0,
      0, pixelRatio,
      0, 0
    ]
  });

  return {
    canvas,
    width: viewport.width,
    height: viewport.height,
    renderTask,
    promise: renderTask.promise,

    cancel() {
      try {
        renderTask.cancel();
      } catch (_) {}
    }
  };
}