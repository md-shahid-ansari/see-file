
import { createPdfViewer } from "./modules/pdf/pdf-viewer.js";
import { createCodeViewer } from "./modules/code/code-viewer.js";

import {
  getFileExtension,
  getLanguage,
  isSupportedTextExtension
} from "./modules/code/language-map.js";

// Elements
const stage = document.getElementById("stage");
const openFileButton = document.getElementById("open-file");
const fileInput = document.getElementById("file-input");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const position = document.getElementById("position");
const fileName = document.getElementById("file-name");
const status = document.getElementById("status");

// Viewers
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

// Open selected file
async function openFile(file) {
  if (!file) return;

  const extension = getFileExtension(file.name);
  const isPdf =
    extension === "pdf" || file.type === "application/pdf";

  const isText =
    isSupportedTextExtension(extension) ||
    file.type.startsWith("text/");

  try {
    status.textContent = "Opening file...";
    fileName.textContent = file.name;

    // PDF
    if (isPdf) {
      codeViewer.close();
      stage.classList.remove("code-stage");

      previousButton.hidden = false;
      nextButton.hidden = false;
      position.hidden = false;

      await pdfViewer.open(file);

      status.textContent = "PDF opened successfully";
      return;
    }

    // Code and text
    if (isText) {
      await pdfViewer.close();

      stage.classList.add("code-stage");

      previousButton.hidden = true;
      nextButton.hidden = true;
      position.hidden = true;

      await codeViewer.open(file, getLanguage(extension));

      status.textContent = "File opened successfully";
      return;
    }

    // Unsupported format
    await pdfViewer.close();
    codeViewer.close();

    stage.classList.remove("code-stage");

    previousButton.hidden = true;
    nextButton.hidden = true;
    position.hidden = true;

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
  }
}

// Open file picker
openFileButton.addEventListener("click", () => {
  fileInput.click();
});

// Handle selected file
fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];

  if (file) {
    await openFile(file);
  }

  // Allow selecting the same file again
  fileInput.value = "";
});

// PDF navigation
previousButton.addEventListener("click", () => {
  pdfViewer.previousPage();
});

nextButton.addEventListener("click", () => {
  pdfViewer.nextPage();
});

// Initial state
position.textContent = "- / -";
status.textContent = "Ready";
