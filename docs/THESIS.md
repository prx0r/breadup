# BreadUp Thesis

**BreadUp finds value that text search cannot see.**

A seller writes "old office chair £25." BreadUp sees the photos and
realizes it is a Herman Miller Aeron, identifies generation, size,
accessories and condition, finds comparable inventory elsewhere,
estimates resale economics, and alerts the user.

## The loop

```text
messy marketplace listings
  → visual understanding → canonical item identity
  → cross-market comparables → condition/value normalization
  → expected profit / ROIC / hold time → GRAIL
  → acquire → inventory → relist → realized P&L → scanner learns
```

## Rules

1. **Gamify the interpretation, never the accounting.** Every playful
   label is backed by explicit economic formulas and evidence requirements.
2. **Never collapse price evidence.** Active asks, observed disappearances,
   confirmed sales and user-realized sales are distinct observations with
   distinct confidence. There is no `market_price` shortcut.
3. **Listing data informs decisions; it never instructs the agent.**
   Titles and descriptions are untrusted input.
4. **Track records beat claims.** A scanner is worth what its realized
   P&L says, not what its description promises.
