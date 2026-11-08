# Changelog

All notable changes to SeeFile will be documented in this file.

This project follows a version-based release history.

## [Unreleased]

### Planned
- Improve stability when switching between files.
- Improve handling of large documents and spreadsheets.
- Improve loading and error feedback.
- Continue improving mobile viewing and usability.
- Review and improve document rendering performance.

## [1.0.0] - Initial Public Release

### Added
- Browser-based document viewing.
- PDF viewing with continuous scrolling and zoom controls.
- DOCX document rendering.
- Excel spreadsheet viewing.
- CSV and TSV file viewing.
- PowerPoint presentation viewing with vertically arranged slides.
- Code and plain-text file viewing.
- Drag-and-drop file selection.
- Local browser-based document processing.
- Responsive interface for desktop and mobile browsers.
- Modular viewer architecture for supported document formats.

### Supported Technologies
- PDF.js for PDF rendering.
- JSZip for ZIP archive handling.
- docx-preview for DOCX rendering.
- SheetJS Community Edition for spreadsheet parsing.
- Web-PPT Core for PowerPoint rendering.

### Known Limitations
- Some large documents may take longer to load or consume significant browser memory.
- Switching files during an active loading operation may cause rendering inconsistencies.
- Large CSV and TSV files may affect browser performance.
- Some zoom and scrolling combinations may need further refinement.
- PowerPoint rendering and large presentations may have limitations.
- Standalone image viewing is not currently supported.
- HTML files are displayed as source code rather than rendered webpages.

---

## Versioning

SeeFile uses semantic versioning:

- **Major:** Incompatible changes or significant product changes.
- **Minor:** New features and backward-compatible improvements.
- **Patch:** Bug fixes and small improvements.

## Release Notes

Each release should document its important additions, changes, fixes, and known limitations.

[GitHub Releases](https://github.com/md-shahid-ansari/see-file/releases)