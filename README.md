# wordle ![workflow](https://github.com/im6/wordle/actions/workflows/ci.yml/badge.svg)

Exactly same game as wordle from [NY times](https://www.nytimes.com/games/wordle/index.html), BUT you can play unlimited times each day :)

## [play now](https://www.javascript.fun/wordle/)

## Project Overview

- Modernized TypeScript Wordle game migrated from webpack to Vite 8
- Static site served via GitHub Pages at `https://www.javascript.fun/wordle/`
- Build artifacts are **auto-generated** — never edit `docs/` manually

## Critical Setup Requirements

- **Node.js**: 26.x (CI uses `setup-node@v4`)
- **Yarn**: ≥v1.22 (frozen lockfile enforced in CI)
- **Vite**: ^8.1.4 (verified in `package.json`)

## Core Commands

```bash
# Install dependencies (with lockfile validation)
yarn install --frozen-lockfile

# Development server (HMR on port 3000)
yarn dev

# Build for production (outputs to /docs)
yarn build

# Run ESLint
yarn lint

# Run tests with coverage
yarn test
```

## File Structure Guidelines

| File/Path              | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `index.html`           | Root Vite template (main entry point)              |
| `vite.config.ts`       | Build config (base: './', outDir: 'docs')          |
| `src/**/*.module.less` | CSS Modules files (non-module .less not supported) |
| `src/words.ts`         | Word list (gitignored from linting)                |
| `docs/`                | **Generated output** — never edit manually         |

## Agent-Specific Rules

- **Build system**: All output must go through Vite — `docs/` is regenerated on `yarn build`
- **CSS/LESS**: Must use `.module.less` extensions for CSS Modules
- **Deployment**: Changes to `master` branch trigger GitHub Actions to deploy `docs/`
- **CI workflow**: Validates `index.html`, `vite.config.ts`, and `tsconfig.json` explicitly
- **TypeScript**: Modern config (ES2020, moduleResolution: "bundler") — no manual `tsc` calls

> 🚨 **Critical**: Never modify `docs/*` files directly. All changes must originate from source files and be regenerated via Vite.

> 💡 For GitHub Pages subpath compatibility: `base: './'` in `vite.config.ts` ensures relative asset paths work under `/wordle/`.

> 🔐 Security note: All external dependencies (Google Fonts, GTM) are explicitly declared in `index.html` — no dynamic injections.
