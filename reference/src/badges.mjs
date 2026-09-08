import {
  realizedContributionProfit,
  roiOnCapitalAtRisk,
  fairValueEdge,
  profitVelocity,
} from './economics.mjs';

const tierRank = { E0:0, E1:1, E2:2, E3:3, E4:4 };
const hasTier = (actual, needed) => tierRank[actual] >= tierRank[needed];

export function derivePositionMetrics(position) {
  const cp = realizedContributionProfit(position);
  const roi = roiOnCapitalAtRisk(cp, position.capitalAtRisk);
  const edge = fairValueEdge(position.fairValue, position.allInBuyPrice ?? position.cogs);
  const velocity = profitVelocity(cp, position.daysHeld ?? 0);
  return { cp, roi, edge, velocity };
}

export function awardPositionBadges(position, cohort, config = {}) {
  const m = derivePositionMetrics(position);
  const out = [];
  const minProfit = config.minimumAbsoluteProfit ?? 20;
  const evidence = position.evidenceTier ?? 'E0';

  if (
    hasTier(evidence, 'E4') &&
    m.cp >= minProfit &&
    m.roi != null &&
    m.roi >= Math.max(config.grailRoiFloor ?? 1, cohort.p95Roi ?? 1) &&
    position.findProbability != null &&
    position.findProbability <= (cohort.p10FindProbability ?? 0.1) &&
    m.edge != null && m.edge > 0 &&
    !position.unresolvedReturnWindow
  ) out.push('GRAIL_FOUND');

  if (
    hasTier(evidence, 'E3') &&
    m.edge != null && m.edge >= (cohort.p90Edge ?? 0.3) &&
    (position.detectionToCommitSeconds ?? Infinity) <= (cohort.p10CommitLatencySeconds ?? 60)
  ) out.push('SNIPE');

  if (
    hasTier(evidence, 'E4') &&
    m.cp > 0 &&
    (position.daysHeld ?? Infinity) <= (cohort.p25DaysHeld ?? 7) &&
    m.roi != null && m.roi >= (cohort.medianRoi ?? 0)
  ) out.push('FLIP');

  if (
    hasTier(evidence, 'E4') &&
    m.velocity >= (cohort.p90ProfitVelocity ?? 20)
  ) out.push('QUICK_BREAD');

  if (
    hasTier(evidence, 'E2') &&
    m.edge != null && m.edge >= (cohort.p95Edge ?? 0.5) &&
    (position.fairValueCompCount ?? 0) >= (config.minFairValueComps ?? 3) &&
    (position.fairValueConfidence ?? 0) >= (config.minFairValueConfidence ?? 0.7)
  ) out.push('DEEP_VALUE');

  if (
    hasTier(evidence, 'E4') &&
    (position.daysHeld ?? 0) >= (cohort.p75DaysHeld ?? 30) &&
    m.roi != null && m.roi >= (cohort.p90Roi ?? 0.5)
  ) out.push('DIAMOND_FIND');

  if (
    hasTier(evidence, 'E4') &&
    m.cp > 0 &&
    position.zeroHumanOperationalActions === true
  ) out.push('JOBLESS');

  if (hasTier(evidence, 'E4') && m.cp > 0 && position.isFirstPositiveRealizedProfit === true) {
    out.push('FIRST_BREAD');
  }

  return { metrics: m, badges: out };
}
