<script>
  import { onMount } from 'svelte';

  const EMOJIS = ['🐶', '🐱', '🦊', '🐸', '🐼', '🦁', '🐧', '🐵'];

  let cards = $state([]);
  let flipped = $state([]);
  let moves = $state(0);
  let matchedPairs = $state(0);
  let lock = $state(false);

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

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

  function flipCard(card) {
    if (lock) return;
    if (card.flipped || card.matched) return;
    if (flipped.length >= 2) return;

    card.flipped = true;
    flipped = [...flipped, card];

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
  }

  onMount(newGame);
</script>

<div class="game">
  <header>
    <h1>Memory Game</h1>
    <div class="stats">
      <span>Moves: {moves}</span>
      <span>Pairs: {matchedPairs} / {EMOJIS.length}</span>
    </div>
  </header>

  {#if matchedPairs === EMOJIS.length}
    <p class="win">You won in {moves} moves! 🎉</p>
  {/if}

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

<style>
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: #2a2a40;
    border-radius: 16px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  }

  header {
    text-align: center;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 1.8rem;
  }

  .stats {
    display: flex;
    gap: 20px;
    justify-content: center;
    font-size: 1rem;
    opacity: 0.85;
  }

  .win {
    margin: 0;
    font-size: 1.1rem;
    color: #7ee787;
    font-weight: bold;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 90px);
    gap: 12px;
  }

  .card {
    width: 90px;
    height: 90px;
    border: none;
    border-radius: 12px;
    background: #3d3d5c;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
    user-select: none;
  }

  .card:hover:not(.flipped) {
    background: #4c4c70;
    transform: translateY(-2px);
  }

  .card.flipped {
    background: #f5f5f5;
  }

  .card.matched {
    background: #235b3a;
    cursor: default;
  }

  .face {
    font-size: 2.2rem;
  }

  .reset {
    padding: 10px 22px;
    border: none;
    border-radius: 8px;
    background: #5b8cff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .reset:hover {
    background: #4672d6;
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: repeat(4, 70px);
      gap: 8px;
    }

    .card {
      width: 70px;
      height: 70px;
    }
  }
</style>