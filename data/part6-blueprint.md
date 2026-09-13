# Part 6 class bank blueprint

**Goal:** ~**80** original Text Completion questions for guided practice and mocks (`data/part6-bank.json`) = **20 passages × 4 blanks**.  
**Intro (free):** 1 passage × 4 questions in `data/part6-intro.json` — separate, not counted toward the 80.  
**Rubric:** `data/part6-validation-rubric.md` — average ≥ 4.0 and no dimension &lt; 3.

## Official shape

- Full section mock later: **16 questions** = typically **4 texts × 4 blanks**
- Genres: email, letter, memo, notice, ad, article
- Blank types: word/phrase (grammar–vocab), discourse connector, **sentence insertion**
- 4 options A–D per question

## Target mix (~80 class questions / 20 passages)

| Blank type | Target (~) | Notes |
|------------|----------:|-------|
| word_form | 18–22 | Affix / POS slots inside the passage |
| vocabulary | 18–22 | Workplace sense in context |
| connector | 18–22 | Discourse relations across sentences |
| sentence_insertion | 18–22 | Full-sentence options A–D |
| **Total** | **~80** | Lotes of ~16–20 Q (usually 4 passages × 4) |

Genre rotation across 20 passages: aim for a spread of email / letter / memo / notice / ad / article (roughly 3–4 each).

## Progress

| Milestone | Class bank IDs | Passages | Questions | Status |
|-----------|----------------|---------:|----------:|--------|
| **Lote 1** | TQB-P6-0001 … 0004 | 4 | 16 | **Done — 16 / 80** |
| **Lote 2** | TQB-P6-0005 … 0008 | +4 | +16 | **Done — 32 / 80** |
| **Lote 3** | TQB-P6-0009 … 0012 | +4 | +16 | **Done — 48 / 80** |
| Lote 4 | TQB-P6-0013 … 0016 | +4 | +16 | Planned — 64 / 80 |
| Lote 5 (final) | TQB-P6-0017 … 0020 | +4 | +16 | Planned — **80 / 80** |
| Target | … → TQB-P6-0020 | **20** | **80** | In progress |

**After Lote 3:** **48 / 80** class questions (60%). With free intro: **52** Part 6 questions on site (1 intro passage + 12 class passages).

### Lote 1 snapshot

| Passage | Genre | Topic | Blank types |
|---------|-------|-------|-------------|
| TQB-P6-0001 | email | Sales / client follow-up | word_form, vocabulary, connector, sentence_insertion |
| TQB-P6-0002 | memo | Facilities / parking | vocabulary, connector, word_form, sentence_insertion |
| TQB-P6-0003 | notice | IT / system maintenance | connector, word_form, vocabulary, sentence_insertion |
| TQB-P6-0004 | letter | HR / internship offer | word_form, connector, vocabulary, sentence_insertion |

Blank-type counts (lote 1): word_form 4 · vocabulary 4 · connector 4 · sentence_insertion 4.

### Lote 2 snapshot

| Passage | Genre | Topic | Blank types |
|---------|-------|-------|-------------|
| TQB-P6-0005 | ad | Marketing / ErgoLift standing desk promo | word_form, connector, vocabulary, sentence_insertion |
| TQB-P6-0006 | article | Sustainability / packaging waste reduction | vocabulary, connector, word_form, sentence_insertion |
| TQB-P6-0007 | email | Customer Service / delayed shipment | connector, vocabulary, word_form, sentence_insertion |
| TQB-P6-0008 | memo | Finance / travel expense policy | vocabulary, connector, word_form, sentence_insertion |

Blank-type counts (lote 2): word_form 4 · vocabulary 4 · connector 4 · sentence_insertion 4.  
Bank totals after Lote 2: word_form 8 · vocabulary 8 · connector 8 · sentence_insertion 8.


### Lote 3 snapshot

| Passage | Genre | Topic | Blank types |
|---------|-------|-------|-------------|
| TQB-P6-0009 | notice | Quality / AquaPure pitcher-filter recall | word_form, connector, vocabulary, sentence_insertion |
| TQB-P6-0010 | letter | Purchasing / vendor paper-supply contract | vocabulary, connector, word_form, sentence_insertion |
| TQB-P6-0011 | ad | Hospitality / Harborview Suites conference packages | word_form, connector, vocabulary, sentence_insertion |
| TQB-P6-0012 | email | HR / open enrollment for health benefits | connector, vocabulary, word_form, sentence_insertion |

Blank-type counts (lote 3): word_form 4 · vocabulary 4 · connector 4 · sentence_insertion 4.  
Bank totals after Lote 3: word_form 12 · vocabulary 12 · connector 12 · sentence_insertion 12.

## Batch rules

- Prefer **4 new original passages** per lote (16 Q); workplace English; markers `[[nnn]]` match `blankLabel`.
- Difficulty mostly 2–3, about 1 passage or ~4 items at difficulty 4 per lote.
- No near-duplicate passages vs intro or existing bank; no ETS/copyrighted content.
- Self-score every question on the five rubric dimensions; rewrite until the passage set passes.
- Append to `part6-bank.json`, bump `passage_count` / `question_count` / `item_count`, log under `batches` in `part6-bank-validation.json`, refresh this blueprint and README counts.
- Do not alter `part6-intro.json` or degrade validated passages.
