(() => {
  "use strict";

  const D = window.LEARNING_DATA;
  const SVGNS = "http://www.w3.org/2000/svg";

  // ───────────────────────── storage (per browser) ─────────────────────────
  const KEYS = { status: "skillmap.courseStatus", learned: "skillmap.learned", log: "skillmap.log", custom: "skillmap.custom", levels: "skillmap.levels", focus: "skillmap.focus", progress: "skillmap.progress", tab: "skillmap.tab", cats: "skillmap.categories", courseCat: "skillmap.courseCategory", catFilter: "skillmap.catFilter" };
  const store = {
    get(k, fallback) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
  };
  let courseStatus = store.get(KEYS.status, {});          // curated course id → status
  let manualLearned = new Set(store.get(KEYS.learned, [])); // concept ids marked learned by hand
  let log = store.get(KEYS.log, []);                        // user's own courses and projects
  let levels = store.get(KEYS.levels, {}) || {};            // concept id → 1 Aware … 4 Master (set by you)
  manualLearned.forEach((id) => { if (!levels[id]) levels[id] = 2; }); // older "mark as learned" = Understand
  let focus = store.get(KEYS.focus, "t:ai-agentic");
  let progress = store.get(KEYS.progress, {}) || {};          // course id → % done (courses without weeks)
  // Course categories for the My courses page (Degree, AI, Enterprise Architecture, … plus your own)
  const DEFAULT_CATS = [
    { id: "degree", name: "Degree", color: "#0f766e", pinned: true },
    { id: "ai", name: "AI", color: "#7c5cff", pinned: true },
    { id: "ea", name: "Enterprise Architecture", color: "#0369a1", pinned: true },
    { id: "cs", name: "CS Foundations", color: "#2563eb" },
    { id: "consult", name: "Consulting", color: "#db2777" },
    { id: "fin", name: "Finance", color: "#0f9f6e" },
    { id: "other", name: "Other", color: "#64748b" }
  ];
  let categories = store.get(KEYS.cats, null);
  if (!Array.isArray(categories) || !categories.length) categories = DEFAULT_CATS.map((c) => ({ ...c }));
  DEFAULT_CATS.forEach((d) => { if (!categories.some((c) => c.id === d.id)) categories.push({ ...d }); });
  let courseCat = store.get(KEYS.courseCat, {}) || {};        // course id → category id (when you change it)
  let catFilter = store.get(KEYS.catFilter, "all");         // depth track: "t:<topic>" or "d:<domain>"
  if (!Array.isArray(log)) log = [];
  const save = () => {
    store.set(KEYS.status, courseStatus);
    store.set(KEYS.learned, [...manualLearned]);
    store.set(KEYS.log, log);
    store.set(KEYS.custom, custom);
    store.set(KEYS.levels, levels);
    store.set(KEYS.focus, focus);
    store.set(KEYS.progress, progress);
    store.set(KEYS.cats, categories);
    store.set(KEYS.courseCat, courseCat);
    store.set(KEYS.catFilter, catFilter);
  };

  // ───────────────────────── lookups ─────────────────────────
  const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
  const domainById = byId(D.domains);
  const topicById = byId(D.topics);
  const conceptById = byId(D.concepts);
  const conceptDomain = (c) => c.domain || topicById[c.topic].domain;

  // ───────────────────────── your own domains / topics / concepts ─────────────────────────
  // Created from your courses. Saved in this browser; Export JSON backs them up and
  // lets them be merged into data.js permanently.
  const DOMAIN_COLORS = ["#d946ef", "#0891b2", "#dc2626", "#4f46e5", "#65a30d", "#ea580c", "#0d9488", "#be185d"];
  const DOMAIN_SLOTS = [[0, -520], [-600, 520], [600, 520], [-1040, -60], [1040, -60], [0, 820], [-1040, 560], [1040, 560], [-560, -600], [560, -600]];
  const arr = (x) => (Array.isArray(x) ? x : []);
  let custom = store.get(KEYS.custom, {}) || {};
  custom = { domains: arr(custom.domains), topics: arr(custom.topics), concepts: arr(custom.concepts) };

  function registerDomain(d) {
    if (!d || !d.id || !d.name || domainById[d.id]) return false;
    d.custom = true;
    if (!Array.isArray(d.anchor)) d.anchor = freeSlot();
    if (!d.color) d.color = freeColor();
    D.domains.push(d); domainById[d.id] = d; return true;
  }
  function registerTopic(t) {
    if (!t || !t.id || !t.name || topicById[t.id] || !domainById[t.domain]) return false;
    t.custom = true; D.topics.push(t); topicById[t.id] = t; return true;
  }
  function registerConcept(c) {
    if (!c || !c.id || !c.label || conceptById[c.id] || !topicById[c.topic]) return false;
    c.custom = true; c.definition = c.definition || ""; D.concepts.push(c); conceptById[c.id] = c; return true;
  }
  function freeSlot() {
    const used = D.domains.map((d) => d.anchor);
    const slot = DOMAIN_SLOTS.find(([x, y]) => used.every(([ux, uy]) => Math.hypot(ux - x, uy - y) > 300));
    if (slot) return [...slot];
    const a = D.domains.length * 2.4;
    return [Math.round(Math.cos(a) * 1200), Math.round(Math.sin(a) * 900)];
  }
  function freeColor() {
    const used = new Set(D.domains.map((d) => d.color));
    return DOMAIN_COLORS.find((c) => !used.has(c)) || DOMAIN_COLORS[D.domains.length % DOMAIN_COLORS.length];
  }
  custom.domains = custom.domains.filter(registerDomain);
  custom.topics = custom.topics.filter(registerTopic);
  custom.concepts = custom.concepts.filter(registerConcept);

  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "item";
  function uniqueId(label, taken) {
    const base = "my-" + slugify(label);
    let id = base, i = 2;
    while (taken[id]) id = base + "-" + i++;
    return id;
  }
  function addDomain(name, source) {
    const d = { id: uniqueId(name, domainById), name, summary: source ? `Added from “${source}”.` : "Added by you.", source };
    registerDomain(d); custom.domains.push(d); return d.id;
  }
  function addTopic(name, domain, source) {
    const t = { id: uniqueId(name, topicById), domain, name, source };
    registerTopic(t); custom.topics.push(t); return t.id;
  }
  function addConcept(label, topic, source, definition = "") {
    const existing = D.concepts.find((c) => c.label.toLowerCase() === label.toLowerCase());
    if (existing) return existing.id;
    const c = { id: uniqueId(label, conceptById), topic, label, definition, source };
    registerConcept(c); custom.concepts.push(c); return c.id;
  }
  function removeCustom(kind, id) {
    let conceptIds = [];
    if (kind === "concept") conceptIds = [id];
    if (kind === "topic") conceptIds = D.concepts.filter((c) => c.topic === id).map((c) => c.id);
    if (kind === "domain") {
      const topicIds = D.topics.filter((t) => t.domain === id).map((t) => t.id);
      conceptIds = D.concepts.filter((c) => topicIds.includes(c.topic)).map((c) => c.id);
      topicIds.forEach((t) => { delete topicById[t]; });
      D.topics = D.topics.filter((t) => !topicIds.includes(t.id));
      custom.topics = custom.topics.filter((t) => !topicIds.includes(t.id));
      D.domains = D.domains.filter((d) => d.id !== id); delete domainById[id];
      custom.domains = custom.domains.filter((d) => d.id !== id);
      log.forEach((e) => { if (e.domain === id) e.domain = D.domains[0].id; });
    }
    if (kind === "topic") {
      D.topics = D.topics.filter((t) => t.id !== id); delete topicById[id];
      custom.topics = custom.topics.filter((t) => t.id !== id);
    }
    D.concepts = D.concepts.filter((c) => !conceptIds.includes(c.id));
    conceptIds.forEach((c) => { delete conceptById[c]; manualLearned.delete(c); delete levels[c]; });
    custom.concepts = custom.concepts.filter((c) => !conceptIds.includes(c.id));
    log.forEach((e) => { e.concepts = (e.concepts || []).filter((c) => !conceptIds.includes(c)); });
    afterCustomChange();
  }
  function afterCustomChange() {
    save(); refreshDomainOptions(); refreshDatalist();
    if (selectedId && !nodeById[selectedId]) selectedId = null;
    rebuild();
    if (selectedId && !nodeById[selectedId]) { selectedId = null; renderPanel(); }
  }
  const LEVELS = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const STATUS_LABEL = { none: "Not started", planned: "Planned", "in-progress": "In progress", completed: "Completed" };

  function courseDomainId(c) {
    if (c.domain && domainById[c.domain]) return c.domain;
    const count = {};
    (c.covers || []).forEach((id) => {
      const k = conceptById[id] && conceptDomain(conceptById[id]);
      if (k) count[k] = (count[k] || 0) + 1;
    });
    const best = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
    return best ? best[0] : D.domains[0].id;
  }

  function allCourses() {
    const curated = D.courses.map((c) => {
      const modules = (c.modules || []).map((m) => ({ ...m, done: courseStatus[moduleKey(c.id, m.id)] === "completed" }));
      const covers = [...new Set([...c.covers, ...modules.flatMap((m) => m.covers)])];
      return { ...c, covers, modules, mine: false, status: courseStatus[c.id] || "none" };
    });
    const mine = log.map((e) => ({
      id: "log:" + e.id, logId: e.id, title: e.title, provider: e.provider, url: e.url, cost: "", level: "",
      covers: (e.concepts || []).filter((id) => conceptById[id]), mine: true, kind: e.kind || "course", status: e.status, start: e.start, end: e.end, domain: e.domain, notes: e.notes
    }));
    return [...mine, ...curated];
  }
  const courseById = () => byId(allCourses());

  // Courses can be split into modules (e.g. CS50x weeks); finishing a module lights up its concepts.
  const moduleKey = (courseId, moduleId) => courseId + "#" + moduleId;
  const shortTitle = (t) => t.split(":")[0];
  function learnedVia(conceptId) {
    const out = [];
    allCourses().forEach((c) => {
      if (c.status === "completed" && c.covers.includes(conceptId)) out.push(c);
      else (c.modules || []).forEach((m) => {
        if (m.done && m.covers.includes(conceptId)) out.push({ ...c, title: `${shortTitle(c.title)} · ${m.title}` });
      });
    });
    return out;
  }
  function setModuleDone(courseId, moduleId, done) {
    const key = moduleKey(courseId, moduleId);
    if (done) courseStatus[key] = "completed"; else delete courseStatus[key];
    const c = D.courses.find((x) => x.id === courseId);
    const total = c.modules.length, finished = c.modules.filter((m) => courseStatus[moduleKey(c.id, m.id)] === "completed").length;
    if (finished === total) courseStatus[c.id] = "completed";
    else if (finished > 0 && ["none", "planned", "completed", undefined].includes(courseStatus[c.id])) courseStatus[c.id] = "in-progress";
    else if (finished === 0 && courseStatus[c.id] === "in-progress") delete courseStatus[c.id];
    save(); refreshAll();
  }
  // ── Depth levels: courses lift a concept to Understand, your own projects to Apply.
  const LEVEL_NAMES = ["Not started", "Aware", "Understand", "Apply", "Master"];
  const LEVEL_HELP = [
    "Not touched yet.",
    "You can say what it is in one sentence and when it's used. Time-box: about 1 hour (a video or an article), then move on.",
    "You can explain how it works and its trade-offs. Time-box: 3–5 hours, usually one course module.",
    "You've used it in something you built yourself. This comes from projects, not courses.",
    "You could teach it, or debug hard problems with it without looking things up."
  ];
  const NEXT_STEP = [
    "Get to Aware: spend about an hour on a video or article, then move on.",
    "Get to Understand: take one course module on it (see the courses below).",
    "Get to Apply: use it in a small project, then log the project in My learning log with Type = Project.",
    "Get to Master: teach it, write about it, or use it in a harder project.",
    ""
  ];
  const LEVEL_FILL = [0, 0.22, 0.5, 1, 1];
  function derivedLevel(conceptId) {
    const via = learnedVia(conceptId);
    if (!via.length) return 0;
    return via.some((v) => v.mine && v.kind === "project") ? 3 : 2;
  }
  const levelOf = (conceptId) => Math.max(levels[conceptId] || 0, derivedLevel(conceptId));
  const isLearned = (conceptId) => levelOf(conceptId) >= 2;

  function domainProgress(domainId) {
    const cs = D.concepts.filter((c) => conceptDomain(c) === domainId);
    const lv = cs.map((c) => levelOf(c.id)), n = cs.length || 1;
    const done = lv.filter((l) => l >= 2).length;
    return { done, total: cs.length, frac: done / n,
      breadth: lv.filter((l) => l >= 1).length / n, depth: lv.filter((l) => l >= 3).length / n };
  }

  function setCourseStatus(course, status) {
    if (course.mine) {
      const e = log.find((x) => x.id === course.logId);
      if (e) {
        e.status = status;
        if (status === "completed" && !e.end) e.end = today();
        if (status === "in-progress" && !e.start) e.start = today();
      }
    } else if (status === "none") delete courseStatus[course.id];
    else courseStatus[course.id] = status;
    save();
    refreshAll();
  }

  // ───────────────────────── tiny DOM helpers ─────────────────────────
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
    return el;
  }
  function s(tag, attrs) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) el.setAttribute(k, v);
    return el;
  }
  const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? u : "#");
  const today = () => new Date().toISOString().slice(0, 10);
  const $ = (id) => document.getElementById(id);

  // ───────────────────────── graph model ─────────────────────────
  let nodes = [], links = [], nodeById = {}, neighbors = {};
  let showCourses = false;
  const posCache = {};

  function buildGraph() {
    nodes.forEach((n) => (posCache[n.id] = { x: n.x, y: n.y }));
    nodes = []; links = [];
    const add = (n) => {
      const d = domainById[n.domain];
      const p = posCache[n.id] || n.seed || {
        x: d.anchor[0] + (Math.random() - 0.5) * 160,
        y: d.anchor[1] + (Math.random() - 0.5) * 160
      };
      nodes.push({ vx: 0, vy: 0, fx: null, fy: null, ...n, x: p.x, y: p.y });
    };
    const link = (s, t, type) => links.push({ s, t, type });

    D.domains.forEach((d) => add({ id: "d:" + d.id, type: "domain", label: d.name, domain: d.id, ref: d, r: 30,
      seed: { x: d.anchor[0], y: d.anchor[1] } }));
    D.topics.forEach((t) => {
      add({ id: "t:" + t.id, type: "topic", label: t.name, domain: t.domain, ref: t, r: 15 });
      link("d:" + t.domain, "t:" + t.id, "tree");
    });
    D.concepts.forEach((c) => {
      add({ id: "c:" + c.id, type: "concept", label: c.label, domain: conceptDomain(c), ref: c, r: 8 });
      link(c.topic ? "t:" + c.topic : "d:" + c.domain, "c:" + c.id, c.topic ? "tree" : "tree-direct");
    });
    const seen = new Set();
    D.concepts.forEach((c) => (c.related || []).forEach((r) => {
      if (!conceptById[r]) return;
      const key = [c.id, r].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      link("c:" + c.id, "c:" + r, "related");
    }));
    if (showCourses) {
      allCourses().forEach((c) => {
        const dom = courseDomainId(c);
        add({ id: "k:" + c.id, type: "course", label: c.title, domain: dom, ref: c, r: 7 });
        c.covers.forEach((cid) => link("k:" + c.id, "c:" + cid, "covers"));
      });
    }
    nodeById = byId(nodes);
    links = links.filter((l) => nodeById[l.s] && nodeById[l.t]);
    links.forEach((l) => { l.source = nodeById[l.s]; l.target = nodeById[l.t]; });
    neighbors = {};
    nodes.forEach((n) => (neighbors[n.id] = new Set([n.id])));
    links.forEach((l) => { neighbors[l.s].add(l.t); neighbors[l.t].add(l.s); });
    // place new course nodes near the concepts they cover
    nodes.forEach((n) => {
      if (n.type !== "course" || posCache[n.id]) return;
      const ns = [...neighbors[n.id]].filter((id) => id !== n.id).map((id) => nodeById[id]);
      if (ns.length) {
        n.x = ns.reduce((a, b) => a + b.x, 0) / ns.length + (Math.random() - 0.5) * 40;
        n.y = ns.reduce((a, b) => a + b.y, 0) / ns.length + (Math.random() - 0.5) * 40;
      }
    });
  }

  // ───────────────────────── force simulation (no dependencies) ─────────────────────────
  const CHARGE = { domain: -2200, topic: -800, concept: -300, course: -140 };
  const LINK = {
    tree: { dist: 70, k: 0.6 }, "tree-direct": { dist: 105, k: 0.5 },
    related: { dist: 150, k: 0.05 }, covers: { dist: 70, k: 0.12 }
  };
  let alpha = 1, rafId = 0;

  function tick() {
    const n = nodes.length;
    // topic → domain link is longer
    for (const l of links) {
      const cfg = LINK[l.type];
      const dist = l.source.type === "domain" && l.target.type === "topic" ? 140 : cfg.dist;
      const dx = l.target.x - l.source.x, dy = l.target.y - l.source.y;
      const len = Math.hypot(dx, dy) || 1;
      const f = ((len - dist) / len) * alpha * cfg.k;
      l.target.vx -= dx * f * 0.5; l.target.vy -= dy * f * 0.5;
      l.source.vx += dx * f * 0.5; l.source.vy += dy * f * 0.5;
    }
    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d2 = 1; }
        if (d2 > 1000000) continue; // ignore beyond 1000px
        const fa = (CHARGE[b.type] * alpha) / d2, fb = (CHARGE[a.type] * alpha) / d2;
        a.vx += dx * fa; a.vy += dy * fa;
        b.vx -= dx * fb; b.vy -= dy * fb;
        // collision
        const min = a.r + b.r + 30, d = Math.sqrt(d2);
        if (d < min) {
          const push = ((min - d) / d) * 0.5;
          a.x -= dx * push; a.y -= dy * push; b.x += dx * push; b.y += dy * push;
        }
      }
    }
    for (const node of nodes) {
      const anc = domainById[node.domain].anchor;
      const k = node.type === "domain" ? 0.12 : 0.012;
      node.vx += (anc[0] - node.x) * k * alpha;
      node.vy += (anc[1] - node.y) * k * alpha;
      if (node.fx != null) { node.x = node.fx; node.y = node.fy; node.vx = node.vy = 0; continue; }
      node.vx *= 0.6; node.vy *= 0.6;
      node.x += node.vx; node.y += node.vy;
    }
    alpha += (0 - alpha) * 0.025;
  }

  function settle(steps) { for (let i = 0; i < steps; i++) tick(); }
  function reheat(a = 0.3) {
    alpha = Math.max(alpha, a);
    if (!rafId) rafId = requestAnimationFrame(loop);
  }
  function loop() {
    tick(); positionAll();
    rafId = alpha > 0.004 ? requestAnimationFrame(loop) : 0;
  }

  // ───────────────────────── rendering ─────────────────────────
  const svg = $("graph"), viewport = $("viewport"), linksG = $("links"), nodesG = $("nodes");
  let selectedId = null, hoverId = null;

  function renderGraph() {
    linksG.textContent = ""; nodesG.textContent = "";
    for (const l of links) {
      l.el = s("line", { class: "link " + l.type });
      if (l.type === "covers") l.el.style.stroke = domainById[l.source.domain].color;
      linksG.append(l.el);
    }
    const order = { course: 0, concept: 1, topic: 2, domain: 3 };
    [...nodes].sort((a, b) => order[a.type] - order[b.type]).forEach((n) => {
      n.el = s("g", { class: "node " + n.type, tabindex: 0, role: "button", "aria-label": n.label, "data-id": n.id });
      n.el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(n.id); } });
      n.el.addEventListener("pointerenter", () => { hoverId = n.id; applyFocus(); });
      n.el.addEventListener("pointerleave", () => { hoverId = null; applyFocus(); });
      drawNode(n);
      nodesG.append(n.el);
    });
    positionAll(); applyFocus();
  }

  function drawNode(n) {
    const g = n.el; g.textContent = "";
    const color = domainById[n.domain].color;
    if (n.type === "domain") {
      // inner ring = breadth (≥ Aware), outer ring = depth (≥ Apply)
      const p = domainProgress(n.domain);
      const ring = (R, frac, opacity) => {
        const C = 2 * Math.PI * R;
        g.append(s("circle", { r: R, fill: "none", stroke: "var(--border)", "stroke-width": 5 }));
        g.append(s("circle", { r: R, fill: "none", stroke: color, "stroke-opacity": opacity, "stroke-width": 5, "stroke-linecap": "round",
          "stroke-dasharray": `${frac * C} ${C}`, transform: "rotate(-90)" }));
      };
      ring(n.r + 7, p.breadth, 0.45); ring(n.r + 14, p.depth, 1);
      g.append(s("circle", { class: "shape", r: n.r, fill: color, stroke: color, "stroke-width": 2 }));
      const pct = s("text", { "text-anchor": "middle", dy: 5, style: "fill:#fff;stroke:none;font-size:13px;font-weight:700" });
      pct.textContent = Math.round(p.breadth * 100) + "%";
      g.append(pct);
      g.append(label((n.ref.custom ? "★ " : "") + n.label, { "text-anchor": "middle", y: n.r + 34 }));
      g.append(label(`${Math.round(p.breadth * 100)}% wide · ${Math.round(p.depth * 100)}% deep`, { "text-anchor": "middle", y: n.r + 50, class: "sub" }));
    } else if (n.type === "topic") {
      g.append(s("circle", { class: "shape", r: n.r, style: "fill:var(--surface)", stroke: color, "stroke-width": 3, "stroke-dasharray": n.ref.custom ? "4 3" : null }));
      g.append(label(n.label, { "text-anchor": "middle", y: n.r + 16 }));
    } else if (n.type === "concept") {
      const lv = levelOf(n.ref.id);
      if (lv >= 3) g.append(s("circle", { r: n.r + 6, fill: color, "fill-opacity": 0.22 }));
      if (lv === 4) g.append(s("circle", { r: n.r + 9, fill: "none", stroke: color, "stroke-width": 1.5 }));
      g.append(s("circle", { r: n.r, style: "fill:var(--surface)" }));
      g.append(s("circle", { class: "shape", r: n.r, stroke: color, "stroke-width": 2.2, "stroke-dasharray": n.ref.custom && lv < 3 ? "3 2" : null,
        fill: color, "fill-opacity": LEVEL_FILL[lv] }));
      g.append(label(n.label, { x: n.r + 5, y: 4 }));
    } else {
      const done = n.ref.status === "completed";
      g.append(s("rect", { class: "shape", x: -n.r, y: -n.r, width: n.r * 2, height: n.r * 2, rx: 2, transform: "rotate(45)",
        stroke: color, "stroke-width": 2, "stroke-dasharray": n.ref.mine ? "3 2" : null,
        style: done ? `fill:${color}` : "fill:var(--surface)" }));
      g.append(label((n.ref.mine ? "★ " : "") + n.label, { x: n.r + 5, y: 4 }));
    }
    const title = s("title"); title.textContent = n.label; g.append(title);
  }
  function label(text, attrs) { const t = s("text", attrs); t.textContent = text; return t; }

  function positionAll() {
    for (const l of links) {
      l.el.setAttribute("x1", l.source.x); l.el.setAttribute("y1", l.source.y);
      l.el.setAttribute("x2", l.target.x); l.el.setAttribute("y2", l.target.y);
    }
    for (const n of nodes) n.el.setAttribute("transform", `translate(${n.x},${n.y})`);
  }

  function applyFocus() {
    const f = hoverId || selectedId;
    const near = f ? neighbors[f] : null;
    for (const n of nodes) {
      n.el.classList.toggle("dim", !!near && !near.has(n.id));
      n.el.classList.toggle("selected", n.id === selectedId);
      if (n.type === "course") n.el.classList.toggle("show-label", !!near && near.has(n.id));
    }
    for (const l of links) l.el.classList.toggle("dim", !!f && l.s !== f && l.t !== f);
  }

  // ───────────────────────── pan / zoom / drag ─────────────────────────
  const view = { x: 0, y: 0, k: 1 };
  const applyView = () => { viewport.setAttribute("transform", `translate(${view.x},${view.y}) scale(${view.k})`); updateZoomButtons(); };
  const toWorld = (sx, sy) => ({ x: (sx - view.x) / view.k, y: (sy - view.y) / view.k });
  const MIN_K = 0.08, MAX_K = 4;
  const clampK = (k) => Math.min(MAX_K, Math.max(MIN_K, k));

  function zoomAt(sx, sy, k2) {
    k2 = clampK(k2);
    view.x = sx - (sx - view.x) * (k2 / view.k);
    view.y = sy - (sy - view.y) * (k2 / view.k);
    view.k = k2; applyView();
  }
  const updateZoomButtons = () => {
    const zi = $("zoom-in"), zo = $("zoom-out");
    if (zi) zi.disabled = view.k >= MAX_K - 1e-6;
    if (zo) zo.disabled = view.k <= MIN_K + 1e-6;
  };

  function fit() {
    const r = svg.getBoundingClientRect();
    if (!r.width || !nodes.length) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    nodes.forEach((n) => { x0 = Math.min(x0, n.x); y0 = Math.min(y0, n.y); x1 = Math.max(x1, n.x + 90); y1 = Math.max(y1, n.y); });
    const padTop = 64, pad = 40;
    const k = clampK(Math.min((r.width - pad * 2) / (x1 - x0 || 1), (r.height - padTop - pad - 30) / (y1 - y0 || 1)));
    view.k = k;
    view.x = r.width / 2 - ((x0 + x1) / 2) * k;
    view.y = padTop + (r.height - padTop - 30) / 2 - ((y0 + y1) / 2) * k;
    applyView();
  }

  function centerOn(n) {
    const r = svg.getBoundingClientRect();
    const tx = r.width / 2 - n.x * view.k, ty = r.height / 2 - n.y * view.k;
    const sx = view.x, sy = view.y, t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 350), e = 1 - Math.pow(1 - p, 3);
      view.x = sx + (tx - sx) * e; view.y = sy + (ty - sy) * e; applyView();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const pointers = new Map();
  let drag = null; // {mode:'node'|'pan'|'pinch', node, start, moved, ...}
  // Trackpad-friendly controls (macOS style):
  //   pinch (Chrome/Firefox send wheel + ctrlKey) or ⌘/Ctrl + scroll → zoom
  //   two-finger scroll → pan
  //   a classic mouse wheel (big, line-based or integer notches) → zoom
  const isMouseWheel = (e) =>
    e.deltaMode !== 0 || (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 100 && Math.abs(e.deltaY) % 50 === 0);
  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = svg.getBoundingClientRect();
    const sx = e.clientX - r.left, sy = e.clientY - r.top;
    if (e.ctrlKey || e.metaKey) {
      // pinch deltas are small and smooth; clamp so one gesture never jumps too far
      const d = Math.max(-50, Math.min(50, e.deltaY));
      zoomAt(sx, sy, view.k * Math.exp(-d * 0.012));
    } else if (isMouseWheel(e)) {
      const lines = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      zoomAt(sx, sy, view.k * Math.exp(-lines * 0.0015));
    } else {
      view.x -= e.deltaX; view.y -= e.deltaY; applyView();
    }
  }, { passive: false });

  // Safari reports trackpad pinches as gesture events instead of ctrl+wheel
  let gestureStartK = 1;
  svg.addEventListener("gesturestart", (e) => { e.preventDefault(); gestureStartK = view.k; });
  svg.addEventListener("gesturechange", (e) => {
    e.preventDefault();
    const r = svg.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, gestureStartK * e.scale);
  });
  svg.addEventListener("gestureend", (e) => e.preventDefault());

  // zoom buttons and keyboard shortcuts (+ / − / 0)
  // animated zoom around the centre so each button press is clearly visible
  let zoomAnim = 0, zoomTarget = null;
  function zoomCenter(factor) {
    const r = svg.getBoundingClientRect();
    const cx = r.width / 2, cy = r.height / 2;
    zoomTarget = clampK((zoomTarget ?? view.k) * factor);
    const from = view.k, to = zoomTarget, t0 = performance.now();
    cancelAnimationFrame(zoomAnim);
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 180), e = 1 - Math.pow(1 - p, 3);
      zoomAt(cx, cy, from * Math.pow(to / from, e));
      if (p < 1) zoomAnim = requestAnimationFrame(step); else zoomTarget = null;
    };
    zoomAnim = requestAnimationFrame(step);
  }
  $("zoom-in").addEventListener("click", () => zoomCenter(1.25));
  $("zoom-out").addEventListener("click", () => zoomCenter(0.8));
  document.addEventListener("keydown", (e) => {
    if (!$("view-graph").classList.contains("active") || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === "+" || e.key === "=") zoomCenter(1.25);
    else if (e.key === "-" || e.key === "_") zoomCenter(0.8);
    else if (e.key === "0") fit();
  });

  svg.addEventListener("pointerdown", (e) => {
    svg.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = svg.getBoundingClientRect();
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      drag = { mode: "pinch", dist: Math.hypot(a.x - b.x, a.y - b.y), k: view.k, moved: 99,
        cx: (a.x + b.x) / 2 - r.left, cy: (a.y + b.y) / 2 - r.top };
      return;
    }
    const g = e.target.closest(".node");
    if (g) {
      const n = nodeById[g.dataset.id];
      drag = { mode: "node", node: n, sx: e.clientX, sy: e.clientY, moved: 0 };
    } else {
      drag = { mode: "pan", sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, moved: 0 };
      svg.classList.add("panning");
    }
  });
  svg.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!drag) return;
    const r = svg.getBoundingClientRect();
    if (drag.mode === "pinch" && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      zoomAt(drag.cx, drag.cy, drag.k * (Math.hypot(a.x - b.x, a.y - b.y) / drag.dist));
      return;
    }
    drag.moved = Math.max(drag.moved, Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy));
    if (drag.mode === "pan") {
      view.x = drag.vx + (e.clientX - drag.sx); view.y = drag.vy + (e.clientY - drag.sy); applyView();
    } else if (drag.mode === "node" && drag.moved > 3) {
      const w = toWorld(e.clientX - r.left, e.clientY - r.top);
      drag.node.fx = w.x; drag.node.fy = w.y; reheat(0.25);
    }
  });
  const endPointer = (e) => {
    pointers.delete(e.pointerId);
    svg.classList.remove("panning");
    if (!drag) return;
    if (drag.mode === "node") {
      drag.node.fx = drag.node.fy = null;
      if (drag.moved <= 3) select(drag.node.id);
    } else if (drag.mode === "pan" && drag.moved <= 3) select(null);
    if (pointers.size === 0) drag = null;
  };
  svg.addEventListener("pointerup", endPointer);
  svg.addEventListener("pointercancel", endPointer);

  function select(id, { center = false } = {}) {
    selectedId = id && nodeById[id] ? id : null;
    applyFocus(); renderPanel();
    if (center && selectedId) centerOn(nodeById[selectedId]);
  }
  function goToConcept(conceptId) {
    switchView("graph");
    select("c:" + conceptId, { center: true });
  }

  // ───────────────────────── side panel ─────────────────────────
  const panelEl = $("panel-body");

  function conceptChip(id) {
    const c = conceptById[id]; if (!c) return null;
    const color = domainById[conceptDomain(c)].color;
    const lv = levelOf(id);
    return h("button", { class: "chip", onclick: () => goToConcept(id), title: (lv ? LEVEL_NAMES[lv] + " · " : "") + c.definition },
      h("span", { class: "dot", style: `background:${color};opacity:${lv ? 1 : 0.35}` }), c.label,
      lv ? h("span", { class: "lv", style: `--c:${color}`, text: "L" + lv }) : null);
  }
  function domainChip(id) {
    const d = domainById[id];
    return h("button", { class: "chip", onclick: () => select("d:" + id, { center: true }) },
      h("span", { class: "dot", style: `background:${d.color}` }), d.name);
  }
  function statusSelect(course) {
    const sel = h("select", { "aria-label": "Status for " + course.title, onchange: (e) => setCourseStatus(course, e.target.value) });
    const opts = course.mine ? ["planned", "in-progress", "completed"] : ["none", "planned", "in-progress", "completed"];
    opts.forEach((o) => sel.append(h("option", { value: o, selected: o === course.status, text: STATUS_LABEL[o] })));
    return sel;
  }
  function courseCard(c, { openModules = false } = {}) {
    return h("div", { class: "course-card" },
      h("a", { href: safeUrl(c.url), target: "_blank", rel: "noopener noreferrer" }, c.title + " ↗"),
      c.mine ? h("span", { class: "mine", text: "MINE" }) : null,
      h("div", { class: "meta", text: [c.provider, c.cost, c.level].filter(Boolean).join(" · ") }),
      statusSelect(c),
      c.modules && c.modules.length ? moduleList(c, openModules) : null);
  }
  function moduleList(c, open) {
    const done = c.modules.filter((m) => m.done).length;
    const det = h("details", { class: "modules", open: open || null },
      h("summary", null, h("span", { text: `${done} / ${c.modules.length} weeks done` }),
        h("span", { class: "progress mini" }, h("div", { style: `width:${(done / c.modules.length) * 100}%;background:${domainById[courseDomainId(c)].color}` }))));
    c.modules.forEach((m) => det.append(h("label", { class: "module" + (m.done ? " done" : "") },
      h("input", { type: "checkbox", checked: m.done || null, onchange: (e) => setModuleDone(c.id, m.id, e.target.checked) }),
      h("a", { href: safeUrl(m.url), target: "_blank", rel: "noopener noreferrer", text: m.title }),
      h("span", { class: "module-skills", text: m.covers.map((id) => conceptById[id]?.label).filter(Boolean).join(", ") }))));
    return det;
  }
  const sortCourses = (cs) => cs.sort((a, b) =>
    (b.mine - a.mine) || ((LEVELS[a.level] ?? 3) - (LEVELS[b.level] ?? 3)));
  function progressBar(p, color) {
    return h("div", null,
      h("div", { class: "progress" }, h("div", { style: `width:${p.frac * 100}%;background:${color}` })),
      h("div", { class: "meta", style: "font-size:12px;color:var(--muted);margin-top:4px", text: `${p.done} of ${p.total} concepts learned` }));
  }
  const section = (title, ...kids) => h("section", null, h("h4", { text: title }), ...kids);

  function renderPanel() {
    panelEl.textContent = "";
    const panelBody = { append: (...k) => panelEl.append(...k.filter((x) => x != null && x !== false)) };
    const n = selectedId && nodeById[selectedId];
    if (!n) return panelBody.append(renderIntro());
    const color = domainById[n.domain].color;
    const head = h("div", { class: "badge", style: `background:${color}22;color:${color}`, text: n.type === "course" ? "Course" : n.type[0].toUpperCase() + n.type.slice(1) });

    if (n.type === "domain") {
      const d = n.ref;
      const courses = sortCourses(allCourses().filter((c) => courseDomainId(c) === d.id));
      const topics = D.topics.filter((t) => t.domain === d.id);
      const direct = D.concepts.filter((c) => c.domain === d.id);
      panelBody.append(head, h("h3", { text: d.name }), h("p", { class: "def", text: d.summary }),
        (() => { const p = domainProgress(d.id); return h("p", { class: "meta", text: `${Math.round(p.breadth * 100)}% wide (Aware+) · ${Math.round(p.depth * 100)}% deep (Apply+) · ${p.total} concepts` }); })(),
        ...topics.map((t) => section(t.name, ...D.concepts.filter((c) => c.topic === t.id).map((c) => conceptChip(c.id)))),
        direct.length ? section("Concepts", ...direct.map((c) => conceptChip(c.id))) : null,
        section("Learning path: best courses", ...courses.map(courseCard)));
    } else if (n.type === "topic") {
      const t = n.ref, cs = D.concepts.filter((c) => c.topic === t.id);
      const courses = sortCourses(allCourses().filter((c) => c.covers.some((id) => cs.find((x) => x.id === id))));
      panelBody.append(head, h("h3", { text: t.name }), domainChip(t.domain),
        section("Terminology", ...cs.map((c) => conceptChip(c.id))),
        section("Courses for this topic", ...courses.map(courseCard)));
    } else if (n.type === "concept") {
      const c = n.ref;
      const rel = [...neighbors[n.id]].filter((id) => id.startsWith("c:") && id !== n.id).map((id) => id.slice(2));
      const courses = sortCourses(allCourses().filter((k) => k.covers.includes(c.id)));
      panelBody.append(head, h("h3", { text: c.label }),
        h("div", null, domainChip(conceptDomain(c)), c.topic ? h("span", { class: "chip", style: "cursor:default", text: topicById[c.topic].name }) : null),
        h("p", { class: "def", text: c.definition || "No definition yet. Add one under “Your addition” below." }),
        levelPicker(c, color),
        rel.length ? section("Connected concepts", ...rel.map(conceptChip)) : null,
        section("Best courses for this", ...(courses.length ? courses.map(courseCard) : [h("p", { class: "empty", text: "No course yet. Add one in My learning log." })])));
    } else {
      const c = n.ref;
      panelBody.append(head, h("h3", { text: c.title }),
        h("div", { class: "course-card" },
          h("a", { href: safeUrl(c.url), target: "_blank", rel: "noopener noreferrer" }, "Open course ↗"),
          h("div", { class: "meta", text: [c.provider, c.cost, c.level].filter(Boolean).join(" · ") }),
          statusSelect(c),
          c.modules && c.modules.length ? moduleList(c, true) : null),
        c.notes ? section("My notes", h("p", { class: "def", style: "white-space:pre-wrap", text: c.notes })) : null,
        section("Skills this course gives you", ...c.covers.map(conceptChip)),
        c.mine ? h("button", { class: "btn small", onclick: () => { switchView("log"); startEdit(c.logId); }, text: "Edit in learning log" }) : null);
    }
    if (n.ref.custom) panelBody.append(customControls(n));
  }

  function levelPicker(c, color) {
    const lv = levelOf(c.id), derived = derivedLevel(c.id), via = learnedVia(c.id);
    const box = h("section", { class: "level-box" }, h("h4", { text: "Your level" }));
    const row = h("div", { class: "levels", role: "group", "aria-label": "Your level for " + c.label });
    LEVEL_NAMES.forEach((name, i) => {
      const locked = i < derived;
      row.append(h("button", {
        class: "lvl" + (i === lv ? " on" : "") + (i > 0 && i <= lv ? " filled" : ""), style: `--c:${color}`,
        "aria-pressed": i === lv, disabled: locked || null, title: locked ? `Already ${LEVEL_NAMES[derived]} from your courses/projects` : LEVEL_HELP[i],
        onclick: () => { if (i === 0) delete levels[c.id]; else levels[c.id] = i; save(); refreshAll(); }
      }, i === 0 ? "–" : h("span", null, h("b", { text: String(i) }), " " + name)));
    });
    box.append(row, h("p", { class: "lvl-help", text: LEVEL_HELP[lv] }));
    if (derived) box.append(h("p", { class: "meta lvl-via", text: `${LEVEL_NAMES[derived]} from: ` + via.map((v) => v.title).join(", ") }));
    if (NEXT_STEP[lv]) box.append(h("p", { class: "lvl-next", text: "Next: " + NEXT_STEP[lv] }));
    return box;
  }

  function customControls(n) {
    const kind = n.type, ref = n.ref;
    const what = { domain: "domain", topic: "topic", concept: "concept" }[kind];
    const box = section("Your addition",
      h("p", { class: "custom-note", text: "★ You added this" + (ref.source ? ` from “${ref.source}”` : "") + ". It's saved in this browser; use Export JSON to back it up or make it permanent." }));
    const nameInput = h("input", { type: "text", value: kind === "concept" ? ref.label : ref.name, "aria-label": "Name" });
    const defInput = h("textarea", { rows: 3, placeholder: "Definition, in your own words…", "aria-label": "Definition" });
    defInput.value = kind === "concept" ? ref.definition : (ref.summary || "");
    box.append(h("div", { class: "custom-edit" }, nameInput, kind === "topic" ? null : defInput,
      h("div", { class: "row" },
        h("button", { class: "btn small", text: "Save", onclick: () => {
          const name = nameInput.value.trim(); if (!name) return;
          if (kind === "concept") { ref.label = name; ref.definition = defInput.value.trim(); }
          else { ref.name = name; if (kind === "domain") ref.summary = defInput.value.trim(); }
          n.label = name; afterCustomChange();
        } }),
        h("button", { class: "btn small danger", text: "Remove " + what, onclick: () => {
          const extra = kind === "concept" ? "" : ` and everything inside it`;
          if (confirm(`Remove “${n.label}”${extra} from your map?`)) removeCustom(kind, ref.id);
        } }))));
    return box;
  }

  // ── "Next up": go deeper in your focus track, wider everywhere else
  let shuffleSeed = 0;
  const hashStr = (t) => { let x = 2166136261; for (const ch of t) x = Math.imul(x ^ ch.charCodeAt(0), 16777619); return (x >>> 0) / 4294967295; };
  function inFocus(c) {
    if (!focus) return false;
    const [k, id] = focus.split(":");
    return k === "t" ? c.topic === id : conceptDomain(c) === id;
  }
  function nextUp() {
    const rnd = (id) => hashStr(id + ":" + shuffleSeed);
    const deepen = D.concepts.filter((c) => inFocus(c) && levelOf(c.id) < 3)
      .sort((a, b) => (levelOf(b.id) - levelOf(a.id)) || (rnd(a.id) - rnd(b.id))).slice(0, 2);
    const known = (id) => levelOf(id) >= 1;
    const frontier = (c) => [...(neighbors["c:" + c.id] || [])].filter((nid) => nid.startsWith("c:") && known(nid.slice(2))).length;
    const pool = D.concepts.filter((c) => !inFocus(c) && levelOf(c.id) === 0)
      .sort((a, b) => (Math.min(frontier(b), 2) - Math.min(frontier(a), 2)) || (rnd(a.id) - rnd(b.id)));
    const broaden = [];
    for (const c of pool) {
      if (broaden.length === 2) break;
      if (!broaden.some((x) => conceptDomain(x) === conceptDomain(c))) broaden.push(c);
    }
    return { deepen, broaden };
  }
  function suggestionCard(c, kind) {
    const lv = levelOf(c.id), color = domainById[conceptDomain(c)].color;
    const course = sortCourses(allCourses().filter((k) => k.covers.includes(c.id) && k.status !== "completed"))[0];
    return h("div", { class: "suggest" },
      h("div", { class: "suggest-top" }, h("span", { class: "suggest-kind " + kind, text: kind === "deepen" ? "Go deeper" : "Go wider" }), conceptChip(c.id)),
      h("p", { class: "meta", text: kind === "deepen" ? NEXT_STEP[lv] : NEXT_STEP[0] }),
      course && (kind === "deepen" ? lv >= 1 : true) && lv < 2
        ? h("a", { class: "suggest-link", href: safeUrl(course.url), target: "_blank", rel: "noopener noreferrer", text: course.title + " ↗" }) : null);
  }
  function focusSelect() {
    const sel = h("select", { "aria-label": "Focus track", onchange: (e) => { focus = e.target.value; save(); refreshAll(); } });
    D.domains.forEach((d) => {
      const g = h("optgroup", { label: d.name });
      g.append(h("option", { value: "d:" + d.id, text: `All of ${d.name}` }));
      D.topics.filter((t) => t.domain === d.id).forEach((t) => g.append(h("option", { value: "t:" + t.id, text: t.name })));
      sel.append(g);
    });
    sel.value = focus;
    return sel;
  }
  function renderIntro() {
    const active = allCourses().filter((c) => c.status === "in-progress");
    const { deepen, broaden } = nextUp();
    const byLevel = [4, 3, 2, 1].map((l) => [l, D.concepts.filter((c) => levelOf(c.id) === l)]);
    const bar = (frac, color, opacity, text) => h("div", { class: "bd-row" },
      h("span", { class: "bd-label", text }),
      h("div", { class: "progress" }, h("div", { style: `width:${frac * 100}%;background:${color};opacity:${opacity}` })),
      h("span", { class: "bd-pct", text: Math.round(frac * 100) + "%" }));
    return h("div", { class: "panel-intro" },
      h("h3", { text: "Your skill map" }),
      h("p", { text: "Aim for T-shaped skills: wide across the map (Aware of many concepts) and deep in one or two focus areas (able to Apply them). Courses lift concepts to Understand; your own projects lift them to Apply." }),
      section("Focus track (where to go deep)", focusSelect()),
      section("Next up",
        ...deepen.map((c) => suggestionCard(c, "deepen")),
        ...broaden.map((c) => suggestionCard(c, "broaden")),
        !deepen.length && !broaden.length ? h("p", { class: "empty", text: "Nothing to suggest. Pick a different focus track." }) : null,
        h("button", { class: "btn small", text: "↻ Other suggestions", onclick: () => { shuffleSeed++; renderPanel(); } })),
      section("Breadth & depth",
        ...D.domains.map((d) => { const p = domainProgress(d.id); return h("div", { class: "bd" },
          h("div", { class: "bd-name", style: `color:${d.color}`, text: d.name }),
          bar(p.breadth, d.color, 0.45, "Wide"), bar(p.depth, d.color, 1, "Deep")); })),
      section("Skills by level",
        ...byLevel.map(([l, cs]) => h("div", { class: "by-level" },
          h("div", { class: "by-level-head" }, h("b", { text: `L${l} ${LEVEL_NAMES[l]}` }), h("span", { class: "meta", text: ` · ${cs.length}` })),
          cs.length ? h("div", null, ...cs.map((c) => conceptChip(c.id))) : null))),
      active.length ? section("In progress", ...active.map((c) => courseCard(c))) : null);
  }

  // ───────────────────────── header stats ─────────────────────────
  function renderStats() {
    const box = $("stats"); box.textContent = "";
    D.domains.forEach((d) => {
      const p = domainProgress(d.id);
      const ring = s("svg", { width: 26, height: 26, viewBox: "0 0 26 26", "aria-hidden": "true" });
      [[6, p.breadth, 0.45], [10.5, p.depth, 1]].forEach(([R, frac, op]) => {
        const C = 2 * Math.PI * R;
        ring.append(s("circle", { cx: 13, cy: 13, r: R, fill: "none", stroke: "var(--border)", "stroke-width": 3 }));
        ring.append(s("circle", { cx: 13, cy: 13, r: R, fill: "none", stroke: d.color, "stroke-opacity": op, "stroke-width": 3,
          "stroke-dasharray": `${frac * C} ${C}`, transform: "rotate(-90 13 13)", "stroke-linecap": "round" }));
      });
      const b = Math.round(p.breadth * 100), dp = Math.round(p.depth * 100);
      box.append(h("button", { class: "stat", title: `${d.name}: ${b}% of concepts at Aware or above (wide), ${dp}% at Apply or above (deep)`,
        onclick: () => { switchView("graph"); select("d:" + d.id, { center: true }); } },
        ring, h("span", null, d.name + " "), h("b", { text: `${b}%` }), h("span", { class: "stat-sub", text: " wide · " }), h("b", { text: `${dp}%` }), h("span", { class: "stat-sub", text: " deep" })));
    });
    $("log-count").textContent = log.length;
  }

  function refreshAll() {
    nodes.forEach(drawNode); applyFocus(); renderStats(); renderPanel(); renderLog();
    if (typeof renderKnownMatch === "function" && $("f-url")) renderKnownMatch();
  }
  function rebuild() {
    buildGraph(); renderGraph(); settle(60); reheat(0.4); refreshAll();
  }

  // ───────────────────────── toolbar ─────────────────────────
  const dl = $("concept-list");
  function refreshDatalist() {
    dl.textContent = "";
    D.concepts.forEach((c) => dl.append(h("option", { value: c.label })));
  }
  refreshDatalist();
  $("search").addEventListener("change", (e) => {
    const q = e.target.value.trim().toLowerCase(); if (!q) return;
    const c = D.concepts.find((x) => x.label.toLowerCase() === q) || D.concepts.find((x) => x.label.toLowerCase().includes(q));
    if (c && selectedId !== "c:" + c.id) goToConcept(c.id);
  });
  $("show-courses").addEventListener("change", (e) => { showCourses = e.target.checked; rebuild(); settle(200); positionAll(); fit(); });
  $("fit").addEventListener("click", fit);

  // ───────────────────────── tabs ─────────────────────────
  function switchView(name) {
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.view === name;
      t.classList.toggle("active", on); t.setAttribute("aria-selected", on);
    });
    document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + name));
    document.body.dataset.view = name; store.set(KEYS.tab, name);
    if (name === "graph" && view.k === 1 && view.x === 0) requestAnimationFrame(fit);
  }
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => switchView(t.dataset.view)));

  // ───────────────────────── learning log ─────────────────────────
  const form = $("log-form");
  const f = {
    url: $("f-url"), title: $("f-title"), provider: $("f-provider"), domain: $("f-domain"), status: $("f-status"), kind: $("f-kind"),
    start: $("f-start"), end: $("f-end"), notes: $("f-notes"), filter: $("f-concept-filter"), concepts: $("f-concepts"),
    curriculum: $("f-curriculum"), coverage: $("f-coverage")
  };
  let formConcepts = new Set(), conceptsTouched = false, autoTitle = "", editingId = null;

  function refreshDomainOptions() {
    const keep = f.domain.value;
    f.domain.textContent = "";
    D.domains.forEach((d) => f.domain.append(h("option", { value: d.id, text: d.name })));
    if (domainById[keep]) f.domain.value = keep;
  }
  refreshDomainOptions();

  const PROVIDERS = {
    "udemy.com": "Udemy", "coursera.org": "Coursera", "edx.org": "edX", "youtube.com": "YouTube", "youtu.be": "YouTube",
    "linkedin.com": "LinkedIn Learning", "datacamp.com": "DataCamp", "khanacademy.org": "Khan Academy", "kaggle.com": "Kaggle",
    "pluralsight.com": "Pluralsight", "udacity.com": "Udacity", "deeplearning.ai": "DeepLearning.AI", "skillshare.com": "Skillshare",
    "github.com": "GitHub", "ocw.mit.edu": "MIT OpenCourseWare", "cs50.harvard.edu": "Harvard CS50", "freecodecamp.org": "freeCodeCamp"
  };
  const ACRONYMS = new Set(["fde", "mcp", "rag", "llmops", "ai", "ml", "llm", "llms", "nlp", "sql", "aws", "gpt", "api", "cfa", "frm", "etf", "dcf", "esg", "ui", "ux", "r", "2024", "2025", "2026"]);
  function parseLink(raw) {
    let u; try { u = new URL(raw.trim()); } catch { return null; }
    const host = u.hostname.replace(/^www\./, "");
    const provider = Object.entries(PROVIDERS).find(([k]) => host === k || host.endsWith("." + k))?.[1] || host;
    const parts = u.pathname.split("/").filter(Boolean);
    const markers = ["course", "learn", "specializations", "professional-certificates", "courses", "projects"];
    const i = parts.findIndex((p) => markers.includes(p));
    let slug = i >= 0 && parts[i + 1] ? parts[i + 1] : parts[parts.length - 1] || "";
    if (/^\d+$/.test(slug) && parts.length > 1) slug = parts.slice(-2).join("-").replace(/s-(\d+)$/, "-$1");
    slug = decodeURIComponent(slug).replace(/\.[a-z0-9]+$/i, "");
    const title = slug.split(/[-_+]+/).filter(Boolean)
      .map((w) => (ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(" ");
    return { provider, title };
  }

  // light keyword hints so a pasted course pre-selects likely concepts
  const KEYWORDS = {
    "machine learning": ["supervised", "regression", "classification", "overfitting"],
    "deep learning": ["neural-net", "backprop", "cnn"], "neural": ["neural-net", "backprop"],
    "llm": ["transformer", "prompting", "fine-tuning"], "chatgpt": ["prompting"], "generative": ["transformer", "prompting"],
    "prompt": ["prompting"], "rag": ["rag", "embedding"], "agent": ["agents"], "langchain": ["rag", "agents"],
    "nlp": ["tokenization", "transformer", "embedding"], "computer vision": ["cnn"], "pytorch": ["neural-net"], "tensorflow": ["neural-net"],
    "trading": ["algo-trading", "backtesting"], "algorithmic": ["algo-trading"], "quant": ["time-series", "volatility", "sharpe"],
    "valuation": ["dcf", "statements"], "financial modeling": ["dcf", "statements", "npv"], "accounting": ["statements"],
    "corporate finance": ["tvm", "npv", "dcf"], "investing": ["stocks", "diversification", "risk-return"], "stock": ["stocks"],
    "portfolio": ["diversification", "sharpe"], "options": ["derivatives"], "derivatives": ["derivatives"], "bond": ["bonds"],
    "risk": ["risk-return", "volatility"], "fraud": ["fraud-detection"], "credit": ["credit-scoring"], "fintech": ["robo-advisor"],
    "time series": ["time-series"], "forecast": ["time-series"],
    "agentic": ["agents", "agent-patterns"], "mcp": ["mcp"], "model context protocol": ["mcp"],
    "tool use": ["tool-use"], "tool calling": ["tool-use"], "function calling": ["tool-use"], "tools": ["tool-use"],
    "react agent": ["agent-patterns"], "react pattern": ["agent-patterns"], "reason and act": ["agent-patterns"], "reflection": ["agent-patterns"], "planning": ["agent-patterns"], "human-in-the-loop": ["agent-patterns"],
    "orchestrat": ["orchestration"], "workflow": ["orchestration"], "langgraph": ["orchestration", "agents"], "prompt chaining": ["orchestration"],
    "multi-agent": ["multi-agent"], "multi agent": ["multi-agent"], "crewai": ["multi-agent"], "autogen": ["multi-agent"],
    "context engineering": ["context-eng"], "context window": ["context-eng"], "memory": ["context-eng"],
    "vector": ["vector-db"], "pinecone": ["vector-db"], "chroma": ["vector-db"], "pgvector": ["vector-db"], "faiss": ["vector-db"],
    "retrieval": ["rag"], "eval": ["evals"], "llm-as-a-judge": ["evals"], "llm as a judge": ["evals"],
    "guardrail": ["guardrails"], "safety": ["guardrails"], "prompt injection": ["guardrails"],
    "observability": ["llmops"], "monitoring": ["llmops"], "tracing": ["llmops"], "llmops": ["llmops"], "deploy": ["llmops"],
    "architect": ["ai-architecture"], "system design": ["ai-architecture"], "forward deployed": ["fde"], "fde": ["fde"],
    "python": ["python"], "programming": ["python", "functions"], "object-oriented": ["oop"], "oop": ["oop"], "classes": ["oop"],
    "debug": ["debugging"], "async": ["async"], "concurren": ["async"], "big-o": ["big-o"], "big o": ["big-o"], "complexity": ["big-o"],
    "data structure": ["arrays-lists", "hash-maps", "trees-graphs"], "algorithm": ["sorting-searching", "big-o"], "leetcode": ["arrays-lists", "hash-maps", "big-o"],
    "array": ["arrays-lists"], "linked list": ["arrays-lists"], "hash": ["hash-maps"], "dictionar": ["hash-maps"], "tree": ["trees-graphs"], "graph": ["trees-graphs"],
    "recursi": ["recursion"], "sort": ["sorting-searching"], "binary search": ["sorting-searching"],
    "computer architecture": ["how-computers-work"], "cpu": ["how-computers-work"], "operating system": ["os-processes"], "process": ["os-processes"],
    "network": ["networking"], "http": ["networking"], "dns": ["networking"], "sql": ["databases"], "database": ["databases"], "postgres": ["databases"],
    "linux": ["cli"], "terminal": ["cli"], "command line": ["cli"], "bash": ["cli"], "shell": ["cli"], "git": ["git"], "github": ["git"],
    "api": ["apis"], "rest": ["apis"], "json": ["apis"], "unit test": ["testing"], "pytest": ["testing"], "system design": ["system-design", "ai-architecture"],
    "linear algebra": ["linear-algebra"], "matri": ["linear-algebra"], "vectors": ["linear-algebra"], "probability": ["probability-stats"], "statistic": ["probability-stats"],
    "calculus": ["calculus"], "derivative": ["calculus"], "discrete math": ["discrete-math"], "logic": ["discrete-math"],
    "consult": ["hypothesis-driven", "pyramid-principle", "stakeholder-mgmt"], "presentation": ["storyline", "slide-design", "exec-presence"],
    "storytelling": ["storyline", "data-storytelling"], "pyramid": ["pyramid-principle"], "minto": ["pyramid-principle"], "mece": ["mece"],
    "issue tree": ["issue-tree"], "hypothesis": ["hypothesis-driven"], "problem solving": ["issue-tree", "hypothesis-driven"], "80/20": ["prioritization"],
    "powerpoint": ["slide-design"], "slide": ["slide-design"], "public speaking": ["exec-presence"], "speaking": ["exec-presence"], "executive presence": ["exec-presence"],
    "communication": ["pyramid-principle", "exec-presence"], "interview": ["stakeholder-interviews"], "workshop": ["workshops"], "facilitat": ["workshops"],
    "stakeholder management": ["stakeholder-mgmt"], "proposal": ["proposals"], "scoping": ["proposals"], "use case": ["use-case-prioritization"],
    "business case": ["business-case"], "roi": ["business-case"], "change management": ["change-mgmt"], "adoption": ["change-mgmt"],
    "governance": ["ai-governance"], "responsible ai": ["ai-governance"], "ai strategy": ["use-case-prioritization", "business-case"], "for everyone": ["use-case-prioritization"],
    "customer discovery": ["fde"], "stakeholder": ["fde"], "fine-tun": ["fine-tuning"], "embedding": ["embedding"]
  };
  const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const KEYWORD_RES = Object.entries(KEYWORDS).map(([k, ids]) => [new RegExp("\\b" + escapeRe(k), "i"), ids]);
  function suggestConcepts(text) {
    const t = text.toLowerCase(), out = new Set();
    for (const [re, ids] of KEYWORD_RES) if (re.test(t)) ids.forEach((id) => conceptById[id] && out.add(id));
    D.concepts.forEach((c) => {
      const l = c.label.toLowerCase().replace(/\s*\(.*\)/, "");
      const abbr = (c.label.match(/\(([^)]+)\)/) || [])[1];
      if ((l.length > 3 && t.includes(l)) || (abbr && new RegExp("\\b" + escapeRe(abbr.toLowerCase()) + "\\b").test(t))) out.add(c.id);
    });
    return out;
  }
  function guessDomain(ids) {
    const count = {};
    ids.forEach((id) => { const d = conceptDomain(conceptById[id]); count[d] = (count[d] || 0) + 1; });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0];
  }
  function autoFill() {
    const p = parseLink(f.url.value); if (!p) return;
    if (!f.title.value || f.title.value === autoTitle) { f.title.value = p.title; autoTitle = p.title; }
    if (!f.provider.value || Object.values(PROVIDERS).includes(f.provider.value) || f.provider.dataset.auto) {
      f.provider.value = p.provider; f.provider.dataset.auto = "1";
    }
    autoConcepts();
  }
  function autoConcepts() {
    if (conceptsTouched || editingId) return;
    formConcepts = suggestConcepts(f.title.value + " " + f.url.value.replace(/^\s*https?:\/\/[^/]+/i, "").replace(/[-_/]+/g, " "));
    const d = guessDomain(formConcepts); if (d) f.domain.value = d;
    renderConceptPicker();
  }
  const normUrl = (u) => { try { const x = new URL(u.trim()); return (x.hostname.replace(/^www\./, "") + x.pathname).replace(/\/+$/, "").toLowerCase(); } catch { return ""; } };
  function findKnown(url) {
    const n = normUrl(url); if (!n) return null;
    for (const c of D.courses) {
      for (const m of c.modules || []) if (normUrl(m.url) === n) return { course: c, module: m };
      if (normUrl(c.url) === n) return { course: c };
    }
    return null;
  }
  function renderKnownMatch() {
    renderKnownInto($("f-match"), findKnown(f.url.value));
    if ($("q-url")) renderKnownInto($("q-known"), findKnown($("q-url").value));
  }
  function renderKnownInto(box, hit) {
    box.textContent = ""; box.hidden = !hit; if (!hit) return;
    const course = allCourses().find((c) => c.id === hit.course.id);
    if (hit.module) {
      const m = course.modules.find((x) => x.id === hit.module.id);
      box.append(
        h("p", null, h("strong", { text: `${m.title}` }), ` is part of ${course.title}, which is already on your map. Tick it off there instead of adding a separate course:`),
        h("div", { class: "row" },
          h("button", { type: "button", class: "btn small primary", text: m.done ? "✓ Done. Undo" : `Mark ${m.title.split(":")[0]} as done`, onclick: () => { setModuleDone(course.id, m.id, !m.done); renderKnownMatch(); } }),
          h("button", { type: "button", class: "btn small", text: "Show course on map", onclick: () => showCuratedCourse(course.id) })),
        m.covers.length ? h("p", { class: "meta", text: "Skills this week gives you: " + m.covers.map((id) => conceptById[id].label).join(", ") }) : null,
        h("p", { class: "meta", text: `${course.modules.filter((x) => x.done).length} of ${course.modules.length} weeks done.` }));
    } else {
      box.append(h("p", null, h("strong", { text: course.title }), ` is already on your map (${STATUS_LABEL[course.status].toLowerCase()}).`),
        h("div", { class: "row" },
          course.status !== "in-progress" ? h("button", { type: "button", class: "btn small primary", text: "Start learning", onclick: () => setCourseStatus(course, "in-progress") }) : null,
          course.status === "none" ? h("button", { type: "button", class: "btn small", text: "Save for later", onclick: () => setCourseStatus(course, "planned") }) : null,
          h("button", { type: "button", class: "btn small", text: "Show course on map", onclick: () => showCuratedCourse(course.id) })));
    }
  }
  function showCuratedCourse(id) {
    showCourses = true; $("show-courses").checked = true; rebuild(); switchView("graph");
    requestAnimationFrame(() => select("k:" + id, { center: true }));
  }
  f.url.addEventListener("input", renderKnownMatch);
  f.url.addEventListener("input", autoFill);
  f.title.addEventListener("input", autoConcepts);
  f.provider.addEventListener("input", () => delete f.provider.dataset.auto);
  f.filter.addEventListener("input", renderConceptPicker);
  f.domain.addEventListener("change", renderConceptPicker);

  function renderConceptPicker() {
    const q = f.filter.value.trim().toLowerCase(), dom = f.domain.value;
    f.concepts.textContent = "";
    [...D.concepts]
      .sort((a, b) => (conceptDomain(b) === dom) - (conceptDomain(a) === dom))
      .filter((c) => !q || c.label.toLowerCase().includes(q) || formConcepts.has(c.id))
      .forEach((c) => {
        const on = formConcepts.has(c.id);
        f.concepts.append(h("button", { type: "button", class: "chip" + (on ? " on" : ""), "aria-pressed": on, onclick: () => {
          conceptsTouched = true;
          on ? formConcepts.delete(c.id) : formConcepts.add(c.id);
          renderConceptPicker();
        } }, h("span", { class: "dot", style: `background:${domainById[conceptDomain(c)].color}` }), c.label));
      });
  }

  // ── Sync from curriculum: match pasted section/lecture titles to the map, offer to add what's missing
  const SKIP_LINE = /^(introduction|intro|welcome.*|about (this|the) (course|instructor)|conclusion|summary|recap|wrap[- ]?up|course (overview|introduction|summary|intro)|resources?|bonus.*|q ?& ?a|final (words|thoughts)|thank you.*|next steps|quiz.*|assignment.*|practice test.*|downloads?.*|course materials?|congratulations.*|preview|start)$/i;
  function cleanLine(l) {
    return l
      .replace(/^\s*(section|module|week|chapter|part|lecture|lesson|unit|day)\s*\d+\s*[:.\-–—]?\s*/i, "")
      .replace(/^\s*\d+(\.\d+)*[.)]?\s+/, "")
      .replace(/\b\d{1,2}:\d{2}(:\d{2})?\b/g, "")
      .replace(/\b\d+\s*\/\s*\d+\b/g, "")
      .replace(/\b\d+\s*(min|mins|hr|hrs|hour|hours|lectures?|sec)\b/gi, "")
      .replace(/\b(preview|play)\b/gi, "")
      .replace(/[|•·]+/g, " ")
      .replace(/\s{2,}/g, " ").replace(/^[\s:–—-]+|[\s:–—-]+$/g, "").trim();
  }
  const keepLine = (l) => l.length >= 4 && /[a-z]/i.test(l) && !SKIP_LINE.test(l);

  function checkCoverage() {
    const lines = f.curriculum.value.split(/\n+/).map(cleanLine).filter(keepLine);
    const matched = new Set(), missing = [], seen = new Set();
    lines.forEach((l) => {
      const ids = suggestConcepts(l);
      if (ids.size) ids.forEach((i) => matched.add(i));
      else if (!seen.has(l.toLowerCase())) { seen.add(l.toLowerCase()); missing.push(l); }
    });
    if (!lines.length) { f.coverage.textContent = ""; f.coverage.append(h("p", { class: "empty", text: "Paste the curriculum first: one section or lecture title per line." })); return; }
    matched.forEach((id) => formConcepts.add(id));
    if (matched.size) { conceptsTouched = true; const d = guessDomain(matched); if (d && !editingId) f.domain.value = d; }
    renderConceptPicker();
    renderAddNodes(matched, missing);
  }

  // UI for adding missing nodes: pick (or create) a domain and topic, edit/tick the concept names
  function renderAddNodes(matched, missing, manual = false) {
    const box = f.coverage; box.textContent = "";
    const courseName = f.title.value.trim() || "this course";
    if (!manual) {
      box.append(h("p", { class: "cov-ok", text: `✓ ${matched.size} concept${matched.size === 1 ? "" : "s"} already on your map ${matched.size === 1 ? "was" : "were"} ticked above.` }));
      if (!missing.length) { box.append(h("p", { class: "empty", text: "Nothing missing. Your map covers this course." })); return; }
      box.append(h("p", { class: "cov-miss", text: `${missing.length} line${missing.length === 1 ? " isn't" : "s aren't"} on your map yet. Untick anything that isn't a real skill (like “Project setup”), rename if needed, then add them:` }));
    }
    // target domain / topic
    const topicCount = {};
    matched.forEach((id) => { const c = conceptById[id]; if (c.topic) topicCount[c.topic] = (topicCount[c.topic] || 0) + 1; });
    const bestTopic = Object.entries(topicCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    const domSel = h("select", { "aria-label": "Domain for new concepts" });
    D.domains.forEach((d) => domSel.append(h("option", { value: d.id, text: d.name })));
    domSel.append(h("option", { value: "__new", text: "➕ New domain…" }));
    domSel.value = bestTopic ? topicById[bestTopic].domain : f.domain.value;
    const domNew = h("input", { type: "text", placeholder: "New domain name, e.g. Product Management", hidden: true });
    const topSel = h("select", { "aria-label": "Topic for new concepts" });
    const topNew = h("input", { type: "text", placeholder: "New topic name", hidden: true });
    function fillTopics() {
      topSel.textContent = "";
      D.topics.filter((t) => t.domain === domSel.value).forEach((t) => topSel.append(h("option", { value: t.id, text: t.name })));
      topSel.append(h("option", { value: "__new", text: "➕ New topic…" }));
      if (bestTopic && topicById[bestTopic]?.domain === domSel.value) topSel.value = bestTopic;
      else topSel.value = "__new";
      domNew.hidden = domSel.value !== "__new";
      topNew.hidden = topSel.value !== "__new";
      if (!topNew.value) topNew.value = courseName.length > 40 ? courseName.slice(0, 40).replace(/\s+\S*$/, "") : courseName;
    }
    domSel.addEventListener("change", fillTopics);
    topSel.addEventListener("change", () => (topNew.hidden = topSel.value !== "__new"));
    fillTopics();

    const rows = h("div", { class: "cov-rows" });
    const addRow = (text) => {
      const cb = h("input", { type: "checkbox", checked: true, "aria-label": "Include" });
      const inp = h("input", { type: "text", value: text, placeholder: "Concept name" });
      rows.append(h("label", { class: "cov-row" }, cb, inp));
    };
    missing.forEach(addRow);
    const msg = h("p", { class: "cov-ok" });
    box.append(
      h("div", { class: "row cov-target" },
        h("label", null, "Domain", domSel, domNew),
        h("label", null, "Topic", topSel, topNew)),
      rows,
      h("div", { class: "row" },
        h("button", { type: "button", class: "btn small", text: "+ Another concept", onclick: () => addRow("") }),
        h("button", { type: "button", class: "btn small primary", text: "Add to my map", onclick: () => {
          const picked = [...rows.querySelectorAll(".cov-row")]
            .filter((r) => r.querySelector("input[type=checkbox]").checked)
            .map((r) => r.querySelector("input[type=text]").value.trim()).filter(Boolean);
          if (!picked.length) { msg.textContent = "Tick or type at least one concept."; return; }
          let domId = domSel.value, topId = topSel.value;
          if (domId === "__new") {
            const name = domNew.value.trim(); if (!name) { msg.textContent = "Give the new domain a name."; domNew.focus(); return; }
            domId = D.domains.find((d) => d.name.toLowerCase() === name.toLowerCase())?.id || addDomain(name, courseName);
          }
          if (topId === "__new") {
            const name = topNew.value.trim(); if (!name) { msg.textContent = "Give the new topic a name."; topNew.focus(); return; }
            topId = D.topics.find((t) => t.domain === domId && t.name.toLowerCase() === name.toLowerCase())?.id || addTopic(name, domId, courseName);
          }
          const ids = picked.map((label) => addConcept(label, topId, courseName));
          ids.forEach((id) => formConcepts.add(id));
          conceptsTouched = true;
          if (!matched.size || f.domain.value === "") f.domain.value = domId;
          afterCustomChange();
          f.domain.value = domId;
          renderConceptPicker();
          box.textContent = "";
          box.append(h("p", { class: "cov-ok", text: `★ Added ${ids.length} concept${ids.length === 1 ? "" : "s"} to ${topicById[topId].name} (${domainById[domId].name}) and ticked them for this course. Save the course to link them; they light up on the graph when you mark it Completed.` }));
        } })),
      msg);
  }
  $("f-check").addEventListener("click", checkCoverage);
  $("f-add-concept").addEventListener("click", () => {
    $("curriculum").open = true;
    renderAddNodes(new Set(), [""], true);
    f.coverage.querySelector(".cov-row input[type=text]")?.focus();
  });

  function resetForm() {
    form.reset(); delete f.provider.dataset.auto;
    formConcepts = new Set(); conceptsTouched = false; autoTitle = ""; editingId = null;
    f.coverage.textContent = ""; $("f-match").hidden = true;
    $("form-title").textContent = "Add a course to your learning path";
    $("f-submit").textContent = "Add to my path";
    $("f-cancel").hidden = true;
    renderConceptPicker();
  }
  function startEdit(id) {
    const e = log.find((x) => x.id === id); if (!e) return;
    editingId = id; conceptsTouched = true;
    f.url.value = e.url; f.title.value = e.title; f.provider.value = e.provider || ""; f.domain.value = e.domain;
    f.status.value = e.status; f.kind.value = e.kind || "course"; f.start.value = e.start || ""; f.end.value = e.end || ""; f.notes.value = e.notes || "";
    f.curriculum.value = e.curriculum || ""; f.coverage.textContent = "";
    formConcepts = new Set(e.concepts || []);
    $("form-title").textContent = "Edit course";
    $("f-submit").textContent = "Save changes";
    $("f-cancel").hidden = false;
    renderConceptPicker();
    $("full-form").open = true;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("f-cancel").addEventListener("click", resetForm);

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const entry = {
      id: editingId || Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      url: f.url.value.trim(), title: f.title.value.trim(), provider: f.provider.value.trim(),
      domain: f.domain.value, kind: f.kind.value, status: f.status.value, start: f.start.value, end: f.end.value,
      concepts: [...formConcepts].filter((id) => conceptById[id]), notes: f.notes.value.trim(), curriculum: f.curriculum.value.trim(),
      added: editingId ? (log.find((x) => x.id === editingId)?.added || today()) : today()
    };
    if (entry.status === "completed" && !entry.end) entry.end = today();
    if (editingId) log = log.map((x) => (x.id === editingId ? entry : x));
    else log.unshift(entry);
    save(); resetForm(); rebuild();
    $("full-form").open = false;
    document.querySelector("#view-log").scrollTo({ top: 0, behavior: "smooth" });
  });

  // ───────────────────────── My courses: the simple dashboard ─────────────────────────
  function coursePct(c) {
    if (c.status === "completed") return 100;
    if (c.modules && c.modules.length) return Math.round((c.modules.filter((m) => m.done).length / c.modules.length) * 100);
    return progress[c.id] || 0;
  }
  function setPct(c, v) {
    if (v >= 100) { delete progress[c.id]; setCourseStatus(c, "completed"); return; }
    progress[c.id] = v; save(); renderLog();
  }
  const pctText = (x) => Math.round(x * 100) + "%";
  function statTile(value, label, sub) {
    return h("div", { class: "tile" }, h("div", { class: "tile-value", text: String(value) }), h("div", { class: "tile-label", text: label }), sub ? h("div", { class: "tile-sub", text: sub }) : null);
  }
  function removeMine(c) {
    if (!confirm(`Remove “${c.title}” from your courses?`)) return;
    log = log.filter((x) => x.id !== c.logId); delete progress[c.id]; save(); rebuild();
  }
  function courseLink(c, cls = "title") {
    return h("a", { class: cls, href: safeUrl(c.url), target: "_blank", rel: "noopener noreferrer", text: c.title + " ↗" });
  }
  // ── Categories
  const catById = (id) => categories.find((c) => c.id === id);
  const DOMAIN_TO_CAT = { ai: "ai", aifin: "ai", cs: "cs", consult: "consult", fin: "fin" };
  function guessCategory(c) {
    const t = `${c.title} ${c.provider || ""} ${c.url || ""}`.toLowerCase();
    if (/\b(degrees?|master'?s|master of|msc|m\.sc|mba|bachelor'?s?|bachelor of|bsc|phd|postgraduate|graduate (certificate|diploma))\b/.test(t)) return "degree";
    if (/enterprise[- ]architect|togaf|archimate|zachman|business architecture/.test(t)) return "ea";
    return DOMAIN_TO_CAT[courseDomainId(c)] || "other";
  }
  const categoryOf = (c) => (catById(courseCat[c.id]) ? courseCat[c.id] : guessCategory(c));
  function newCategory() {
    const name = (prompt("Name of the new category (e.g. Cloud, Product, Languages):") || "").trim();
    if (!name) return null;
    const existing = categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing.id;
    const palette = ["#ea580c", "#65a30d", "#9333ea", "#0891b2", "#be185d", "#4f46e5", "#ca8a04"];
    const used = new Set(categories.map((c) => c.color));
    const cat = { id: "cat-" + slugify(name) + "-" + Date.now().toString(36).slice(-3), name, color: palette.find((x) => !used.has(x)) || palette[categories.length % palette.length] };
    categories.push(cat); save(); return cat.id;
  }
  function catSelect(c) {
    const cur = categoryOf(c), cat = catById(cur);
    const sel = h("select", { class: "cat-select", style: `--cat:${cat.color}`, "aria-label": "Category for " + c.title, title: "Category",
      onchange: (e) => {
        let v = e.target.value;
        if (v === "__new") { v = newCategory(); if (!v) { e.target.value = cur; return; } }
        courseCat[c.id] = v; save(); renderLog();
      } });
    categories.forEach((k) => sel.append(h("option", { value: k.id, selected: k.id === cur || null, text: k.name })));
    sel.append(h("option", { value: "__new", text: "＋ New category…" }));
    return sel;
  }
  function renderCatFilter(all) {
    const box = $("cat-filter"); box.textContent = "";
    const active = all.filter((c) => c.status !== "none");
    const count = (id) => active.filter((c) => categoryOf(c) === id).length;
    if (catFilter !== "all" && !catById(catFilter)) catFilter = "all";
    const chip = (id, label, n, color) => h("button", {
      class: "cat-chip" + (catFilter === id ? " on" : ""), style: color ? `--cat:${color}` : null, "aria-pressed": catFilter === id,
      onclick: () => { catFilter = id; save(); renderLog(); } },
      color ? h("span", { class: "cat-dot" }) : null, label, h("span", { class: "cat-n", text: String(n) }));
    box.append(chip("all", "All", active.length));
    categories.forEach((k) => { const n = count(k.id); if (n || k.pinned || catFilter === k.id) box.append(chip(k.id, k.name, n, k.color)); });
    box.append(h("button", { class: "cat-chip add", text: "＋ Category", onclick: () => { const id = newCategory(); if (id) { catFilter = id; save(); renderLog(); } } }));
  }

  function courseMeta(c) {
    return [c.kind === "project" ? "Project" : null, c.provider, domainById[courseDomainId(c)]?.name].filter(Boolean).join(" · ");
  }
  function nowCard(c) {
    const color = domainById[courseDomainId(c)].color, pct = coursePct(c);
    const nextMod = (c.modules || []).find((m) => !m.done);
    const skills = c.covers.map((id) => conceptById[id]?.label).filter(Boolean);
    const pctEl = h("div", { class: "pct", text: pct + "%" });
    const barFill = h("div", { style: `width:${pct}%;background:${color}` });
    let step = null;
    if (nextMod) {
      step = h("div", { class: "next-step" }, h("span", { class: "meta", text: "Next:" }),
        h("a", { href: safeUrl(nextMod.url), target: "_blank", rel: "noopener noreferrer", text: nextMod.title + " ↗" }),
        h("button", { class: "btn small", text: "✓ Done", onclick: () => setModuleDone(c.id, nextMod.id, true) }));
    } else if (!(c.modules || []).length) {
      step = h("label", { class: "slider" }, h("span", { class: "meta", text: "Progress" }),
        h("input", { type: "range", min: 0, max: 100, step: 5, value: pct, "aria-label": "Progress for " + c.title,
          oninput: (e) => { pctEl.textContent = e.target.value + "%"; barFill.style.width = e.target.value + "%"; },
          onchange: (e) => setPct(c, +e.target.value) }));
    }
    return h("article", { class: "now-card", style: `--c:${color}` },
      h("div", { class: "now-top" }, h("div", null, courseLink(c), h("div", { class: "meta-row" }, catSelect(c), h("span", { class: "meta", text: courseMeta(c) }))), pctEl),
      h("div", { class: "progress big" }, barFill),
      step,
      skills.length ? h("p", { class: "meta skills-line", text: "Skills: " + skills.slice(0, 5).join(", ") + (skills.length > 5 ? ` +${skills.length - 5} more` : "") })
        : c.mine ? h("p", { class: "meta skills-line" }, "No skills linked yet, so nothing lights up on the map. ",
          h("button", { class: "btn small", text: "Add skills", onclick: () => { startEdit(c.logId); $("curriculum").open = true; } })) : null,
      h("div", { class: "card-actions" },
        h("button", { class: "btn small primary", text: "Mark complete", onclick: () => setCourseStatus(c, "completed") }),
        h("button", { class: "btn small", text: "Pause", title: "Move to Up next", onclick: () => setCourseStatus(c, "planned") }),
        c.mine ? h("button", { class: "btn small", text: "Edit", onclick: () => startEdit(c.logId) }) : null,
        h("button", { class: "btn small link", text: "See skills on map", onclick: () => showCuratedCourse(c.id) })));
  }
  function compactRow(c, kind) {
    const color = domainById[courseDomainId(c)].color;
    const actions = kind === "next"
      ? [h("button", { class: "btn small primary", text: "Start", onclick: () => setCourseStatus(c, "in-progress") }),
         c.mine ? h("button", { class: "btn small", text: "Edit", onclick: () => startEdit(c.logId) }) : null,
         h("button", { class: "btn small link", text: "Remove", onclick: () => (c.mine ? removeMine(c) : setCourseStatus(c, "none")) })]
      : [h("button", { class: "btn small", text: "Reopen", onclick: () => setCourseStatus(c, "in-progress") }),
         c.mine ? h("button", { class: "btn small", text: "Edit", onclick: () => startEdit(c.logId) }) : null];
    const meta = kind === "done" && c.end ? `${courseMeta(c)} · finished ${c.end}` : courseMeta(c);
    return h("div", { class: "crow", style: `--c:${color}` },
      h("span", { class: "crow-dot" }),
      h("div", { class: "crow-main" }, courseLink(c), h("div", { class: "meta-row" }, catSelect(c), h("span", { class: "meta", text: meta }))),
      h("div", { class: "crow-actions" }, ...actions));
  }
  function renderLog() {
    const all = allCourses();
    const now = all.filter((c) => c.status === "in-progress").sort((a, b) => coursePct(b) - coursePct(a));
    const next = all.filter((c) => c.status === "planned");
    const done = all.filter((c) => c.status === "completed").sort((a, b) => (b.end || "").localeCompare(a.end || ""));
    const total = D.concepts.length || 1;
    const cnt = (lvl) => D.concepts.filter((c) => levelOf(c.id) >= lvl).length;
    const stats = $("dash-stats"); stats.textContent = "";
    stats.append(
      statTile(now.length, "Learning now"),
      statTile(done.length, "Completed"),
      statTile(cnt(2), "Skills gained", `${cnt(3)} applied in projects`),
      statTile(pctText(cnt(1) / total), "Of the map explored", `${pctText(cnt(3) / total)} deep`));
    renderCatFilter(all);
    const inCat = (c) => catFilter === "all" || categoryOf(c) === catFilter;
    const fill = (id, items, make, emptyText) => {
      const el = $(id); el.textContent = "";
      items = items.filter(inCat);
      if (!items.length) { el.append(h("p", { class: "empty", text: catFilter === "all" ? emptyText : `Nothing in ${catById(catFilter).name} here.` })); return; }
      const groups = categories.map((k) => [k, items.filter((c) => categoryOf(c) === k.id)]).filter(([, cs]) => cs.length);
      if (catFilter !== "all" || groups.length < 2) { items.forEach((c) => el.append(make(c))); return; }
      groups.forEach(([k, cs]) => {
        el.append(h("h3", { class: "cat-head", style: `--cat:${k.color}` }, h("span", { class: "cat-dot" }), k.name, h("span", { class: "cat-n", text: String(cs.length) })));
        cs.forEach((c) => el.append(make(c)));
      });
    };
    fill("now-list", now, nowCard, "Nothing in progress. Paste a course link above, or press Start on something in Up next.");
    fill("next-list", next, (c) => compactRow(c, "next"), "Nothing saved for later.");
    fill("done-list", done, (c) => compactRow(c, "done"), "Nothing completed yet.");
    $("done-count").textContent = `(${done.length})`;
    $("log-count").textContent = now.length;
  }

  // ── Quick add: paste a link → Start learning / Save for later
  const q = { url: $("q-url"), title: $("q-title"), preview: $("q-preview"), known: $("q-known"), skills: $("q-skills") };
  let qAutoTitle = "";
  const qConcepts = () => suggestConcepts(q.title.value + " " + q.url.value.replace(/^\s*https?:\/\/[^/]+/i, "").replace(/[-_/]+/g, " "));
  function qUpdate() {
    const hit = findKnown(q.url.value);
    renderKnownInto(q.known, hit);
    const parsed = !hit && parseLink(q.url.value);
    q.preview.hidden = !parsed;
    if (!parsed) return;
    if (!q.title.value || q.title.value === qAutoTitle) { q.title.value = parsed.title; qAutoTitle = parsed.title; }
    qSkills();
  }
  function qSkills() {
    const ids = [...qConcepts()];
    q.skills.textContent = "";
    if (ids.length) q.skills.textContent = "Skills it will track: " + ids.map((id) => conceptById[id].label).join(", ");
    else q.skills.append("No matching skills on your map yet, so this course won't light up any nodes. ",
      h("button", { type: "button", class: "btn small", text: "Add skills", onclick: () => { $("q-more").click(); $("curriculum").open = true; } }));
  }
  function qAdd(status) {
    const p = parseLink(q.url.value); if (!p) { q.url.focus(); return; }
    const ids = [...qConcepts()];
    log.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), url: q.url.value.trim(),
      title: q.title.value.trim() || p.title, provider: p.provider, domain: guessDomain(ids) || D.domains[0].id,
      kind: "course", status, start: status === "in-progress" ? today() : "", end: "",
      concepts: ids, notes: "", curriculum: "", added: today()
    });
    save(); q.url.value = ""; q.title.value = ""; qAutoTitle = ""; q.preview.hidden = true; q.known.hidden = true;
    rebuild();
  }
  q.url.addEventListener("input", qUpdate);
  q.title.addEventListener("input", qSkills);
  q.url.addEventListener("keydown", (e) => { if (e.key === "Enter" && !q.preview.hidden) { e.preventDefault(); qAdd("in-progress"); } });
  $("q-start").addEventListener("click", () => qAdd("in-progress"));
  $("q-later").addEventListener("click", () => qAdd("planned"));
  $("q-more").addEventListener("click", () => {
    resetForm();
    f.url.value = q.url.value; f.title.value = q.title.value; autoTitle = q.title.value;
    autoFill(); renderKnownMatch();
    $("full-form").open = true;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ version: 2, exported: today(), log, courseStatus, learned: [...manualLearned], levels, focus, progress, categories, courseCat, custom }, null, 2)], { type: "application/json" });
    const a = h("a", { href: URL.createObjectURL(blob), download: `learning-path-${today()}.json` });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("import").addEventListener("change", async (ev) => {
    const file = ev.target.files[0]; if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const incoming = Array.isArray(data) ? data : data.log;
      if (!Array.isArray(incoming)) throw new Error("No learning log found in this file.");
      const ids = new Set(incoming.map((x) => x.id));
      log = [...incoming.filter((x) => x && x.id && x.url && x.title), ...log.filter((x) => !ids.has(x.id))];
      if (data.courseStatus) courseStatus = { ...courseStatus, ...data.courseStatus };
      if (Array.isArray(data.learned)) data.learned.forEach((id) => { manualLearned.add(id); if (!levels[id]) levels[id] = 2; });
      if (data.levels && typeof data.levels === "object") Object.entries(data.levels).forEach(([id, l]) => { if (l >= 1 && l <= 4) levels[id] = Math.max(levels[id] || 0, l); });
      if (typeof data.focus === "string") focus = data.focus;
      if (data.progress && typeof data.progress === "object") progress = { ...progress, ...data.progress };
      if (Array.isArray(data.categories)) data.categories.forEach((k) => { if (k && k.id && k.name && !catById(k.id)) categories.push(k); });
      if (data.courseCat && typeof data.courseCat === "object") courseCat = { ...courseCat, ...data.courseCat };
      if (data.custom) {
        arr(data.custom.domains).forEach((d) => registerDomain(d) && custom.domains.push(d));
        arr(data.custom.topics).forEach((t) => registerTopic(t) && custom.topics.push(t));
        arr(data.custom.concepts).forEach((c) => registerConcept(c) && custom.concepts.push(c));
      }
      afterCustomChange();
      alert(`Imported ${incoming.length} course(s).`);
    } catch (err) {
      alert("Couldn't import that file: " + err.message);
    }
    ev.target.value = "";
  });

  // ───────────────────────── boot ─────────────────────────
  $("app-title").textContent = D.title || "Skill Map";
  // If you added a course yourself that is now a curated course on the map, merge them:
  // keep your status/progress on the curated one and drop the duplicate.
  (() => {
    const rank = { none: 0, planned: 1, "in-progress": 2, completed: 3 };
    let changed = false;
    log = log.filter((e) => {
      const hit = findKnown(e.url || "");
      if (!hit || hit.module) return true;
      const id = hit.course.id, cur = courseStatus[id] || "none";
      if ((rank[e.status] || 0) > rank[cur]) courseStatus[id] = e.status;
      const oldKey = "log:" + e.id;
      if (courseCat[oldKey] && !courseCat[id]) courseCat[id] = courseCat[oldKey];
      delete courseCat[oldKey];
      if (progress[oldKey] && !progress[id]) progress[id] = progress[oldKey];
      delete progress[oldKey];
      (e.concepts || []).forEach((cid) => { if (!levels[cid] && e.status === "completed") levels[cid] = 2; });
      changed = true;
      return false;
    });
    if (changed) save();
  })();
  buildGraph(); renderGraph(); settle(320); positionAll();
  refreshAll(); renderConceptPicker();
  switchView(store.get(KEYS.tab, "log") === "graph" ? "graph" : "log");
  requestAnimationFrame(fit);
  window.addEventListener("resize", () => { clearTimeout(window.__fitT); window.__fitT = setTimeout(fit, 150); });
})();
