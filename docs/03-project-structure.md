# Project Structure

This page walks through every file in this repository. Understanding the layout
is the key to understanding how a Vite + Svelte app is assembled.

Here's the full tree (ignoring generated folders like `node_modules` and
`dist`):

```
rememe-for-svelte/
├── .github/
│   └── workflows/
│       └── deploy-docs.yml      # GitHub Actions: builds & deploys this docs site
├── docs/                        # This documentation (VitePress)
│   ├── .vitepress/
│   │   └── config.mjs           # Docs site configuration (nav, sidebar, base)
│   ├── index.md                 # Docs home page
│   └── 01-…07-….md              # Tutorial pages
├── src/                         # The actual app source
│   ├── main.js                  # App entry point
│   ├── app.css                  # Global styles
│   ├── App.svelte               # Root component
│   └── MemoryGame.svelte        # The Memory game
├── index.html                   # HTML shell that loads the app
├── package.json                 # Project manifest + scripts + dependencies
├── package-lock.json            # Pinned dependency versions (generated)
├── vite.config.js               # Vite configuration
└── .gitignore                   # Files Git should ignore
```

## The app entry: `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Memory Game</title>
</head>

<body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
</body>

</html>
```

Key points:

- `<div id="app">` is the **mount point** — the empty element where Svelte puts
  the app.
- `<script type="module" src="/src/main.js">` tells Vite to load `main.js` as a
  JavaScript **module**, which lets it use `import` statements.

## The JavaScript entry: `src/main.js`

```js
import { mount } from 'svelte';
import App from './App.svelte';
import './app.css';

const app = mount(App, {
  target: document.getElementById('app')
});

export default app;
```

What happens here:

1. `mount` is imported from Svelte (Svelte 5's way of starting an app).
2. `App` is imported from the root component file.
3. Global CSS is imported so it gets bundled.
4. `mount(App, { target: ... })` renders the `App` component into the
   `#app` element.

## The root component: `src/App.svelte`

```svelte
<script>
  import MemoryGame from './MemoryGame.svelte';
</script>

<main>
  <MemoryGame />
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>
```

A `.svelte` file has three sections:

- **`<script>`** — JavaScript logic and imports.
- **markup** — the HTML-like template (here, a `<main>` wrapping the game).
- **`<style>`** — CSS scoped to this component.

`App.svelte` is a thin container: it imports and renders `MemoryGame`, and
centers it on the screen.

## The game: `src/MemoryGame.svelte`

This is the heart of the project. It holds the game state, the flip/matching
logic, the markup for the grid, and all the card styles. We'll explore it in
depth in [Memory Game Walkthrough](/05-memory-game-walkthrough).

## Global styles: `src/app.css`

```css
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    min-height: 100vh;
}

body {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    background: #1e1e2f;
    color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

This is global CSS applied to the whole page: a CSS reset, a dark background,
and a system font stack. Component styles live in each `.svelte` file, while
site-wide rules live here.

## Build config: `vite.config.js`

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()]
});
```

The `svelte()` plugin tells Vite to compile `.svelte` files. Without it, Vite
would not understand Svelte syntax.

## Identifiers & git: `.gitignore`

```gitignore
/node_modules
/dist
```

Git ignores the `node_modules/` folder (installed packages) and the `dist/`
folder (build output). Both are regenerated from source.

## The documentation: `docs/`

The `docs/` folder is a separate VitePress site. It uses:

- `docs/.vitepress/config.mjs` — site title, navigation, sidebar, and base path.
- `docs/index.md` — the homepage.
- `docs/01-…07-….md` — the tutorial pages you're reading.

The build outputs to `docs/.vitepress/dist`, which a GitHub Actions workflow
deploys to GitHub Pages (see [deploy-docs.yml](/06-extending-the-game) for a
related note, or the workflow file directly).

Next: [Svelte Basics](/04-svelte-basics).