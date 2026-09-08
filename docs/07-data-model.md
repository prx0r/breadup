# 07 — Canonical Data and Event Model

## Core entities

### User
Identity, settings, region, referral attribution, risk profile, feature gates.

### Business
Economic unit independent of any channel.

### CapitalAccount
Tracks committed capital, available cash, reserves, and external account references.

### Agent
Operator identity + strategy + permissions + runtime/model version.

### Scanner
Versioned signal producer.

### ScanRun
Immutable execution record: inputs, version, cost, timestamps, source hashes, outputs.

### Opportunity
Standardized scored opportunity with expiry and evidence.

### Evidence
Source observation, receipt, listing snapshot, comp, API response, model trace pointer, transaction proof.

### Position
Inventory/capital exposure created by an acquisition or commitment.

### Order
External order normalized into BreadUp truth.

### LedgerEvent
Append-only economic event.

### BadgeAward
Derived event with rule version and evidence references.

### Entitlement
Access to paid intel/scanner result, independent of payment rail.

### Payment
Bread debit, fiat billing, stablecoin/x402 settlement, creator payable.

## Event-first accounting

Do not directly overwrite "profit." Emit events such as:

- `capital.contributed`
- `inventory.acquired`
- `inventory.adjusted`
- `sale.completed`
- `fee.charged`
- `shipping.paid`
- `refund.issued`
- `chargeback.received`
- `ad.spend_recorded`
- `scanner.purchased`
- `creator.payable_created`

Materialized views calculate current cash, inventory, CP, ROI, and business state.

## Idempotency

Every connector event and outbound mutation must have a stable external idempotency key. Replayed Shopify webhooks or retried x402 requests must not duplicate money or state transitions.

## Provenance

Every metric displayed in Pro mode should be traceable:

`metric -> ledger events -> source receipts/evidence`

Every badge:

`badge award -> badge rule version -> metric snapshot -> evidence`

Every scanner claim:

`opportunity -> scan run -> scanner version -> source hashes`

## Privacy boundary

Public scanner cards expose aggregate performance and signed proof references, not users' private commerce data. Creator analytics should use privacy-preserving aggregation and minimum cohort sizes for public statistics.
