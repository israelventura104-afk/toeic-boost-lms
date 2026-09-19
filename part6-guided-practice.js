/**
 * Part 6 guided practice
 * Loads data/part6-bank.json only (never the free intro).
 * Each session: 2 random passages = 8 questions in blank order.
 * No timer. Immediate feedback. Hide grammar-point / blankType titles.
 * Session saved via ToeicProgress.recordPart6Session when available.
 */

const BANK_URL = "data/part6-bank.json";
const PASSAGES_PER_SESSION = 2;
const QUESTIONS_PER_PASSAGE = 4;
const PRACTICE_SIZE = PASSAGES_PER_SESSION * QUESTIONS_PER_PASSAGE;

const guidedState = {
  index: 0,
  answers: new Map(),
  questions: [],
  passages: [],
  bank: [],
  sessionNumber: 1,
  lastPairKey: "",
  ready: false,
  savedForSession: false,
};

const passageMetaEl = document.querySelector("[data-passage-meta]");
const passageTitleEl = document.querySelector("[data-passage-title]");
const passageBodyEl = document.querySelector("[data-passage-body]");
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
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function pairKey(passages) {
  return passages
    .map((p) => p.id)
    .sort()
    .join("|");
}

function pickPassages(bank) {
  if (bank.length < PASSAGES_PER_SESSION) {
    throw new Error(`Need at least ${PASSAGES_PER_SESSION} passages in the bank.`);
  }

  let chosen = null;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const shuffled = shuffle(bank);
    const candidate = shuffled.slice(0, PASSAGES_PER_SESSION);
    const key = pairKey(candidate);
    if (key !== guidedState.lastPairKey || bank.length <= PASSAGES_PER_SESSION) {
      chosen = candidate;
      guidedState.lastPairKey = key;
      break;
    }
  }
  if (!chosen) {
    chosen = shuffle(bank).slice(0, PASSAGES_PER_SESSION);
    guidedState.lastPairKey = pairKey(chosen);
  }
  return chosen;
}

function flattenQuestions(passages) {
  // Keep each passage’s 4 questions together in bank blank order (no shuffle of blanks).
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

  if (classPassages.length < PASSAGES_PER_SESSION) {
    throw new Error(
      `Practice bank too small (${classPassages.length} passages after filters).`
    );
  }

  return classPassages;
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
  return guidedState.passages.find((p) => p.id === item.passageId) || null;
}

function renderPassage(item) {
  const passage = passageForQuestion(item);
  if (!passage) return;

  if (passageMetaEl) {
    const bits = [passage.genre, passage.workplaceTopic].filter(Boolean);
    const indexInSession =
      guidedState.passages.findIndex((p) => p.id === passage.id) + 1;
    const prefix =
      guidedState.passages.length > 1
        ? `Passage ${indexInSession} of ${guidedState.passages.length}`
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

function startPractice() {
  if (!guidedState.bank.length) return;

  guidedState.index = 0;
  guidedState.answers = new Map();
  guidedState.savedForSession = false;
  guidedState.passages = pickPassages(guidedState.bank);
  guidedState.questions = flattenQuestions(guidedState.passages);

  if (sessionLabelEl) {
    const titles = guidedState.passages.map((p) => p.title).join(" · ");
    sessionLabelEl.textContent = `Random set ${guidedState.sessionNumber} · ${guidedState.passages.length} passages · ${guidedState.questions.length} blanks · no timer`;
    sessionLabelEl.title = titles;
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

  renderPassage(item);
  questionEl.textContent = stemForQuestion(item);

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
    passageIds: guidedState.passages.map((p) => p.id),
    items: answered.map(({ item, answer }) => ({
      questionId: item.id,
      skill: item.skill || item.blankType || "Part 6",
      subskill: item.blankType || "",
      correct: Boolean(answer?.correct),
      prompt: stemForQuestion(item),
      part: 6,
    })),
  };

  if (window.ToeicProgress && typeof window.ToeicProgress.recordPart6Session === "function") {
    try {
      const record = window.ToeicProgress.recordPart6Session(payload);
      guidedState.savedForSession = true;
      const skillCount = record?.skills ? Object.keys(record.skills).length : 0;
      console.info("[TOEIC] Part 6 session saved", record);
      setStatus(
        `Saved to this device · ${correctCount}/${payload.total} · ${skillCount} skill${
          skillCount === 1 ? "" : "s"
        }. Open Dashboard to see progress.`
      );
    } catch (error) {
      console.error("[TOEIC] Failed to save Part 6 session.", error);
      setStatus("Could not save progress on this device (storage blocked or full).", true);
    }
    return;
  }

  // Fallback: do not break Part 5 if only recordPart5Session exists — skip save quietly.
  console.warn("[TOEIC] ToeicProgress.recordPart6Session missing — Part 6 session not saved.");
  setStatus("Results shown, but Part 6 progress could not be saved on this device.", true);
}

function paintResults(correctCount, total, studyRows, misses) {
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  if (finalScoreEl) finalScoreEl.textContent = `${correctCount}/${total}`;
  if (finalNoteEl) finalNoteEl.textContent = `${percent}% · no timer · 2 passages`;
  if (resultMessageEl) {
    resultMessageEl.hidden = false;
    resultMessageEl.textContent =
      percent >= 80
        ? "Strong session. Keep rotating passages so weaker blank types do not hide."
        : percent >= 60
          ? "Solid. Review the misses below, then run another pair of passages."
          : "Use the explanations. Read the whole passage before the blank.";
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
                <span class="result-miss-tag">Blank ${escapeHtml(item.blankLabel)}</span>
              </div>
              <p class="result-miss-stem">${escapeHtml(stemForQuestion(item))}</p>
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
  setStatus("Loading Part 6 practice bank…");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    guidedState.bank = await loadBank();
    guidedState.ready = true;
    setStatus(
      `Class bank ready · ${guidedState.bank.length} passages · ${PASSAGES_PER_SESSION} per session (${PRACTICE_SIZE} blanks) · free intro excluded · no timer`
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
    if (passageTitleEl) passageTitleEl.textContent = "Practice unavailable";
    if (passageBodyEl) passageBodyEl.innerHTML = "";
    if (questionEl) questionEl.textContent = "Practice unavailable until the bank loads.";
  }
}

if (window.ToeicAccess && typeof window.ToeicAccess.guardPage === "function") {
  window.ToeicAccess.guardPage({
    title: "Part 6 guided practice is protected",
    body: "This drill uses the full Part 6 class bank for Teacher Israel Ventura’s classes. Enter the class code your teacher gave you. The fixed free passage stays open on the Part 6 free practice page without a code.",
    secondaryHref: "part6-practice.html",
    secondaryLabel: "Back to free Part 6 practice",
    onUnlocked: bootGuidedPractice,
  });
} else {
  bootGuidedPractice();
}
