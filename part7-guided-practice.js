/**
 * Part 7 guided practice
 * Loads data/part7-bank.json only (never the free intro).
 * Each session: 2 random sets — prefer 1 single + 1 multi (double/triple);
 * fall back to 2 singles. Flat Q navigation; passages switch with active set.
 * No timer. Immediate feedback. Hide skill / questionType titles.
 * Session saved via ToeicProgress.recordPart7Session when available.
 */

const BANK_URL = "data/part7-bank.json";
const SETS_PER_SESSION = 2;

const guidedState = {
  index: 0,
  answers: new Map(),
  questions: [],
  sets: [],
  bank: [],
  sessionNumber: 1,
  lastPairKey: "",
  ready: false,
  savedForSession: false,
};

const passagesEl = document.querySelector("[data-passages]");
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
const practicePanelEl = document.querySelector(".guided-practice-panel");

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
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function pairKey(sets) {
  return sets
    .map((s) => s.id)
    .sort()
    .join("|");
}

function isMulti(set) {
  return set.setType === "double" || set.setType === "triple";
}

/**
 * Prefer 1 single + 1 multi when possible; else 2 singles.
 * Avoid repeating the exact same pair of set IDs when possible.
 */
function pickSets(bank) {
  if (bank.length < SETS_PER_SESSION) {
    throw new Error(`Need at least ${SETS_PER_SESSION} sets in the bank.`);
  }

  const singles = bank.filter((s) => s.setType === "single");
  const multis = bank.filter(isMulti);
  const canMix = singles.length >= 1 && multis.length >= 1;

  let chosen = null;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    let candidate;
    if (canMix) {
      const single = shuffle(singles)[0];
      const multi = shuffle(multis)[0];
      candidate = Math.random() < 0.5 ? [single, multi] : [multi, single];
    } else {
      const pool = singles.length >= SETS_PER_SESSION ? singles : bank;
      candidate = shuffle(pool).slice(0, SETS_PER_SESSION);
    }
    const key = pairKey(candidate);
    if (key !== guidedState.lastPairKey || bank.length <= SETS_PER_SESSION) {
      chosen = candidate;
      guidedState.lastPairKey = key;
      break;
    }
  }

  if (!chosen) {
    if (canMix) {
      const single = shuffle(singles)[0];
      const multi = shuffle(multis)[0];
      chosen = [single, multi];
    } else {
      const pool = singles.length >= SETS_PER_SESSION ? singles : bank;
      chosen = shuffle(pool).slice(0, SETS_PER_SESSION);
    }
    guidedState.lastPairKey = pairKey(chosen);
  }

  return chosen;
}

function flattenQuestions(sets) {
  // Keep each set’s questions in authored bank order (no shuffle within set).
  const items = [];
  sets.forEach((set) => {
    set.questions.forEach((q) => items.push(q));
  });
  return items;
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

  // Never include free intro (intro lives in part7-intro.json; bank is class-only).
  const classSets = sets.filter(
    (s) => s.id && !String(s.id).toUpperCase().includes("INTRO")
  );

  if (classSets.length < SETS_PER_SESSION) {
    throw new Error(
      `Practice bank too small (${classSets.length} sets after filters).`
    );
  }

  return classSets;
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
  return guidedState.sets.find((s) => s.id === item.setId) || null;
}

function renderPassages(item) {
  const set = setForQuestion(item);
  if (!set || !passagesEl) return;

  const multi = set.passages.length > 1;
  const setIndex =
    guidedState.sets.findIndex((s) => s.id === set.id) + 1;
  const setPrefix =
    guidedState.sets.length > 1
      ? `Set ${setIndex} of ${guidedState.sets.length}`
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

function startPractice() {
  if (!guidedState.bank.length) return;

  guidedState.index = 0;
  guidedState.answers = new Map();
  guidedState.savedForSession = false;
  guidedState.sets = pickSets(guidedState.bank);
  guidedState.questions = flattenQuestions(guidedState.sets);

  if (sessionLabelEl) {
    const labels = guidedState.sets
      .map((s) => `${s.setType}: ${s.title}`)
      .join(" · ");
    sessionLabelEl.textContent = `Random set ${guidedState.sessionNumber} · ${guidedState.sets.length} sets · ${guidedState.questions.length} questions · no timer`;
    sessionLabelEl.title = labels;
  }
  if (resultsEl) resultsEl.hidden = true;
  if (studyFocusEl) studyFocusEl.innerHTML = "";
  if (mistakesEl) mistakesEl.innerHTML = "";
  if (practicePanelEl) practicePanelEl.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const item = guidedState.questions[guidedState.index];
  if (!item) return;

  const answer = guidedState.answers.get(item.id);
  const answeredCount = guidedState.answers.size;
  const total = guidedState.questions.length;

  counterEl.textContent = `${guidedState.index + 1} / ${total}`;
  if (metaEl) {
    metaEl.textContent = "";
    metaEl.hidden = true;
  }

  renderPassages(item);
  questionEl.textContent = item.question;

  if (progressBarEl) {
    progressBarEl.style.width = `${Math.round((answeredCount / total) * 100)}%`;
  }

  optionsEl.innerHTML = "";
  const longOptions = item.options.some((option) => option.text.length > 48);
  optionsEl.classList.toggle("is-sentence-options", longOptions);

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

  const correctCount = answered.filter((entry) => entry.answer?.correct).length;
  const payload = {
    mode: "guided",
    correct: correctCount,
    total: guidedState.questions.length,
    questionIds: guidedState.questions.map((item) => item.id),
    setIds: guidedState.sets.map((s) => s.id),
    items: answered.map(({ item, answer }) => ({
      questionId: item.id,
      skill: item.skill || item.questionType || "Part 7",
      subskill: item.questionType || "",
      correct: Boolean(answer?.correct),
      prompt: item.question,
      part: 7,
    })),
  };

  if (window.ToeicProgress && typeof window.ToeicProgress.recordPart7Session === "function") {
    try {
      const record = window.ToeicProgress.recordPart7Session(payload);
      guidedState.savedForSession = true;
      const skillCount = record?.skills ? Object.keys(record.skills).length : 0;
      console.info("[TOEIC] Part 7 session saved", record);
      setStatus(
        `Saved to this device · ${correctCount}/${payload.total} · ${skillCount} skill${
          skillCount === 1 ? "" : "s"
        }. Open Dashboard to see progress.`
      );
    } catch (error) {
      console.error("[TOEIC] Failed to save Part 7 session.", error);
      setStatus("Could not save progress on this device (storage blocked or full).", true);
    }
    return;
  }

  console.warn("[TOEIC] ToeicProgress.recordPart7Session missing — Part 7 session not saved.");
  setStatus("Results shown, but Part 7 progress could not be saved on this device.", true);
}

function paintResults(correctCount, total, studyRows, misses) {
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  if (finalScoreEl) finalScoreEl.textContent = `${correctCount}/${total}`;
  if (finalNoteEl) {
    finalNoteEl.textContent = `${percent}% · no timer · ${guidedState.sets.length} sets`;
  }
  if (resultMessageEl) {
    resultMessageEl.hidden = false;
    resultMessageEl.textContent =
      percent >= 80
        ? "Strong session. Keep mixing singles and multi passages so weaker question types do not hide."
        : percent >= 60
          ? "Solid. Review the misses below, then run another pair of sets."
          : "Use the explanations. Read the whole passage before you answer.";
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
          <strong>Review mistakes</strong>
          <span>${misses.length}</span>
        </div>
        <div class="result-miss-list">
          ${misses
            .map(
              ({ item, answer }, index) => `
            <article class="result-miss">
              <div class="result-miss-top">
                <span class="result-miss-num">${index + 1}</span>
                <span class="result-miss-tag">${escapeHtml(item.setType || "Q")}</span>
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
  if (practicePanelEl) practicePanelEl.hidden = true;
  resultsEl.hidden = false;
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleNewPractice() {
  guidedState.sessionNumber += 1;
  if (practicePanelEl) practicePanelEl.hidden = false;
  startPractice();
  practicePanelEl?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  setStatus("Loading Part 7 practice bank…");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    guidedState.bank = await loadBank();
    guidedState.ready = true;
    const multiCount = guidedState.bank.filter(isMulti).length;
    const singleCount = guidedState.bank.filter((s) => s.setType === "single").length;
    setStatus(
      `Class bank ready · ${guidedState.bank.length} sets (${singleCount} single · ${multiCount} multi) · ${SETS_PER_SESSION} per session · free intro excluded · no timer`
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
    if (passagesEl) {
      passagesEl.innerHTML = `
        <article class="reading-passage part7-passage">
          <h3>Practice unavailable</h3>
          <div class="part7-passage-body"></div>
        </article>`;
    }
    if (questionEl) questionEl.textContent = "Practice unavailable until the bank loads.";
  }
}

if (window.ToeicAccess && typeof window.ToeicAccess.guardPage === "function") {
  window.ToeicAccess.guardPage({
    title: "Part 7 guided practice is protected",
    body: "This drill uses the full Part 7 class bank for Teacher Israel Ventura’s classes. Enter the class code your teacher gave you. The fixed free passage stays open on the Part 7 free practice page without a code.",
    secondaryHref: "part7-practice.html",
    secondaryLabel: "Back to free Part 7 practice",
    onUnlocked: bootGuidedPractice,
  });
} else {
  bootGuidedPractice();
}
