/**
 * Full Reading Mock — Parts 5 + 6 + 7 continuous exam
 * 100 questions · 75 minutes (4500s) · feedback only at end.
 *
 * Construction (same as section mocks):
 * - Part 5: 30 skill-balanced from part5-bank.json (exclude part5-intro IDs)
 * - Part 6: 4 passages × 4 blanks from part6-bank.json
 * - Part 7: 8 singles (29 Q) + 5 multis (25 Q) from part7-bank.json
 * Order: Part 5 → Part 6 → Part 7. One continuous timer.
 */

const PART5_BANK_URL = "data/part5-bank.json";
const PART5_INTRO_URL = "data/part5-intro.json";
const PART6_BANK_URL = "data/part6-bank.json";
const PART7_BANK_URL = "data/part7-bank.json";

const PART5_SIZE = 30;
const PART6_PASSAGES = 4;
const PART6_Q_PER = 4;
const PART6_SIZE = PART6_PASSAGES * PART6_Q_PER; // 16
const PART7_MULTI_SETS = 5;
const PART7_SINGLE_Q = 29;
const PART7_SIZE = 54;
const MOCK_SIZE = PART5_SIZE + PART6_SIZE + PART7_SIZE; // 100
const MOCK_SECONDS = 75 * 60; // 4500

const state = {
  part5Bank: [],
  part6Bank: [],
  part7Bank: [],
  part6Passages: [],
  part7Sets: [],
  questions: [],
  index: 0,
  answers: new Map(),
  secondsLeft: MOCK_SECONDS,
  timerId: null,
  phase: "start",
  submitted: false,
  lastPart6Key: "",
  lastPart7Key: "",
};

const statusEl = document.querySelector("[data-mock-status]");
const startPanel = document.querySelector("[data-mock-start]");
const examPanel = document.querySelector("[data-mock-exam]");
const resultsPanel = document.querySelector("[data-mock-results]");
const timerEl = document.querySelector("[data-mock-timer]");
const answeredEl = document.querySelector("[data-mock-answered]");
const counterEl = document.querySelector("[data-mock-counter]");
const sectionEl = document.querySelector("[data-mock-section]");
const typeLabelEl = document.querySelector("[data-mock-type-label]");
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
const part6PassageEl = document.querySelector("[data-part6-passage]");
const passageMetaEl = document.querySelector("[data-passage-meta]");
const passageTitleEl = document.querySelector("[data-passage-title]");
const passageBodyEl = document.querySelector("[data-passage-body]");
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
  return skill || "Other";
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ---------- Part 5 construction ---------- */

function normalizePart5Item(raw) {
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
    part: 5,
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

function groupBySkill(items) {
  const groups = new Map();
  items.forEach((item) => {
    const key = normalizeSkill(item.skill);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return groups;
}

function buildPart5Set(bank, size) {
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

async function loadPart5Bank() {
  const [bankRes, introRes] = await Promise.all([
    fetch(PART5_BANK_URL, { cache: "no-cache" }),
    fetch(PART5_INTRO_URL, { cache: "no-cache" }),
  ]);
  if (!bankRes.ok) throw new Error(`Could not load ${PART5_BANK_URL} (${bankRes.status}).`);
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
    .map(normalizePart5Item)
    .filter((item) => item.id && item.question && item.options.length && item.correctKey)
    .filter((item) => !introIds.has(item.id));

  if (items.length < PART5_SIZE) {
    throw new Error(`Part 5 bank too small for ${PART5_SIZE} (${items.length}).`);
  }
  return items;
}

/* ---------- Part 6 construction ---------- */

function normalizePart6Question(raw, passage) {
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
    part: 6,
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

function normalizePart6Passage(raw) {
  const passage = {
    id: String(raw.id ?? "").trim(),
    genre: raw.genre || "",
    title: raw.title || "Passage",
    workplaceTopic: raw.workplaceTopic || "",
    text: Array.isArray(raw.text) ? raw.text : [],
    questions: [],
  };
  passage.questions = (raw.questions || []).map((q) => normalizePart6Question(q, passage));
  return passage;
}

function validatePart6Passage(passage) {
  if (!passage.id) throw new Error("Part 6 passage missing id.");
  if (!Array.isArray(passage.text) || !passage.text.length) {
    throw new Error(`Passage ${passage.id} has no text.`);
  }
  if (!Array.isArray(passage.questions) || passage.questions.length < PART6_Q_PER) {
    throw new Error(`Passage ${passage.id} needs ${PART6_Q_PER} questions.`);
  }
  const body = passage.text.map((p) => p.content || "").join("\n");
  passage.questions.forEach((item) => {
    if (!item.id || !item.blankLabel || !item.options.length || !item.correctKey) {
      throw new Error(`Invalid Part 6 question in ${passage.id}.`);
    }
    const markerA = `[[${item.blankLabel}]]`;
    const markerB = `_____${item.blankLabel}_____`;
    if (!body.includes(markerA) && !body.includes(markerB)) {
      throw new Error(`Blank marker for ${item.blankLabel} not found in ${passage.id}.`);
    }
  });
}

function part6SetKey(passages) {
  return passages
    .map((p) => p.id)
    .sort()
    .join("|");
}

function pickPart6Passages(bank) {
  if (bank.length < PART6_PASSAGES) {
    throw new Error(`Need at least ${PART6_PASSAGES} Part 6 passages.`);
  }
  let chosen = null;
  for (let attempt = 0; attempt < 16; attempt += 1) {
    const candidate = shuffle(bank).slice(0, PART6_PASSAGES);
    const key = part6SetKey(candidate);
    if (key !== state.lastPart6Key || bank.length <= PART6_PASSAGES) {
      chosen = candidate;
      state.lastPart6Key = key;
      break;
    }
  }
  if (!chosen) {
    chosen = shuffle(bank).slice(0, PART6_PASSAGES);
    state.lastPart6Key = part6SetKey(chosen);
  }
  return chosen;
}

function flattenPart6Questions(passages) {
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

async function loadPart6Bank() {
  const response = await fetch(PART6_BANK_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load ${PART6_BANK_URL} (${response.status}).`);
  const data = await response.json();
  const rawPassages = Array.isArray(data.passages) ? data.passages : [];
  if (!rawPassages.length) throw new Error("Part 6 bank has no passages.");
  const passages = rawPassages.map(normalizePart6Passage);
  passages.forEach(validatePart6Passage);
  const classPassages = passages.filter(
    (p) => p.id && !String(p.id).toUpperCase().includes("INTRO")
  );
  if (classPassages.length < PART6_PASSAGES) {
    throw new Error(`Part 6 bank too small (${classPassages.length}).`);
  }
  return classPassages;
}

/* ---------- Part 7 construction ---------- */

function normalizePart7Question(raw, set) {
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
    part: 7,
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

function normalizePart7Passage(raw) {
  return {
    label: String(raw.label ?? "A").trim(),
    genre: raw.genre || "",
    heading: raw.heading || "",
    body: String(raw.body ?? "").trim(),
  };
}

function normalizePart7Set(raw) {
  const set = {
    id: String(raw.id ?? "").trim(),
    setType: raw.setType || "single",
    genre: raw.genre || "",
    title: raw.title || "Passage",
    workplaceTopic: raw.workplaceTopic || "",
    passages: (raw.passages || []).map(normalizePart7Passage),
    questions: [],
  };
  set.questions = (raw.questions || []).map((q) => normalizePart7Question(q, set));
  return set;
}

function validatePart7Set(set) {
  if (!set.id) throw new Error("Part 7 set missing id.");
  if (!Array.isArray(set.passages) || !set.passages.length) {
    throw new Error(`Set ${set.id} has no passages.`);
  }
  const expected = set.setType === "triple" ? 3 : set.setType === "double" ? 2 : 1;
  if (set.passages.length !== expected) {
    throw new Error(
      `Set ${set.id}: setType "${set.setType}" expects ${expected} passage(s), found ${set.passages.length}.`
    );
  }
  set.passages.forEach((p, i) => {
    if (!p.body) throw new Error(`Set ${set.id}: passage ${i + 1} empty.`);
  });
  if (!Array.isArray(set.questions) || !set.questions.length) {
    throw new Error(`Set ${set.id} has no questions.`);
  }
  set.questions.forEach((item) => {
    if (!item.id || !item.question || !item.options.length || !item.correctKey) {
      throw new Error(`Invalid Part 7 question in ${set.id}.`);
    }
  });
}

function isMulti(set) {
  return set.setType === "double" || set.setType === "triple";
}

function part7SetKey(sets) {
  return sets
    .map((s) => s.id)
    .sort()
    .join("|");
}

function qCount(set) {
  return set.questions.length;
}

function pickSinglesForTarget(singles, target) {
  if (!singles.length) return [];
  const threes = singles.filter((s) => qCount(s) === 3);
  const fours = singles.filter((s) => qCount(s) === 4);
  if (threes.length >= 3 && fours.length >= 5 && 3 * 3 + 5 * 4 === target) {
    return [...shuffle(threes).slice(0, 3), ...shuffle(fours).slice(0, 5)];
  }
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

function buildPart7Bundle(bank) {
  const singles = bank.filter((s) => s.setType === "single");
  const multis = bank.filter(isMulti);
  if (multis.length < PART7_MULTI_SETS) {
    throw new Error(`Need at least ${PART7_MULTI_SETS} Part 7 multi sets.`);
  }
  const multiChosen = shuffle(multis).slice(0, PART7_MULTI_SETS);
  const singleChosen = pickSinglesForTarget(singles, PART7_SINGLE_Q);
  const orderedSingles = shuffle(singleChosen);
  const orderedMultis = shuffle(multiChosen);
  const sets = [...orderedSingles, ...orderedMultis];
  let questions = [];
  sets.forEach((set) => {
    set.questions.forEach((q) => questions.push(q));
  });
  if (questions.length > PART7_SIZE) {
    questions = questions.slice(0, PART7_SIZE);
  }
  return { sets, questions };
}

function pickPart7Bundle(bank) {
  let chosen = null;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const bundle = buildPart7Bundle(bank);
    const key = part7SetKey(bundle.sets);
    if (key !== state.lastPart7Key || attempt === 23) {
      chosen = bundle;
      state.lastPart7Key = key;
      break;
    }
  }
  if (!chosen) {
    chosen = buildPart7Bundle(bank);
    state.lastPart7Key = part7SetKey(chosen.sets);
  }
  return chosen;
}

async function loadPart7Bank() {
  const response = await fetch(PART7_BANK_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load ${PART7_BANK_URL} (${response.status}).`);
  const data = await response.json();
  const rawSets = Array.isArray(data.sets) ? data.sets : [];
  if (!rawSets.length) throw new Error("Part 7 bank has no sets.");
  const sets = rawSets.map(normalizePart7Set);
  sets.forEach(validatePart7Set);
  const classSets = sets.filter(
    (s) => s.id && !String(s.id).toUpperCase().includes("INTRO")
  );
  const singles = classSets.filter((s) => s.setType === "single");
  const multis = classSets.filter(isMulti);
  if (multis.length < PART7_MULTI_SETS) {
    throw new Error(`Part 7 multi sets too few (${multis.length}).`);
  }
  if (!singles.length) throw new Error("Part 7 bank has no single sets.");
  return classSets;
}

/* ---------- Build full mock ---------- */

function buildFullMock() {
  const part5Qs = buildPart5Set(state.part5Bank, PART5_SIZE);
  state.part6Passages = pickPart6Passages(state.part6Bank);
  const part6Qs = flattenPart6Questions(state.part6Passages);
  const part7Bundle = pickPart7Bundle(state.part7Bank);
  state.part7Sets = part7Bundle.sets;
  const part7Qs = part7Bundle.questions;

  if (part5Qs.length !== PART5_SIZE) {
    throw new Error(`Part 5 construction yielded ${part5Qs.length}, expected ${PART5_SIZE}.`);
  }
  if (part6Qs.length !== PART6_SIZE) {
    throw new Error(`Part 6 construction yielded ${part6Qs.length}, expected ${PART6_SIZE}.`);
  }
  if (part7Qs.length !== PART7_SIZE) {
    throw new Error(`Part 7 construction yielded ${part7Qs.length}, expected ${PART7_SIZE}.`);
  }

  return [...part5Qs, ...part6Qs, ...part7Qs];
}

/* ---------- Timer / phases ---------- */

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

function firstIndexForPart(part) {
  return state.questions.findIndex((q) => q.part === part);
}

function partLabel(part) {
  if (part === 5) return "Part 5";
  if (part === 6) return "Part 6";
  if (part === 7) return "Part 7";
  return "Reading";
}

function typeLabel(part) {
  if (part === 5) return "Incomplete Sentences";
  if (part === 6) return "Text Completion";
  if (part === 7) return "Reading Comprehension";
  return "";
}

/* ---------- Render helpers ---------- */

function formatPart6PassageHtml(passage, activeBlankLabel) {
  return passage.text
    .map((block) => {
      let content = escapeHtml(block.content || "");
      content = content.replace(/\[\[(\d+)\]\]/g, (_, label) => {
        const active = String(label) === String(activeBlankLabel);
        return `<span class="part6-blank${active ? " is-active" : ""}" data-blank="${escapeHtml(
          label
        )}">${escapeHtml(label)}</span>`;
      });
      content = content.replace(/_____(\d+)_____/g, (_, label) => {
        const active = String(label) === String(activeBlankLabel);
        return `<span class="part6-blank${active ? " is-active" : ""}" data-blank="${escapeHtml(
          label
        )}">${escapeHtml(label)}</span>`;
      });
      content = content.replace(/\n/g, "<br />");
      return `<p>${content}</p>`;
    })
    .join("");
}

function stemForPart6(item) {
  if (item.question && item.question.trim()) return item.question.trim();
  return `Select the best option for blank ${item.blankLabel}.`;
}

function renderPart6Passage(item) {
  const passage = state.part6Passages.find((p) => p.id === item.passageId);
  if (!passage || !part6PassageEl) return;
  part6PassageEl.hidden = false;
  if (passagesEl) passagesEl.hidden = true;

  if (passageMetaEl) {
    const bits = [passage.genre, passage.workplaceTopic].filter(Boolean);
    const indexInSession = state.part6Passages.findIndex((p) => p.id === passage.id) + 1;
    const prefix =
      state.part6Passages.length > 1
        ? `Passage ${indexInSession} of ${state.part6Passages.length}`
        : "Passage";
    passageMetaEl.textContent = bits.length ? `${prefix} · ${bits.join(" · ")}` : prefix;
  }
  if (passageTitleEl) passageTitleEl.textContent = passage.title || "Passage";
  if (passageBodyEl) passageBodyEl.innerHTML = formatPart6PassageHtml(passage, item.blankLabel);
}

function formatBodyHtml(body) {
  const escaped = escapeHtml(body);
  const paragraphs = escaped.split(/\n\n+/).filter(Boolean);
  if (paragraphs.length <= 1) {
    return `<p>${escaped.replace(/\n/g, "<br />")}</p>`;
  }
  return paragraphs.map((block) => `<p>${block.replace(/\n/g, "<br />")}</p>`).join("");
}

function renderPart7Passages(item) {
  const set = state.part7Sets.find((s) => s.id === item.setId);
  if (!set || !passagesEl) return;
  if (part6PassageEl) part6PassageEl.hidden = true;
  passagesEl.hidden = false;

  const multi = set.passages.length > 1;
  const setIndex = state.part7Sets.findIndex((s) => s.id === set.id) + 1;
  const setPrefix =
    state.part7Sets.length > 1 ? `Set ${setIndex} of ${state.part7Sets.length}` : "Set";

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

function hidePassages() {
  if (part6PassageEl) part6PassageEl.hidden = true;
  if (passagesEl) {
    passagesEl.hidden = true;
    passagesEl.innerHTML = "";
  }
}

function renderNav() {
  if (!navEl) return;
  navEl.innerHTML = state.questions
    .map((item, index) => {
      const answered = state.answers.has(item.id);
      const current = index === state.index;
      const partClass =
        item.part === 5 ? " is-part5" : item.part === 6 ? " is-part6" : " is-part7";
      return `<button type="button" class="mock-nav-btn${answered ? " is-answered" : ""}${
        current ? " is-current" : ""
      }${partClass}" data-mock-goto="${index}" title="Part ${item.part}">${index + 1}</button>`;
    })
    .join("");

  navEl.querySelectorAll("[data-mock-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.index = Number(btn.getAttribute("data-mock-goto"));
      renderQuestion();
    });
  });
}

function updateSectionJump() {
  const current = state.questions[state.index];
  document.querySelectorAll("[data-jump-part]").forEach((btn) => {
    const part = Number(btn.getAttribute("data-jump-part"));
    btn.classList.toggle("is-current-section", current && current.part === part);
  });
}

function renderQuestion() {
  const item = state.questions[state.index];
  if (!item) return;

  const selected = state.answers.get(item.id);
  if (counterEl) counterEl.textContent = `${state.index + 1} / ${state.questions.length}`;
  if (sectionEl) sectionEl.textContent = partLabel(item.part);
  if (typeLabelEl) typeLabelEl.textContent = typeLabel(item.part);
  if (metaEl) {
    metaEl.textContent = "";
    metaEl.hidden = true;
  }

  if (item.part === 5) {
    hidePassages();
    if (questionEl) questionEl.textContent = item.question;
  } else if (item.part === 6) {
    renderPart6Passage(item);
    if (questionEl) questionEl.textContent = stemForPart6(item);
  } else {
    renderPart7Passages(item);
    if (questionEl) questionEl.textContent = item.question;
  }

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
  updateSectionJump();
  renderNav();
}

function beginExam() {
  if (!state.part5Bank.length || !state.part6Bank.length || !state.part7Bank.length) return;
  try {
    state.questions = buildFullMock();
  } catch (error) {
    console.error(error);
    setStatus(`Could not build mock set. ${error.message}`, true);
    return;
  }
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;
  setStatus(
    `Mock running · ${state.questions.length} Q · P5 ${PART5_SIZE} + P6 ${PART6_SIZE} + P7 ${PART7_SIZE} · feedback locked until submit`
  );
  showPhase("exam");
  startTimer();
  renderQuestion();
  examPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function missStem(item) {
  if (item.part === 6) return stemForPart6(item);
  return item.question;
}

function paintResults(correctCount, total, usedSeconds, auto, studyRows, misses, partScores) {
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  const scoreEl = document.querySelector("[data-mock-final-score]");
  const noteEl = document.querySelector("[data-mock-final-note]");
  const messageEl = document.querySelector("[data-mock-result-message]");
  const metaResultEl = document.querySelector("[data-mock-result-meta]");
  const partScoresEl = document.querySelector("[data-mock-part-scores]");
  const studyEl = document.querySelector("[data-mock-study-focus]");
  const mistakesEl = document.querySelector("[data-mock-mistakes]");

  if (scoreEl) scoreEl.textContent = `${correctCount}/${total}`;
  if (noteEl) {
    noteEl.textContent = `${percent}% · ${formatTime(usedSeconds)} used · Parts 5–7`;
  }
  if (messageEl) {
    messageEl.hidden = false;
    if (auto) {
      messageEl.textContent = "Time is up — answers submitted automatically.";
    } else if (percent >= 80) {
      messageEl.textContent =
        "Strong full Reading mock. Keep rotating sets so weaker parts do not hide.";
    } else if (percent >= 60) {
      messageEl.textContent =
        "Solid. Review the per-part scores and misses, then run another timed set.";
    } else {
      messageEl.textContent =
        "Use the explanations and section mocks on your weakest part before the next full run.";
    }
  }
  if (metaResultEl) {
    metaResultEl.textContent = `Time used: ${formatTime(usedSeconds)} of 75:00 · Answered ${state.answers.size}/${total}`;
  }

  if (partScoresEl) {
    partScoresEl.innerHTML = `
      <p class="eyebrow">Scores by part</p>
      <div class="result-part-grid">
        ${[5, 6, 7]
          .map((part) => {
            const row = partScores[part] || { correct: 0, total: 0 };
            const pct = row.total ? Math.round((row.correct / row.total) * 100) : 0;
            return `<article class="result-part-card">
              <span>Part ${part}</span>
              <strong>${row.correct}/${row.total}</strong>
              <small>${pct}%</small>
            </article>`;
          })
          .join("")}
      </div>
    `;
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
            .slice(0, 12)
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
                <span class="result-miss-tag">Part ${item.part}${
                item.blankLabel ? ` · Blank ${escapeHtml(item.blankLabel)}` : ""
              }${item.setType ? ` · ${escapeHtml(item.setType)}` : ""}</span>
              </div>
              <p class="result-miss-stem">${escapeHtml(missStem(item))}</p>
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

  const partScores = { 5: { correct: 0, total: 0 }, 6: { correct: 0, total: 0 }, 7: { correct: 0, total: 0 } };
  answered.forEach(({ item, correct }) => {
    const bucket = partScores[item.part];
    if (!bucket) return;
    bucket.total += 1;
    if (correct) bucket.correct += 1;
  });

  if (window.ToeicProgress?.recordReadingMockSession) {
    try {
      window.ToeicProgress.recordReadingMockSession({
        mode: "reading-mock",
        correct: correctCount,
        total: state.questions.length,
        questionIds: state.questions.map((item) => item.id),
        passageIds: state.part6Passages.map((p) => p.id),
        setIds: state.part7Sets.map((s) => s.id),
        durationSeconds: usedSeconds,
        timedOut: auto,
        partScores: {
          part5: partScores[5],
          part6: partScores[6],
          part7: partScores[7],
        },
        items: answered.map(({ item, correct }) => ({
          questionId: item.id,
          skill: item.skill || (item.part === 6 ? item.blankType : item.questionType) || `Part ${item.part}`,
          subskill: item.subskill || item.blankType || item.questionType || "",
          correct,
          prompt: missStem(item),
          part: item.part,
        })),
      });
    } catch (error) {
      console.error("[TOEIC] Failed to save Reading mock session.", error);
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
    misses,
    partScores
  );

  setStatus(`Mock saved on this device · ${correctCount}/${state.questions.length} (${percent}%)`);
  showPhase("results");
  resultsPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  beginBtn?.addEventListener("click", beginExam);

  const backToStart = () => {
    showPhase("start");
    setStatus("Ready for another Full Reading mock when you are.");
    startPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  retryBtn?.addEventListener("click", backToStart);
  newSetBtn?.addEventListener("click", () => beginExam());

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

  document.querySelectorAll("[data-jump-part]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = Number(btn.getAttribute("data-jump-part"));
      const idx = firstIndexForPart(part);
      if (idx >= 0) {
        state.index = idx;
        renderQuestion();
      }
    });
  });
}

async function bootMock() {
  setStatus("Loading Part 5 / 6 / 7 banks…");
  if (beginBtn) beginBtn.disabled = true;

  try {
    const [p5, p6, p7] = await Promise.all([
      loadPart5Bank(),
      loadPart6Bank(),
      loadPart7Bank(),
    ]);
    state.part5Bank = p5;
    state.part6Bank = p6;
    state.part7Bank = p7;
    setStatus(
      `Banks ready · P5 ${p5.length} · P6 ${p6.length} passages · P7 ${p7.length} sets · ${MOCK_SIZE}Q / 75 min · free intro excluded`
    );
    if (beginBtn) beginBtn.disabled = false;
    bindControls();
    showPhase("start");
  } catch (error) {
    console.error(error);
    setStatus(`Could not load mock banks. ${error.message}`, true);
    if (beginBtn) beginBtn.disabled = true;
  }
}

if (window.ToeicAccess?.guardPage) {
  window.ToeicAccess.guardPage({
    title: "Full Reading mock is protected",
    body: "The Full Reading Mock (Parts 5–7, 100 questions, 75 minutes) is for Teacher Israel Ventura’s class groups. Enter the class code your teacher gave you.",
    secondaryHref: "reading.html",
    secondaryLabel: "Back to Reading hub",
    onUnlocked: bootMock,
  });
} else {
  bootMock();
}

window.ReadingMockInternals = {
  buildPart5Set,
  pickPart6Passages,
  flattenPart6Questions,
  buildPart7Bundle,
  buildFullMock,
  MOCK_SIZE,
  MOCK_SECONDS,
  PART5_SIZE,
  PART6_SIZE,
  PART7_SIZE,
  state,
};
