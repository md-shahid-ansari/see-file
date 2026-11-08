
import { createPdfViewer } from "./modules/pdf/pdf-viewer.js";

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
// PDF Viewer
// ------------------------------------

const pdfViewer = createPdfViewer({
  stage,

  maxWidth: 1100,
  minZoom: 1,
  maxZoom: 4,

  onPageChange(page, total) {
    if (position) {
      position.textContent = `${page} / ${total}`;
    }
  },

  onError(error) {
    console.error("PDF Viewer Error:", error);

    if (status) {
      status.textContent = "Unable to open PDF";
    }
  }
});

// ------------------------------------
// Open PDF
// ------------------------------------

async function openPdfFile(file) {
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();

  if (extension !== "pdf" && file.type !== "application/pdf") {
    status.textContent = "Currently only PDF viewing is connected.";
    return;
  }

  try {
    status.textContent = "Opening PDF...";

    fileName.textContent = file.name;

    await pdfViewer.open(file);

    status.textContent = "PDF opened successfully";

  } catch (error) {
    console.error("PDF opening failed:", error);

    status.textContent = "Failed to open PDF";

    fileName.textContent = "";

    alert(
      "Unable to open this PDF. Please check the file and try again."
    );
  }
}

// ------------------------------------
// Open File Button
// ------------------------------------

openFileButton.addEventListener("click", () => {
  fileInput.click();
});

// ------------------------------------
// File Selection
// ------------------------------------

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  await openPdfFile(file);

  // Allow selecting the same file again
  fileInput.value = "";
});

// ------------------------------------
// PDF Navigation
// ------------------------------------

previousButton.addEventListener("click", () => {
  pdfViewer.previousPage();
});

nextButton.addEventListener("click", () => {
  pdfViewer.nextPage();
});

// ------------------------------------
// Initial State
// ------------------------------------

status.textContent = "Ready";
position.textContent = "- / -";
