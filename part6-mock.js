/**
 * Part 6 Mock Test — timed Text Completion exam
 * 4 passages × 4 blanks = 16 questions · 12 minutes (720s) · feedback only at end.
 * Bank: data/part6-bank.json only (never free intro).
 *
 * Set construction:
 * - Shuffle which 4 passages are selected each session.
 * - Keep each passage’s 4 questions in blank order (no blank shuffle).
 * - Option keys A–D kept as authored.
 */

const BANK_URL = "data/part6-bank.json";
const PASSAGES_PER_MOCK = 4;
const QUESTIONS_PER_PASSAGE = 4;
const MOCK_SIZE = PASSAGES_PER_MOCK * QUESTIONS_PER_PASSAGE; // 16
const MOCK_SECONDS = 12 * 60; // 720

const state = {
  bank: [],
  passages: [],
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
const passageMetaEl = document.querySelector("[data-passage-meta]");
const passageTitleEl = document.querySelector("[data-passage-title]");
const passageBodyEl = document.querySelector("[data-passage-body]");

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
  return skill || "Part 6";
}

function normalizeQuestion(raw, passage) {
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
    blankLabel: String(raw.blankLabel ?? "").trim(),
    blankType: raw.blankType || "",
    skill: raw.skill || "Part 6",
    question: raw.question || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || correctFromOptions?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: raw.commonMistake || "",
    passageId: passage.id,
    passageTitle: passage.title || "Passage",
  };
}

function normalizePassage(raw) {
  const passage = {
    id: String(raw.id ?? "").trim(),
    genre: raw.genre || "",
    title: raw.title || "Passage",
    workplaceTopic: raw.workplaceTopic || "",
    text: Array.isArray(raw.text) ? raw.text : [],
    questions: [],
  };
  passage.questions = (raw.questions || []).map((q) => normalizeQuestion(q, passage));
  return passage;
}

function validatePassage(passage) {
  if (!passage.id) throw new Error("Passage is missing id.");
  if (!Array.isArray(passage.text) || !passage.text.length) {
    throw new Error(`Passage ${passage.id} has no text.`);
  }
  if (!Array.isArray(passage.questions) || passage.questions.length < QUESTIONS_PER_PASSAGE) {
    throw new Error(`Passage ${passage.id} needs ${QUESTIONS_PER_PASSAGE} questions.`);
  }

  const body = passage.text.map((p) => p.content || "").join("\n");
  passage.questions.forEach((item) => {
    if (!item.id || !item.blankLabel || !item.options.length || !item.correctKey) {
      throw new Error(`Invalid question in ${passage.id}.`);
    }
    const markerA = `[[${item.blankLabel}]]`;
    const markerB = `_____${item.blankLabel}_____`;
    if (!body.includes(markerA) && !body.includes(markerB)) {
      throw new Error(`Blank marker for ${item.blankLabel} not found in ${passage.id}.`);
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

function setKey(passages) {
  return passages
    .map((p) => p.id)
    .sort()
    .join("|");
}

/** Pick 4 random passages; avoid repeating the exact same set when possible. */
function pickPassages(bank) {
  if (bank.length < PASSAGES_PER_MOCK) {
    throw new Error(`Need at least ${PASSAGES_PER_MOCK} passages in the bank.`);
  }

  let chosen = null;
  for (let attempt = 0; attempt < 16; attempt += 1) {
    const candidate = shuffle(bank).slice(0, PASSAGES_PER_MOCK);
    const key = setKey(candidate);
    if (key !== state.lastSetKey || bank.length <= PASSAGES_PER_MOCK) {
      chosen = candidate;
      state.lastSetKey = key;
      break;
    }
  }
  if (!chosen) {
    chosen = shuffle(bank).slice(0, PASSAGES_PER_MOCK);
    state.lastSetKey = setKey(chosen);
  }
  return chosen;
}

function flattenQuestions(passages) {
  // Keep each passage’s 4 questions together in bank blank order.
  const items = [];
  passages.forEach((passage) => {
    const ordered = [...passage.questions].sort((a, b) => {
      const na = Number(a.blankLabel) || 0;
      const nb = Number(b.blankLabel) || 0;
      if (na !== nb) return na - nb;
      return String(a.id).localeCompare(String(b.id));
    });
    ordered.forEach((q) => items.push(q));
  });
  return items;
}


async function loadPart6BankPassages(bankUrl) {
  const response = await fetch(bankUrl, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${bankUrl} (${response.status}).`);
  }
  const data = await response.json();
  if (Array.isArray(data.passages) && data.passages.length) {
    return data;
  }
  const shardFiles = Array.isArray(data.shardFiles) ? data.shardFiles : [];
  if (!shardFiles.length) {
    throw new Error("Part 6 bank has no passages or shardFiles.");
  }
  const shards = await Promise.all(
    shardFiles.map(async (path) => {
      const res = await fetch(path, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Could not load shard ${path} (${res.status}).`);
      return res.json();
    })
  );
  const passages = [];
  shards.forEach((shard) => {
    (shard.passages || []).forEach((p) => passages.push(p));
  });
  return { ...data, passages };
}

async function loadBank() {
  const data = await loadPart6BankPassages(BANK_URL);
  const rawPassages = Array.isArray(data.passages) ? data.passages : [];
  if (!rawPassages.length) {
    throw new Error("Part 6 bank has no passages.");
  }

  const passages = rawPassages.map(normalizePassage);
  passages.forEach(validatePassage);

  // Never include free intro (intro lives in part6-intro.json; bank is class-only).
  const classPassages = passages.filter(
    (p) => p.id && !String(p.id).toUpperCase().includes("INTRO")
  );

  if (classPassages.length < PASSAGES_PER_MOCK) {
    throw new Error(
      `Mock bank too small (${classPassages.length} passages after filters; need ${PASSAGES_PER_MOCK}).`
    );
  }

  return classPassages;
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

function formatPassageHtml(passage, activeBlankLabel) {
  return passage.text
    .map((block) => {
      let content = escapeHtml(block.content || "");
      content = content.replace(/\[\[(\d+)\]\]/g, (_, label) => {
        const active = String(label) === String(activeBlankLabel);
        return `<span class="part6-blank${active ? " is-active" : ""}" data-blank="${escapeHtml(
          label
        )}">________</span>`;
      });
      content = content.replace(/_____(\d+)_____/g, (_, label) => {
        const active = String(label) === String(activeBlankLabel);
        return `<span class="part6-blank${active ? " is-active" : ""}" data-blank="${escapeHtml(
          label
        )}">________</span>`;
      });
      content = content.replace(/\n/g, "<br />");
      return `<p>${content}</p>`;
    })
    .join("");
}

function passageForQuestion(item) {
  return state.passages.find((p) => p.id === item.passageId) || null;
}

function renderPassage(item) {
  const passage = passageForQuestion(item);
  if (!passage) return;

  if (passageMetaEl) {
    const bits = [passage.genre, passage.workplaceTopic].filter(Boolean);
    const indexInSession = state.passages.findIndex((p) => p.id === passage.id) + 1;
    const prefix =
      state.passages.length > 1
        ? `Passage ${indexInSession} of ${state.passages.length}`
        : "Passage";
    passageMetaEl.textContent = bits.length
      ? `${prefix} · ${bits.join(" · ")}`
      : prefix;
  }
  if (passageTitleEl) passageTitleEl.textContent = passage.title || "Passage";
  if (passageBodyEl) {
    passageBodyEl.innerHTML = formatPassageHtml(passage, item.blankLabel);
  }
}

function stemForQuestion(item) {
  if (item.question && item.question.trim()) {
    return item.question.trim();
  }
  return `Select the best option for the highlighted blank.`;
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
  // No blankType / grammar titles during exam
  if (metaEl) {
    metaEl.textContent = "";
    metaEl.hidden = true;
  }

  renderPassage(item);
  if (questionEl) questionEl.textContent = stemForQuestion(item);

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
  state.passages = pickPassages(state.bank);
  state.questions = flattenQuestions(state.passages);
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;
  setStatus(
    `Mock running · ${state.passages.length} passages · ${state.questions.length} blanks · bank ${state.bank.length} · feedback locked until submit`
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
  if (noteEl) {
    noteEl.textContent = `${percent}% · ${formatTime(usedSeconds)} used · ${PASSAGES_PER_MOCK} passages`;
  }
  if (messageEl) {
    messageEl.hidden = false;
    if (auto) {
      messageEl.textContent = "Time is up — answers submitted automatically.";
    } else if (percent >= 80) {
      messageEl.textContent =
        "Strong mock. Keep rotating passages so weaker blank types do not hide.";
    } else if (percent >= 60) {
      messageEl.textContent =
        "Solid. Review the misses below, then run another timed set.";
    } else {
      messageEl.textContent =
        "Use the explanations. Guided practice on weak blank types helps before the next mock.";
    }
  }
  if (metaResultEl) {
    metaResultEl.textContent = `Time used: ${formatTime(usedSeconds)} of 12:00 · Answered ${state.answers.size}/${total}`;
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
                <span class="result-miss-tag">Blank ${escapeHtml(item.blankLabel)}</span>
              </div>
              <p class="result-miss-stem">${escapeHtml(stemForQuestion(item))}</p>
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

  if (window.ToeicProgress?.recordPart6Session) {
    try {
      window.ToeicProgress.recordPart6Session({
        mode: "mock",
        correct: correctCount,
        total: state.questions.length,
        questionIds: state.questions.map((item) => item.id),
        passageIds: state.passages.map((p) => p.id),
        durationSeconds: usedSeconds,
        timedOut: auto,
        items: answered.map(({ item, correct }) => ({
          questionId: item.id,
          skill: item.skill || item.blankType || "Part 6",
          subskill: item.blankType || "",
          correct,
          prompt: stemForQuestion(item),
          part: 6,
        })),
      });
    } catch (error) {
      console.error("[TOEIC] Failed to save Part 6 mock session.", error);
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
    setStatus("Ready for another Part 6 mock when you are.");
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
  setStatus("Loading Part 6 mock bank…");
  if (beginBtn) beginBtn.disabled = true;

  try {
    state.bank = await loadBank();
    setStatus(
      `Mock bank ready · ${state.bank.length} passages · ${PASSAGES_PER_MOCK}×${QUESTIONS_PER_PASSAGE} = ${MOCK_SIZE}Q / 12 min · free intro excluded`
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
    title: "Part 6 mock is protected",
    body: "Timed Part 6 mocks are for Teacher Israel Ventura’s class groups. Enter the class code your teacher gave you. The fixed free passage stays open on the Part 6 free practice page without a code.",
    secondaryHref: "part6-practice.html",
    secondaryLabel: "Back to free Part 6 practice",
    onUnlocked: bootMock,
  });
} else {
  bootMock();
}
