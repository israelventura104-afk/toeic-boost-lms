(() => {
  const demos = [
    {
      id: "D1",
      title: "Demo 1 · Adjective before a noun",
      stem: "The manager presented a ____ plan for reducing delivery delays.",
      options: [
        { key: "A", text: "decide" },
        { key: "B", text: "decision" },
        { key: "C", text: "decisive" },
        { key: "D", text: "decisively" },
      ],
      correctKey: "C",
      slot: "adjective",
      teach:
        "Signal: article + blank + noun (plan). The blank describes plan → adjective. Decisive plan. Decision is a noun; decisively is an adverb; decide is a verb.",
    },
    {
      id: "D2",
      title: "Demo 2 · Noun after a possessive",
      stem: "Clients praised her ____ during the contract negotiations.",
      options: [
        { key: "A", text: "professional" },
        { key: "B", text: "professionally" },
        { key: "C", text: "professionalism" },
        { key: "D", text: "profession" },
      ],
      correctKey: "C",
      slot: "noun",
      teach:
        "Signal: possessive her + blank (no noun after it). The blank is the thing they praised → noun. Professionalism fits. Professional is adjective; professionally is adverb; profession names a career field, not the quality they praised.",
    },
    {
      id: "D3",
      title: "Demo 3 · Verb after a modal",
      stem: "The committee will ____ the proposal before Friday’s board meeting.",
      options: [
        { key: "A", text: "evaluate" },
        { key: "B", text: "evaluation" },
        { key: "C", text: "evaluative" },
        { key: "D", text: "evaluatively" },
      ],
      correctKey: "A",
      slot: "verb",
      teach:
        "Signal: modal will + blank + object. After a modal, use the base verb → evaluate. Evaluation is a noun; evaluative is an adjective.",
    },
    {
      id: "D4",
      title: "Demo 4 · Adverb modifying a verb",
      stem: "Please respond ____ to any customer complaints about late shipments.",
      options: [
        { key: "A", text: "prompt" },
        { key: "B", text: "promptness" },
        { key: "C", text: "promptly" },
        { key: "D", text: "prompts" },
      ],
      correctKey: "C",
      slot: "adverb",
      teach:
        "Signal: verb respond + blank. We need how she should respond → adverb promptly. Prompt is adjective; promptness is noun; prompts is a verb form.",
    },
    {
      id: "D5",
      title: "Demo 5 · Noun after a preposition",
      stem: "The trainees were given a handbook for ____ of the new software.",
      options: [
        { key: "A", text: "install" },
        { key: "B", text: "installation" },
        { key: "C", text: "installed" },
        { key: "D", text: "installable" },
      ],
      correctKey: "B",
      slot: "noun",
      teach:
        "Signal: preposition for + blank + of…. After a preposition, Part 5 usually wants a noun. Installation of the software is the cleanest fit. Install is a verb; installed is a participle; installable is an adjective.",
    },
  ];

  // Balanced correctKey: A4 B4 C4 D3
  const practice = [
    {
      id: "Q01",
      stem: "Applicants must ____ proof of employment with the online form.",
      options: [
        { key: "A", text: "submit" },
        { key: "B", text: "submission" },
        { key: "C", text: "submissive" },
        { key: "D", text: "submissively" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "Modal must + blank → base verb submit.",
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
      explain: "Article + blank + noun assistant → adjective reliable.",
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
      explain: "Article the + blank + of → noun compilation.",
    },
    {
      id: "Q04",
      stem: "The director spoke ____ about the need for stricter safety checks.",
      options: [
        { key: "A", text: "persuasion" },
        { key: "B", text: "persuasive" },
        { key: "C", text: "persuade" },
        { key: "D", text: "persuasively" },
      ],
      correctKey: "D",
      slot: "adverb",
      explain: "Modifies spoke → adverb persuasively.",
    },
    {
      id: "Q05",
      stem: "The warehouse team can ____ orders within two business days.",
      options: [
        { key: "A", text: "process" },
        { key: "B", text: "procession" },
        { key: "C", text: "processor" },
        { key: "D", text: "processable" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "Modal can + blank → verb process.",
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
      explain: "Possessive your + blank → noun attendance.",
    },
    {
      id: "Q07",
      stem: "A ____ review of the budget revealed several unnecessary expenses.",
      options: [
        { key: "A", text: "care" },
        { key: "B", text: "carefully" },
        { key: "C", text: "careful" },
        { key: "D", text: "carefulness" },
      ],
      correctKey: "C",
      slot: "adjective",
      explain: "Article + blank + noun review → adjective careful.",
    },
    {
      id: "Q08",
      stem: "Employees are asked to work ____ during the system upgrade this weekend.",
      options: [
        { key: "A", text: "flexible" },
        { key: "B", text: "flexibility" },
        { key: "C", text: "flexibly" },
        { key: "D", text: "flex" },
      ],
      correctKey: "C",
      slot: "adverb",
      explain: "Modifies work → adverb flexibly.",
    },
    {
      id: "Q09",
      stem: "Mr. Patel will ____ the visiting clients on a tour of the plant.",
      options: [
        { key: "A", text: "accompany" },
        { key: "B", text: "accompaniment" },
        { key: "C", text: "accompanying" },
        { key: "D", text: "accompanied" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "will + blank → base verb accompany.",
    },
    {
      id: "Q10",
      stem: "We need more ____ information before signing the supplier contract.",
      options: [
        { key: "A", text: "detail" },
        { key: "B", text: "detailed" },
        { key: "C", text: "detailing" },
        { key: "D", text: "details" },
      ],
      correctKey: "B",
      slot: "adjective",
      explain: "Blank + noun information → adjective detailed.",
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
      explain: "Article the + blank + of → noun establishment.",
    },
    {
      id: "Q12",
      stem: "The updated brochure explains our services more ____ than the previous version.",
      options: [
        { key: "A", text: "clear" },
        { key: "B", text: "clearly" },
        { key: "C", text: "clarity" },
        { key: "D", text: "clearness" },
      ],
      correctKey: "B",
      slot: "adverb",
      explain: "Modifies the verb explains → adverb clearly.",
    },
    {
      id: "Q13",
      stem: "Online registration will ____ at midnight on March 30.",
      options: [
        { key: "A", text: "close" },
        { key: "B", text: "closure" },
        { key: "C", text: "closely" },
        { key: "D", text: "closed" },
      ],
      correctKey: "A",
      slot: "verb",
      explain: "will + blank → base verb close.",
    },
    {
      id: "Q14",
      stem: "Parking permits will be ____ at the security desk starting Monday.",
      options: [
        { key: "A", text: "availability" },
        { key: "B", text: "available" },
        { key: "C", text: "availably" },
        { key: "D", text: "avail" },
      ],
      correctKey: "B",
      slot: "adjective",
      explain: "After be (will be) → adjective available. Wait — B is used 5 times. Need fix.",
    },
    {
      id: "Q15",
      stem: "The instructions must be followed ____ to avoid equipment damage.",
      options: [
        { key: "A", text: "precise" },
        { key: "B", text: "precision" },
        { key: "C", text: "precisely" },
        { key: "D", text: "preciseness" },
      ],
      correctKey: "C",
      slot: "adverb",
      explain: "Modifies followed → adverb precisely.",
    },
  ];

  // Fix Q14 to D balance: change options order so correct is D... actually available is correct.
  // Change Q14 correct presentation: move available to D
  practice[13] = {
      id: "Q14",
      stem: "Parking permits will be ____ at the security desk starting Monday.",
      options: [
        { key: "A", text: "availability" },
        { key: "B", text: "avail" },
        { key: "C", text: "availably" },
        { key: "D", text: "available" },
      ],
      correctKey: "D",
      slot: "adjective",
      explain: "After be (will be) → adjective available.",
  };

  // Now check: Q12 is B - we have B at Q02,Q06,Q10,Q12 = 4. Good.
  // A: Q01,Q05,Q09,Q13 = 4
  // C: Q03,Q07,Q08,Q15 = 4
  // D: Q04,Q11,Q14 = 3
  // Wait Q08 is C flexibly - that's 4 C. Good.

  const counts = { A: 0, B: 0, C: 0, D: 0 };
  practice.forEach((q) => { counts[q.correctKey] += 1; });
  console.info("[Word Forms] practice balance", counts);

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
            <strong>Slot: ${escapeHtml(item.slot)} · Answer: ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}</strong>
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
      "This set’s correct-letter balance: A×4 · B×4 · C×4 · D×3 (mixed noun / verb / adjective / adverb slots).";

    reviewList.innerHTML = review
      .map(({ index, item, chosen, chosenText, rightText, ok }) => `
        <article class="review-item ${ok ? "ok" : "bad"}">
          <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"} · slot: ${escapeHtml(item.slot)}</h4>
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
