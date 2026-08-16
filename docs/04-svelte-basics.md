# Svelte Basics

This page introduces the core Svelte concepts you need to read and modify this
game. It focuses on **Svelte 5**, the version used in this project.

## Anatomy of a `.svelte` file

A Svelte component is a file with up to three sections:

```svelte
<script>
  // JavaScript logic
</script>

<!-- markup (HTML template) -->
<div>Hello!</div>

<style>
  /* CSS scoped to this component */
  div {
    color: blue;
  }
</style>
```

- The `<script>` block holds logic.
- The markup is ordinary HTML, with special Svelte templating added.
- The `<style>` block's CSS is **scoped**: it only applies to this component's
  markup, so class names don't leak or collide.

## Components

A component can be imported and used inside another component. In
`App.svelte`:

```svelte
<script>
  import MemoryGame from './MemoryGame.svelte';
</script>

<main>
  <MemoryGame />
</main>
```

Here `App` renders the `MemoryGame` component. This composability is the core of
component-based UI development.

## State with `$state`

**State** is data that can change over time. When state changes, Svelte
automatically updates anything on the screen that depends on it.

In Svelte 5, you declare reactive state with the `$state` rune:

```js
let moves = $state(0);
let cards = $state([]);
let lock = $state(false);
```

These look like ordinary variables, but Svelte tracks them. Assigning a new
value — like `moves += 1` — triggers updates to the parts of the template that
reference `moves`.

::: tip What is a rune?
In Svelte 5, special functions prefixed with `$` (such as `$state`, `$derived`,
or `$effect`) are called **runes**. They tell the compiler to treat a variable
(and its usages) reactively.
:::

## Derived values and `$derived`

When a value is computed from other state, you can derive it automatically. Our
game computes the win condition by comparing counters in the template instead,
but a derived value would look like:

```js
let won = $derived(matchedPairs === EMOJIS.length);
```

Whenever `matchedPairs` changes, `won` is recomputed.

## Lifecycle with `onMount`

Sometimes you need to run code when a component first appears on the page.
Svelte provides lifecycle functions like `onMount`:

```js
import { onMount } from 'svelte';

onMount(() => {
  newGame();
});
```

This starts a fresh game as soon as the component loads.

## Reactivity of arrays and objects

Reassigning a variable triggers an update. For arrays and objects used in
templates, make a new reference when you want the UI to reflect a change. In
the game:

```js
flipped = [...flipped, card]; // new array reference -> Svelte updates
```

Spreading (`...flipped`) creates a new array containing the old items plus the
new one. This explicit reassignment makes the update obvious.

## Event handling with `onclick`

To react to a click, attach an event handler to an element:

```svelte
<button onclick={() => flipCard(card)}>Card</button>
```

Svelte uses `onclick`, `oninput`, `onsubmit`, and so on — one `on`-prefixed
attribute per DOM event. The handler runs every time the event fires.

## Template syntax

Svelte extends HTML with `{}` expressions and block logic.

### Expressions

Wrap JavaScript expressions in single braces to output them:

```svelte
<span>Moves: {moves}</span>
```

### `{#if}` blocks

Conditionally render markup:

```svelte
{#if matchedPairs === EMOJIS.length}
  <p class="win">You won in {moves} moves! 🎉</p>
{/if}
```

### `{#each}` blocks

Render a list:

```svelte
{#each cards as card (card.id)}
  <button onclick={() => flipCard(card)}>{card.value}</button>
{/each}
```

The `(card.id)` part is a **keyed each** block. The key tells Svelte which item
is which, so the list updates efficiently and correctly.

### Class directives

Toggle CSS classes based on state with the `class:` directive:

```svelte
<button
  class="card"
  class:flipped={card.flipped || card.matched}
  class:matched={card.matched}
>
```

- If the expression is truthy, the class is added.
- If falsy, it's removed.

This is how the game shows a card face-up (`flipped` class) or green
(`matched` class) without manual DOM manipulation.

## Putting it together

The game is a natural demonstration of every concept above:

- `cards`, `moves`, `flipped`, and `lock` are `$state`.
- `flipCard` reacts to clicks.
- `{#each}` renders the card grid.
- `{#if}` shows the win message.
- `class:` directives control the visual state of each card.

Next: [Memory Game Walkthrough](/05-memory-game-walkthrough).