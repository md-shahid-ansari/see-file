# SeeFile

**A free, open-source, privacy-first document viewer.**

SeeFile lets you open and read documents directly in your browser. Your files stay on your device — they are not uploaded to a SeeFile server.

🌐 **Live Demo:** https://md-shahid-ansari.github.io/see-file/  
📦 **Source Code:** https://github.com/md-shahid-ansari/see-file  
📄 **License:** MIT

---

## Why SeeFile?

Opening a document shouldn't require uploading it to an online service, creating an account, or installing a separate application.

SeeFile provides a simple way to view supported documents directly in your browser.

- **Private by design:** Documents are processed locally in your browser.
- **Free and open source:** Available under the MIT License.
- **No account required:** Open the application and choose a document.
- **No document upload:** Your documents are not sent to a SeeFile server.
- **Cross-device access:** Use a modern desktop or mobile browser.
- **Simple experience:** Open a document and start reading.

## Supported File Formats

| Format | Extensions | Viewing |
|---|---|---|
| PDF | `.pdf` | Continuous document viewing |
| Word | `.docx` | Document rendering |
| Excel | `.xlsx`, `.xls` | Read-only spreadsheet viewing |
| CSV | `.csv` | Tabular data viewing |
| PowerPoint | `.pptx`, `.ppt` | Continuous slide viewing |
| Code and text | `.txt`, `.md`, `.json`, `.xml`, `.html`, `.htm`, `.css`, `.js`, `.py` and other supported extensions | Source-code or plain-text viewing |

The exact rendering and formatting depend on the file format and the capabilities of the browser libraries used by SeeFile.

## Features

- Continuous vertical document scrolling.
- PDF page navigation and zoom controls.
- Pinch-to-zoom support where implemented.
- Spreadsheet worksheet tabs.
- Read-only spreadsheet viewing.
- PowerPoint slides displayed vertically.
- Code and text displayed as source, not executed.
- File selection and drag-and-drop support.
- Desktop and mobile browser support.

## Privacy

Privacy is a core design principle of SeeFile.

Documents are processed inside the browser using locally bundled JavaScript libraries.

SeeFile does not require users to create an account or upload documents to a SeeFile document-processing server.

**Your documents stay on your device.**

Note: Your browser, device, hosting provider and any third-party software you independently use remain subject to their own privacy and security practices.

## Try SeeFile

Open the live application:

**https://md-shahid-ansari.github.io/see-file/**

1. Open SeeFile in your browser.
2. Select **Choose a document**.
3. Select a supported file from your device.
4. Read and navigate your document.

No account or installation is required.

## Run Locally

You can run SeeFile locally and modify the source code.

### 1. Clone the repository

```bash
git clone https://github.com/md-shahid-ansari/see-file.git
```

### 2. Open the project directory

```bash
cd see-file
```

### 3. Start a local web server

For example, using Python:

```bash
python -m http.server 8000
```

### 4. Open SeeFile

Visit:

```text
http://localhost:8000
```

A local web server is recommended because SeeFile uses JavaScript modules and browser APIs.

## Project Structure

```text
see-file/
├── index.html
├── css/
│   ├── base.css
│   ├── app.css
│   ├── viewer.css
│   └── modules/
├── js/
│   ├── app.js
│   └── modules/
│       ├── pdf/
│       ├── code/
│       ├── docx/
│       ├── spreadsheet/
│       └── powerpoint/
└── vendor/
    ├── pdfjs/
    ├── jszip/
    ├── docx/
    ├── xlsx/
    └── powerpoint/
```

The project uses native JavaScript ES modules and locally bundled dependencies. No application build system is required to run it.

## Technology

SeeFile is built using:

- HTML
- CSS
- JavaScript ES modules
- PDF.js
- JSZip
- docx-preview
- SheetJS
- @web-ppt/core

Third-party libraries retain their respective licenses and copyright notices. Refer to their original license information when redistributing the project.

## Contributing

SeeFile is open source, and contributions are welcome.

You can help by:

- Reporting bugs.
- Suggesting improvements.
- Improving browser compatibility.
- Improving document rendering.
- Improving documentation.
- Submitting code improvements.

### How to contribute

1. Fork the repository.
2. Create a new branch for your changes.
3. Make and test your changes.
4. Commit your work.
5. Open a Pull Request describing your changes.

For bugs and feature requests, use the GitHub Issues page:

https://github.com/md-shahid-ansari/see-file/issues

Please keep contributions focused and explain any changes that affect document privacy or file processing.

## Known Limitations

SeeFile is actively evolving. Some documents may not render exactly as they appear in Microsoft Office or other native applications.

Complex document formatting, large files, and certain advanced document features may have limitations.

The current release also has known stability and performance issues that are documented for future improvements.

## License

SeeFile is released under the **MIT License**.

You are free to use, copy, modify, distribute, sublicense and sell copies of the software, subject to the license conditions.

See the [LICENSE](LICENSE) file for the complete license text.

---

## Support the Project

If you find SeeFile useful:

- Give the repository a ⭐ on GitHub.
- Report bugs and share feedback.
- Contribute improvements.
- Share SeeFile with others.

**SeeFile — Open documents. Keep them private.**