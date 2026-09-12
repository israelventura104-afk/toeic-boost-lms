/**
 * Short free demo test — Reading & Grammar snapshot (Part 5–7)
 * ~8 items. No class code. No timer.
 */

const CONFIG_URL = "data/demo-test.json";
const ITEMS_URL = "data/demo-items.json";

const state = {
  rows: [],
  index: 0,
  answers: new Map(),
  ready: false,
  phase: "start",
};

const statusEl = document.querySelector("[data-demo-status]");
const startPanel = document.querySelector("[data-demo-start]");
const examPanel = document.querySelector("[data-demo-exam]");
const resultsPanel = document.querySelector("[data-demo-results]");
const sectionEl = document.querySelector("[data-demo-section]");
const progressEl = document.querySelector("[data-demo-progress]");
const counterEl = document.querySelector("[data-demo-counter]");
const typeEl = document.querySelector("[data-demo-type]");
const metaEl = document.querySelector("[data-demo-meta]");
const questionEl = document.querySelector("[data-demo-question]");
const optionsEl = document.querySelector("[data-demo-options]");
const passageWrap = document.querySelector("[data-demo-passage-wrap]");
const passageTitleEl = document.querySelector("[data-demo-passage-title]");
const passageTextEl = document.querySelector("[data-demo-passage-text]");
const beginBtn = document.querySelector("[data-demo-begin]");
const prevBtn = document.querySelector("[data-demo-prev]");
const nextBtn = document.querySelector("[data-demo-next]");
const retryBtn = document.querySelector("[data-demo-retry]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function showPhase(phase) {
  state.phase = phase;
  startPanel.hidden = phase !== "start";
  examPanel.hidden = phase !== "exam";
  resultsPanel.hidden = phase !== "results";
  if (prevBtn) prevBtn.disabled = phase !== "exam" || state.index === 0;
  if (nextBtn) nextBtn.disabled = phase !== "exam";
}

function paragraphs(text) {
  return String(text || "")
    .split(/\n\s*\n/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeItem(raw) {
  const options = (raw.options || []).map((option) => ({
    key: String(option.key ?? "").trim(),
    text: String(option.text ?? "").trim(),
  }));
  const correctKey = String(raw.correctKey ?? "").trim();
  const hit = options.find((o) => o.key === correctKey);
  const part = Number(raw.part) || 5;
  return {
    uid: raw.id,
    part,
    sectionLabel: raw.partLabel || `Part ${part}`,
    skill: raw.skill || "Reading",
    prompt: raw.prompt || "",
    options,
    correctKey,
    correctAnswer: hit?.text || correctKey,
    explanation: raw.explanation || "",
    passageTitle: raw.passageTitle || "",
    passageText: raw.passageText || "",
    hasPassage: Boolean(raw.passageText),
  };
}

async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Could not load ${url}`);
  return res.json();
}

async function buildDemoRows() {
  const [config, bank] = await Promise.all([
    fetchJson(CONFIG_URL),
    fetchJson(ITEMS_URL),
  ]);
  const items = (bank.items || []).map(normalizeItem);
  if (!items.length) throw new Error("No demo items configured.");
  // Prefer config items_url order already in bank; config is metadata
  void config;
  return items;
}

function beginDemo() {
  if (!state.ready || !state.rows.length) {
    setStatus("Demo items are still loading. Please wait a moment.", true);
    return;
  }
  state.index = 0;
  state.answers = new Map();
  showPhase("exam");
  setStatus(`Demo running · ${state.rows.length} items · free · no timer`);
  renderItem();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderItem() {
  if (state.phase !== "exam") return;
  const row = state.rows[state.index];
  if (!row) return;
  const selected = state.answers.get(row.uid);

  sectionEl.textContent = row.sectionLabel;
  progressEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  counterEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  typeEl.textContent = row.sectionLabel;
  metaEl.textContent = row.skill;
  questionEl.textContent = row.prompt;

  const layoutEl = document.querySelector("[data-demo-layout]");
  if (row.hasPassage) {
    passageWrap.hidden = false;
    layoutEl?.classList.add("has-passage");
    passageTitleEl.textContent = row.passageTitle || "Passage";
    passageTextEl.innerHTML = paragraphs(row.passageText);
  } else {
    passageWrap.hidden = true;
    layoutEl?.classList.remove("has-passage");
  }

  optionsEl.innerHTML = "";
  row.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${selected === option.key ? " is-selected" : ""}`;
    button.innerHTML = `<b>${escapeHtml(option.key)}</b><span>${escapeHtml(option.text)}</span>`;
    button.addEventListener("click", () => {
      state.answers.set(row.uid, option.key);
      renderItem();
    });
    optionsEl.appendChild(button);
  });

  prevBtn.disabled = state.index === 0;
  nextBtn.disabled = false;
  nextBtn.textContent =
    state.index === state.rows.length - 1 ? "See my snapshot" : "Next";
}

function scoreByPart(part) {
  const rows = state.rows.filter((r) => r.part === part);
  let correct = 0;
  rows.forEach((row) => {
    if (state.answers.get(row.uid) === row.correctKey) correct += 1;
  });
  return {
    correct,
    total: rows.length,
    percent: rows.length ? Math.round((correct / rows.length) * 100) : 0,
  };
}

function finishDemo() {
  const unanswered = state.rows.filter((row) => !state.answers.has(row.uid)).length;
  if (unanswered > 0) {
    const ok = window.confirm(
      `You still have ${unanswered} unanswered item(s). See your snapshot anyway?`
    );
    if (!ok) return;
  }

  const part5 = scoreByPart(5);
  const part6 = scoreByPart(6);
  const part7 = scoreByPart(7);
  const totalCorrect = part5.correct + part6.correct + part7.correct;
  const total = part5.total + part6.total + part7.total;
  const percent = total ? Math.round((totalCorrect / total) * 100) : 0;

  const items = state.rows.map((row) => ({
    questionId: row.uid,
    skill: row.skill,
    part: row.part,
    correct: state.answers.get(row.uid) === row.correctKey,
    prompt: row.prompt,
  }));

  if (window.ToeicProgress) {
    window.ToeicProgress.recordDemoSession({
      correct: totalCorrect,
      total,
      items,
      byPart: { part5, part6, part7 },
    });
  }

  const messageEl = document.querySelector("[data-demo-result-message]");
  const totalEl = document.querySelector("[data-demo-total]");
  const noteEl = document.querySelector("[data-demo-total-note]");
  if (totalEl) totalEl.textContent = `${totalCorrect}/${total}`;
  if (noteEl) noteEl.textContent = `${percent}% correct`;
  if (messageEl) {
    messageEl.textContent =
      percent >= 80
        ? "Strong snapshot — keep building with class practice when your teacher opens it."
        : percent >= 60
          ? "Solid start. Review the misses below, then try again or open your dashboard."
          : "Good first look. Study the explanations, then retry the demo.";
  }

  const studyEl = document.querySelector("[data-demo-study-focus]");
  if (studyEl) {
    const parts = [
      { label: "Part 5", ...part5 },
      { label: "Part 6", ...part6 },
      { label: "Part 7", ...part7 },
    ].filter((p) => p.total > 0);
    const weak = [...parts].sort((a, b) => a.percent - b.percent)[0];
    studyEl.innerHTML = `
      <p class="eyebrow">What to study</p>
      <ul class="result-study-list">
        ${parts
          .map(
            (p) => `
          <li>
            <strong>${escapeHtml(p.label)}</strong>
            <span>${p.correct}/${p.total} · ${p.percent}%</span>
          </li>`
          )
          .join("")}
      </ul>
      <p class="result-study-line" style="margin-top:0.75rem">
        ${
          weak && weak.percent < 100
            ? `Focus next: <strong>${escapeHtml(weak.label)}</strong>.`
            : "Nice work across all parts in this snapshot."
        }
      </p>
    `;
  }

  const mistakesEl = document.querySelector("[data-demo-mistakes]");
  if (mistakesEl) {
    const misses = state.rows.filter(
      (row) => state.answers.get(row.uid) !== row.correctKey
    );
    if (!misses.length) {
      mistakesEl.innerHTML = `
        <div class="result-misses-head">
          <p class="eyebrow">Mistakes</p>
          <strong>None — clean run</strong>
        </div>
        <div class="empty-review"><p>You answered every item correctly in this demo.</p></div>
      `;
    } else {
      mistakesEl.innerHTML = `
        <div class="result-misses-head">
          <p class="eyebrow">Review mistakes</p>
          <strong>${misses.length} to review</strong>
        </div>
        <div class="result-miss-list">
          ${misses
            .map((row, i) => {
              const selected = state.answers.get(row.uid);
              return `
            <article class="result-miss">
              <div class="result-miss-top">
                <span class="result-miss-num">${i + 1}</span>
                <span class="result-miss-tag">${escapeHtml(row.sectionLabel)}</span>
              </div>
              <p class="result-miss-stem">${escapeHtml(row.prompt)}</p>
              <p class="result-miss-keys">
                Yours: <b>${escapeHtml(selected || "no answer")}</b>
                · Correct: <b>${escapeHtml(row.correctKey)}. ${escapeHtml(row.correctAnswer)}</b>
              </p>
              ${
                row.explanation
                  ? `<details class="result-miss-why"><summary>Why</summary><p>${escapeHtml(
                      row.explanation
                    )}</p></details>`
                  : ""
              }
            </article>`;
            })
            .join("")}
        </div>
      `;
    }
  }

  setStatus(`Demo snapshot saved on this device · ${totalCorrect}/${total} (${percent}%)`);
  showPhase("results");
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  beginBtn.addEventListener("click", beginDemo);
  retryBtn.addEventListener("click", () => {
    state.index = 0;
    state.answers = new Map();
    showPhase("start");
    setStatus("Demo ready whenever you want another snapshot.");
  });
  prevBtn.addEventListener("click", () => {
    if (state.phase !== "exam") return;
    if (state.index > 0) {
      state.index -= 1;
      renderItem();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (state.phase !== "exam") return;
    if (state.index < state.rows.length - 1) {
      state.index += 1;
      renderItem();
      return;
    }
    finishDemo();
  });
}

async function init() {
  setStatus("Loading free demo items…");
  beginBtn.disabled = true;
  try {
    state.rows = await buildDemoRows();
    state.ready = true;
    beginBtn.disabled = false;
    bindControls();
    showPhase("start");
    setStatus(
      `Demo ready · ${state.rows.length} items (Part 5–7) · free · no timer`
    );
  } catch (error) {
    console.error(error);
    setStatus(`Could not load the demo test. ${error.message}`, true);
  }
}

init();
