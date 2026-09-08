# BreadUp Architecture (v0)

## Ingestion

```text
secondhand-mcp (FB / eBay / Depop / Poshmark)
  → packages/marketplaces (SecondhandAdapter)
  → packages/domain (ListingObservation + PriceEvidence)
```

- secondhand-mcp owns transport. eBay uses the official Browse API
  (needs `EBAY_CLIENT_ID`/`EBAY_CLIENT_SECRET`); Facebook uses
  web-facing mechanisms (no creds, rate-limited, fragile by nature);
  Depop/Poshmark need a local Chrome/Chromium install.
- Every marketplace failure degrades to empty results, never throws.
- `MarketplaceAdapter` interface (`search`/`fetch`) keeps providers
  swappable: eBay official, Facebook browser adapter, user CSV import.

## Current status

- `packages/domain`: canonical `ListingObservation`, `PriceEvidence`
  kinds (`active_ask`, `observed_ask`, `sold_evidence`, `user_realized`,
  `dealer_offer`), `VisualFingerprint` stub, `MarketplaceAdapter` interface.
- `packages/marketplaces`: `SecondhandAdapter` over secondhand-mcp.
- Verified live: graceful degradation with no eBay creds and no Chrome
  (empty results, no throws). Facebook live search requires either a
  working browser binary or tolerance for FB's first-run wall.

## Next (per build sequence)

1. Image pipeline (download/cache → pHash → SAM crop → DINO → pgvector)
2. Visual search from reference photo
3. Muse assessor (`ItemAssessment` JSON)
4. eBay comps (keyword + `searchByImage`)
5. Opportunity engine (profit/ROIC/hold/hiddenness)
