# TOEIC Boost (Paso 3 — Part 5 Incomplete Sentences)

Static site for **TOEIC Boost** by Teacher Israel Ventura — sibling product to TOEFL ITP Boost.

**Paso 1:** Landing page (marketing).  
**Paso 2:** Class-code access, student dashboard, free Reading & Grammar short demo (Part 5–7 style).  
**Paso 3:** Original Part 5 Incomplete Sentences bank (170 items total = 10 intro + 160 class-validated), free fixed practice (10), class guided practice (15), a real Reading hub, and a free Part 5 Strategies library.

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
| `reading.html` | No | Reading hub: Part 5 links + Parts 6/7 coming-next notes |
| `strategies.html` | **No** | Free Part 5 study library (12 skills + exam habits) · `#part5` anchor |
| `part5-practice.html` | **No** | Fixed 10-item intro (`TQB-P5-0001`–`0010`), immediate feedback, restart |
| `part5-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 15 items from the 160-item class bank, balanced by skill, session saved |
| `demo-test.html` | No | Short Part 5–7 snapshot (unchanged from Paso 2) |

Guided practice shows an inline class-code gate if the device is locked. The 10 free items are never reused in guided sets.

## Part 5 item bank (original workplace English)

All 170 items are invented for this course and the class bank is **rubric-validated**. They are **not** copied from ETS, official TOEIC, or the TOEFL ITP bank.

- Intro (free, fixed, `shuffle: false`, `reuse_in_mocks: false`): `data/part5-intro.json` — 10 items, IDs `TQB-P5-0001` … `TQB-P5-0010`
- Bank (guided + later mocks, class-validated, `exclude_from_free_intro: true`): `data/part5-bank.json` — **160** items, IDs `TQB-P5-0011` … `TQB-P5-0170` (target ~200 via lotes of 20)
- Validation: `data/part5-validation-rubric.md` + `data/part5-bank-validation.json`

Skill balance (170 total = 10 intro + 160 validated bank; blueprint → ~200 class):

| Skill | Intro | Bank (validated) | Total |
|-------|------:|-----------------:|------:|
| Word Forms | 1 | 12 | 13 |
| Verb Tenses | 1 | 12 | 13 |
| Prepositions | 1 | 13 | 14 |
| Conjunctions/Transitions | 1 | 14 | 15 |
| Pronouns | 1 | 14 | 15 |
| Subject-Verb Agreement | 1 | 13 | 14 |
| Conditionals | 1 | 14 | 15 |
| Passive Voice | 1 | 14 | 15 |
| Comparatives/Superlatives | 1 | 13 | 14 |
| Gerunds/Infinitives | 1 | 14 | 15 |
| Articles/Determiners | 0 | 13 | 13 |
| Modals | 0 | 14 | 14 |

Each item: one blank, four options (A–D), one `correctKey` that matches `correctAnswer` text, plus explanation and common-mistake note.

## Short demo (free, Paso 2)

- Path: `demo-test.html`
- Composition: **3× Part 5** · **2× Part 6** · **1× Part 7** memo with **3** questions (**8** total)
- Progress saved via `progress.js` (`toeic-boost.progress.v1`)

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Landing |
| `styles.css` | Landing + dashboard + demo + Part 5 / Reading hub + strategy library |
| `nav.js` | Landing toggle + shared app header |
| `access.js` / `data/access.json` | Teacher class-code unlock |
| `progress.js` | Demo + Part 5 guided session storage |
| `dashboard.html` / `dashboard.js` | Progress dashboard + class access panel |
| `demo-test.html` / `demo-test.js` | Free Part 5–7 demo flow |
| `data/demo-test.json` / `data/demo-items.json` | Demo config + original items |
| `reading.html` | Reading hub (Part 5 live; 6/7 coming next) |
| `part5-practice.html` / `part5-practice.js` | Free 10-item Part 5 set |
| `part5-guided-practice.html` / `part5-guided-practice.js` | Class 15-item Part 5 drill |
| `data/part5-intro.json` | Fixed free intro (10) |
| `data/part5-bank.json` | Guided/mock class bank (160 validated; target ~200) |
| `data/part5-validation-rubric.md` | Teacher rubric (ES) for Part 5 class items |
| `data/part5-bank-validation.json` | Validation summary (kept/rewritten/dropped) + lote batches |
| `data/part5-blueprint.md` | ~200-item skill targets and lote progress |
| `strategies.html` | Free Part 5 strategies library (Listening/6–7 stubs on same page) |
| `listening.html` | Coming-next stub |
| `assets/` | Logo / favicon / hero art |

## Trademark note

**TOEIC** is a registered trademark of ETS. This site uses the name in a **nominative** sense to describe preparation for the TOEIC Listening & Reading test. **TOEIC Boost is not affiliated with, endorsed by, or sponsored by ETS.**
