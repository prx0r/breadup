/**
 * Canonical BreadUp domain: listings, items, price evidence.
 *
 * Core invariant: never collapse distinct price observations into a
 * single `market_price`. An active ask, an observed disappearance, a
 * confirmed sale and a user-realized sale are different evidence with
 * different confidence. See vision §7.
 */

/** Where a price observation came from. Ordered by reliability. */
export type PriceEvidenceKind =
  | 'active_ask'
  | 'observed_ask'
  | 'sold_evidence'
  | 'user_realized'
  | 'dealer_offer';

export interface PriceEvidence {
  kind: PriceEvidenceKind;
  amount: number;
  currency: string;
  observedAt: string;
  source: string;
}

export interface ListingImage {
  url: string;
  width?: number;
  height?: number;
}

/** A messy marketplace listing, normalized. Titles are untrusted. */
export interface ListingObservation {
  id: string;
  marketplace: string;
  title: string;
  url: string;
  images: ListingImage[];
  location?: string;
  seller?: string;
  condition?: string;
  description?: string;
  observedAt: string;
  asks: PriceEvidence[];
}

/** Fingerprints for dedup and same-item detection across markets. */
export interface VisualFingerprint {
  listingId: string;
  phash?: string[];
  segments?: Array<{
    concept: string;
    cropUri: string;
    confidence: number;
  }>;
}

export interface SearchSpec {
  query: string;
  location?: string;
  maxPrice?: number;
  minPrice?: number;
  radiusKm?: number;
  condition?: string;
  limit?: number;
}

export interface MarketplaceAdapter {
  readonly name: string;
  search(spec: SearchSpec): Promise<ListingObservation[]>;
  fetch?(id: string): Promise<ListingObservation | null>;
}

export function activeAsk(l: ListingObservation): PriceEvidence | null {
  return l.asks.find((a) => a.kind === 'active_ask') ?? null;
}
