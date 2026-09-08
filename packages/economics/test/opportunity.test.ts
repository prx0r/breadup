import { describe, expect, it } from 'vitest';
import { evaluate, meetsThreshold } from '../src/opportunity.js';

const comps = (n: number, base = 300, spread = 40) =>
  Array.from({ length: n }, (_, i) => ({
    price: base + ((i * 37) % spread) - spread / 2,
    currency: 'GBP',
    source: 'ebay',
    kind: 'sold_evidence' as const,
  }));

describe('evaluate', () => {
  it('produces the Aeron-goblin numbers', () => {
    const opp = evaluate({
      ask: 45,
      currency: 'GBP',
      comps: comps(8),
      costs: { travel: 8, fees: 36, repair: 5 },
      identityConfidence: 0.94,
      titleInformativeness: 0.05,
    });
    expect(opp).not.toBeNull();
    expect(opp!.expectedNetLow).toBeGreaterThan(150);
    expect(opp!.roiLow).toBeGreaterThan(1.5);
    expect(opp!.hiddenness).toBeGreaterThan(0.9);
    expect(opp!.evidence.length).toBeGreaterThanOrEqual(3);
  });

  it('returns null without ask or comps', () => {
    expect(evaluate({ ask: 0, currency: 'GBP', comps: comps(3) })).toBeNull();
    expect(evaluate({ ask: 45, currency: 'GBP', comps: [] })).toBeNull();
  });

  it('warns when only asks exist, no confirmed sales', () => {
    const opp = evaluate({
      ask: 45,
      currency: 'GBP',
      comps: [{ price: 300, currency: 'GBP', source: 'ebay', kind: 'active_ask' }],
    });
    expect(opp!.evidence.join(' ')).toMatch(/no confirmed sales/i);
  });

  it('unprofitable deals fail thresholds', () => {
    const opp = evaluate({
      ask: 350,
      currency: 'GBP',
      comps: comps(6, 300, 20),
      identityConfidence: 0.9,
      titleInformativeness: 0.9,
    });
    expect(meetsThreshold(opp, { minExpectedProfit: 80, minRoi: 0.6 })).toBe(false);
  });

  it('hiddenness rewards confident identity on vague titles', () => {
    const vague = evaluate({
      ask: 45, currency: 'GBP', comps: comps(5),
      identityConfidence: 0.94, titleInformativeness: 0.05,
    });
    const obvious = evaluate({
      ask: 45, currency: 'GBP', comps: comps(5),
      identityConfidence: 0.94, titleInformativeness: 0.95,
    });
    expect(vague!.hiddenness).toBeGreaterThan(obvious!.hiddenness);
  });
});
