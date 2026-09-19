/**
 * Part 6 free intro practice
 * Single source of truth: data/part6-intro.json
 * Fixed order (no shuffle). No timer. Immediate feedback. No class code.
 * Product rule: do not show grammar-point / blankType titles at top.
 */

const INTRO_DATA_URL = "data/part6-intro.json";

const quizState = {
  index: 0,
  answers: new Map(),
  passage: null,
  questions: [],
  ready: false,
  finished: false,
};

const passageEl = document.querySelector("[data-passage]");
const passageMetaEl = document.querySelector("[data-passage-meta]");
const passageTitleEl = document.querySelector("[data-passage-title]");
const passageBodyEl = document.querySelector("[data-passage-body]");
const questionEl = document.querySelector("[data-question]");
const metaEl = document.querySelector("[data-question-meta]");
const optionsEl = document.querySelector("[data-options]");
const feedbackEl = document.querySelector("[data-feedback]");
const resultsEl = document.querySelector("[data-results]");
const mistakesEl = document.querySelector("[data-mistakes]");
const resultMessageEl = document.querySelector("[data-result-message]");
const finalScoreEl = document.querySelector("[data-final-score]");
const finalNoteEl = document.querySelector("[data-final-note]");
const restartBtn = document.querySelector("[data-restart]");
const counterEl = document.querySelector("[data-counter]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const scoreEl = document.querySelector("[data-score]");
const statusEl = document.querySelector("[data-practice-status]");
const practiceCardEl = document.querySelector("[data-practice-card]");

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

function normalizeQuestion(raw) {
  const options = Array.isArray(raw.options)
    ? raw.options.map((option) => {
        if (typeof option === "string") {
          return { key: option, text: option };
        }
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
  };
}

function validatePassage(passage) {
  if (!passage || !passage.id) throw new Error("Intro passage is missing id.");
  if (!Array.isArray(passage.text) || !passage.text.length) {
    throw new Error("Intro passage has no text paragraphs.");
  }
  if (!Array.isArray(passage.questions) || passage.questions.length === 0) {
    throw new Error("Intro passage has no questions.");
  }

  const body = passage.text.map((p) => p.content || "").join("\n");
  passage.questions.forEach((item, index) => {
    if (!item.id) throw new Error(`Question ${index + 1} is missing id.`);
    if (!item.blankLabel) throw new Error(`Question ${item.id} is missing blankLabel.`);
    const markerA = `[[${item.blankLabel}]]`;
    const markerB = `_____${item.blankLabel}_____`;
    if (!body.includes(markerA) && !body.includes(markerB)) {
      throw new Error(`Blank marker for ${item.blankLabel} not found in passage text.`);
    }
    if (!item.options.length) throw new Error(`Question ${item.id} has no options.`);
    if (!item.correctKey) throw new Error(`Question ${item.id} is missing correctKey.`);
    const keys = item.options.map((option) => option.key);
    if (!keys.includes(item.correctKey)) {
      throw new Error(`Question ${item.id}: correctKey "${item.correctKey}" is not in options.`);
    }
  });

  const ids = passage.questions.map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Intro set has duplicate question ids.");
  }
}

async function loadIntroPassage() {
  const response = await fetch(INTRO_DATA_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${INTRO_DATA_URL} (${response.status}).`);
  }

  const data = await response.json();
  const rawPassage = Array.isArray(data.passages) ? data.passages[0] : data;
  if (!rawPassage) {
    throw new Error("part6-intro.json must include passages[0] or a passage object.");
  }

  const passage = {
    id: String(rawPassage.id ?? "").trim(),
    genre: rawPassage.genre || "",
    title: rawPassage.title || "Passage",
    workplaceTopic: rawPassage.workplaceTopic || "",
    text: Array.isArray(rawPassage.text) ? rawPassage.text : [],
    questions: (rawPassage.questions || []).map(normalizeQuestion),
  };

  validatePassage(passage);
  return passage;
}

function formatPassageHtml(passage, activeBlankLabel) {
  const paragraphs = passage.text
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
  return paragraphs;
}

function renderPassage(activeBlankLabel) {
  if (!quizState.passage) return;
  const p = quizState.passage;
  if (passageMetaEl) {
    const bits = [p.genre, p.workplaceTopic].filter(Boolean);
    passageMetaEl.textContent = bits.length ? bits.join(" · ") : "Workplace text";
  }
  if (passageTitleEl) passageTitleEl.textContent = p.title || "Passage";
  if (passageBodyEl) passageBodyEl.innerHTML = formatPassageHtml(p, activeBlankLabel);
}

function updateNav() {
  const total = quizState.questions.length;
  const atStart = quizState.index <= 0;
  const atEnd = quizState.index >= total - 1;
  const item = quizState.questions[quizState.index];
  const answered = item ? quizState.answers.has(item.id) : false;

  prevBtn.disabled = atStart || quizState.finished;
  nextBtn.disabled = false;

  if (quizState.finished) {
    nextBtn.textContent = "Restart";
    prevBtn.disabled = true;
    return;
  }

  nextBtn.textContent = atEnd && answered ? "Finish" : "Next";
}

function stemForQuestion(item) {
  if (item.question && item.question.trim()) {
    return item.question.trim();
  }
  return `Select the best option for the highlighted blank.`;
}

function renderQuestion() {
  if (!quizState.ready || !quizState.questions.length) return;

  const item = quizState.questions[quizState.index];
  if (!item) return;

  const answer = quizState.answers.get(item.id);
  const total = quizState.questions.length;

  counterEl.textContent = `${quizState.index + 1} / ${total}`;
  if (metaEl) {
    metaEl.textContent = "";
    metaEl.hidden = true;
  }

  renderPassage(item.blankLabel);
  questionEl.textContent = stemForQuestion(item);

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
  updateNav();
  updateScore();

  if (answer && feedbackEl) {
    feedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function chooseAnswer(item, option) {
  if (quizState.finished) return;
  if (quizState.answers.has(item.id)) return;

  quizState.answers.set(item.id, {
    selectedKey: option.key,
    correct: option.key === item.correctKey,
  });
  setStatus("");
  renderQuestion();
}

function renderFeedback(item) {
  const answer = quizState.answers.get(item.id);
  if (!answer) {
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = "";
    return;
  }

  feedbackEl.hidden = false;
  feedbackEl.className = `practice-feedback ${
    answer.correct ? "is-correct" : "is-incorrect"
  }`;

  const mistakeLine =
    !answer.correct && item.commonMistake
      ? `<p class="feedback-trap"><small>Common trap: ${escapeHtml(item.commonMistake)}</small></p>`
      : "";

  feedbackEl.innerHTML = `
    <strong>${answer.correct ? "Correct" : "Incorrect"}</strong>
    <p>The correct answer is <b>${escapeHtml(item.correctKey)}. ${escapeHtml(item.correctAnswer)}</b></p>
    <p>${escapeHtml(item.explanation)}</p>
    ${mistakeLine}
  `;
}

function updateScore() {
  const answered = [...quizState.answers.values()];
  const correct = answered.filter((entry) => entry.correct).length;
  scoreEl.textContent = `${correct}/${answered.length || 0} correct`;
}

function paintMistakes() {
  if (!mistakesEl) return;
  const misses = quizState.questions
    .map((item) => ({ item, answer: quizState.answers.get(item.id) }))
    .filter(({ answer }) => answer && !answer.correct);

  if (!misses.length) {
    mistakesEl.innerHTML = `
      <div class="result-misses-head">
        <p class="eyebrow">Mistakes</p>
        <strong>None — clean run</strong>
      </div>
      <div class="empty-review"><p>You answered every blank correctly in this passage.</p></div>
    `;
    return;
  }

  mistakesEl.innerHTML = `
    <div class="result-misses-head">
      <p class="eyebrow">Review mistakes</p>
      <strong>${misses.length} to review</strong>
    </div>
    <div class="result-miss-list">
      ${misses
        .map(
          ({ item, answer }, i) => `
        <article class="result-miss">
          <div class="result-miss-top">
            <span class="result-miss-num">${i + 1}</span>
            <span class="result-miss-tag">Blank ${escapeHtml(item.blankLabel)}</span>
          </div>
          <p class="result-miss-stem">${escapeHtml(stemForQuestion(item))}</p>
          <p class="result-miss-keys">
            Yours: <b>${escapeHtml(answer.selectedKey || "—")}</b>
            · Correct: <b>${escapeHtml(item.correctKey)}. ${escapeHtml(item.correctAnswer)}</b>
          </p>
          ${
            item.explanation
              ? `<details class="result-miss-why"><summary>Why</summary><p>${escapeHtml(
                  item.explanation
                )}</p></details>`
              : ""
          }
        </article>`
        )
        .join("")}
    </div>
  `;
}

function showFinished() {
  const total = quizState.questions.length;
  const answered = [...quizState.answers.values()];
  const correct = answered.filter((entry) => entry.correct).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;

  quizState.finished = true;
  setStatus(`Free practice complete · ${correct}/${total} (${percent}%).`);
  updateNav();
  updateScore();
  counterEl.textContent = `${total} / ${total}`;

  if (practiceCardEl) practiceCardEl.hidden = true;
  if (resultsEl) {
    resultsEl.hidden = false;
    if (resultMessageEl) {
      resultMessageEl.textContent =
        percent >= 75
          ? "Strong start on Text Completion. Review any misses below, then return to the Reading hub."
          : "Good effort. Review each miss below — Part 6 rewards reading the whole passage, not just the blank.";
    }
    if (finalScoreEl) finalScoreEl.textContent = `${correct}/${total}`;
    if (finalNoteEl) finalNoteEl.textContent = `${percent}% · same 4 blanks`;
    paintMistakes();
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function restartPractice() {
  quizState.index = 0;
  quizState.answers = new Map();
  quizState.finished = false;
  if (resultsEl) resultsEl.hidden = true;
  if (practiceCardEl) practiceCardEl.hidden = false;
  setStatus(
    `Fixed passage · ${quizState.questions.length} blanks · same order every time · no timer`
  );
  renderQuestion();
  practiceCardEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goNext() {
  if (!quizState.ready || !quizState.questions.length) return;

  if (quizState.finished) {
    restartPractice();
    return;
  }

  const item = quizState.questions[quizState.index];
  if (!quizState.answers.has(item.id)) {
    setStatus("Choose an answer first, then tap Next.", true);
    return;
  }

  if (quizState.index >= quizState.questions.length - 1) {
    showFinished();
    return;
  }

  setStatus("");
  quizState.index += 1;
  renderQuestion();
}

function goPrev() {
  if (quizState.finished) return;
  if (quizState.index > 0) {
    setStatus("");
    quizState.index -= 1;
    renderQuestion();
  }
}

function bindControls() {
  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
  restartBtn?.addEventListener("click", restartPractice);
}

async function init() {
  setStatus("Loading the fixed Part 6 passage…");
  if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "true");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    const passage = await loadIntroPassage();
    quizState.passage = passage;
    quizState.questions = passage.questions;
    quizState.ready = true;
    setStatus(
      `Fixed passage · ${passage.questions.length} blanks · same order every time · no timer`
    );
    if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "false");
    bindControls();
    nextBtn.disabled = false;
    prevBtn.disabled = false;
    renderQuestion();
  } catch (error) {
    console.error(error);
    quizState.ready = false;
    setStatus(
      `Could not load the fixed practice set. Open this page via a local server or GitHub Pages (not as a raw file). ${error.message}`,
      true
    );
    if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "false");
    if (passageTitleEl) passageTitleEl.textContent = "Practice unavailable";
    if (passageBodyEl) passageBodyEl.innerHTML = "";
    questionEl.textContent = "Practice unavailable until the passage bank loads.";
    if (metaEl) metaEl.textContent = "";
    optionsEl.innerHTML = "";
    counterEl.textContent = "— / —";
    scoreEl.textContent = "0/0 correct";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

init();
