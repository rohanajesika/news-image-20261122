// A news-image-daily entry (Node 22, standard library only): the poster is
// the entry.png beside this file, and the program copies it to
// /output/entry.png. The gate takes a whole PNG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// The program is fully offline and deterministic: it reads no network, no
// clock and no randomness, writes no files except the one copy, and creates
// no directories — the grader provides a writable output directory. It
// locates the poster through its own file URL, so it runs from any working
// directory, and it verifies the poster's PNG signature before copying.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The eight magic bytes of every PNG file.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
// The twelve bytes of a PNG's IEND trailer chunk.
const PNG_IEND = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

const source = new URL('./entry.png', import.meta.url);
const poster = readFileSync(source);
if (!poster.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error('entry.png is not a PNG file');
}
if (!poster.subarray(poster.length - 12).equals(PNG_IEND)) {
  throw new Error('entry.png is truncated: no IEND trailer');
}
// The IHDR chunk carries the poster's pixel size at bytes 16-23; the gate
// takes at most 1024 by 1024, so refuse a poster that could never pass it.
const width = poster.readUInt32BE(16);
const height = poster.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// Confirm the copy landed whole: same byte count as the poster shipped.
if (statSync(target).size !== poster.length) {
  throw new Error('copied entry.png is not the same size as the poster');
}
