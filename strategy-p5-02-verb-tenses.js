(() => {
  const teachHtml = "\n<div class=\"prose\">\n  <p>Tense items ask: <strong>Does this verb fit the timeline of this workplace sentence?</strong> Wrong options are often real forms of the same verb.</p>\n  <h3>Timelines</h3>\n  <div class=\"slot-grid\">\n    <article><strong>Simple present</strong><p>Habits, facts, schedules.</p><code class=\"code-strip\">The office opens at 9.</code></article>\n    <article><strong>Present continuous</strong><p>In progress now / this week.</p><code class=\"code-strip\">We are updating the site this week.</code></article>\n    <article><strong>Simple past</strong><p>Finished time (yesterday / last Monday).</p><code class=\"code-strip\">The shipment arrived yesterday.</code></article>\n    <article><strong>Present perfect</strong><p>Past\u2192now (since / already / yet / so far).</p><code class=\"code-strip\">She has worked here since March.</code></article>\n    <article><strong>Past continuous</strong><p>Background past (while / when).</p><code class=\"code-strip\">While the team was traveling\u2026</code></article>\n    <article><strong>Future</strong><p>Tomorrow / by Friday / next quarter.</p><code class=\"code-strip\">The bid will close on Friday.</code></article>\n  </div>\n  <h3>Method</h3>\n  <ol class=\"method\">\n    <li>Circle <strong>time markers</strong> first.</li>\n    <li>Name the timeline: finished past / past\u2192now / now / future.</li>\n    <li>Check subject agreement.</li>\n    <li>Eliminate forms that break the marker.</li>\n  </ol>\n  <div class=\"callout\"><strong>Teacher move</strong><p>Ask only: <em>\u201cFinished past, past-to-now, happening now, or future?\u201d</em></p></div>\n</div>\n";
  const demos = [{"title": "Demo 1 · Finished past", "stem": "The courier ____ the package to the front desk yesterday afternoon.", "options": [{"key": "A", "text": "delivers"}, {"key": "B", "text": "delivered"}, {"key": "C", "text": "has delivered"}, {"key": "D", "text": "is delivering"}], "correctKey": "B", "slot": "simple past", "teach": "yesterday afternoon → simple past delivered."}, {"title": "Demo 2 · Since (past→now)", "stem": "Ms. Park ____ in the accounting department since she joined the firm in 2019.", "options": [{"key": "A", "text": "worked"}, {"key": "B", "text": "works"}, {"key": "C", "text": "has worked"}, {"key": "D", "text": "was working"}], "correctKey": "C", "slot": "present perfect", "teach": "since 2019 → has worked."}, {"title": "Demo 3 · This week in progress", "stem": "Our IT team ____ the new payroll system this week, so some reports may be delayed.", "options": [{"key": "A", "text": "installs"}, {"key": "B", "text": "installed"}, {"key": "C", "text": "has installed"}, {"key": "D", "text": "is installing"}], "correctKey": "D", "slot": "present continuous", "teach": "this week + delay now → is installing."}, {"title": "Demo 4 · While + background", "stem": "While the inspectors ____ the warehouse, the manager prepared the safety checklist.", "options": [{"key": "A", "text": "tour"}, {"key": "B", "text": "have toured"}, {"key": "C", "text": "were touring"}, {"key": "D", "text": "are touring"}], "correctKey": "C", "slot": "past continuous", "teach": "While + past background → were touring."}, {"title": "Demo 5 · Future obligation", "stem": "All vendors ____ their invoices by Friday if they want to be paid this month.", "options": [{"key": "A", "text": "submit"}, {"key": "B", "text": "submitted"}, {"key": "C", "text": "have submitted"}, {"key": "D", "text": "must submit"}], "correctKey": "D", "slot": "future obligation", "teach": "by Friday + condition → must submit."}];
  const practice = [{"id": "Q01", "stem": "The board ____ the expansion plan at last Tuesday’s meeting.", "options": [{"key": "A", "text": "approves"}, {"key": "B", "text": "approved"}, {"key": "C", "text": "has approved"}, {"key": "D", "text": "is approving"}], "correctKey": "B", "slot": "simple past", "explain": "last Tuesday → approved."}, {"id": "Q02", "stem": "I ____ three training webinars so far this quarter.", "options": [{"key": "A", "text": "attend"}, {"key": "B", "text": "attended"}, {"key": "C", "text": "have attended"}, {"key": "D", "text": "was attending"}], "correctKey": "C", "slot": "present perfect", "explain": "so far → have attended."}, {"id": "Q03", "stem": "Right now, the receptionist ____ visitors for the product launch.", "options": [{"key": "A", "text": "registers"}, {"key": "B", "text": "registered"}, {"key": "C", "text": "has registered"}, {"key": "D", "text": "is registering"}], "correctKey": "D", "slot": "present continuous", "explain": "Right now → is registering."}, {"id": "Q04", "stem": "The contract ____ tomorrow morning in the main conference room.", "options": [{"key": "A", "text": "will be signed"}, {"key": "B", "text": "signed"}, {"key": "C", "text": "has signed"}, {"key": "D", "text": "was signed"}], "correctKey": "A", "slot": "future", "explain": "tomorrow → will be signed."}, {"id": "Q05", "stem": "When the power failed, the designers ____ on the final slides.", "options": [{"key": "A", "text": "work"}, {"key": "B", "text": "have worked"}, {"key": "C", "text": "were working"}, {"key": "D", "text": "are working"}], "correctKey": "C", "slot": "past continuous", "explain": "When + interrupt → were working."}, {"id": "Q06", "stem": "Our warehouse usually ____ orders before 3:00 p.m.", "options": [{"key": "A", "text": "ships"}, {"key": "B", "text": "shipped"}, {"key": "C", "text": "has shipped"}, {"key": "D", "text": "is shipping"}], "correctKey": "A", "slot": "simple present", "explain": "usually → ships."}, {"id": "Q07", "stem": "She ____ already ____ the revised brochure to the printer.", "options": [{"key": "A", "text": "has / sent"}, {"key": "B", "text": "is / sending"}, {"key": "C", "text": "was / sent"}, {"key": "D", "text": "will / send"}], "correctKey": "A", "slot": "present perfect", "explain": "already → has sent."}, {"id": "Q08", "stem": "Clients ____ the updated pricing list yet.", "options": [{"key": "A", "text": "did not receive"}, {"key": "B", "text": "have not received"}, {"key": "C", "text": "are not receiving"}, {"key": "D", "text": "will not receive"}], "correctKey": "B", "slot": "present perfect", "explain": "yet → have not received."}, {"id": "Q09", "stem": "The shuttle bus ____ every hour between the plant and the hotel.", "options": [{"key": "A", "text": "runs"}, {"key": "B", "text": "ran"}, {"key": "C", "text": "has run"}, {"key": "D", "text": "is run"}], "correctKey": "A", "slot": "simple present", "explain": "every hour → runs."}, {"id": "Q10", "stem": "By next Monday, the auditors ____ their on-site review.", "options": [{"key": "A", "text": "complete"}, {"key": "B", "text": "completed"}, {"key": "C", "text": "will have completed"}, {"key": "D", "text": "are completing"}], "correctKey": "C", "slot": "future perfect", "explain": "By next Monday → will have completed."}, {"id": "Q11", "stem": "Two years ago, the company ____ its first overseas branch.", "options": [{"key": "A", "text": "opens"}, {"key": "B", "text": "opened"}, {"key": "C", "text": "has opened"}, {"key": "D", "text": "is opening"}], "correctKey": "B", "slot": "simple past", "explain": "Two years ago → opened."}, {"id": "Q12", "stem": "Look — the CEO ____ into the lobby right now.", "options": [{"key": "A", "text": "walks"}, {"key": "B", "text": "walked"}, {"key": "C", "text": "has walked"}, {"key": "D", "text": "is walking"}], "correctKey": "D", "slot": "present continuous", "explain": "right now → is walking."}, {"id": "Q13", "stem": "The hiring manager ____ interviews for the analyst role next Wednesday.", "options": [{"key": "A", "text": "conducts"}, {"key": "B", "text": "conducted"}, {"key": "C", "text": "has conducted"}, {"key": "D", "text": "will conduct"}], "correctKey": "D", "slot": "future", "explain": "next Wednesday → will conduct."}, {"id": "Q14", "stem": "While rain ____ outside, the outdoor expo continued under the tents.", "options": [{"key": "A", "text": "falls"}, {"key": "B", "text": "has fallen"}, {"key": "C", "text": "was falling"}, {"key": "D", "text": "is falling"}], "correctKey": "C", "slot": "past continuous", "explain": "While + past → was falling."}, {"id": "Q15", "stem": "If you need parking, you ____ at the visitor desk before 8:30 a.m. tomorrow.", "options": [{"key": "A", "text": "check in"}, {"key": "B", "text": "should check in"}, {"key": "C", "text": "have checked in"}, {"key": "D", "text": "checked in"}], "correctKey": "B", "slot": "future advice", "explain": "tomorrow + advice → should check in."}];
  const slotLabel = "Timeline";

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
