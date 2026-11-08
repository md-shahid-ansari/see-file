
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const home = $("home");
  const viewer = $("viewer");
  const fileInput = $("fileInput");
  const stage = $("stage");
  const previousButton = $("previous");
  const nextButton = $("next");
  const position = $("position");
  const message = $("message");

  const state = {
    files: [],
    fileIndex: -1,
    file: null,
    kind: null,

    pdf: null,
    pdfPage: 1,
    pdfRenderTask: null,

    workbook: null,
    sheetIndex: 0,

    objectUrl: null,

    renderToken: 0,

    // Document-level pinch zoom
    documentZoom: 1,
    activePointers: new Map(),
    pinchStartDistance: 0,
    pinchStartZoom: 1
  };

  const MAX_ZOOM = 4;
  const MIN_ZOOM = 1;
  const DESKTOP_MAX_WIDTH = 1100;

  const PDF_EXTENSIONS = new Set(["pdf"]);
  const DOCX_EXTENSIONS = new Set(["docx"]);
  const SHEET_EXTENSIONS = new Set(["xlsx", "xls"]);
  const CSV_EXTENSIONS = new Set(["csv", "tsv"]);
  const TEXT_EXTENSIONS = new Set(["txt", "md", "json", "xml"]);
  const HTML_EXTENSIONS = new Set(["html", "htm"]);
  const IMAGE_EXTENSIONS = new Set([
    "png", "jpg", "jpeg", "gif", "webp",
    "bmp", "svg", "avif"
  ]);

  /* =====================================================
     INITIAL EVENTS
     ===================================================== */

  $("chooseFile").addEventListener("click", () => {
    fileInput.click();
  });

  $("openAnother").addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", async (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length) {
      await loadSelection(files);
    }

    // Allow selecting the same file again.
    fileInput.value = "";
  });

  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));

  /* =====================================================
     DOCUMENT PINCH ZOOM
     ===================================================== */

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function pointerDistance(a, b) {
    return Math.hypot(
      a.x - b.x,
      a.y - b.y
    );
  }

  function setDocumentZoom(value) {
    const zoom = clamp(value, MIN_ZOOM, MAX_ZOOM);

    state.documentZoom = zoom;

    const documentElement = stage.firstElementChild;

    if (!documentElement) return;

    documentElement.style.zoom = String(zoom);

    // PDF needs a special layout when enlarged.
    if (state.kind === "pdf") {
      const pdfContainer = documentElement;

      if (zoom > 1) {
        /*
        * Keep the zoomed container's visible base width
        * equal to the viewer width.
        *
        * The actual canvas can overflow to the right,
        * making the full enlarged page horizontally scrollable.
        */
        pdfContainer.style.width = `${100 / zoom}%`;
        pdfContainer.style.maxWidth = "none";
        pdfContainer.style.marginLeft = "0";
        pdfContainer.style.marginRight = "0";
        pdfContainer.style.alignItems = "flex-start";
      } else {
        pdfContainer.style.width = "100%";
        pdfContainer.style.maxWidth = "1100px";
        pdfContainer.style.marginLeft = "auto";
        pdfContainer.style.marginRight = "auto";
        pdfContainer.style.alignItems = "center";
      }
    }
  }

  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;

    state.activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    try {
      stage.setPointerCapture(event.pointerId);
    } catch (_) {}

    if (state.activePointers.size === 2) {
      const points = Array.from(
        state.activePointers.values()
      );

      state.pinchStartDistance = pointerDistance(
        points[0],
        points[1]
      );

      state.pinchStartZoom = state.documentZoom;
    }
  }, { passive: true });

  stage.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "touch") return;

    if (!state.activePointers.has(event.pointerId)) {
      return;
    }

    state.activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (
      state.activePointers.size !== 2 ||
      !state.pinchStartDistance
    ) {
      return;
    }

    // Prevent the browser from interpreting this as page zoom.
    event.preventDefault();

    const points = Array.from(
      state.activePointers.values()
    );

    const currentDistance = pointerDistance(
      points[0],
      points[1]
    );

    if (currentDistance <= 0) return;

    const ratio = currentDistance / state.pinchStartDistance;

    setDocumentZoom(
      state.pinchStartZoom * ratio
    );
  }, { passive: false });

  function finishPointer(event) {
    state.activePointers.delete(event.pointerId);

    if (state.activePointers.size < 2) {
      state.pinchStartDistance = 0;
    }
  }

  stage.addEventListener("pointerup", finishPointer);
  stage.addEventListener("pointercancel", finishPointer);
  stage.addEventListener("lostpointercapture", finishPointer);

  /* =====================================================
     DRAG AND DROP
     ===================================================== */

  document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  document.addEventListener("drop", async (event) => {
    event.preventDefault();

    const files = Array.from(
      event.dataTransfer?.files || []
    );

    if (files.length) {
      await loadSelection(files);
    }
  });

  window.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  /* =====================================================
     FILE SELECTION AND OPENING
     ===================================================== */

  async function loadSelection(files) {
    state.files = files.filter(
      (file) => file && typeof file.name === "string"
    );

    if (!state.files.length) return;

    state.fileIndex = 0;

    home.hidden = true;
    viewer.hidden = false;

    await openCurrentFile();
  }

  async function openCurrentFile() {
    const file = state.files[state.fileIndex];

    if (!file) return;

    const token = ++state.renderToken;

    resetDocumentZoom();

    state.activePointers.clear();
    state.pinchStartDistance = 0;

    await cleanupCurrentDocument();

    if (token !== state.renderToken) return;

    state.file = file;
    state.kind = detectFileKind(file);

    stage.replaceChildren();

    showMessage("");
    setPosition("");

    updateNavigation();

    try {
      switch (state.kind) {
        case "pdf":
          await openPdf(file, token);
          break;

        case "docx":
          await openDocx(file, token);
          break;

        case "sheet":
          await openWorkbook(file, token);
          break;

        case "csv":
          await openDelimited(file, token);
          break;

        case "text":
          await openText(file, token);
          break;

        case "html":
          await openHtml(file, token);
          break;

        case "image":
          await openImage(file, token);
          break;

        default:
          throw new Error(
            `Unsupported file type: ${file.name || "unnamed file"}`
          );
      }

      if (token !== state.renderToken) return;

      updateNavigation();
    } catch (error) {
      if (token !== state.renderToken) return;

      console.error("SeeFile error:", error);

      showError(getErrorMessage(error));
    }
  }

  function detectFileKind(file) {
    const name = String(file.name || "").trim();
    const dot = name.lastIndexOf(".");
    const extension = dot >= 0
      ? name.slice(dot + 1).toLowerCase()
      : "";

    const mime = String(file.type || "")
      .toLowerCase()
      .split(";")[0]
      .trim();

    // File extension takes priority over MIME.
    if (
      PDF_EXTENSIONS.has(extension) ||
      (!extension && mime === "application/pdf")
    ) return "pdf";

    if (
      DOCX_EXTENSIONS.has(extension) ||
      (!extension && mime ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) return "docx";

    if (
      SHEET_EXTENSIONS.has(extension) ||
      (!extension && /spreadsheet|excel/.test(mime))
    ) return "sheet";

    if (
      CSV_EXTENSIONS.has(extension) ||
      (!extension && (
        mime === "text/csv" ||
        mime === "text/tab-separated-values"
      ))
    ) return "csv";

    if (
      HTML_EXTENSIONS.has(extension) ||
      (!extension && (
        mime === "text/html" ||
        mime === "application/xhtml+xml"
      ))
    ) return "html";

    if (
      TEXT_EXTENSIONS.has(extension) ||
      (!extension && (
        mime.startsWith("text/") ||
        mime === "application/json" ||
        mime.endsWith("+xml")
      ))
    ) return "text";

    if (
      IMAGE_EXTENSIONS.has(extension) ||
      (!extension && mime.startsWith("image/"))
    ) return "image";

    return "unknown";
  }

  /* =====================================================
     CLEANUP
     ===================================================== */

  function resetDocumentZoom() {
    state.documentZoom = 1;

    const element = stage.firstElementChild;

    if (element) {
      element.style.zoom = "1";
    }
  }

  async function cleanupCurrentDocument() {
    if (state.pdfRenderTask) {
      try {
        state.pdfRenderTask.cancel();
      } catch (_) {}

      state.pdfRenderTask = null;
    }

    if (state.pdf) {
      try {
        await state.pdf.destroy();
      } catch (_) {}

      state.pdf = null;
    }

    if (state.objectUrl) {
      URL.revokeObjectURL(state.objectUrl);
      state.objectUrl = null;
    }

    state.workbook = null;
    state.pdfPage = 1;
    state.sheetIndex = 0;
  }

  /* =====================================================
     NAVIGATION
     ===================================================== */

  function updateNavigation() {
    const canNavigateFiles = state.files.length > 1;

    let current = "";
    let canNavigatePages = false;

    let previousLabel = "Previous";
    let nextLabel = "Next";

    if (state.kind === "pdf" && state.pdf) {
      canNavigatePages = state.pdf.numPages > 1;

      current = `${state.pdfPage} / ${state.pdf.numPages}`;
    } else if (state.kind === "sheet" && state.workbook) {
      canNavigatePages =
        state.workbook.SheetNames.length > 1;

      current =
        `${state.sheetIndex + 1} / ${state.workbook.SheetNames.length}`;
    } else if (canNavigateFiles) {
      canNavigatePages = true;

      current =
        `${state.fileIndex + 1} / ${state.files.length}`;

      previousLabel = "Prev file";
      nextLabel = "Next file";
    }

    previousButton.textContent = previousLabel;
    nextButton.textContent = nextLabel;

    previousButton.disabled = true;
    nextButton.disabled = true;

    if (state.kind === "pdf" && state.pdf) {
      previousButton.disabled = state.pdfPage <= 1;
      nextButton.disabled =
        state.pdfPage >= state.pdf.numPages;
    } else if (state.kind === "sheet" && state.workbook) {
      previousButton.disabled = state.sheetIndex <= 0;
      nextButton.disabled =
        state.sheetIndex >= state.workbook.SheetNames.length - 1;
    } else if (canNavigateFiles) {
      previousButton.disabled = state.fileIndex <= 0;
      nextButton.disabled =
        state.fileIndex >= state.files.length - 1;
    }

    setPosition(current);
  }

  async function move(direction) {
    if (state.kind === "pdf" && state.pdf) {
      const target = state.pdfPage + direction;

      if (target < 1 || target > state.pdf.numPages) {
        return;
      }

      state.pdfPage = target;

      resetDocumentZoom();

      await renderPdfPage(state.renderToken);

      updateNavigation();

      stage.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });

      return;
    }

    if (state.kind === "sheet" && state.workbook) {
      const target = state.sheetIndex + direction;

      if (
        target < 0 ||
        target >= state.workbook.SheetNames.length
      ) return;

      state.sheetIndex = target;

      resetDocumentZoom();

      renderSheetAtIndex();

      updateNavigation();

      stage.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });

      return;
    }

    const target = state.fileIndex + direction;

    if (target < 0 || target >= state.files.length) {
      return;
    }

    state.fileIndex = target;

    await openCurrentFile();
  }

  /* =====================================================
     PDF
     ===================================================== */

  async function openPdf(file, token) {
    if (!window.pdfjsLib) {
      throw new Error(
        "PDF.js did not load. Check vendor/pdfjs/pdf.min.js."
      );
    }

    const workerUrl = new URL(
      "./vendor/pdfjs/pdf.worker.min.js",
      document.baseURI
    ).href;

    pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

    const bytes = await file.arrayBuffer();

    if (token !== state.renderToken) return;

    const loadingTask = pdfjsLib.getDocument({
      data: bytes
    });

    state.pdf = await loadingTask.promise;

    if (token !== state.renderToken) return;

    state.pdfPage = 1;

    await renderPdfPage(token);
  }

  async function renderPdfPage(token) {
    if (!state.pdf || token !== state.renderToken) {
      return;
    }

    if (state.pdfRenderTask) {
      try {
        state.pdfRenderTask.cancel();
      } catch (_) {}

      state.pdfRenderTask = null;
    }

    const page = await state.pdf.getPage(state.pdfPage);

    if (token !== state.renderToken) return;

    const originalViewport = page.getViewport({
      scale: 1
    });

    /*
      Mobile:
      available width = screen width minus small margins.

      Desktop:
      maximum document width = 1100px.

      Do not upscale smaller pages.
    */

    const availableWidth = Math.max(
      1,
      Math.min(
        DESKTOP_MAX_WIDTH,
        stage.clientWidth - 16
      )
    );

    const fitScale = Math.min(
      1,
      availableWidth / originalViewport.width
    );

    const viewport = page.getViewport({
      scale: fitScale
    });

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d", {
      alpha: false
    });

    if (!context) {
      throw new Error(
        "This browser could not create a canvas for PDF rendering."
      );
    }

    canvas.width = Math.ceil(viewport.width * dpr);
    canvas.height = Math.ceil(viewport.height * dpr);

    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    canvas.className = "pdf-page";

    canvas.setAttribute(
      "aria-label",
      `PDF page ${state.pdfPage}`
    );

    const holder = document.createElement("div");
    holder.id = "pdfPages";

    holder.append(canvas);

    stage.replaceChildren(holder);

    const renderTask = page.render({
      canvasContext: context,
      viewport,
      transform: dpr === 1
        ? null
        : [dpr, 0, 0, dpr, 0, 0]
    });

    state.pdfRenderTask = renderTask;

    try {
      await renderTask.promise;
    } catch (error) {
      if (
        error?.name !== "RenderingCancelledException"
      ) {
        throw error;
      }
    } finally {
      if (state.pdfRenderTask === renderTask) {
        state.pdfRenderTask = null;
      }
    }

    if (token === state.renderToken) {
      updateNavigation();
    }
  }

  /* =====================================================
     DOCX / WORD
     ===================================================== */

  async function openDocx(file, token) {
    if (!window.docx || !window.JSZip) {
      throw new Error(
        "DOCX renderer or JSZip did not load. Check vendor/docx and vendor/jszip."
      );
    }

    const target = document.createElement("div");
    target.id = "docxView";

    stage.replaceChildren(target);

    /*
      The third argument is the style container.
      Passing target as both containers allows docx-preview
      to inject its generated Word styles into the viewer.

      Do not replace this with plain text extraction.
    */

    await window.docx.renderAsync(
      file,
      target,
      target,
      {
        className: "docx",
        inWrapper: true,

        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,

        breakPages: true,
        ignoreLastRenderedPageBreak: false,

        renderHeaders: true,
        renderFooters: true,
        renderFootnotes: true,
        renderEndnotes: true,
        renderAltChunks: true
      }
    );

    if (token !== state.renderToken) {
      target.remove();
      return;
    }

    fitDocxPages(target);
  }

  function fitDocxPages(target) {
    if (!target) return;

    const availableWidth = Math.max(
      1,
      Math.min(
        DESKTOP_MAX_WIDTH,
        stage.clientWidth - 16
      )
    );

    const pages = target.querySelectorAll(
      ".docx-wrapper section.docx"
    );

    pages.forEach((page) => {
      // Reset before measuring to avoid repeated scaling.
      page.style.zoom = "1";

      const originalWidth = page.offsetWidth;

      if (!originalWidth) return;

      const scale = Math.min(
        1,
        availableWidth / originalWidth
      );

      page.style.zoom = String(scale);
    });
  }

  /* =====================================================
     EXCEL / XLSX / XLS
     ===================================================== */

  async function openWorkbook(file, token) {
    if (!window.XLSX) {
      throw new Error(
        "SheetJS did not load. Check vendor/xlsx/xlsx.full.min.js."
      );
    }

    const bytes = await file.arrayBuffer();

    if (token !== state.renderToken) return;

    state.workbook = XLSX.read(bytes, {
      type: "array",
      cellDates: true,
      dense: true
    });

    if (!state.workbook.SheetNames.length) {
      throw new Error(
        "This spreadsheet contains no worksheets."
      );
    }

    state.sheetIndex = 0;

    renderSheetAtIndex();
  }

  function renderSheetAtIndex() {
    const workbook = state.workbook;

    if (!workbook) return;

    const sheetName =
      workbook.SheetNames[state.sheetIndex];

    const worksheet =
      workbook.Sheets[sheetName];

    const host = document.createElement("section");
    host.id = "sheetView";

    const tabs = document.createElement("div");
    tabs.className = "sheet-tabs";

    workbook.SheetNames.forEach((name, index) => {
      const button = document.createElement("button");

      button.type = "button";

      button.className =
        "sheet-tab" +
        (index === state.sheetIndex ? " active" : "");

      button.textContent = name;

      button.addEventListener("click", () => {
        state.sheetIndex = index;

        resetDocumentZoom();

        renderSheetAtIndex();

        updateNavigation();
      });

      tabs.append(button);
    });

    const range = safeSheetRange(worksheet);

    const maxRows = 500;
    const maxColumns = 80;

    const rowsToRender = Math.min(
      range.endRow - range.startRow + 1,
      maxRows
    );

    const columnsToRender = Math.min(
      range.endColumn - range.startColumn + 1,
      maxColumns
    );

    const note = document.createElement("p");
    note.className = "table-note";

    if (
      rowsToRender < range.endRow - range.startRow + 1 ||
      columnsToRender < range.endColumn - range.startColumn + 1
    ) {
      note.textContent =
        `Large worksheet: showing the first ${rowsToRender} rows and ${columnsToRender} columns for performance.`;
    }

    const tableWrap = document.createElement("div");
    tableWrap.className = "sheet-table-wrap";

    const table = document.createElement("table");
    table.className = "grid";

    const body = document.createElement("tbody");

    for (
      let rowIndex = 0;
      rowIndex < rowsToRender;
      rowIndex++
    ) {
      const tr = document.createElement("tr");

      for (
        let colIndex = 0;
        colIndex < columnsToRender;
        colIndex++
      ) {
        const cellAddress = XLSX.utils.encode_cell({
          r: range.startRow + rowIndex,
          c: range.startColumn + colIndex
        });

        const cellData = worksheet[cellAddress];

        const cell = document.createElement(
          rowIndex === 0 ? "th" : "td"
        );

        cell.textContent = cellData
          ? formatCell(cellData)
          : "";

        tr.append(cell);
      }

      body.append(tr);
    }

    table.append(body);
    tableWrap.append(table);

    host.append(tabs);

    if (note.textContent) {
      host.append(note);
    }

    host.append(tableWrap);

    stage.replaceChildren(host);
  }

  function safeSheetRange(worksheet) {
    const ref = worksheet && worksheet["!ref"];

    if (!ref) {
      return {
        startRow: 0,
        endRow: 0,
        startColumn: 0,
        endColumn: 0
      };
    }

    try {
      const decoded = XLSX.utils.decode_range(ref);

      return {
        startRow: Math.max(0, decoded.s.r),
        endRow: Math.max(decoded.s.r, decoded.e.r),
        startColumn: Math.max(0, decoded.s.c),
        endColumn: Math.max(decoded.s.c, decoded.e.c)
      };
    } catch (_) {
      return {
        startRow: 0,
        endRow: 0,
        startColumn: 0,
        endColumn: 0
      };
    }
  }

  function formatCell(cell) {
    if (cell.w !== undefined && cell.w !== null) {
      return String(cell.w);
    }

    if (cell.v instanceof Date) {
      return cell.v.toLocaleString();
    }

    return cell.v == null ? "" : String(cell.v);
  }

  /* =====================================================
     CSV / TSV
     ===================================================== */

  async function openDelimited(file, token) {
    const content = await file.text();

    if (token !== state.renderToken) return;

    const delimiter = file.name
      .toLowerCase()
      .endsWith(".tsv")
      ? "\t"
      : detectDelimiter(content);

    const rows = parseDelimited(
      content,
      delimiter
    );

    renderRows(rows, "sheetView");
  }

  function detectDelimiter(content) {
    const firstLine =
      content.split(/\r\n|\n|\r/, 1)[0] || "";

    const candidates = [",", "\t", ";", "|"];

    return candidates.sort(
      (a, b) =>
        countUnquoted(firstLine, b) -
        countUnquoted(firstLine, a)
    )[0];
  }

  function countUnquoted(line, delimiter) {
    let quoted = false;
    let count = 0;

    for (let i = 0; i < line.length; i++) {
      if (
        line[i] === '"' &&
        line[i + 1] === '"' &&
        quoted
      ) {
        i++;
        continue;
      }

      if (line[i] === '"') {
        quoted = !quoted;
      } else if (
        line[i] === delimiter &&
        !quoted
      ) {
        count++;
      }
    }

    return count;
  }

  function parseDelimited(content, delimiter) {
    const rows = [];

    let row = [];
    let field = "";
    let quoted = false;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const next = content[i + 1];

      if (
        char === '"' &&
        quoted &&
        next === '"'
      ) {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (
        char === delimiter &&
        !quoted
      ) {
        row.push(field);
        field = "";
      } else if (
        (char === "\n" || char === "\r") &&
        !quoted
      ) {
        if (
          char === "\r" &&
          next === "\n"
        ) {
          i++;
        }

        row.push(field);
        rows.push(row);

        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }

    return rows;
  }

  function renderRows(rows, id) {
    const host = document.createElement("section");
    host.id = id;

    const table = document.createElement("table");
    table.className = "grid";

    const body = document.createElement("tbody");

    const maxRows = 1000;
    const maxColumns = 100;

    const limitedRows = rows.slice(0, maxRows);

    limitedRows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");

      row.slice(0, maxColumns).forEach((value) => {
        const cell = document.createElement(
          rowIndex === 0 ? "th" : "td"
        );

        cell.textContent = value;

        tr.append(cell);
      });

      body.append(tr);
    });

    table.append(body);
    host.append(table);

    if (
      rows.length > maxRows ||
      rows.some((row) => row.length > maxColumns)
    ) {
      const note = document.createElement("p");

      note.className = "table-note";

      note.textContent =
        `Large file: showing at most ${maxRows} rows and ${maxColumns} columns for performance.`;

      host.prepend(note);
    }

    stage.replaceChildren(host);
  }

  /* =====================================================
     TEXT / MARKDOWN / JSON / XML
     ===================================================== */

  async function openText(file, token) {
    const content = await file.text();

    if (token !== state.renderToken) return;

    const pre = document.createElement("pre");

    pre.id = "textView";
    pre.textContent = content;

    stage.replaceChildren(pre);
  }

  /* =====================================================
     HTML
     ===================================================== */

  async function openHtml(file, token) {
    const source = await file.text();

    if (token !== state.renderToken) return;

    const frame = document.createElement("iframe");

    frame.id = "htmlView";
    frame.title = `HTML preview: ${file.name}`;

    // Scripts are intentionally disabled for local HTML safety.
    frame.setAttribute("sandbox", "allow-forms");
    frame.setAttribute("referrerpolicy", "no-referrer");

    frame.srcdoc = source;

    stage.replaceChildren(frame);
  }

  /* =====================================================
     IMAGES
     ===================================================== */

  async function openImage(file, token) {
    const url = URL.createObjectURL(file);

    if (token !== state.renderToken) {
      URL.revokeObjectURL(url);
      return;
    }

    state.objectUrl = url;

    const wrapper = document.createElement("div");
    wrapper.id = "imageView";

    const image = document.createElement("img");

    image.alt = file.name;
    image.decoding = "async";
    image.src = url;

    image.addEventListener("error", () => {
      showError(
        "The browser could not decode this image."
      );
    });

    wrapper.append(image);

    stage.replaceChildren(wrapper);
  }

  /* =====================================================
     RESIZE / ORIENTATION CHANGE
     ===================================================== */

  let resizeTimer = null;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(async () => {
      const token = state.renderToken;

      if (state.kind === "docx") {
        fitDocxPages($("docxView"));
      }

      if (state.kind === "pdf" && state.pdf) {
        try {
          await renderPdfPage(token);
        } catch (error) {
          if (token === state.renderToken) {
            console.error(
              "Could not resize PDF:",
              error
            );
          }
        }
      }
    }, 150);
  });

  /* =====================================================
     MESSAGES AND ERRORS
     ===================================================== */

  function showError(text) {
    const panel = document.createElement("div");

    panel.className = "error-panel";

    const heading = document.createElement("strong");
    heading.textContent = "Could not open this file";

    const detail = document.createElement("div");
    detail.textContent = text;

    panel.append(heading, detail);

    stage.replaceChildren(panel);

    showMessage(
      "Check that the file is valid and that the required viewer library is present.",
      true
    );
  }

  function showMessage(text, isError = false) {
    message.textContent = text;

    message.classList.toggle(
      "error",
      isError
    );

    message.hidden = !text;
  }

  function setPosition(text) {
    position.textContent = text;
    position.hidden = !text;
  }

  function getErrorMessage(error) {
    if (!error) {
      return "An unknown error occurred.";
    }

    if (typeof error === "string") {
      return error;
    }

    return error.message || String(error);
  }

  /* =====================================================
     KEYBOARD NAVIGATION
     ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (viewer.hidden) return;

    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) return;

    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLTextAreaElement
    ) return;

    if (event.key === "ArrowLeft") {
      move(-1);
    }

    if (event.key === "ArrowRight") {
      move(1);
    }
  });

})();
