import test from 'node:test';
import assert from 'node:assert/strict';
import {
  realizedContributionProfit,
  roiOnCapitalAtRisk,
  fairValueEdge,
  expectedValueTwoState,
  inventoryTurnover,
  daysInventoryOutstanding,
} from '../src/economics.mjs';

test('realized contribution profit subtracts all variable economics', () => {
  assert.equal(realizedContributionProfit({ revenue: 200, cogs: 80, fees: 20, shipping: 10, ads: 5, refunds: 0, variableOps: 5 }), 80);
});

test('ROI uses capital at risk', () => {
  assert.equal(roiOnCapitalAtRisk(50, 100), 0.5);
  assert.equal(roiOnCapitalAtRisk(50, 0), null);
});

test('fair value edge', () => {
  assert.equal(fairValueEdge(200, 100), 0.5);
});

test('expected value two-state', () => {
  const ev = expectedValueTwoState({ saleProbability: 0.5, expectedNetSaleProceeds: 200, expectedResidualValue: 100, acquisitionCost: 100 });
  assert.equal(ev, 50);
});

test('inventory formulas', () => {
  assert.equal(inventoryTurnover(1200, 300), 4);
  assert.equal(daysInventoryOutstanding(1200, 300, 365), 91.25);
});
