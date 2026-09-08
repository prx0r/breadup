"""Rebuild data/farfetch-exemplars.json from data/farfetch-macao.parquet."""
import json
from collections import defaultdict
from pathlib import Path

import pyarrow.parquet as pq

SRC = Path(__file__).parent.parent / "data" / "farfetch-macao.parquet"
DST = Path(__file__).parent.parent / "data" / "farfetch-exemplars.json"


def main() -> None:
    t = pq.read_table(SRC, columns=["brand", "category1_code", "title", "price_eur", "imageurl"]).to_pylist()
    groups: dict = defaultdict(list)
    for r in t:
        if r["price_eur"] and r["price_eur"] > 0:
            groups[(r["brand"] or "UNKNOWN", r["category1_code"] or "MISC")].append(r)
    index = {}
    for (brand, cat), rows in groups.items():
        if len(rows) < 20:
            continue
        prices = sorted(r["price_eur"] for r in rows)
        n = len(prices)
        samples = [{"title": r["title"][:80], "image": r["imageurl"], "price_eur": r["price_eur"]}
                   for r in rows[:20] if r["imageurl"]]
        index[f"{brand}||{cat}"] = {
            "brand": brand, "category": cat, "n": n,
            "p25": round(prices[n // 4], 2), "p50": round(prices[n // 2], 2),
            "p75": round(prices[3 * n // 4], 2), "samples": samples,
        }
    DST.write_text(json.dumps(index))
    print(f"groups: {len(index)} -> {DST} ({DST.stat().st_size // 1_000_000}MB)")


if __name__ == "__main__":
    main()
