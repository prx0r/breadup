import { describe, expect, it } from 'vitest';
import { groupCount, priceBand, sampleImages } from '../src/exemplars.js';

describe('exemplars', () => {
  it('loads thousands of brand×category groups', () => {
    expect(groupCount()).toBeGreaterThan(1000);
  });

  it('returns ordered price bands', () => {
    const band = priceBand('GUCCI');
    expect(band).not.toBeNull();
    expect(band!.low).toBeLessThanOrEqual(band!.mid);
    expect(band!.mid).toBeLessThanOrEqual(band!.high);
    expect(band!.n).toBeGreaterThan(0);
  });

  it('returns image URLs for visual exemplars', () => {
    const imgs = sampleImages('PRADA', undefined, 3);
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0]).toMatch(/^https?:\/\//);
  });

  it('returns null for unknown brands, never throws', () => {
    expect(priceBand('NO_SUCH_BRAND_XYZ')).toBeNull();
    expect(sampleImages('NO_SUCH_BRAND_XYZ')).toEqual([]);
  });
});
