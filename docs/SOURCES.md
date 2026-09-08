# Sources checked 2026-09-08

This pack uses the following current platform/protocol facts as implementation references. Re-check versions at build time.

## x402

- x402 home / protocol overview: https://x402.org/
- x402 V2 launch: https://x402.org/x402-v2-launch/
- x402 batch settlement: https://x402.org/x402-batch-settlement/

Key architecture implications used here:

- HTTP 402-native pay-per-use APIs
- V2 payment headers and modular transport/payment design
- dynamic `payTo` routing appropriate for marketplaces
- discovery extension
- reusable access/session direction
- batch settlement for high-frequency microtransactions

## Shopify

- Agentic commerce: https://shopify.dev/docs/agents
- Storefront MCP: https://shopify.dev/docs/apps/build/storefront-mcp
- Storefront MCP server: https://shopify.dev/docs/apps/build/storefront-mcp/servers/storefront
- Agent profiles / UCP negotiation: https://shopify.dev/docs/agents/profiles
- Shopify UCP 2026-08-25 support changelog: https://shopify.dev/changelog/08-25-is-now-supported
- GraphQL Admin API: https://shopify.dev/docs/api/admin-graphql/latest
- Webhooks: https://shopify.dev/docs/api/webhooks/latest
- `agents.md.liquid`: https://shopify.dev/docs/storefronts/themes/architecture/templates/agents-md-liquid

Key implications:

- use GraphQL Admin API for new public-app merchant operations
- use webhooks for production event propagation
- Shopify storefronts expose agentic/UCP discovery and MCP capabilities
- `agents.md` can surface commerce endpoints and machine-readable store guidance

## OpenAI commerce

- Product discovery / Agentic Commerce Protocol: https://openai.com/index/powering-product-discovery-in-chatgpt/
- Merchant Feed Terms: https://openai.com/policies/merchant-feed-terms-of-service/

The implementation should consume current provider feed specifications rather than hardcoding a frozen 2026 schema into BreadUp core data models.

## MCP

- 2026-07-28 MCP specification announcement: https://blog.modelcontextprotocol.io/posts/2026-07-28/

Keep BreadUp's internal domain model protocol-agnostic. MCP is an interface/binding, not the source of truth for businesses, scanners, opportunities, or accounting.
