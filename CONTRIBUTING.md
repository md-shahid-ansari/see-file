# Contributing to SeeFile

First of all, thank you for your interest in contributing to SeeFile!

SeeFile is a free, open-source, privacy-first document viewer. We welcome developers, testers, designers and documentation contributors who want to help improve the project.

Whether you are reporting a bug, suggesting an improvement or submitting code, your contribution is appreciated.

## Ways to Contribute

There are several ways to help improve SeeFile:

- Report bugs and unexpected behaviour.
- Suggest new features and improvements.
- Improve document rendering and browser compatibility.
- Improve mobile and desktop usability.
- Improve performance and memory management.
- Improve documentation and examples.
- Review existing issues and pull requests.
- Submit code improvements.

## Before You Start

Please follow these principles when contributing:

1. Keep SeeFile simple and easy to use.
2. Preserve its privacy-first approach.
3. Process documents locally in the browser.
4. Do not introduce unnecessary external services.
5. Avoid adding dependencies without a clear reason.
6. Preserve existing functionality unless a change is intentional and documented.
7. Keep changes focused and easy to review.

## Reporting Bugs

If you discover a bug, please open an issue:

https://github.com/md-shahid-ansari/see-file/issues

Include as much relevant information as possible:

- A clear description of the problem.
- Steps to reproduce it.
- The file format involved.
- Your browser and device.
- Expected behaviour.
- Actual behaviour.
- Screenshots or error messages, if available.

Please do not upload private or confidential documents when reporting issues. Use sample or sanitized files instead.

## Suggesting Features

Feature suggestions are welcome.

Before opening a feature request, please check whether a similar suggestion already exists.

When suggesting a feature, explain:

- What problem it solves.
- Why it would be useful.
- How you expect it to work.
- Whether it affects privacy, performance or existing functionality.

## Development Setup

### 1. Fork the repository

Create your own fork of:

https://github.com/md-shahid-ansari/see-file

### 2. Clone your fork

```bash
git clone https://github.com/YOUR-USERNAME/see-file.git
```

### 3. Open the project directory

```bash
cd see-file
```

### 4. Run locally

Start a local web server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

### 5. Create a branch

Use a descriptive branch name:

```bash
git checkout -b fix/pdf-rendering
```

Examples:

- `fix/mobile-layout`
- `fix/document-loading`
- `feature/new-format-support`
- `docs/update-readme`

## Code Contribution Guidelines

When submitting code:

- Follow the existing project structure.
- Use clear and descriptive names.
- Keep code readable and maintainable.
- Avoid unrelated changes in the same pull request.
- Do not introduce unnecessary dependencies.
- Do not execute user-provided HTML or other document content as application code.
- Do not send document contents to external servers.
- Check that existing document formats continue to work.

For changes involving document rendering, test with representative sample files whenever possible.

## Testing

Before submitting a pull request, please check:

- The application opens successfully.
- Supported document formats still work.
- Desktop and mobile layouts remain usable.
- Document switching does not leave stale content.
- Existing zoom and scrolling behaviour is preserved.
- No new console errors are introduced.

Please mention which browsers and devices you tested.

## Pull Requests

When your changes are ready:

1. Commit your changes with a descriptive message.
2. Push your branch to your fork.
3. Open a Pull Request against the main SeeFile repository.
4. Explain what changed and why.
5. Include screenshots or testing details when useful.

A good pull request should:

- Address one focused problem.
- Describe the changes clearly.
- Include relevant testing information.
- Mention any known limitations.

Please be open to feedback and requested revisions during review.

## Security and Privacy

SeeFile is designed to process documents locally in the browser.

Contributions must preserve this principle.

Never introduce code that silently uploads document contents, exposes private document data or executes untrusted document content.

For security vulnerabilities, please follow the instructions in [SECURITY.md](SECURITY.md) rather than publishing sensitive exploit details in a public issue.

## License

By contributing to SeeFile, you agree that your contributions will be distributed under the project's MIT License.

See the [LICENSE](LICENSE) file for details.

## Thank You

Open-source software grows through people sharing knowledge, finding problems and improving things together.

Thank you for helping make SeeFile better.

**SeeFile — Open documents. Keep them private.**