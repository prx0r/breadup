export function betaPosteriorMean(hits, resolved, alpha0 = 2, beta0 = 2) {
  if (hits < 0 || resolved < 0 || hits > resolved) throw new RangeError('invalid counts');
  return (alpha0 + hits) / (alpha0 + beta0 + resolved);
}

export function brierScore(predictions) {
  if (!predictions.length) return null;
  let total = 0;
  for (const { p, y } of predictions) {
    if (p < 0 || p > 1 || (y !== 0 && y !== 1)) throw new RangeError('invalid prediction');
    total += (p - y) ** 2;
  }
  return total / predictions.length;
}

export function economicPrecision(outcomes) {
  const resolved = outcomes.filter(x => x.resolved);
  if (!resolved.length) return null;
  return resolved.filter(x => x.contributionProfit > 0).length / resolved.length;
}

export function scannerQualityScore({
  quality,
  calibration,
  economicAlpha,
  freshness,
  sampleConfidence,
  lowNoise,
}) {
  const vals = [quality, calibration, economicAlpha, freshness, sampleConfidence, lowNoise];
  if (vals.some(v => v < 0 || v > 1)) throw new RangeError('all components must be in [0,1]');
  return (
    0.25 * quality +
    0.20 * calibration +
    0.20 * economicAlpha +
    0.15 * freshness +
    0.10 * sampleConfidence +
    0.10 * lowNoise
  );
}

export function sampleConfidence(resolved, halfSaturation = 50) {
  if (resolved < 0) throw new RangeError('resolved must be >= 0');
  return resolved / (resolved + halfSaturation);
}
