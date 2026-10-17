# Knowledge Atlas Dashboard

A single-page, responsive writeups dashboard for static hosting.

## Add a new writeup

Open `writeups.js` and add another object to the `WRITEUPS` array:

```js
{
  title: "Your writeup title",
  topic: "Networking",
  date: "2026-10-17",
  readTime: 5,
  color: "purple",
  excerpt: "A short description shown on the card.",
  body: `<p>Your writeup goes here.</p><p>You can use multiple paragraphs and <code>inline code</code>.</p>`
}
```

Available card colors: `purple`, `mint`, `amber`, and `coral`.

## Host it

Upload the contents of this folder to the connected GitHub repository. The site is plain HTML, CSS, and JavaScript, so it works with GitHub Pages, Netlify, Vercel static hosting, or any standard web host. No build step or server is required.

## Files

- `index.html` — page structure
- `styles.css` — responsive visual design and dark mode
- `app.js` — search, filters, modal reading view, stats, and theme toggle
- `writeups.js` — the only file you need to edit to add writeups
