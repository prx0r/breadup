# 05 — Bread, Wallets, x402, and Future Token Boundary

## Three ledgers, never one ambiguous balance

### 1. Fiat/merchant ledger
Tracks actual business money: revenue, inventory cost, refunds, fees, payouts, ad spend, shipping, liabilities.

### 2. Bread ledger
Closed-loop product credits and progression. Every mutation is append-only and references a reason/event.

### 3. External wallet ledger
Onchain/stablecoin transactions and x402 settlements. This is reconciled from chain/facilitator evidence, not inferred from Bread.

Never display them as if 1 Bread = $1 unless Bread is explicitly sold as a fixed non-redeemable credit and legal/app-store implications are handled.

## MVP Bread rules

- earn through product activity and capped referrals
- optionally purchase as consumable app/service credits where platform rules permit
- spend on scanner runs, reveals, premium analytics, simulations, and cosmetic identity
- no withdrawal
- no peer-to-peer cash redemption
- no promise of appreciation
- no public exchange rate to a future token

## x402 role

Use x402 for **machine-to-machine paid APIs**, not as the internal accounting system.

Examples:

- scanner call: $0.01
- premium evidence bundle: $0.05
- compatibility lookup: $0.002
- supplier stock check: $0.005
- agent-generated feed endpoint: metered per request

x402 V2 supports dynamic recipients and automatic discovery, which maps well to a multi-creator scanner marketplace. Batch settlement is attractive when calls become frequent enough that individual settlement overhead dominates unit economics.

## Human vs machine payment UX

Human:

`Bread balance -> tap Reveal -> debit Bread -> entitlement created`

Machine:

`HTTP request -> 402 payment requirements -> wallet authorizes -> retry -> entitlement/result`

The entitlement layer is shared, so the same paid result is not repurchased unnecessarily during its access window.

## Creator payouts

Maintain an internal payable ledger:

`gross_scanner_revenue - platform_fee - refunds - settlement_cost = creator_payable`

Payout can be fiat or supported stablecoin depending on jurisdiction and onboarding. Creator earnings should not be represented as Bread if Bread is non-redeemable.

## Future `$BREAD`

Treat a transferable token as a **separate future product requiring legal, tax, App Store, AML/sanctions, custody, market-manipulation, and consumer-protection review**.

Do not make core product utility depend on speculation. A future token, if ever launched, should not retroactively turn ordinary Bread points into an investment expectation.

## Agent spending policies

Every external-value action has:

- currency/asset
- max amount
- counterparty
- purpose
- policy rule that authorized it
- quoted expected value
- evidence hash
- idempotency key
- settlement status
- reversal/refund status

Recommended defaults:

- simulate before live
- per-action cap
- daily cap
- category/channel allowlist
- human approval above threshold
- disable irreversible actions on model uncertainty spikes
