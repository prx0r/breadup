import { expectedValueTwoState, expectedReturnOnCapital } from './economics.mjs';
import { awardPositionBadges } from './badges.mjs';
import { scannerQualityScore, betaPosteriorMean, sampleConfidence } from './scannerScore.mjs';

const opportunity = {
  saleProbability: 0.72,
  expectedNetSaleProceeds: 310,
  expectedResidualValue: 150,
  acquisitionCost: 120,
};
const ev = expectedValueTwoState(opportunity);
console.log('Opportunity EV:', ev.toFixed(2));
console.log('Expected return on capital:', expectedReturnOnCapital(ev, 120).toFixed(3));

const cohort = {
  p95Roi: 1.2,
  p90Roi: 0.8,
  medianRoi: 0.25,
  p90Edge: 0.35,
  p95Edge: 0.50,
  p10FindProbability: 0.08,
  p10CommitLatencySeconds: 45,
  p25DaysHeld: 8,
  p75DaysHeld: 30,
  p90ProfitVelocity: 25,
};

const position = {
  revenue: 420,
  cogs: 110,
  fees: 28,
  shipping: 12,
  ads: 0,
  refunds: 0,
  variableOps: 5,
  capitalAtRisk: 120,
  fairValue: 340,
  allInBuyPrice: 110,
  daysHeld: 4,
  detectionToCommitSeconds: 20,
  findProbability: 0.04,
  fairValueCompCount: 8,
  fairValueConfidence: 0.91,
  evidenceTier: 'E4',
  unresolvedReturnWindow: false,
  zeroHumanOperationalActions: true,
  isFirstPositiveRealizedProfit: true,
};
console.log('Badge result:', awardPositionBadges(position, cohort));

const resolved = 180;
const hits = 128;
const sqs = scannerQualityScore({
  quality: betaPosteriorMean(hits, resolved),
  calibration: 0.86,
  economicAlpha: 0.74,
  freshness: 0.92,
  sampleConfidence: sampleConfidence(resolved),
  lowNoise: 0.88,
});
console.log('GrailGecko SQS:', sqs.toFixed(3));
