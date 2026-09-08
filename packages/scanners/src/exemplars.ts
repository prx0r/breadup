/**
 * Visual/price exemplars from the Farfetch index.
 *
 * Built offline from DBQ/Farfetch.Product.prices.Macao (588k rows) into
 * data/farfetch-exemplars.json: per brand×category price bands (p25/p50/p75
 * EUR) plus sample image URLs. Scanners use bands as comp evidence and
 * images as visual similarity exemplars — no live calls at query time.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface ExemplarGroup {
  brand: string;
  category: string;
  n: number;
  p25: number;
  p50: number;
  p75: number;
  samples: Array<{ title: string; image: string; price_eur: number }>;
}

export interface PriceBand {
  brand: string;
  category: string;
  n: number;
  low: number;
  mid: number;
  high: number;
}

const DATA_CANDIDATES = ['../../../data/farfetch-exemplars.json', '../../data/farfetch-exemplars.json'];

function indexPath(): string | null {
  const here = dirname(fileURLToPath(import.meta.url));
  for (const rel of DATA_CANDIDATES) {
    const p = join(here, rel);
    if (existsSync(p)) return p;
  }
  return null;
}

let cache: Record<string, ExemplarGroup> | null = null;

export function loadIndex(path?: string): Record<string, ExemplarGroup> {
  const p = path ?? indexPath();
  if (!p) throw new Error('exemplar index not found (expected data/farfetch-exemplars.json)');
  if (!cache || path) cache = JSON.parse(readFileSync(p, 'utf8'));
  return cache!;
}

export function priceBand(brand: string, category?: string): PriceBand | null {
  const idx = loadIndex();
  const b = brand.toUpperCase();
  const keys = Object.keys(idx).filter(
    (k) => idx[k].brand === b && (!category || idx[k].category === category.toUpperCase()),
  );
  if (!keys.length) return null;
  const g = idx[keys.sort((x, y) => idx[y].n - idx[x].n)[0]];
  return { brand: g.brand, category: g.category, n: g.n, low: g.p25, mid: g.p50, high: g.p75 };
}

export function sampleImages(brand: string, category?: string, limit = 5): string[] {
  const idx = loadIndex();
  const b = brand.toUpperCase();
  const out: string[] = [];
  for (const k of Object.keys(idx)) {
    const g = idx[k];
    if (g.brand !== b) continue;
    if (category && g.category !== category.toUpperCase()) continue;
    for (const s of g.samples) {
      if (out.length >= limit) return out;
      if (s.image) out.push(s.image);
    }
  }
  return out;
}

export function groupCount(): number {
  return Object.keys(loadIndex()).length;
}
