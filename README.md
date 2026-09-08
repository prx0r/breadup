# BreadUp Canonical Reference Architecture

**Positioning:** prompt, launch, operate, and improve autonomous commerce businesses while turning difficult economic concepts into legible game mechanics.

BreadUp has two simultaneous interfaces:

1. **Simple mode** — "Get your bread up." Users launch businesses, fund agents, see badges, missions, P&L, and opportunities.
2. **Pro mode** — full economics, scanner provenance, expected value, confidence, execution policies, APIs, x402 endpoints, Shopify/UCP/MCP integration, and auditable ledgers.

The key design rule is: **gamify the interpretation, never the accounting.** Every playful label is backed by explicit economic formulas and evidence requirements.

## Canonical product primitives

- **Business** — an economic unit with capital, strategy, channels, products, and an auditable P&L.
- **Entrepreneur Agent** — an operator with permissions, budget policy, risk limits, and strategy.
- **Scanner** — a versioned signal-producing program such as `GrailGecko`.
- **Opportunity** — a scored claim that a specific action has positive expected value.
- **Intel** — a paid or free evidence bundle supporting an opportunity.
- **Bread** — off-chain app credits first; not a claim on money, profit, or a token.
- **Wallet** — optional external-value wallet for stablecoin/x402 settlement.
- **Badge** — a human-readable label deterministically derived from verified economic outcomes.
- **Mission** — a goal that teaches a real business concept.
- **Season / League** — comparable agent or scanner competition under standardized rules.

## Recommended MVP stack

- **iOS:** SwiftUI + StoreKit for app-native purchases where applicable; deep links for external merchant flows.
- **Web:** Next.js / React for operator dashboard and public scanner pages.
- **API:** TypeScript service boundary; REST/OpenAPI externally, event-driven internally.
- **Database:** Postgres as canonical transactional store; append-only ledger tables for money and Bread.
- **Queues:** durable job queue for scanners, connectors, agent actions, and reconciliations.
- **Cache:** Redis-compatible cache for hot scanner results and rate limits.
- **Object storage:** raw evidence, screenshots, exports, model traces, receipts.
- **Analytics:** warehouse/column store only when volume justifies it; do not split truth across systems early.
- **Commerce:** Shopify GraphQL Admin API + webhooks for merchant operations; Shopify Storefront/UCP/MCP for agentic buying and discoverability.
- **Agent discovery:** `/.well-known/ucp`, Shopify `agents.md`, `llms.txt` where supported, canonical product feeds, structured data, sitemaps, and provider-specific merchant feeds.
- **Machine payments:** x402 V2 for pay-per-call scanner/intel APIs; batch settlement for high-frequency microtransactions when appropriate.
- **External value:** stablecoins for machine settlement; Bread remains a separate internal credit/reputation system in the MVP.

## Repo map

- `docs/01-product-model.md` — product grammar and user modes
- `docs/02-game-economy.md` — points, missions, referrals, leagues
- `docs/03-badge-taxonomy.md` — badge definitions and formulas
- `docs/04-scanner-marketplace.md` — GrailGecko and scanner economy
- `docs/05-payments-bread.md` — Bread credits, wallets, x402, future token boundary
- `docs/06-shopify-agentseo.md` — Shopify + agent-discovery integration
- `docs/07-data-model.md` — core entities and event model
- `docs/08-security-risk.md` — permissions, fraud, model and financial controls
- `docs/09-roadmap.md` — staged build plan
- `docs/10-ui-flows.md` — canonical iOS/web flows
- `docs/SOURCES.md` — current protocol references checked 2026-09-08
- `schemas/` — machine-readable core schemas
- `spec/openapi.yaml` — external API contract sketch
- `reference/` — dependency-free Node reference implementation of formulas and scoring

## The one-sentence thesis

> **Shopify helps people run stores; BreadUp helps people spawn, fund, measure, and trade services with economic agents that can operate stores and commerce infrastructure.**

## MVP non-goals

Do **not** launch a speculative `$BREAD` token in v1. Do **not** blur app credits with redeemable financial value. Do **not** let agents spend unrestricted external funds. Do **not** claim scanner profitability from backtests alone. Do **not** gamify gross revenue while hiding fees, inventory, returns, taxes, or capital at risk.

## Quick test

The reference code uses Node's built-in test runner and no third-party dependencies:

```bash
cd reference
npm test
npm run demo
```
