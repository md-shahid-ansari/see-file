# SeeFile

A private, in-browser document viewer. Files are processed locally in the browser; this project does not upload document contents.

## Current build

Implemented in `index.html`:
- PDF: PDF.js 3.11.174 (canvas rendering, page navigation, zoom, fit width)
- DOCX: docx-preview 0.4.1 + JSZip
- XLSX / XLS: SheetJS Community Edition 0.20.3 (sheet tabs and cell grid)
- CSV / TSV: native parser and table view
- TXT / Markdown / JSON / XML: text view
- HTML: sandboxed iframe preview
- Common image formats: browser image rendering

PowerPoint, legacy Word `.doc`, OpenDocument formats, and other formats are not yet enabled. They will be added after the first formats are tested.

## Runtime library policy

All runtime script references are relative paths under `vendor/`. The page does not call a CDN at runtime. The browser's ordinary HTTP cache is left to the browser; this project does not add a service worker, PWA, or custom cache.

## Vendor the pinned libraries

The workflow in `.github/workflows/vendor-libraries.yml` can fetch pinned public library distributions and commit them to `vendor/`. It runs on manual dispatch or when the workflow / vendor script changes. It needs repository Actions permission to write contents.

Alternatively, run `bash scripts/vendor-libraries.sh` in a shell with `curl` and `unzip` available.

Expected files:
- `vendor/pdfjs/pdf.min.js`
- `vendor/pdfjs/pdf.worker.min.js`
- `vendor/jszip/jszip.min.js`
- `vendor/docx/docx-preview.min.js`
- `vendor/xlsx/xlsx.full.min.js`

## Run locally

Use a local HTTP server (recommended for PDF.js worker support):
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

Do not judge PDF worker support by opening `index.html` as `file://`. PDF.js requires a server for its normal worker mode.

## Privacy

Files are read using browser APIs and rendered in the current tab. There is no upload endpoint or analytics code in this project.
