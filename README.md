# TOEIC Boost (Paso 3+ — Part 5 + Part 6 + Part 7 Phase 1)

Static site for **TOEIC Boost** by Teacher Israel Ventura — sibling product to TOEFL ITP Boost.

**Paso 1:** Landing page (marketing).  
**Paso 2:** Class-code access, student dashboard, free Reading & Grammar short demo (Part 5–7 style).  
**Paso 3:** Original Part 5 Incomplete Sentences bank (210 items = 10 intro + 200 class-validated), free/guided/mock flows, Reading hub, and Part 5 Strategies.
**Paso 3b (Part 6):** Original Part 6 Text Completion — free intro (1 passage × 4 blanks), class bank **COMPLETE** Lotes 1–5 (20 passages × 4 = **80** validated Q), free practice UI, **guided practice live** (2 passages / 8 Q), **timed mock live** (4 passages / 16 Q · 12 min); **Part 6 strategies live** on `strategies.html#part6`.
**Paso 3c (Part 7 Phase 1):** Original Part 7 Reading Comprehension — free intro (1 single × 3 Q), class bank **COMPLETE** Lotes 1–5 (17 singles + 5 doubles + 2 triples = **100** validated Q), free practice UI live; **guided practice live** (2 sets · prefer single + multi); mock/strategies not built yet.

## Preview locally

```bash
cd /workspace/toeic-boost
python3 -m http.server 8765
```

Open <http://localhost:8765/>.

> Fetching `data/*.json` needs a local server (or GitHub Pages). Opening HTML as `file://` will not load practice items.

## Class access

1. Open **Progress** (`dashboard.html`) → **Class materials** (`#class-access`).
2. Enter the class code from your teacher.
3. Access is stored in `localStorage` under `toeic-boost.teacherAccess.v1` on this device only.
4. Wrong codes show a clear error. Use **Remove access on this device** to lock again.

**Current demo class code:** `TOEIC-VENTURA-2026`  
(Configured in `data/access.json` — rotate anytime; never put personal passwords there.)

## How to preview free vs guided

| Path | Needs code? | What you get |
|------|-------------|--------------|
| `reading.html` | No | Reading hub: Part 5 + 6 free / guided / mock live; Part 7 free + guided live, mock coming next |
| `part7-practice.html` | **No** | Fixed 1-passage Part 7 intro (`TQB-P7-INTRO-001`, Q01–Q03), immediate feedback |
| `part7-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 2 random sets from the 24-set class bank · prefer 1 single + 1 multi · no timer · session saved |
| `part6-practice.html` | **No** | Fixed 1-passage Part 6 intro (`TQB-P6-INTRO-001`, Q01–Q04), immediate feedback |
| `part6-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 2 random passages (8 blanks) from the 20-passage class bank · no timer · session saved |
| `part6-mock.html` | **Yes** `TOEIC-VENTURA-2026` | Timed mock: **4 passages · 16 blanks · 12 minutes**, no feedback until end, auto-submit at 0 |
| `strategies.html` | **No** | Free Part 5 + Part 6 study library · `#part5` / `#part6` anchors |
| `part5-practice.html` | **No** | Fixed 10-item intro (`TQB-P5-0001`–`0010`), immediate feedback, restart |
| `part5-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 15 items from the 200-item class bank, balanced by skill, session saved |
| `part5-mock.html` | **Yes** `TOEIC-VENTURA-2026` | Timed mock: **30 questions · 20 minutes**, no feedback until end, skill-balanced set, auto-submit at 0 |
| `demo-test.html` | No | Short Part 5–7 snapshot (unchanged from Paso 2) |

Guided practice and the mock show an inline class-code gate if the device is locked. The 10 free intro items are never reused in guided or mock sets.

### Part 5 mock details

- Timer: **20:00** (1200 seconds); early submit allowed; auto-submit when time hits 0.
- Set: 30 unique items from `data/part5-bank.json`, skill-balanced round-robin across the 12 skills, question order shuffled each session; option keys **A–D kept as authored**.
- During the exam: no skill titles / grammar meta on questions.
- After submit: score X/30, percent, study focus by skill, Review mistakes panel (same style as guided).
- Progress: `ToeicProgress.recordPart5Session({ mode: "mock", durationSeconds, timedOut, ... })`.

### Part 6 guided details

- Session: **2 random passages** from `data/part6-bank.json` = **8 questions** (each passage’s 4 blanks stay in order; passage pair reshuffles on “New practice”).
- No timer; immediate feedback after each answer; grammar-point / blankType titles stay hidden.
- Passage panel switches when you move from Q4 → Q5 (second passage).
- End screen: score + Review mistakes (yours / correct / why), same pattern as Part 5 guided / Part 6 free.
- Progress: `ToeicProgress.recordPart6Session({ mode: "guided", passageIds, ... })`.

### Part 6 mock details

- Timer: **12:00** (720 seconds); early submit allowed; auto-submit when time hits 0.
- Set: **4 random passages** from `data/part6-bank.json` = **16 questions**; each passage’s 4 blanks stay in authored blank order; which four passages you get is shuffled each session (exact set avoided when possible).
- During the exam: no blankType / grammar titles; passage text updates with active blank highlight when you change questions/passages.
- After submit: score X/16, percent, study focus by skill, Review mistakes panel.
- Progress: `ToeicProgress.recordPart6Session({ mode: "mock", durationSeconds, timedOut, passageIds, ... })`.

### Part 7 guided details

- Session: **2 random sets** from `data/part7-bank.json` — prefer **1 single + 1 multi** (double or triple); fall back to 2 singles when needed. Typical session ≈ **8–9 questions** (e.g. 4+5 or 3+5); 2 singles ≈ **6–8**.
- Each set’s questions stay in authored order; all passages for the active set render (single / double / triple layout). Flat navigation Q1…Qn switches displayed passages when you enter the second set.
- No timer; immediate feedback; skill / questionType titles stay hidden.
- End screen: score + Review mistakes (yours / correct / why). Exact set-ID pair avoided when possible (like Part 6).
- Progress: `ToeicProgress.recordPart7Session({ mode: "guided", setIds, ... })`.

## Part 5 item bank (original workplace English)

All 210 items are invented for this course and the class bank is **rubric-validated**. They are **not** copied from ETS, official TOEIC, or the TOEFL ITP bank.

- Intro (free, fixed, `shuffle: false`, `reuse_in_mocks: false`): `data/part5-intro.json` — 10 items, IDs `TQB-P5-0001` … `TQB-P5-0010`
- Bank (guided + later mocks, class-validated, `exclude_from_free_intro: true`): `data/part5-bank.json` — **200** items, IDs `TQB-P5-0011` … `TQB-P5-0210` (**COMPLETE**)
- Validation: `data/part5-validation-rubric.md` + `data/part5-bank-validation.json`

Skill balance (210 total = 10 intro + 200 validated bank; blueprint **200/200 COMPLETE**):

| Skill | Intro | Bank (validated) | Total |
|-------|------:|-----------------:|------:|
| Word Forms | 1 | 17 | 18 |
| Verb Tenses | 1 | 17 | 18 |
| Prepositions | 1 | 16 | 17 |
| Conjunctions/Transitions | 1 | 17 | 18 |
| Pronouns | 1 | 17 | 18 |
| Subject-Verb Agreement | 1 | 16 | 17 |
| Conditionals | 1 | 17 | 18 |
| Passive Voice | 1 | 17 | 18 |
| Comparatives/Superlatives | 1 | 16 | 17 |
| Gerunds/Infinitives | 1 | 17 | 18 |
| Articles/Determiners | 0 | 16 | 16 |
| Modals | 0 | 17 | 17 |

Each item: one blank, four options (A–D), one `correctKey` that matches `correctAnswer` text, plus explanation and common-mistake note.


## Part 6 item bank (original workplace English)

Part 6 = **Text Completion**: short workplace texts with **4 blanks** each (word/phrase, connector, **sentence insertion**). Class bank: **80 questions COMPLETE** (20 passages × 4).

- Intro (free, fixed, `purpose: free_intro_fixed`): `data/part6-intro.json` — **1** passage × **4** Q, IDs `TQB-P6-INTRO-001` + `Q01`–`Q04`
- Bank (guided + mocks, class-validated): `data/part6-bank.json` — **Lotes 1–5 COMPLETE:** 20 passages × 4 = **80** Q, IDs `TQB-P6-0001` … `0020` (**80 / 80**)
- Validation: `data/part6-validation-rubric.md` + `data/part6-bank-validation.json`
- Blueprint: `data/part6-blueprint.md`

Genres: **email** 3 · **memo** 4 · **notice** 3 · **letter** 4 · **ad** 3 · **article** 3. Blank types (80): word_form 20 · vocabulary 20 · connector 20 · sentence_insertion 20.

Lote 2 added: ad (office products), article (sustainability), email (Customer Service), memo (Finance/policy).

Lote 3 added: notice (product recall), letter (vendor/purchasing), ad (conference hotel), email (benefits enrollment).

Lote 4 added: article (hybrid remote work), memo (warehouse safety), notice (charity food drive), letter (client portal-outage apology).

Lote 5 (final) added: ad (AeroBlend Pro product launch), article (cybersecurity tips), memo (third-floor renovation), letter (supplier payment confirmation). **Bank complete 80/80.**

Blank markers in passage text use `[[131]]` style for UI highlight.


## Part 7 item bank (original workplace English)

Part 7 = **Reading Comprehension**: single, double, and (later) triple workplace texts. Official full section = **54** Q (29 single + 25 multi). Phase 1 class target: ~**100** Q via lotes.

- Intro (free, fixed, `purpose: free_intro_fixed`): `data/part7-intro.json` — **1** single email × **3** Q, ID `TQB-P7-INTRO-001` + `Q01`–`Q03`
- Bank (guided + mocks later, class-validated): `data/part7-bank.json` — **Lotes 1–5 COMPLETE:** 17 singles + 5 doubles + 2 triples = **100** Q, IDs `TQB-P7-0001` … `0024` (**100 / 100**)
- Validation: `data/part7-validation-rubric.md` + `data/part7-bank-validation.json`
- Blueprint: `data/part7-blueprint.md`

Lote 1 genres: **email** · **ad** · **article** · **chat + notice** (double).

Lote 2 added: **memo** (cafeteria renovation), **letter** (quality/label defect), **form** (tuition assistance), **email + notice** (trade-show booth).

Lote 3 added: **article** (hot-desking pilot), **ad** (fleet maintenance), **invoice** (warehouse shelving), **chat + notice** (bike-to-work stipend).

Lote 4 added: **email** (MFA enrollment), **memo** (Q3 expense cutoff), **letter** (warehouse audit kickoff), **email + notice + form** (first **triple** — safety orientation).

Lote 5 (final) added: **schedule** (visitor shuttle), **notice** (elevator outage), **chat** (product-launch timeline), **order** (supply confirmation), **article** (peer mentoring), **email + notice** (leadership webinar double), **chat + form** (travel request double), **notice + email + schedule** (second **triple** — town hall). **Bank complete 100/100.** questionTypes (full bank): detail 30 · main_idea 13 · inference 21 · vocabulary 14 · not_except 11 · cross_reference 11.

Schema: each set has `setType` (`single` | `double` | `triple`), `passages[]` (length 1/2/3), and `questions[]` with 4 options A–D.

**Not built yet (Phase 1):** Part 7 mock or strategy cards. Guided practice is live.

## Short demo (free, Paso 2)


- Path: `demo-test.html`
- Composition: **3× Part 5** · **2× Part 6** · **1× Part 7** memo with **3** questions (**8** total)
- Progress saved via `progress.js` (`toeic-boost.progress.v1`)

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Landing |
| `styles.css` | Landing + dashboard + demo + Part 5/6/7 / Reading hub + strategy library |
| `nav.js` | Landing toggle + shared app header |
| `access.js` / `data/access.json` | Teacher class-code unlock |
| `progress.js` | Demo + Part 5/6 guided/mock + Part 7 guided session storage |
| `dashboard.html` / `dashboard.js` | Progress dashboard + class access panel |
| `demo-test.html` / `demo-test.js` | Free Part 5–7 demo flow |
| `data/demo-test.json` / `data/demo-items.json` | Demo config + original items |
| `reading.html` | Reading hub (Part 5 + Part 6 free / guided / mock live; Part 7 free + guided live) |
| `part5-practice.html` / `part5-practice.js` | Free 10-item Part 5 set |
| `part5-guided-practice.html` / `part5-guided-practice.js` | Class 15-item Part 5 drill |
| `part5-mock.html` / `part5-mock.js` | Class timed Part 5 mock (30Q / 20 min) |
| `data/part5-intro.json` | Fixed free intro (10) |
| `data/part5-bank.json` | Guided + mock class bank (**200** validated — COMPLETE) |
| `data/part5-validation-rubric.md` | Teacher rubric (ES) for Part 5 class items |
| `data/part5-bank-validation.json` | Validation summary (kept/rewritten/dropped) + lote batches |
| `data/part5-blueprint.md` | 200-item skill targets — **COMPLETE** |
| `part6-practice.html` / `part6-practice.js` | Free 1-passage Part 6 intro |
| `part6-guided-practice.html` / `part6-guided-practice.js` | Class 2-passage / 8-blank Part 6 drill |
| `part6-mock.html` / `part6-mock.js` | Class timed Part 6 mock (16Q / 12 min · 4 passages) |
| `data/part6-intro.json` | Fixed free intro (1×4) |
| `data/part6-bank.json` | Guided + mock class bank (**80** validated — COMPLETE) |
| `part7-practice.html` / `part7-practice.js` | Free 1-passage Part 7 intro |
| `part7-guided-practice.html` / `part7-guided-practice.js` | Class 2-set Part 7 drill (prefer single + multi) |
| `data/part7-intro.json` | Fixed free intro (1 single × 3 Q) |
| `data/part7-bank.json` | Class bank Lotes 1–5 **COMPLETE** (**100** validated — 17 singles + 5 doubles + 2 triples) |
| `data/part7-validation-rubric.md` | Teacher rubric (ES) for Part 7 class items |
| `data/part7-bank-validation.json` | Lotes 1–5 validation summary (target reached) |
| `data/part7-blueprint.md` | 100-Q target via lotes — **COMPLETE** (100/100) |
| `strategies.html` | Free Part 5 + Part 6 strategies library (Part 7 strategies / Listening stubs) |
| `listening.html` | Coming-next stub |
| `assets/` | Logo / favicon / hero art |

## Trademark note

**TOEIC** is a registered trademark of ETS. This site uses the name in a **nominative** sense to describe preparation for the TOEIC Listening & Reading test. **TOEIC Boost is not affiliated with, endorsed by, or sponsored by ETS.**
