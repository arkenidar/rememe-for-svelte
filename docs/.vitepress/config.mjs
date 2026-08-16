import { defineConfig } from 'vitepress';

const repo = 'rememe-for-svelte';

// When deployed to GitHub Pages, the site is served from /<repo>/.
// In local dev or a custom domain, it is served from the root.
const base = process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/';

export default defineConfig({
  title: 'Memory Game Tutorial',
  description:
    'A beginner-friendly introduction to web development with Vite and Svelte, built around a Memory game.',
  lang: 'en-US',
  base,
  cleanUrls: true,
  lastUpdated: true,
  // The /app/ path is copied into the built site during deployment, so it
  // doesn't exist in the docs source and would be flagged as a dead link.
  ignoreDeadLinks: [/^\/app(\/|$)/],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Play the Game', link: '/app/' },
      { text: 'Game Code', link: 'https://github.com/arkenidar/rememe-for-svelte' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/01-introduction' },
          { text: 'Setup & Tooling', link: '/02-setup-and-tooling' },
          { text: 'Project Structure', link: '/03-project-structure' }
        ]
      },
      {
        text: 'Svelte & the Game',
        items: [
          { text: 'Svelte Basics', link: '/04-svelte-basics' },
          { text: 'Memory Game Walkthrough', link: '/05-memory-game-walkthrough' },
          { text: 'Extending the Game', link: '/06-extending-the-game' }
        ]
      },
      {
        text: 'Reference',
        items: [{ text: 'Glossary & Links', link: '/07-glossary-and-links' }]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/arkenidar/rememe-for-svelte' }
    ],
    outline: { level: [2, 3] },
    footer: {
      message: 'A beginner-friendly Vite + Svelte tutorial.',
      copyright: 'MIT Licensed'
    }
  }
});