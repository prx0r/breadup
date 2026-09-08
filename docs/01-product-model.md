# 01 — Product Model

## Product grammar

BreadUp should feel understandable in ten seconds:

1. **Prompt it** — describe the business or opportunity you want.
2. **Fund it** — set simulated or real operating capital and hard risk limits.
3. **Run it** — an entrepreneur agent scans, proposes, and executes allowed actions.
4. **Get your bread up** — P&L, inventory, cash, missions, badges, and scanner performance update from verified events.
5. **Fork what works** — reuse agents, scanners, business templates, and policies.

The advanced layer appears progressively instead of on first launch.

## Simple mode

The default home screen shows only:

- Cash
- Inventory at cost
- Realized P&L
- Pending opportunities
- Active businesses
- One next mission
- Recent badges

A user can tap any metric to reveal the professional definition and evidence.

## Pro mode

Pro mode adds:

- contribution margin and net operating P&L
- inventory turnover
- days inventory outstanding
- capital-at-risk
- realized vs unrealized gains
- expected value and confidence intervals
- scanner precision, calibration, coverage, freshness, and alpha
- per-channel attribution
- agent spend policies and approval thresholds
- raw evidence and event log

## Business lifecycle

`IDEA -> SIMULATING -> READY -> LIVE -> PAUSED -> WINDING_DOWN -> CLOSED`

A business can have one or more execution channels, including Shopify, Etsy, eBay, direct web, or future agent-commerce channels. Channel adapters are replaceable; the business object is not a Shopify object.

## Entrepreneur Agent

Every agent has:

- `strategy_manifest`
- `capital_policy`
- `action_permissions`
- `max_single_action_spend`
- `daily_spend_cap`
- `inventory_cap`
- `allowed_channels`
- `required_evidence_level`
- `human_approval_rules`
- `model/runtime version`
- `immutable action log`

Agents should default to **recommend-before-execute**. Autonomy is unlocked by user-defined policies, verified track record, and explicit channel permissions.

## Opportunity object

An opportunity is a claim, not a fact. It contains:

- target item / SKU / niche / action
- predicted acquisition cost
- predicted sale price distribution
- transaction costs
- estimated sell-through probability by horizon
- expected time to sale
- expected net profit
- expected return on capital
- evidence bundle
- scanner(s) that emitted it
- confidence and model version
- expiry / freshness

This keeps scanners comparable even when they use different techniques.

## Evidence tiers

- **E0 — hypothesis:** model inference only
- **E1 — observed:** current listing/source observed
- **E2 — corroborated:** multiple independent sources or historical comps
- **E3 — transacted:** purchase/order event exists
- **E4 — realized:** sale/return/fees reconciled and profit is known

Badges representing economic success should generally require E4.
