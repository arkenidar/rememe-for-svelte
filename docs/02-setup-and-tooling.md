# Setup & Tooling

This page explains the tools you need, what they do, and how to run this project.
We'll cover **Node.js**, **npm**, **Vite**, and the scripts defined in
[`package.json`](https://github.com/arkenidar/rememe-for-svelte/blob/main/package.json).

## Prerequisites

### Node.js

Node.js lets you run JavaScript outside the browser — on your computer. Build
tools like Vite run inside Node.js.

Check whether Node is installed and which version you have:

```bash
node --version
```

You should see a version number like `v20.x` or newer. If you don't have Node,
install it from [nodejs.org](https://nodejs.org) (the LTS version is a safe
choice).

### npm

**npm** (Node Package Manager) is a tool that installs and manages the
third-party packages your project depends on. It's included with Node.js.

Check it with:

```bash
npm --version
```

## What is `package.json`?

`package.json` is the manifest of your project. It records:

- the project's **name** and **version**,
- the **scripts** you can run,
- the **dependencies** (packages the project needs to run) and
  **devDependencies** (packages needed only for development).

Here's the relevant part of this project's file:

```json
{
  "name": "rememe-for-svelte",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "svelte": "^5.0.0",
    "vite": "^5.0.0",
    "vitepress": "^1.5.0"
  }
}
```

::: tip dependencies vs devDependencies
- **dependencies** ship with your app in production.
- **devDependencies** are only used while developing and building.

Because this project is fully built ahead of time, everything is a
devDependency; the final bundle contains no Svelte/Vite runtime.
:::

## Installing dependencies

```bash
npm install
```

This reads `package.json`, downloads the listed packages into `node_modules/`,
and writes a `package-lock.json` file that pins exact versions for reproducible
installs.

## The scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts Vite's development server with hot reload. |
| `npm run build` | Compiles the project into optimized files in `dist/`. |
| `npm run preview` | Serves the built `dist/` output locally (for testing production). |
| `npm run docs:dev` | Starts the VitePress documentation site locally. |
| `npm run docs:build` | Builds the documentation site into `docs/.vitepress/dist`. |
| `npm run docs:preview` | Serves the built documentation site locally. |

The `dev`, `build`, and `preview` trio is the standard Vite lifecycle:

1. **Develop** with instant reloading (`dev`).
2. **Build** a production bundle (`build`).
3. **Verify** the production bundle works (`preview`).

## What is Vite?

Vite (`vite.config.js` in this repo) is the build tool. It:

- provides the development server,
- transforms `.svelte` files through the Svelte plugin,
- bundles and minifies your code for production.

Here's the whole config:

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()]
});
```

This tells Vite: "when you see a `.svelte` file, use the Svelte plugin to
compile it."

## What is VitePress?

**VitePress** is the tool that builds *this documentation site*. It's built on
Vite and turns a folder of Markdown files into a browsable static website with
navigation, search, and code highlighting.

You won't typically edit VitePress itself; you edit Markdown and the config file
at `docs/.vitepress/config.mjs`.

## Try it

Start the game:

```bash
npm install
npm run dev
```

Start this documentation:

```bash
npm run docs:dev
```

Vite prints a local URL (usually `http://localhost:5173` for the game and
`http://localhost:5173` for docs, with a different port if it's busy).

Next: [Project Structure](/03-project-structure).