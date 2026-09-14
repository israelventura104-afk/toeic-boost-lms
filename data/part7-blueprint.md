# Part 7 class bank blueprint

**Goal:** ~**100** original Reading Comprehension questions for guided practice and mocks (`data/part7-bank.json`), delivered in lotes of ~**20 Q**.  
**Intro (free):** 1 single-passage set × **3** questions in `data/part7-intro.json` — separate, not counted toward the 100.  
**Rubric:** `data/part7-validation-rubric.md` — average ≥ 4.0 and no dimension &lt; 3.

## Official shape (ETS handbook — design target)

- Full section: **54 questions**
  - **Single passages:** 29 Q · ~10 texts · **2–4** questions each
  - **Multiple passages:** 25 Q · **5 sets** of double or triple · **5** questions each
- Text types: email, letter, memo, notice, ad, article, form/schedule, chat/text chain, invoice/order, etc.
- Question types: detail, main idea/purpose, inference, vocabulary-in-context, NOT/except, cross-reference (multi only)
- 4 options A–D
- Timing context: ~55 min for Part 7 in a real exam; Phase 1 free/guided have **no timer**

## Target mix (~100 class questions)

| Set type | Role | Notes |
|----------|------|-------|
| single | Majority of lotes | 2–4 Q each; rotate genres |
| double | Regular in most lotes | Exactly 5 Q; ≥1 cross_reference |
| triple | Occasional later lotes | Exactly 5 Q; ≥1–2 cross_reference |

Question-type balance over ~100 Q (approximate):

| questionType | Target (~) |
|--------------|----------:|
| detail | 30–35 |
| main_idea | 12–16 |
| inference | 18–22 |
| vocabulary | 12–16 |
| not_except | 8–12 |
| cross_reference | 10–14 |
| **Total** | **~100** |

Genre rotation: email · ad · article · memo · notice · letter · form · chat · invoice/order across lotes.

## Progress

| Milestone | Class bank IDs | Sets | Questions | Status |
|-----------|----------------|-----:|----------:|--------|
| **Lote 1** | TQB-P7-0001 … 0004 | 4 (3 single + 1 double) | **16** | **Done — 16 / 100** |
| **Lote 2** | TQB-P7-0005 … 0008 | 4 (3 single + 1 double) | **+17** | **Done — 33 / 100** |
| **Lote 3** | TQB-P7-0009 … 0012 | 4 (3 single + 1 double) | **+17** | **Done — 50 / 100** |
| Lote 4 | TQB-P7-0013 … | +~20 Q | +~20 | Planned |
| … | … | … | … | … |
| **Target** | … | mix singles + doubles/triples | **~100** | In progress |

**After Lote 3:** **50 / 100** class questions (50%). With free intro: **53** Part 7 questions on site (1 intro set + 12 class sets).

### Lote 1 snapshot

| Set | setType | Genre(s) | Topic | Q count | questionTypes |
|-----|---------|----------|-------|--------:|---------------|
| TQB-P7-0001 | single | email | Operations / delayed shipment apology | 4 | main_idea, detail, vocabulary, inference |
| TQB-P7-0002 | single | ad | Marketing / coworking space promo | 3 | main_idea, detail, not_except |
| TQB-P7-0003 | single | article | HR / workplace wellness program | 4 | detail, inference, vocabulary, main_idea |
| TQB-P7-0004 | double | chat + notice | Facilities / conference room booking | 5 | detail, detail, inference, cross_reference, not_except |

questionType counts (lote 1): detail 5 · main_idea 3 · inference 3 · vocabulary 2 · not_except 2 · cross_reference 1.  
setType counts: single 3 · double 1.  
Genre variety: email · ad · article · chat · notice.

### Lote 2 snapshot

| Set | setType | Genre(s) | Topic | Q count | questionTypes |
|-----|---------|----------|-------|--------:|---------------|
| TQB-P7-0005 | single | memo | Facilities / cafeteria renovation closure | 4 | main_idea, detail, vocabulary, inference |
| TQB-P7-0006 | single | letter | Purchasing / label-defect quality apology | 4 | detail, inference, vocabulary, main_idea |
| TQB-P7-0007 | single | form | HR / tuition assistance request | 4 | detail, not_except, inference, vocabulary |
| TQB-P7-0008 | double | email + notice | Sales / trade-show booth setup & parking | 5 | detail, detail, inference, cross_reference, not_except |

questionType counts (lote 2): detail 5 · main_idea 2 · inference 4 · vocabulary 3 · not_except 2 · cross_reference 1.  
setType counts: single 3 · double 1.  
Genre variety (new): memo · letter · form · email · notice.

**Bank totals after Lote 2:** 8 sets · 33 Q · single 6 · double 2.  
questionType totals: detail 10 · main_idea 5 · inference 7 · vocabulary 5 · not_except 4 · cross_reference 2.  
Genres: email · ad · article · chat · notice · memo · letter · form.


### Lote 3 snapshot

| Set | setType | Genre(s) | Topic | Q count | questionTypes |
|-----|---------|----------|-------|--------:|---------------|
| TQB-P7-0009 | single | article | HR / hot-desking pilot results | 4 | detail, inference, vocabulary, main_idea |
| TQB-P7-0010 | single | ad | Marketing / fleet maintenance promo | 4 | main_idea, detail, vocabulary, not_except |
| TQB-P7-0011 | single | invoice | Purchasing / warehouse shelving invoice | 4 | detail, inference, not_except, vocabulary |
| TQB-P7-0012 | double | chat + notice | HR / bike-to-work stipend & rack closure | 5 | detail, detail, inference, cross_reference, not_except |

questionType counts (lote 3): detail 5 · main_idea 2 · inference 3 · vocabulary 3 · not_except 3 · cross_reference 1.  
setType counts: single 3 · double 1.  
Genre variety (new): article · ad · **invoice** · chat · notice.

**Bank totals after Lote 3:** 12 sets · 50 Q · single 9 · double 3.  
questionType totals: detail 15 · main_idea 7 · inference 10 · vocabulary 8 · not_except 7 · cross_reference 3.  
Genres: email · ad · article · chat · notice · memo · letter · form · invoice.

## Batch rules

- Prefer ~**16–20** new original questions per lote; workplace English; schema with `passages[]` + `questions[]`.
- Difficulty mostly 2–3, about 1 set or ~4 items at difficulty 4 per lote.
- No near-duplicate passages vs intro or existing bank; no ETS/copyrighted content.
- Self-score every question on the five rubric dimensions; rewrite until the set passes.
- Append to `part7-bank.json`, bump `set_count` / `question_count` / `item_count`, log under `batches` in `part7-bank-validation.json`, refresh this blueprint and README counts.
- Do not alter `part7-intro.json` or degrade validated sets.
- Schema must keep supporting **single + double + triple** for later growth (Phase 1 ships free intro + class bank through Lote 3 so far).
