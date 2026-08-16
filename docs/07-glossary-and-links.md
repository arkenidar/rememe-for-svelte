# Glossary & Links

A quick reference of the terms used in this tutorial, plus links for further
reading.

## Glossary

### Build tool
Software that transforms your source code into optimized output for browsers.
Examples: Vite, webpack, Rollup. They handle bundling, transpiling, minifying,
and (in Vite's case) a fast development server.

### Bundle / bundling
The process of combining many source files into fewer, optimized files that
browsers can load efficiently.

### Component
A self-contained, reusable piece of a user interface. In Svelte, a component is
a single `.svelte` file containing markup, logic, and styles.

### Compiler
A program that translates one language into another. Svelte's compiler turns
`.svelte` components into optimized JavaScript at build time.

### CSS (Cascading Style Sheets)
The language used to style and lay out HTML elements — colors, spacing,
positioning, animations, etc.

### Dependency
An external package your project relies on. Recorded in `package.json` and
installed into `node_modules`.

### devDependency
A package needed only during development or building, not shipped to end users.

### DOM (Document Object Model)
The browser's in-memory representation of an HTML page as a tree of objects.
JavaScript can read and modify it to update the page.

### ES module
The modern, standardized way to `import` and `export` code between JavaScript
files (`type: "module"`).

### Event
Something that happens in the browser (a click, a keypress, input, etc.) that
JavaScript can listen for and respond to.

### Event handler
A function that runs when an event fires. In Svelte: `onclick={...}`.

### Framework
A structure that provides the overall architecture and calls your code. Contrast
with **library**, which provides functions you call yourself. Svelte is a
framework.

### HMR (Hot Module Replacement)
A dev-server feature that updates modules in the browser instantly as you edit,
without a full page reload.

### HTML (HyperText Markup Language)
The markup language describing the structure and content of a web page.

### Lifecycle
The stages a component goes through (mounting, updating, destroying). Svelte
exposes hooks like `onMount` and `onDestroy`.

### Library
A collection of reusable functions you call when needed, without imposing an
overall structure on your app.

### localStorage
A browser API for storing small string values per website that persist across
sessions.

### Mount
To attach a component/app to an element in the DOM. In Svelte 5, `mount(App, { target })`.

### npm (Node Package Manager)
The tool (and registry) for installing and managing JavaScript packages.

### Node.js
A JavaScript runtime that runs outside the browser; build tools and CLIs run on
it.

### Props
Data passed from a parent component to a child component. In Svelte 5,
declared with `$props()`.

### Reactivity
Automatically updating the parts of the UI that depend on changed state.

### Rune
In Svelte 5, a special `$`-prefixed function (like `$state`, `$derived`,
`$effect`) that marks reactive behavior for the compiler.

### Scoped CSS
CSS that applies only to the component it's declared in, preventing class-name
collisions across components.

### State
Data that can change over time and drive the UI. Declared with `$state` in
Svelte 5.

### Template
The HTML-like markup in a `.svelte` file, enhanced with Svelte syntax such as
`{expr}`, `{#if}`, and `{#each}`.

### Vite
A fast, modern build tool and development server.

### VitePress
A static site generator built on Vite, used to create this documentation.

## Official documentation

- [MDN Web Docs](https://developer.mozilla.org) — authoritative reference for
  HTML, CSS, and JavaScript.
- [Svelte documentation](https://svelte.dev/docs) — the official guide and API
  reference.
- [Svelte tutorial](https://learn.svelte.dev) — an interactive, hands-on
  tutorial.
- [Vite guide](https://vite.dev/guide) — how Vite works and how to configure it.
- [VitePress docs](https://vitepress.dev) — how this docs site is built.
- [Node.js](https://nodejs.org) — download and documentation.
- [npm](https://docs.npmjs.com) — package manager documentation.

## Other resources

- [JavaScript.info](https://javascript.info) — a thorough modern JavaScript
  tutorial.
- [web.dev](https://web.dev) — Google's web development guides.
- [CSS-Tricks](https://css-tricks.com) — practical CSS articles (notably its
  [Grid guide](https://css-tricks.com/snippets/css/complete-guide-grid/)).
- [The Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) —
  the shuffle algorithm used in this game.

## About this project

This game and tutorial are MIT licensed. Feel free to fork, modify, and reuse
them — the point is to learn by building.