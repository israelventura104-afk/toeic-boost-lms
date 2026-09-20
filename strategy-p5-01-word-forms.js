(() => {
  const teachHtml = "\n<div class=\"prose\">\n  <p>In TOEIC Part 5, many items look like vocabulary. They are not. Options often share the <em>same root</em> (<em>decide / decision / decisive / decisively</em>). Name the <strong>grammatical slot</strong>, then pick the matching form.</p>\n  <h3>The four slots</h3>\n  <div class=\"slot-grid\">\n    <article><strong>Noun</strong><p>Names a person, thing, idea, or process.</p><code class=\"code-strip\">the decision \u00b7 her professionalism</code></article>\n    <article><strong>Verb</strong><p>Shows the action or state (tense / agreement).</p><code class=\"code-strip\">will decide \u00b7 has decided</code></article>\n    <article><strong>Adjective</strong><p>Describes a noun (before noun or after be).</p><code class=\"code-strip\">a decisive manager</code></article>\n    <article><strong>Adverb</strong><p>Describes a verb / adjective / whole idea.</p><code class=\"code-strip\">answered promptly \u00b7 highly successful</code></article>\n  </div>\n  <h3>Method</h3>\n  <ol class=\"method\">\n    <li><strong>Ignore A\u2013D for three seconds.</strong> Look before and after the blank.</li>\n    <li><strong>Ask:</strong> noun, verb, adjective, or adverb?</li>\n    <li><strong>Match the ending to the job</strong> (-tion / -ive / -ly / base verb\u2026).</li>\n    <li><strong>Eliminate by structure</strong>, not by \u201csounds nice.\u201d</li>\n  </ol>\n  <h3>Fast signals</h3>\n  <ul class=\"signals\">\n    <li>Article + blank + noun \u2192 often <strong>adjective</strong></li>\n    <li>Possessive + blank (end) \u2192 often <strong>noun</strong></li>\n    <li>Subject + blank + object \u2192 <strong>verb</strong></li>\n    <li>Verb present + blank nearby \u2192 often <strong>adverb</strong></li>\n    <li>Preposition + blank \u2192 usually <strong>noun</strong></li>\n  </ul>\n  <div class=\"callout\"><strong>Teacher move</strong><p>Ask only: <em>\u201cNoun, verb, adjective, or adverb?\u201d</em> \u2014 then open options.</p></div>\n  <h3>Common traps</h3>\n  <ul>\n    <li>Noun because it \u201cfeels serious\u201d when the blank needs an adverb</li>\n    <li>-ing / -ed without checking if a tensed verb is required</li>\n    <li>Translating from Spanish before the slot check</li>\n  </ul>\n</div>\n";
  const demos = [{"title": "Demo 1 · Adjective before a noun", "stem": "The manager presented a ____ plan for reducing delivery delays.", "options": [{"key": "A", "text": "decide"}, {"key": "B", "text": "decision"}, {"key": "C", "text": "decisive"}, {"key": "D", "text": "decisively"}], "correctKey": "C", "slot": "adjective", "teach": "Article + blank + noun (plan) → adjective. Decisive plan."}, {"title": "Demo 2 · Noun after a possessive", "stem": "Clients praised her ____ during the contract negotiations.", "options": [{"key": "A", "text": "professional"}, {"key": "B", "text": "professionally"}, {"key": "C", "text": "professionalism"}, {"key": "D", "text": "profession"}], "correctKey": "C", "slot": "noun", "teach": "Possessive her + blank → noun professionalism."}, {"title": "Demo 3 · Verb after a modal", "stem": "The committee will ____ the proposal before Friday’s board meeting.", "options": [{"key": "A", "text": "evaluate"}, {"key": "B", "text": "evaluation"}, {"key": "C", "text": "evaluative"}, {"key": "D", "text": "evaluatively"}], "correctKey": "A", "slot": "verb", "teach": "Modal will + blank → base verb evaluate."}, {"title": "Demo 4 · Adverb modifying a verb", "stem": "Please respond ____ to any customer complaints about late shipments.", "options": [{"key": "A", "text": "prompt"}, {"key": "B", "text": "promptness"}, {"key": "C", "text": "promptly"}, {"key": "D", "text": "prompts"}], "correctKey": "C", "slot": "adverb", "teach": "Verb respond + blank → adverb promptly."}, {"title": "Demo 5 · Noun after a preposition", "stem": "The trainees were given a handbook for ____ of the new software.", "options": [{"key": "A", "text": "install"}, {"key": "B", "text": "installation"}, {"key": "C", "text": "installed"}, {"key": "D", "text": "installable"}], "correctKey": "B", "slot": "noun", "teach": "Preposition for + blank + of → noun installation."}];
  const practice = [{"id": "Q01", "stem": "Applicants must ____ proof of employment with the online form.", "options": [{"key": "A", "text": "submit"}, {"key": "B", "text": "submission"}, {"key": "C", "text": "submissive"}, {"key": "D", "text": "submissively"}], "correctKey": "A", "slot": "verb", "explain": "Modal must + blank → submit."}, {"id": "Q02", "stem": "The firm is seeking a ____ assistant to support the legal team.", "options": [{"key": "A", "text": "rely"}, {"key": "B", "text": "reliable"}, {"key": "C", "text": "reliability"}, {"key": "D", "text": "reliably"}], "correctKey": "B", "slot": "adjective", "explain": "Article + blank + noun → reliable."}, {"id": "Q03", "stem": "Ms. Cho is responsible for the ____ of all regional sales reports.", "options": [{"key": "A", "text": "compile"}, {"key": "B", "text": "compiled"}, {"key": "C", "text": "compilation"}, {"key": "D", "text": "compiling"}], "correctKey": "C", "slot": "noun", "explain": "the + blank + of → compilation."}, {"id": "Q04", "stem": "The director spoke ____ about the need for stricter safety checks.", "options": [{"key": "A", "text": "persuasion"}, {"key": "B", "text": "persuasive"}, {"key": "C", "text": "persuade"}, {"key": "D", "text": "persuasively"}], "correctKey": "D", "slot": "adverb", "explain": "Modifies spoke → persuasively."}, {"id": "Q05", "stem": "The warehouse team can ____ orders within two business days.", "options": [{"key": "A", "text": "process"}, {"key": "B", "text": "procession"}, {"key": "C", "text": "processor"}, {"key": "D", "text": "processable"}], "correctKey": "A", "slot": "verb", "explain": "Modal can + blank → process."}, {"id": "Q06", "stem": "Please confirm your ____ for the Thursday training session.", "options": [{"key": "A", "text": "attend"}, {"key": "B", "text": "attendance"}, {"key": "C", "text": "attentive"}, {"key": "D", "text": "attentively"}], "correctKey": "B", "slot": "noun", "explain": "your + blank → attendance."}, {"id": "Q07", "stem": "A ____ review of the budget revealed several unnecessary expenses.", "options": [{"key": "A", "text": "care"}, {"key": "B", "text": "carefully"}, {"key": "C", "text": "careful"}, {"key": "D", "text": "carefulness"}], "correctKey": "C", "slot": "adjective", "explain": "Article + blank + noun → careful."}, {"id": "Q08", "stem": "Employees are asked to work ____ during the system upgrade this weekend.", "options": [{"key": "A", "text": "flexible"}, {"key": "B", "text": "flexibility"}, {"key": "C", "text": "flexibly"}, {"key": "D", "text": "flex"}], "correctKey": "C", "slot": "adverb", "explain": "Modifies work → flexibly."}, {"id": "Q09", "stem": "Mr. Patel will ____ the visiting clients on a tour of the plant.", "options": [{"key": "A", "text": "accompany"}, {"key": "B", "text": "accompaniment"}, {"key": "C", "text": "accompanying"}, {"key": "D", "text": "accompanied"}], "correctKey": "A", "slot": "verb", "explain": "will + blank → accompany."}, {"id": "Q10", "stem": "We need more ____ information before signing the supplier contract.", "options": [{"key": "A", "text": "detail"}, {"key": "B", "text": "detailed"}, {"key": "C", "text": "detailing"}, {"key": "D", "text": "details"}], "correctKey": "B", "slot": "adjective", "explain": "Blank + noun → detailed."}, {"id": "Q11", "stem": "The board approved the ____ of two new branch offices overseas.", "options": [{"key": "A", "text": "establish"}, {"key": "B", "text": "established"}, {"key": "C", "text": "establishing"}, {"key": "D", "text": "establishment"}], "correctKey": "D", "slot": "noun", "explain": "the + blank + of → establishment."}, {"id": "Q12", "stem": "The updated brochure explains our services more ____ than the previous version.", "options": [{"key": "A", "text": "clear"}, {"key": "B", "text": "clearly"}, {"key": "C", "text": "clarity"}, {"key": "D", "text": "clearness"}], "correctKey": "B", "slot": "adverb", "explain": "Modifies explains → clearly."}, {"id": "Q13", "stem": "Online registration will ____ at midnight on March 30.", "options": [{"key": "A", "text": "close"}, {"key": "B", "text": "closure"}, {"key": "C", "text": "closely"}, {"key": "D", "text": "closed"}], "correctKey": "A", "slot": "verb", "explain": "will + blank → close."}, {"id": "Q14", "stem": "Parking permits will be ____ at the security desk starting Monday.", "options": [{"key": "A", "text": "availability"}, {"key": "B", "text": "avail"}, {"key": "C", "text": "availably"}, {"key": "D", "text": "available"}], "correctKey": "D", "slot": "adjective", "explain": "will be + adjective → available."}, {"id": "Q15", "stem": "The instructions must be followed ____ to avoid equipment damage.", "options": [{"key": "A", "text": "precise"}, {"key": "B", "text": "precision"}, {"key": "C", "text": "precisely"}, {"key": "D", "text": "preciseness"}], "correctKey": "C", "slot": "adverb", "explain": "Modifies followed → precisely."}];
  const slotLabel = "Slot";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function formatStem(stem) {
  return escapeHtml(stem).replace(/____/g, '<span class="blank">____</span>');
}
function bootStrategyClass({ teachHtml, demos, practice, slotLabel }) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  practice.forEach((q) => { counts[q.correctKey] += 1; });
  console.info("[Strategy] balance", counts);

  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-panel") === name));
    });
  });

  document.getElementById("panel-teach").innerHTML = teachHtml;

  let demoIndex = 0;
  let demoRevealed = false;
  const demoMeta = document.getElementById("demo-meta");
  const demoStage = document.getElementById("demo-stage");
  const demoProgress = document.getElementById("demo-progress");
  const demoPrev = document.getElementById("demo-prev");
  const demoNext = document.getElementById("demo-next");
  const demoReveal = document.getElementById("demo-reveal");

  function renderDemo() {
    const item = demos[demoIndex];
    demoRevealed = false;
    demoMeta.textContent = `Demo ${demoIndex + 1} of ${demos.length} · one screen`;
    demoProgress.style.width = `${((demoIndex + 1) / demos.length) * 100}%`;
    const options = item.options.map((opt) => `
      <div class="opt locked"><span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span></div>
    `).join("");
    const right = item.options.find((o) => o.key === item.correctKey);
    demoStage.innerHTML = `
      <h3 style="margin:0 0 8px;color:var(--navy);font-size:1.05rem">${escapeHtml(item.title)}</h3>
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>
      <div class="teach-box" id="demo-teach" hidden>
        <strong>${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)} · Answer ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}</strong>
        <p style="margin:8px 0 0">${escapeHtml(item.teach)}</p>
      </div>`;
    demoPrev.disabled = demoIndex === 0;
    demoNext.textContent = demoIndex === demos.length - 1 ? "Go to Practice tab" : "Next demo";
    demoReveal.textContent = "Reveal model answer";
  }

  demoPrev.addEventListener("click", () => { if (demoIndex > 0) { demoIndex -= 1; renderDemo(); } });
  demoNext.addEventListener("click", () => {
    if (demoIndex < demos.length - 1) { demoIndex += 1; renderDemo(); return; }
    document.querySelector('.tab[data-tab="practice"]').click();
  });
  demoReveal.addEventListener("click", () => {
    const box = document.getElementById("demo-teach");
    if (!box) return;
    demoRevealed = !demoRevealed;
    box.hidden = !demoRevealed;
    demoReveal.textContent = demoRevealed ? "Hide model answer" : "Reveal model answer";
  });
  renderDemo();

  let qIndex = 0;
  let submitted = false;
  const answers = new Map();
  const practiceMeta = document.getElementById("practice-meta");
  const practiceStage = document.getElementById("practice-stage");
  const practiceProgress = document.getElementById("practice-progress");
  const practiceStatus = document.getElementById("practice-status");
  const practicePrev = document.getElementById("practice-prev");
  const practiceNext = document.getElementById("practice-next");
  const practiceNav = document.getElementById("practice-nav");
  const submitRow = document.getElementById("practice-submit-row");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const results = document.getElementById("results");
  const scoreLine = document.getElementById("score-line");
  const balanceNote = document.getElementById("balance-note");
  const reviewList = document.getElementById("review-list");

  function updatePracticeChrome() {
    const n = answers.size;
    practiceStatus.hidden = false;
    practiceStatus.textContent = n === 15
      ? "All 15 answered. Submit when ready — no scores until then."
      : `Answered ${n} of 15. One question per screen.`;
    const answered = answers.has(practice[qIndex].id);
    practiceProgress.style.width = `${((qIndex + 1) / practice.length) * 100}%`;
    practiceMeta.textContent = `Question ${qIndex + 1} of ${practice.length}` + (answered ? " · selected" : "");
    practicePrev.disabled = qIndex === 0 || submitted;
    if (qIndex === practice.length - 1) {
      practiceNext.hidden = true;
      submitRow.hidden = false;
    } else {
      practiceNext.hidden = false;
      practiceNext.textContent = "Next question";
      submitRow.hidden = submitted ? false : true;
    }
    if (submitted) {
      practiceNav.hidden = true;
      submitRow.hidden = false;
    }
  }

  function renderPractice() {
    const item = practice[qIndex];
    const selected = answers.get(item.id);
    const options = item.options.map((opt) => `
      <button type="button" class="opt${selected === opt.key ? " selected" : ""}" data-key="${escapeHtml(opt.key)}" ${submitted ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`).join("");
    practiceStage.innerHTML = `
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>`;
    practiceStage.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (submitted) return;
        answers.set(item.id, btn.getAttribute("data-key"));
        renderPractice();
      });
    });
    updatePracticeChrome();
  }

  practicePrev.addEventListener("click", () => { if (qIndex > 0) { qIndex -= 1; renderPractice(); } });
  practiceNext.addEventListener("click", () => { if (qIndex < practice.length - 1) { qIndex += 1; renderPractice(); } });

  submitBtn.addEventListener("click", () => {
    if (answers.size < 15) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `Answer all 15 before submitting (${answers.size}/15).`;
      return;
    }
    submitted = true;
    submitBtn.hidden = true;
    resetBtn.hidden = false;
    practiceNav.hidden = true;
    let correct = 0;
    const review = practice.map((item, index) => {
      const chosen = answers.get(item.id);
      const ok = chosen === item.correctKey;
      if (ok) correct += 1;
      return { index, item, chosen, ok,
        chosenText: item.options.find((o) => o.key === chosen)?.text || "—",
        rightText: item.options.find((o) => o.key === item.correctKey)?.text || "" };
    });
    results.hidden = false;
    scoreLine.textContent = `Score: ${correct} / 15 (${Math.round((correct / 15) * 100)}%)`;
    balanceNote.textContent = `Correct-letter balance: A×${counts.A} · B×${counts.B} · C×${counts.C} · D×${counts.D}.`;
    reviewList.innerHTML = review.map(({ index, item, chosen, chosenText, rightText, ok }) => `
      <article class="review-item ${ok ? "ok" : "bad"}">
        <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"} · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)}</h4>
        <p class="stem">${formatStem(item.stem)}</p>
        <p>Yours: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
        <p>Correct: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>
        <p>${escapeHtml(item.explain)}</p>
      </article>`).join("");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetBtn.addEventListener("click", () => {
    submitted = false;
    answers.clear();
    qIndex = 0;
    submitBtn.hidden = false;
    resetBtn.hidden = true;
    results.hidden = true;
    reviewList.innerHTML = "";
    practiceNav.hidden = false;
    renderPractice();
  });

  renderPractice();
}

  bootStrategyClass({ teachHtml, demos, practice, slotLabel });
})();
