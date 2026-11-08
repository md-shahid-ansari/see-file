
export function createDocxViewer({
  stage,
  maxWidth = 1100,
  minZoom = 1,
  maxZoom = 4,
  onError = () => {}
}) {
  if (!stage) {
    throw new Error("DOCX viewer requires a stage element.");
  }

  let currentFile = null;
  let generation = 0;
  let pages = [];
  let zoom = 1;
  let resizeObserver = null;
  let resizeFrame = 0;

  let pinch = null;

  const clamp = (value) =>
    Math.min(maxZoom, Math.max(minZoom, value));

  function getFitWidth() {
    return Math.max(
      100,
      Math.min(maxWidth, stage.clientWidth - 16)
    );
  }

  function getAnchor(clientX, clientY) {
    if (!pages.length) return null;

    let selected = pages[0];
    let bestDistance = Infinity;

    for (const page of pages) {
      const rect = page.shell.getBoundingClientRect();

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
        selected = page;
      }
    }

    const rect = selected.shell.getBoundingClientRect();

    return {
      page: selected,
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
    if (!pages.length) return;

    const fitWidth = getFitWidth();

    for (const page of pages) {
      const fitScale = fitWidth / page.width;
      const scale = fitScale * zoom;

      page.shell.style.width = `${page.width * scale}px`;
      page.shell.style.height = `${page.height * scale}px`;

      page.element.style.width = `${page.width}px`;
      page.element.style.height = `${page.height}px`;
      page.element.style.transform = `scale(${scale})`;
    }
  }

  function zoomAt(nextZoom, clientX, clientY, anchor = null) {
    const next = clamp(nextZoom);

    if (Math.abs(next - zoom) < 0.001) return;

    const target = anchor || getAnchor(clientX, clientY);

    zoom = next;
    applyLayout();

    if (!target) return;

    const rect = target.page.shell.getBoundingClientRect();

    const newAnchorX = rect.left + rect.width * target.x;
    const newAnchorY = rect.top + rect.height * target.y;

    stage.scrollLeft += newAnchorX - clientX;
    stage.scrollTop += newAnchorY - clientY;
  }

  function distance(a, b) {
    return Math.hypot(
      a.clientX - b.clientX,
      a.clientY - b.clientY
    );
  }

  function midpoint(a, b) {
    return {
      x: (a.clientX + b.clientX) / 2,
      y: (a.clientY + b.clientY) / 2
    };
  }

  function onTouchStart(event) {
    if (event.touches.length !== 2 || !pages.length) {
      pinch = null;
      return;
    }

    const a = event.touches[0];
    const b = event.touches[1];
    const middle = midpoint(a, b);

    pinch = {
      distance: distance(a, b),
      zoom,
      anchor: getAnchor(middle.x, middle.y)
    };
  }

  function onTouchMove(event) {
    if (!pinch || event.touches.length !== 2) return;

    event.preventDefault();

    const a = event.touches[0];
    const b = event.touches[1];
    const middle = midpoint(a, b);

    const currentDistance = distance(a, b);

    if (!pinch.distance || !currentDistance) return;

    const nextZoom =
      pinch.zoom * (currentDistance / pinch.distance);

    zoomAt(
      nextZoom,
      middle.x,
      middle.y,
      pinch.anchor
    );
  }

  function onTouchEnd(event) {
    if (event.touches.length < 2) {
      pinch = null;
    }
  }

  function onWheel(event) {
    if (!event.ctrlKey || !pages.length) return;

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
      if (!pages.length) return;

      zoom = 1;
      applyLayout();
    });
  }

  function preparePages(contentContainer) {
    const pageElements = [
      ...contentContainer.querySelectorAll(".docx-wrapper .docx")
    ].filter((element) => {
      return !element.parentElement.closest(".docx");
    });

    pages = [];

    for (const element of pageElements) {
      const width = element.getBoundingClientRect().width;
      const height = element.getBoundingClientRect().height;

      if (!width || !height) continue;

      const shell = document.createElement("div");
      shell.className = "docx-page-zoom-shell";

      element.parentNode.insertBefore(shell, element);
      shell.appendChild(element);

      element.style.margin = "0";
      element.style.transformOrigin = "top left";
      element.style.maxWidth = "none";
      element.style.flex = "none";

      pages.push({
        element,
        shell,
        width,
        height
      });
    }

    zoom = 1;
    applyLayout();
  }

  async function open(file) {
    close();

    const currentGeneration = generation;
    currentFile = file;

    const docxLibrary = window.docx;

    if (
      !docxLibrary ||
      typeof docxLibrary.renderAsync !== "function"
    ) {
      throw new Error("docx-preview library is not loaded.");
    }

    stage.classList.add("docx-stage");

    const wrapper = document.createElement("div");
    wrapper.className = "docx-viewer";

    const styleContainer = document.createElement("div");
    styleContainer.className = "docx-styles";

    const contentContainer = document.createElement("div");
    contentContainer.className = "docx-content";

    const loading = document.createElement("div");
    loading.className = "docx-loading";
    loading.textContent = "Loading Word document...";

    contentContainer.appendChild(loading);
    wrapper.append(styleContainer, contentContainer);
    stage.replaceChildren(wrapper);

    try {
      await docxLibrary.renderAsync(
        file,
        contentContainer,
        styleContainer,
        {
          className: "docx",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          experimental: false,
          trimXmlDeclaration: true,
          useBase64URL: false,
          renderChanges: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true
        }
      );

      if (
        generation !== currentGeneration ||
        currentFile !== file
      ) {
        return;
      }

      loading.remove();

      preparePages(contentContainer);

      if (!pages.length) {
        throw new Error("No DOCX pages were rendered.");
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

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

      console.error("DOCX rendering error:", error);
      onError(error);

      wrapper.replaceChildren();

      const errorMessage = document.createElement("div");
      errorMessage.className = "docx-error";
      errorMessage.textContent =
        "Unable to display this Word document.";

      wrapper.appendChild(errorMessage);

      throw error;
    }
  }

  function close() {
    generation++;
    currentFile = null;
    pages = [];
    zoom = 1;
    pinch = null;

    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    cancelAnimationFrame(resizeFrame);
    window.removeEventListener("resize", handleResize);

    stage.classList.remove("docx-stage");
    stage.replaceChildren();
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
