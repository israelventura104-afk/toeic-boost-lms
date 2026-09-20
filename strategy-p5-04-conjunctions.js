(() => {
  const teachHtml = `
<div class="prose">
  <p>In TOEIC Part 5, many items look like four similar connectors. They are not. First ask: <strong>what does the blank join?</strong> A full clause (subject + verb) or a noun phrase? Then pick the connector that matches that job and that meaning (contrast, cause, addition, time).</p>
  <h3>The jobs</h3>
  <div class="slot-grid">
    <article><strong>Clause vs noun</strong><p>This is the #1 trap. <em>Although / because / even though</em> need a clause. <em>Despite / in spite of / because of</em> need a noun.</p><code class="code-strip">Although it rained… · Despite the rain…</code></article>
    <article><strong>Contrast</strong><p>Two ideas go against each other.</p><code class="code-strip">but · although · despite · however · whereas · nevertheless</code></article>
    <article><strong>Cause / result</strong><p>Why something happened, or what followed.</p><code class="code-strip">because · because of · so · so that · therefore · consequently</code></article>
    <article><strong>Addition</strong><p>A second point in the same direction.</p><code class="code-strip">and · moreover · furthermore · in addition</code></article>
    <article><strong>Condition (connector)</strong><p><em>Unless</em> = if not. Not a full conditional lesson — just the link.</p><code class="code-strip">unless · even if · provided that</code></article>
    <article><strong>Time / warning</strong><p>When, or “if you don’t…”</p><code class="code-strip">as soon as · while · otherwise</code></article>
  </div>
  <h3>Method</h3>
  <ol class="method">
    <li><strong>Ignore A–D for three seconds.</strong> Look at what comes right after the blank, and at the punctuation (; or ,).</li>
    <li><strong>Ask: clause or noun?</strong> If you see a subject + verb, you need <em>although / because / even though</em>. If you see a noun, you need <em>despite / because of / in spite of</em>.</li>
    <li><strong>Name the meaning.</strong> Contrast, cause, result, addition, time, or “if not”?</li>
    <li><strong>Eliminate by structure, not by “sounds serious.”</strong> <em>However</em> cannot open a clause the way <em>although</em> can.</li>
  </ol>
  <h3>Fast signals</h3>
  <ul class="signals">
    <li><strong>Blank + subject + verb</strong> → <em>although / even though / because / unless / while / as soon as</em>.</li>
    <li><strong>Blank + noun / -ing</strong> → <em>despite / in spite of / because of</em>.</li>
    <li><strong>Clause ; ____, clause</strong> → transition: <em>however / therefore / moreover / otherwise / nevertheless</em>.</li>
    <li><strong>Two different subjects compared</strong> → often <em>whereas</em> or <em>while</em>.</li>
    <li><strong>Purpose (so someone can…)</strong> → <em>so that</em>.</li>
    <li><strong>Result after a comma, two clauses</strong> → <em>so</em>. After a semicolon → <em>therefore / consequently</em>.</li>
    <li><strong>Do this, or something bad happens</strong> → <em>otherwise</em>.</li>
  </ul>
  <h3>Common traps</h3>
  <ul>
    <li><em>Despite</em> + a full clause (<em>Despite it rained</em>). Use <em>although it rained</em> or <em>despite the rain</em>.</li>
    <li><em>However</em> at the start of a clause with no semicolon: <em>However the flight was late, …</em> That job is <em>although</em>.</li>
    <li><em>Because of</em> + a clause. <em>Because of</em> needs a noun: <em>because of the delay</em>.</li>
    <li><em>Unless</em> mixed with <em>until</em>. <em>Unless</em> = if not. <em>Until</em> is time.</li>
    <li>Translating from Spanish first (that delays the clause-or-noun check).</li>
  </ul>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "____ the flight was delayed, most clients still reached the afternoon workshop.",
      options: [
        { key: "A", text: "Because of" },
        { key: "B", text: "Although" },
        { key: "C", text: "Despite" },
        { key: "D", text: "However" },
      ],
      correctKey: "B",
      slot: "clause vs noun",
      teach: "the flight was delayed is a clause (subject + verb) → Although. Despite and because of need a noun. However needs a semicolon or a new sentence.",
    },
    {
      title: "Demo 2",
      stem: "____ a power cut in Building C, the call center stayed on the backup generators.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "However" },
        { key: "C", text: "Despite" },
        { key: "D", text: "Because" },
      ],
      correctKey: "C",
      slot: "clause vs noun",
      teach: "a power cut is a noun phrase → Despite. Although and because need a clause (Although there was a power cut…).",
    },
    {
      title: "Demo 3",
      stem: "The bid was competitive; ____, the client awarded the contract to a local firm.",
      options: [
        { key: "A", text: "therefore" },
        { key: "B", text: "moreover" },
        { key: "C", text: "likewise" },
        { key: "D", text: "however" },
      ],
      correctKey: "D",
      slot: "contrast",
      teach: "Semicolon + blank + comma is a transition. The two ideas contrast (strong bid, but another firm won) → however. therefore would mean the bid caused the award to the other firm.",
    },
    {
      title: "Demo 4",
      stem: "The store closed early ____ a burst water pipe on the second floor.",
      options: [
        { key: "A", text: "because" },
        { key: "B", text: "although" },
        { key: "C", text: "because of" },
        { key: "D", text: "despite" },
      ],
      correctKey: "C",
      slot: "cause",
      teach: "a burst water pipe is a noun → because of. because needs a clause (because a pipe burst). despite would reverse the meaning.",
    },
    {
      title: "Demo 5",
      stem: "Please label each crate ____ warehouse staff can sort them without opening the lids.",
      options: [
        { key: "A", text: "so that" },
        { key: "B", text: "even if" },
        { key: "C", text: "as if" },
        { key: "D", text: "rather than" },
      ],
      correctKey: "A",
      slot: "purpose",
      teach: "so that + someone can… marks purpose. even if is contrast. rather than compares two actions.",
    },
    {
      title: "Demo 6",
      stem: "____ the invoice is paid by Friday, the shipment will stay in the depot.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "Because" },
        { key: "C", text: "Unless" },
        { key: "D", text: "Since" },
      ],
      correctKey: "C",
      slot: "condition",
      teach: "Unless = if not: if the invoice is not paid, the shipment stays. Although would contrast, not set a condition.",
    },
    {
      title: "Demo 7",
      stem: "Full-time engineers receive a travel card, ____ contractors pay their own fares.",
      options: [
        { key: "A", text: "therefore" },
        { key: "B", text: "whereas" },
        { key: "C", text: "meanwhile" },
        { key: "D", text: "furthermore" },
      ],
      correctKey: "B",
      slot: "contrast",
      teach: "Two different groups compared → whereas. therefore is a result. furthermore adds a point about the same group.",
    },
    {
      title: "Demo 8",
      stem: "Keep your visitor badge visible; ____, security will stop you at the gate.",
      options: [
        { key: "A", text: "otherwise" },
        { key: "B", text: "although" },
        { key: "C", text: "likewise" },
        { key: "D", text: "besides" },
      ],
      correctKey: "A",
      slot: "warning",
      teach: "Do this, or something bad happens → otherwise. although cannot follow a semicolon this way.",
    },
    {
      title: "Demo 9",
      stem: "The lab has 24-hour access; ____, it has a dedicated loading bay for samples.",
      options: [
        { key: "A", text: "furthermore" },
        { key: "B", text: "because" },
        { key: "C", text: "although" },
        { key: "D", text: "despite" },
      ],
      correctKey: "A",
      slot: "addition",
      teach: "A second advantage in the same direction → furthermore. because would need a cause. despite needs a noun and would contrast.",
    },
    {
      title: "Demo 10",
      stem: "Please email the signed form ____ you receive it from the client.",
      options: [
        { key: "A", text: "as soon as" },
        { key: "B", text: "in order to" },
        { key: "C", text: "as well as" },
        { key: "D", text: "instead of" },
      ],
      correctKey: "A",
      slot: "time",
      teach: "as soon as + a clause (you receive it). in order to and instead of need a verb in the base or -ing form, not a clause with you receive.",
    },
  ];

  const practice = [
    {
      id: "Q01",
      stem: "____ rain delayed the outdoor expo, indoor booths stayed open until 6:00 p.m.",
      options: [
        { key: "A", text: "Because of" },
        { key: "B", text: "Although" },
        { key: "C", text: "Despite" },
        { key: "D", text: "However" },
      ],
      correctKey: "B",
      slot: "clause vs noun",
      explain: "rain delayed… is a clause → Although. Despite / because of need a noun (Despite the rain…). However needs a semicolon.",
    },
    {
      id: "Q02",
      stem: "____ several last-minute cancellations, the seminar still reached its seating limit.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "However" },
        { key: "C", text: "Despite" },
        { key: "D", text: "Because" },
      ],
      correctKey: "C",
      slot: "clause vs noun",
      explain: "several last-minute cancellations is a noun phrase → Despite. Although needs a clause.",
    },
    {
      id: "Q03",
      stem: "The software is easy to install; ____, staff still need a one-hour tutorial.",
      options: [
        { key: "A", text: "therefore" },
        { key: "B", text: "moreover" },
        { key: "C", text: "likewise" },
        { key: "D", text: "however" },
      ],
      correctKey: "D",
      slot: "contrast",
      explain: "Easy to install, but a tutorial is still required → however. therefore would mean the ease caused the tutorial.",
    },
    {
      id: "Q04",
      stem: "Demand jumped after the ad campaign; ____, the factory added a weekend shift.",
      options: [
        { key: "A", text: "therefore" },
        { key: "B", text: "although" },
        { key: "C", text: "whereas" },
        { key: "D", text: "despite" },
      ],
      correctKey: "A",
      slot: "result",
      explain: "The extra shift is the result of higher demand → therefore. although / whereas / despite mark contrast, not result.",
    },
    {
      id: "Q05",
      stem: "Flights were rerouted ____ fog at the regional airport.",
      options: [
        { key: "A", text: "because" },
        { key: "B", text: "although" },
        { key: "C", text: "because of" },
        { key: "D", text: "so that" },
      ],
      correctKey: "C",
      slot: "cause",
      explain: "fog is a noun → because of. because needs a clause (because fog closed the runway).",
    },
    {
      id: "Q06",
      stem: "Print the agenda in large type ____ attendees can read it from the back row.",
      options: [
        { key: "A", text: "so that" },
        { key: "B", text: "even if" },
        { key: "C", text: "as if" },
        { key: "D", text: "rather than" },
      ],
      correctKey: "A",
      slot: "purpose",
      explain: "so that + someone can… is purpose. even if is contrast.",
    },
    {
      id: "Q07",
      stem: "Parking in Lot B is free ____ you stay more than three hours.",
      options: [
        { key: "A", text: "although" },
        { key: "B", text: "because" },
        { key: "C", text: "unless" },
        { key: "D", text: "since" },
      ],
      correctKey: "C",
      slot: "condition",
      explain: "Unless = if not: free if you do not stay more than three hours. until would be time, and it is not in the options.",
    },
    {
      id: "Q08",
      stem: "The downtown store opens at 8:00 a.m., ____ the mall branch opens at 10:00.",
      options: [
        { key: "A", text: "therefore" },
        { key: "B", text: "whereas" },
        { key: "C", text: "meanwhile" },
        { key: "D", text: "furthermore" },
      ],
      correctKey: "B",
      slot: "contrast",
      explain: "Two locations compared → whereas. therefore is a result. furthermore adds a point, it does not contrast two subjects.",
    },
    {
      id: "Q09",
      stem: "Save your work before the update; ____, unsaved files will be lost.",
      options: [
        { key: "A", text: "otherwise" },
        { key: "B", text: "although" },
        { key: "C", text: "likewise" },
        { key: "D", text: "besides" },
      ],
      correctKey: "A",
      slot: "warning",
      explain: "Do this, or files are lost → otherwise.",
    },
    {
      id: "Q10",
      stem: "____ the catalog went out late, pre-orders still beat last year's total.",
      options: [
        { key: "A", text: "Because of" },
        { key: "B", text: "In spite of" },
        { key: "C", text: "Even though" },
        { key: "D", text: "Therefore" },
      ],
      correctKey: "C",
      slot: "clause vs noun",
      explain: "the catalog went out late is a clause → Even though. In spite of / because of need a noun.",
    },
    {
      id: "Q11",
      stem: "The new copier prints double-sided; ____, it staples booklets automatically.",
      options: [
        { key: "A", text: "instead" },
        { key: "B", text: "furthermore" },
        { key: "C", text: "otherwise" },
        { key: "D", text: "although" },
      ],
      correctKey: "B",
      slot: "addition",
      explain: "A second feature in the same direction → furthermore. instead would replace the first idea.",
    },
    {
      id: "Q12",
      stem: "The team postponed the shoot ____ the studio lights had not arrived.",
      options: [
        { key: "A", text: "because of" },
        { key: "B", text: "despite" },
        { key: "C", text: "in spite of" },
        { key: "D", text: "because" },
      ],
      correctKey: "D",
      slot: "cause",
      explain: "the studio lights had not arrived is a clause → because. because of needs a noun.",
    },
    {
      id: "Q13",
      stem: "Reviews were mixed; ____, the product sold out in two days.",
      options: [
        { key: "A", text: "therefore" },
        { key: "B", text: "moreover" },
        { key: "C", text: "likewise" },
        { key: "D", text: "nevertheless" },
      ],
      correctKey: "D",
      slot: "contrast",
      explain: "Mixed reviews, but it still sold out → nevertheless. therefore would mean the mixed reviews caused the sell-out.",
    },
    {
      id: "Q14",
      stem: "Start the backup ____ the office closes so the files are ready overnight.",
      options: [
        { key: "A", text: "in order to" },
        { key: "B", text: "as well as" },
        { key: "C", text: "as soon as" },
        { key: "D", text: "instead of" },
      ],
      correctKey: "C",
      slot: "time",
      explain: "as soon as + a clause (the office closes). in order to needs a base verb, not a clause.",
    },
    {
      id: "Q15",
      stem: "The firm hired a local printer ____ shipping the brochures from overseas.",
      options: [
        { key: "A", text: "in spite of" },
        { key: "B", text: "rather than" },
        { key: "C", text: "because of" },
        { key: "D", text: "as soon as" },
      ],
      correctKey: "B",
      slot: "contrast",
      explain: "rather than + -ing compares two options. in spite of would need a noun that is an obstacle, not an alternative action.",
    },
    {
      id: "Q16",
      stem: "____ the technicians replaced the server, clerks took orders by hand.",
      options: [
        { key: "A", text: "While" },
        { key: "B", text: "Unless" },
        { key: "C", text: "Despite" },
        { key: "D", text: "Therefore" },
      ],
      correctKey: "A",
      slot: "time",
      explain: "While + a clause marks two actions at the same time. Despite needs a noun.",
    },
    {
      id: "Q17",
      stem: "The elevator was out of service, ____ visitors used the stairs.",
      options: [
        { key: "A", text: "so" },
        { key: "B", text: "however" },
        { key: "C", text: "despite" },
        { key: "D", text: "although" },
      ],
      correctKey: "A",
      slot: "result",
      explain: "Comma + so links a cause to a result. however needs a semicolon. despite needs a noun.",
    },
    {
      id: "Q18",
      stem: "____ the late start, the crew finished the install before noon.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "However" },
        { key: "C", text: "Because" },
        { key: "D", text: "In spite of" },
      ],
      correctKey: "D",
      slot: "clause vs noun",
      explain: "the late start is a noun phrase → In spite of. Although needs a clause (Although they started late…).",
    },
    {
      id: "Q19",
      stem: "The booth will open ____ fewer than ten visitors sign up.",
      options: [
        { key: "A", text: "because of" },
        { key: "B", text: "in spite of" },
        { key: "C", text: "so that" },
        { key: "D", text: "even if" },
      ],
      correctKey: "D",
      slot: "condition",
      explain: "even if + a clause: the booth opens anyway. because of / in spite of need a noun, not a clause with sign up.",
    },
    {
      id: "Q20",
      stem: "Raw-material prices rose in March; ____, retail tags were updated the same week.",
      options: [
        { key: "A", text: "moreover" },
        { key: "B", text: "consequently" },
        { key: "C", text: "although" },
        { key: "D", text: "whereas" },
      ],
      correctKey: "B",
      slot: "result",
      explain: "The price rise caused the tag update → consequently. moreover would add a second point, not a result.",
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
