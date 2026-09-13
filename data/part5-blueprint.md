# Part 5 class bank blueprint

**Goal:** ~200 original Incomplete Sentences items for guided practice and mocks (`data/part5-bank.json`).  
**Intro (free):** 10 items in `data/part5-intro.json` — separate, not counted toward the 200.  
**Rubric:** `data/part5-validation-rubric.md` — average ≥ 4.0 and no dimension &lt; 3.

## Target mix (~200 class items)

| Skill | Target (~) | Notes |
|-------|----------:|-------|
| Word Forms | 16–17 | Affix / part-of-speech slots |
| Verb Tenses | 16–17 | Incl. perfect & continuous |
| Prepositions | 16–17 | Verb/adj + prep; time/place |
| Conjunctions/Transitions | 16–17 | Incl. *unless* as connector (not Conditional) |
| Pronouns | 16–17 | Relative, possessive, reflexive |
| Subject-Verb Agreement | 16–17 | Each / neither / either / along with |
| Conditionals | 16–17 | 0 / 1 / 2 / 3 patterns |
| Passive Voice | 16–17 | Simple, perfect, progressive, future |
| Comparatives/Superlatives | 16–17 | *as…as*, fewer/less, -est / most |
| Gerunds/Infinitives | 16–17 | Verb patterns, *used to* / *look forward to* |
| Articles/Determiners | 16–17 | a/an/the, little/few, each/another |
| Modals | 16–17 | Obligation, advice, *had better*, perfect modals |
| **Total** | **~200** | Batches of 20 |

Rough per-skill band: **16–17** (12 × 16 = 192; remainder distributed).

## Progress

| Milestone | Class bank IDs | Count | Status |
|-----------|----------------|------:|--------|
| Validated seed | TQB-P5-0011 … 0050 | 40 | Done |
| Lote 1 | TQB-P5-0051 … 0070 | +20 | Done — 60 / 200 |
| Lote 2 | TQB-P5-0071 … 0090 | +20 | Done — 80 / 200 |
| Lote 3 | TQB-P5-0091 … 0110 | +20 | Done — 100 / 200 |
| Lote 4 | TQB-P5-0111 … 0130 | +20 | Done — 120 / 200 |
| Lote 5 | TQB-P5-0131 … 0150 | +20 | Done — 140 / 200 |
| Lote 6 | TQB-P5-0151 … 0170 | +20 | Done — 160 / 200 |
| **Lote 7** | TQB-P5-0171 … 0190 | +20 | **Done — 180 / 200** |
| Lote 8 (final) | TQB-P5-0191 … 0210 | +20 | Pending — 200 / 200 |
| Target | … → ~TQB-P5-0210 | ~200 | — |

**After Lote 7:** **180 / 200** class items (90%). With free intro: **190** Part 5 items on site.

### Skill counts after Lote 7 (class bank only)

| Skill | Count | Gap to ~17 |
|-------|------:|----------:|
| Word Forms | 16 | ~1 |
| Verb Tenses | 16 | ~1 |
| Prepositions | 16 | ~1 |
| Conjunctions/Transitions | 14 | ~3 |
| Pronouns | 14 | ~3 |
| Subject-Verb Agreement | 16 | ~1 |
| Conditionals | 14 | ~3 |
| Passive Voice | 14 | ~3 |
| Comparatives/Superlatives | 16 | ~1 |
| Gerunds/Infinitives | 14 | ~3 |
| Articles/Determiners | 16 | ~1 |
| Modals | 14 | ~3 |

Lote 7 lifted bank160 lows: **Word Forms** and **Verb Tenses** 12→16 (4 each); **Prepositions, Subject-Verb Agreement, Comparatives/Superlatives, Articles/Determiners** 13→16 (3 each). Lowest for Lote 8 (final to 200): the six skills still at **14** — **Conjunctions/Transitions, Pronouns, Conditionals, Passive Voice, Gerunds/Infinitives, Modals** (~3 each = 18; trim/redistribute +2 across the six skills already at 16 to hit ~17 band / 200 total).

## Batch rules

- Exactly 20 new original items per lote; workplace English; one blank; A–D; `correctKey` ↔ `correctAnswer`.
- Difficulty mostly 2–3, about 4 items at difficulty 4 per lote.
- No near-duplicate stems vs intro or existing bank; no ETS/copyrighted content.
- Self-score every item on the five rubric dimensions; rewrite until all 20 pass.
- Append to `part5-bank.json`, bump `item_count`, log the lote under `batches` in `part5-bank-validation.json`, refresh this blueprint and README counts.
- Do not alter `part5-intro.json` or degrade validated seed items.
