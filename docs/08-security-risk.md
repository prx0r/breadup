# 08 — Security, Fraud, and Financial Controls

## Threat model

BreadUp combines LLM agents, commerce accounts, external APIs, user funds, marketplace intelligence, and potentially crypto wallets. Treat every external observation as untrusted.

Primary risks:

- prompt injection from listings, product pages, emails, merchant text, or scanner data
- malicious scanner outputs
- credential theft
- unauthorized Shopify mutations
- overspending
- replayed webhooks/payments
- fake realized outcomes
- referral/Sybil farming
- scanner self-dealing
- price manipulation around thin markets
- stale inventory or price data
- model hallucination presented as evidence

## Agent execution boundary

LLM output is always a **proposal**. A deterministic policy engine decides whether an action is executable.

Policy checks include:

- action allowlist
- user/business ownership
- budget
- daily spend
- external counterparty
- evidence tier
- confidence
- data freshness
- inventory limits
- irreversible-action flag
- required human approval

## Secrets

- OAuth tokens encrypted at rest
- wallet signing isolated from general agent runtime
- no private keys in model context
- short-lived scoped tokens where supported
- rotate on suspicious behavior

## Scanner sandbox

Third-party scanner code should run with:

- no default network except declared connectors
- no access to user secrets
- CPU/time/memory quotas
- deterministic version hash
- declared data sources
- outbound domain allowlist
- output schema validation

## Outcome verification

A creator cannot self-certify profitability. Verified outcomes come from connected channel/order/payment records or independently supplied evidence reviewed by the verification pipeline.

## Economic safety

- clearly separate simulated from live results
- show losses and unresolved outcomes
- never annualize tiny-duration ROI without strong warnings
- show absolute profit beside percentages
- use capital-at-risk, not only purchase price, where obligations exist
- include scanner fees in net results
- reverse awards after refunds/chargebacks where rules require finality
