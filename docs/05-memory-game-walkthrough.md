# Memory Game Walkthrough

This page explains `src/MemoryGame.svelte` section by section. Reading this
will show you how the Svelte concepts from the previous page come together into
a working game.

## The data model

The game revolves around an array of **card** objects. Each card is a plain
JavaScript object with four properties:

```js
{
  id: 0,
  value: '🐶',
  flipped: false,
  matched: false
}
```

| Property | Meaning |
| --- | --- |
| `id` | A unique identifier, used as the each-block key. |
| `value` | The emoji shown when the card is face up. |
| `flipped` | Whether the card is currently face up. |
| `matched` | Whether the card has been permanently matched. |

The `flipped` property is transient (a card can flip back), while `matched` is
permanent.

## The list of symbols

```js
const EMOJIS = ['🐶', '🐱', '🦊', '🐸', '🐼', '🦁', '🐧', '🐵'];
```

This is an array of 8 emoji. Because every Memory card needs a partner, the
game uses each symbol **twice**, yielding 16 cards (a 4×4 grid).

## State variables

```js
let cards = $state([]);        // the deck
let flipped = $state([]);      // currently face-up cards (0–2)
let moves = $state(0);         // number of attempts
let matchedPairs = $state(0);  // how many pairs found
let lock = $state(false);      // blocks input during the flip-back delay
```

- `cards` is the full deck.
- `flipped` holds the one or two cards currently turned over.
- `moves` counts every two-card attempt.
- `matchedPairs` counts completed pairs (max 8).
- `lock` prevents clicks during the brief "not a match" pause.

## Shuffling

```js
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
```

This is the **Fisher–Yates shuffle**:

1. Copy the array so we don't mutate the original.
2. Walk backwards from the last element.
3. Swap each element with a random one at or before its position.

The result is a uniformly random ordering.

## Starting a new game

```js
function newGame() {
  const deck = shuffle([...EMOJIS, ...EMOJIS]).map((value, id) => ({
    id,
    value,
    flipped: false,
    matched: false
  }));

  cards = deck;
  flipped = [];
  moves = 0;
  matchedPairs = 0;
  lock = false;
}
```

- `[...EMOJIS, ...EMOJIS]` spreads the symbol list twice to create 16 values,
  then `shuffle` randomizes them.
- `.map()` converts each value into a card object, using its index as `id`.
- Every state variable is reset.

`newGame` runs once on startup (via `onMount`) and again whenever the player
presses **New Game**.

## Flipping a card

```js
function flipCard(card) {
  if (lock) return;
  if (card.flipped || card.matched) return;
  if (flipped.length >= 2) return;

  card.flipped = true;
  flipped = [...flipped, card];
  // ...
}
```

The first three lines are **guards** that reject invalid clicks:

1. `if (lock)` — ignore clicks while two mismatched cards are resolving.
2. `if (card.flipped || card.matched)` — ignore cards already face up or matched.
3. `if (flipped.length >= 2)` — safety check: never allow more than two flipped.

Then the card is flipped and added to the `flipped` array via a new reference
(so Svelte detects the change).

## Comparing two cards

```js
if (flipped.length === 2) {
  moves += 1;
  const [first, second] = flipped;

  if (first.value === second.value) {
    first.matched = true;
    second.matched = true;
    matchedPairs += 1;
    flipped = [];
  } else {
    lock = true;
    setTimeout(() => {
      first.flipped = false;
      second.flipped = false;
      flipped = [];
      lock = false;
    }, 800);
  }
}
```

When two cards are face up:

- `moves += 1` records the attempt.
- Destructuring (`const [first, second] = flipped`) names the two cards.

**If they match:**

- Both are marked `matched = true`, so they stay face up and turn green.
- `matchedPairs` increments.
- `flipped` resets to empty, ready for the next pair.

**If they don't match:**

- `lock = true` freezes input so the player can't flip more cards yet.
- `setTimeout` waits 800ms, then flips both back, clears `flipped`, and
  unlocks.

::: warning Why a lock?
Without `lock`, a fast player could flip a third card during the 800ms pause.
That would corrupt the two-card logic. The lock makes the state machine safe.
:::

## The win condition

The game is won when all pairs are matched. Since there are `EMOJIS.length`
pairs (8), the template checks:

```svelte
{#if matchedPairs === EMOJIS.length}
  <p class="win">You won in {moves} moves! 🎉</p>
{/if}
```

## The template

```svelte
<div class="game">
  <header>
    <h1>Memory Game</h1>
    <div class="stats">
      <span>Moves: {moves}</span>
      <span>Pairs: {matchedPairs} / {EMOJIS.length}</span>
    </div>
  </header>

  <!-- win message -->

  <div class="grid">
    {#each cards as card (card.id)}
      <button
        class="card"
        class:flipped={card.flipped || card.matched}
        class:matched={card.matched}
        onclick={() => flipCard(card)}
      >
        <span class="face">
          {#if card.flipped || card.matched}
            {card.value}
          {/if}
        </span>
      </button>
    {/each}
  </div>

  <button class="reset" onclick={newGame}>New Game</button>
</div>
```

Key details:

- `{#each cards as card (card.id)}` renders one `<button>` per card, keyed by
  `id`.
- `class:flipped` is applied when the card is face up or matched, styling it as
  revealed.
- `class:matched` applies the green "matched" styling.
- The emoji is only rendered inside the `{#if}` — a face-down card shows
  nothing (better than revealing the value in the DOM).
- Clicking calls `flipCard(card)` with that card.
- The reset button calls `newGame`.

## The styling

The `<style>` block uses ordinary CSS, scoped to this component:

- `.grid` uses `display: grid` with `repeat(4, 90px)` for a 4-column layout.
- `.card` is a fixed-size rounded square.
- `.card.flipped` gets a light background to reveal the tile.
- `.card.matched` gets a green background to signal a completed pair.
- A `@media (max-width: 480px)` rule shrinks cards on phones.

Because the CSS is scoped, these class names won't clash with other components.

## Summary

The whole game is a small state machine:

```
face-down cards → click → flip one → click → flip second
                                        ↓
                          match?  yes → matched (stay face up)
                                   no  → lock → 800ms → flip both back
```

`$state` variables drive everything, `{#each}` renders the grid, `{#if}` shows
the win message, and `class:` directives switch visual states. There's no manual
DOM manipulation anywhere — Svelte handles it.

Next: [Extending the Game](/06-extending-the-game).