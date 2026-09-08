/**
 * Opportunity engine: listing + comps → expected economics + evidence.
 *
 * Every number in the output traces to an input. Confidence intervals
 * come from comp dispersion, not vibes. Hiddenness measures the gap
 * between what the title says and what the item appears to be.
 */

export interface Comp {
  price: number;
  currency: string;
  source: string;
  url?: string;
  kind: 'active_ask' | 'sold_evidence';
}

export interface Costs {
  acquisition: number;
  travel?: number;
  fees?: number;
  repair?: number;
  shipping?: number;
}

export interface OpportunityInput {
  ask: number;
  currency: string;
  comps: Comp[];
  costs?: Partial<Costs>;
  identityConfidence?: number;
  titleInformativeness?: number;
}

export interface Opportunity {
  expectedExitLow: number;
  expectedExitHigh: number;
  expectedNetLow: number;
  expectedNetHigh: number;
  roiLow: number;
  roiHigh: number;
  hiddenness: number;
  confidence: number;
  evidence: string[];
  currency: string;
}

function quantile(sorted: number[], q: number): number {
  if (!sorted.length) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.floor(q * sorted.length)));
  return sorted[i];
}

export function evaluate(input: OpportunityInput): Opportunity | null {
  const { ask, currency, comps } = input;
  if (!(ask > 0) || !comps.length) return null;
  const sold = comps
    .filter((c) => c.kind === 'sold_evidence' && c.price > 0)
    .map((c) => c.price)
    .sort((a, b) => a - b);
  const pool = (sold.length ? sold : comps.map((c) => c.price)).sort((a, b) => a - b);
  if (!pool.length) return null;

  const low = quantile(pool, 0.25);
  const high = quantile(pool, 0.75);
  const costs = input.costs ?? {};
  const total = (costs.acquisition ?? ask) + (costs.travel ?? 0) + (costs.fees ?? 0) + (costs.repair ?? 0) + (costs.shipping ?? 0);
  const netLow = low - total;
  const netHigh = high - total;
  const roiLow = netLow / Math.max(1, total);
  const roiHigh = netHigh / Math.max(1, total);

  const identityConfidence = input.identityConfidence ?? 0.5;
  const titleInfo = input.titleInformativeness ?? 0.5;
  // Hiddenness: confident identity + uninformative title = mispriced.
  const hiddenness = Math.min(1, Math.max(0, identityConfidence * (1 - titleInfo) * 1.2));
  // Confidence: more comps + tighter spread = more trust.
  const spread = high > 0 ? (high - low) / high : 1;
  const confidence = Math.min(
    0.95,
    Math.max(0.05, 0.3 + Math.min(pool.length, 10) * 0.04 + (1 - Math.min(1, spread)) * 0.25),
  );

  const evidence = [
    `${pool.length} comp${pool.length === 1 ? '' : 's'} (${sold.length} confirmed sales)`,
    `exit range £${Math.round(low)}–£${Math.round(high)} (p25–p75)`,
    `total cost basis £${Math.round(total)}`,
  ];
  if (sold.length === 0) evidence.push('no confirmed sales — exit range is asks only, treat with caution');

  return {
    expectedExitLow: Math.round(low),
    expectedExitHigh: Math.round(high),
    expectedNetLow: Math.round(netLow),
    expectedNetHigh: Math.round(netHigh),
    roiLow: Math.round(roiLow * 100) / 100,
    roiHigh: Math.round(roiHigh * 100) / 100,
    hiddenness: Math.round(hiddenness * 100) / 100,
    confidence: Math.round(confidence * 100) / 100,
    evidence,
    currency,
  };
}

export function meetsThreshold(
  opp: Opportunity | null,
  rule: { minExpectedProfit?: number; minRoi?: number; minConfidence?: number },
): boolean {
  if (!opp) return false;
  if (rule.minExpectedProfit !== undefined && opp.expectedNetLow < rule.minExpectedProfit) return false;
  if (rule.minRoi !== undefined && opp.roiLow < rule.minRoi) return false;
  if (rule.minConfidence !== undefined && opp.confidence < rule.minConfidence) return false;
  return true;
}
