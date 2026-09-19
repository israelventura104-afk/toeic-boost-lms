# TOEIC Boost (Paso 3+ — Part 5–7 Reading + Part 1 Listening intro + Full Reading Mock)

Static site for **TOEIC Boost** by Teacher Israel Ventura — sibling product to TOEFL ITP Boost.

**Paso 1:** Landing page (marketing).  
**Paso 2:** Class-code access, student dashboard, free Reading & Grammar short demo (Part 5–7 style).  
**Paso 3:** Original Part 5 Incomplete Sentences bank (210 items = 10 intro + 200 class-validated), free/guided/mock flows, Reading hub, and Part 5 Strategies.
**Paso 3b (Part 6):** Original Part 6 Text Completion — free intro (1 passage × 4 blanks), class bank **COMPLETE** Lotes 1–5 (20 passages × 4 = **80** validated Q), free practice UI, **guided practice live** (2 passages / 8 Q), **timed mock live** (4 passages / 16 Q · 12 min); **Part 6 strategies live** on `strategies.html#part6`.
**Paso 3c (Part 7 Phase 1):** Original Part 7 Reading Comprehension — free intro (1 single × 3 Q), class bank **COMPLETE** Lotes 1–5 (17 singles + 5 doubles + 2 triples = **100** validated Q), free practice UI live; **guided practice live** (2 sets · prefer single + multi); **timed mock live** (54 Q · 55 min); **Part 7 strategies live** on `strategies.html#part7`.
**Paso 3d (Full Reading Mock):** Continuous Parts 5→6→7 exam — **100 questions · 75 minutes** (`reading-mock.html`), same section-mock construction, class code required, per-part breakdown + `recordReadingMockSession`.
**Paso 3e (Listening Phase 1 — Part 1):** Photographs free intro (3 fixed items + image/audio), `listening.html` hub live for Part 1, Parts 2–4 coming soon. No guided/mock yet.

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
| `listening.html` | No | Listening hub: Part 1 free practice live · Parts 2–4 coming soon |
| `part1-practice.html` | **No** | Fixed 3-photo Part 1 intro (`TQB-P1-0001`–`0003`), audio + immediate feedback |
| `reading.html` | No | Reading hub: Part 5–7 free / guided / mock + Full Reading Mock |
| `reading-mock.html` | **Yes** `TOEIC-VENTURA-2026` | Full Reading Mock: **100 Q · 75 min**, Part 5→6→7, no feedback until end, auto-submit at 0 |
| `part7-practice.html` | **No** | Fixed 1-passage Part 7 intro (`TQB-P7-INTRO-001`, Q01–Q03), immediate feedback |
| `part7-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 2 random sets from the 24-set class bank · prefer 1 single + 1 multi · no timer · session saved |
| `part7-mock.html` | **Yes** `TOEIC-VENTURA-2026` | Timed mock: **~54 questions · 55 minutes**, singles then multis, no feedback until end, auto-submit at 0 |
| `part6-practice.html` | **No** | Fixed 1-passage Part 6 intro (`TQB-P6-INTRO-001`, Q01–Q04), immediate feedback |
| `part6-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 2 random passages (8 blanks) from the 20-passage class bank · no timer · session saved |
| `part6-mock.html` | **Yes** `TOEIC-VENTURA-2026` | Timed mock: **4 passages · 16 blanks · 12 minutes**, no feedback until end, auto-submit at 0 |
| `strategies.html` | **No** | Free Part 5 + Part 6 + Part 7 study library · `#part5` / `#part6` / `#part7` anchors |
| `part5-practice.html` | **No** | Fixed 10-item intro (`TQB-P5-0001`–`0010`), immediate feedback, restart |
| `part5-guided-practice.html` | **Yes** `TOEIC-VENTURA-2026` | 15 items from the 200-item class bank, balanced by skill, session saved |
| `part5-mock.html` | **Yes** `TOEIC-VENTURA-2026` | Timed mock: **30 questions · 20 minutes**, no feedback until end, skill-balanced set, auto-submit at 0 |
| `demo-test.html` | No | Short Part 5–7 snapshot (unchanged from Paso 2) |

Guided practice and the mock show an inline class-code gate if the device is locked. The 10 free intro items are never reused in guided or mock sets.

## Trademark note

**TOEIC** is a registered trademark of ETS. This site uses the name in a **nominative** sense to describe preparation for the TOEIC Listening & Reading test. **TOEIC Boost is not affiliated with, endorsed by, or sponsored by ETS.**
