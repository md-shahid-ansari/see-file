
const languages = {
  js: "JavaScript",
  mjs: "JavaScript",
  cjs: "JavaScript",
  jsx: "JavaScript JSX",
  ts: "TypeScript",
  tsx: "TypeScript JSX",

  html: "HTML",
  htm: "HTML",
  css: "CSS",
  scss: "SCSS",
  less: "Less",

  json: "JSON",
  jsonc: "JSON with Comments",
  xml: "XML",
  yaml: "YAML",
  yml: "YAML",
  toml: "TOML",

  py: "Python",
  java: "Java",
  c: "C",
  h: "C Header",
  cpp: "C++",
  hpp: "C++ Header",
  cs: "C#",
  php: "PHP",
  go: "Go",
  rs: "Rust",
  rb: "Ruby",
  swift: "Swift",
  kt: "Kotlin",
  dart: "Dart",
  r: "R",
  sql: "SQL",

  sh: "Shell Script",
  bash: "Bash",
  zsh: "Zsh",
  bat: "Batch",
  cmd: "Command Script",
  ps1: "PowerShell",

  md: "Markdown",
  markdown: "Markdown",
  txt: "Plain Text",
  log: "Log",
  csv: "CSV",
  tsv: "TSV",

  ini: "INI",
  env: "Environment File",
  conf: "Configuration",
  config: "Configuration",
  gitignore: "Git Ignore",
  dockerfile: "Dockerfile",
  makefile: "Makefile"
};

export function getLanguage(extension) {
  return languages[extension.toLowerCase()] || "Plain Text";
}

export function isSupportedTextExtension(extension) {
  return Object.prototype.hasOwnProperty.call(
    languages,
    extension.toLowerCase()
  );
}

export function getFileExtension(fileName) {
  const name = fileName.toLowerCase();

  if (name === "dockerfile") return "dockerfile";
  if (name === "makefile") return "makefile";
  if (name === ".gitignore") return "gitignore";
  if (name === ".env") return "env";

  const lastDot = name.lastIndexOf(".");

  if (lastDot === -1) return "";

  return name.slice(lastDot + 1);
}
