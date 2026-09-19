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
        { key: "B", text: "avail" },
        { key: "C", text: "availably" },
        { key: "D", text: "available" },
      ],
      correctKey: "D",
      slot: "adjective",
      explain: "After be (will be) → adjective available.",
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

  const demoCard = document.getElementById("demo-card");
  const practiceCard = document.getElementById("practice-card");
  const practiceStatus = document.getElementById("practice-status");
  const results = document.getElementById("results");
  const scoreLine = document.getElementById("score-line");
  const balanceNote = document.getElementById("balance-note");
  const finalScore = document.getElementById("final-score");
  const reviewList = document.getElementById("review-list");
  const resetBtn = document.getElementById("reset-btn");

  const state = {
    screen: "teach",
    demoIndex: 0,
    demoOpen: false,
    practiceIndex: 0,
    answers: new Map(),
    submitted: false,
  };

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

  function optionButtons(item, selectedKey, { locked = false, name = "opt" } = {}) {
    return item.options
      .map((opt) => {
        const selected = selectedKey === opt.key ? " is-selected" : "";
        const tag = locked ? "div" : "button";
        const type = locked ? "" : ' type="button"';
        return `
          <${tag}${type} class="choice-button${selected}" data-${name}="${escapeHtml(item.id)}" data-key="${escapeHtml(opt.key)}">
            <b>${escapeHtml(opt.key)}</b>
            <span>${escapeHtml(opt.text)}</span>
          </${tag}>`;
      })
      .join("");
  }

  function showScreen(name) {
    if (!["teach", "demo", "practice"].includes(name)) name = "teach";
    state.screen = name;
    document.querySelectorAll("[data-wf-screen]").forEach((el) => {
      el.hidden = el.dataset.wfScreen !== name;
    });
    document.querySelectorAll(".wf-tabs [data-screen]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-screen") === name);
    });
    if (name === "demo") renderDemo();
    if (name === "practice") renderPractice();
    if (history.replaceState) {
      history.replaceState(null, "", `#${name}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderDemo() {
    const item = demos[state.demoIndex];
    const right = item.options.find((o) => o.key === item.correctKey);
    const atStart = state.demoIndex <= 0;
    const atEnd = state.demoIndex >= demos.length - 1;
    demoCard.innerHTML = `
      <div class="practice-topline">
        <span>${state.demoIndex + 1} / ${demos.length}</span>
        <strong>${escapeHtml(item.title)}</strong>
      </div>
      <p class="question-meta">Ask for the slot before you reveal.</p>
      <p class="wf-stem">${formatStem(item.stem)}</p>
      <div class="choice-list">
        ${optionButtons(item, null, { locked: true })}
      </div>
      ${
        state.demoOpen
          ? `<div class="wf-reveal">
              <strong>Slot: ${escapeHtml(item.slot)} · Answer: ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}</strong>
              <p>${escapeHtml(item.teach)}</p>
            </div>`
          : ""
      }
      <div class="practice-actions">
        <button class="button secondary" type="button" data-demo-prev ${atStart ? "disabled" : ""}>Previous</button>
        <button class="button secondary" type="button" data-demo-reveal>
          ${state.demoOpen ? "Hide model answer" : "Reveal model answer"}
        </button>
        ${
          atEnd
            ? `<button class="button primary" type="button" data-screen="practice">Continue to practice</button>`
            : `<button class="button primary" type="button" data-demo-next>Next</button>`
        }
      </div>
    `;
  }

  function updateStatus() {
    const n = state.answers.size;
    practiceStatus.hidden = false;
    if (state.submitted) {
      practiceStatus.textContent = "Submitted. Review your results below.";
      return;
    }
    practiceStatus.textContent =
      n === 15
        ? "All 15 answered. Ready to submit — no item feedback until then."
        : `Answered ${n} of 15. Keep going; scores stay hidden until submit.`;
  }

  function renderPractice() {
    if (state.submitted) {
      practiceCard.hidden = true;
      results.hidden = false;
      updateStatus();
      return;
    }
    practiceCard.hidden = false;
    results.hidden = true;
    const item = practice[state.practiceIndex];
    const chosen = state.answers.get(item.id);
    const atStart = state.practiceIndex <= 0;
    const atEnd = state.practiceIndex >= practice.length - 1;
    practiceCard.innerHTML = `
      <div class="practice-topline">
        <span>${state.practiceIndex + 1} / ${practice.length}</span>
        <strong>${state.answers.size}/${practice.length} answered</strong>
      </div>
      <p class="wf-stem">${formatStem(item.stem)}</p>
      <div class="choice-list">
        ${optionButtons(item, chosen, { name: "q" })}
      </div>
      <div class="practice-actions">
        <button class="button secondary" type="button" data-q-prev ${atStart ? "disabled" : ""}>Previous</button>
        ${
          atEnd
            ? `<button class="button primary" type="button" data-submit>Submit practice (15)</button>`
            : `<button class="button primary" type="button" data-q-next>Next</button>`
        }
      </div>
    `;
    updateStatus();
  }

  function submit() {
    if (state.answers.size < 15) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `Answer all 15 before submitting (${state.answers.size}/15 so far).`;
      practiceStatus.classList.add("is-error");
      return;
    }
    practiceStatus.classList.remove("is-error");
    state.submitted = true;

    let correct = 0;
    const review = practice.map((item, index) => {
      const chosen = state.answers.get(item.id);
      const ok = chosen === item.correctKey;
      if (ok) correct += 1;
      const chosenText = item.options.find((o) => o.key === chosen)?.text || "—";
      const rightText = item.options.find((o) => o.key === item.correctKey)?.text || "";
      return { index, item, chosen, chosenText, rightText, ok };
    });

    scoreLine.textContent = `Score: ${correct} / 15 (${Math.round((correct / 15) * 100)}%).`;
    finalScore.textContent = `${correct}/15`;
    balanceNote.textContent =
      "This set’s correct-letter balance: A×4 · B×4 · C×4 · D×3 (mixed noun / verb / adjective / adverb slots).";

    reviewList.innerHTML = `<div class="wf-review">${review
      .map(
        ({ index, item, chosen, chosenText, rightText, ok }) => `
        <article class="${ok ? "ok" : "bad"}">
          <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"} · slot: ${escapeHtml(item.slot)}</h4>
          <p class="wf-stem">${formatStem(item.stem)}</p>
          <p>Your answer: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
          <p>Correct: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>
          <p>${escapeHtml(item.explain)}</p>
        </article>`
      )
      .join("")}</div>`;

    renderPractice();
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    state.submitted = false;
    state.practiceIndex = 0;
    state.answers.clear();
    practiceStatus.classList.remove("is-error");
    renderPractice();
    practiceCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("click", (event) => {
    const screenBtn = event.target.closest("[data-screen]");
    if (screenBtn) {
      event.preventDefault();
      showScreen(screenBtn.getAttribute("data-screen"));
      return;
    }

    if (event.target.closest("[data-demo-prev]")) {
      state.demoIndex = Math.max(0, state.demoIndex - 1);
      state.demoOpen = false;
      renderDemo();
      return;
    }
    if (event.target.closest("[data-demo-next]")) {
      state.demoIndex = Math.min(demos.length - 1, state.demoIndex + 1);
      state.demoOpen = false;
      renderDemo();
      return;
    }
    if (event.target.closest("[data-demo-reveal]")) {
      state.demoOpen = !state.demoOpen;
      renderDemo();
      return;
    }

    const choice = event.target.closest("[data-q]");
    if (choice && !state.submitted) {
      state.answers.set(choice.getAttribute("data-q"), choice.getAttribute("data-key"));
      renderPractice();
      return;
    }
    if (event.target.closest("[data-q-prev]")) {
      state.practiceIndex = Math.max(0, state.practiceIndex - 1);
      renderPractice();
      return;
    }
    if (event.target.closest("[data-q-next]")) {
      state.practiceIndex = Math.min(practice.length - 1, state.practiceIndex + 1);
      renderPractice();
      return;
    }
    if (event.target.closest("[data-submit]")) {
      submit();
    }
  });

  resetBtn.addEventListener("click", reset);

  window.addEventListener("hashchange", () => {
    const name = (location.hash || "#teach").slice(1);
    showScreen(name);
  });

  const initial = (location.hash || "#teach").slice(1);
  showScreen(initial);
})();
