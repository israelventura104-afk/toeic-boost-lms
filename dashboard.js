/**
 * Student dashboard — access + progress (Paso 3)
 * Name saved on this browser (localStorage). No accounts.
 */

(function () {
  const NAME_KEY = "toeic-boost.studentName.v1";

  function text(el, value) {
    if (el) el.textContent = value == null ? "" : String(value);
  }

  function getName() {
    try {
      return String(localStorage.getItem(NAME_KEY) || "").trim();
    } catch {
      return "";
    }
  }

  function setName(name) {
    const clean = String(name || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 40);
    if (!clean) {
      localStorage.removeItem(NAME_KEY);
      return "";
    }
    localStorage.setItem(NAME_KEY, clean);
    return clean;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bindNameForm(form) {
    if (!form || form.dataset.bound === "1") return;
    form.dataset.bound = "1";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("[data-dash-name-input]");
      const saved = setName(input ? input.value : "");
      if (!saved) return;
      renderNameUI();
    });
  }

  function renderNameUI() {
    const name = getName();
    const greeting = document.querySelector("[data-dash-greeting]");
    const panel = document.querySelector("[data-dash-name-panel]");
    const form = document.querySelector("[data-dash-name-form]");

    if (greeting) {
      greeting.textContent = name ? `Welcome, ${name}.` : "Welcome.";
    }

    if (!panel || !form) return;

    if (name) {
      panel.innerHTML = `
        <div class="dash-name-saved">
          <span>Signed in as <strong>${escapeHtml(name)}</strong></span>
          <button class="button secondary compact-button" type="button" data-dash-edit-name>
            Change name
          </button>
        </div>
        <p class="dash-name-hint">Saved only on this browser — no account needed.</p>
      `;
      panel.querySelector("[data-dash-edit-name]")?.addEventListener("click", () => {
        panel.innerHTML = `
          <form class="dash-name-form" data-dash-name-form>
            <label>
              Your name
              <input
                type="text"
                name="studentName"
                data-dash-name-input
                maxlength="40"
                autocomplete="name"
                value="${escapeHtml(name)}"
                required
              />
            </label>
            <button class="button primary" type="submit">Save name</button>
          </form>
          <p class="dash-name-hint">Saved only on this browser — no account needed.</p>
        `;
        bindNameForm(panel.querySelector("[data-dash-name-form]"));
        panel.querySelector("[data-dash-name-input]")?.focus();
      });
    } else {
      bindNameForm(form);
    }
  }

  function skillRowsHtml(skills, emptyNote) {
    if (!skills || !skills.length) {
      return `<p class="dash-empty-note">${escapeHtml(
        emptyNote || "No practice saved yet."
      )}</p>`;
    }
    return skills
      .map((row) => {
        const pct = Math.round(Number(row.percent) || 0);
        const bar = Math.max(pct, row.total ? 6 : 0);
        const frac =
          row.total != null
            ? `${Number(row.correct) || 0}/${Number(row.total) || 0}`
            : "";
        return `
      <div class="skill-row">
        <span title="${escapeHtml(row.skill)}">${escapeHtml(row.skill)}</span>
        <div class="mini-bar" aria-hidden="true">
          <span style="width:${bar}%"></span>
        </div>
        <b>${frac ? `${frac} · ` : ""}${pct}%</b>
      </div>`;
      })
      .join("");
  }

  function formatWhen(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return "";
    }
  }

  function renderRecent(summary) {
    const host = document.querySelector("[data-dash-recent]");
    if (!host) return;

    const rows = [];
    if (summary.demo?.last) {
      rows.push({
        label: "Short demo (Part 5–7)",
        score: `${summary.demo.last.correct}/${summary.demo.last.total} (${summary.demo.last.percent}%)`,
        at: summary.demo.last.at,
      });
    }
    // Show recent Part 5 / Part 6 / Part 7 sessions (guided + mock)
    const part5Sessions =
      (window.ToeicProgress.getPart5Sessions && window.ToeicProgress.getPart5Sessions()) ||
      (summary.part5?.last ? [summary.part5.last] : []);
    part5Sessions.slice(0, 4).forEach((session) => {
      const mode = session.mode === "mock" ? "mock" : "guided";
      rows.push({
        label: mode === "mock" ? "Part 5 mock test" : "Part 5 guided practice",
        score: `${session.correct}/${session.total} (${session.percent}%)`,
        at: session.at,
      });
    });
    const part6Sessions =
      (window.ToeicProgress.getPart6Sessions && window.ToeicProgress.getPart6Sessions()) ||
      (summary.part6?.last ? [summary.part6.last] : []);
    part6Sessions.slice(0, 4).forEach((session) => {
      const mode = session.mode === "mock" ? "mock" : "guided";
      rows.push({
        label: mode === "mock" ? "Part 6 mock test" : "Part 6 guided practice",
        score: `${session.correct}/${session.total} (${session.percent}%)`,
        at: session.at,
      });
    });
    const part7Sessions =
      (window.ToeicProgress.getPart7Sessions && window.ToeicProgress.getPart7Sessions()) ||
      (summary.part7?.last ? [summary.part7.last] : []);
    part7Sessions.slice(0, 4).forEach((session) => {
      const mode = session.mode === "mock" ? "mock" : "guided";
      rows.push({
        label: mode === "mock" ? "Part 7 mock test" : "Part 7 guided practice",
        score: `${session.correct}/${session.total} (${session.percent}%)`,
        at: session.at,
      });
    });
    rows.sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));

    if (!rows.length) {
      host.innerHTML =
        `<li class="dash-empty-note">Finish the free short demo or a Part 5 / Part 6 / Part 7 session to see results here.</li>`;
      return;
    }

    host.innerHTML = rows
      .slice(0, 6)
      .map(
        (row) => `
      <li>
        <div>
          <strong>${escapeHtml(row.label)}</strong>
          <span>${escapeHtml(formatWhen(row.at))}</span>
        </div>
        <b>${escapeHtml(row.score)}</b>
      </li>`
      )
      .join("");
  }

  function render() {
    renderNameUI();
    bindNameForm(document.querySelector("[data-dash-name-form]"));

    if (!window.ToeicProgress) {
      console.error("[TOEIC] progress.js not loaded on dashboard.");
      return;
    }
    const summary = window.ToeicProgress.getSummary();

    text(
      document.querySelector("[data-dash-focus-title]"),
      summary.totalSessionsAll
        ? `Focus: ${summary.focusSkill}`
        : "Complete the free demo to see your focus."
    );
    text(document.querySelector("[data-dash-focus-note]"), summary.focusNote);

    text(
      document.querySelector("[data-dash-avg-demo]"),
      summary.demo?.averagePercent == null ? "—" : `${summary.demo.averagePercent}%`
    );
    text(
      document.querySelector("[data-dash-note-demo]"),
      summary.demo?.sessionCount
        ? `${summary.demo.sessionCount} session${summary.demo.sessionCount === 1 ? "" : "s"}`
        : "No sessions yet"
    );

    text(
      document.querySelector("[data-dash-streak]"),
      summary.streakDays
        ? `${summary.streakDays} day${summary.streakDays > 1 ? "s" : ""}`
        : "—"
    );
    text(
      document.querySelector("[data-dash-streak-note]"),
      summary.streakDays ? "Keep the rhythm" : "Practice today to start"
    );

    const totalSessions = summary.totalSessionsAll || 0;
    text(document.querySelector("[data-dash-sessions]"), String(totalSessions));
    const hasReading =
      (summary.part5?.sessionCount || 0) +
        (summary.part6?.sessionCount || 0) +
        (summary.part7?.sessionCount || 0) >
      0;
    text(
      document.querySelector("[data-dash-sessions-note]"),
      hasReading
        ? "Demo and Part 5 / Part 6 / Part 7 sessions on this device"
        : "Demo sessions on this device"
    );

    const skillHost = document.querySelector("[data-dash-skills-demo]");
    if (skillHost) {
      skillHost.innerHTML = skillRowsHtml(
        summary.demo?.skills,
        summary.demo?.sessionCount
          ? "Sessions saved, but no skill tags yet."
          : "No demo practice saved yet."
      );
    }

    const meta = document.querySelector("[data-dash-demo-meta]");
    if (meta) {
      meta.textContent = summary.demo?.sessionCount
        ? `${summary.demo.sessionCount} session${summary.demo.sessionCount === 1 ? "" : "s"} · avg ${summary.demo.averagePercent ?? 0}%`
        : "No sessions yet";
    }

    const part5Host = document.querySelector("[data-dash-skills-part5]");
    if (part5Host) {
      part5Host.innerHTML = skillRowsHtml(
        summary.part5?.skills,
        summary.part5?.sessionCount
          ? "Sessions saved, but no skill tags yet."
          : "No Part 5 practice or mock saved yet."
      );
    }
    const part5Meta = document.querySelector("[data-dash-part5-meta]");
    if (part5Meta) {
      part5Meta.textContent = summary.part5?.sessionCount
        ? `${summary.part5.sessionCount} session${summary.part5.sessionCount === 1 ? "" : "s"} · avg ${summary.part5.averagePercent ?? 0}%`
        : "No sessions yet";
    }

    const part6Host = document.querySelector("[data-dash-skills-part6]");
    if (part6Host) {
      part6Host.innerHTML = skillRowsHtml(
        summary.part6?.skills,
        summary.part6?.sessionCount
          ? "Sessions saved, but no skill tags yet."
          : "No Part 6 practice or mock saved yet."
      );
    }
    const part6Meta = document.querySelector("[data-dash-part6-meta]");
    if (part6Meta) {
      part6Meta.textContent = summary.part6?.sessionCount
        ? `${summary.part6.sessionCount} session${summary.part6.sessionCount === 1 ? "" : "s"} · avg ${summary.part6.averagePercent ?? 0}%`
        : "No sessions yet";
    }

    const part7Host = document.querySelector("[data-dash-skills-part7]");
    if (part7Host) {
      part7Host.innerHTML = skillRowsHtml(
        summary.part7?.skills,
        summary.part7?.sessionCount
          ? "Sessions saved, but no skill tags yet."
          : "No Part 7 practice saved yet."
      );
    }
    const part7Meta = document.querySelector("[data-dash-part7-meta]");
    if (part7Meta) {
      part7Meta.textContent = summary.part7?.sessionCount
        ? `${summary.part7.sessionCount} session${summary.part7.sessionCount === 1 ? "" : "s"} · avg ${summary.part7.averagePercent ?? 0}%`
        : "No sessions yet";
    }

    renderRecent(summary);

    // Locked card labels
    const unlocked = window.ToeicAccess ? window.ToeicAccess.isUnlocked() : false;
    document.querySelectorAll("[data-lock-label]").forEach((el) => {
      el.hidden = unlocked;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
  window.addEventListener("pageshow", render);
  window.addEventListener("focus", () => {
    try {
      render();
    } catch {
      /* ignore */
    }
  });
})();
