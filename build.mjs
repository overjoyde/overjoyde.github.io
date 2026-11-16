import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// Content-based CSS URLs prevent a new HTML page from reusing an old cached theme.
for (const [cssPath, pages] of [
  ['style.css', ['index.html']],
  ['bear/styles.css', ['bear/index.html', 'bear/privacy.html']],
]) {
  const css = await readFile(cssPath);
  const hash = createHash('sha256').update(css).digest('hex').slice(0, 12);
  const versioned = cssPath.replace(/\.css$/, `.${hash}.css`);
  await writeFile(versioned, css);
  const filename = versioned.split('/').at(-1);
  for (const path of pages) {
    const html = await readFile(path, 'utf8');
    const next = html.replace(/href="(?:\.\/)?styles?(?:\.[a-f0-9]{12})?\.css"/g, `href="./${filename}"`);
    if (html === next && !html.includes(`href="./${filename}"`)) throw new Error(`No stylesheet link in ${path}`);
    await writeFile(path, next);
  }
  console.log(`${cssPath} → ${versioned}`);
}
