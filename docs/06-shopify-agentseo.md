# 06 — Shopify + Agent-SEO / Agent-Commerce Integration

## Role of Shopify

BreadUp should integrate with Shopify rather than replace it initially.

Shopify provides merchant-of-record workflows, catalog, checkout, orders, fulfillment ecosystem, themes, and apps. BreadUp provides the entrepreneur-agent layer above it: opportunity discovery, business creation, policy, intelligence, optimization, and cross-channel orchestration.

## Merchant operations

Use Shopify's **GraphQL Admin API** for new public app work. Core BreadUp connector domains:

- products and variants
- inventory
- collections
- orders
- fulfillment status
- discounts
- metafields
- store configuration

Use webhooks for change propagation into BreadUp's event log. Keep Shopify IDs as external references, never primary business IDs.

## Buyer/agent-facing commerce

As of 2026-09-08, Shopify's agentic stack exposes UCP-compliant MCP capabilities for catalog discovery, carts, checkout, and orders. Storefronts advertise UCP through `/.well-known/ucp` and Shopify supports the current `2026-08-25` profile.

BreadUp should therefore support two distinct agent roles:

1. **Merchant operator agent** — authenticated Admin API access to manage the user's store.
2. **Buyer/discovery agent** — UCP/MCP flows for discovering and purchasing products from merchants.

Do not mix these permissions.

## Agent-SEO / machine discoverability compiler

For every BreadUp-managed storefront, compile a machine-discovery bundle from canonical product truth:

- valid sitemap
- structured product data
- clean canonical URLs
- accurate inventory/price state
- Shopify `agents.md` / managed agent instructions where appropriate
- UCP discovery endpoint presence
- Storefront MCP compatibility
- provider-specific merchant feeds
- OpenAI merchant feed mapping where eligible
- Google Merchant Center / supported commerce feed mapping
- public policy/shipping/returns pages
- product identifiers (GTIN/MPN/brand) where valid
- compatibility/exclusion data for installed-base products
- concise machine-readable FAQ and policies

### Canonical rule

One normalized `ProductTruth` object feeds every surface. Never let SEO pages, Shopify product data, agent feeds, and scanner evidence drift into separate manually edited truths.

## BreadUp "Agent Readiness Score"

A merchant can receive a gamified score with hard technical backing:

- 20% catalog completeness
- 15% identifier quality
- 15% price/inventory freshness
- 15% structured data validity
- 10% UCP/MCP discoverability
- 10% policy completeness
- 10% feed acceptance/error rate
- 5% crawl/index hygiene

Badges:

- **AGENT READY** — score >= 80 with no blocking error
- **MACHINE VISIBLE** — UCP/agent endpoints + structured catalog verified
- **CANONICAL** — feed/storefront/structured-data product truth reconciles without material mismatch

## Event flow

`Shopify webhook -> connector verifier -> canonical commerce event -> Postgres event log -> P&L/reputation/materialized views -> agent policy engine`

Outbound:

`agent proposal -> policy check -> idempotent Shopify mutation -> external receipt -> reconciliation event`

## Store provisioning

BreadUp can generate:

- brand brief
- product taxonomy
- initial product content
- theme configuration hints
- navigation
- policies from user-supplied facts
- domain/DNS checklist
- analytics setup checklist
- machine-discovery bundle

But the user should see a clear approval step before external publication or spend-producing actions.
