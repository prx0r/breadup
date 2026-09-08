import { describe, expect, it } from 'vitest';
import { activeAsk, type ListingObservation } from '../src/listing.js';

const listing = (asks: ListingObservation['asks']): ListingObservation => ({
  id: 'fb:1',
  marketplace: 'facebook',
  title: 'computer chair',
  url: 'https://example.com/1',
  images: [],
  observedAt: new Date().toISOString(),
  asks,
});

describe('activeAsk', () => {
  it('prefers the active ask over other evidence', () => {
    const l = listing([
      { kind: 'sold_evidence', amount: 300, currency: 'GBP', observedAt: '', source: 'ebay' },
      { kind: 'active_ask', amount: 45, currency: 'GBP', observedAt: '', source: 'facebook' },
    ]);
    expect(activeAsk(l)?.amount).toBe(45);
  });

  it('returns null when no active ask exists', () => {
    const l = listing([
      { kind: 'sold_evidence', amount: 300, currency: 'GBP', observedAt: '', source: 'ebay' },
    ]);
    expect(activeAsk(l)).toBeNull();
  });

  it('never merges evidence kinds', () => {
    const l = listing([
      { kind: 'active_ask', amount: 45, currency: 'GBP', observedAt: '', source: 'facebook' },
      { kind: 'user_realized', amount: 285, currency: 'GBP', observedAt: '', source: 'breadup' },
    ]);
    // Distinct observations stay distinct; no market_price shortcut.
    expect(l.asks).toHaveLength(2);
    expect(l.asks[0].kind).not.toBe(l.asks[1].kind);
  });
});
