
import { createPdfViewer } from "./modules/pdf/pdf-viewer.js";
import { createCodeViewer } from "./modules/code/code-viewer.js";
import { createDocxViewer } from "./modules/docx/docx-viewer.js";
import { createSpreadsheetViewer } from "./modules/spreadsheet/spreadsheet-viewer.js";
import { createPowerPointViewer } from "./modules/powerpoint/powerpoint-viewer.js";

import {
  getFileExtension,
  getLanguage,
  isSupportedTextExtension
} from "./modules/code/language-map.js";

// ------------------------------------
// Elements
// ------------------------------------

const stage = document.getElementById("stage");
const openFileButton = document.getElementById("open-file");
const fileInput = document.getElementById("file-input");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const position = document.getElementById("position");
const fileName = document.getElementById("file-name");
const status = document.getElementById("status");

// ------------------------------------
// Viewers
// ------------------------------------

const pdfViewer = createPdfViewer({
  stage,
  maxWidth: 1100,
  minZoom: 1,
  maxZoom: 4,

  onPageChange(page, total) {
    position.textContent = `${page} / ${total}`;
  },

  onError(error) {
    console.error("PDF Viewer Error:", error);
    status.textContent = "PDF viewing error";
  }
});

const codeViewer = createCodeViewer({ stage });
const docxViewer = createDocxViewer({ stage });

const spreadsheetViewer = createSpreadsheetViewer({
  stage,
  minZoom: 0.5,
  maxZoom: 2
});

const powerpointViewer = createPowerPointViewer({
  stage,
  maxWidth: 1100,
  minZoom: 1,
  maxZoom: 4,

  onSlideCount(total) {
    if (total > 0) {
      status.textContent = `PowerPoint: ${total} slides`;
    }
  },

  onError(error) {
    console.error("PowerPoint Viewer Error:", error);
    status.textContent = "PowerPoint viewing error";
  }
});

// ------------------------------------
// Toolbar
// ------------------------------------

function showPdfControls(show) {
  previousButton.hidden = !show;
  nextButton.hidden = !show;
  position.hidden = !show;

  if (!show) {
    position.textContent = "- / -";
  }
}

// ------------------------------------
// File routing
// ------------------------------------

async function openFile(file) {
  if (!file) return;

  const extension = getFileExtension(file.name);

  const isPdf =
    extension === "pdf" ||
    file.type === "application/pdf";

  const isDocx =
    extension === "docx" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const isSpreadsheet = [
    "xlsx",
    "xls",
    "csv"
  ].includes(extension);

  const isPowerPoint = [
    "pptx",
    "ppt"
  ].includes(extension);

  const isText =
    isSupportedTextExtension(extension) ||
    file.type.startsWith("text/");

  try {
    status.textContent = "Opening file...";
    fileName.textContent = file.name;

    // PDF
    if (isPdf) {
      docxViewer.close();
      codeViewer.close();
      spreadsheetViewer.close();
      powerpointViewer.close();

      stage.classList.remove(
        "code-stage",
        "docx-stage",
        "spreadsheet-stage",
        "ppt-stage"
      );

      showPdfControls(true);

      await pdfViewer.open(file);

      status.textContent = "PDF opened successfully";
      return;
    }

    // DOCX
    if (isDocx) {
      await pdfViewer.close();
      codeViewer.close();
      spreadsheetViewer.close();
      powerpointViewer.close();

      stage.classList.remove(
        "code-stage",
        "spreadsheet-stage",
        "ppt-stage"
      );

      showPdfControls(false);

      await docxViewer.open(file);

      status.textContent = "Word document opened successfully";
      return;
    }

    // Excel and CSV
    if (isSpreadsheet) {
      await pdfViewer.close();
      docxViewer.close();
      codeViewer.close();
      powerpointViewer.close();

      stage.classList.remove(
        "code-stage",
        "docx-stage",
        "ppt-stage"
      );

      showPdfControls(false);

      await spreadsheetViewer.open(file);

      status.textContent = "Spreadsheet opened successfully";
      return;
    }

    // PowerPoint
    if (isPowerPoint) {
      await pdfViewer.close();
      docxViewer.close();
      codeViewer.close();
      spreadsheetViewer.close();

      stage.classList.remove(
        "code-stage",
        "docx-stage",
        "spreadsheet-stage"
      );

      showPdfControls(false);

      await powerpointViewer.open(file);

      status.textContent =
        `PowerPoint opened: ${powerpointViewer.getSlideCount()} slides`;

      return;
    }

    // Code and Text
    if (isText) {
      await pdfViewer.close();
      docxViewer.close();
      spreadsheetViewer.close();
      powerpointViewer.close();

      stage.classList.remove(
        "docx-stage",
        "spreadsheet-stage",
        "ppt-stage"
      );

      stage.classList.add("code-stage");

      showPdfControls(false);

      await codeViewer.open(file, getLanguage(extension));

      status.textContent = "File opened successfully";
      return;
    }

    // Unsupported format
    await pdfViewer.close();
    docxViewer.close();
    codeViewer.close();
    spreadsheetViewer.close();
    powerpointViewer.close();

    stage.classList.remove(
      "code-stage",
      "docx-stage",
      "spreadsheet-stage",
      "ppt-stage"
    );

    showPdfControls(false);

    const message = document.createElement("div");
    message.className = "viewer-error";
    message.textContent =
      "This file format is not supported yet.";

    stage.replaceChildren(message);

    status.textContent = "Unsupported file format";

  } catch (error) {
    console.error("File opening error:", error);

    status.textContent = "Unable to open file";

    const message = document.createElement("div");
    message.className = "viewer-error";
    message.textContent = "Unable to open this file.";

    stage.replaceChildren(message);

    stage.classList.remove(
      "code-stage",
      "docx-stage",
      "spreadsheet-stage",
      "ppt-stage"
    );

    fileName.textContent = "";
  }
}

// ------------------------------------
// File picker
// ------------------------------------

openFileButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];

  if (file) {
    await openFile(file);
  }

  fileInput.value = "";
});

// ------------------------------------
// PDF navigation
// ------------------------------------

previousButton.addEventListener("click", () => {
  pdfViewer.previousPage();
});

nextButton.addEventListener("click", () => {
  pdfViewer.nextPage();
});

// ------------------------------------
// Initial state
// ------------------------------------

showPdfControls(false);
status.textContent = "Ready";
