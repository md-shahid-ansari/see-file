// js/modules/pdf/pdf-zoom.js

export function createPdfZoom(options = {}) {
  const {
    element,
    getZoom,
    setZoom,
    getContentOffset = () => ({ x: 0, y: 0 }),
    minZoom = 1,
    maxZoom = 4
  } = options;

  if (!element) {
    throw new Error("PDF zoom requires a viewer element.");
  }

  let active = false;
  let startDistance = 0;
  let startZoom = 1;

  let startScrollLeft = 0;
  let startScrollTop = 0;

  let startMidX = 0;
  let startMidY = 0;

  let startOffsetX = 0;
  let startOffsetY = 0;

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

  function clamp(value) {
    return Math.min(maxZoom, Math.max(minZoom, value));
  }

  function onTouchStart(event) {
    if (event.touches.length !== 2) return;

    const a = event.touches[0];
    const b = event.touches[1];
    const middle = midpoint(a, b);
    const rect = element.getBoundingClientRect();
    const offset = getContentOffset(middle.x, middle.y);

    active = true;

    startDistance = distance(a, b);
    startZoom = getZoom();

    startScrollLeft = element.scrollLeft;
    startScrollTop = element.scrollTop;

    startMidX = middle.x - rect.left;
    startMidY = middle.y - rect.top;

    startOffsetX = offset.x;
    startOffsetY = offset.y;
  }

  function onTouchMove(event) {
    if (!active || event.touches.length !== 2) return;

    event.preventDefault();

    const a = event.touches[0];
    const b = event.touches[1];
    const middle = midpoint(a, b);

    const currentDistance = distance(a, b);

    if (!startDistance || !currentDistance) return;

    const rect = element.getBoundingClientRect();

    const currentMidX = middle.x - rect.left;
    const currentMidY = middle.y - rect.top;

    const ratio = currentDistance / startDistance;

    const nextZoom = clamp(startZoom * ratio);

    // Identify the exact document point initially
    // located underneath the fingers.
    const documentX =
      (
        startScrollLeft +
        startMidX -
        startOffsetX
      ) / startZoom;

    const documentY =
      (
        startScrollTop +
        startMidY -
        startOffsetY
      ) / startZoom;

    setZoom(nextZoom);

    // The document may have changed its centring offset.
    const newOffset = getContentOffset(middle.x, middle.y);

    // Keep the same document point beneath the fingers.
    element.scrollLeft = Math.max(
      0,
      newOffset.x +
      documentX * nextZoom -
      currentMidX
    );

    element.scrollTop = Math.max(
      0,
      newOffset.y +
      documentY * nextZoom -
      currentMidY
    );
  }

  function onTouchEnd(event) {
    if (event.touches.length < 2) {
      active = false;
      startDistance = 0;
    }
  }

  element.addEventListener(
    "touchstart",
    onTouchStart,
    { passive: true }
  );

  element.addEventListener(
    "touchmove",
    onTouchMove,
    { passive: false }
  );

  element.addEventListener(
    "touchend",
    onTouchEnd,
    { passive: true }
  );

  element.addEventListener(
    "touchcancel",
    onTouchEnd,
    { passive: true }
  );

  return {
    destroy() {
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
      element.removeEventListener("touchcancel", onTouchEnd);

      active = false;
    }
  };
}