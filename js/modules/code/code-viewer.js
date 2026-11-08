
export function createCodeViewer({ stage }) {
  if (!stage) {
    throw new Error("Code viewer requires a stage element.");
  }

  let currentFile = null;

  function open(file, language = "Plain Text") {
    close();

    currentFile = file;

    const container = document.createElement("div");
    container.className = "code-viewer";

    const header = document.createElement("div");
    header.className = "code-viewer-header";

    const languageLabel = document.createElement("span");
    languageLabel.className = "code-language";
    languageLabel.textContent = language;

    const lineCount = document.createElement("span");
    lineCount.className = "code-line-count";

    header.append(languageLabel, lineCount);

    const content = document.createElement("div");
    content.className = "code-content";

    const lineNumbers = document.createElement("pre");
    lineNumbers.className = "code-line-numbers";
    lineNumbers.setAttribute("aria-hidden", "true");

    const source = document.createElement("pre");
    source.className = "code-source";

    const code = document.createElement("code");
    code.className = "code-source-text";

    source.appendChild(code);
    content.append(lineNumbers, source);
    container.append(header, content);

    stage.replaceChildren(container);

    const loading = document.createElement("div");
    loading.className = "code-loading";
    loading.textContent = "Reading file...";
    content.appendChild(loading);

    return file.text().then((text) => {
      if (currentFile !== file) return;

      loading.remove();

      const lines = text.split(/\r\n|\r|\n/);

      lineNumbers.textContent = lines
        .map((_, index) => String(index + 1))
        .join("\n");

      code.textContent = text;

      lineCount.textContent =
        `${lines.length} ${lines.length === 1 ? "line" : "lines"}`;

      source.scrollTop = 0;
      source.scrollLeft = 0;
      lineNumbers.scrollTop = 0;

    }).catch((error) => {
      if (currentFile !== file) return;

      console.error("Code viewer error:", error);

      container.replaceChildren();

      const message = document.createElement("div");
      message.className = "code-error";
      message.textContent = "Unable to read this file.";

      container.appendChild(message);

      throw error;
    });
  }

  function close() {
    currentFile = null;
    stage.replaceChildren();
  }

  return {
    open,
    close
  };
}
