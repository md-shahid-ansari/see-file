# Third-Party Licenses

SeeFile is an open-source document viewer that uses third-party libraries to support document parsing and rendering.

SeeFile's own source code is released under the MIT License. Third-party libraries included in the project remain subject to their respective licenses.

## Main Dependencies

| Library | Version | License | Purpose |
|---|---|---|---|
| [PDF.js](https://github.com/mozilla/pdf.js) | 3.11.174 | Apache License 2.0 | PDF rendering |
| [JSZip](https://github.com/Stuk/jszip) | 3.10.1 | MIT or GPL-3.0-or-later | ZIP archive handling |
| [docx-preview](https://github.com/VolodymyrBaydalka/docxjs) | 0.4.1 | Apache License 2.0 | DOCX rendering |
| [SheetJS Community Edition](https://github.com/SheetJS/sheetjs) | 0.20.3 | Apache License 2.0 | Spreadsheet parsing |
| [Web-PPT Core](https://github.com/unStone/web-ppt) | 0.8.0 | MIT | PowerPoint parsing and rendering |

## License and Attribution Notices

### PDF.js

Copyright and license notices belong to the PDF.js project and its contributors.

License: Apache License 2.0

https://www.apache.org/licenses/LICENSE-2.0

### JSZip

JSZip is dual-licensed. SeeFile uses JSZip under the MIT License.

Copyright (c) 2009–2016 Stuart Knightley, David Duponchel, Franz Buchinger, António Afonso.

The original license and copyright notices must be retained.

https://github.com/Stuk/jszip/blob/main/LICENSE.markdown

### docx-preview

License: Apache License 2.0

https://www.apache.org/licenses/LICENSE-2.0

Original project:

https://github.com/VolodymyrBaydalka/docxjs

### SheetJS Community Edition

The following attribution notice is required when distributing SheetJS Community Edition:

```text
SheetJS Community Edition -- https://sheetjs.com/
Copyright (C) 2012-present   SheetJS LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Official license information:

https://docs.sheetjs.com/docs/miscellany/license/

### Web-PPT Core

Copyright and license notices belong to the Web-PPT project and its contributors.

License: MIT

https://github.com/unStone/web-ppt

## Additional Dependencies

Some libraries may include additional dependencies or bundled components.

For example, Web-PPT Core lists `fflate` as a runtime dependency.

The project maintainers should verify and document the licenses of all bundled dependencies, fonts, assets, and other third-party components before each release.

## License Preservation

When distributing SeeFile:

- Preserve original third-party copyright notices.
- Include applicable license texts.
- Do not imply that third-party libraries are owned by SeeFile.
- Respect the conditions of each dependency's license.
- Document modifications made to third-party source files where required.

## Disclaimer

This document is an initial summary of the primary dependencies used by SeeFile. It is not a complete software bill of materials or legal compliance audit.

For authoritative license terms, consult the original license files and official project documentation linked above.