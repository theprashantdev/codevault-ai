# CodeVault AI

> AI-powered code evaluation tool. Paste your code, pick a language, and get scored on correctness, performance, and edge case handling.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-codevault--ai--nu.vercel.app-00e5ff?style=flat-square)](https://codevault-ai-nu.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

## What It Does

Submit any code snippet and receive an AI evaluation across three dimensions:
- **Correctness** — Does the code do what it's supposed to do? Are there bugs?
- **Performance** — Is it efficient? Any obvious bottlenecks or algorithmic issues?
- **Edge Cases** — Does it handle empty inputs, nulls, large values, and boundary conditions?

Each dimension is scored 0–100 with a visual progress bar and a feedback summary.

## Live Demo

**[codevault-ai-nu.vercel.app](https://codevault-ai-nu.vercel.app/)**

## Supported Languages

- Python
- JavaScript
- TypeScript
- Go
- Java
- Rust

## How to Run Locally

This is a pure frontend — no build step, no dependencies.

```bash
git clone https://github.com/theprashantdev/codevault-ai
cd codevault-ai
# Open index.html in any browser
open index.html
```

Or serve with any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Architecture

Single-file frontend. The evaluation logic runs on a backend API hosted separately:

```
Browser (index.html)
       |
       | POST /api/evaluate
       | { code, language }
       v
Evaluation API (Vercel)
       |
       | OpenRouter LLM call
       v
{ results: [{ model, correctness, performance, edgeCases, feedback }] }
```

The frontend handles:
- 30-second request timeout with abort controller
- Non-2xx HTTP responses with error messages from server
- Network failures with user-friendly text
- Input length validation (20,000 char limit)
- Score visualization with color-coded progress bars

## License

MIT © [Prashant Raj](https://github.com/theprashantdev)
