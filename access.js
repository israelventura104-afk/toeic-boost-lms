/**
 * Teacher access control — Phase 2
 * Full practice materials open only with the teacher's class code.
 * No store, no prices, no accounts. Control of class materials only.
 */

(function (global) {
  const CONFIG_URL = "data/access.json";
  const STORAGE_KEY = "toeic-boost.teacherAccess.v1";

  let configPromise = null;
  let cachedConfig = null;

  function normalizeCode(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, "")
      .toUpperCase();
  }

  function readStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function writeStored(payload) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function clearStored() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function loadConfig() {
    if (cachedConfig) return Promise.resolve(cachedConfig);
    if (configPromise) return configPromise;

    configPromise = fetch(CONFIG_URL, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load access configuration.");
        }
        return response.json();
      })
      .then((data) => {
        const codes = Array.isArray(data.codes)
          ? data.codes.map(normalizeCode).filter(Boolean)
          : [];
        if (!codes.length) {
          throw new Error("No teacher codes configured.");
        }
        cachedConfig = {
          teacher: data.teacher || "Your teacher",
          platform: data.platform || "TOEIC Boost",
          codes,
        };
        return cachedConfig;
      })
      .catch((error) => {
        configPromise = null;
        throw error;
      });

    return configPromise;
  }

  function isUnlocked() {
    const stored = readStored();
    return Boolean(stored && stored.unlocked === true && stored.code);
  }

  function getAccessRecord() {
    return readStored();
  }

  async function tryUnlock(rawCode) {
    const config = await loadConfig();
    const code = normalizeCode(rawCode);
    if (!code) {
      return { ok: false, message: "Enter the class code your teacher gave you." };
    }
    if (!config.codes.includes(code)) {
      return {
        ok: false,
        message: "That code is not valid. Ask your teacher for the current class code.",
      };
    }

    writeStored({
      unlocked: true,
      code,
      teacher: config.teacher,
      unlockedAt: new Date().toISOString(),
    });

    return {
      ok: true,
      message: "Access granted. Full class practice materials are open on this device.",
    };
  }

  function revokeAccess() {
    clearStored();
  }

  function buildGateHTML(options) {
    const title = options.title || "Class materials are protected";
    const body =
      options.body ||
      "These practice materials are for students in Teacher Israel Ventura’s groups. Enter the class code your teacher gave you.";

    return `
      <section class="access-gate" data-access-gate-panel>
        <p class="eyebrow">Teacher access</p>
        <h2>${title}</h2>
        <p>${body}</p>
        <form class="access-form" data-access-form>
          <label>
            Class code
            <input
              type="text"
              name="code"
              data-access-input
              autocomplete="off"
              spellcheck="false"
              placeholder="Code from your teacher"
              required
            />
          </label>
          <p class="access-message" data-access-message hidden></p>
          <div class="access-actions">
            <button class="button primary" type="submit">Open class materials</button>
            ${
              options.secondaryHref
                ? `<a class="button secondary" href="${options.secondaryHref}">${options.secondaryLabel || "Back"}</a>`
                : ""
            }
          </div>
        </form>
        <p class="access-note">
          Free preview content stays open without a code. Full drills and protected sections need your teacher’s code.
        </p>
      </section>
    `;
  }

  function setMessage(form, text, isError) {
    const messageEl = form.querySelector("[data-access-message]");
    if (!messageEl) return;
    messageEl.hidden = !text;
    messageEl.textContent = text || "";
    messageEl.classList.toggle("is-error", Boolean(isError));
    messageEl.classList.toggle("is-success", Boolean(text) && !isError);
  }

  function bindForm(form, onSuccess) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const input = form.querySelector("[data-access-input]");
      const button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      setMessage(form, "Checking code…", false);

      try {
        const result = await tryUnlock(input ? input.value : "");
        if (!result.ok) {
          setMessage(form, result.message, true);
          if (button) button.disabled = false;
          return;
        }
        setMessage(form, result.message, false);
        if (typeof onSuccess === "function") {
          onSuccess();
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        setMessage(
          form,
          "Could not verify the code right now. Use the live site or a local server and try again.",
          true
        );
        if (button) button.disabled = false;
      }
    });
  }

  function mountInlineGate(container, options = {}) {
    if (!container) return;
    container.innerHTML = buildGateHTML(options);
    container.hidden = false;
    const form = container.querySelector("[data-access-form]");
    if (form) {
      bindForm(form, () => {
        if (typeof options.onSuccess === "function") options.onSuccess();
        else window.location.reload();
      });
    }
  }

  function updateLockedSections() {
    const unlocked = isUnlocked();
    document.documentElement.classList.toggle("has-teacher-access", unlocked);
    document.documentElement.classList.toggle("no-teacher-access", !unlocked);

    document.querySelectorAll("[data-requires-access]").forEach((el) => {
      if (unlocked) {
        el.classList.remove("is-access-locked");
        el.removeAttribute("aria-disabled");
      } else {
        el.classList.add("is-access-locked");
        el.setAttribute("aria-disabled", "true");
      }
    });

    document.querySelectorAll("[data-access-status]").forEach((el) => {
      if (unlocked) {
        const record = getAccessRecord();
        el.hidden = false;
        el.textContent = `Class access active on this device${
          record?.unlockedAt ? ` · since ${new Date(record.unlockedAt).toLocaleDateString()}` : ""
        }`;
        el.classList.add("is-open");
      } else {
        el.hidden = false;
        el.textContent = "Full practice materials need your teacher’s class code.";
        el.classList.remove("is-open");
      }
    });

    document.querySelectorAll("[data-access-open-only]").forEach((el) => {
      el.hidden = !unlocked;
    });

    document.querySelectorAll("[data-access-locked-only]").forEach((el) => {
      el.hidden = unlocked;
    });
  }

  /**
   * Protect a page: show gate if locked; run onUnlocked when access is valid.
   */
  async function guardPage(options = {}) {
    updateLockedSections();

    const gateHost = document.querySelector("[data-access-gate]");
    const protectedRoot = document.querySelector("[data-access-protected]");

    if (isUnlocked()) {
      if (gateHost) gateHost.hidden = true;
      if (protectedRoot) protectedRoot.hidden = false;
      if (typeof options.onUnlocked === "function") options.onUnlocked();
      return true;
    }

    if (protectedRoot) protectedRoot.hidden = true;
    if (gateHost) {
      mountInlineGate(gateHost, {
        title: options.title,
        body: options.body,
        secondaryHref: options.secondaryHref || "dashboard.html",
        secondaryLabel: options.secondaryLabel || "Back to dashboard",
        onSuccess: () => {
          updateLockedSections();
          if (gateHost) gateHost.hidden = true;
          if (protectedRoot) protectedRoot.hidden = false;
          if (typeof options.onUnlocked === "function") options.onUnlocked();
          else window.location.reload();
        },
      });
    }

    return false;
  }

  function wireDashboardAccess() {
    const form = document.querySelector("[data-access-form]");
    if (form) {
      bindForm(form, () => {
        updateLockedSections();
        window.location.hash = "class-access";
        window.location.reload();
      });
    }

    const revokeBtn = document.querySelector("[data-access-revoke]");
    if (revokeBtn) {
      revokeBtn.addEventListener("click", () => {
        revokeAccess();
        updateLockedSections();
        window.location.reload();
      });
    }

    // Guided practice link: if locked, jump to access form instead of empty promise
    document.querySelectorAll("[data-access-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (isUnlocked()) return;
        event.preventDefault();
        const target = document.querySelector("[data-access-form]");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          const input = target.querySelector("[data-access-input]");
          if (input) input.focus();
        } else {
          window.location.href = link.getAttribute("href") || "part5-guided-practice.html";
        }
      });
    });
  }

  function initCommon() {
    updateLockedSections();
    if (document.body && document.body.dataset.accessPage === "dashboard") {
      wireDashboardAccess();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCommon);
  } else {
    initCommon();
  }

  global.ToeicAccess = {
    loadConfig,
    isUnlocked,
    getAccessRecord,
    tryUnlock,
    revokeAccess,
    lock: revokeAccess,
    clear: revokeAccess,
    guardPage,
    requireAccess: guardPage,
    updateLockedSections,
    mountInlineGate,
  };
})(window);
