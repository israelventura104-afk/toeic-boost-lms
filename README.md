# TOEIC Boost (Paso 3+ — Part 5 + Part 6 Text Completion)

Static site for **TOEIC Boost** by Teacher Israel Ventura — sibling product to TOEFL ITP Boost.

**Paso 1:** Landing page (marketing).  
**Paso 2:** Class-code access, student dashboard, free Reading & Grammar short demo (Part 5–7 style).  
**Paso 3:** Original Part 5 Incomplete Sentences bank (210 items = 10 intro + 200 class-validated), free/guided/mock flows, Reading hub, and Part 5 Strategies.
**Paso 3b (Part 6 start):** Original Part 6 Text Completion — free intro (1 passage × 4 blanks), class bank Lotes 1–4 (16 passages × 4 = 64 validated Q toward ~80), free practice UI; guided/mock/strategies for Part 6 come next.

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
| `reading.html` | No | Reading hub: Part 5 free / guided / mock + Part 6 free practice (guided/mock coming next) + Part 7 coming-next |
| `part6-practice.html` | **No** | Fixed 1-passage Part 6 intro (`TQB-P6-INTRO-001`, Q01–Q04), immediate feedback |
| `strategies.html` | **No** | Free Part 5 study library (12 skills + exam habits) · `#part5` anchor |
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

Part 6 = **Text Completion**: short workplace texts with **4 blanks** each (word/phrase, connector, **sentence insertion**). Class bank target: **~80 questions** (20 passages × 4).

- Intro (free, fixed, `purpose: free_intro_fixed`): `data/part6-intro.json` — **1** passage × **4** Q, IDs `TQB-P6-INTRO-001` + `Q01`–`Q04`
- Bank (guided + later mocks, class-validated): `data/part6-bank.json` — **Lotes 1–4:** 16 passages × 4 = **64** Q, IDs `TQB-P6-0001` … `0016` (**64 / 80**)
- Validation: `data/part6-validation-rubric.md` + `data/part6-bank-validation.json`
- Blueprint: `data/part6-blueprint.md`

Genres so far: **email** 3 · **memo** 3 · **notice** 3 · **letter** 3 · **ad** 2 · **article** 2. Blank types (64): word_form 16 · vocabulary 16 · connector 16 · sentence_insertion 16.

Lote 2 added: ad (office products), article (sustainability), email (Customer Service), memo (Finance/policy).

Lote 3 added: notice (product recall), letter (vendor/purchasing), ad (conference hotel), email (benefits enrollment).

Lote 4 added: article (hybrid remote work), memo (warehouse safety), notice (charity food drive), letter (client portal-outage apology).

Blank markers in passage text use `[[131]]` style for UI highlight.

## Short demo (free, Paso 2)


- Path: `demo-test.html`
- Composition: **3× Part 5** · **2× Part 6** · **1× Part 7** memo with **3** questions (**8** total)
- Progress saved via `progress.js` (`toeic-boost.progress.v1`)

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Landing |
| `styles.css` | Landing + dashboard + demo + Part 5/6 / Reading hub + strategy library |
| `nav.js` | Landing toggle + shared app header |
| `access.js` / `data/access.json` | Teacher class-code unlock |
| `progress.js` | Demo + Part 5 guided/mock session storage |
| `dashboard.html` / `dashboard.js` | Progress dashboard + class access panel |
| `demo-test.html` / `demo-test.js` | Free Part 5–7 demo flow |
| `data/demo-test.json` / `data/demo-items.json` | Demo config + original items |
| `reading.html` | Reading hub (Part 5 live; Part 6 free live; guided/mock & Part 7 coming next) |
| `part5-practice.html` / `part5-practice.js` | Free 10-item Part 5 set |
| `part5-guided-practice.html` / `part5-guided-practice.js` | Class 15-item Part 5 drill |
| `part5-mock.html` / `part5-mock.js` | Class timed Part 5 mock (30Q / 20 min) |
| `data/part5-intro.json` | Fixed free intro (10) |
| `data/part5-bank.json` | Guided + mock class bank (**200** validated — COMPLETE) |
| `data/part5-validation-rubric.md` | Teacher rubric (ES) for Part 5 class items |
| `data/part5-bank-validation.json` | Validation summary (kept/rewritten/dropped) + lote batches |
| `data/part5-blueprint.md` | 200-item skill targets — **COMPLETE** |
| `strategies.html` | Free Part 5 strategies library (Listening/6–7 stubs on same page) |
| `listening.html` | Coming-next stub |
| `assets/` | Logo / favicon / hero art |

## Trademark note

**TOEIC** is a registered trademark of ETS. This site uses the name in a **nominative** sense to describe preparation for the TOEIC Listening & Reading test. **TOEIC Boost is not affiliated with, endorsed by, or sponsored by ETS.**
