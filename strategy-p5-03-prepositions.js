(() => {
  const teachHtml = `
<div class="prose">
  <p>In TOEIC Part 5, many items look like four small words at random. They are not. The blank is almost always a <em>chunk</em>: time, place, a verb + preposition, or an adjective / noun + preposition. Read the words next to the blank, then pick the preposition that belongs in that chunk.</p>
  <h3>The patterns</h3>
  <div class="slot-grid">
    <article><strong>Time: in / on / at</strong><p><em>in</em> months and years; <em>on</em> days and dates; <em>at</em> clock times.</p><code class="code-strip">in July · on Monday · at 9:30 a.m.</code></article>
    <article><strong>Place: in / on / at</strong><p><em>in</em> a city or room; <em>on</em> a floor, page, or street; <em>at</em> a point (airport, entrance, desk).</p><code class="code-strip">in Seoul · on page 12 · at the entrance</code></article>
    <article><strong>By vs until</strong><p><em>by</em> = deadline (finished no later than). <em>until</em> = how long something continues.</p><code class="code-strip">submit by Friday · open until 8:00 p.m.</code></article>
    <article><strong>For / during / since</strong><p><em>for</em> + a period; <em>during</em> + an event; <em>since</em> + a starting point.</p><code class="code-strip">for six months · during the meeting · since January</code></article>
    <article><strong>Verb + preposition</strong><p>Learn the pair as one piece. Do not translate from Spanish.</p><code class="code-strip">apply for · consist of · look forward to · recover from</code></article>
    <article><strong>Adjective / noun + preposition</strong><p>The noun or adjective picks the preposition.</p><code class="code-strip">similar to · familiar with · access to · impact on</code></article>
  </div>
  <h3>Method</h3>
  <ol class="method">
    <li><strong>Ignore A–D for three seconds.</strong> Look at the word before the blank and the word after it.</li>
    <li><strong>Ask: which chunk?</strong> Time, place, deadline, duration, or a fixed pair?</li>
    <li><strong>Match the preposition to that chunk.</strong> <em>Monday</em> → <em>on</em>; <em>apply ____ a job</em> → <em>for</em>; <em>by Friday</em> ≠ <em>until Friday</em>.</li>
    <li><strong>Eliminate by the chunk, not by “sounds nice.”</strong> A familiar preposition in the wrong pair is still wrong.</li>
  </ol>
  <h3>Fast signals</h3>
  <ul class="signals">
    <li><strong>Monday / Tuesday / July 12</strong> → <em>on</em>. Months and years → <em>in</em>. Clock times → <em>at</em>.</li>
    <li><strong>the airport / the entrance / the desk</strong> → often <em>at</em>.</li>
    <li><strong>a page / a floor / a street</strong> → <em>on</em>.</li>
    <li><strong>must be finished ____ Friday</strong> → <em>by</em> (deadline). <strong>stays open ____ Friday</strong> → <em>until</em>.</li>
    <li><strong>____ two weeks / six months</strong> → <em>for</em>. <strong>____ the meeting</strong> → <em>during</em>.</li>
    <li><strong>from 9:00 ____ 5:00</strong> → <em>to</em>. Two points (hotel and station) → <em>between</em>.</li>
    <li><strong>apply ____ a post</strong> → <em>for</em>. <strong>consist ____</strong> → <em>of</em>. <strong>look forward ____</strong> → <em>to</em>.</li>
    <li><strong>similar ____</strong> → <em>to</em>. <strong>familiar ____</strong> → <em>with</em>. <strong>access ____</strong> → <em>to</em>. <strong>impact ____</strong> → <em>on</em>.</li>
    <li><strong>on behalf of / prior to / regardless of / according to</strong> — learn the whole phrase.</li>
  </ul>
  <h3>Common traps</h3>
  <ul>
    <li><em>in Monday</em> (Spanish <em>en lunes</em>). English wants <em>on Monday</em>.</li>
    <li><em>until</em> when the sentence needs a deadline. If the work must be <em>finished</em>, use <em>by</em>.</li>
    <li>Translating the verb: <em>depend of</em>, <em>responsible of</em>, <em>interested on</em>. Learn the English pair.</li>
    <li><em>between</em> is for two; <em>among</em> is for more than two.</li>
    <li>Translating from Spanish first (that delays the chunk check).</li>
  </ul>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The plant is closed ____ Monday for equipment maintenance.",
      options: [
        { key: "A", text: "in" },
        { key: "B", text: "on" },
        { key: "C", text: "at" },
        { key: "D", text: "by" },
      ],
      correctKey: "B",
      slot: "time",
      teach: "Days of the week take on: on Monday. in is for months and years. at is for clock times.",
    },
    {
      title: "Demo 2",
      stem: "The briefing starts ____ 9:30 a.m. in the main hall.",
      options: [
        { key: "A", text: "at" },
        { key: "B", text: "on" },
        { key: "C", text: "in" },
        { key: "D", text: "to" },
      ],
      correctKey: "A",
      slot: "time",
      teach: "Clock times take at: at 9:30 a.m. on is for days. in is for months, years, or parts of the day like in the morning when no clock time is given.",
    },
    {
      title: "Demo 3",
      stem: "Please wait for the driver ____ the main entrance.",
      options: [
        { key: "A", text: "in" },
        { key: "B", text: "on" },
        { key: "C", text: "at" },
        { key: "D", text: "to" },
      ],
      correctKey: "C",
      slot: "place",
      teach: "A meeting point (entrance, desk, airport) takes at. in the entrance would mean inside it. on the entrance is not English here.",
    },
    {
      title: "Demo 4",
      stem: "All timesheets must be submitted ____ Friday if staff want to be paid next week.",
      options: [
        { key: "A", text: "until" },
        { key: "B", text: "since" },
        { key: "C", text: "during" },
        { key: "D", text: "by" },
      ],
      correctKey: "D",
      slot: "deadline",
      teach: "must be submitted = a deadline → by Friday. until Friday would mean the submitting continues up to Friday, not that it is finished then.",
    },
    {
      title: "Demo 5",
      stem: "The intern has been with the firm ____ six months.",
      options: [
        { key: "A", text: "for" },
        { key: "B", text: "during" },
        { key: "C", text: "since" },
        { key: "D", text: "while" },
      ],
      correctKey: "A",
      slot: "duration",
      teach: "for + a period (six months). since needs a starting point (since January). during needs an event (during the internship). while is a conjunction, not a preposition here.",
    },
    {
      title: "Demo 6",
      stem: "Several technicians have applied ____ the night-shift supervisor post.",
      options: [
        { key: "A", text: "to" },
        { key: "B", text: "for" },
        { key: "C", text: "at" },
        { key: "D", text: "on" },
      ],
      correctKey: "B",
      slot: "verb + prep",
      teach: "apply for a job or post. apply to a company or school. The object is the post, so for.",
    },
    {
      title: "Demo 7",
      stem: "The new policy is similar ____ last year's remote-work guidelines.",
      options: [
        { key: "A", text: "with" },
        { key: "B", text: "from" },
        { key: "C", text: "to" },
        { key: "D", text: "of" },
      ],
      correctKey: "C",
      slot: "adjective + prep",
      teach: "similar to. different from. Do not use similar with or similar of.",
    },
    {
      title: "Demo 8",
      stem: "Reports must be written ____ the company style guide.",
      options: [
        { key: "A", text: "according to" },
        { key: "B", text: "according with" },
        { key: "C", text: "according of" },
        { key: "D", text: "according for" },
      ],
      correctKey: "A",
      slot: "phrase",
      teach: "according to + a source or rule. Not according with (that is in accordance with, a different phrase).",
    },
    {
      title: "Demo 9",
      stem: "There has been an increase ____ online orders since the catalog launch.",
      options: [
        { key: "A", text: "of" },
        { key: "B", text: "on" },
        { key: "C", text: "at" },
        { key: "D", text: "in" },
      ],
      correctKey: "D",
      slot: "noun + prep",
      teach: "an increase in + the thing that grew. increase of is used with a number (an increase of 10%). Here the object is online orders, so in.",
    },
    {
      title: "Demo 10",
      stem: "Ms. Cho spoke ____ the director at the supplier dinner.",
      options: [
        { key: "A", text: "on behalf of" },
        { key: "B", text: "in behalf of" },
        { key: "C", text: "by behalf of" },
        { key: "D", text: "at behalf of" },
      ],
      correctKey: "A",
      slot: "phrase",
      teach: "on behalf of = representing someone. in behalf of is the usual trap. Learn the whole phrase.",
    },
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The warehouse ships rush orders ____ Tuesday and Thursday only.",
      options: [
        { key: "A", text: "in" },
        { key: "B", text: "on" },
        { key: "C", text: "at" },
        { key: "D", text: "by" },
      ],
      correctKey: "B",
      slot: "time",
      explain: "Days of the week take on: on Tuesday. in is for months and years.",
    },
    {
      id: "Q02",
      stem: "A courtesy desk will open ____ the airport for delayed passengers.",
      options: [
        { key: "A", text: "in" },
        { key: "B", text: "on" },
        { key: "C", text: "at" },
        { key: "D", text: "to" },
      ],
      correctKey: "C",
      slot: "place",
      explain: "at the airport is a point. in the airport can mean inside the building, but Part 5 almost always keys at with airport / station / entrance.",
    },
    {
      id: "Q03",
      stem: "The merger was announced ____ July.",
      options: [
        { key: "A", text: "on" },
        { key: "B", text: "at" },
        { key: "C", text: "to" },
        { key: "D", text: "in" },
      ],
      correctKey: "D",
      slot: "time",
      explain: "Months take in: in July. on July would need a date (on July 12).",
    },
    {
      id: "Q04",
      stem: "Please return the badge ____ noon so the next visitor can use it.",
      options: [
        { key: "A", text: "by" },
        { key: "B", text: "until" },
        { key: "C", text: "during" },
        { key: "D", text: "since" },
      ],
      correctKey: "A",
      slot: "deadline",
      explain: "The badge must be back no later than noon → by. until noon would mean keep it up to noon, not hand it in.",
    },
    {
      id: "Q05",
      stem: "The help line remains open ____ midnight on weekdays.",
      options: [
        { key: "A", text: "by" },
        { key: "B", text: "at" },
        { key: "C", text: "until" },
        { key: "D", text: "on" },
      ],
      correctKey: "C",
      slot: "duration",
      explain: "remains open = continues → until midnight. by midnight would be a finish-by deadline.",
    },
    {
      id: "Q06",
      stem: "The system will be offline ____ three days during the upgrade.",
      options: [
        { key: "A", text: "for" },
        { key: "B", text: "since" },
        { key: "C", text: "at" },
        { key: "D", text: "until" },
      ],
      correctKey: "A",
      slot: "duration",
      explain: "for + a period (three days). since needs a starting point. until needs an end point, not a length.",
    },
    {
      id: "Q07",
      stem: "Laptops must stay closed ____ the keynote speech.",
      options: [
        { key: "A", text: "for" },
        { key: "B", text: "since" },
        { key: "C", text: "during" },
        { key: "D", text: "until" },
      ],
      correctKey: "C",
      slot: "duration",
      explain: "during + an event (the keynote speech). until the keynote would mean up to the start, not through the talk.",
    },
    {
      id: "Q08",
      stem: "The shuttle runs ____ 6:00 a.m. to 10:00 p.m.",
      options: [
        { key: "A", text: "at" },
        { key: "B", text: "from" },
        { key: "C", text: "on" },
        { key: "D", text: "by" },
      ],
      correctKey: "B",
      slot: "range",
      explain: "from … to marks a range. at 6:00 would be one clock time, not a span.",
    },
    {
      id: "Q09",
      stem: "The welcome kit consists ____ a badge, a map, and a parking pass.",
      options: [
        { key: "A", text: "of" },
        { key: "B", text: "in" },
        { key: "C", text: "with" },
        { key: "D", text: "from" },
      ],
      correctKey: "A",
      slot: "verb + prep",
      explain: "consist of + the parts. Not consist in or consist with.",
    },
    {
      id: "Q10",
      stem: "Staff members are looking forward ____ the awards dinner in December.",
      options: [
        { key: "A", text: "for" },
        { key: "B", text: "at" },
        { key: "C", text: "to" },
        { key: "D", text: "on" },
      ],
      correctKey: "C",
      slot: "verb + prep",
      explain: "look forward to. The to is a preposition here, not an infinitive marker.",
    },
    {
      id: "Q11",
      stem: "The airline apologized ____ the late departure.",
      options: [
        { key: "A", text: "to" },
        { key: "B", text: "for" },
        { key: "C", text: "of" },
        { key: "D", text: "at" },
      ],
      correctKey: "B",
      slot: "verb + prep",
      explain: "apologize for a thing. apologize to a person. The object is the late departure, so for.",
    },
    {
      id: "Q12",
      stem: "Visitors need access ____ the loading dock after 5:00 p.m.",
      options: [
        { key: "A", text: "of" },
        { key: "B", text: "for" },
        { key: "C", text: "at" },
        { key: "D", text: "to" },
      ],
      correctKey: "D",
      slot: "noun + prep",
      explain: "access to a place. Not access of or access for.",
    },
    {
      id: "Q13",
      stem: "New hires should become familiar ____ the emergency exits on each floor.",
      options: [
        { key: "A", text: "to" },
        { key: "B", text: "of" },
        { key: "C", text: "for" },
        { key: "D", text: "with" },
      ],
      correctKey: "D",
      slot: "adjective + prep",
      explain: "familiar with. Not familiar to (that describes how something feels to someone).",
    },
    {
      id: "Q14",
      stem: "These crates are not suitable ____ air freight.",
      options: [
        { key: "A", text: "to" },
        { key: "B", text: "with" },
        { key: "C", text: "for" },
        { key: "D", text: "of" },
      ],
      correctKey: "C",
      slot: "adjective + prep",
      explain: "suitable for a use or purpose. Not suitable to in this workplace pattern.",
    },
    {
      id: "Q15",
      stem: "The branch will open ____ the weather forecast.",
      options: [
        { key: "A", text: "regardless to" },
        { key: "B", text: "regardless of" },
        { key: "C", text: "regardless from" },
        { key: "D", text: "regardless with" },
      ],
      correctKey: "B",
      slot: "phrase",
      explain: "regardless of + a noun. Learn the whole phrase.",
    },
    {
      id: "Q16",
      stem: "Please save your work ____ leaving the training room.",
      options: [
        { key: "A", text: "prior to" },
        { key: "B", text: "prior of" },
        { key: "C", text: "prior with" },
        { key: "D", text: "prior for" },
      ],
      correctKey: "A",
      slot: "phrase",
      explain: "prior to + a noun or -ing form. Not prior of.",
    },
    {
      id: "Q17",
      stem: "Prices are listed ____ page 12 of the catalog.",
      options: [
        { key: "A", text: "on" },
        { key: "B", text: "in" },
        { key: "C", text: "at" },
        { key: "D", text: "to" },
      ],
      correctKey: "A",
      slot: "place",
      explain: "on + page / floor / street. in the catalog would describe the whole book, not a page number.",
    },
    {
      id: "Q18",
      stem: "The plant is recovering ____ last month's power cut.",
      options: [
        { key: "A", text: "of" },
        { key: "B", text: "by" },
        { key: "C", text: "with" },
        { key: "D", text: "from" },
      ],
      correctKey: "D",
      slot: "verb + prep",
      explain: "recover from a problem. Not recover of (Spanish recuperarse de).",
    },
    {
      id: "Q19",
      stem: "The delay had little impact ____ the delivery window.",
      options: [
        { key: "A", text: "in" },
        { key: "B", text: "of" },
        { key: "C", text: "at" },
        { key: "D", text: "on" },
      ],
      correctKey: "D",
      slot: "noun + prep",
      explain: "impact on / effect on. Not impact in.",
    },
    {
      id: "Q20",
      stem: "A courtesy van runs ____ the hotel and the convention center.",
      options: [
        { key: "A", text: "among" },
        { key: "B", text: "between" },
        { key: "C", text: "along" },
        { key: "D", text: "across" },
      ],
      correctKey: "B",
      slot: "range",
      explain: "between two points (the hotel and the convention center). among is for more than two.",
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
