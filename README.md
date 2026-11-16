# BEAR — Financial Crime AI Skills

Public homepage: https://overjoyde.github.io/
Portfolio: https://overjoyde.github.io/portfolio/

BEAR is a complete static website: HTML, CSS, JavaScript, original SVG artwork and six public synthetic example files. Hosting does not depend on ChatGPT Sites, a server, a database or login. Skill acquisition continues through the existing Agensi links.

## Maintain and publish

- BEAR source is maintained in `MCP Market hub/site/`. Build with `npm run build` and `npm run check`, then copy the contents of `dist/` to this repository root.
- Portfolio content: `portfolio/index.html` and `portfolio/projects.js`. Portfolio styles: `portfolio/style.css`.
- Run `node build.mjs` after updating either presentation. This writes content-hashed CSS files and updates their HTML references.
- Preview with `python3 -m http.server 8000`.
- GitHub Pages publishes `main`, repository root. `.nojekyll` is retained.

`/bear/` and `/bear/privacy.html` redirect to the new addresses. Query parameters and section hashes are preserved when JavaScript is available. Older example download paths and assets remain accessible. Root-level portfolio CSS and `projects.js` remain available for previously cached portfolio HTML.

The private ChatGPT Site is a separate publication and was not removed or made public by this migration. Analytics remains disabled until a valid owner-supplied collector is configured.
