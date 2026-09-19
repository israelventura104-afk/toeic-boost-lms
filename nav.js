/**
 * TOEIC Boost navigation
 * - Landing (index): mobile menu toggle only (header is inline).
 * - App pages with [data-site-header]: inject branded topbar + links.
 */
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").split("?")[0].toLowerCase();

  const GLOBAL = [
    { href: "dashboard.html", label: "Progress", area: "progress" },
    { href: "demo-test.html", label: "Short demo", area: "demo" },
    { href: "listening.html", label: "Listening", area: "listening" },
    { href: "reading.html", label: "Reading", area: "reading" },
    { href: "strategies.html", label: "Strategies", area: "strategies" },
  ];

  function here() {
    if (file === "dashboard.html") return { area: "progress" };
    if (file === "demo-test.html") return { area: "demo" };
    if (file === "listening.html" || file === "part1-practice.html") {
      return { area: "listening" };
    }
    if (
      file === "reading.html" ||
      file === "part5-practice.html" ||
      file === "part5-guided-practice.html" ||
      file === "part5-mock.html" ||
      file === "part6-practice.html" ||
      file === "part6-guided-practice.html" ||
      file === "part6-mock.html" ||
      file === "part7-practice.html" ||
      file === "part7-guided-practice.html" ||
      file === "part7-mock.html" ||
      file === "reading-mock.html"
    ) {
      return { area: "reading" };
    }
    if (file === "strategies.html") return { area: "strategies" };
    if (file === "index.html" || file === "") return { area: "home" };
    return { area: "" };
  }

  function renderHeader(place) {
    const links = GLOBAL.map((item) => {
      const active = item.area === place.area ? " active" : "";
      const current = item.area === place.area ? ' aria-current="page"' : "";
      return `<a class="${active.trim()}" href="${item.href}"${current}>${item.label}</a>`;
    }).join("");

    return `
      <a class="brand" href="index.html" aria-label="TOEIC Boost home">
        <span class="brand-mark" aria-hidden="true">
          <img class="brand-logo" src="assets/logo.png" alt="" width="44" height="44">
        </span>
        <span class="brand-copy">
          <small>By Teacher Israel Ventura</small>
          <strong>TOEIC Boost</strong>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        Menu
      </button>
      <nav class="nav" id="site-nav" aria-label="Main navigation">
        ${links}
        <a class="nav-mobile-only" href="dashboard.html#class-access">Enter class code</a>
      </nav>
      <div class="nav-actions">
        <a class="button secondary" href="dashboard.html#class-access">Enter class code</a>
        <a class="button primary" href="demo-test.html">Short demo test</a>
      </div>
    `;
  }

  function bindToggle(header) {
    const btn = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".nav");
    if (!btn || !nav || header.dataset.navBound) return;
    header.dataset.navBound = "1";
    const setOpen = (open) => {
      header.classList.toggle("is-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    };
    btn.addEventListener("click", () => {
      setOpen(!header.classList.contains("is-nav-open"));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  const headerHost = document.querySelector("[data-site-header]");
  if (headerHost) {
    headerHost.innerHTML = renderHeader(here());
    bindToggle(headerHost);
  } else {
    // Landing / pages with static header
    document.querySelectorAll(".topbar").forEach(bindToggle);
  }
})();
