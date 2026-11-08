
export function createSpreadsheetViewer({
  stage,
  minZoom = 0.5,
  maxZoom = 2
}) {
  if (!stage) {
    throw new Error("Spreadsheet viewer requires a stage element.");
  }

  let workbook = null;
  let currentFile = null;
  let activeSheet = "";
  let zoom = 1;
  let surface = null;
  let spacer = null;
  let table = null;
  let pinch = null;
  let resizeObserver = null;

  const clamp = value =>
    Math.min(maxZoom, Math.max(minZoom, value));

  function columnName(index) {
    let name = "";

    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }

    return name;
  }

  function applyZoom(nextZoom, anchorX, anchorY) {
    if (!surface || !spacer) return;

    const next = clamp(nextZoom);
    if (Math.abs(next - zoom) < 0.001) return;

    const oldZoom = zoom;
    const oldLeft = stage.scrollLeft;
    const oldTop = stage.scrollTop;

    const x = anchorX ?? stage.clientWidth / 2;
    const y = anchorY ?? stage.clientHeight / 2;

    const documentX = (oldLeft + x) / oldZoom;
    const documentY = (oldTop + y) / oldZoom;

    zoom = next;

    surface.style.transform = `scale(${zoom})`;
    spacer.style.width = `${surface.offsetWidth * zoom}px`;
    spacer.style.height = `${surface.offsetHeight * zoom}px`;

    stage.scrollLeft = Math.max(0, documentX * zoom - x);
    stage.scrollTop = Math.max(0, documentY * zoom - y);
  }

  function renderSheet(sheetName) {
    if (!workbook) return;

    activeSheet = sheetName;
    zoom = 1;

    const sheet = workbook.Sheets[sheetName];
    const range = sheet["!ref"]
      ? XLSX.utils.decode_range(sheet["!ref"])
      : { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };

    const merges = sheet["!merges"] || [];
    const mergeStarts = new Map();
    const mergedCells = new Set();

    for (const merge of merges) {
      const key = `${merge.s.r}:${merge.s.c}`;

      mergeStarts.set(key, {
        rowSpan: merge.e.r - merge.s.r + 1,
        colSpan: merge.e.c - merge.s.c + 1
      });

      for (let r = merge.s.r; r <= merge.e.r; r++) {
        for (let c = merge.s.c; c <= merge.e.c; c++) {
          if (r !== merge.s.r || c !== merge.s.c) {
            mergedCells.add(`${r}:${c}`);
          }
        }
      }
    }

    const container = document.createElement("div");
    container.className = "sheet-zoom-surface";

    const grid = document.createElement("table");
    grid.className = "sheet-grid";

    const colgroup = document.createElement("colgroup");

    const rowNumberColumn = document.createElement("col");
    rowNumberColumn.className = "sheet-row-number-column";
    colgroup.appendChild(rowNumberColumn);

    for (let c = range.s.c; c <= range.e.c; c++) {
      const col = document.createElement("col");
      const width = sheet["!cols"]?.[c]?.wpx;

      if (width) {
        col.style.width = `${width}px`;
      }

      colgroup.appendChild(col);
    }

    grid.appendChild(colgroup);

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const corner = document.createElement("th");
    corner.className = "sheet-corner";
    corner.textContent = "";
    headerRow.appendChild(corner);

    for (let c = range.s.c; c <= range.e.c; c++) {
      const th = document.createElement("th");
      th.className = "sheet-column-heading";
      th.textContent = columnName(c);
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    grid.appendChild(thead);

    const tbody = document.createElement("tbody");
    const fragment = document.createDocumentFragment();

    for (let r = range.s.r; r <= range.e.r; r++) {
      const tr = document.createElement("tr");

      const rowHeading = document.createElement("th");
      rowHeading.className = "sheet-row-heading";
      rowHeading.textContent = String(r + 1);
      tr.appendChild(rowHeading);

      for (let c = range.s.c; c <= range.e.c; c++) {
        const key = `${r}:${c}`;

        if (mergedCells.has(key)) continue;

        const td = document.createElement("td");
        const cell = sheet[XLSX.utils.encode_cell({ r, c })];

        if (cell) {
          td.textContent =
            cell.w ?? (
              cell.v === undefined || cell.v === null
                ? ""
                : String(cell.v)
            );

          if (cell.t === "n") {
            td.classList.add("sheet-number");
          }

          if (cell.t === "b") {
            td.classList.add("sheet-boolean");
          }
        }

        const merge = mergeStarts.get(key);

        if (merge) {
          if (merge.rowSpan > 1) {
            td.rowSpan = merge.rowSpan;
          }

          if (merge.colSpan > 1) {
            td.colSpan = merge.colSpan;
          }
        }

        tr.appendChild(td);
      }

      const rowHeight = sheet["!rows"]?.[r]?.hpx;

      if (rowHeight) {
        tr.style.height = `${rowHeight}px`;
      }

      fragment.appendChild(tr);
    }

    tbody.appendChild(fragment);
    grid.appendChild(tbody);

    container.appendChild(grid);

    const tabs = document.createElement("div");
    tabs.className = "sheet-tabs";

    for (const name of workbook.SheetNames) {
      const button = document.createElement("button");

      button.type = "button";
      button.className =
        name === sheetName
          ? "sheet-tab active"
          : "sheet-tab";

      button.textContent = name;
      button.setAttribute("aria-pressed", String(name === sheetName));

      button.addEventListener("click", () => {
        renderSheet(name);
      });

      tabs.appendChild(button);
    }

    const viewer = document.createElement("div");
    viewer.className = "spreadsheet-viewer";

    viewer.append(container, tabs);

    stage.replaceChildren(viewer);

    surface = container;
    table = grid;

    spacer = document.createElement("div");
    spacer.className = "sheet-zoom-spacer";
    spacer.style.width = `${surface.offsetWidth}px`;
    spacer.style.height = `${surface.offsetHeight}px`;

    // The scaled surface is positioned over this sizing spacer.
    viewer.insertBefore(spacer, tabs);
    spacer.appendChild(surface);

    surface.style.transformOrigin = "top left";
    surface.style.transform = "scale(1)";

    stage.scrollLeft = 0;
    stage.scrollTop = 0;
  }

  function onTouchStart(event) {
    if (event.touches.length !== 2 || !surface) {
      pinch = null;
      return;
    }

    const a = event.touches[0];
    const b = event.touches[1];

    pinch = {
      distance: Math.hypot(
        a.clientX - b.clientX,
        a.clientY - b.clientY
      ),
      zoom,
      anchorX:
        (a.clientX + b.clientX) / 2 -
        stage.getBoundingClientRect().left,
      anchorY:
        (a.clientY + b.clientY) / 2 -
        stage.getBoundingClientRect().top
    };
  }

  function onTouchMove(event) {
    if (!pinch || event.touches.length !== 2) return;

    event.preventDefault();

    const a = event.touches[0];
    const b = event.touches[1];

    const distance = Math.hypot(
      a.clientX - b.clientX,
      a.clientY - b.clientY
    );

    if (!pinch.distance || !distance) return;

    const nextZoom =
      pinch.zoom * (distance / pinch.distance);

    applyZoom(
      nextZoom,
      pinch.anchorX,
      pinch.anchorY
    );
  }

  function onTouchEnd(event) {
    if (event.touches.length < 2) {
      pinch = null;
    }
  }

  function onWheel(event) {
    if (!event.ctrlKey || !surface) return;

    event.preventDefault();

    const rect = stage.getBoundingClientRect();

    applyZoom(
      zoom * Math.exp(-event.deltaY * 0.01),
      event.clientX - rect.left,
      event.clientY - rect.top
    );
  }

  async function open(file) {
    close();

    currentFile = file;

    if (!window.XLSX) {
      throw new Error("SheetJS library is not loaded.");
    }

    stage.classList.add("spreadsheet-stage");

    const loading = document.createElement("div");
    loading.className = "spreadsheet-loading";
    loading.textContent = "Reading spreadsheet...";
    stage.replaceChildren(loading);

    try {
      const buffer = await file.arrayBuffer();

      if (currentFile !== file) return;

      workbook = XLSX.read(buffer, {
        type: "array",
        cellDates: true,
        cellNF: true,
        cellText: true,
        cellStyles: true
      });

      if (!workbook.SheetNames.length) {
        throw new Error("The workbook contains no worksheets.");
      }

      renderSheet(workbook.SheetNames[0]);

    } catch (error) {
      if (currentFile !== file) return;

      console.error("Spreadsheet error:", error);

      const message = document.createElement("div");
      message.className = "spreadsheet-error";
      message.textContent = "Unable to read this spreadsheet.";

      stage.replaceChildren(message);

      throw error;
    }
  }

  function close() {
    currentFile = null;
    workbook = null;
    activeSheet = "";
    zoom = 1;
    pinch = null;
    surface = null;
    spacer = null;
    table = null;

    stage.classList.remove("spreadsheet-stage");
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
    getActiveSheet: () => activeSheet,
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
