---
layout: home

hero:
  name: Memory Game Tutorial
  text: Learn web development with Vite + Svelte
  tagline: A beginner-friendly, hands-on guide built around a simple Memory game.
  actions:
    - theme: brand
      text: Start the tutorial
      link: /01-introduction
    - theme: alt
      text: Play the Game
      link: /app/
    - theme: alt
      text: View the code
      link: https://github.com/arkenidar/rememe-for-svelte

features:
  - title: From zero to a working app
    details: Understand the basics of the web, then see every piece of a real project explained.
  - title: Vite + Svelte, explained
    details: Learn why build tools and frameworks exist, and how Svelte's compiler-driven approach works.
  - title: A real game as the example
    details: Follow a line-by-line walkthrough of the Memory game, then extend it with guided exercises.
---

## What is this?

This is a self-paced tutorial that teaches the essentials of modern web development
using **Vite** (a build tool) and **Svelte** (a UI framework). The running example is a
small **Memory game**: flip two cards, find matching pairs, and win when the board is
cleared.

You don't need any prior framework experience. A little familiarity with JavaScript
helps, but every concept is introduced as it appears.

## Try it live

Play the built game right in your browser: **[Play the Game](/app/)**.

## How to use this tutorial

Read the pages in order, or jump to what interests you:

1. [Introduction](/01-introduction) — what the web, build tools, and frameworks are.
2. [Setup & Tooling](/02-setup-and-tooling) — Node, npm, Vite, and project scripts.
3. [Project Structure](/03-project-structure) — a tour of every file in this repo.
4. [Svelte Basics](/04-svelte-basics) — components, reactivity, and template syntax.
5. [Memory Game Walkthrough](/05-memory-game-walkthrough) — how the game actually works.
6. [Extending the Game](/06-extending-the-game) — exercises to make it your own.
7. [Glossary & Links](/07-glossary-and-links) — definitions and further reading.

## Run the project locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To run this documentation site locally:

```bash
npm run docs:dev
```

## License

This project is MIT licensed. Use it, adapt it, and learn from it freely.