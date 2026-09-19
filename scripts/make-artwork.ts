// Draws the home hero and the share card as a continuity map, in the Slop
// two-ink palette, and writes them over the starter images. Run it with
// `node scripts/make-artwork.ts [outDir]`; with no outDir it writes into
// src/assets/images. The card's text comes from src/course-config.ts.
import { createRequire } from "node:module";
import { join } from "node:path";
import { courseMeta } from "../src/course-config.ts";

const require = createRequire(require_base());
const sharp = require("sharp");

function require_base(): string {
  return createRequire(import.meta.url).resolve("astro/package.json");
}

const CREAM = "#f8eedb";
const GOLD = "#dcae4a";
const INK = "#1b1714";

// A risograph-ish grain: fine noise, multiplied over the flat inks.
const grain = `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix"
      values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 -3 1.55" result="speck"/>
    <feComposite in="speck" in2="SourceGraphic" operator="in"/>
  </filter>`;

/** Horizontal tick marks, a timeline's ruler. */
function ruler(width: number, y: number, step: number): string {
  let ticks = "";
  for (let x = step / 2, i = 0; x < width; x += step, i++) {
    const h = i % 5 === 0 ? 34 : 16;
    ticks += `<rect x="${x - 3}" y="${y}" width="6" height="${h}" fill="${GOLD}"/>`;
  }
  return ticks;
}

function station(x: number, y: number, r: number, stroke = 14): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${CREAM}" stroke="${INK}" stroke-width="${stroke}"/>`;
}

/**
 * The continuity map, drawn on a 2560 x 1086 plane. Each line is one
 * continuity, running left to right in time, and each shape is a technique
 * the course teaches: a retcon splice, a spin-off drifting away, a multiverse
 * split merged back into one line, a recast where the line changes colour,
 * and a line that simply ends.
 */
function continuityMap(): string {
  const W = 46;
  return `
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- spin-off drift: branches off the main line and wanders upward -->
    <path d="M 1180 400 C 1330 400 1390 220 1560 220 S 1900 170 2620 130"
      stroke="${GOLD}" stroke-width="${W * 0.6}"/>

    <!-- the multiverse: one line splits into three, then merges -->
    <path d="M -60 600 H 860" stroke="${GOLD}" stroke-width="${W}"/>
    <path d="M 860 600 C 960 600 960 500 1060 500 H 1500 C 1600 500 1620 600 1760 600"
      stroke="${GOLD}" stroke-width="${W}"/>
    <path d="M 860 600 H 1760" stroke="${GOLD}" stroke-width="${W}"/>
    <path d="M 860 600 C 960 600 960 700 1060 700 H 1500 C 1600 700 1620 600 1760 600"
      stroke="${GOLD}" stroke-width="${W}"/>
    <path d="M 1760 600 H 2620" stroke="${GOLD}" stroke-width="${W * 1.5}"/>

    <!-- a line that ends: winding down -->
    <path d="M -60 880 H 1300" stroke="${GOLD}" stroke-width="${W}"/>

    <!-- the main line, with a retcon splice and a recast -->
    <path d="M -60 400 H 700" stroke="${INK}" stroke-width="${W}"/>
    <path d="M 790 400 H 2050" stroke="${INK}" stroke-width="${W}"/>
    <path d="M 2050 400 H 2620" stroke="${GOLD}" stroke-width="${W}"/>
  </g>
  <!-- the splice: a patch of tape across the break -->
  <rect x="660" y="362" width="170" height="76" fill="${GOLD}" transform="rotate(-7 745 400)"/>
  <path d="M 690 400 H 800" stroke="${INK}" stroke-width="8" stroke-dasharray="14 12"
    transform="rotate(-7 745 400)"/>
  <!-- the end of the line -->
  <rect x="1300" y="800" width="26" height="160" fill="${GOLD}"/>
  ${station(420, 400, 38)}
  ${station(1180, 400, 38)}
  ${station(2050, 400, 38)}
  ${station(1760, 600, 74, 18)}
  ${station(380, 600, 38)}
  ${station(2240, 600, 38)}`;
}

function heroSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2560" height="1086" viewBox="0 0 2560 1086">
  <defs>${grain}</defs>
  <rect width="2560" height="1086" fill="${CREAM}"/>
  <g>${ruler(2560, 0, 64)}</g>
  ${continuityMap()}
  <rect width="2560" height="1086" fill="${CREAM}" filter="url(#grain)" opacity="0.35"/>
</svg>`;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function cardSvg(): string {
  // The map, scaled down and pushed right; the course record on the left.
  const title = escapeXml(courseMeta.title);
  const code = escapeXml(courseMeta.code);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${grain}<clipPath id="right"><rect x="600" y="0" width="600" height="630"/></clipPath></defs>
  <rect width="1200" height="630" fill="${CREAM}"/>
  <g clip-path="url(#right)"><g transform="translate(330 70) scale(0.4)">${continuityMap()}</g></g>
  <rect x="0" y="0" width="1200" height="14" fill="${INK}"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="${INK}">
    <text x="64" y="330" font-size="34" font-weight="700" letter-spacing="3">${code}</text>
    <text x="64" y="408" font-size="68" font-weight="700" letter-spacing="-1">${title.split(" ")[0] ?? ""}</text>
    <text x="64" y="484" font-size="68" font-weight="700" letter-spacing="-1">${title.split(" ").slice(1).join(" ")}</text>
    <text x="64" y="566" font-size="26" fill="${INK}" opacity="0.75">Slop University</text>
  </g>
  <rect width="1200" height="630" fill="${CREAM}" filter="url(#grain)" opacity="0.35"/>
</svg>`;
}

const outDir = process.argv[2] ?? "src/assets/images";
await sharp(Buffer.from(heroSvg())).avif({ quality: 60 }).toFile(join(outDir, "hero-home.avif"));
await sharp(Buffer.from(cardSvg())).png({ compressionLevel: 9 }).toFile(join(outDir, "card.png"));
if (process.argv[3] === "--preview") {
  await sharp(Buffer.from(heroSvg())).resize(1280).png().toFile(join(outDir, "hero-preview.png"));
}
console.log(`wrote hero-home.avif and card.png to ${outDir}`);
