(() => {
  const teachHtml = `
<div class="prose">
  <p>In TOEIC Part 5, many items look like vocabulary. They are not. Options often share the <em>same root</em> (<em>decide / decision / decisive / decisively</em>). Name the <strong>grammatical slot</strong>, then pick the matching form.</p>
  <h3>The four slots</h3>
  <div class="slot-grid">
    <article><strong>Noun</strong><p>Names a person, thing, idea, or process.</p><code class="code-strip">the decision · her professionalism</code></article>
    <article><strong>Verb</strong><p>Shows the action or state (tense / agreement).</p><code class="code-strip">will decide · to negotiate</code></article>
    <article><strong>Adjective</strong><p>Describes a noun (before noun or after be).</p><code class="code-strip">a comprehensive guide</code></article>
    <article><strong>Adverb</strong><p>Describes a verb, an adjective, or a whole idea.</p><code class="code-strip">work closely · highly useful</code></article>
  </div>
  <h3>Method</h3>
  <ol class="method">
    <li><strong>Ignore A–D for three seconds.</strong> Look before and after the blank.</li>
    <li><strong>Ask:</strong> noun, verb, adjective, or adverb?</li>
    <li><strong>Match the ending to the job</strong> (-tion / -ive / -ly / base verb…).</li>
    <li><strong>Eliminate by structure</strong>, not by “sounds nice.”</li>
  </ol>
  <h3>Fast signals</h3>
  <ul class="signals">
    <li>Article + blank + noun → often <strong>adjective</strong></li>
    <li>Possessive + blank (end) → often <strong>noun</strong></li>
    <li>Modal / infinitive <em>to</em> + blank → <strong>base verb</strong></li>
    <li>Subject + blank + object → <strong>verb</strong></li>
    <li>Verb present + blank nearby → often <strong>adverb</strong></li>
    <li>Blank + adjective → <strong>adverb of degree</strong> (<em>highly successful</em>)</li>
    <li>Preposition + <em>the</em> + blank → usually <strong>noun</strong></li>
  </ul>
  <div class="callout"><strong>Teacher move</strong><p>Ask only: <em>“Noun, verb, adjective, or adverb?”</em> — then open options.</p></div>
  <h3>Common traps</h3>
  <ul>
    <li>Noun because it “feels serious” when the blank needs an adverb</li>
    <li>The other noun in the same family (<em>profession</em> vs <em>professionalism</em>; <em>negotiation</em> vs <em>negotiator</em>)</li>
    <li>-ing / -ed without checking if a tensed verb is required</li>
    <li>Translating from Spanish before the slot check</li>
  </ul>
</div>
`;
  const demos = [
    {
      title: "Demo 1 · Adjective before a noun",
      stem: "New hires received a ____ guide to the company's travel policy.",
      options: [
        { key: "A", text: "comprehend" },
        { key: "B", text: "comprehension" },
        { key: "C", text: "comprehensive" },
        { key: "D", text: "comprehensively" },
      ],
      correctKey: "C",
      slot: "adjective",
      teach: "Article + blank + noun (guide) → adjective comprehensive. Comprehend is a verb; comprehension is a noun; comprehensively is an adverb.",
    },
    {
      title: "Demo 2 · Noun after an adjective",
      stem: "After careful ____, the committee approved the vendor shortlist.",
      options: [
        { key: "A", text: "consider" },
        { key: "B", text: "consideration" },
        { key: "C", text: "considerable" },
        { key: "D", text: "considerably" },
      ],
      correctKey: "B",
      slot: "noun",
      teach: "Adjective careful + blank → noun consideration. Consider is a verb; considerable is an adjective (it needs a noun after it); considerably is an adverb.",
    },
    {
      title: "Demo 3 · Verb after to",
      stem: "The purchasing team hopes to ____ a two-year contract with the supplier.",
      options: [
        { key: "A", text: "negotiate" },
        { key: "B", text: "negotiation" },
        { key: "C", text: "negotiable" },
        { key: "D", text: "negotiator" },
      ],
      correctKey: "A",
      slot: "verb",
      teach: "Infinitive to + blank → base verb negotiate. Watch the two nouns: negotiation is the process; negotiator is the person. Negotiable is an adjective.",
    },
    {
      title: "Demo 4 · Adverb before an adjective",
      stem: "The new inventory software has proven ____ useful during the holiday rush.",
      options: [
        { key: "A", text: "high" },
        { key: "B", text: "highly" },
        { key: "C", text: "height" },
        { key: "D", text: "heighten" },
      ],
      correctKey: "B",
      slot: "adverb",
      teach: "Blank + adjective useful → adverb highly. High is an adjective; height is a noun; heighten is a verb. This pattern (highly / extremely / increasingly + adjective) is frequent in Part 5.",
    },
    {
      title: "Demo 5 · Noun after a preposition",
      stem: "Trainees were given a handbook on the ____ of the new software.",
      options: [
        { key: "A", text: "operate" },
        { key: "B", text: "operation" },
        { key: "C", text: "operational" },
        { key: "D", text: "operationally" },
      ],
      correctKey: "B",
      slot: "noun",
      teach: "Preposition + the + blank + of → noun operation. Operate is a verb; operational is an adjective; operationally is an adverb.",
    },
  ];
  
  const practice = [
    {
      id: "Q01",
      stem: "The travel office asked employees to ____ receipts within five business days.",
      options: [
        { key: "A", text: "submit" },
        { key: "B", text: "submission" },
        { key: "C", text: "submitted" },
        { key: "D", text: "submitting" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "After infinitive to, use the base verb submit. Submission is a noun; submitted and submitting cannot follow ask someone to.",
    },
    {
      id: "Q02",
      stem: "The firm is seeking a ____ assistant to support the legal team.",
      options: [
        { key: "A", text: "rely" },
        { key: "B", text: "reliable" },
        { key: "C", text: "reliability" },
        { key: "D", text: "reliably" },
      ],
      correctKey: "B",
      slot: "adjective",
      explain: "Article + blank + noun assistant → adjective reliable. Rely is a verb; reliability is a noun; reliably is an adverb.",
    },
    {
      id: "Q03",
      stem: "Ms. Cho is responsible for the ____ of all regional sales reports.",
      options: [
        { key: "A", text: "compile" },
        { key: "B", text: "compiled" },
        { key: "C", text: "compilation" },
        { key: "D", text: "compiling" },
      ],
      correctKey: "C",
      slot: "noun",
      explain: "The + blank + of needs a noun: the compilation of. Compiling would fit responsible for compiling (no the). Compile is a verb; compiled is a participle.",
    },
    {
      id: "Q04",
      stem: "The redesigned checkout process has been ____ popular with regular customers this quarter.",
      options: [
        { key: "A", text: "increase" },
        { key: "B", text: "increasing" },
        { key: "C", text: "increased" },
        { key: "D", text: "increasingly" },
      ],
      correctKey: "D",
      slot: "adverb",
      explain: "The blank modifies the adjective popular → adverb increasingly. Increase is a verb; increasing and increased cannot modify an adjective.",
    },
    {
      id: "Q05",
      stem: "Department heads must ____ all overtime requests before Friday.",
      options: [
        { key: "A", text: "approve" },
        { key: "B", text: "approval" },
        { key: "C", text: "approved" },
        { key: "D", text: "approving" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "After the modal must, use the base verb approve. Approval is a noun; approved and approving are not used after a modal.",
    },
    {
      id: "Q06",
      stem: "Please confirm your ____ for the Thursday training session.",
      options: [
        { key: "A", text: "attend" },
        { key: "B", text: "attendance" },
        { key: "C", text: "attentive" },
        { key: "D", text: "attentively" },
      ],
      correctKey: "B",
      slot: "noun",
      explain: "Possessive your + blank → noun attendance (being present). Attentive / attentively mean paying attention, not showing up. Attend is a verb.",
    },
    {
      id: "Q07",
      stem: "A ____ review of the budget revealed several unnecessary expenses.",
      options: [
        { key: "A", text: "care" },
        { key: "B", text: "carefully" },
        { key: "C", text: "careful" },
        { key: "D", text: "cared" },
      ],
      correctKey: "C",
      slot: "adjective",
      explain: "Article + blank + noun review → adjective careful. Carefully is an adverb; care is a noun/verb; cared is a verb form.",
    },
    {
      id: "Q08",
      stem: "Employees are expected to work ____ with the visiting auditors this week.",
      options: [
        { key: "A", text: "close" },
        { key: "B", text: "closely" },
        { key: "C", text: "closeness" },
        { key: "D", text: "closed" },
      ],
      correctKey: "B",
      slot: "adverb",
      explain: "Work closely with is the office collocation. The blank modifies the verb work → adverb closely. Close and closed are adjectives; closeness is a noun.",
    },
    {
      id: "Q09",
      stem: "Mr. Patel will ____ product samples at the trade fair next week.",
      options: [
        { key: "A", text: "distribute" },
        { key: "B", text: "distribution" },
        { key: "C", text: "distributed" },
        { key: "D", text: "distributing" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "After will, use the base verb distribute. Distribution is a noun; distributed and distributing cannot follow will.",
    },
    {
      id: "Q10",
      stem: "The conference rooms are ____ for staff meetings after 3:00 p.m.",
      options: [
        { key: "A", text: "suit" },
        { key: "B", text: "suitably" },
        { key: "C", text: "suitable" },
        { key: "D", text: "suitability" },
      ],
      correctKey: "C",
      slot: "adjective",
      explain: "After the linking verb are, use an adjective: suitable. Suit is a verb; suitably is an adverb; suitability is a noun.",
    },
    {
      id: "Q11",
      stem: "The board approved the ____ of two new branch offices overseas.",
      options: [
        { key: "A", text: "establish" },
        { key: "B", text: "established" },
        { key: "C", text: "establishing" },
        { key: "D", text: "establishment" },
      ],
      correctKey: "D",
      slot: "noun",
      explain: "The + blank + of needs a noun: the establishment of. Establish is a verb; established is a participle; establishing would drop the.",
    },
    {
      id: "Q12",
      stem: "The updated brochure explains our services more ____ than the previous version.",
      options: [
        { key: "A", text: "clear" },
        { key: "B", text: "clearly" },
        { key: "C", text: "clarity" },
        { key: "D", text: "clearer" },
      ],
      correctKey: "B",
      slot: "adverb",
      explain: "The blank modifies the verb explains → adverb clearly. Clearer is an adjective comparative and cannot modify a verb. Clarity is a noun; clear is an adjective.",
    },
    {
      id: "Q13",
      stem: "Please ____ a copy of the signed contract to the legal department.",
      options: [
        { key: "A", text: "attach" },
        { key: "B", text: "attachment" },
        { key: "C", text: "attached" },
        { key: "D", text: "attaching" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "The sentence is an imperative, so it needs the base verb attach. Attachment is a noun; attached and attaching are not used as the main verb here.",
    },
    {
      id: "Q14",
      stem: "The manager requested a ____ estimate before approving the renovation.",
      options: [
        { key: "A", text: "revise" },
        { key: "B", text: "revision" },
        { key: "C", text: "revising" },
        { key: "D", text: "revised" },
      ],
      correctKey: "D",
      slot: "adjective",
      explain: "Article + blank + noun estimate → adjective revised. Revise is a verb; revision is a noun; revising is a gerund.",
    },
    {
      id: "Q15",
      stem: "All safety procedures must be followed ____ to prevent equipment damage.",
      options: [
        { key: "A", text: "strict" },
        { key: "B", text: "strictness" },
        { key: "C", text: "strictly" },
        { key: "D", text: "stricter" },
      ],
      correctKey: "C",
      slot: "adverb",
      explain: "The blank modifies the verb followed → adverb strictly. Strict and stricter are adjectives; strictness is a noun.",
    },
  ];
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
