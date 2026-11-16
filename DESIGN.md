# Graphite Mint

Shared design principle for the portfolio and BEAR product site, selected by Johan on 16 November 2026.

| Role | Hex |
|---|---|
| Background | #121416 |
| Panel | #1C2023 |
| Text | #E4E8E6 |
| Secondary text | #A0AAA6 |
| Accent | #85D7BB |
| Secondary identity | #B7A7DE |
| Success | #91D59A |
| Warning | #E4B769 |
| Error | #EE8F94 |
| Border | #414A4E |

Monospace throughout: SFMono-Regular / Consolas / Liberation Mono / monospace. Use thin borders, compact 4–8px radii, clear focus indicators, and mint-filled primary links with dark text. Keep passive cards neutral. Preserve the portfolio project map, content and affiliate disclosure.

The BEAR static assets in `bear/` are built from the maintained source in `MCP Market hub/site/`. Edit that source first, build and verify, then copy its `dist/` assets here. This repository is the public GitHub Pages publication; the private ChatGPT Site is a separate deployment.

## Homepage migration

BEAR now occupies `/`; the existing portfolio is preserved at `/portfolio/`. The old `/bear/` routes redirect to the homepage while keeping campaigns and section hashes. Canonical URLs and social metadata use the public homepage.
