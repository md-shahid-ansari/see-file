
export function createDocxViewer({ stage }) {
  if (!stage) {
    throw new Error("DOCX viewer requires a stage element.");
  }

  let currentFile = null;
  let generation = 0;

  async function open(file) {
    close();

    const currentGeneration = generation;
    currentFile = file;

    const docxLibrary = window.docx;

    if (!docxLibrary || typeof docxLibrary.renderAsync !== "function") {
      throw new Error("docx-preview library is not loaded.");
    }

    stage.classList.add("docx-stage");

    const wrapper = document.createElement("div");
    wrapper.className = "docx-viewer";

    const styleContainer = document.createElement("div");
    styleContainer.className = "docx-styles";

    const contentContainer = document.createElement("div");
    contentContainer.className = "docx-content";

    const loading = document.createElement("div");
    loading.className = "docx-loading";
    loading.textContent = "Loading Word document...";

    contentContainer.appendChild(loading);
    wrapper.append(styleContainer, contentContainer);
    stage.replaceChildren(wrapper);

    try {
      await docxLibrary.renderAsync(
        file,
        contentContainer,
        styleContainer,
        {
          className: "docx",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          experimental: false,
          trimXmlDeclaration: true,
          useBase64URL: false,
          renderChanges: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true
        }
      );

      if (generation !== currentGeneration || currentFile !== file) {
        return;
      }

      loading.remove();

    } catch (error) {
      if (generation !== currentGeneration || currentFile !== file) {
        return;
      }

      console.error("DOCX rendering error:", error);

      wrapper.replaceChildren();

      const errorMessage = document.createElement("div");
      errorMessage.className = "docx-error";
      errorMessage.textContent =
        "Unable to display this Word document.";

      wrapper.appendChild(errorMessage);

      throw error;
    }
  }

  function close() {
    generation++;
    currentFile = null;

    stage.classList.remove("docx-stage");
    stage.replaceChildren();
  }

  return {
    open,
    close
  };
}
