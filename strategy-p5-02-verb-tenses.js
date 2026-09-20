(() => {
  const teachHtml = `
<div class="prose">
  <p>In TOEIC Part 5, many items look like four random verb forms. They are not. The options are usually the <em>same verb</em> on different timelines (<em>arrive / arrived / has arrived / is arriving</em>). First circle the time marker, then pick the form that fits.</p>
  <h3>The timelines</h3>
  <div class="slot-grid">
    <article><strong>Simple present</strong><p>Habits, facts, timetables.</p><code class="code-strip">The office opens at 9. · usually / every hour</code></article>
    <article><strong>Present continuous</strong><p>In progress now or this week.</p><code class="code-strip">We are updating the site this week. · right now / at the moment</code></article>
    <article><strong>Simple past</strong><p>Finished time.</p><code class="code-strip">The shipment arrived yesterday. · last Monday / ago</code></article>
    <article><strong>Present perfect</strong><p>Past connected to now.</p><code class="code-strip">She has worked here since March. · already / yet / so far</code></article>
    <article><strong>Past continuous</strong><p>Background past; in progress when something else happened.</p><code class="code-strip">While the team was traveling… · when the power failed</code></article>
    <article><strong>Future</strong><p>A later time: tomorrow, next week, next quarter.</p><code class="code-strip">The bid will close on Friday.</code></article>
    <article><strong>Past perfect</strong><p>The earlier of two past times.</p><code class="code-strip">By the time the shuttle arrived, most visitors had left.</code></article>
    <article><strong>Future perfect</strong><p>Done before a future point.</p><code class="code-strip">By next Monday, the auditors will have completed the review.</code></article>
    <article><strong>Present perfect continuous</strong><p>Started in the past and still in progress.</p><code class="code-strip">has been waiting since 8:00 a.m. and is still there</code></article>
  </div>
  <h3>Method</h3>
  <ol class="method">
    <li><strong>Ignore A–D for three seconds.</strong> Circle the time marker (<em>yesterday, since, yet, by the time, next Friday</em>).</li>
    <li><strong>Ask: which timeline?</strong> Habit, in progress, finished past, past-to-now, earlier past, future, or done before a future time?</li>
    <li><strong>Match the form to that timeline.</strong> <em>ago</em> → simple past; <em>since / yet</em> → present perfect; <em>by next Monday</em> → future perfect.</li>
    <li><strong>Eliminate by the marker, not by “sounds nice.”</strong> A familiar form on the wrong timeline is still wrong.</li>
  </ol>
  <h3>Fast signals</h3>
  <ul class="signals">
    <li><strong>yesterday / last… / …ago</strong> → simple past. Not present perfect.</li>
    <li><strong>since / for / already / yet / so far</strong> → present perfect.</li>
    <li><strong>right now / at the moment / currently</strong> → present continuous.</li>
    <li><strong>usually / every day / every hour</strong> → simple present.</li>
    <li><strong>while / when</strong> + a past interruption → past continuous for the background action.</li>
    <li><strong>tomorrow / next…</strong> → <em>will</em> + base verb.</li>
    <li><strong>by the time</strong> + past → past perfect (<em>had</em> + past participle).</li>
    <li><strong>by</strong> + a future day → future perfect (<em>will have</em> + past participle).</li>
    <li><strong>since</strong> + still happening now → present perfect continuous (<em>has been -ing</em>).</li>
  </ul>
  <h3>Common traps</h3>
  <ul>
    <li><em>ago</em> is simple past. <em>since</em> is present perfect. Do not mix them.</li>
    <li><em>already / yet / so far</em> keep the door open to now — not simple past.</li>
    <li><em>by Friday</em> (future) is often <em>will have</em>, not just <em>will</em> and not simple present.</li>
    <li><em>this week</em> can be continuous or present perfect. Read the rest of the sentence.</li>
    <li>Translating from Spanish first (that delays the marker check).</li>
  </ul>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The courier ____ the package to the front desk yesterday afternoon.",
      options: [
        { key: "A", text: "delivers" },
        { key: "B", text: "delivered" },
        { key: "C", text: "has delivered" },
        { key: "D", text: "is delivering" },
      ],
      correctKey: "B",
      slot: "simple past",
      teach: "yesterday afternoon is finished time, so use simple past: delivered. has delivered needs a link to now (since / already / yet). delivers and is delivering are present.",
    },
    {
      title: "Demo 2",
      stem: "Ms. Park ____ in the accounting department since she joined the firm in 2019.",
      options: [
        { key: "A", text: "worked" },
        { key: "B", text: "works" },
        { key: "C", text: "has worked" },
        { key: "D", text: "was working" },
      ],
      correctKey: "C",
      slot: "present perfect",
      teach: "since 2019 connects 2019 to now → has worked. worked would need a finished time (in 2019, last year). works is a habit. was working is background past.",
    },
    {
      title: "Demo 3",
      stem: "Technicians ____ new scanners on the third floor right now.",
      options: [
        { key: "A", text: "install" },
        { key: "B", text: "installed" },
        { key: "C", text: "have installed" },
        { key: "D", text: "are installing" },
      ],
      correctKey: "D",
      slot: "present continuous",
      teach: "right now means the action is in progress → are installing. installed is finished. have installed would mean the job is already done.",
    },
    {
      title: "Demo 4",
      stem: "While the inspectors ____ the warehouse, the manager prepared the safety checklist.",
      options: [
        { key: "A", text: "tour" },
        { key: "B", text: "have toured" },
        { key: "C", text: "were touring" },
        { key: "D", text: "are touring" },
      ],
      correctKey: "C",
      slot: "past continuous",
      teach: "While + a past main verb (prepared) → the background action is past continuous: were touring. are touring is present. have toured is present perfect.",
    },
    {
      title: "Demo 5",
      stem: "Ms. Ortega ____ the quarterly forecast at tomorrow's briefing.",
      options: [
        { key: "A", text: "will present" },
        { key: "B", text: "presented" },
        { key: "C", text: "has presented" },
        { key: "D", text: "is presenting" },
      ],
      correctKey: "A",
      slot: "future",
      teach: "tomorrow's briefing is a later time → will present. presented and has presented are past. This is a tense item, not a modal (not must / should).",
    },
    {
      title: "Demo 6",
      stem: "The help desk usually ____ tickets in the order they arrive.",
      options: [
        { key: "A", text: "processes" },
        { key: "B", text: "processed" },
        { key: "C", text: "has processed" },
        { key: "D", text: "is processing" },
      ],
      correctKey: "A",
      slot: "simple present",
      teach: "usually marks a habit → processes. The help desk is singular, so -s. processed is past. is processing would need right now.",
    },
    {
      title: "Demo 7",
      stem: "By the time the shuttle arrived, most visitors ____ the lobby.",
      options: [
        { key: "A", text: "leave" },
        { key: "B", text: "had left" },
        { key: "C", text: "have left" },
        { key: "D", text: "were leaving" },
      ],
      correctKey: "B",
      slot: "past perfect",
      teach: "By the time + past (arrived) needs the earlier past: had left. have left is present perfect. were leaving would mean they were still in the middle of leaving.",
    },
    {
      title: "Demo 8",
      stem: "By next Monday, the auditors ____ their on-site review.",
      options: [
        { key: "A", text: "complete" },
        { key: "B", text: "completed" },
        { key: "C", text: "will have completed" },
        { key: "D", text: "are completing" },
      ],
      correctKey: "C",
      slot: "future perfect",
      teach: "By + a future day means the action will be finished before that day → will have completed. complete and are completing do not mark 'already done by then.'",
    },
    {
      title: "Demo 9",
      stem: "Clients ____ the updated pricing list yet.",
      options: [
        { key: "A", text: "did not receive" },
        { key: "B", text: "have not received" },
        { key: "C", text: "are not receiving" },
        { key: "D", text: "will not receive" },
      ],
      correctKey: "B",
      slot: "present perfect",
      teach: "yet belongs with present perfect: have not received. did not receive is simple past and does not pair with yet in Part 5.",
    },
    {
      title: "Demo 10",
      stem: "The intern ____ at the front desk since 8:00 a.m. and is still there.",
      options: [
        { key: "A", text: "waits" },
        { key: "B", text: "waited" },
        { key: "C", text: "has waited" },
        { key: "D", text: "has been waiting" },
      ],
      correctKey: "D",
      slot: "present perfect continuous",
      teach: "since 8:00 a.m. + is still there → the wait is still in progress: has been waiting. has waited can mark a finished wait. waited is simple past.",
    },
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The board ____ the expansion plan at last Tuesday's meeting.",
      options: [
        { key: "A", text: "approves" },
        { key: "B", text: "approved" },
        { key: "C", text: "has approved" },
        { key: "D", text: "is approving" },
      ],
      correctKey: "B",
      slot: "simple past",
      explain: "last Tuesday is finished time → approved. has approved needs since / already / yet / so far.",
    },
    {
      id: "Q02",
      stem: "The sales team ____ three training webinars so far this quarter.",
      options: [
        { key: "A", text: "attends" },
        { key: "B", text: "attended" },
        { key: "C", text: "has attended" },
        { key: "D", text: "was attending" },
      ],
      correctKey: "C",
      slot: "present perfect",
      explain: "so far this quarter links past to now → has attended. The sales team is singular. attended would need a finished date.",
    },
    {
      id: "Q03",
      stem: "Right now, the receptionist ____ visitors for the product launch.",
      options: [
        { key: "A", text: "registers" },
        { key: "B", text: "registered" },
        { key: "C", text: "has registered" },
        { key: "D", text: "is registering" },
      ],
      correctKey: "D",
      slot: "present continuous",
      explain: "Right now → is registering. registers is a habit. registered is past.",
    },
    {
      id: "Q04",
      stem: "The director ____ the new safety rules at tomorrow morning's meeting.",
      options: [
        { key: "A", text: "will explain" },
        { key: "B", text: "explained" },
        { key: "C", text: "has explained" },
        { key: "D", text: "was explaining" },
      ],
      correctKey: "A",
      slot: "future",
      explain: "tomorrow morning → will explain. explained / has explained / was explaining are all past.",
    },
    {
      id: "Q05",
      stem: "When the power failed, the designers ____ on the final slides.",
      options: [
        { key: "A", text: "work" },
        { key: "B", text: "have worked" },
        { key: "C", text: "were working" },
        { key: "D", text: "are working" },
      ],
      correctKey: "C",
      slot: "past continuous",
      explain: "When the power failed interrupts a background past action → were working. are working is present.",
    },
    {
      id: "Q06",
      stem: "Our warehouse usually ____ orders before 3:00 p.m.",
      options: [
        { key: "A", text: "ships" },
        { key: "B", text: "shipped" },
        { key: "C", text: "has shipped" },
        { key: "D", text: "is shipping" },
      ],
      correctKey: "A",
      slot: "simple present",
      explain: "usually marks a habit → ships. shipped is past. is shipping would need right now.",
    },
    {
      id: "Q07",
      stem: "Ms. Chen ____ the revised brochure to the printer already.",
      options: [
        { key: "A", text: "sends" },
        { key: "B", text: "sent" },
        { key: "C", text: "has sent" },
        { key: "D", text: "is sending" },
      ],
      correctKey: "C",
      slot: "present perfect",
      explain: "already → has sent. One blank only. sent is simple past and does not pair with already here.",
    },
    {
      id: "Q08",
      stem: "Regional offices ____ the new travel policy yet.",
      options: [
        { key: "A", text: "did not download" },
        { key: "B", text: "have not downloaded" },
        { key: "C", text: "are not downloading" },
        { key: "D", text: "will not download" },
      ],
      correctKey: "B",
      slot: "present perfect",
      explain: "yet → have not downloaded. did not download is simple past.",
    },
    {
      id: "Q09",
      stem: "The shuttle bus ____ every hour between the plant and the hotel.",
      options: [
        { key: "A", text: "runs" },
        { key: "B", text: "ran" },
        { key: "C", text: "has run" },
        { key: "D", text: "is running" },
      ],
      correctKey: "A",
      slot: "simple present",
      explain: "every hour is a timetable → runs. is running would mean right now only.",
    },
    {
      id: "Q10",
      stem: "By next Friday, the warehouse ____ every back-order from March.",
      options: [
        { key: "A", text: "fills" },
        { key: "B", text: "filled" },
        { key: "C", text: "will have filled" },
        { key: "D", text: "is filling" },
      ],
      correctKey: "C",
      slot: "future perfect",
      explain: "By next Friday = finished before that future day → will have filled. fills is a habit. filled is past.",
    },
    {
      id: "Q11",
      stem: "Two years ago, the company ____ its first overseas branch.",
      options: [
        { key: "A", text: "opens" },
        { key: "B", text: "opened" },
        { key: "C", text: "has opened" },
        { key: "D", text: "is opening" },
      ],
      correctKey: "B",
      slot: "simple past",
      explain: "Two years ago is finished time → opened. Do not use has opened with ago.",
    },
    {
      id: "Q12",
      stem: "The CEO ____ with the legal team in conference room B at the moment.",
      options: [
        { key: "A", text: "meets" },
        { key: "B", text: "met" },
        { key: "C", text: "has met" },
        { key: "D", text: "is meeting" },
      ],
      correctKey: "D",
      slot: "present continuous",
      explain: "at the moment → is meeting. meets is a habit. met is past.",
    },
    {
      id: "Q13",
      stem: "The hiring manager ____ interviews for the analyst role next Wednesday.",
      options: [
        { key: "A", text: "conducts" },
        { key: "B", text: "conducted" },
        { key: "C", text: "has conducted" },
        { key: "D", text: "will conduct" },
      ],
      correctKey: "D",
      slot: "future",
      explain: "next Wednesday → will conduct. conducted / has conducted are past. conducts is a timetable habit, not one future date.",
    },
    {
      id: "Q14",
      stem: "While the crew ____ the loading dock, clerks continued processing orders upstairs.",
      options: [
        { key: "A", text: "repair" },
        { key: "B", text: "have repaired" },
        { key: "C", text: "were repairing" },
        { key: "D", text: "are repairing" },
      ],
      correctKey: "C",
      slot: "past continuous",
      explain: "While + past (continued) → were repairing. are repairing is present.",
    },
    {
      id: "Q15",
      stem: "By the time security locked the doors, the last guest ____ the building.",
      options: [
        { key: "A", text: "leaves" },
        { key: "B", text: "had left" },
        { key: "C", text: "has left" },
        { key: "D", text: "is leaving" },
      ],
      correctKey: "B",
      slot: "past perfect",
      explain: "By the time + past (locked) → the earlier action is had left. has left is present perfect.",
    },
    {
      id: "Q16",
      stem: "By the end of the month, the contractor ____ the roof repairs.",
      options: [
        { key: "A", text: "will have finished" },
        { key: "B", text: "finished" },
        { key: "C", text: "has finished" },
        { key: "D", text: "is finishing" },
      ],
      correctKey: "A",
      slot: "future perfect",
      explain: "By the end of the month (still ahead) → will have finished. finished is past. has finished is present perfect.",
    },
    {
      id: "Q17",
      stem: "The editor ____ the newsletter to all subscribers yesterday evening.",
      options: [
        { key: "A", text: "sent" },
        { key: "B", text: "has sent" },
        { key: "C", text: "is sending" },
        { key: "D", text: "sends" },
      ],
      correctKey: "A",
      slot: "simple past",
      explain: "yesterday evening → sent. has sent does not pair with yesterday.",
    },
    {
      id: "Q18",
      stem: "Mr. Alvarez ____ the night shift since January.",
      options: [
        { key: "A", text: "supervises" },
        { key: "B", text: "supervised" },
        { key: "C", text: "is supervising" },
        { key: "D", text: "has supervised" },
      ],
      correctKey: "D",
      slot: "present perfect",
      explain: "since January → has supervised. supervised would need a finished time. supervises is a habit without since.",
    },
    {
      id: "Q19",
      stem: "Staff ____ overtime since the system outage began on Monday, and they are still catching up.",
      options: [
        { key: "A", text: "work" },
        { key: "B", text: "worked" },
        { key: "C", text: "have worked" },
        { key: "D", text: "have been working" },
      ],
      correctKey: "D",
      slot: "present perfect continuous",
      explain: "since Monday + are still catching up → the overtime is still in progress: have been working. have worked can mark a finished amount of work.",
    },
    {
      id: "Q20",
      stem: "The train ____ by the time the late passengers reached the platform.",
      options: [
        { key: "A", text: "already leaves" },
        { key: "B", text: "had already left" },
        { key: "C", text: "has already left" },
        { key: "D", text: "is already leaving" },
      ],
      correctKey: "B",
      slot: "past perfect",
      explain: "by the time + reached (past) → had already left. has already left is present perfect.",
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
