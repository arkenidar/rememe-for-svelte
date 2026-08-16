# Introduction

Welcome! This tutorial teaches the fundamentals of modern web development by
building and explaining a simple **Memory game**. Along the way you'll learn
what the web is made of, why we use tools like **Vite**, and how the **Svelte**
framework helps you build interactive user interfaces.

## What is a web page?

A web page is just a document that your browser downloads and renders. Modern
pages are built from three core technologies:

| Technology | Role | Analogy |
| --- | --- | --- |
| **HTML** | Structure and content | The skeleton of a body |
| **CSS** | Styling and layout | The clothing and appearance |
| **JavaScript** | Behavior and interactivity | The muscles that make things move |

Let's look at each one.

### HTML

HTML (HyperText Markup Language) describes *what* is on the page using elements
called **tags**. Tags look like this:

```html
<button>New Game</button>
<div class="grid">...</div>
<h1>Memory Game</h1>
```

HTML is static by itself: it describes structure, not behavior.

### CSS

CSS (Cascading Style Sheets) controls how HTML elements look. For example:

```css
button {
  background: #5b8cff;
  color: white;
  border-radius: 8px;
}
```

This makes every `<button>` blue, white-texted, and rounded.

### JavaScript

JavaScript adds interactivity. It can listen for events (like a click), modify
the page, and manage the logic of your application. For example:

```js
function flipCard(card) {
  card.flipped = true; // change the card's state
}
```

Together these three — structure, style, and behavior — form every site you use.

## Why do we need a build tool?

You *could* write all three technologies in plain files and open them in a
browser. That works for tiny examples. But as projects grow, you benefit from a
**build tool** like [Vite](https://vite.dev):

- **A development server** that reloads your page instantly as you edit (called
  *Hot Module Replacement*, or HMR).
- **Bundling** — combining many small files into optimized output for production.
- **Modern syntax support** — you can write newer JavaScript and import modules,
  and Vite handles browser compatibility.
- **Plugin ecosystem** — Vite can transform special file types, such as
  `.svelte` files, into plain JavaScript.

Vite is fast because it serves modules natively during development, using the
browser's built-in ES module support.

## Why use a framework like Svelte?

Plain JavaScript can manipulate the page directly, but as your interface grows
it becomes hard to keep the screen in sync with your data. That's where a UI
framework helps.

**Svelte** takes a distinctive approach:

1. You write **components** — self-contained files that combine markup, style,
   and logic.
2. The framework tracks your **state** (data that can change over time) and
   automatically updates the page when it changes. This is called **reactivity**.
3. Unlike many frameworks, Svelte does much of its work at **build time**: the
   Svelte compiler converts your components into small, efficient JavaScript.
   There's no big runtime library shipped to the browser.

::: tip Framework vs. library
A **library** gives you functions you call when you want. A **framework**
provides the overall structure and calls *your* code. Svelte is a framework: you
write components, and it handles updating the DOM.
:::

## What we'll build

Our example is a **Memory game**:

- A 4×4 grid of face-down cards.
- Click two cards to flip them.
- If they match, they stay revealed.
- If they don't, they flip back after a short pause.
- The game ends when all pairs are matched.

By the end of this tutorial you'll understand every file in this repo and be
able to extend the game with your own features.

Next: [Setup & Tooling](/02-setup-and-tooling).