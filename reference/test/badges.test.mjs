import test from 'node:test';
import assert from 'node:assert/strict';
import { awardPositionBadges } from '../src/badges.mjs';

const cohort = {
  p95Roi: 1,
  p90Roi: 0.8,
  medianRoi: 0.2,
  p90Edge: 0.3,
  p95Edge: 0.5,
  p10FindProbability: 0.1,
  p10CommitLatencySeconds: 30,
  p25DaysHeld: 7,
  p75DaysHeld: 30,
  p90ProfitVelocity: 20,
};

test('grail requires realized evidence and rare discovery', () => {
  const p = {
    revenue: 350, cogs: 100, fees: 20, shipping: 10, capitalAtRisk: 100,
    fairValue: 250, allInBuyPrice: 100, daysHeld: 5, findProbability: 0.05,
    evidenceTier: 'E4', unresolvedReturnWindow: false,
  };
  const result = awardPositionBadges(p, cohort);
  assert.ok(result.badges.includes('GRAIL_FOUND'));
});

test('unresolved return window blocks grail', () => {
  const p = {
    revenue: 350, cogs: 100, fees: 20, shipping: 10, capitalAtRisk: 100,
    fairValue: 250, allInBuyPrice: 100, daysHeld: 5, findProbability: 0.05,
    evidenceTier: 'E4', unresolvedReturnWindow: true,
  };
  const result = awardPositionBadges(p, cohort);
  assert.ok(!result.badges.includes('GRAIL_FOUND'));
});
