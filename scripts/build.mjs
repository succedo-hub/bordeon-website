import { copyFile, mkdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/vendor/', root), { recursive: true });
await copyFile(new URL('node_modules/bootstrap/dist/css/bootstrap.min.css', root), new URL('dist/vendor/bootstrap.min.css', root));
await copyFile(new URL('node_modules/bootstrap/LICENSE', root), new URL('dist/vendor/bootstrap-LICENSE.txt', root));
console.log('Static website ready in dist/ (Bootstrap 5.3.8).');

await copyFile(new URL('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', root), new URL('dist/vendor/inter-latin-wght-normal.woff2', root));
await copyFile(new URL('node_modules/@fontsource-variable/inter/LICENSE', root), new URL('dist/vendor/inter-LICENSE.txt', root));
await import('./render-marketing.mjs');
