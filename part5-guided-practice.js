/**
 * Part 5 guided practice
 * Loads part5-bank.json (never the 10 free intro items).
 * 15 questions, no timer, balanced by skill, session saved to localStorage.
 */

const BANK_URL = "data/part5-bank.json";
const INTRO_URL = "data/part5-intro.json";
const PRACTICE_SIZE = 15;

const guidedState = {
  index: 0,
  answers: new Map(),
  questions: [],
  bank: [],
  sessionNumber: 1,
  ready: false,
  savedForSession: false,
};

const questionEl = document.querySelector("[data-question]");
const metaEl = document.querySelector("[data-question-meta]");
const optionsEl = document.querySelector("[data-options]");
const feedbackEl = document.querySelector("[data-feedback]");
const counterEl = document.querySelector("[data-counter]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const scoreEl = document.querySelector("[data-score]");
const progressBarEl = document.querySelector("[data-progress-bar]");
const resultsEl = document.querySelector("[data-results]");
const finalScoreEl = document.querySelector("[data-final-score]");
const finalNoteEl = document.querySelector("[data-final-note]");
const resultMessageEl = document.querySelector("[data-result-message]");
const studyFocusEl = document.querySelector("[data-study-focus]");
const mistakesEl = document.querySelector("[data-mistakes]");
const sessionLabelEl = document.querySelector("[data-session-label]");
const newPracticeBtn = document.querySelector("[data-new-practice]");
const newPracticeResultBtn = document.querySelector("[data-new-practice-result]");
const statusEl = document.querySelector("[data-guided-status]");

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
  if (window.ToeicProgress && typeof window.ToeicProgress.normalizeSkill === "function") {
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
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
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

function buildBalancedPractice(bank, size) {
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

  if (!bankRes.ok) {
    throw new Error(`Could not load ${BANK_URL} (${bankRes.status}).`);
  }

  const bankData = await bankRes.json();
  const rawItems = Array.isArray(bankData) ? bankData : bankData.items;
  if (!rawItems || !rawItems.length) {
    throw new Error("Part 5 bank is empty.");
  }

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

  if (items.length < PRACTICE_SIZE) {
    throw new Error(
      `Practice bank too small after excluding free intro items (${items.length}).`
    );
  }

  return items;
}

function startPractice() {
  if (!guidedState.bank.length) return;

  guidedState.index = 0;
  guidedState.answers = new Map();
  guidedState.savedForSession = false;
  guidedState.questions = buildBalancedPractice(guidedState.bank, PRACTICE_SIZE);
  if (sessionLabelEl) {
    sessionLabelEl.textContent = `Random set ${guidedState.sessionNumber} · ${guidedState.questions.length} of ${guidedState.bank.length} bank items · no timer`;
  }
  if (resultsEl) resultsEl.hidden = true;
  if (studyFocusEl) studyFocusEl.innerHTML = "";
  if (mistakesEl) mistakesEl.innerHTML = "";
  renderQuestion();
}

function renderQuestion() {
  const item = guidedState.questions[guidedState.index];
  if (!item) return;

  const answer = guidedState.answers.get(item.id);
  const answeredCount = guidedState.answers.size;

  counterEl.textContent = `${guidedState.index + 1} / ${guidedState.questions.length}`;
  metaEl.textContent = item.subskill
    ? `${normalizeSkill(item.skill)} · ${item.subskill}`
    : normalizeSkill(item.skill);
  questionEl.textContent = item.question;
  if (progressBarEl) {
    progressBarEl.style.width = `${Math.round(
      (answeredCount / guidedState.questions.length) * 100
    )}%`;
  }

  optionsEl.innerHTML = "";
  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.innerHTML = `<b>${escapeHtml(option.key)}</b><span>${escapeHtml(option.text)}</span>`;

    if (answer) {
      button.classList.add("is-locked");
      button.setAttribute("aria-disabled", "true");
      if (option.key === item.correctKey) button.classList.add("correct");
      if (option.key === answer.selectedKey && !answer.correct) {
        button.classList.add("incorrect");
      }
    } else {
      button.addEventListener("click", () => chooseAnswer(item, option));
    }

    optionsEl.appendChild(button);
  });

  renderFeedback(item);
  prevBtn.disabled = guidedState.index === 0;
  nextBtn.textContent =
    guidedState.index === guidedState.questions.length - 1 ? "View results" : "Next";
  updateScore();
}

function chooseAnswer(item, option) {
  if (guidedState.answers.has(item.id)) return;
  guidedState.answers.set(item.id, {
    selectedKey: option.key,
    correct: option.key === item.correctKey,
  });
  renderQuestion();
}

function renderFeedback(item) {
  const answer = guidedState.answers.get(item.id);
  if (!answer) {
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = "";
    return;
  }

  feedbackEl.hidden = false;
  feedbackEl.className = `practice-feedback ${
    answer.correct ? "is-correct" : "is-incorrect"
  }`;

  const trap =
    !answer.correct && item.commonMistake
      ? `<p class="feedback-trap"><small>Common trap: ${escapeHtml(item.commonMistake)}</small></p>`
      : "";

  feedbackEl.innerHTML = `
    <strong>${answer.correct ? "Correct" : "Incorrect"}</strong>
    <p>The correct answer is <b>${escapeHtml(item.correctKey)}. ${escapeHtml(item.correctAnswer)}</b></p>
    <p>${escapeHtml(item.explanation)}</p>
    ${trap}
  `;
}

function updateScore() {
  const answered = [...guidedState.answers.values()];
  const correct = answered.filter((entry) => entry.correct).length;
  scoreEl.textContent = `${correct}/${answered.length || 0} correct`;
}

function persistSession(answered) {
  if (guidedState.savedForSession) return;
  if (!window.ToeicProgress || typeof window.ToeicProgress.recordPart5Session !== "function") {
    console.warn("[TOEIC] ToeicProgress missing — Part 5 session not saved.");
    setStatus("Results shown, but progress could not be saved on this device.", true);
    return;
  }

  const correctCount = answered.filter((entry) => entry.answer?.correct).length;
  const payload = {
    mode: "guided",
    correct: correctCount,
    total: guidedState.questions.length,
    questionIds: guidedState.questions.map((item) => item.id),
    items: answered.map(({ item, answer }) => ({
      questionId: item.id,
      skill: item.skill || item.subskill || "Part 5",
      subskill: item.subskill || "",
      correct: Boolean(answer?.correct),
      prompt: item.question,
      part: 5,
    })),
  };

  try {
    const record = window.ToeicProgress.recordPart5Session(payload);
    guidedState.savedForSession = true;
    const skillCount = record?.skills ? Object.keys(record.skills).length : 0;
    console.info("[TOEIC] Part 5 session saved", record);
    setStatus(
      `Saved to this device · ${correctCount}/${payload.total} · ${skillCount} skill${
        skillCount === 1 ? "" : "s"
      }. Open Dashboard to see progress.`
    );
  } catch (error) {
    console.error("[TOEIC] Failed to save Part 5 session.", error);
    setStatus("Could not save progress on this device (storage blocked or full).", true);
  }
}

function paintResults(correctCount, total, studyRows, misses) {
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  if (finalScoreEl) finalScoreEl.textContent = `${correctCount}/${total}`;
  if (finalNoteEl) finalNoteEl.textContent = `${percent}% · no timer`;
  if (resultMessageEl) {
    resultMessageEl.hidden = false;
    resultMessageEl.textContent =
      percent >= 80
        ? "Strong session. Keep rotating skills so the weaker patterns do not hide."
        : percent >= 60
          ? "Solid. Review the misses below, then run another 15."
          : "Use the explanations. One pattern at a time is enough.";
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

  if (studyFocusEl) {
    if (!ranked.length) {
      studyFocusEl.innerHTML = "";
    } else {
      studyFocusEl.innerHTML = `
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
      mistakesEl.innerHTML = `<div class="empty-review">No misses this round. Start a new set to keep the patterns fresh.</div>`;
    } else {
      mistakesEl.innerHTML = `
        <div class="result-misses-head">
          <strong>Missed items</strong>
          <span>${misses.length}</span>
        </div>
        <div class="result-miss-list">
          ${misses
            .map(
              ({ item, answer }, index) => `
            <article class="result-miss">
              <div class="result-miss-top">
                <span class="result-miss-num">${index + 1}</span>
                <span class="result-miss-tag">${escapeHtml(
                  [normalizeSkill(item.skill), item.subskill].filter(Boolean).join(" · ")
                )}</span>
              </div>
              <p class="result-miss-stem">${escapeHtml(item.question)}</p>
              <p class="result-miss-keys">Yours: <b>${escapeHtml(
                answer.selectedKey
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

function renderResults() {
  const answered = guidedState.questions.map((item) => ({
    item,
    answer: guidedState.answers.get(item.id),
  }));

  const unanswered = answered.filter((entry) => !entry.answer).length;
  if (unanswered > 0) {
    setStatus(
      `Answer all ${guidedState.questions.length} questions before viewing results. (${unanswered} left)`,
      true
    );
    return;
  }

  setStatus("");
  persistSession(answered);

  const correctCount = answered.filter((entry) => entry.answer?.correct).length;
  const misses = answered.filter((entry) => entry.answer && !entry.answer.correct);
  const studyRows = answered.map(({ item, answer }) => ({
    skill: normalizeSkill(item.skill),
    correct: Boolean(answer?.correct),
  }));

  paintResults(correctCount, guidedState.questions.length, studyRows, misses);
  resultsEl.hidden = false;
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleNewPractice() {
  guidedState.sessionNumber += 1;
  startPractice();
  document
    .querySelector(".guided-practice-panel")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  prevBtn.addEventListener("click", () => {
    if (guidedState.index > 0) {
      guidedState.index -= 1;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (guidedState.index < guidedState.questions.length - 1) {
      guidedState.index += 1;
      renderQuestion();
      return;
    }
    renderResults();
  });

  newPracticeBtn?.addEventListener("click", handleNewPractice);
  newPracticeResultBtn?.addEventListener("click", handleNewPractice);
}

async function bootGuidedPractice() {
  setStatus("Loading Part 5 practice bank…");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    guidedState.bank = await loadBank();
    guidedState.ready = true;
    setStatus(
      `Class bank ready · ${guidedState.bank.length} items · sets of ${PRACTICE_SIZE} · free intro items excluded · no timer`
    );
    bindControls();
    startPractice();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  } catch (error) {
    console.error(error);
    guidedState.ready = false;
    setStatus(
      `Could not load the practice bank. Use GitHub Pages or a local server. ${error.message}`,
      true
    );
    if (questionEl) questionEl.textContent = "Practice unavailable until the bank loads.";
  }
}

if (window.ToeicAccess && typeof window.ToeicAccess.guardPage === "function") {
  window.ToeicAccess.guardPage({
    title: "Part 5 guided practice is protected",
    body: "This drill uses the full Part 5 bank for Teacher Israel Ventura’s classes. Enter the class code your teacher gave you. The 10 fixed free questions stay open on the Part 5 free practice page without a code.",
    secondaryHref: "part5-practice.html",
    secondaryLabel: "Back to free Part 5 practice",
    onUnlocked: bootGuidedPractice,
  });
} else {
  bootGuidedPractice();
}
