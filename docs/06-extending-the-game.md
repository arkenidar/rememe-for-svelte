# Extending the Game

The best way to learn is to change things and see what happens. This page gives
you guided exercises, each with a hint on where to start. Try them in any order.

## 1. Change the grid size

The game currently uses 8 symbols (16 cards) in a 4×4 grid.

**Challenge:** Make a 6×6 game (18 pairs) or a smaller 2×3 game for quick
rounds.

**Hints:**

- Add more emoji to `EMOJIS` (or remove some).
- Update `.grid` in the `<style>` block: change `repeat(4, 90px)` to
  `repeat(6, 90px)` (and adjust the mobile `@media` rule too).
- The card count updates automatically because the deck is built from
  `[...EMOJIS, ...EMOJIS]`.

## 2. Add a timer

**Challenge:** Show how long the player took, and stop the timer when the game
is won.

**Hints:**

- Add state: `let seconds = $state(0);` and a variable to hold the interval id.
- Use `setInterval` in `newGame` and clear it when `matchedPairs` reaches
  `EMOJIS.length`.
- Clean up the interval when the component unmounts with Svelte's `onDestroy`.

## 3. Track a best score with `localStorage`

**Challenge:** Save the best (lowest) move count across sessions.

**Hints:**

- On win, compare `moves` to a stored best and update it if lower.
- Use `localStorage.getItem('bestMoves')` and `localStorage.setItem(...)`.
- Display the best score in the header.

::: tip What is localStorage?
`localStorage` is a browser API that stores small string values per-site,
persisting across page reloads. Values are always strings, so use
`JSON.stringify` / `JSON.parse` or `Number()` when reading numbers.
:::

## 4. Add more visual feedback

**Challenge:** Animate the card flip or add a "shake" effect on a mismatch.

**Hints:**

- Define extra classes (e.g. `.mismatch`) and apply them with a `class:`
  directive during the 800ms pause.
- Use CSS `transform`, `transition`, and keyframe `@keyframes` animations.
- Remember to remove the class when the cards flip back.

## 5. Prevent flip-back on a quick double-click

**Challenge:** Make the "no match" reveal last longer, or let the player click
to dismiss it.

**Hints:**

- Change the `setTimeout` delay to a variable.
- Clear the timeout if the player clicks a third card while `lock` is true
  (store the timeout id first).

## 6. Add a difficulty selector

**Challenge:** Let the player pick Easy (4×4), Medium (4×6), or Hard (6×6).

**Hints:**

- Extract the symbol list into a `DIFFICULTIES` object, each with its own
  symbols array and column count.
- Store the chosen difficulty in `$state` and use it in `newGame`.
- Write a small set of difficulty buttons with `onclick` handlers.

## 7. Restructure into smaller components

**Challenge:** Split the game into `Card.svelte`, `GameBoard.svelte`, and
`Stats.svelte`.

**Hints:**

- **Props** let a parent pass data into a child. In Svelte 5, declare them with
  `let { value } = $props();` in the child.
- Use **callback props** (or Svelte 5 events) so a child `Card` can tell the
  parent it was clicked.
- This is a great exercise for learning component boundaries and data flow.

## Suggested first steps

If this is your first modification, start with **#1 (grid size)** or
**#2 (timer)** — they exercise exactly the reactivity and lifecycle concepts
from [Svelte Basics](/04-svelte-basics) with low risk.

Next: [Glossary & Links](/07-glossary-and-links).