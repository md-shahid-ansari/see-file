
import {
  parse,
  renderSlideToSvg
} from "../../../vendor/powerpoint/web-ppt.js";

export function createPowerPointViewer({
  stage,
  maxWidth = 1100,
  minZoom = 1,
  maxZoom = 4,
  onSlideCount = () => {},
  onError = () => {}
}) {
  if (!stage) {
    throw new Error("PowerPoint viewer requires a stage element.");
  }

  let presentation = null;
  let currentFile = null;
  let generation = 0;
  let slides = [];
  let zoom = 1;
  let resizeObserver = null;
  let resizeFrame = 0;
  let pinch = null;

  const clamp = value =>
    Math.min(maxZoom, Math.max(minZoom, value));

  function getFitWidth() {
    return Math.max(
      100,
      Math.min(maxWidth, stage.clientWidth - 32)
    );
  }

  function getAnchor(clientX, clientY) {
    if (!slides.length) return null;

    let selected = slides[0];
    let bestDistance = Infinity;

    for (const slide of slides) {
      const rect = slide.shell.getBoundingClientRect();

      const dx =
        clientX < rect.left
          ? rect.left - clientX
          : clientX > rect.right
            ? clientX - rect.right
            : 0;

      const dy =
        clientY < rect.top
          ? rect.top - clientY
          : clientY > rect.bottom
            ? clientY - rect.bottom
            : 0;

      const distance = Math.hypot(dx, dy);

      if (distance < bestDistance) {
        bestDistance = distance;
        selected = slide;
      }
    }

    const rect = selected.shell.getBoundingClientRect();

    return {
      slide: selected,
      x: Math.max(
        0,
        Math.min(1, (clientX - rect.left) / Math.max(1, rect.width))
      ),
      y: Math.max(
        0,
        Math.min(1, (clientY - rect.top) / Math.max(1, rect.height))
      )
    };
  }

  function applyLayout() {
    if (!slides.length) return;

    const fitWidth = getFitWidth();

    for (const slide of slides) {
      const width = fitWidth;
      const height = width * slide.ratio;

      const scaledWidth = width * zoom;
      const scaledHeight = height * zoom;

      slide.row.style.width =
        `${Math.max(stage.clientWidth, scaledWidth)}px`;

      slide.row.style.alignItems =
        scaledWidth <= stage.clientWidth
            ? "center"
            : "flex-start";

      slide.shell.style.width = `${scaledWidth}px`;
      slide.shell.style.height = `${scaledHeight}px`;

      slide.inner.style.width = `${width}px`;
      slide.inner.style.height = `${height}px`;
      slide.inner.style.transform = `scale(${zoom})`;
    }
  }

  function zoomAt(nextZoom, clientX, clientY, anchor = null) {
    const next = clamp(nextZoom);

    if (Math.abs(next - zoom) < 0.001) return;

    const target =
      anchor || getAnchor(clientX, clientY);

    zoom = next;
    applyLayout();

    if (!target) return;

    const rect = target.slide.shell.getBoundingClientRect();

    const newX = rect.left + rect.width * target.x;
    const newY = rect.top + rect.height * target.y;

    stage.scrollLeft += newX - clientX;
    stage.scrollTop += newY - clientY;
  }

  function onTouchStart(event) {
    if (event.touches.length !== 2 || !slides.length) {
      pinch = null;
      return;
    }

    const a = event.touches[0];
    const b = event.touches[1];

    const middleX = (a.clientX + b.clientX) / 2;
    const middleY = (a.clientY + b.clientY) / 2;

    pinch = {
      distance: Math.hypot(
        a.clientX - b.clientX,
        a.clientY - b.clientY
      ),
      zoom,
      anchor: getAnchor(middleX, middleY)
    };
  }

  function onTouchMove(event) {
    if (!pinch || event.touches.length !== 2) return;

    event.preventDefault();

    const a = event.touches[0];
    const b = event.touches[1];

    const middleX = (a.clientX + b.clientX) / 2;
    const middleY = (a.clientY + b.clientY) / 2;

    const distance = Math.hypot(
      a.clientX - b.clientX,
      a.clientY - b.clientY
    );

    if (!pinch.distance || !distance) return;

    zoomAt(
      pinch.zoom * (distance / pinch.distance),
      middleX,
      middleY,
      pinch.anchor
    );
  }

  function onTouchEnd(event) {
    if (event.touches.length < 2) {
      pinch = null;
    }
  }

  function onWheel(event) {
    if (!event.ctrlKey || !slides.length) return;

    event.preventDefault();

    const factor = Math.exp(-event.deltaY * 0.01);

    zoomAt(
      zoom * factor,
      event.clientX,
      event.clientY
    );
  }

  function handleResize() {
    cancelAnimationFrame(resizeFrame);

    resizeFrame = requestAnimationFrame(() => {
      if (!slides.length) return;

      zoom = 1;
      applyLayout();
    });
  }

  function getSvgDimensions(svg, presentation) {
    const viewBox = svg.getAttribute("viewBox");

    if (viewBox) {
      const values = viewBox.trim().split(/[\s,]+/).map(Number);

      if (
        values.length === 4 &&
        values[2] > 0 &&
        values[3] > 0
      ) {
        return {
          width: values[2],
          height: values[3]
        };
      }
    }

    const width = parseFloat(svg.getAttribute("width"));
    const height = parseFloat(svg.getAttribute("height"));

    if (width > 0 && height > 0) {
      return { width, height };
    }

    const size = presentation.slideSize || {};

    if (size.width > 0 && size.height > 0) {
      return {
        width: size.width,
        height: size.height
      };
    }

    return { width: 1280, height: 720 };
  }

  function renderSlides() {
    const viewer = document.createElement("div");
    viewer.className = "ppt-viewer";

    const fragment = document.createDocumentFragment();

    slides = [];

    for (let index = 0; index < presentation.slides.length; index++) {
      const slideData = presentation.slides[index];

      const markup = renderSlideToSvg(
        presentation,
        slideData
      );

      if (typeof markup !== "string" || !markup.trim()) {
        throw new Error(`Unable to render slide ${index + 1}.`);
      }

      const host = document.createElement("div");
      host.innerHTML = markup.trim();

      const svg = host.querySelector("svg");

      if (!svg) {
        throw new Error(`Invalid SVG returned for slide ${index + 1}.`);
      }

      const dimensions = getSvgDimensions(svg, presentation);

      const row = document.createElement("div");
      row.className = "ppt-slide-row";

      const shell = document.createElement("div");
      shell.className = "ppt-slide-shell";

      const inner = document.createElement("div");
      inner.className = "ppt-slide-inner";

      const slideNumber = document.createElement("div");
      slideNumber.className = "ppt-slide-number";
      slideNumber.textContent = `Slide ${index + 1}`;

      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

      svg.classList.add("ppt-slide-svg");

      inner.appendChild(svg);
      shell.appendChild(inner);
      row.append(shell, slideNumber);

      fragment.appendChild(row);

      slides.push({
        row,
        shell,
        inner,
        ratio: dimensions.height / dimensions.width
      });
    }

    viewer.appendChild(fragment);

    stage.replaceChildren(viewer);

    zoom = 1;
    applyLayout();

    onSlideCount(slides.length);
  }

  async function open(file) {
    close();

    const currentGeneration = generation;
    currentFile = file;

    stage.classList.add("ppt-stage");

    const loading = document.createElement("div");
    loading.className = "ppt-loading";
    loading.textContent = "Opening PowerPoint presentation...";

    stage.replaceChildren(loading);

    try {
      presentation = await parse(file);

      if (
        generation !== currentGeneration ||
        currentFile !== file
      ) {
        return;
      }

      if (
        !presentation ||
        !Array.isArray(presentation.slides) ||
        presentation.slides.length === 0
      ) {
        throw new Error("The presentation contains no slides.");
      }

      renderSlides();

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(stage);
      } else {
        window.addEventListener("resize", handleResize);
      }

    } catch (error) {
      if (
        generation !== currentGeneration ||
        currentFile !== file
      ) {
        return;
      }

      console.error("PowerPoint rendering error:", error);
      onError(error);

      const message = document.createElement("div");
      message.className = "ppt-error";
      message.textContent =
        "Unable to display this PowerPoint presentation.";

      stage.replaceChildren(message);

      throw error;
    }
  }

  function close() {
    generation++;
    currentFile = null;
    presentation = null;
    slides = [];
    zoom = 1;
    pinch = null;

    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    cancelAnimationFrame(resizeFrame);
    window.removeEventListener("resize", handleResize);

    stage.classList.remove("ppt-stage");
    stage.replaceChildren();

    onSlideCount(0);
  }

  stage.addEventListener("touchstart", onTouchStart, {
    passive: true
  });

  stage.addEventListener("touchmove", onTouchMove, {
    passive: false
  });

  stage.addEventListener("touchend", onTouchEnd, {
    passive: true
  });

  stage.addEventListener("touchcancel", onTouchEnd, {
    passive: true
  });

  stage.addEventListener("wheel", onWheel, {
    passive: false
  });

  return {
    open,
    close,

    getZoom: () => zoom,
    getSlideCount: () => slides.length,

    resetZoom() {
      zoom = 1;
      applyLayout();
      stage.scrollLeft = 0;
      stage.scrollTop = 0;
    },

    destroy() {
      close();

      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
      stage.removeEventListener("wheel", onWheel);
    }
  };
}
