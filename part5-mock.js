/**
 * Part 5 Mock Test — timed Incomplete Sentences exam
 * 30 questions · 20 minutes (1200s) · feedback only at end.
 * Bank: data/part5-bank.json (excludes free intro IDs from part5-intro.json).
 *
 * Set construction:
 * - Skill-balanced round-robin across the 12 grammar skills (same approach as guided).
 * - Question order shuffled each session (fresh random balanced set).
 * - Option keys A–D kept as authored (not shuffled) so stem/answer keys stay stable.
 */

const BANK_URL = "data/part5-bank.json";
const INTRO_URL = "data/part5-intro.json";
const MOCK_SIZE = 30;
const MOCK_SECONDS = 20 * 60; // 1200

const state = {
  bank: [],
  questions: [],
  index: 0,
  answers: new Map(),
  secondsLeft: MOCK_SECONDS,
  timerId: null,
  phase: "start", // start | exam | results
  submitted: false,
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
  return skill || "Other";
}

function normalizeItem(raw) {
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
    type: raw.type || "Incomplete Sentences",
    skill: raw.skill || "Part 5",
    subskill: raw.subskill || "",
    question: raw.question || raw.stem || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || correctFromOptions?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: raw.commonMistake || "",
  };
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function groupBySkill(items) {
  const groups = new Map();
  items.forEach((item) => {
    const key = normalizeSkill(item.skill);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return groups;
}

/** Round-robin across skills, then shuffle question order (options stay A–D). */
function buildBalancedMock(bank, size) {
  const groups = groupBySkill(shuffle([...bank]));
  const shuffledGroups = shuffle([...groups.values()]);
  const selected = [];

  while (selected.length < size && shuffledGroups.some((group) => group.length)) {
    shuffledGroups.forEach((group) => {
      if (selected.length < size && group.length) selected.push(group.shift());
    });
  }

  return shuffle(selected);
}

async function loadBank() {
  const [bankRes, introRes] = await Promise.all([
    fetch(BANK_URL, { cache: "no-cache" }),
    fetch(INTRO_URL, { cache: "no-cache" }),
  ]);

  if (!bankRes.ok) throw new Error(`Could not load ${BANK_URL} (${bankRes.status}).`);

  const bankData = await bankRes.json();
  const rawItems = Array.isArray(bankData) ? bankData : bankData.items;
  if (!rawItems?.length) throw new Error("Part 5 bank is empty.");

  let introIds = new Set();
  if (introRes.ok) {
    try {
      const introData = await introRes.json();
      const introItems = Array.isArray(introData) ? introData : introData.items || [];
      introIds = new Set(introItems.map((item) => item.id));
    } catch {
      introIds = new Set();
    }
  }

  const items = rawItems
    .map(normalizeItem)
    .filter((item) => item.id && item.question && item.options.length && item.correctKey)
    .filter((item) => !introIds.has(item.id));

  if (items.length < MOCK_SIZE) {
    throw new Error(`Bank too small for a ${MOCK_SIZE}-item mock (${items.length}).`);
  }

  return items;
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
  // No grammar skill titles during exam
  if (metaEl) {
    metaEl.textContent = "";
    metaEl.hidden = true;
  }
  if (questionEl) questionEl.textContent = item.question;

  if (optionsEl) {
    optionsEl.innerHTML = "";
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
  state.questions = buildBalancedMock(state.bank, MOCK_SIZE);
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;
  setStatus(
    `Mock running · ${state.questions.length} questions · bank ${state.bank.length} · feedback locked until submit`
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

  if (scoreEl) scoreEl.textContent = `${correctCount}/${total}`;
  if (noteEl) noteEl.textContent = `${percent}% · ${formatTime(usedSeconds)} used`;
  if (messageEl) {
    messageEl.hidden = false;
    if (auto) {
      messageEl.textContent = "Time is up — answers submitted automatically.";
    } else if (percent >= 80) {
      messageEl.textContent =
        "Strong mock. Keep rotating skills so weaker patterns do not hide.";
    } else if (percent >= 60) {
      messageEl.textContent =
        "Solid. Review the misses below, then run another timed set.";
    } else {
      messageEl.textContent =
        "Use the explanations. Guided practice on weak skills helps before the next mock.";
    }
  }
  if (metaResultEl) {
    metaResultEl.textContent = `Time used: ${formatTime(usedSeconds)} of 20:00 · Answered ${state.answers.size}/${total}`;
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
                <span class="result-miss-tag">Part 5</span>
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

  if (window.ToeicProgress?.recordPart5Session) {
    try {
      window.ToeicProgress.recordPart5Session({
        mode: "mock",
        correct: correctCount,
        total: state.questions.length,
        questionIds: state.questions.map((item) => item.id),
        durationSeconds: usedSeconds,
        timedOut: auto,
        items: answered.map(({ item, correct }) => ({
          questionId: item.id,
          skill: item.skill,
          subskill: item.subskill,
          correct,
          prompt: item.question,
          part: 5,
        })),
      });
    } catch (error) {
      console.error("[TOEIC] Failed to save Part 5 mock session.", error);
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
    setStatus("Ready for another Part 5 mock when you are.");
    startPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  retryBtn?.addEventListener("click", backToStart);
  newSetBtn?.addEventListener("click", () => {
    // Build a fresh balanced set immediately
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
  setStatus("Loading Part 5 mock bank…");
  if (beginBtn) beginBtn.disabled = true;

  try {
    state.bank = await loadBank();
    const skillCount = groupBySkill(state.bank).size;
    setStatus(
      `Mock bank ready · ${state.bank.length} items · ${skillCount} skills · ${MOCK_SIZE}Q / 20 min · free intro excluded`
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
    title: "Part 5 mock is protected",
    body: "Timed Part 5 mocks are for Teacher Israel Ventura’s class groups. Enter the class code your teacher gave you. The 10 fixed free questions stay open on the Part 5 free practice page without a code.",
    secondaryHref: "part5-practice.html",
    secondaryLabel: "Back to free Part 5 practice",
    onUnlocked: bootMock,
  });
} else {
  bootMock();
}
