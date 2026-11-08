#!/usr/bin/env bash
set -euo pipefail
mkdir -p vendor/pdfjs vendor/jszip vendor/docx vendor/xlsx
fetch() {
  url="$1"; out="$2"
  echo "Downloading $out"
  curl --fail --location --silent --show-error "$url" -o "$out"
  test -s "$out"
}
fetch "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" "vendor/pdfjs/pdf.min.js"
fetch "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js" "vendor/pdfjs/pdf.worker.min.js"
fetch "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" "vendor/jszip/jszip.min.js"
fetch "https://cdn.jsdelivr.net/npm/docx-preview@0.4.1/dist/docx-preview.min.js" "vendor/docx/docx-preview.min.js"
fetch "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js" "vendor/xlsx/xlsx.full.min.js"
echo "All pinned browser libraries downloaded."
