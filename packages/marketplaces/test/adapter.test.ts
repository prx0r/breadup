import { describe, expect, it } from 'vitest';
import { SecondhandAdapter, toObservation } from '../src/secondhand.js';

describe('toObservation', () => {
  it('maps priced listings to active_ask evidence', () => {
    const o = toObservation(
      {
        id: '1',
        title: 'computer chair',
        price: '£45',
        priceNumeric: 45,
        currency: 'GBP',
        url: 'https://example.com/1',
        marketplace: 'facebook',
      },
      'facebook',
    );
    expect(o.id).toBe('facebook:1');
    expect(o.asks).toHaveLength(1);
    expect(o.asks[0]).toMatchObject({ kind: 'active_ask', amount: 45, currency: 'GBP' });
    expect(o.images).toEqual([]);
  });

  it('keeps unpriced listings with zero asks, never invents a price', () => {
    const o = toObservation(
      { id: '2', title: 'free chair', price: 'free', url: 'https://example.com/2', marketplace: 'facebook' },
      'facebook',
    );
    expect(o.asks).toHaveLength(0);
  });
});

describe('SecondhandAdapter', () => {
  it('searches without throwing when marketplaces are unavailable', async () => {
    const a = new SecondhandAdapter();
    const out = await a.search({ query: 'aeron chair', limit: 3 });
    expect(Array.isArray(out)).toBe(true);
  }, 60_000);
});
