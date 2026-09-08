# 04 — Scanner Marketplace: GrailGecko as the Reference Model

## Scanner definition

A scanner is a versioned program that transforms source observations into standardized Opportunity objects.

Examples:

- marketplace underpricing scanner
- collectible grail detector
- replacement-part compatibility scanner
- local supplier stock monitor
- product trend scanner
- ad creative fatigue monitor
- SEO/agent-discovery compliance scanner
- repricing scanner
- cross-market arbitrage scanner

## GrailGecko

`GrailGecko` is the reference product character for a scanner that watches quietly, scans continuously, and strikes only on high-conviction rare opportunities.

Canonical public card:

- price per scan / monitoring period
- categories and markets
- sample size
- verified opportunities
- precision@K
- reveal conversion rate
- realized user outcomes where linked
- median ex-ante edge
- median realized edge
- calibration score
- freshness / median latency
- false-positive cost
- version history
- creator royalty
- verification level

## Payment models

### 1. Pay per scan
`0.01 USDC -> run scanner once -> receive result envelope`

Best for machine clients and x402.

### 2. Monitoring subscription via prepaid Bread
`1 Bread/day -> monitor query -> alert only if threshold is crossed`

Best for humans.

### 3. Pay to reveal
Scanner emits a free teaser and charges for exact source/listing/details.

Reveal price can depend on:

- confidence
- freshness
- expected edge
- exclusivity window
- number of prior reveals

Dynamic pricing must be visible before purchase.

### 4. Bounty
A buyer posts an intent such as "find this Leica lens below £700 in the UK." Scanners compete; the first qualifying result earns the bounty.

### 5. Revenue share
Advanced and legally reviewed only. Creator receives a defined share of platform fees or software revenue — not an undisclosed claim on users' trading returns.

## x402 endpoint example

Human-facing scanner page:

`breadup.dev/s/grailgecko`

Machine endpoint:

`GET api.breadup.dev/v1/scanners/grailgecko/scan?query=...`

Without payment, return HTTP 402 with x402 V2 payment requirements. After payment, return the signed Opportunity envelope.

For high-frequency calls, use x402 batch settlement or prepaid session logic rather than forcing an onchain settlement for every cent-scale request.

## Track-record scoring

A scanner should not be ranked by raw hit rate alone.

### Precision
`precision = true_positive_reveals / all_resolved_reveals`

### Economic precision
`economic_precision = resolved_reveals_with_CP_gt_0 / all_resolved_reveals`

### Brier score
For probability predictions `p_i` and binary realized outcomes `y_i`:

`Brier = mean((p_i - y_i)^2)`

Lower is better.

### Information coefficient
Rank correlation between predicted edge and realized edge for resolved opportunities.

### Net alpha after scanner cost

`user_alpha = realized_CP - scanner_fees - benchmark_CP`

Benchmark can be no-action, market median, or another scanner, but it must be declared.

### Bayesian/shrunk quality

Do not let a scanner with 2/2 wins outrank one with 500/650 wins. Shrink rates toward cohort priors or use a lower credible bound.

Reference implementation uses a Beta posterior mean:

`posterior_hit_rate = (alpha0 + hits) / (alpha0 + beta0 + resolved)`

### Scanner Quality Score (SQS)

Normalize components within comparable scanner cohorts:

`SQS = 0.25*quality + 0.20*calibration + 0.20*economic_alpha + 0.15*freshness + 0.10*sample_confidence + 0.10*low_noise`

All components are [0,1]. Public UI should show components, not only the composite.

## Anti-gaming

- immutable scanner versions for scored calls
- holdout periods before outcomes are scored
- no deletion of losing alerts
- opportunity deduplication
- provenance hash for source observations
- creator cannot mark their own outcome as verified
- refunds/returns reverse realized outcomes
- minimum sample sizes before performance labels
- cohort-normalized comparisons
- separate backtest score from live score
- public version history when scoring changes

## Fork economy

Scanners can be forked. A fork records:

- parent scanner/version
- changed logic or configuration hash
- creator
- royalty policy
- independent track record

A successful scanner becomes a reusable economic primitive. This is the network effect: people build better scanners because BreadUp supplies demand, standardized scoring, identity, billing, and distribution.
