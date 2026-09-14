/**
 * Part 7 Mock Test — timed Reading Comprehension exam
 * Official-ish size: 54 questions · 55 minutes (3300s) · feedback only at end.
 * Bank: data/part7-bank.json only (never free intro).
 *
 * Set construction:
 * 1. Pick 5 multi sets (double/triple) from available → 25 Q.
 * 2. Pick singles whose questions sum to exactly 29 (prefer 3×3Q + 5×4Q).
 * 3. Order: all singles first (shuffled among themselves), then multis (shuffled).
 *    Within each set keep authored question order.
 * 4. Avoid exact same set-ID combination when possible on “New mock set”.
 */

const BANK_URL = "data/part7-bank.json";
const MULTI_SETS_PER_MOCK = 5;
const SINGLE_Q_TARGET = 29;
const MOCK_SIZE = 54; // 29 single + 25 multi
const MOCK_SECONDS = 55 * 60; // 3300

const state = {
  bank: [],
  sets: [],
  questions: [],
  index: 0,
  answers: new Map(),
  secondsLeft: MOCK_SECONDS,
  timerId: null,
  phase: "start", // start | exam | results
  submitted: false,
  lastSetKey: "",
};

const statusEl = document.querySelector("[data-mock-status]");
const startPanel = document.querySelector("[data-mock-start]");
const examPanel = document.querySelector("[data-mock-exam]");
const resultsPanel = document.querySelector("[data-mock-results]");
const timerEl = document.querySelector("[data-mock-timer]");
const answeredEl = document.querySelector("[data-mock-answered]");
const counterEl = document.querySelector("[data-mock-counter]");
const metaEl = document.querySelector("[data-mock-meta]");
const questionEl = document.querySelector("[data-mock-question]");
const optionsEl = document.querySelector("[data-mock-options]");
const navEl = document.querySelector("[data-mock-nav]");
const prevBtn = document.querySelector("[data-mock-prev]");
const nextBtn = document.querySelector("[data-mock-next]");
const submitBtn = document.querySelector("[data-mock-submit]");
const beginBtn = document.querySelector("[data-mock-begin]");
const retryBtn = document.querySelector("[data-mock-retry]");
const newSetBtn = document.querySelector("[data-mock-new-set]");
const passagesEl = document.querySelector("[data-passages]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeSkill(skill) {
  if (window.ToeicProgress?.normalizeSkill) {
    return window.ToeicProgress.normalizeSkill(skill);
  }
  return skill || "Part 7";
}

function normalizeQuestion(raw, set) {
  const options = Array.isArray(raw.options)
    ? raw.options.map((option) => {
        if (typeof option === "string") return { key: option, text: option };
        return {
          key: String(option.key ?? "").trim(),
          text: String(option.text ?? option.key ?? "").trim(),
        };
      })
    : [];

  const correctKey = String(raw.correctKey ?? "").trim();
  const correctFromOptions = options.find((option) => option.key === correctKey);

  return {
    id: String(raw.id ?? "").trim(),
    questionType: raw.questionType || "",
    skill: raw.skill || "Part 7",
    question: String(raw.question ?? "").trim(),
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || correctFromOptions?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: raw.commonMistake || "",
    setId: set.id,
    setType: set.setType,
    setTitle: set.title || "Set",
  };
}

function normalizePassage(raw) {
  return {
    label: String(raw.label ?? "A").trim(),
    genre: raw.genre || "",
    heading: raw.heading || "",
    body: String(raw.body ?? "").trim(),
  };
}

function normalizeSet(raw) {
  const set = {
    id: String(raw.id ?? "").trim(),
    setType: raw.setType || "single",
    genre: raw.genre || "",
    title: raw.title || "Passage",
    workplaceTopic: raw.workplaceTopic || "",
    passages: (raw.passages || []).map(normalizePassage),
    questions: [],
  };
  set.questions = (raw.questions || []).map((q) => normalizeQuestion(q, set));
  return set;
}

function validateSet(set) {
  if (!set.id) throw new Error("Set is missing id.");
  if (!Array.isArray(set.passages) || !set.passages.length) {
    throw new Error(`Set ${set.id} has no passages.`);
  }
  const expected =
    set.setType === "triple" ? 3 : set.setType === "double" ? 2 : 1;
  if (set.passages.length !== expected) {
    throw new Error(
      `Set ${set.id}: setType "${set.setType}" expects ${expected} passage(s), found ${set.passages.length}.`
    );
  }
  set.passages.forEach((p, i) => {
    if (!p.body) throw new Error(`Set ${set.id}: passage ${i + 1} has empty body.`);
  });
  if (!Array.isArray(set.questions) || set.questions.length === 0) {
    throw new Error(`Set ${set.id} has no questions.`);
  }
  set.questions.forEach((item) => {
    if (!item.id || !item.question || !item.options.length || !item.correctKey) {
      throw new Error(`Invalid question in ${set.id}.`);
    }
    const keys = item.options.map((option) => option.key);
    if (!keys.includes(item.correctKey)) {
      throw new Error(`Question ${item.id}: correctKey not in options.`);
    }
  });
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isMulti(set) {
  return set.setType === "double" || set.setType === "triple";
}

function setKey(sets) {
  return sets
    .map((s) => s.id)
    .sort()
    .join("|");
}

function qCount(set) {
  return set.questions.length;
}

/**
 * Prefer exact SINGLE_Q_TARGET (29): with this bank that is 3×3Q + 5×4Q.
 * Fallback: greedy subset that sums as close as possible to the target.
 */
function pickSinglesForTarget(singles, target) {
  if (!singles.length) return [];

  const threes = singles.filter((s) => qCount(s) === 3);
  const fours = singles.filter((s) => qCount(s) === 4);

  // Exact official-ish recipe for current bank (3×3 + 5×4 = 29)
  if (threes.length >= 3 && fours.length >= 5 && 3 * 3 + 5 * 4 === target) {
    return [...shuffle(threes).slice(0, 3), ...shuffle(fours).slice(0, 5)];
  }

  // Greedy fill toward target without exceeding when possible
  const ordered = shuffle(singles);
  const picked = [];
  let sum = 0;
  for (const s of ordered) {
    const n = qCount(s);
    if (sum + n <= target) {
      picked.push(s);
      sum += n;
    }
    if (sum === target) break;
  }
  return picked;
}

/**
 * Build mock: 5 multis (25 Q) + singles → 29 Q; order singles then multis.
 * Flatten keeps authored question order within each set.
 * If total ≠ MOCK_SIZE, trim excess or (rarely) leave short — prefer exact 54.
 */
function buildMockBundle(bank) {
  const singles = bank.filter((s) => s.setType === "single");
  const multis = bank.filter(isMulti);

  if (multis.length < MULTI_SETS_PER_MOCK) {
    throw new Error(
      `Need at least ${MULTI_SETS_PER_MOCK} multi sets (have ${multis.length}).`
    );
  }

  const multiChosen = shuffle(multis).slice(0, MULTI_SETS_PER_MOCK);
  const singleChosen = pickSinglesForTarget(singles, SINGLE_Q_TARGET);

  const orderedSingles = shuffle(singleChosen);
  const orderedMultis = shuffle(multiChosen);
  const sets = [...orderedSingles, ...orderedMultis];

  let questions = [];
  sets.forEach((set) => {
    set.questions.forEach((q) => questions.push(q));
  });

  if (questions.length > MOCK_SIZE) {
    questions = questions.slice(0, MOCK_SIZE);
  }

  return { sets, questions };
}

function pickMockSets(bank) {
  let chosen = null;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const bundle = buildMockBundle(bank);
    const key = setKey(bundle.sets);
    if (key !== state.lastSetKey || attempt === 23) {
      chosen = bundle;
      state.lastSetKey = key;
      break;
    }
  }
  if (!chosen) {
    chosen = buildMockBundle(bank);
    state.lastSetKey = setKey(chosen.sets);
  }
  return chosen;
}

async function loadBank() {
  const response = await fetch(BANK_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${BANK_URL} (${response.status}).`);
  }

  const data = await response.json();
  const rawSets = Array.isArray(data.sets) ? data.sets : [];
  if (!rawSets.length) {
    throw new Error("Part 7 bank has no sets.");
  }

  const sets = rawSets.map(normalizeSet);
  sets.forEach(validateSet);

  const classSets = sets.filter(
    (s) => s.id && !String(s.id).toUpperCase().includes("INTRO")
  );

  const singles = classSets.filter((s) => s.setType === "single");
  const multis = classSets.filter(isMulti);
  if (multis.length < MULTI_SETS_PER_MOCK) {
    throw new Error(
      `Mock bank too small for multi pick (${multis.length} multi; need ${MULTI_SETS_PER_MOCK}).`
    );
  }
  if (!singles.length) {
    throw new Error("Mock bank has no single sets.");
  }

  return classSets;
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function attachTimerTick() {
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    if (timerEl) {
      timerEl.textContent = formatTime(state.secondsLeft);
      if (state.secondsLeft <= 60) timerEl.classList.add("is-urgent");
    }
    if (state.secondsLeft <= 0) {
      stopTimer();
      finishExam({ auto: true });
    }
  }, 1000);
}

function startTimer() {
  stopTimer();
  state.secondsLeft = MOCK_SECONDS;
  if (timerEl) {
    timerEl.textContent = formatTime(state.secondsLeft);
    timerEl.classList.remove("is-urgent");
  }
  attachTimerTick();
}

function showPhase(phase) {
  state.phase = phase;
  if (startPanel) startPanel.hidden = phase !== "start";
  if (examPanel) examPanel.hidden = phase !== "exam";
  if (resultsPanel) resultsPanel.hidden = phase !== "results";
}

function updateAnsweredCount() {
  if (answeredEl) {
    answeredEl.textContent = `${state.answers.size} / ${state.questions.length} answered`;
  }
}

function formatBodyHtml(body) {
  const escaped = escapeHtml(body);
  const paragraphs = escaped.split(/\n\n+/).filter(Boolean);
  if (paragraphs.length <= 1) {
    return `<p>${escaped.replace(/\n/g, "<br />")}</p>`;
  }
  return paragraphs
    .map((block) => `<p>${block.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function setForQuestion(item) {
  return state.sets.find((s) => s.id === item.setId) || null;
}

function renderPassages(item) {
  const set = setForQuestion(item);
  if (!set || !passagesEl) return;

  const multi = set.passages.length > 1;
  const setIndex = state.sets.findIndex((s) => s.id === set.id) + 1;
  const setPrefix =
    state.sets.length > 1
      ? `Set ${setIndex} of ${state.sets.length}`
      : "Set";

  passagesEl.innerHTML = set.passages
    .map((p) => {
      const metaBits = [
        setPrefix,
        multi ? `Passage ${escapeHtml(p.label)}` : null,
        set.setType,
        p.genre || set.genre,
        !multi ? set.workplaceTopic : null,
      ].filter(Boolean);
      const title = p.heading || set.title || "Passage";
      return `
        <article class="reading-passage part7-passage">
          <p class="part7-passage-meta">${escapeHtml(metaBits.join(" · "))}</p>
          <h3>${escapeHtml(title)}</h3>
          <div class="part7-passage-body">${formatBodyHtml(p.body)}</div>
        </article>`;
    })
    .join("");
}

function renderNav() {
  if (!navEl) return;
  navEl.innerHTML = state.questions
    .map((item, index) => {
      const answered = state.answers.has(item.id);
      const current = index === state.index;
      return `<button type="button" class="mock-nav-btn${answered ? " is-answered" : ""}${
        current ? " is-current" : ""
      }" data-mock-goto="${index}">${index + 1}</button>`;
    })
    .join("");

  navEl.querySelectorAll("[data-mock-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.index = Number(btn.getAttribute("data-mock-goto"));
      renderQuestion();
    });
  });
}

function renderQuestion() {
  const item = state.questions[state.index];
  if (!item) return;

  const selected = state.answers.get(item.id);
  if (counterEl) counterEl.textContent = `${state.index + 1} / ${state.questions.length}`;
  if (metaEl) {
    metaEl.textContent = "";
    metaEl.hidden = true;
  }

  renderPassages(item);
  if (questionEl) questionEl.textContent = item.question;

  if (optionsEl) {
    optionsEl.innerHTML = "";
    const longOptions = item.options.some((option) => option.text.length > 48);
    optionsEl.classList.toggle("is-sentence-options", longOptions);

    item.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `choice-button${selected === option.key ? " is-selected" : ""}`;
      button.innerHTML = `<b>${escapeHtml(option.key)}</b><span>${escapeHtml(option.text)}</span>`;
      button.addEventListener("click", () => {
        state.answers.set(item.id, option.key);
        updateAnsweredCount();
        renderQuestion();
      });
      optionsEl.appendChild(button);
    });
  }

  if (prevBtn) prevBtn.disabled = state.index === 0;
  if (nextBtn) {
    nextBtn.textContent =
      state.index === state.questions.length - 1 ? "Last item" : "Next";
  }
  updateAnsweredCount();
  renderNav();
}

function beginExam() {
  if (!state.bank.length) return;
  const bundle = pickMockSets(state.bank);
  state.sets = bundle.sets;
  state.questions = bundle.questions;
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;

  const singleN = state.sets.filter((s) => !isMulti(s)).length;
  const multiN = state.sets.filter(isMulti).length;
  setStatus(
    `Mock running · ${state.questions.length} Q · ${singleN} single + ${multiN} multi sets · bank ${state.bank.length} · feedback locked until submit`
  );
  showPhase("exam");
  startTimer();
  renderQuestion();
  examPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function paintResults(correctCount, total, usedSeconds, auto, studyRows, misses) {
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  const scoreEl = document.querySelector("[data-mock-final-score]");
  const noteEl = document.querySelector("[data-mock-final-note]");
  const messageEl = document.querySelector("[data-mock-result-message]");
  const metaResultEl = document.querySelector("[data-mock-result-meta]");
  const studyEl = document.querySelector("[data-mock-study-focus]");
  const mistakesEl = document.querySelector("[data-mock-mistakes]");

  const singleN = state.sets.filter((s) => !isMulti(s)).length;
  const multiN = state.sets.filter(isMulti).length;

  if (scoreEl) scoreEl.textContent = `${correctCount}/${total}`;
  if (noteEl) {
    noteEl.textContent = `${percent}% · ${formatTime(usedSeconds)} used · ${singleN} single + ${multiN} multi`;
  }
  if (messageEl) {
    messageEl.hidden = false;
    if (auto) {
      messageEl.textContent = "Time is up — answers submitted automatically.";
    } else if (percent >= 80) {
      messageEl.textContent =
        "Strong mock. Keep rotating sets so weaker question types do not hide.";
    } else if (percent >= 60) {
      messageEl.textContent =
        "Solid. Review the misses below, then run another timed set.";
    } else {
      messageEl.textContent =
        "Use the explanations. Guided practice on weak question types helps before the next mock.";
    }
  }
  if (metaResultEl) {
    metaResultEl.textContent = `Time used: ${formatTime(usedSeconds)} of 55:00 · Answered ${state.answers.size}/${total}`;
  }

  const skillMap = {};
  studyRows.forEach((row) => {
    if (!skillMap[row.skill]) skillMap[row.skill] = { correct: 0, total: 0 };
    skillMap[row.skill].total += 1;
    if (row.correct) skillMap[row.skill].correct += 1;
  });
  const ranked = Object.entries(skillMap)
    .map(([skill, row]) => ({
      skill,
      percent: row.total ? Math.round((row.correct / row.total) * 100) : 0,
      correct: row.correct,
      total: row.total,
    }))
    .sort((a, b) => a.percent - b.percent || b.total - a.total);

  if (studyEl) {
    if (!ranked.length) {
      studyEl.innerHTML = "";
    } else {
      studyEl.innerHTML = `
        <p class="eyebrow">Study focus</p>
        <ul class="result-study-list">
          ${ranked
            .map(
              (row) =>
                `<li><strong>${escapeHtml(row.skill)}</strong><span>${row.correct}/${row.total} · ${row.percent}%</span></li>`
            )
            .join("")}
        </ul>
      `;
    }
  }

  if (mistakesEl) {
    if (!misses.length) {
      mistakesEl.innerHTML = `<div class="empty-review">No misses this round. Start a new mock set to keep the patterns fresh.</div>`;
    } else {
      mistakesEl.innerHTML = `
        <div class="result-misses-head">
          <strong>Review mistakes</strong>
          <span>${misses.length}</span>
        </div>
        <div class="result-miss-list">
          ${misses
            .map(
              ({ item, selectedKey, blank }, index) => `
            <article class="result-miss">
              <div class="result-miss-top">
                <span class="result-miss-num">${index + 1}</span>
                <span class="result-miss-tag">${escapeHtml(item.setType || "set")}</span>
              </div>
              <p class="result-miss-stem">${escapeHtml(item.question)}</p>
              <p class="result-miss-keys">Yours: <b>${escapeHtml(
                blank ? "no answer" : selectedKey
              )}</b> · Correct: <b>${escapeHtml(item.correctKey)}. ${escapeHtml(
                item.correctAnswer
              )}</b></p>
              <details class="result-miss-why">
                <summary>Why</summary>
                <p>${escapeHtml(item.explanation)}</p>
                ${
                  item.commonMistake
                    ? `<p>Common trap: ${escapeHtml(item.commonMistake)}</p>`
                    : ""
                }
              </details>
            </article>`
            )
            .join("")}
        </div>
      `;
    }
  }
}

function finishExam({ auto = false } = {}) {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();

  if (!auto && state.answers.size < state.questions.length) {
    const left = state.questions.length - state.answers.size;
    const ok = window.confirm(
      `You still have ${left} unanswered question(s). Submit the mock anyway?`
    );
    if (!ok) {
      state.submitted = false;
      if (state.secondsLeft > 0) attachTimerTick();
      return;
    }
  }

  const answered = state.questions.map((item) => {
    const selectedKey = state.answers.get(item.id);
    const correct = selectedKey === item.correctKey;
    return {
      item,
      selectedKey,
      correct: Boolean(selectedKey) && correct,
      blank: !selectedKey,
    };
  });

  const correctCount = answered.filter((row) => row.correct).length;
  const percent = Math.round((correctCount / state.questions.length) * 100);
  const usedSeconds = MOCK_SECONDS - Math.max(0, state.secondsLeft);

  if (window.ToeicProgress?.recordPart7Session) {
    try {
      window.ToeicProgress.recordPart7Session({
        mode: "mock",
        correct: correctCount,
        total: state.questions.length,
        questionIds: state.questions.map((item) => item.id),
        setIds: state.sets.map((s) => s.id),
        durationSeconds: usedSeconds,
        timedOut: auto,
        items: answered.map(({ item, correct }) => ({
          questionId: item.id,
          skill: item.skill || item.questionType || "Part 7",
          subskill: item.questionType || "",
          correct,
          prompt: item.question,
          part: 7,
        })),
      });
    } catch (error) {
      console.error("[TOEIC] Failed to save Part 7 mock session.", error);
      setStatus("Could not save progress on this device (storage blocked or full).", true);
    }
  }

  const studyRows = answered.map(({ item, correct }) => ({
    skill: normalizeSkill(item.skill),
    correct,
  }));
  const misses = answered.filter((row) => !row.correct);

  paintResults(
    correctCount,
    state.questions.length,
    usedSeconds,
    auto,
    studyRows,
    misses
  );

  setStatus(`Mock saved on this device · ${correctCount}/${state.questions.length} (${percent}%)`);
  showPhase("results");
  resultsPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  beginBtn?.addEventListener("click", beginExam);

  const backToStart = () => {
    showPhase("start");
    setStatus("Ready for another Part 7 mock when you are.");
    startPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  retryBtn?.addEventListener("click", backToStart);
  newSetBtn?.addEventListener("click", () => {
    beginExam();
  });

  prevBtn?.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    }
  });

  submitBtn?.addEventListener("click", () => finishExam({ auto: false }));
}

async function bootMock() {
  setStatus("Loading Part 7 mock bank…");
  if (beginBtn) beginBtn.disabled = true;

  try {
    state.bank = await loadBank();
    setStatus(
      `Mock bank ready · ${state.bank.length} sets · ~${MOCK_SIZE}Q / 55 min · singles then multis · free intro excluded`
    );
    if (beginBtn) beginBtn.disabled = false;
    bindControls();
    showPhase("start");
  } catch (error) {
    console.error(error);
    setStatus(`Could not load the mock bank. ${error.message}`, true);
    if (beginBtn) beginBtn.disabled = true;
  }
}

if (window.ToeicAccess?.guardPage) {
  window.ToeicAccess.guardPage({
    title: "Part 7 mock is protected",
    body: "Timed Part 7 mocks are for Teacher Israel Ventura’s class groups. Enter the class code your teacher gave you. The fixed free passage stays open on the Part 7 free practice page without a code.",
    secondaryHref: "part7-practice.html",
    secondaryLabel: "Back to free Part 7 practice",
    onUnlocked: bootMock,
  });
} else {
  bootMock();
}

// Expose builders for smoke tests (optional)
window.Part7MockInternals = {
  pickSinglesForTarget,
  buildMockBundle,
  MOCK_SIZE,
  MOCK_SECONDS,
  SINGLE_Q_TARGET,
  MULTI_SETS_PER_MOCK,
};
