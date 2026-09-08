import test from 'node:test';
import assert from 'node:assert/strict';
import { betaPosteriorMean, brierScore, scannerQualityScore, sampleConfidence } from '../src/scannerScore.mjs';

test('posterior shrinks small samples', () => {
  assert.ok(betaPosteriorMean(2, 2) < 1);
});

test('brier score is zero for perfect forecasts', () => {
  assert.equal(brierScore([{ p: 1, y: 1 }, { p: 0, y: 0 }]), 0);
});

test('scanner score remains normalized', () => {
  const score = scannerQualityScore({ quality:1, calibration:1, economicAlpha:1, freshness:1, sampleConfidence:1, lowNoise:1 });
  assert.ok(Math.abs(score - 1) < 1e-12);
});

test('sample confidence rises with observations', () => {
  assert.ok(sampleConfidence(100) > sampleConfidence(10));
});
