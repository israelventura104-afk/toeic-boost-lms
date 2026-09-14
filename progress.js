/**
 * Practice progress — Paso 3
 * Saves demo + Part 5/6/7 guided/mock + Full Reading mock sessions on this device (localStorage).
 * No accounts. Teacher class materials only.
 */

(function (global) {
  const STORAGE_KEY = "toeic-boost.progress.v1";
  const MAX_SESSIONS = 40;

  function emptyState() {
    return {
      version: 1,
      demoSessions: [],
      listeningSessions: [],
      readingSessions: [],
      part5Sessions: [],
      part6Sessions: [],
      part7Sessions: [],
      readingMockSessions: [],
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object") return emptyState();
      if (!Array.isArray(data.demoSessions)) data.demoSessions = [];
      if (!Array.isArray(data.listeningSessions)) data.listeningSessions = [];
      if (!Array.isArray(data.readingSessions)) data.readingSessions = [];
      if (!Array.isArray(data.part5Sessions)) data.part5Sessions = [];
      if (!Array.isArray(data.part6Sessions)) data.part6Sessions = [];
      if (!Array.isArray(data.part7Sessions)) data.part7Sessions = [];
      if (!Array.isArray(data.readingMockSessions)) data.readingMockSessions = [];
      return data;
    } catch {
      return emptyState();
    }
  }

  function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function normalizeSkill(skill) {
    const lower = String(skill || "")
      .toLowerCase()
      .trim()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ");

    const names = {
      "verb forms": "Verb Tenses",
      "verb tense": "Verb Tenses",
      "verb tenses": "Verb Tenses",
      prepositions: "Prepositions",
      "word forms": "Word Forms",
      connectors: "Conjunctions/Transitions",
      "conjunctions transitions": "Conjunctions/Transitions",
      "conjunctions/transitions": "Conjunctions/Transitions",
      pronouns: "Pronouns",
      "verb tense / agreement": "Subject-Verb Agreement",
      "subject verb agreement": "Subject-Verb Agreement",
      "subject-verb agreement": "Subject-Verb Agreement",
      conditionals: "Conditionals",
      "passive voice": "Passive Voice",
      comparatives: "Comparatives/Superlatives",
      superlatives: "Comparatives/Superlatives",
      "comparatives superlatives": "Comparatives/Superlatives",
      "comparatives/superlatives": "Comparatives/Superlatives",
      gerunds: "Gerunds/Infinitives",
      infinitives: "Gerunds/Infinitives",
      "gerunds infinitives": "Gerunds/Infinitives",
      "gerunds/infinitives": "Gerunds/Infinitives",
      articles: "Articles/Determiners",
      determiners: "Articles/Determiners",
      "articles determiners": "Articles/Determiners",
      "articles/determiners": "Articles/Determiners",
      modals: "Modals",
      "main idea": "Main Idea",
      detail: "Detail",
      inference: "Inference",
      vocabulary: "Vocabulary",
    };

    if (names[lower]) return names[lower];

    return String(skill || "Other")
      .split(/[\s_/-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  function buildSkillMapFromItems(items) {
    const skillMap = {};
    const mistakes = [];
    (items || []).forEach((entry) => {
      const skill = normalizeSkill(entry.skill || entry.topic || "Other");
      if (!skillMap[skill]) skillMap[skill] = { correct: 0, total: 0 };
      skillMap[skill].total += 1;
      const isCorrect = Boolean(entry.correct);
      if (isCorrect) skillMap[skill].correct += 1;
      else {
        mistakes.push({
          skill,
          subskill: entry.subskill || "",
          questionId: entry.questionId || "",
          prompt: entry.prompt || "",
          part: entry.part || null,
        });
      }
    });
    return { skillMap, mistakes };
  }

  function aggregateSkillsFromSessions(sessions) {
    const totals = {};
    (sessions || []).forEach((session) => {
      let skills = session.skills || {};
      if (!skills || !Object.keys(skills).length) {
        if (Array.isArray(session.items) && session.items.length) {
          skills = buildSkillMapFromItems(session.items).skillMap;
        }
      }
      Object.entries(skills).forEach(([skill, row]) => {
        if (!totals[skill]) totals[skill] = { correct: 0, total: 0 };
        totals[skill].correct += row.correct || 0;
        totals[skill].total += row.total || 0;
      });
    });
    return totals;
  }

  function skillStatus(correct, total) {
    if (!total) return { label: "Not practiced", width: 0 };
    const pct = Math.round((correct / total) * 100);
    if (pct >= 80) return { label: "Strong", width: pct };
    if (pct >= 60) return { label: "Stable", width: pct };
    if (pct >= 40) return { label: "Review", width: pct };
    return { label: "Needs work", width: Math.max(pct, 12) };
  }

  function rankSkills(totals, limit = 4) {
    return Object.entries(totals || {})
      .map(([skill, row]) => {
        const status = skillStatus(row.correct, row.total);
        return {
          skill,
          correct: row.correct,
          total: row.total,
          percent: row.total ? Math.round((row.correct / row.total) * 100) : 0,
          label: status.label,
          width: status.width,
        };
      })
      .sort((a, b) => {
        if (a.percent !== b.percent) return a.percent - b.percent;
        return b.total - a.total;
      })
      .slice(0, limit);
  }

  function dayKey(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  }

  /**
   * @param {object} session
   * @param {number} session.correct
   * @param {number} session.total
   * @param {Array} session.items
   * @param {object} [session.byPart]
   */
  function recordDemoSession(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const items = Array.isArray(session.items) ? session.items : [];
    const { skillMap, mistakes } = buildSkillMapFromItems(items);

    const record = {
      id: `demo-${Date.now()}`,
      section: "demo",
      mode: "demo",
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      byPart: session.byPart || null,
      items: items.map((entry) => ({
        questionId: entry.questionId || "",
        skill: entry.skill || "",
        part: entry.part || null,
        correct: Boolean(entry.correct),
      })),
    };

    state.demoSessions.unshift(record);
    if (state.demoSessions.length > MAX_SESSIONS) {
      state.demoSessions = state.demoSessions.slice(0, MAX_SESSIONS);
    }
    save(state);
    return record;
  }

  function recordPart5Session(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const items = Array.isArray(session.items) ? session.items : [];
    const { skillMap, mistakes } = buildSkillMapFromItems(items);

    const mode = session.mode || "guided";
    const record = {
      id: `p5-${Date.now()}`,
      section: "reading",
      part: 5,
      mode,
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      questionIds: Array.isArray(session.questionIds) ? session.questionIds : [],
      durationSeconds:
        session.durationSeconds != null ? Number(session.durationSeconds) : null,
      timedOut: Boolean(session.timedOut),
      items: items.map((entry) => ({
        questionId: entry.questionId || "",
        skill: entry.skill || "",
        subskill: entry.subskill || "",
        part: 5,
        correct: Boolean(entry.correct),
      })),
    };

    state.part5Sessions.unshift(record);
    if (state.part5Sessions.length > MAX_SESSIONS) {
      state.part5Sessions = state.part5Sessions.slice(0, MAX_SESSIONS);
    }
    syncReadingSessions(state);
    save(state);
    return record;
  }

  function syncReadingSessions(state) {
    // Combined Part 5 + Part 6 + Part 7 + Full Reading mock; per-part arrays stay intact.
    const combined = [
      ...(state.part5Sessions || []),
      ...(state.part6Sessions || []),
      ...(state.part7Sessions || []),
      ...(state.readingMockSessions || []),
    ];
    combined.sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));
    state.readingSessions = combined.slice(0, MAX_SESSIONS);
  }

  function recordReadingMockSession(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const items = Array.isArray(session.items) ? session.items : [];
    const { skillMap, mistakes } = buildSkillMapFromItems(items);

    const partScores = session.partScores || {};
    const record = {
      id: `rm-${Date.now()}`,
      section: "reading",
      part: "reading-mock",
      mode: session.mode || "reading-mock",
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      questionIds: Array.isArray(session.questionIds) ? session.questionIds : [],
      passageIds: Array.isArray(session.passageIds) ? session.passageIds : [],
      setIds: Array.isArray(session.setIds) ? session.setIds : [],
      durationSeconds:
        session.durationSeconds != null ? Number(session.durationSeconds) : null,
      timedOut: Boolean(session.timedOut),
      partScores: {
        part5: partScores.part5 || { correct: 0, total: 0 },
        part6: partScores.part6 || { correct: 0, total: 0 },
        part7: partScores.part7 || { correct: 0, total: 0 },
      },
      items: items.map((entry) => ({
        questionId: entry.questionId || "",
        skill: entry.skill || "",
        subskill: entry.subskill || "",
        part: entry.part || null,
        correct: Boolean(entry.correct),
      })),
    };

    state.readingMockSessions.unshift(record);
    if (state.readingMockSessions.length > MAX_SESSIONS) {
      state.readingMockSessions = state.readingMockSessions.slice(0, MAX_SESSIONS);
    }
    syncReadingSessions(state);
    save(state);
    return record;
  }

  function recordPart6Session(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const items = Array.isArray(session.items) ? session.items : [];
    const { skillMap, mistakes } = buildSkillMapFromItems(items);

    const mode = session.mode || "guided";
    const record = {
      id: `p6-${Date.now()}`,
      section: "reading",
      part: 6,
      mode,
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      questionIds: Array.isArray(session.questionIds) ? session.questionIds : [],
      passageIds: Array.isArray(session.passageIds) ? session.passageIds : [],
      durationSeconds:
        session.durationSeconds != null ? Number(session.durationSeconds) : null,
      timedOut: Boolean(session.timedOut),
      items: items.map((entry) => ({
        questionId: entry.questionId || "",
        skill: entry.skill || "",
        subskill: entry.subskill || "",
        part: 6,
        correct: Boolean(entry.correct),
      })),
    };

    state.part6Sessions.unshift(record);
    if (state.part6Sessions.length > MAX_SESSIONS) {
      state.part6Sessions = state.part6Sessions.slice(0, MAX_SESSIONS);
    }
    syncReadingSessions(state);
    save(state);
    return record;
  }

  function recordPart7Session(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const items = Array.isArray(session.items) ? session.items : [];
    const { skillMap, mistakes } = buildSkillMapFromItems(items);

    const mode = session.mode || "guided";
    const record = {
      id: `p7-${Date.now()}`,
      section: "reading",
      part: 7,
      mode,
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      questionIds: Array.isArray(session.questionIds) ? session.questionIds : [],
      setIds: Array.isArray(session.setIds) ? session.setIds : [],
      durationSeconds:
        session.durationSeconds != null ? Number(session.durationSeconds) : null,
      timedOut: Boolean(session.timedOut),
      items: items.map((entry) => ({
        questionId: entry.questionId || "",
        skill: entry.skill || "",
        subskill: entry.subskill || "",
        part: 7,
        correct: Boolean(entry.correct),
      })),
    };

    state.part7Sessions.unshift(record);
    if (state.part7Sessions.length > MAX_SESSIONS) {
      state.part7Sessions = state.part7Sessions.slice(0, MAX_SESSIONS);
    }
    syncReadingSessions(state);
    save(state);
    return record;
  }

  function recordPracticeSession(session) {
    const section = String(session.section || session.part || "practice").toLowerCase();
    if (section === "part5" || section === "p5" || Number(session.part) === 5) {
      return recordPart5Session(session);
    }
    if (section === "part6" || section === "p6" || Number(session.part) === 6) {
      return recordPart6Session(session);
    }
    if (section === "part7" || section === "p7" || Number(session.part) === 7) {
      return recordPart7Session(session);
    }
    if (section === "demo") {
      return recordDemoSession(session);
    }
    return recordPart5Session(session);
  }

  function getDemoSessions() {
    return load().demoSessions;
  }

  function getPart5Sessions() {
    const state = load();
    if (state.part5Sessions && state.part5Sessions.length) return state.part5Sessions;
    // Legacy: older saves may only have readingSessions that were Part 5 aliases
    return (state.readingSessions || []).filter((s) => !s.part || s.part === 5);
  }

  function getPart6Sessions() {
    const state = load();
    return state.part6Sessions || [];
  }

  function getPart7Sessions() {
    const state = load();
    return state.part7Sessions || [];
  }

  function getReadingMockSessions() {
    const state = load();
    return state.readingMockSessions || [];
  }

  function getStreakDays() {
    const all = [
      ...getDemoSessions(),
      ...getPart5Sessions(),
      ...getPart6Sessions(),
      ...getPart7Sessions(),
      ...getReadingMockSessions(),
    ];
    const days = [...new Set(all.map((s) => dayKey(s.at)).filter(Boolean))]
      .sort()
      .reverse();

    if (!days.length) return 0;

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);

    if (days[0] !== todayKey && days[0] !== yKey) return 0;

    let streak = 1;
    let cursor = new Date(days[0] + "T12:00:00");

    for (let i = 1; i < days.length; i += 1) {
      cursor.setDate(cursor.getDate() - 1);
      const expected = cursor.toISOString().slice(0, 10);
      if (days[i] === expected) streak += 1;
      else break;
    }
    return streak;
  }

  function getSummary() {
    const demos = getDemoSessions();
    const part5 = getPart5Sessions();
    const part6 = getPart6Sessions();
    const part7 = getPart7Sessions();
    const readingMocks = getReadingMockSessions();
    const demoCount = demos.length;
    const part5Count = part5.length;
    const part6Count = part6.length;
    const part7Count = part7.length;
    const readingMockCount = readingMocks.length;
    const last = demos[0] || null;
    const avg =
      demoCount > 0
        ? Math.round(demos.reduce((sum, s) => sum + (s.percent || 0), 0) / demoCount)
        : null;
    const skills = rankSkills(aggregateSkillsFromSessions(demos), 5);
    const part5Avg =
      part5Count > 0
        ? Math.round(part5.reduce((sum, s) => sum + (s.percent || 0), 0) / part5Count)
        : null;
    const part5Skills = rankSkills(aggregateSkillsFromSessions(part5), 5);
    const part6Avg =
      part6Count > 0
        ? Math.round(part6.reduce((sum, s) => sum + (s.percent || 0), 0) / part6Count)
        : null;
    const part6Skills = rankSkills(aggregateSkillsFromSessions(part6), 5);
    const part7Avg =
      part7Count > 0
        ? Math.round(part7.reduce((sum, s) => sum + (s.percent || 0), 0) / part7Count)
        : null;
    const part7Skills = rankSkills(aggregateSkillsFromSessions(part7), 5);
    const readingSessions = [...part5, ...part6, ...part7, ...readingMocks].sort((a, b) =>
      String(b.at || "").localeCompare(String(a.at || ""))
    );
    const readingSkills = rankSkills(aggregateSkillsFromSessions(readingSessions), 5);
    const combinedSkills = rankSkills(
      aggregateSkillsFromSessions([...demos, ...part5, ...part6, ...part7, ...readingMocks]),
      5
    );
    const focus =
      combinedSkills[0] ||
      skills[0] ||
      part5Skills[0] ||
      part6Skills[0] ||
      part7Skills[0] ||
      null;
    const totalSessionsAll = demoCount + part5Count + part6Count + part7Count + readingMockCount;
    const readingCount = part5Count + part6Count + part7Count + readingMockCount;
    const readingBlock = {
      sessionCount: readingCount,
      averagePercent:
        readingCount > 0
          ? Math.round(
              readingSessions.reduce((sum, s) => sum + (s.percent || 0), 0) / readingCount
            )
          : null,
      last: readingSessions[0] || null,
      skills: readingSkills,
    };
    const part5Block = {
      sessionCount: part5Count,
      averagePercent: part5Avg,
      last: part5[0] || null,
      skills: part5Skills,
    };
    const part6Block = {
      sessionCount: part6Count,
      averagePercent: part6Avg,
      last: part6[0] || null,
      skills: part6Skills,
    };
    const part7Block = {
      sessionCount: part7Count,
      averagePercent: part7Avg,
      last: part7[0] || null,
      skills: part7Skills,
    };
    const readingMockAvg =
      readingMockCount > 0
        ? Math.round(
            readingMocks.reduce((sum, s) => sum + (s.percent || 0), 0) / readingMockCount
          )
        : null;
    const readingMockBlock = {
      sessionCount: readingMockCount,
      averagePercent: readingMockAvg,
      last: readingMocks[0] || null,
      skills: rankSkills(aggregateSkillsFromSessions(readingMocks), 5),
    };

    let focusNote = "Take the free short demo or Part 5 / Part 6 / Part 7 practice to see what to study next.";
    let focusSection = "Reading";
    if (focus) {
      focusSection = readingCount ? "Reading" : "Demo";
      focusNote = readingCount
        ? `Focus: ${focus.skill} (${focus.percent}% so far across saved sessions).`
        : `Demo focus: ${focus.skill} (${focus.percent}% so far).`;
    }

    return {
      demo: {
        sessionCount: demoCount,
        averagePercent: avg,
        last,
        skills,
      },
      sessionCount: totalSessionsAll,
      averagePercent: avg,
      last,
      skills: combinedSkills,
      streakDays: getStreakDays(),
      totalSessionsAll,
      focusSkill: focus ? focus.skill : "Reading & Grammar patterns",
      focusSection,
      focusNote,
      listening: { sessionCount: 0, averagePercent: null, last: null, skills: [] },
      reading: readingBlock,
      part5: part5Block,
      part6: part6Block,
      part7: part7Block,
      readingMock: readingMockBlock,
    };
  }

  function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  global.ToeicProgress = {
    normalizeSkill,
    recordDemoSession,
    recordPart5Session,
    recordPart6Session,
    recordPart7Session,
    recordReadingMockSession,
    recordPracticeSession,
    getDemoSessions,
    getPart5Sessions,
    getPart6Sessions,
    getPart7Sessions,
    getReadingMockSessions,
    getStreakDays,
    getSummary,
    clearProgress,
    load,
  };
})(window);
