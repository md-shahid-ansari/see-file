// js/modules/pdf/pdf-viewer.js

import { renderPdfPage } from "./pdf-renderer.js";
import { createPdfZoom } from "./pdf-zoom.js";

export function createPdfViewer(options = {}) {
  const {
    stage,
    pdfjs = window.pdfjsLib,
    workerSrc = new URL(
      "../../../vendor/pdfjs/pdf.worker.min.js",
      import.meta.url
    ).href,
    maxWidth = 1100,
    minZoom = 1,
    maxZoom = 4,
    onPageChange = () => {},
    onError = console.error
  } = options;

  if (!stage) {
    throw new Error("PDF viewer requires a stage element.");
  }

  if (!pdfjs) {
    throw new Error("PDF.js library is not loaded.");
  }

  let pdf = null;
  let loadingTask = null;
  let observer = null;
  let resizeObserver = null;

  let documentElement = null;
  let slots = [];

  let zoom = 1;
  let currentPage = 1;
  let generation = 0;

  let destroyed = false;
  let resizeFrame = 0;

  const zoomController = createPdfZoom({
    element: stage,
    getZoom: () => zoom,
    setZoom,
    minZoom,
    maxZoom,
    getContentOffset
  });

  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  /* -----------------------------------------------------
     WIDTH AND LAYOUT
     ----------------------------------------------------- */

  function getFitWidth() {
    const available = Math.max(
      1,
      stage.clientWidth - 16
    );

    return Math.min(maxWidth, available);
  }

  function getDocumentWidth() {
    return Math.max(
      stage.clientWidth,
      getFitWidth() * zoom
    );
  }

  function getContentOffset(clientX, clientY) {
    if (!slots.length) {
        return { x: 0, y: 0 };
    }

    const stageRect = stage.getBoundingClientRect();

    const targetY = clientY ??
        stageRect.top + stage.clientHeight / 2;

    let selected = slots[0];
    let smallestDistance = Infinity;

    for (const slot of slots) {
        const rect = slot.shell.getBoundingClientRect();

        let distance = 0;

        if (targetY < rect.top) {
        distance = rect.top - targetY;
        } else if (targetY > rect.bottom) {
        distance = targetY - rect.bottom;
        }

        if (distance < smallestDistance) {
        smallestDistance = distance;
        selected = slot;
        }
    }

    const rect = selected.shell.getBoundingClientRect();

    return {
        x: rect.left - stageRect.left + stage.scrollLeft,
        y: rect.top - stageRect.top + stage.scrollTop
    };
    }

  function applyLayout() {
    if (!documentElement) return;

    const fitWidth = getFitWidth();
    const documentWidth = getDocumentWidth();

    documentElement.style.width =
      `${documentWidth}px`;

    documentElement.style.minHeight =
      `${stage.clientHeight}px`;

    slots.forEach((slot) => {
      const scaledWidth = fitWidth * zoom;
      const scaledHeight = slot.aspectRatio
        ? fitWidth * slot.aspectRatio * zoom
        : fitWidth * zoom * 1.414;

      slot.row.style.width =
        `${documentWidth}px`;

      slot.row.style.justifyContent =
        scaledWidth <= stage.clientWidth
          ? "center"
          : "flex-start";

      slot.shell.style.width =
        `${scaledWidth}px`;

      slot.shell.style.height =
        `${scaledHeight}px`;

      if (slot.canvas) {
        slot.canvas.style.width =
          `${fitWidth}px`;

        slot.canvas.style.height =
          `${slot.aspectRatio * fitWidth}px`;

        slot.canvas.style.transform =
          `scale(${zoom})`;
      }
    });
  }

  /* -----------------------------------------------------
     ZOOM
     ----------------------------------------------------- */

  function setZoom(value) {
    zoom = Math.min(
      maxZoom,
      Math.max(minZoom, Number(value) || 1)
    );

    applyLayout();

    return zoom;
  }

  function resetZoom() {
    setZoom(1);
  }

  /* -----------------------------------------------------
     CREATE PAGE SLOTS
     ----------------------------------------------------- */

  function createPageSlot(pageNumber, aspectRatio) {
    const row = document.createElement("div");
    row.className = "pdf-page-row";

    const shell = document.createElement("div");
    shell.className = "pdf-page-shell";

    const placeholder = document.createElement("div");
    placeholder.className = "pdf-page-placeholder";

    shell.append(placeholder);
    row.append(shell);
    documentElement.append(row);

    const slot = {
      pageNumber,
      row,
      shell,
      placeholder,
      canvas: null,

      aspectRatio,
      rendered: false,
      rendering: false,

      renderTask: null,
      page: null
    };

    slots.push(slot);

    return slot;
  }

  /* -----------------------------------------------------
     PAGE RENDERING
     ----------------------------------------------------- */

  async function renderSlot(slot, token, knownPage = null) {
    if (
      token !== generation ||
      !pdf ||
      slot.rendered ||
      slot.rendering
    ) {
      return;
    }

    slot.rendering = true;

    try {
      const page = knownPage ||
        await pdf.getPage(slot.pageNumber);

      if (token !== generation) return;

      slot.page = page;

      const originalViewport = page.getViewport({
        scale: 1
      });

      const fitWidth = getFitWidth();

      const fitScale =
        fitWidth / originalViewport.width;

      const fitViewport = page.getViewport({
        scale: fitScale
      });

      slot.aspectRatio =
        fitViewport.height / fitViewport.width;

      applyLayout();

      const job = renderPdfPage(
        page,
        slot.shell,
        {
          fitWidth,
          zoom
        }
      );

      slot.renderTask = job;

      await job.promise;

      if (token !== generation) return;

      slot.canvas = job.canvas;
      slot.rendered = true;
      slot.placeholder = null;
      slot.renderTask = null;

      applyLayout();
    } catch (error) {
      if (
        token === generation &&
        error?.name !== "RenderingCancelledException"
      ) {
        onError(error);
      }
    } finally {
      slot.rendering = false;
    }
  }

  /* -----------------------------------------------------
     LAZY RENDERING
     ----------------------------------------------------- */

  function observePages(token) {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (!("IntersectionObserver" in window)) {
      // Fallback for browsers without IntersectionObserver.
      slots.forEach((slot) => {
        renderSlot(slot, token);
      });

      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const slot = slots.find(
            (item) => item.row === entry.target
          );

          if (slot) {
            renderSlot(slot, token);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: stage,
        rootMargin: "1000px 0px",
        threshold: 0
      }
    );

    slots.forEach((slot) => {
      observer.observe(slot.row);
    });
  }

  /* -----------------------------------------------------
     OPEN PDF
     ----------------------------------------------------- */

  async function open(file) {
    if (destroyed) {
      throw new Error("PDF viewer has been destroyed.");
    }

    await close();

    const token = ++generation;

    resetZoom();

    currentPage = 1;
    slots = [];

    if (!file) {
      throw new Error("No PDF file was provided.");
    }

    const bytes = await file.arrayBuffer();

    if (token !== generation) return;

    loadingTask = pdfjs.getDocument({
      data: bytes
    });

    pdf = await loadingTask.promise;

    if (token !== generation) return;

    const firstPage = await pdf.getPage(1);

    if (token !== generation) return;

    const firstViewport = firstPage.getViewport({
      scale: 1
    });

    const firstAspect =
      firstViewport.height / firstViewport.width;

    documentElement = document.createElement("div");
    documentElement.className = "pdf-document";

    stage.replaceChildren(documentElement);
    stage.classList.add("pdf-stage");

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      createPageSlot(pageNumber, firstAspect);
    }

    applyLayout();

    observePages(token);

    // Render the first page immediately.
    await renderSlot(slots[0], token, firstPage);

    updateCurrentPage();

    return getState();
  }

  function updateCurrentPage() {
    if (!slots.length) return;

    const stageTop =
      stage.getBoundingClientRect().top;

    let nearestPage = 1;
    let nearestDistance = Infinity;

    slots.forEach((slot) => {
      const rect = slot.row.getBoundingClientRect();

      const distance = Math.abs(
        rect.top - stageTop - 56
      );

      if (
        rect.bottom > stageTop &&
        distance < nearestDistance
      ) {
        nearestDistance = distance;
        nearestPage = slot.pageNumber;
      }
    });

    if (nearestPage !== currentPage) {
      currentPage = nearestPage;

      onPageChange(
        currentPage,
        slots.length
      );
    }
  }

  let scrollFrame = 0;

  function onScroll() {
    if (scrollFrame) return;

    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      updateCurrentPage();
    });
  }

  stage.addEventListener("scroll", onScroll, {
    passive: true
  });

  /* -----------------------------------------------------
     RESIZE AND ROTATION
     ----------------------------------------------------- */

  async function handleResize() {
    if (!pdf || !slots.length) return;

    const token = generation;

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    // Cancel active renders and rebuild page canvases
    // at the new fit width.
    slots.forEach((slot) => {
      if (slot.renderTask) {
        slot.renderTask.cancel();
        slot.renderTask = null;
      }

      slot.rendered = false;
      slot.rendering = false;
      slot.canvas = null;

      slot.shell.replaceChildren();

      const placeholder = document.createElement("div");
      placeholder.className = "pdf-page-placeholder";

      slot.shell.append(placeholder);
      slot.placeholder = placeholder;
    });

    resetZoom();
    applyLayout();

    observePages(token);

    const firstVisible = slots.find((slot) => {
      const rect = slot.row.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      return (
        rect.bottom > stageRect.top &&
        rect.top < stageRect.bottom
      );
    });

    if (firstVisible) {
      await renderSlot(firstVisible, token);
    }
  }

  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);

      resizeFrame = requestAnimationFrame(() => {
        handleResize().catch(onError);
      });
    });

    resizeObserver.observe(stage);
  } else {
    window.addEventListener("resize", handleResize);
  }

  /* -----------------------------------------------------
     STATE
     ----------------------------------------------------- */

  function getState() {
    return {
      pageCount: pdf?.numPages || 0,
      currentPage,
      zoom,
      isOpen: Boolean(pdf)
    };
  }

  /* -----------------------------------------------------
     CLOSE AND CLEANUP
     ----------------------------------------------------- */

  async function close() {
    generation++;

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    slots.forEach((slot) => {
      if (slot.renderTask) {
        slot.renderTask.cancel();
        slot.renderTask = null;
      }
    });

    if (pdf) {
      try {
        await pdf.destroy();
      } catch (_) {}

      pdf = null;
    } else if (loadingTask) {
      try {
        await loadingTask.destroy();
      } catch (_) {}
    }

    loadingTask = null;

    slots = [];
    documentElement = null;

    zoom = 1;
    currentPage = 1;

    stage.replaceChildren();
    stage.classList.remove("pdf-stage");
  }

  async function destroy() {
    if (destroyed) return;

    destroyed = true;

    await close();

    zoomController.destroy();

    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    } else {
      window.removeEventListener("resize", handleResize);
    }

    stage.removeEventListener("scroll", onScroll);

    cancelAnimationFrame(resizeFrame);
    cancelAnimationFrame(scrollFrame);
  }

  return {
    open,
    close,
    destroy,

    setZoom,
    resetZoom,

    getState
  };
}