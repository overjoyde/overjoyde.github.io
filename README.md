# overjoyde.github.io

Personal portfolio, served by GitHub Pages at https://overjoyde.github.io.

- **Add or edit projects:** `projects.js`
- **Intro, links, work section:** `index.html`
- **Styling:** `style.css`

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000.

After changing `style.css` or copying new BEAR build assets, run `node build.mjs` before publishing. It creates content-hashed CSS files and updates all three HTML pages, preventing old cached styles from being reused by a new page. Keep the original CSS files for maintenance and for older cached HTML.
