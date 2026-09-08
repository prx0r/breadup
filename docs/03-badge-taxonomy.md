# 03 — Badge Taxonomy and Economic Definitions

## Common quantities

Let:

- `R` = realized revenue excluding sales tax collected for authorities
- `C` = acquisition / COGS attached to sold units
- `F` = marketplace + payment fees
- `S` = outbound shipping and fulfillment cost paid by seller
- `A` = attributable advertising spend
- `U` = refunds, returns, chargebacks, write-offs
- `O` = attributable variable operating costs
- `K` = capital at risk for the position
- `D` = days held
- `V_fair` = estimated fair realizable value before the purchase
- `P_buy` = all-in acquisition price
- `p_sale(T)` = calibrated probability of sale by horizon T

### Realized contribution profit

`CP = R - C - F - S - A - U - O`

### Realized ROI on capital at risk

`ROI = CP / K`

### Realized discount / edge versus ex-ante fair value

`EDGE = (V_fair - P_buy) / V_fair`

### Inventory turnover

For an accounting period:

`TURNOVER = COGS / average_inventory_at_cost`

### Days inventory outstanding

`DIO = average_inventory_at_cost / COGS * period_days`

### Expected opportunity value

For outcome scenarios `i`:

`EV = sum_i p_i * net_cashflow_i - P_buy`

A practical two-state approximation:

`EV_T = p_sale(T) * expected_net_sale_proceeds + (1-p_sale(T)) * expected_residual_value_T - P_buy`

### Expected return on capital

`EROC_T = EV_T / K`

## Badge design rule

Use cohort percentiles rather than permanent arbitrary numbers where possible. A badge is emitted only when minimum evidence and sample-size rules are met.

## Core badges

### GRAIL FOUND
**Meaning:** rare, high-value, low-frequency opportunity that actually realized exceptional economics.

Require all:

- evidence tier E4
- `ROI >= max(configured_floor, cohort_p95_ROI)`
- `CP >= minimum_absolute_profit`
- ex-ante scanner rarity estimate `q_find <= cohort_p10_find_probability`
- positive ex-ante `EDGE`
- no unresolved return/chargeback window

A Grail is deliberately not "expensive item sold." It is exceptional realized return combined with genuine scarcity of discovery.

### SNIPE
**Meaning:** an underpriced opportunity was detected and secured unusually quickly.

Require:

- `EDGE >= cohort_p90_edge`
- `detection_to_commit_seconds <= cohort_p10_latency`
- transaction evidence E3 or better
- later realization is displayed separately; failed snipes remain failed, not silently removed

### FLIP
**Meaning:** profitable, fast inventory turnover.

Require:

- E4
- `CP > 0`
- `D <= cohort_p25_days_held`
- `ROI >= cohort_median_ROI`

### QUICK BREAD
**Meaning:** exceptional profit velocity.

`profit_velocity = CP / max(D, 1)`

Require E4 and `profit_velocity >= cohort_p90_profit_velocity`.

### DEEP VALUE
**Meaning:** bought substantially below defensible ex-ante fair value.

Require:

- at least E2 at acquisition
- `EDGE >= cohort_p95_edge`
- fair-value model had minimum comp count and confidence

Realized outcome is shown beside the badge but is not required for the acquisition badge.

### DIAMOND FIND
**Meaning:** slow-turn inventory ultimately justified the wait.

Require E4, `D >= cohort_p75_days_held`, and `ROI >= cohort_p90_ROI`.

This rewards patience only when the economics actually validate it.

### CASHFLOW MACHINE
**Meaning:** repeatable positive economics, not one lucky hit.

Across trailing N sales:

- `sum(CP) > 0`
- contribution margin > cohort median
- at least N_min realized sales
- no single sale contributes more than `concentration_cap` of total CP
- drawdown and refund rate below configured limits

### TURNOVER MONSTER
**Meaning:** exceptional inventory velocity without sacrificing profitability.

Require trailing-period `TURNOVER >= cohort_p90_turnover` and positive CP.

### FAT MARGIN
**Meaning:** high realized contribution margin.

`contribution_margin = CP / R`

Require E4 and contribution margin >= cohort p90 with minimum order count.

### BREAD AND BUTTER
**Meaning:** boring, repeatable, low-volatility profit.

Require:

- minimum N realized periods
- positive median period CP
- coefficient of variation of period CP below cohort p25
- no period drawdown beyond threshold

### SLEEPER
**Meaning:** opportunity had low market attention but strong realized economics.

Require low attention proxy at discovery (views/watchers/listing velocity/search volume percentile) and E4 ROI above cohort p80.

### ARBITRAGE
**Meaning:** contemporaneous cross-market price discrepancy survived all transaction costs.

`arb_edge = executable_net_sell_price_B - all_in_buy_price_A`

Require `arb_edge > 0` at discovery with timestamps inside freshness limit. "The prices looked different yesterday" does not count.

### FIRST BREAD
First positive E4 contribution profit for a user or business.

### LOAF
Cumulative realized CP crosses an app-defined milestone. This is a progression badge, not an investment claim.

### BAKERY
At least three independent businesses with positive trailing realized CP and minimum sample size.

### JOBLESS
A business produces positive realized CP during a period with zero human-approved operational actions beyond pre-authorized policies.

This is a fun badge for genuine automation, not merely absence from the app.

## Scanner badges

### SHARP EYES
High precision among revealed opportunities.

### CALIBRATED
Brier score / log loss is strong enough that stated probabilities are empirically trustworthy.

### EARLY
Median discovery timestamp materially precedes benchmark scanners for matched opportunities.

### GRAILMAKER
Minimum number of independently realized GRAIL FOUND opportunities, with concentration limits.

### LOW NOISE
High precision combined with low alert volume. This explicitly rewards signal-to-noise ratio.

### BREAD PRINTER
Scanner has produced positive aggregate realized user CP after scanner fees across a minimum number of independent users. Use cautiously in public marketing; show the exact historical basis and never imply future returns.
