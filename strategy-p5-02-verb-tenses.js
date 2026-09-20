(() => {
  const demos = [
    {
      id: "D1",
      title: "Demo 1 · Finished past time",
      stem: "The courier ____ the package to the front desk yesterday afternoon.",
      options: [
        { key: "A", text: "delivers" },
        { key: "B", text: "delivered" },
        { key: "C", text: "has delivered" },
        { key: "D", text: "is delivering" },
      ],
      correctKey: "B",
      slot: "simple past",
      teach:
        "Marker: yesterday afternoon = finished past time. Use simple past delivered. Present perfect (has delivered) does not pair well with a finished clock time like yesterday.",
    },
    {
      id: "D2",
      title: "Demo 2 · Past → now with since",
      stem: "Ms. Park ____ in the accounting department since she joined the firm in 2019.",
      options: [
        { key: "A", text: "worked" },
        { key: "B", text: "works" },
        { key: "C", text: "has worked" },
        { key: "D", text: "was working" },
      ],
      correctKey: "C",
      slot: "present perfect",
      teach:
        "Marker: since 2019 = started in the past and continues to now. Present perfect has worked. Simple past worked would make 2019 feel like a finished, closed story.",
    },
    {
      id: "D3",
      title: "Demo 3 · In progress this week",
      stem: "Our IT team ____ the new payroll system this week, so some reports may be delayed.",
      options: [
        { key: "A", text: "installs" },
        { key: "B", text: "installed" },
        { key: "C", text: "has installed" },
        { key: "D", text: "is installing" },
      ],
      correctKey: "D",
      slot: "present continuous",
      teach:
        "Marker: this week + result now (reports may be delayed) = action in progress. Present continuous is installing. Simple present installs sounds like a permanent habit.",
    },
    {
      id: "D4",
      title: "Demo 4 · While + background past",
      stem: "While the inspectors ____ the warehouse, the manager prepared the safety checklist.",
      options: [
        { key: "A", text: "tour" },
        { key: "B", text: "have toured" },
        { key: "C", text: "were touring" },
        { key: "D", text: "are touring" },
      ],
      correctKey: "C",
      slot: "past continuous",
      teach:
        "Marker: While… + parallel past action (prepared). Background action = past continuous were touring. With While + past background, past continuous (were touring) is the clean Part 5 habit; a bare simple past often misses the “in progress” signal.",
    },
    {
      id: "D5",
      title: "Demo 5 · Future deadline",
      stem: "All vendors ____ their invoices by Friday if they want to be paid this month.",
      options: [
        { key: "A", text: "submit" },
        { key: "B", text: "submitted" },
        { key: "C", text: "have submitted" },
        { key: "D", text: "must submit" },
      ],
      correctKey: "D",
      slot: "future obligation / modal",
      teach:
        "Marker: by Friday + condition (if they want…). The blank needs a form that pushes action toward a future deadline. Must submit carries obligation before Friday. Submitted / have submitted look back, not forward.",
    },
  ];

  // Balance target A4 B4 C4 D3
  const practice = [
    {
      id: "Q01",
      stem: "The board ____ the expansion plan at last Tuesday’s meeting.",
      options: [
        { key: "A", text: "approves" },
        { key: "B", text: "approved" },
        { key: "C", text: "has approved" },
        { key: "D", text: "is approving" },
      ],
      correctKey: "B",
      slot: "simple past",
      explain: "Marker: last Tuesday = finished past → approved.",
    },
    {
      id: "Q02",
      stem: "I ____ three training webinars so far this quarter.",
      options: [
        { key: "A", text: "attend" },
        { key: "B", text: "attended" },
        { key: "C", text: "have attended" },
        { key: "D", text: "was attending" },
      ],
      correctKey: "C",
      slot: "present perfect",
      explain: "Marker: so far this quarter = past→now unfinished period → have attended.",
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
      explain: "Marker: Right now = in progress → is registering.",
    },
    {
      id: "Q04",
      stem: "The contract ____ tomorrow morning in the main conference room.",
      options: [
        { key: "A", text: "will be signed" },
        { key: "B", text: "signed" },
        { key: "C", text: "has signed" },
        { key: "D", text: "was signed" },
      ],
      correctKey: "A",
      slot: "future",
      explain: "Marker: tomorrow morning = future → will be signed.",
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
      explain: "Marker: When the power failed (interrupt) + background → were working.",
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
      explain: "Marker: usually = habit → simple present ships.",
    },
    {
      id: "Q07",
      stem: "She ____ already ____ the revised brochure to the printer.",
      options: [
        { key: "A", text: "has / sent" },
        { key: "B", text: "is / sending" },
        { key: "C", text: "was / sent" },
        { key: "D", text: "will / send" },
      ],
      correctKey: "A",
      slot: "present perfect",
      explain: "Marker: already = completed with present relevance → has sent.",
    },
    {
      id: "Q08",
      stem: "Clients ____ the updated pricing list yet.",
      options: [
        { key: "A", text: "did not receive" },
        { key: "B", text: "have not received" },
        { key: "C", text: "are not receiving" },
        { key: "D", text: "will not receive" },
      ],
      correctKey: "B",
      slot: "present perfect",
      explain: "Marker: yet (up to now) → have not received.",
    },
    {
      id: "Q09",
      stem: "The shuttle bus ____ every hour between the plant and the hotel.",
      options: [
        { key: "A", text: "runs" },
        { key: "B", text: "ran" },
        { key: "C", text: "has run" },
        { key: "D", text: "is run" },
      ],
      correctKey: "A",
      slot: "simple present",
      explain: "Marker: every hour = schedule/habit → runs.",
    },
    {
      id: "Q10",
      stem: "By next Monday, the auditors ____ their on-site review.",
      options: [
        { key: "A", text: "complete" },
        { key: "B", text: "completed" },
        { key: "C", text: "will have completed" },
        { key: "D", text: "are completing" },
      ],
      correctKey: "C",
      slot: "future perfect",
      explain: "Marker: By next Monday = completed before a future point → will have completed.",
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
      explain: "Marker: Two years ago = finished past → opened.",
    },
    {
      id: "Q12",
      stem: "Look — the CEO ____ into the lobby right now.",
      options: [
        { key: "A", text: "walks" },
        { key: "B", text: "walked" },
        { key: "C", text: "has walked" },
        { key: "D", text: "is walking" },
      ],
      correctKey: "D",
      slot: "present continuous",
      explain: "Marker: right now + Look → is walking.",
    },
    {
      id: "Q13",
      stem: "We ____ a maintenance window next Sunday from 1 a.m. to 4 a.m.",
      options: [
        { key: "A", text: "schedule" },
        { key: "B", text: "scheduled" },
        { key: "C", text: "have scheduled" },
        { key: "D", text: "will schedule" },
      ],
      correctKey: "C",
      slot: "present perfect / result now",
      explain: "Often: decision already made with present result (the window is set) → have scheduled. (If your class prefers future plan, discuss will schedule — key still C for ‘already arranged’ reading.)",
    },
    {
      id: "Q14",
      stem: "While rain ____ outside, the outdoor expo continued under the tents.",
      options: [
        { key: "A", text: "falls" },
        { key: "B", text: "has fallen" },
        { key: "C", text: "was falling" },
        { key: "D", text: "is falling" },
      ],
      correctKey: "C",
      slot: "past continuous",
      explain: "Marker: While… continued (past) → background was falling.",
    },
    {
      id: "Q15",
      stem: "If you need parking, you ____ at the visitor desk before 8:30 a.m. tomorrow.",
      options: [
        { key: "A", text: "check in" },
        { key: "B", text: "should check in" },
        { key: "C", text: "have checked in" },
        { key: "D", text: "checked in" },
      ],
      correctKey: "B",
      slot: "future advice / modal",
      explain: "Marker: tomorrow + advice → should check in.",
    },
  ];

  // Fix Q13 to keep clean pedagogy: change to clearer future item and rebalance
  practice[12] = {
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
    explain: "Marker: next Wednesday = future → will conduct.",
  };

  const counts = { A: 0, B: 0, C: 0, D: 0 };
  practice.forEach((q) => { counts[q.correctKey] += 1; });
  console.info("[Verb Tenses] practice balance", counts);

  const demoList = document.getElementById("demo-list");
  const practiceList = document.getElementById("practice-list");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const results = document.getElementById("results");
  const scoreLine = document.getElementById("score-line");
  const balanceNote = document.getElementById("balance-note");
  const reviewList = document.getElementById("review-list");
  const practiceStatus = document.getElementById("practice-status");

  const answers = new Map();
  let submitted = false;

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

  function renderDemos() {
    demoList.innerHTML = demos
      .map((item, index) => {
        const options = item.options
          .map(
            (opt) => `
          <div class="opt locked">
            <span class="key">${escapeHtml(opt.key)}</span>
            <span>${escapeHtml(opt.text)}</span>
          </div>`
          )
          .join("");
        const right = item.options.find((o) => o.key === item.correctKey);
        return `
        <article class="demo-card" data-demo="${escapeHtml(item.id)}">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="stem">${formatStem(item.stem)}</p>
          <div class="options">${options}</div>
          <button type="button" class="btn-reveal" data-reveal="${index}">Reveal model answer</button>
          <div class="reveal" id="demo-reveal-${index}" hidden>
            <strong>Timeline: ${escapeHtml(item.slot)} · Answer: ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}</strong>
            <p>${escapeHtml(item.teach)}</p>
          </div>
        </article>`;
      })
      .join("");

    demoList.querySelectorAll("[data-reveal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-reveal");
        const box = document.getElementById(`demo-reveal-${idx}`);
        if (!box) return;
        box.hidden = !box.hidden;
        btn.textContent = box.hidden ? "Reveal model answer" : "Hide model answer";
      });
    });
  }

  function renderPractice() {
    practiceList.innerHTML = practice
      .map((item, index) => {
        const options = item.options
          .map(
            (opt) => `
          <button type="button" class="opt" data-q="${escapeHtml(item.id)}" data-key="${escapeHtml(opt.key)}">
            <span class="key">${escapeHtml(opt.key)}</span>
            <span>${escapeHtml(opt.text)}</span>
          </button>`
          )
          .join("");
        return `
        <article class="q-card" id="card-${escapeHtml(item.id)}">
          <h3>Question ${index + 1} of 15</h3>
          <p class="stem">${formatStem(item.stem)}</p>
          <div class="options">${options}</div>
        </article>`;
      })
      .join("");

    practiceList.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (submitted) return;
        const qid = btn.getAttribute("data-q");
        const key = btn.getAttribute("data-key");
        answers.set(qid, key);
        practiceList.querySelectorAll(`.opt[data-q="${CSS.escape(qid)}"]`).forEach((el) => {
          el.classList.toggle("selected", el.getAttribute("data-key") === key);
        });
        updateStatus();
      });
    });
  }

  function updateStatus() {
    const n = answers.size;
    practiceStatus.hidden = false;
    practiceStatus.textContent =
      n === 15
        ? "All 15 answered. Ready to submit — no item feedback until then."
        : `Answered ${n} of 15. Keep going; scores stay hidden until submit.`;
  }

  function submit() {
    if (answers.size < 15) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `Answer all 15 before submitting (${answers.size}/15 so far).`;
      return;
    }
    submitted = true;
    submitBtn.hidden = true;
    resetBtn.hidden = false;

    let correct = 0;
    const review = [];
    practice.forEach((item, index) => {
      const chosen = answers.get(item.id);
      const ok = chosen === item.correctKey;
      if (ok) correct += 1;
      const chosenText = item.options.find((o) => o.key === chosen)?.text || "—";
      const rightText = item.options.find((o) => o.key === item.correctKey)?.text || "";
      review.push({ index, item, chosen, chosenText, rightText, ok });
    });

    results.hidden = false;
    scoreLine.textContent = `Score: ${correct} / 15 (${Math.round((correct / 15) * 100)}%)`;
    balanceNote.textContent =
      `This set’s correct-letter balance: A×${counts.A} · B×${counts.B} · C×${counts.C} · D×${counts.D}.`;

    reviewList.innerHTML = review
      .map(({ index, item, chosen, chosenText, rightText, ok }) => `
        <article class="review-item ${ok ? "ok" : "bad"}">
          <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"} · timeline: ${escapeHtml(item.slot)}</h4>
          <p class="stem">${formatStem(item.stem)}</p>
          <p>Your answer: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
          <p>Correct: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>
          <p>${escapeHtml(item.explain)}</p>
        </article>`)
      .join("");

    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    submitted = false;
    answers.clear();
    submitBtn.hidden = false;
    resetBtn.hidden = true;
    results.hidden = true;
    reviewList.innerHTML = "";
    practiceList.querySelectorAll(".opt").forEach((el) => el.classList.remove("selected"));
    updateStatus();
    document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  submitBtn.addEventListener("click", submit);
  resetBtn.addEventListener("click", reset);

  renderDemos();
  renderPractice();
  updateStatus();
})();
