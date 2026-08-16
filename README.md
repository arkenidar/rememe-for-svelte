# Memory Game (Svelte + Vite)

A minimal, dependency-light **Memory game** built with **Svelte** and **Vite**.
Flip two cards, find matching emoji pairs, and clear the board.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the game's development server (hot reload). |
| `npm run build` | Build the game for production into `dist/`. |
| `npm run preview` | Serve the built game locally. |
| `npm run docs:dev` | Start the documentation site locally (VitePress). |
| `npm run docs:build` | Build the documentation site. |
| `npm run docs:preview` | Serve the built documentation site. |

## Project structure

```
.
├── src/
│   ├── main.js              # app entry point
│   ├── app.css              # global styles
│   ├── App.svelte           # root component
│   └── MemoryGame.svelte    # game logic + markup + styles
├── docs/                    # VitePress documentation (tutorial)
│   ├── .vitepress/config.mjs
│   ├── index.md
│   └── 01-…07-….md
├── index.html               # HTML shell
├── vite.config.js           # Vite config
├── package.json
└── .github/workflows/deploy-docs.yml   # GitHub Pages deployment
```

## Documentation

A beginner-friendly tutorial lives in [`docs/`](docs/index.md). It covers web
fundamentals, Vite, Svelte, and a line-by-line walkthrough of this game.

Run it locally:

```bash
npm run docs:dev
```

The docs site is deployed to GitHub Pages automatically via the
`.github/workflows/deploy-docs.yml` workflow. To enable it once, open the repo's
**Settings → Pages** and set **Source** to **GitHub Actions**.

## License

MIT