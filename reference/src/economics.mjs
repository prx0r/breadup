export function realizedContributionProfit({
  revenue = 0,
  cogs = 0,
  fees = 0,
  shipping = 0,
  ads = 0,
  refunds = 0,
  variableOps = 0,
}) {
  return revenue - cogs - fees - shipping - ads - refunds - variableOps;
}

export function roiOnCapitalAtRisk(contributionProfit, capitalAtRisk) {
  if (!(capitalAtRisk > 0)) return null;
  return contributionProfit / capitalAtRisk;
}

export function contributionMargin(contributionProfit, revenue) {
  if (!(revenue > 0)) return null;
  return contributionProfit / revenue;
}

export function fairValueEdge(fairValue, allInBuyPrice) {
  if (!(fairValue > 0)) return null;
  return (fairValue - allInBuyPrice) / fairValue;
}

export function expectedValueTwoState({
  saleProbability,
  expectedNetSaleProceeds,
  expectedResidualValue,
  acquisitionCost,
}) {
  if (saleProbability < 0 || saleProbability > 1) {
    throw new RangeError('saleProbability must be in [0,1]');
  }
  return (
    saleProbability * expectedNetSaleProceeds +
    (1 - saleProbability) * expectedResidualValue -
    acquisitionCost
  );
}

export function expectedReturnOnCapital(expectedValue, capitalAtRisk) {
  if (!(capitalAtRisk > 0)) return null;
  return expectedValue / capitalAtRisk;
}

export function inventoryTurnover(cogs, averageInventoryAtCost) {
  if (!(averageInventoryAtCost > 0)) return null;
  return cogs / averageInventoryAtCost;
}

export function daysInventoryOutstanding(cogs, averageInventoryAtCost, periodDays) {
  if (!(cogs > 0) || !(periodDays > 0)) return null;
  return (averageInventoryAtCost / cogs) * periodDays;
}

export function profitVelocity(contributionProfit, daysHeld) {
  return contributionProfit / Math.max(daysHeld, 1);
}

export function maximumDrawdown(values) {
  if (!values.length) return 0;
  let peak = values[0];
  let maxDd = 0;
  for (const v of values) {
    if (v > peak) peak = v;
    if (peak > 0) maxDd = Math.max(maxDd, (peak - v) / peak);
  }
  return maxDd;
}
