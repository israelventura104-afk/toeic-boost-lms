(() => {
  const teachHtml = `
<div class="prose">
  <p>In TOEIC Part 5, many items look like four similar little words. They are not. First find the noun the blank replaces. Then ask: is it the <strong>subject</strong>, the <strong>object</strong>, a <strong>possessive</strong>, or a <strong>reflexive</strong>?</p>
  <h3>The jobs</h3>
  <div class="slot-grid">
    <article><strong>Subject vs object</strong><p><em>who / they / she</em> do the action. <em>whom / them / her</em> receive it.</p><code class="code-strip">the intern who filed… · the trainer whom we hired</code></article>
    <article><strong>Possessive</strong><p><em>whose</em> = of whom / of which. <em>their / its / her</em> go before a noun. <em>theirs / hers / ours</em> stand alone.</p><code class="code-strip">the driver whose van… · lock their drawers · the charger is ours</code></article>
    <article><strong>Relative: people vs things</strong><p><em>who / whom / whose</em> for people. <em>which / that / whose</em> for things.</p><code class="code-strip">the folder which lists… · any badge that has expired</code></article>
    <article><strong>Reflexive</strong><p>Same person does and receives the action: <em>himself / herself / itself / themselves</em>.</p><code class="code-strip">Ms. Park packed the samples herself.</code></article>
    <article><strong>its vs it's</strong><p><em>its</em> = possessive. <em>it's</em> = it is. TOEIC tests this a lot.</p><code class="code-strip">the hotel changed its hours · it's closed on Monday</code></article>
    <article><strong>each other / whoever</strong><p><em>each other</em> = two people, one to the other. <em>whoever</em> = the person who (subject).</p><code class="code-strip">partners should check each other · whoever finishes first</code></article>
  </div>
  <h3>Method</h3>
  <ol class="method">
    <li><strong>Ignore A–D for three seconds.</strong> Circle the noun the blank points back to.</li>
    <li><strong>Ask: person or thing? Subject or object?</strong> If the blank does the verb, you need <em>who</em>. If someone else does the verb to that person, you need <em>whom</em>.</li>
    <li><strong>Check possession.</strong> A noun right after the blank → <em>their / its / whose</em>. No noun after it → <em>theirs / ours / hers</em>.</li>
    <li><strong>Eliminate by job, not by “sounds polite.”</strong> <em>which</em> is wrong for a person. <em>it's</em> is wrong before a noun.</li>
  </ol>
  <h3>Fast signals</h3>
  <ul class="signals">
    <li><strong>Blank + verb</strong> (who designed / who oversees) → <em>who</em>.</li>
    <li><strong>we / they + verb + blank</strong>, or <strong>to / for + blank</strong> → often <em>whom</em> or <em>them</em>.</li>
    <li><strong>Blank + noun</strong> (____ van / ____ hours) → possessive: <em>whose / their / its / her</em>.</li>
    <li><strong>is ____</strong> with no noun after it → <em>ours / hers / theirs</em>.</li>
    <li><strong>a thing + blank + verb</strong> → <em>which</em> or <em>that</em>. Not <em>who</em>.</li>
    <li><strong>did it without help</strong> → <em>himself / herself / itself / themselves</em>.</li>
    <li><strong>two people, one to the other</strong> → <em>each other</em>, not <em>themselves</em>.</li>
  </ul>
  <h3>Common traps</h3>
  <ul>
    <li><em>who</em> after a preposition. After <em>to / for / with</em>, Part 5 often wants <em>whom</em>.</li>
    <li><em>which</em> for a person. People take <em>who / whom / whose</em>.</li>
    <li><em>it's</em> before a noun. That job is <em>its</em> (no apostrophe).</li>
    <li><em>their</em> standing alone. Before a noun: <em>their IDs</em>. Alone: <em>theirs</em>.</li>
    <li>Translating from Spanish first (that delays the subject / object / possessive check).</li>
  </ul>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The technician ____ calibrated the scales will train the new hires tomorrow.",
      options: [
        { key: "A", text: "whom" },
        { key: "B", text: "who" },
        { key: "C", text: "which" },
        { key: "D", text: "whose" },
      ],
      correctKey: "B",
      slot: "relative subject",
      teach: "The technician does the verb calibrated → who. whom is the object. which is for things. whose needs a noun after it.",
    },
    {
      title: "Demo 2",
      stem: "Please email the driver ____ route includes the north warehouse.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "whose" },
        { key: "D", text: "which" },
      ],
      correctKey: "C",
      slot: "possessive",
      teach: "whose + noun (route). who / whom cannot sit before route. which is for things, not the driver's route here.",
    },
    {
      title: "Demo 3",
      stem: "Ms. Park packed the display samples ____ so nothing would be left behind.",
      options: [
        { key: "A", text: "her" },
        { key: "B", text: "hers" },
        { key: "C", text: "she" },
        { key: "D", text: "herself" },
      ],
      correctKey: "D",
      slot: "reflexive",
      teach: "Same person does the packing and is the one who packed → herself. her / she / hers do not mark 'without help.'",
    },
    {
      title: "Demo 4",
      stem: "All clerks must lock ____ drawers before leaving the sales floor.",
      options: [
        { key: "A", text: "their" },
        { key: "B", text: "theirs" },
        { key: "C", text: "them" },
        { key: "D", text: "themselves" },
      ],
      correctKey: "A",
      slot: "possessive adjective",
      teach: "their + noun (drawers). theirs stands alone. them is an object. themselves is reflexive.",
    },
    {
      title: "Demo 5",
      stem: "The architect ____ we consulted last spring will visit the site on Monday.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "which" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" },
      ],
      correctKey: "C",
      slot: "relative object",
      teach: "we consulted the architect → the blank is the object → whom. who would be the subject of consulted.",
    },
    {
      title: "Demo 6",
      stem: "The binder ____ is labeled Q3 belongs on the shelf by the copier.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "whose" },
        { key: "D", text: "which" },
      ],
      correctKey: "D",
      slot: "relative thing",
      teach: "A binder is a thing → which. who / whom are for people. whose would need a noun after it.",
    },
    {
      title: "Demo 7",
      stem: "The kiosk restarts ____ every night at 11:00 p.m.",
      options: [
        { key: "A", text: "it" },
        { key: "B", text: "itself" },
        { key: "C", text: "its" },
        { key: "D", text: "them" },
      ],
      correctKey: "B",
      slot: "reflexive",
      teach: "The kiosk does the action to the same kiosk → itself. it would need a different object. its is possessive.",
    },
    {
      title: "Demo 8",
      stem: "The blue lanyards are ____; guests receive the white ones.",
      options: [
        { key: "A", text: "ours" },
        { key: "B", text: "our" },
        { key: "C", text: "ourselves" },
        { key: "D", text: "us" },
      ],
      correctKey: "A",
      slot: "possessive pronoun",
      teach: "No noun after the blank → ours. our needs a noun (our lanyards). us is an object.",
    },
    {
      title: "Demo 9",
      stem: "Discard any sample ____ arrived without a seal.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "that" },
        { key: "D", text: "whose" },
      ],
      correctKey: "C",
      slot: "relative thing",
      teach: "A sample is a thing → that (or which). who is for people. whose needs a noun after it.",
    },
    {
      title: "Demo 10",
      stem: "The bakery changed ____ weekend hours after the renovation.",
      options: [
        { key: "A", text: "it's" },
        { key: "B", text: "their" },
        { key: "C", text: "them" },
        { key: "D", text: "its" },
      ],
      correctKey: "D",
      slot: "its vs it's",
      teach: "its + noun (weekend hours). it's = it is and cannot sit before hours. The bakery is singular, so not their.",
    },
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The intern ____ filed the permits is covering the front desk this week.",
      options: [
        { key: "A", text: "whom" },
        { key: "B", text: "who" },
        { key: "C", text: "which" },
        { key: "D", text: "whose" },
      ],
      correctKey: "B",
      slot: "relative subject",
      explain: "The intern does filed → who. whom is the object. which is for things.",
    },
    {
      id: "Q02",
      stem: "Call the mechanic ____ van is parked behind the loading dock.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "whose" },
        { key: "D", text: "which" },
      ],
      correctKey: "C",
      slot: "possessive",
      explain: "whose + noun (van). who cannot sit before van.",
    },
    {
      id: "Q03",
      stem: "Mr. Nguyen installed the software ____ after the vendor call ended.",
      options: [
        { key: "A", text: "him" },
        { key: "B", text: "his" },
        { key: "C", text: "he" },
        { key: "D", text: "himself" },
      ],
      correctKey: "D",
      slot: "reflexive",
      explain: "He did the installing with no one else → himself.",
    },
    {
      id: "Q04",
      stem: "Please ask the auditors to leave ____ IDs at reception.",
      options: [
        { key: "A", text: "their" },
        { key: "B", text: "theirs" },
        { key: "C", text: "them" },
        { key: "D", text: "themselves" },
      ],
      correctKey: "A",
      slot: "possessive adjective",
      explain: "their + noun (IDs). theirs stands alone.",
    },
    {
      id: "Q05",
      stem: "The trainer ____ the HR team selected will start on May 4.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "which" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" },
      ],
      correctKey: "C",
      slot: "relative object",
      explain: "the HR team selected the trainer → object → whom.",
    },
    {
      id: "Q06",
      stem: "Open the folder ____ lists the approved vendors for office supplies.",
      options: [
        { key: "A", text: "which" },
        { key: "B", text: "who" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" },
      ],
      correctKey: "A",
      slot: "relative thing",
      explain: "A folder is a thing → which. who is for people.",
    },
    {
      id: "Q07",
      stem: "The camera turns ____ off after ten minutes of no movement.",
      options: [
        { key: "A", text: "it" },
        { key: "B", text: "its" },
        { key: "C", text: "itself" },
        { key: "D", text: "them" },
      ],
      correctKey: "C",
      slot: "reflexive",
      explain: "The camera does the action to the same camera → itself.",
    },
    {
      id: "Q08",
      stem: "The spare charger on the table is ____; do not pack it with the kit.",
      options: [
        { key: "A", text: "our" },
        { key: "B", text: "ours" },
        { key: "C", text: "ourselves" },
        { key: "D", text: "us" },
      ],
      correctKey: "B",
      slot: "possessive pronoun",
      explain: "No noun after the blank → ours. our needs a noun.",
    },
    {
      id: "Q09",
      stem: "Replace every bulb ____ has started to flicker.",
      options: [
        { key: "A", text: "that" },
        { key: "B", text: "who" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" },
      ],
      correctKey: "A",
      slot: "relative thing",
      explain: "A bulb is a thing → that. who is for people.",
    },
    {
      id: "Q10",
      stem: "The museum posted ____ new visitor rules on the website.",
      options: [
        { key: "A", text: "it's" },
        { key: "B", text: "their" },
        { key: "C", text: "its" },
        { key: "D", text: "them" },
      ],
      correctKey: "C",
      slot: "its vs it's",
      explain: "its + noun (visitor rules). it's = it is. The museum is singular, so not their.",
    },
    {
      id: "Q11",
      stem: "Applicants should prepare ____ for a 20-minute skills test.",
      options: [
        { key: "A", text: "them" },
        { key: "B", text: "themselves" },
        { key: "C", text: "their" },
        { key: "D", text: "they" },
      ],
      correctKey: "B",
      slot: "reflexive",
      explain: "prepare themselves = get ready, same people. their needs a noun.",
    },
    {
      id: "Q12",
      stem: "The red notebook is ____; the black one is for shared notes.",
      options: [
        { key: "A", text: "her" },
        { key: "B", text: "herself" },
        { key: "C", text: "she" },
        { key: "D", text: "hers" },
      ],
      correctKey: "D",
      slot: "possessive pronoun",
      explain: "No noun after the blank → hers. her needs a noun (her notebook).",
    },
    {
      id: "Q13",
      stem: "During the drill, partners should check ____ for the exit route.",
      options: [
        { key: "A", text: "themselves" },
        { key: "B", text: "anyone" },
        { key: "C", text: "whoever" },
        { key: "D", text: "each other" },
      ],
      correctKey: "D",
      slot: "reciprocal",
      explain: "Two partners, one to the other → each other. themselves would mean each person checks only herself or himself.",
    },
    {
      id: "Q14",
      stem: "____ finishes the inventory first should start labeling the boxes.",
      options: [
        { key: "A", text: "Whomever" },
        { key: "B", text: "Whatever" },
        { key: "C", text: "Whoever" },
        { key: "D", text: "Whichever" },
      ],
      correctKey: "C",
      slot: "whoever",
      explain: "Whoever is the subject of finishes. Whomever is the object. Whichever needs a noun set to choose from.",
    },
    {
      id: "Q15",
      stem: "Use ____ entrance is closer to your assigned hall.",
      options: [
        { key: "A", text: "whenever" },
        { key: "B", text: "whichever" },
        { key: "C", text: "wherever" },
        { key: "D", text: "however" },
      ],
      correctKey: "B",
      slot: "whichever",
      explain: "whichever + noun (entrance) = any one of the set. whenever is time. wherever is place.",
    },
    {
      id: "Q16",
      stem: "Please copy the analyst ____ the report was originally addressed.",
      options: [
        { key: "A", text: "to whom" },
        { key: "B", text: "who" },
        { key: "C", text: "which" },
        { key: "D", text: "whose" },
      ],
      correctKey: "A",
      slot: "relative object",
      explain: "addressed to the analyst → to whom. who would be the subject of addressed.",
    },
    {
      id: "Q17",
      stem: "If guests arrive early, offer ____ coffee in the waiting area.",
      options: [
        { key: "A", text: "them" },
        { key: "B", text: "they" },
        { key: "C", text: "their" },
        { key: "D", text: "themselves" },
      ],
      correctKey: "A",
      slot: "object",
      explain: "offer someone coffee → object pronoun them. they is the subject. their needs a noun.",
    },
    {
      id: "Q18",
      stem: "The factory ____ output rose last quarter will add a night shift.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "which" },
        { key: "D", text: "whose" },
      ],
      correctKey: "D",
      slot: "possessive",
      explain: "whose + noun (output). which cannot sit before output without of (the factory of which the output…).",
    },
    {
      id: "Q19",
      stem: "The coordinator ____ oversees catering also books the hotel block.",
      options: [
        { key: "A", text: "whom" },
        { key: "B", text: "which" },
        { key: "C", text: "whose" },
        { key: "D", text: "who" },
      ],
      correctKey: "D",
      slot: "relative subject",
      explain: "The coordinator does oversees → who. whom is the object.",
    },
    {
      id: "Q20",
      stem: "The airline revised ____ baggage policy for carry-on cases.",
      options: [
        { key: "A", text: "it's" },
        { key: "B", text: "its" },
        { key: "C", text: "their" },
        { key: "D", text: "them" },
      ],
      correctKey: "B",
      slot: "its vs it's",
      explain: "its + noun (baggage policy). it's = it is. The airline is singular, so not their.",
    },
  ];

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
function bootStrategyClass({ teachHtml, demos, practice }) {
  const total = practice.length;
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
  const demoAnswers = new Map();
  const demoOpened = new Set();
  const demoMeta = document.getElementById("demo-meta");
  const demoStage = document.getElementById("demo-stage");
  const demoProgress = document.getElementById("demo-progress");
  const demoPrev = document.getElementById("demo-prev");
  const demoNext = document.getElementById("demo-next");
  const demoReveal = document.getElementById("demo-reveal");

  function renderDemo() {
    const item = demos[demoIndex];
    const selected = demoAnswers.get(demoIndex);
    const opened = demoOpened.has(demoIndex);
    const right = item.options.find((o) => o.key === item.correctKey);
    const ok = selected === item.correctKey;
    demoMeta.textContent = `${demoIndex + 1} of ${demos.length}`;
    demoProgress.style.width = `${((demoIndex + 1) / demos.length) * 100}%`;
    const options = item.options.map((opt) => {
      const classes = ["opt"];
      if (selected === opt.key) classes.push("selected");
      if (opened && opt.key === item.correctKey) classes.push("correct");
      if (opened && selected === opt.key && !ok) classes.push("miss");
      return `
      <button type="button" class="${classes.join(" ")}" data-key="${escapeHtml(opt.key)}" ${opened ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`;
    }).join("");
    const verdict = ok
      ? `Correct · ${item.correctKey}. ${right?.text || ""}`
      : `Not this time · the answer is ${item.correctKey}. ${right?.text || ""}`;
    demoStage.innerHTML = `
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>
      <p class="status" id="demo-hint" hidden>Choose A, B, C, or D first.</p>
      <div class="teach-box ${ok ? "ok" : "bad"}" id="demo-teach" ${opened ? "" : "hidden"}>
        <strong>${escapeHtml(verdict)}</strong>
        <p style="margin:8px 0 0">${escapeHtml(item.teach)}</p>
      </div>`;
    demoStage.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (demoOpened.has(demoIndex)) return;
        demoAnswers.set(demoIndex, btn.getAttribute("data-key"));
        renderDemo();
      });
    });
    demoPrev.disabled = demoIndex === 0;
    demoNext.textContent = demoIndex === demos.length - 1 ? "Continue to Practice" : "Next";
    demoReveal.textContent = opened ? "Hide feedback" : "See feedback";
  }

  demoPrev.addEventListener("click", () => { if (demoIndex > 0) { demoIndex -= 1; renderDemo(); } });
  demoNext.addEventListener("click", () => {
    if (demoIndex < demos.length - 1) { demoIndex += 1; renderDemo(); return; }
    document.querySelector('.tab[data-tab="practice"]').click();
  });
  demoReveal.addEventListener("click", () => {
    const hint = document.getElementById("demo-hint");
    if (!demoAnswers.has(demoIndex)) {
      if (hint) hint.hidden = false;
      return;
    }
    if (demoOpened.has(demoIndex)) demoOpened.delete(demoIndex);
    else demoOpened.add(demoIndex);
    renderDemo();
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
  const reviewList = document.getElementById("review-list");

  function updatePracticeChrome() {
    const n = answers.size;
    if (n === total && !submitted) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `All ${total} answered. Submit when you are ready.`;
    } else {
      practiceStatus.hidden = true;
    }
    practiceProgress.style.width = `${((qIndex + 1) / total) * 100}%`;
    practiceMeta.textContent = `${qIndex + 1} of ${total}` + (n ? ` · ${n} answered` : "");
    practicePrev.disabled = qIndex === 0 || submitted;
    if (qIndex === total - 1) {
      practiceNext.hidden = true;
      submitRow.hidden = false;
    } else {
      practiceNext.hidden = false;
      practiceNext.textContent = "Next";
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
  practiceNext.addEventListener("click", () => { if (qIndex < total - 1) { qIndex += 1; renderPractice(); } });

  submitBtn.addEventListener("click", () => {
    if (answers.size < total) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `Answer all ${total} before submitting (${answers.size}/${total}).`;
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
    scoreLine.textContent = `${correct} / ${total}`;
    reviewList.innerHTML = review.map(({ index, item, chosen, chosenText, rightText, ok }) => `
      <article class="review-item ${ok ? "ok" : "bad"}">
        <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"}</h4>
        <p class="stem">${formatStem(item.stem)}</p>
        <p>Your answer: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
        <p>Answer: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>
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

  bootStrategyClass({ teachHtml, demos, practice });
})();
