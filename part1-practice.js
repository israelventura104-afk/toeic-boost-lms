/**
 * Part 1 free intro practice (Photographs)
 * Single source of truth: data/part1-intro.json
 * Fixed order (no shuffle). No timer. Immediate feedback. No class code.
 */


function mediaKeyFromPath(path) {
  const m = String(path || "").match(/p1-0\d/);
  return m ? m[0] : "";
}

function resolveImageSrc(path) {
  const key = mediaKeyFromPath(path);
  const map = window.TOEIC_PART1_IMAGES;
  if (key && map && map[key]) return map[key];
  return path;
}

function resolveAudioSrc(path) {
  const key = mediaKeyFromPath(path);
  const map = window.TOEIC_PART1_AUDIO;
  if (key && map && map[key]) return map[key];
  return path;
}


function speakPart1Item(item) {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const lines = [];
  if (item.narratorScript) lines.push(item.narratorScript);
  (item.statements || item.options || []).forEach((st) => {
    const key = st.key || "";
    const text = st.text || "";
    lines.push(key ? `${key}. ${text}` : text);
  });
  let i = 0;
  const next = () => {
    if (i >= lines.length) return;
    const u = new SpeechSynthesisUtterance(lines[i]);
    u.lang = "en-US";
    u.rate = 0.92;
    i += 1;
    u.onend = () => setTimeout(next, 350);
    window.speechSynthesis.speak(u);
  };
  next();
  return true;
}

const INTRO_DATA_URL = "data/part1-intro.json";

const quizState = {
  index: 0,
  answers: new Map(),
  questions: [],
  ready: false,
  finished: false,
};

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
const photoEl = document.querySelector("[data-photo]");
const photoCreditEl = document.querySelector("[data-photo-credit]");
const audioEl = document.querySelector("[data-audio]");
const replayBtn = document.querySelector("[data-replay]");

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

function normalizeItem(raw) {
  const statements = Array.isArray(raw.statements)
    ? raw.statements
    : Array.isArray(raw.options)
      ? raw.options
      : [];

  const options = statements.map((option) => {
    if (typeof option === "string") {
      return { key: option, text: option };
    }
    return {
      key: String(option.key ?? "").trim(),
      text: String(option.text ?? option.key ?? "").trim(),
    };
  });

  const correctKey = String(raw.correctKey ?? "").trim();
  const correctFromOptions = options.find((option) => option.key === correctKey);

  return {
    id: String(raw.id ?? "").trim(),
    type: raw.type || "Photographs",
    skill: raw.skill || "Part 1",
    sceneType: raw.sceneType || "",
    image: String(raw.image ?? "").trim(),
    imageAlt: String(raw.imageAlt ?? "Part 1 photograph").trim(),
    imageCredit: String(raw.imageCredit ?? "").trim(),
    audio: String(raw.audio ?? "").trim(),
    useBrowserVoice: Boolean(raw.useBrowserVoice) || !String(raw.audio ?? "").trim(),
    narratorScript: String(raw.narratorScript ?? "").trim(),
    statements: options,
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || correctFromOptions?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: raw.commonMistake || "",
  };
}

function validateQuestions(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Intro set is empty.");
  }

  items.forEach((item, index) => {
    if (!item.id) throw new Error(`Item ${index + 1} is missing id.`);
    if (!item.image) throw new Error(`Item ${item.id || index + 1} is missing image.`);
    // Free intro may use browser TTS when audio is empty.
    if (!item.audio && !item.useBrowserVoice) {
      throw new Error(`Item ${item.id || index + 1} is missing audio.`);
    }
    if (!item.options.length) throw new Error(`Item ${item.id} has no statements.`);
    if (item.options.length !== 4) {
      throw new Error(`Item ${item.id} must have exactly 4 statements (A–D).`);
    }
    if (!item.correctKey) throw new Error(`Item ${item.id} is missing correctKey.`);
    const keys = item.options.map((option) => option.key);
    if (!keys.includes(item.correctKey)) {
      throw new Error(`Item ${item.id}: correctKey "${item.correctKey}" is not in statements.`);
    }
  });

  const ids = items.map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Intro set has duplicate ids.");
  }
}

async function loadIntroQuestions() {
  const response = await fetch(INTRO_DATA_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${INTRO_DATA_URL} (${response.status}).`);
  }

  const data = await response.json();
  const rawItems = Array.isArray(data) ? data : data.items;
  if (!rawItems) {
    throw new Error("part1-intro.json must be an array or { items: [...] }.");
  }

  const items = rawItems.map(normalizeItem);
  validateQuestions(items);
  return items;
}

function stopAudio() {
  if (window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
  }
  if (!audioEl) return;
  try {
    audioEl.pause();
    audioEl.currentTime = 0;
  } catch (e) {
    /* ignore */
  }
}

function loadMedia(item) {
  if (photoEl) {
    photoEl.src = resolveImageSrc(item.image);
    photoEl.alt = item.imageAlt || "Part 1 photograph";
  }
  if (photoCreditEl) {
    if (item.imageCredit) {
      photoCreditEl.hidden = false;
      photoCreditEl.textContent = item.imageCredit;
    } else {
      photoCreditEl.hidden = true;
      photoCreditEl.textContent = "";
    }
  }
  if (audioEl) {
    stopAudio();
    if (item.useBrowserVoice || !item.audio) {
      audioEl.removeAttribute("src");
      try { audioEl.load(); } catch (e) { /* ignore */ }
      // Browser voice starts on Play / replay (user gesture required).
    } else {
      const audioSrc = resolveAudioSrc(item.audio);
      if (audioEl.getAttribute("src") !== audioSrc) {
        audioEl.src = audioSrc;
        audioEl.load();
      }
    }
  }
}

function replayAudio() {
  const item = quizState.questions[quizState.index];
  if (!item) return;
  stopAudio();
  if (item.useBrowserVoice || !item.audio) {
    speakPart1Item(item);
    return;
  }
  if (!audioEl || !audioEl.src) return;
  try {
    audioEl.currentTime = 0;
    const playPromise = audioEl.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  } catch (e) {
    /* ignore */
  }
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

function renderQuestion() {
  if (!quizState.ready || !quizState.questions.length) return;

  const item = quizState.questions[quizState.index];
  if (!item) return;

  const answer = quizState.answers.get(item.id);
  const total = quizState.questions.length;

  counterEl.textContent = `${quizState.index + 1} / ${total}`;
  if (metaEl) {
    const bits = [item.skill, item.sceneType].filter(Boolean);
    metaEl.textContent = bits.length ? bits.join(" · ") : "";
    metaEl.hidden = !bits.length;
  }

  loadMedia(item);

  if (questionEl) {
    questionEl.textContent =
      "Look at the picture. Listen to the four statements. Choose the best answer.";
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
      <div class="empty-review"><p>You answered every item correctly in this set.</p></div>
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
            <span class="result-miss-tag">Part 1</span>
          </div>
          <p class="result-miss-stem">${escapeHtml(item.imageAlt || item.id)}</p>
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
  stopAudio();
  setStatus(`Free practice complete · ${correct}/${total} (${percent}%).`);
  updateNav();
  updateScore();
  counterEl.textContent = `${total} / ${total}`;

  if (practiceCardEl) practiceCardEl.hidden = true;
  if (resultsEl) {
    resultsEl.hidden = false;
    if (resultMessageEl) {
      resultMessageEl.textContent =
        percent >= 80
          ? "Strong start on Photographs. Review any misses below, then return to the Listening hub when you are ready."
          : "Good effort. Review each miss below before you try the set again.";
    }
    if (finalScoreEl) finalScoreEl.textContent = `${correct}/${total}`;
    if (finalNoteEl) finalNoteEl.textContent = `${percent}% · same 3 items`;
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
    `Fixed set · ${quizState.questions.length} photographs · same order every time · no timer`
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
  stopAudio();
  quizState.index += 1;
  renderQuestion();
}

function goPrev() {
  if (quizState.finished) return;
  if (quizState.index > 0) {
    setStatus("");
    stopAudio();
    quizState.index -= 1;
    renderQuestion();
  }
}

function bindControls() {
  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
  restartBtn?.addEventListener("click", restartPractice);
  replayBtn?.addEventListener("click", replayAudio);
}

async function init() {
  setStatus("Loading the fixed practice set…");
  if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "true");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    const questions = await loadIntroQuestions();
    quizState.questions = questions;
    quizState.ready = true;
    setStatus(
      `Fixed set · ${questions.length} photographs · same order every time · no timer`
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
    if (questionEl) {
      questionEl.textContent = "Practice unavailable until the question bank loads.";
    }
    if (metaEl) metaEl.textContent = "";
    optionsEl.innerHTML = "";
    counterEl.textContent = "— / —";
    scoreEl.textContent = "0/0 correct";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

init();
