import { readFile, writeFile, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const mark = await readFile(new URL('brand/bordeon-mark.svg', root), 'utf8');
const defs = mark.match(/<defs>([\s\S]*?)<\/defs>/)?.[1];
const core = mark.match(/<g id="bordeon-symbol">([\s\S]*?)<\/g>/)?.[1];
const outline = [...mark.matchAll(/<path data-part="(?:upper|lower)"[^>]* d="([^"]+)"/g)]
  .map(match => match[1]).join(' ');
if (!defs || !core || !outline) throw new Error('Invalid canonical Bordeon mark');

await mkdir(new URL('dist/assets/', root), { recursive: true });
// Keep the legacy favicon URL consistent with the same source.
await Promise.all(['bordeon-mark.svg', 'favicon.svg'].map(name =>
  writeFile(new URL(`dist/assets/${name}`, root), mark)));

// The decorative pulse reuses the exact mark and its contours, including gradients.
export const brandPulse = `<svg class="bordeon-pulse" viewBox="-18 -18 76 82" fill="none" aria-hidden="true" focusable="false"><defs>${defs}<path id="pulse-outline" d="${outline}"/></defs><g class="pulse-echo pulse-echo-one"><use href="#pulse-outline"/></g><g class="pulse-echo pulse-echo-two"><use href="#pulse-outline"/></g><g class="pulse-echo pulse-echo-three"><use href="#pulse-outline"/></g><g class="pulse-core">${core}</g></svg>`;
