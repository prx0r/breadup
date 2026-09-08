# Reference implementation

This folder intentionally has no external runtime dependencies so the economic formulas can be tested anywhere with Node 18+.

It is **not** the production BreadUp backend. Its purpose is to make the canonical formulas executable and testable before they are copied into services, analytics jobs, or iOS views.

Run:

```bash
npm test
npm run demo
```

Production guidance:

- keep formula versions immutable once used for public badge awards
- store the formula/rule version with every derived award
- calculate money from ledger events, not mutable UI fields
- use decimal/fixed-point money types in production rather than binary floating point
- use cohort statistics from comparable market/category/time windows
