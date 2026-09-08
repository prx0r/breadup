/**
 * BreadUp adapter over secondhand-mcp marketplaces.
 *
 * secondhand-mcp owns transport (FB web mechanisms, eBay official API,
 * Depop/Poshmark browser). BreadUp owns the canonical schema: every
 * result becomes a ListingObservation with an explicit active_ask —
 * never a collapsed market price. Marketplaces that cannot run here
 * (no eBay creds, no Chrome) degrade to empty results, never throws.
 */
import type {
  ListingObservation,
  MarketplaceAdapter,
  SearchSpec,
} from '@breadup/domain/listing.js';

type ShmListing = {
  id: string;
  title: string;
  price: string;
  priceNumeric?: number;
  currency?: string;
  location?: string;
  description?: string;
  url: string;
  images?: string[];
  seller?: string;
  condition?: string;
  marketplace: string;
};

type ShmMarketplace = {
  name: string;
  search(params: Record<string, unknown>): Promise<{
    success: boolean;
    listings: ShmListing[];
    error?: string;
  }>;
};

async function loadMarketplaces(): Promise<ShmMarketplace[]> {
  const mod = (await import('secondhand-mcp')) as unknown as {
    getAllMarketplaces?: () => ShmMarketplace[];
  };
  if (typeof mod.getAllMarketplaces !== 'function') return [];
  try {
    return mod.getAllMarketplaces();
  } catch {
    return [];
  }
}

export function toObservation(l: ShmListing, marketplace: string): ListingObservation {
  const now = new Date().toISOString();
  return {
    id: `${marketplace}:${l.id}`,
    marketplace,
    title: l.title,
    url: l.url,
    images: (l.images ?? []).map((url) => ({ url })),
    location: l.location,
    seller: l.seller,
    condition: l.condition,
    description: l.description,
    observedAt: now,
    asks:
      typeof l.priceNumeric === 'number'
        ? [
            {
              kind: 'active_ask',
              amount: l.priceNumeric,
              currency: l.currency ?? 'USD',
              observedAt: now,
              source: marketplace,
            },
          ]
        : [],
  };
}

export class SecondhandAdapter implements MarketplaceAdapter {
  readonly name = 'secondhand';
  private markets: ShmMarketplace[] | null = null;

  private async marketsReady(): Promise<ShmMarketplace[]> {
    if (!this.markets) this.markets = await loadMarketplaces();
    return this.markets;
  }

  async search(spec: SearchSpec): Promise<ListingObservation[]> {
    const markets = await this.marketsReady();
    const out: ListingObservation[] = [];
    const limit = spec.limit ?? 20;
    for (const m of markets) {
      let res;
      try {
        res = await m.search({
          query: spec.query,
          location: spec.location,
          maxPrice: spec.maxPrice,
          minPrice: spec.minPrice,
          limit,
        });
      } catch {
        continue;
      }
      if (!res?.success) continue;
      for (const l of res.listings.slice(0, limit)) {
        out.push(toObservation(l, m.name));
      }
      if (out.length >= limit) break;
    }
    return out.slice(0, limit);
  }
}
