# BreadUp data

Derived artifacts live here. Raw sources are fetched, never committed.

## Fetch

```bash
# Farfetch Macao PLP (588k rows, ~80MB) — public HF parquet, no key
curl -L -o data/farfetch-macao.parquet \
  https://huggingface.co/datasets/DBQ/Farfetch.Product.prices.Macao/resolve/main/data/train-00000-of-00001-e43844630b47de3b.parquet
```

## Build exemplars

```bash
python3 scripts/build_exemplars.py   # farfetch-macao.parquet -> farfetch-exemplars.json
```

## Files

- `farfetch-macao.parquet` (gitignored, 80MB): title + EUR price + imageurl, 588k rows
- `farfetch-exemplars.json` (committed, ~10MB): per brand×category p25/p50/p75 + 20 sample images
