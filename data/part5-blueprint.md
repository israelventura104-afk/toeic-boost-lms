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
| **Lote 5** | TQB-P5-0131 … 0150 | +20 | **Done — 140 / 200** |
| Lote 6 | TQB-P5-0151 … 0170 | +20 | Planned |
| … | … | … | … |
| Target | … → ~TQB-P5-0210 | ~200 | — |

**After Lote 5:** **140 / 200** class items (70%). With free intro: **150** Part 5 items on site.

### Skill counts after Lote 5 (class bank only)

| Skill | Count | Gap to ~17 |
|-------|------:|----------:|
| Word Forms | 12 | ~5 |
| Verb Tenses | 12 | ~5 |
| Prepositions | 12 | ~5 |
| Conjunctions/Transitions | 11 | ~6 |
| Pronouns | 11 | ~6 |
| Subject-Verb Agreement | 12 | ~5 |
| Conditionals | 11 | ~6 |
| Passive Voice | 11 | ~6 |
| Comparatives/Superlatives | 13 | ~4 |
| Gerunds/Infinitives | 11 | ~6 |
| Articles/Determiners | 13 | ~4 |
| Modals | 11 | ~6 |

Lote 5 lifted bank120 lows: **Comparatives/Superlatives** and **Articles/Determiners** from **9→13**. Other skills now sit at 11–12. Lowest for Lote 6 priority: **Conjunctions/Transitions, Pronouns, Conditionals, Passive Voice, Gerunds/Infinitives, Modals** (all at 11).

## Batch rules

- Exactly 20 new original items per lote; workplace English; one blank; A–D; `correctKey` ↔ `correctAnswer`.
- Difficulty mostly 2–3, about 4 items at difficulty 4 per lote.
- No near-duplicate stems vs intro or existing bank; no ETS/copyrighted content.
- Self-score every item on the five rubric dimensions; rewrite until all 20 pass.
- Append to `part5-bank.json`, bump `item_count`, log the lote under `batches` in `part5-bank-validation.json`, refresh this blueprint and README counts.
- Do not alter `part5-intro.json` or degrade validated seed items.
