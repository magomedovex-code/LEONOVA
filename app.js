/* LEONOVA – English Trainer
   Vanilla JS, runs offline from file://. Progress lives in localStorage only. */
(function () {
  'use strict';

  // ---------------------------------------------------------------- data
  const QUESTIONS = Array.isArray(window.QUESTIONS) ? window.QUESTIONS : [];
  const RULES = window.RULES || {};
  const TEXTS = Array.isArray(window.TEXTS) ? window.TEXTS : [];
  const HARD_TEXTS = Array.isArray(window.HARD_TEXTS) ? window.HARD_TEXTS : [];
  const ALL_TEXTS = TEXTS.concat(HARD_TEXTS);
  const WRITING = Array.isArray(window.WRITING) ? window.WRITING : [];
  const VOCAB = Array.isArray(window.VOCAB) ? window.VOCAB : [];

  const WORLDS = [
    { id: 'adj-adv', name: 'Adjectives & Adverbs', icon: 'Aa', desc: 'Adjektiv oder Adverb, -ly, Linking Verbs, Stellung, Steigerung, Wortbildung' },
    { id: 'past', name: 'Past Tenses', icon: '⟲', desc: 'Past simple & continuous, past perfect (continuous), used to / would, irregular verbs' },
    { id: 'linking', name: 'Linking Words & Prepositions', icon: '∞', desc: 'although, despite, unless … · at/on/in · for/since · make/do/take' },
    { id: 'vocab', name: 'Vocabulary Units 1–3', icon: 'Wd', desc: 'Family, friendship, school – Englisch ↔ Deutsch' }
  ];
  const WORLD = {};
  WORLDS.forEach(w => { WORLD[w.id] = w; });
  WORLD.texts = { id: 'texts', name: 'Language in Use', icon: '¶' };
  const HARD = { id: 'hard', name: 'Super Hard', icon: '!!', desc: 'Alles gemischt: Past Tenses, Adjektiv/Adverb, Linking Words und Vokabeln in den schwersten Aufgaben. Keine Hinweise!' };
  WORLD.hard = HARD;

  const ROUND_SIZE = 10;
  const EXAM_COUNT = 5;
  const EXAM_PER_WORLD = { 'adj-adv': 8, past: 8, linking: 7, vocab: 7 };
  const TIME_LIMIT = 60;

  const TYPE_LABEL = {
    type: 'Tippe das Wort',
    sentence: 'Ganzen Satz schreiben',
    verb3: 'Unregelmäßiges Verb',
    text: 'Text mit Lücken'
  };

  // ---------------------------------------------------------------- storage
  const KEY = 'leonova.progress.v1';
  function defaults() {
    return {
      xp: {}, bestStreak: 0, badges: {}, mistakes: {}, stars: {}, rounds: 0,
      correct: {}, drafts: {}, timeBest: 0, examBest: null, fixed: 0, textsDone: {}, roundStars: {}, examGrades: {}
    };
  }
  function load() {
    const d = defaults();
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        Object.keys(d).forEach(k => { if (p[k] !== undefined && p[k] !== null) d[k] = p[k]; });
      }
    } catch (e) { /* storage unavailable – play without saving */ }
    return d;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* ignore */ }
  }
  function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  const P = load();

  // ---------------------------------------------------------------- helpers
  const app = document.getElementById('app');
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  // Seeded random numbers: the same seed gives the same order on every device,
  // so friends get exactly the same rounds and exams.
  function seededRandom(seed) {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909);
      let t = (h ^= h >>> 16) >>> 0;
      t = (t + 0x6D2B79F5) >>> 0;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(a, seed) {
    const rnd = seed ? seededRandom(seed) : Math.random;
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function totalXp() { return Object.keys(P.xp).reduce((s, k) => s + (P.xp[k] || 0), 0); }

  // Fixed rounds per world: one fixed mixed order, cut into rounds of 10 (a short rest joins the last round)
  const ROUNDS = {};
  WORLDS.concat([HARD]).forEach(w => {
    const list = shuffle(QUESTIONS.filter(q => q.world === w.id), 'leonova-round-' + w.id);
    const rounds = [];
    for (let i = 0; i < list.length; i += ROUND_SIZE) rounds.push(list.slice(i, i + ROUND_SIZE));
    if (rounds.length > 1 && rounds[rounds.length - 1].length < 5) rounds[rounds.length - 2] = rounds[rounds.length - 2].concat(rounds.pop());
    if (w.id === 'hard') HARD_TEXTS.forEach((t, i) => { if (rounds[i]) rounds[i] = rounds[i].concat([t]); });
    ROUNDS[w.id] = rounds;
  });
  function roundKey(world, i) { return world + '#' + i; }
  function roundsDone(world) { return ROUNDS[world].filter((r, i) => (P.roundStars[roundKey(world, i)] || 0) > 0).length; }
  function nextRound(world) {
    const i = ROUNDS[world].findIndex((r, k) => !P.roundStars[roundKey(world, k)]);
    return i < 0 ? 0 : i;
  }
  function starsHTML(n, max) {
    let h = '';
    for (let i = 0; i < (max || 3); i++) h += i < n ? '<span>★</span>' : '<span class="off">★</span>';
    return h;
  }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  let toastTimer = null;
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function updateHeader() {
    document.getElementById('xpTotal').textContent = totalXp() + ' XP';
  }

  // ---------------------------------------------------------------- answer checking
  function baseNorm(s) {
    return String(s == null ? '' : s)
      .replace(/[‘’‚‛`´′]/g, "'")
      .replace(/[“”„]/g, '"')
      .replace(/[–—]/g, '-')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[.!?]+$/, '')
      .trim();
  }
  // Display / distance form: commas don't count in whole sentences.
  function dispNorm(s, mode) {
    let n = baseNorm(s);
    if (mode === 'sentence') n = n.replace(/\s*[,;:]\s*/g, ' ').replace(/\s+([?!.])/g, '$1').replace(/\s+/g, ' ').trim();
    return n;
  }
  function expand(n) {
    return n
      .replace(/\bcan't\b/g, 'cannot')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bshan't\b/g, 'shall not')
      .replace(/\b(\w+)n't\b/g, '$1 not')
      .replace(/\bcan not\b/g, 'cannot')
      .replace(/\bi'm\b/g, 'i am')
      .replace(/\b(\w+)'re\b/g, '$1 are')
      .replace(/\b(\w+)'ve\b/g, '$1 have')
      .replace(/\b(\w+)'ll\b/g, '$1 will');
  }
  function variants(s, mode) {
    const n = expand(dispNorm(s, mode));
    if (/\b\w+'d\b/.test(n)) return [n.replace(/\b(\w+)'d\b/g, '$1 had'), n.replace(/\b(\w+)'d\b/g, '$1 would')];
    return [n];
  }
  function same(a, b, mode) {
    const va = variants(a, mode), vb = variants(b, mode);
    return va.some(x => vb.indexOf(x) >= 0);
  }
  function tokens(s) { return s.split(/[^a-z'-]+/).filter(Boolean); }

  // Levenshtein with alignment (a = user, b = expected)
  function align(a, b) {
    const m = a.length, n = b.length;
    const d = [];
    for (let i = 0; i <= m; i++) { d.push(new Array(n + 1).fill(0)); d[i][0] = i; }
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const c = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      }
    }
    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
        ops.unshift({ t: a[i - 1] === b[j - 1] ? 'eq' : 'sub', a: a[i - 1], b: b[j - 1] }); i--; j--;
      } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
        ops.unshift({ t: 'ins', a: a[i - 1] }); i--;
      } else {
        ops.unshift({ t: 'del', b: b[j - 1] }); j--;
      }
    }
    return { dist: d[m][n], ops };
  }

  // Words that exist – swapping one real word for another is a grammar/word error, not spelling.
  const KNOWN = new Set(('a an the in on at by for since during until till from to of with about into onto over under after before ' +
    'while when as so and but or nor neither either both although though despite however because unless whether than then too very ' +
    'enough well good bad badly best better worse worst more most less least much many hard hardly late lately near nearly high highly ' +
    'fast slow slowly was were is are am be been being had has have did do does done make made take took taken get got keep kept pay paid ' +
    'go went gone come came see saw seen this that these those there their they he she it we you i me him her us them his its our your ' +
    'my mine yours one ones some any no not never always often usually sometimes already yet still just ever also only ' +
    'would will could can should might must may used use uses using lie lay laid lied lain rise raise raised rose risen').split(' '));
  function addKnown(s) { tokens(baseNorm(s)).forEach(w => KNOWN.add(w)); }

  const TRICKY = {
    hard: 'hard = hart, schwer (auch als Adverb: work hard)', hardly: 'hardly = kaum',
    late: 'late = spät (auch als Adverb: arrive late)', lately: 'lately = in letzter Zeit',
    near: 'near = nahe', nearly: 'nearly = beinahe, fast',
    high: 'high = hoch (fly high)', highly: 'highly = sehr, äußerst (highly recommended)',
    most: 'most = am meisten', mostly: 'mostly = hauptsächlich',
    short: 'short = kurz', shortly: 'shortly = bald, in Kürze',
    close: 'close = nahe', closely: 'closely = genau, eng',
    free: 'free = gratis', freely: 'freely = frei, ungehindert',
    pretty: 'pretty = hübsch / ziemlich', prettily: 'prettily = hübsch (Art und Weise)',
    fast: 'fast = schnell (Adjektiv UND Adverb – kein "fastly"!)', deep: 'deep = tief', deeply: 'deeply = zutiefst'
  };
  const SUFFIXES = ['ly', 'ily', 'ally', 'ed', 'd', 's', 'es', 'ing', 'er', 'est', 'r', 'st', 'ness', 'ful', 'ous', 'less'];

  function suffixRelation(u, e) {
    for (const s of SUFFIXES) {
      if (u + s === e) return { missing: s };
      if (e + s === u) return { extra: s };
    }
    if (u.endsWith('y') && u.slice(0, -1) + 'ily' === e) return { missing: 'ly' };
    if (e.endsWith('y') && e.slice(0, -1) + 'ily' === u) return { extra: 'ly' };
    if (u.endsWith('le') && u.slice(0, -1) + 'y' === e) return { missing: 'ly' };
    if (e.endsWith('le') && e.slice(0, -1) + 'y' === u) return { extra: 'ly' };
    return null;
  }

  function evaluate(item, raw) {
    const mode = item.type === 'sentence' ? 'sentence' : 'word';
    const user = String(raw == null ? '' : raw).trim();
    const answers = item.answer;
    const res = { correct: false, near: false, user, expected: answers[0], msg: '', diff: null };
    if (!user) { res.msg = 'Keine Antwort eingegeben.'; res.empty = true; return res; }

    for (const a of answers) {
      if (same(user, a, mode)) { res.correct = true; res.expected = a; return res; }
    }
    const wrong = item.wrong || {};
    for (const k of Object.keys(wrong)) {
      if (same(user, k, mode)) { res.msg = wrong[k]; res.typical = true; break; }
    }

    // closest correct answer
    const nu = dispNorm(user, mode);
    let best = null;
    answers.forEach(a => {
      const al = align(nu, dispNorm(a, mode));
      if (!best || al.dist < best.al.dist) best = { a, al };
    });
    res.expected = best.a;
    if (res.typical) {
      // a typical spelling mistake (data says "Spelling: …") is shown like any other near miss
      if (/^spelling/i.test(res.msg) && best.al.dist <= 2) { res.near = true; res.diff = best.al.ops; }
      return res;
    }

    const ne = dispNorm(best.a, mode);
    const ut = tokens(nu), et = tokens(ne);

    // all the right words, wrong order
    if (ut.length > 1 && ut.length === et.length && ut.slice().sort().join(' ') === et.slice().sort().join(' ')) {
      res.msg = 'All the right words – but the word order is wrong. Check where the adverb / verb goes. (Wortstellung!)';
      return res;
    }

    // invented regular past form of an irregular verb (writed, goed …)
    if (item.world === 'past' || item.irregular) {
      const bad = ut.find(w => /ed$/.test(w) && !KNOWN.has(w) && et.indexOf(w) < 0);
      if (bad && !et.some(w => /ed$/.test(w) && align(w, bad).dist <= 1)) {
        res.msg = '"' + bad + '" is not a real verb form. This verb is irregular – use its own V2/V3 form, not -ed. (Unregelmäßiges Verb: keine -ed-Endung!)';
        return res;
      }
    }

    // same number of words: compare the words that differ
    if (ut.length === et.length) {
      const diffs = [];
      for (let i = 0; i < ut.length; i++) if (ut[i] !== et[i]) diffs.push([ut[i], et[i]]);
      for (const [u, e] of diffs) {
        if (TRICKY[u] && TRICKY[e]) {
          res.msg = 'Careful: "' + u + '" and "' + e + '" mean different things! ' + TRICKY[u] + ' · ' + TRICKY[e] + '.';
          return res;
        }
      }
      for (const [u, e] of diffs) {
        const rel = suffixRelation(u, e);
        if (rel) {
          if (rel.missing === 'ly') res.msg = 'You need an adverb here ("' + e + '"): it describes HOW something is done (a verb), not a noun. (Hier braucht man ein Adverb.)';
          else if (rel.extra === 'ly') res.msg = 'You need an adjective here ("' + e + '"), not an adverb. Adjectives describe nouns – and come after linking verbs like be, look, feel, smell, taste, sound, seem, become.';
          else res.msg = 'Right word, wrong form: check the ending of "' + u + '" → "' + e + '". (Richtiges Wort, falsche Form.)';
          return res;
        }
      }
      const realWordSwap = diffs.length && diffs.every(([u]) => KNOWN.has(u));
      if (realWordSwap) {
        res.msg = '"' + diffs.map(x => x[0]).join(' … ') + '" is a real word, but it does not fit here. You need "' + diffs.map(x => x[1]).join(' … ') + '".';
        return res;
      }
    }

    // spelling: 1–2 letters wrong
    if (best.al.dist <= 2 && ne.length >= 4 && best.al.dist < ne.length / 2) {
      res.near = true;
      res.diff = best.al.ops;
      res.msg = 'Nur 1–2 Buchstaben falsch – aber in der Schularbeit zählt das als Fehler. Schau dir die markierten Buchstaben an.';
      return res;
    }

    // chose the other option of "(a / b)"
    const opts = (item.prompt || '').match(/\(([^()]*\/[^()]*)\)/);
    if (opts) {
      const choices = opts[1].split('/').map(x => baseNorm(x));
      if (choices.indexOf(baseNorm(user)) >= 0) {
        res.msg = 'You chose "' + user + '", but here the other option is correct.';
        return res;
      }
    }
    res.msg = '';
    return res;
  }

  function grade(q, vals) {
    if (q.type === 'verb3') {
      const w = q.wrong || {};
      const r1 = evaluate({ answer: q.answer[0], wrong: w.v2, world: 'past', type: 'type', irregular: true }, vals[0]);
      const r2 = evaluate({ answer: q.answer[1], wrong: w.v3, world: 'past', type: 'type', irregular: true }, vals[1]);
      return {
        correct: r1.correct && r2.correct,
        near: (!r1.correct && r1.near) || (!r2.correct && r2.near),
        empty: r1.empty && r2.empty,
        parts: [r1, r2],
        score: (r1.correct ? 0.5 : 0) + (r2.correct ? 0.5 : 0)
      };
    }
    const r = evaluate(q, vals[0]);
    r.score = r.correct ? 1 : 0;
    return r;
  }

  // ---------------------------------------------------------------- texts → stand-alone gap questions
  function textParts(t) { return t.body.split(/_{3,}/); }
  function gapQuestion(t, i) {
    const parts = textParts(t);
    let s = '';
    parts.forEach((p, k) => {
      s += p;
      if (k < parts.length - 1) s += k === i ? '\u0000' : t.gaps[k].a[0];
    });
    const pos = s.indexOf('\u0000');
    let start = 0;
    for (let k = pos - 1; k >= 0; k--) {
      if (/[.!?\n]/.test(s[k]) && (k + 1 >= s.length || /\s/.test(s[k + 1]))) { start = k + 1; break; }
    }
    let end = s.length;
    const m = /[.!?\n]/.exec(s.slice(pos + 1));
    if (m) end = pos + 1 + m.index + 1;
    const g = t.gaps[i];
    const rule = RULES[g.rule];
    return {
      id: t.id + '#' + (i + 1),
      world: t.hard ? 'hard' : ((rule && rule.world) || 'texts'),
      type: 'type',
      prompt: s.slice(start, end).replace('\u0000', '____').trim(),
      answer: g.a,
      why: g.why,
      wrong: g.wrong,
      hint: g.hint,
      rule: g.rule,
      fromText: t.title
    };
  }

  const QMAP = {};
  QUESTIONS.forEach(q => {
    QMAP[q.id] = q;
    if (q.type === 'verb3') q.answer.forEach(arr => arr.forEach(addKnown));
    else q.answer.forEach(addKnown);
  });
  ALL_TEXTS.forEach(t => t.gaps.forEach((g, i) => {
    g.a.forEach(addKnown);
    const q = gapQuestion(t, i);
    QMAP[q.id] = q;
  }));

  // ---------------------------------------------------------------- hints & rules
  function hintFor(q) {
    let h = q.hint;
    if (!h) {
      if (q.type === 'verb3') h = q.answer[0][0][0] + '… / ' + q.answer[1][0][0] + '…';
      else if (q.type === 'sentence') {
        const w = q.answer[0].split(' ');
        h = w.slice(0, 2).join(' ') + ' …';
      } else {
        h = q.answer[0].split(' ').map(w => w[0] + '…').join(' ');
      }
    }
    const r = RULES[q.rule];
    return '<b>Tipp:</b> ' + esc(h) + (r ? '<br><b>Formel:</b> ' + esc(r.form) : '');
  }

  function ruleCard(ruleId, compact) {
    const r = RULES[ruleId];
    if (!r) return '';
    const ex = (r.ex && r.ex[0]) || '';
    return '<div class="rule-card">' +
      '<span class="rc-title">Regel · ' + esc(r.title) + '</span>' +
      '<span class="rc-form">' + esc(r.form) + '</span>' +
      (compact ? '' : '<span>' + esc(r.use) + '</span>') +
      (ex ? '<span class="rc-ex">e.g. ' + esc(ex) + '</span>' : '') +
      '<button class="pill small ghost" data-act="rule" data-rule="' + esc(ruleId) + '">Regel ansehen</button>' +
      '</div>';
  }

  function openRule(ruleId) {
    const r = RULES[ruleId];
    if (!r) { toast('Keine Regel gefunden.'); return; }
    openModal(
      '<button class="icon-btn modal-close" data-act="close-modal" aria-label="Schließen">✕</button>' +
      '<div class="q-kind">' + esc((WORLD[r.world] || {}).name || '') + '</div>' +
      cheatCardInner(r) +
      '<div class="actions"><button class="pill ghost" data-act="cheat" data-world="' + esc(r.world) + '">Ganzer Spickzettel</button>' +
      '<button class="pill primary" data-act="close-modal">OK</button></div>'
    );
  }
  function cheatCardInner(r) {
    return '<h3>' + esc(r.title) + '</h3><dl>' +
      '<dt>Form</dt><dd class="form">' + esc(r.form) + '</dd>' +
      '<dt>Use</dt><dd>' + esc(r.use) + (r.de ? ' <span class="muted">(' + esc(r.de) + ')</span>' : '') + '</dd>' +
      (r.signal ? '<dt>Signal words</dt><dd>' + esc(r.signal) + '</dd>' : '') +
      (r.ex && r.ex.length ? '<dt>Examples</dt><dd><ul>' + r.ex.map(e => '<li>' + esc(e) + '</li>').join('') + '</ul></dd>' : '') +
      (r.tip ? '<dt>Watch out</dt><dd>' + esc(r.tip) + '</dd>' : '') +
      '</dl>';
  }

  let lastFocus = null;
  function openModal(html) {
    lastFocus = document.activeElement;
    const m = document.getElementById('modal');
    document.getElementById('modalCard').innerHTML = html;
    m.hidden = false;
    const b = m.querySelector('.modal-close');
    if (b) b.focus();
  }
  function closeModal() {
    document.getElementById('modal').hidden = true;
    if (lastFocus && document.body.contains(lastFocus)) {
      try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }
  function modalOpen() { return !document.getElementById('modal').hidden; }

  // ---------------------------------------------------------------- badges
  const BADGES = [
    { id: 'first', icon: '①', name: 'First steps', desc: 'Erste Runde beendet' },
    { id: 'streak10', icon: '10', name: '10 in a row', desc: '10 richtige Antworten hintereinander' },
    { id: 'streak25', icon: '25', name: '25 in a row', desc: '25 richtige Antworten hintereinander' },
    { id: 'perfect', icon: '★', name: 'Perfect round', desc: '10/10 beim ersten Versuch' },
    { id: 'nohints', icon: '◎', name: 'No hints', desc: 'Runde ohne Hinweis, mind. 8 richtig' },
    { id: 'master-adj-adv', icon: 'Aa', name: 'Adverb Ace', desc: 'Alle Runden in Adjectives & Adverbs geschafft' },
    { id: 'master-past', icon: '⟲', name: 'Past Tense Master', desc: 'Alle Runden in Past Tenses geschafft' },
    { id: 'master-linking', icon: '∞', name: 'Linking Legend', desc: 'Alle Runden in Linking Words geschafft' },
    { id: 'master-vocab', icon: 'Wd', name: 'Word Collector', desc: 'Alle Runden in Vocabulary geschafft' },
    { id: 'master-hard', icon: '!!', name: 'Super Hard Survivor', desc: 'Alle Super-Hard-Runden geschafft' },
    { id: 'text-pro', icon: '¶', name: 'Text Pro', desc: 'Einen Lückentext ohne Fehler' },
    { id: 'writer', icon: '✎', name: 'Writer', desc: 'Alle Punkte einer Schreib-Checkliste erfüllt' },
    { id: 'speed', icon: '⏱', name: 'Speedster', desc: '10 richtige im 60-Sekunden-Modus' },
    { id: 'exam', icon: 'A+', name: 'Exam ready', desc: 'Probe-Schularbeit mit Note 1 oder 2' },
    { id: 'fixer', icon: '✓', name: 'Mistake Fixer', desc: '10 alte Fehler ausgebessert' },
    { id: 'xp1000', icon: '1k', name: '1000 XP', desc: 'Insgesamt 1000 XP gesammelt' }
  ];
  function award(id) {
    if (P.badges[id]) return;
    const b = BADGES.find(x => x.id === id);
    if (!b) return;
    P.badges[id] = Date.now();
    save();
    setTimeout(() => toast('Neues Abzeichen: ' + b.name), 300);
  }
  function checkXpBadges() {
    WORLDS.forEach(w => { if (roundsDone(w.id) === ROUNDS[w.id].length) award('master-' + w.id); });
    if (ROUNDS.hard.length && roundsDone('hard') === ROUNDS.hard.length) award('master-hard');
    if (totalXp() >= 1000) award('xp1000');
    if (P.fixed >= 10) award('fixer');
  }
  function addXp(world, pts) {
    P.xp[world] = (P.xp[world] || 0) + pts;
    updateHeader();
    checkXpBadges();
  }

  // ---------------------------------------------------------------- keyboard
  let onEnter = null;
  let lastEnter = 0;
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOpen()) { closeModal(); return; }
    if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
    if (modalOpen()) return;
    const t = e.target;
    if (t && t.tagName === 'TEXTAREA' && !t.hasAttribute('data-enter')) return;
    if (t && t.tagName === 'BUTTON' && !t.hasAttribute('data-enter')) return;
    if (!onEnter) return;
    e.preventDefault();
    const now = Date.now();
    if (now - lastEnter < 180) return;
    lastEnter = now;
    onEnter(e);
  });

  // ---------------------------------------------------------------- screens
  let S = null; // current session
  let timerId = null;
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  function show(html) {
    stopTimerIfIdle();
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }
  function stopTimerIfIdle() { if (!S || S.mode !== 'time') stopTimer(); }

  function mistakeCount() { return Object.keys(P.mistakes).filter(id => QMAP[id]).length; }

  function renderHome() {
    S = null; onEnter = null; stopTimer();
    const xp = totalXp();
    let html = '<section class="hero">' +
      '<div><h1>Ready for the Schularbeit?</h1><p>Alles wird getippt – wie in der echten Schularbeit.</p></div>' +
      '<div class="hero-stats"><span>' + xp + ' XP</span><span>Beste Serie: ' + (P.bestStreak || 0) + '</span><span>' +
      Object.keys(P.badges).length + '/' + BADGES.length + ' Abzeichen</span></div></section>';

    const hTotal = ROUNDS.hard.length, hDone = roundsDone('hard'), hNext = nextRound('hard');
    html += '<section class="hard-card">' +
      '<div class="hard-head"><span class="hard-badge">!!</span><div><h2>Super Hard</h2><p>' + esc(HARD.desc) + '</p></div></div>' +
      '<div class="hard-meta"><span>' + QUESTIONS.filter(q => q.world === 'hard').length + ' Aufgaben</span><span>' + hDone + ' von ' + hTotal + ' Runden geschafft</span></div>' +
      '<div class="card-actions"><button class="pill hard-pill" data-act="round" data-world="hard" data-round="' + hNext + '">Runde ' + (hNext + 1) + ' starten</button>' +
      '<button class="pill hard-ghost" data-act="rounds" data-world="hard">Alle Runden</button>' +
      '<button class="pill hard-ghost" data-act="hard-texts">Super Hard Texte (' + HARD_TEXTS.length + ')</button></div></section>';
    html += '<div class="section-title"><h2>Welten</h2><span class="muted small">Gleiche Runden für alle</span></div><div class="grid">';
    WORLDS.forEach(w => {
      const n = QUESTIONS.filter(q => q.world === w.id).length;
      const total = ROUNDS[w.id].length, done = roundsDone(w.id), nr = nextRound(w.id);
      html += '<article class="bubble-card world-card">' +
        '<div class="world-head"><div class="world-icon">' + esc(w.icon) + '</div><div><h3>' + esc(w.name) + '</h3>' +
        '<span class="muted small">' + n + ' Aufgaben</span></div></div>' +
        '<p>' + esc(w.desc) + '</p>' +
        '<div class="level-row"><span>' + done + ' von ' + total + ' Runden geschafft</span></div>' +
        '<div class="bar"><div style="width:' + Math.round(done / total * 100) + '%"></div></div>' +
        '<div class="card-actions"><button class="pill primary" data-act="round" data-world="' + w.id + '" data-round="' + nr + '">Runde ' + (nr + 1) + ' starten</button>' +
        '<button class="pill ghost" data-act="rounds" data-world="' + w.id + '">Alle Runden</button>' +
        '<button class="pill ghost" data-act="cheat" data-world="' + w.id + '">Spickzettel</button></div>' +
        '</article>';
    });
    html += '</div>';

    const mc = mistakeCount();
    html += '<div class="section-title"><h2>Mehr üben</h2></div><div class="grid">' +
      modeCard('texts', '¶', 'Texte · Language in Use', TEXTS.length + ' Texte mit Lücken zum Tippen') +
      modeCard('writing', '✎', 'Schreibaufgaben', 'E-Mails & Talk about a friend – mit Checkliste') +
      modeCard('mistakes', '↺', 'Meine Fehler', mc ? plural(mc, 'Aufgabe', 'Aufgaben') + ' zum Wiederholen' : 'Noch keine Fehler gespeichert') +
      modeCard('exams', 'A', 'Probe-Schularbeit', EXAM_COUNT + ' feste Probe-Schularbeiten · 30 Aufgaben + 1 Text' + (P.examBest ? ' · Bestnote ' + P.examBest : '')) +
      modeCard('time', '⏱', 'Zeitmodus 60 s', 'So viele wie möglich' + (P.timeBest ? ' · Rekord ' + P.timeBest : '')) +
      modeCard('badges', '★', 'Abzeichen', Object.keys(P.badges).length + ' von ' + BADGES.length + ' gesammelt') +
      '</div>';
    html += '<p class="muted small" style="margin-top:28px;text-align:center">Fortschritt wird nur in diesem Browser gespeichert. ' +
      '<button class="pill small ghost" data-act="reset">Fortschritt löschen</button></p>';
    show(html);
    updateHeader();
  }
  function modeCard(act, icon, title, sub) {
    return '<button class="bubble-card mode-card" data-act="' + act + '"><span class="mode-icon">' + icon + '</span><strong>' +
      esc(title) + '</strong><span>' + esc(sub) + '</span></button>';
  }

  // ---------------------------------------------------------------- sessions
  function newSession(mode, opts) {
    return Object.assign({
      mode, world: null, queue: [], idx: 0, repeat: [], repeatAdded: false,
      hearts: null, streak: 0, maxStreak: 0, xp: 0, results: [], hintsUsed: 0,
      checked: false, hintUsed: false, emptyTries: 0, answers: []
    }, opts);
  }

  function startRound(world, idx) {
    const rounds = ROUNDS[world];
    if (!rounds || !rounds.length) { toast('Keine Aufgaben gefunden.'); return; }
    idx = Math.min(Math.max(0, Number(idx) || 0), rounds.length - 1);
    S = newSession('round', { world, round: idx, hearts: 3, queue: rounds[idx].map(x => (x.gaps ? { text: x } : { q: x })) });
    S.mainCount = S.queue.length;
    renderPlay();
  }
  function startMistakes(ids) {
    const list = (ids && ids.length ? ids : Object.keys(P.mistakes)).filter(id => QMAP[id]);
    if (!list.length) { toast('Super – keine Fehler gespeichert!'); return; }
    const picked = shuffle(list).slice(0, 15).map(id => ({ q: QMAP[id] }));
    S = newSession('mistakes', { queue: picked });
    S.mainCount = picked.length;
    renderPlay();
  }
  function startTime() {
    const pool = QUESTIONS.filter(q => q.type !== 'sentence');
    S = newSession('time', { queue: shuffle(pool, 'leonova-time').map(q => ({ q })), end: Date.now() + TIME_LIMIT * 1000, correctCount: 0 });
    S.mainCount = S.queue.length;
    stopTimer();
    timerId = setInterval(tickTimer, 200);
    renderPlay();
  }
  function tickTimer() {
    if (!S || S.mode !== 'time') { stopTimer(); return; }
    const left = Math.max(0, Math.ceil((S.end - Date.now()) / 1000));
    const el = document.getElementById('timer');
    if (el) { el.textContent = left + ' s'; el.classList.toggle('low', left <= 10); }
    if (left <= 0) { stopTimer(); endSession(); }
  }
  // Fixed mock exams: exam k always has the same tasks, and no task appears in two exams
  function examQueue(k) {
    let items = [];
    const verbs = shuffle(QUESTIONS.filter(q => q.type === 'verb3'), 'leonova-exam-verbs');
    WORLDS.forEach(w => {
      const pool = shuffle(QUESTIONS.filter(q => q.world === w.id && q.type !== 'verb3'), 'leonova-exam-' + w.id);
      let n = EXAM_PER_WORLD[w.id];
      if (w.id === 'past') { items = items.concat(verbs.slice(k * 2, k * 2 + 2)); n -= 2; }
      items = items.concat(pool.slice(k * n, k * n + n));
    });
    const queue = shuffle(items, 'leonova-exam-order-' + k).map(q => ({ q }));
    if (TEXTS.length) queue.push({ text: TEXTS[k % TEXTS.length] });
    return queue;
  }
  function startExam(k) {
    k = Math.min(Math.max(0, Number(k) || 0), EXAM_COUNT - 1);
    S = newSession('exam', { queue: examQueue(k), exam: k });
    const queue = S.queue;
    S.mainCount = queue.length;
    renderPlay();
  }

  function current() { return S && S.queue[S.idx]; }

  function heartsHTML() {
    if (S.hearts == null) return '';
    let h = '';
    for (let i = 0; i < 3; i++) h += i < S.hearts ? '♥' : '<span class="lost">♥</span>';
    return '<div class="hearts" aria-label="' + S.hearts + ' Herzen">' + h + '</div>';
  }

  function topBar() {
    const entry = current();
    let count, pct;
    if (S.mode === 'time') {
      count = S.correctCount + ' ✓';
      pct = Math.max(0, (S.end - Date.now()) / (TIME_LIMIT * 1000) * 100);
    } else if (entry.repeat) {
      const rIdx = S.idx - S.mainCount + 1;
      const rTot = S.queue.length - S.mainCount;
      count = 'W ' + rIdx + '/' + rTot;
      pct = 100;
    } else {
      count = (S.idx + 1) + '/' + S.mainCount;
      pct = S.idx / S.mainCount * 100;
    }
    return '<div class="play-top">' +
      '<button class="icon-btn" data-act="quit" aria-label="Beenden" title="Beenden">✕</button>' +
      '<div class="bar"><div id="pbar" style="width:' + pct + '%"></div></div>' +
      '<div class="count">' + count + '</div>' +
      (S.mode === 'time' ? '<div class="timer" id="timer">' + Math.max(0, Math.ceil((S.end - Date.now()) / 1000)) + ' s</div>' : heartsHTML()) +
      '</div>';
  }

  function modeLabel() {
    return { round: 'Runde', mistakes: 'Meine Fehler', time: 'Zeitmodus', exam: 'Probe-Schularbeit' }[S.mode];
  }

  function promptHTML(p) {
    return esc(p).replace(/_{3,}/g, '<span class="blank"></span>');
  }

  const INPUT_ATTRS = 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="go"';

  function renderPlay() {
    const entry = current();
    if (!entry) { endSession(); return; }
    if (entry.text) { renderTextTask(entry.text, S.mode === 'exam' ? 'exam' : 'round'); return; }
    const q = entry.q;
    S.checked = false; S.hintUsed = false; S.emptyTries = 0;
    const w = WORLD[q.world] || WORLD.texts;
    const exam = S.mode === 'exam';
    let input;
    if (q.type === 'verb3') {
      input = '<div class="verb-fields">' +
        '<label>V2 · past simple<input class="answer-input" id="ans0" ' + INPUT_ATTRS + ' aria-label="V2"></label>' +
        '<label>V3 · past participle<input class="answer-input" id="ans1" ' + INPUT_ATTRS + ' aria-label="V3"></label></div>';
    } else if (q.type === 'sentence') {
      input = '<textarea class="answer-input" id="ans0" rows="2" data-enter ' + INPUT_ATTRS + ' aria-label="Ganzer Satz"></textarea>';
    } else {
      input = '<input class="answer-input" id="ans0" ' + INPUT_ATTRS + ' aria-label="Antwort">';
    }
    const instr = q.instr || defaultInstr(q);
    const prompt = q.type === 'verb3'
      ? esc(q.prompt) + (q.de ? ' <span class="muted">(' + esc(q.de) + ')</span>' : '')
      : promptHTML(q.prompt);

    show(
      '<section class="play' + (q.world === 'hard' ? ' hard' : '') + '">' + topBar() +
      '<div class="meta-row"><span class="chip">' + esc(modeLabel()) + '</span><span class="chip">' + esc(w.name) + '</span>' +
      (entry.repeat ? '<span class="chip">Wiederholung</span>' : '') +
      (S.mode !== 'exam' ? '<span class="chip" id="streakChip">Serie ' + S.streak + '</span>' : '') +
      (q.fromText ? '<span class="chip">aus: ' + esc(q.fromText) + '</span>' : '') + '</div>' +
      '<article class="bubble-card q-card" id="qcard">' +
      '<div class="q-kind">' + esc(TYPE_LABEL[q.type] || '') + '</div>' +
      '<p class="q-prompt">' + prompt + '</p>' +
      '<p class="q-instr">' + esc(instr) + '</p>' +
      input +
      '<div class="hint-box" id="hintBox" hidden></div>' +
      '</article>' +
      '<div id="feedback"></div>' +
      '<div class="actions" id="actions">' +
      (exam || S.mode === 'time' || q.world === 'hard' ? '' : '<button class="pill ghost" data-act="hint" id="hintBtn">Hinweis (½ Punkte)</button>') +
      (exam ? '' : '<button class="pill ghost" data-act="rule" data-rule="' + esc(q.rule) + '">Regel ansehen</button>') +
      '<span class="spacer"></span>' +
      '<button class="pill primary" data-act="check" id="mainBtn">' + (exam ? (S.idx === S.queue.length - 1 ? 'Abgeben' : 'Weiter →') : 'Prüfen') + '</button>' +
      '</div></section>'
    );
    onEnter = e => {
      if (q.type === 'verb3' && !S.checked && e.target && e.target.id === 'ans0') {
        const b = document.getElementById('ans1');
        if (!b.value.trim()) { b.focus(); return; }
      }
      if (S.checked) next(); else check();
    };
    focusFirst();
  }

  function defaultInstr(q) {
    if (q.type === 'verb3') return 'Tippe V2 (past simple) und V3 (past participle).';
    if (q.type === 'sentence') return 'Schreib den ganzen Satz richtig.';
    if (/\([^()]*\/[^()]*\)/.test(q.prompt)) return 'Tippe das richtige Wort aus der Klammer.';
    return 'Tippe die fehlende Antwort.';
  }

  function focusFirst() {
    const el = document.getElementById('ans0') || app.querySelector('.gap-input');
    if (el) { try { el.focus({ preventScroll: false }); } catch (e) { el.focus(); } }
  }

  function readInputs() {
    const vals = [];
    for (let i = 0; i < 2; i++) {
      const el = document.getElementById('ans' + i);
      if (el) vals.push(el.value);
    }
    return vals;
  }

  function showHint() {
    if (!S || S.checked) return;
    const q = current().q;
    const box = document.getElementById('hintBox');
    box.innerHTML = hintFor(q);
    box.hidden = false;
    if (!S.hintUsed) { S.hintUsed = true; S.hintsUsed++; }
    const b = document.getElementById('hintBtn');
    if (b) b.disabled = true;
    focusFirst();
  }

  function check() {
    const entry = current();
    const q = entry.q;
    const vals = readInputs();

    if (S.mode === 'exam') {
      S.answers[S.idx] = vals;
      next();
      return;
    }
    if (vals.every(v => !v.trim()) && S.emptyTries === 0) {
      S.emptyTries++;
      toast('Erst tippen! (Nochmal „Prüfen“ zeigt die Lösung.)');
      const card = document.getElementById('qcard');
      card.classList.remove('is-bad'); void card.offsetWidth; card.classList.add('is-bad');
      focusFirst();
      return;
    }

    const r = grade(q, vals);
    r.hint = S.hintUsed;
    S.checked = true;
    onResult(entry, r);

    // visual state
    const card = document.getElementById('qcard');
    card.classList.add(r.correct ? 'is-ok' : 'is-bad');
    app.querySelectorAll('.answer-input').forEach((el, i) => {
      el.readOnly = true;
      const ok = q.type === 'verb3' ? r.parts[i].correct : r.correct;
      el.classList.add(ok ? 'ok' : 'bad');
    });
    document.getElementById('feedback').innerHTML = feedbackHTML(q, r);
    const hb = document.getElementById('hintBtn');
    if (hb) hb.remove();
    const btn = document.getElementById('mainBtn');
    const gameOver = S.mode === 'round' && S.hearts <= 0;
    btn.textContent = gameOver ? 'Ergebnis ansehen' : 'Weiter →';
    btn.dataset.act = 'next';

    const streakChip = document.getElementById('streakChip');
    if (streakChip) streakChip.textContent = 'Serie ' + S.streak;
    const heartsEl = app.querySelector('.hearts');
    if (heartsEl) heartsEl.outerHTML = heartsHTML();

    // keep focus on the input so the mobile keyboard stays and Enter = weiter
    const first = document.getElementById('ans0');
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    const fb = document.getElementById('feedback');
    if (fb && fb.scrollIntoView && window.innerWidth < 720) fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

    if (S.mode === 'time' && r.correct) setTimeout(() => { if (S && S.mode === 'time' && S.checked && current() === entry) next(); }, 700);
  }

  function onResult(entry, r) {
    const q = entry.q;
    S.results.push({ q, r, repeat: !!entry.repeat });
    if (r.correct) {
      let pts = S.hintUsed ? 5 : 10;
      if (entry.repeat) pts = Math.ceil(pts / 2);
      S.xp += pts;
      addXp(q.world in WORLD ? q.world : 'texts', pts);
      S.streak++;
      S.maxStreak = Math.max(S.maxStreak, S.streak);
      if (S.streak > P.bestStreak) P.bestStreak = S.streak;
      if (S.streak >= 10) award('streak10');
      if (S.streak >= 25) award('streak25');
      P.correct[q.world] = (P.correct[q.world] || 0) + 1;
      if (S.mode === 'time') S.correctCount++;
      if (P.mistakes[q.id] && (S.mode === 'mistakes' || !entry.repeat)) {
        delete P.mistakes[q.id];
        P.fixed = (P.fixed || 0) + 1;
        checkXpBadges();
      }
    } else {
      S.streak = 0;
      P.mistakes[q.id] = (P.mistakes[q.id] || 0) + 1;
      if (!entry.repeat) {
        if (S.mode === 'round' && S.hearts > 0) S.hearts--;
        if (S.mode === 'round' || S.mode === 'mistakes') S.repeat.push(q);
      }
    }
    save();
  }

  function next() {
    if (!S) return;
    if (S.mode === 'round' && S.hearts <= 0 && S.checked) { endSession(true); return; }
    S.idx++;
    if (S.idx >= S.queue.length) {
      if (!S.repeatAdded && S.repeat.length && (S.mode === 'round' || S.mode === 'mistakes')) {
        S.repeatAdded = true;
        S.repeat.forEach(q => S.queue.push({ q, repeat: true }));
        toast('Jetzt kommen deine Fehler noch einmal.');
      } else {
        endSession();
        return;
      }
    }
    renderPlay();
  }

  // ---------------------------------------------------------------- feedback
  function diffHTML(ops) {
    let u = '', e = '';
    ops.forEach(o => {
      if (o.t === 'eq') { u += esc(o.a); e += esc(o.b); }
      else if (o.t === 'sub') { u += '<mark class="bad">' + esc(o.a) + '</mark>'; e += '<mark class="good">' + esc(o.b) + '</mark>'; }
      else if (o.t === 'ins') { u += '<mark class="bad">' + esc(o.a) + '</mark>'; }
      else { u += '<mark class="miss">_</mark>'; e += '<mark class="good">' + esc(o.b) + '</mark>'; }
    });
    return '<div class="diff"><div><span class="lbl">Du:</span>' + u + '</div><div><span class="lbl">Richtig:</span>' + e + '</div></div>';
  }

  function partHTML(label, r) {
    if (r.correct) return '<div class="fb-compare">' + label + '<strong>' + esc(r.expected) + '</strong> ✓</div>';
    return '<div class="fb-compare">' + label + (r.user ? '<s>' + esc(r.user) + '</s><span class="arrow">→</span>' : '') +
      '<strong>' + esc(r.expected) + '</strong></div>' +
      (r.near ? diffHTML(r.diff) : '') +
      (r.msg ? '<p class="fb-why"><span class="fb-label">Warum falsch?</span> ' + esc(r.msg) + '</p>' : '');
  }

  function altAnswers(q, r) {
    if (q.type === 'verb3') {
      const alts = [];
      q.answer.forEach(a => { if (a.length > 1) alts.push(a.join(' / ')); });
      return alts.length ? '<p class="small muted">Auch richtig: ' + esc(alts.join(' · ')) + '</p>' : '';
    }
    const others = q.answer.filter(a => baseNorm(a) !== baseNorm(r.expected));
    return others.length ? '<p class="small muted">Auch richtig: ' + esc(others.slice(0, 4).join(' · ')) + '</p>' : '';
  }

  function feedbackHTML(q, r, opts) {
    opts = opts || {};
    const cls = r.correct ? 'ok' : (r.near ? 'near' : 'bad');
    const head = r.correct ? (r.hint ? 'Richtig! (mit Hinweis: ½ Punkte)' : pickPraise())
      : (r.near ? 'Fast! Rechtschreibung prüfen' : (r.empty ? 'Keine Antwort' : 'Leider falsch'));
    const icon = r.correct ? '✓' : (r.near ? '!' : '✕');
    let body = '';
    if (q.type === 'verb3') {
      body += partHTML('V2: ', r.parts[0]) + partHTML('V3: ', r.parts[1]);
    } else if (!r.correct) {
      body += partHTML('', r);
    }
    body += '<p><span class="fb-label">' + (r.correct ? 'Warum richtig?' : 'Die Regel:') + '</span> ' + esc(q.why) + '</p>';
    if (q.de && q.type !== 'verb3') body += '<p class="small muted">Deutsch: ' + esc(q.de) + '</p>';
    body += altAnswers(q, r);
    if (!r.correct && !opts.noRule) body += ruleCard(q.rule, true);
    return '<div class="bubble ' + cls + '"><div class="fb-head"><span class="fb-icon">' + icon + '</span>' + esc(head) + '</div>' + body + '</div>';
  }
  const PRAISE = ['Richtig!', 'Super!', 'Genau!', 'Perfekt!', 'Stark!', 'Bravo!'];
  function pickPraise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

  // ---------------------------------------------------------------- texts
  function renderTextsList(hard) {
    S = null; onEnter = null;
    let html = hard
      ? '<div class="section-title"><h2>Super Hard Texte</h2><button class="pill small ghost" data-act="home">← Start</button></div>' +
        '<p class="muted">Die schwersten Texte: alle Zeitformen, Wortbildung mit Vor- und Nachsilben und Lücken ganz ohne Hinweis.</p><div class="bubble-card hard-list">'
      : '<div class="section-title"><h2>Language in Use</h2><button class="pill small ghost" data-act="home">← Start</button></div>' +
        '<p class="muted">Kurze Texte über Familie, Freundschaft und Schule. Jede Lücke ist ein Eingabefeld. Nach „Prüfen“ wird jede Lücke grün oder rot – mit Erklärung.</p>' +
        '<div class="bubble-card">';
    (hard ? HARD_TEXTS : TEXTS).forEach(t => {
      const done = P.textsDone[t.id];
      html += '<div class="list-row"><div><h3>' + esc(t.title) + '</h3><p>' + esc(t.topic) + ' · ' + t.gaps.length + ' Lücken' +
        (done != null ? ' · Bestes Ergebnis: ' + done + '/' + t.gaps.length : '') + '</p></div>' +
        '<button class="pill small primary" data-act="text" data-id="' + esc(t.id) + '">Start</button></div>';
    });
    html += '</div>';
    show(html);
  }

  function startText(id) {
    const t = ALL_TEXTS.find(x => x.id === id);
    if (!t) return;
    S = newSession('text', { queue: [{ text: t }], mainCount: 1 });
    renderTextTask(t, 'solo');
  }

  function renderTextTask(t, mode) {
    const inExam = mode === 'exam';
    S.checked = false; S.emptyTries = 0;
    const parts = textParts(t);
    let body = '';
    parts.forEach((p, i) => {
      body += esc(p).replace(/\n\n/g, '</p><p>');
      if (i < parts.length - 1) {
        const len = Math.max(6, Math.max.apply(null, t.gaps[i].a.map(a => a.length)) + 2);
        body += '<span class="gap-wrap"><span class="gap-num">' + (i + 1) + '</span><input class="gap-input" data-gap="' + i + '" ' +
          INPUT_ATTRS + ' style="width:' + Math.min(len, 22) + 'ch" aria-label="Lücke ' + (i + 1) + '"></span>';
      }
    });
    const top = mode !== 'solo' ? topBar() + '<div class="meta-row"><span class="chip">' + esc(modeLabel()) + '</span><span class="chip">' + (t.hard ? 'Super Hard ' : '') + 'Text</span></div>'
      : '<div class="play-top"><button class="icon-btn" data-act="' + (t.hard ? 'hard-texts' : 'texts') + '" aria-label="Zurück">←</button><div class="bar"><div style="width:0%"></div></div><div class="count">' + t.gaps.length + ' Lücken</div></div>';
    show('<section class="play' + (t.hard ? ' hard' : '') + '">' + top +
      '<article class="bubble-card q-card" id="qcard"><div class="q-kind">' + esc(t.topic) + ' · ' + (t.hard ? 'Super Hard Text' : 'Language in Use') + '</div>' +
      '<h2>' + esc(t.title) + '</h2>' +
      '<p class="q-instr">' + esc(t.instr || 'Tippe in jede Lücke die richtige Form des Wortes in Klammern bzw. das fehlende Wort (Präposition, Linking word …).') + '</p>' +
      '<div class="text-body"><p>' + body + '</p></div></article>' +
      '<div id="feedback"></div>' +
      '<div class="actions" id="actions"><span class="spacer"></span><button class="pill primary" id="mainBtn" data-act="' +
      (inExam ? 'exam-text' : 'check-text') + '">' + (inExam ? 'Abgeben' : 'Prüfen') + '</button></div></section>');
    onEnter = e => {
      const inputs = Array.from(app.querySelectorAll('.gap-input'));
      if (S.checked) { if (mode === 'round') next(); else textNext(t); return; }
      const idx = inputs.indexOf(e.target);
      const nextEmpty = inputs.find((el, k) => k > idx && !el.value.trim());
      if (nextEmpty) { nextEmpty.focus(); return; }
      if (idx >= 0 && idx < inputs.length - 1) { inputs[idx + 1].focus(); return; }
      if (inExam) submitExamText(t); else checkText(t);
    };
    focusFirst();
  }

  function gradeText(t, vals) {
    return t.gaps.map((g, i) => {
      const q = QMAP[t.id + '#' + (i + 1)];
      const r = evaluate(q, vals[i]);
      return { q, r };
    });
  }

  function textFeedbackHTML(results) {
    return '<div class="gap-list">' + results.map((x, i) => {
      const r = x.r, q = x.q;
      const cls = r.correct ? 'ok' : (r.near ? 'near' : 'bad');
      let h = '<div class="gap-fb ' + cls + '"><div class="fb-compare"><span class="gap-num">' + (i + 1) + '</span> ';
      if (r.correct) h += '<strong>' + esc(r.expected) + '</strong> ✓';
      else h += (r.user ? '<s>' + esc(r.user) + '</s><span class="arrow">→</span>' : '') + '<strong>' + esc(r.expected) + '</strong>' + (r.near ? ' · <b>Fast! Rechtschreibung prüfen</b>' : '');
      h += '</div>';
      if (r.near) h += diffHTML(r.diff);
      if (!r.correct && r.msg && !r.near) h += '<p><span class="fb-label">Warum falsch?</span> ' + esc(r.msg) + '</p>';
      h += '<p>' + esc(q.why) + '</p>';
      if (!r.correct && RULES[q.rule]) h += '<button class="pill small ghost" data-act="rule" data-rule="' + esc(q.rule) + '">Regel: ' + esc(RULES[q.rule].title) + '</button>';
      return h + '</div>';
    }).join('') + '</div>';
  }

  function checkText(t) {
    if (S.checked) return;
    const inputs = Array.from(app.querySelectorAll('.gap-input'));
    const vals = inputs.map(el => el.value);
    if (vals.every(v => !v.trim()) && S.emptyTries === 0) {
      S.emptyTries++;
      toast('Erst die Lücken ausfüllen! (Nochmal „Prüfen“ zeigt die Lösung.)');
      return;
    }
    S.checked = true;
    const res = gradeText(t, vals);
    let ok = 0;
    res.forEach((x, i) => {
      const el = inputs[i];
      el.readOnly = true;
      el.classList.add(x.r.correct ? 'ok' : (x.r.near ? 'near' : 'bad'));
      if (x.r.correct) {
        ok++;
        if (P.mistakes[x.q.id]) { delete P.mistakes[x.q.id]; P.fixed = (P.fixed || 0) + 1; }
      } else {
        P.mistakes[x.q.id] = (P.mistakes[x.q.id] || 0) + 1;
      }
    });
    const pts = ok * 5;
    addXp(t.hard ? 'hard' : 'texts', pts);
    P.textsDone[t.id] = Math.max(P.textsDone[t.id] || 0, ok);
    if (ok === t.gaps.length) award('text-pro');
    checkXpBadges();
    save();
    const card = document.getElementById('qcard');
    card.classList.add(ok === t.gaps.length ? 'is-ok' : 'is-bad');
    const inRound = S.mode === 'round';
    if (inRound) {
      // the whole text counts as one task: passed with at least 80 % of the gaps
      const passed = ok >= Math.ceil(t.gaps.length * 0.8);
      S.results.push({ q: { id: t.id, world: 'hard', type: 'text', prompt: t.title, why: '', answer: [] }, r: { correct: passed }, textRes: res, repeat: false });
      S.xp += pts;
      if (passed) { S.streak++; S.maxStreak = Math.max(S.maxStreak, S.streak); if (S.streak > P.bestStreak) P.bestStreak = S.streak; }
      else { S.streak = 0; if (S.hearts > 0) S.hearts--; }
      save();
      const heartsEl = app.querySelector('.hearts');
      if (heartsEl) heartsEl.outerHTML = heartsHTML();
    } else {
      const bar = app.querySelector('.play-top .bar > div');
      if (bar) bar.style.width = Math.round(ok / t.gaps.length * 100) + '%';
      app.querySelector('.play-top .count').textContent = ok + '/' + t.gaps.length;
    }
    document.getElementById('feedback').innerHTML =
      '<div class="bubble ' + (ok === t.gaps.length ? 'ok' : (ok >= t.gaps.length / 2 ? 'near' : 'bad')) + '"><div class="fb-head"><span class="fb-icon">' +
      (ok === t.gaps.length ? '✓' : '!') + '</span>' + ok + ' von ' + t.gaps.length + ' Lücken richtig · +' + pts + ' XP</div>' +
      textFeedbackHTML(res) + '</div>';
    if (inRound) {
      const over = S.hearts <= 0;
      document.getElementById('actions').innerHTML = '<span class="spacer"></span><button class="pill primary" data-act="next" data-enter>' +
        (over ? 'Ergebnis ansehen' : 'Weiter →') + '</button>';
      onEnter = () => next();
      return;
    }
    const list = t.hard ? HARD_TEXTS : TEXTS;
    const idx = list.indexOf(t);
    const nxt = list[(idx + 1) % list.length];
    document.getElementById('actions').innerHTML =
      '<button class="pill ghost" data-act="text" data-id="' + esc(t.id) + '">Nochmal</button>' +
      '<button class="pill ghost" data-act="' + (t.hard ? 'hard-texts' : 'texts') + '">Alle Texte</button><span class="spacer"></span>' +
      '<button class="pill primary" data-act="text" data-id="' + esc(nxt.id) + '" data-enter>Nächster Text →</button>';
    onEnter = () => startText(nxt.id);
    const first = inputs[0];
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }
  function textNext(t) {
    const list = t.hard ? HARD_TEXTS : TEXTS;
    const idx = list.indexOf(t);
    startText(list[(idx + 1) % list.length].id);
  }

  function submitExamText(t) {
    const inputs = Array.from(app.querySelectorAll('.gap-input'));
    S.answers[S.idx] = inputs.map(el => el.value);
    next();
  }

  // ---------------------------------------------------------------- end screens
  function endSession(gameOver) {
    stopTimer();
    if (!S) { renderHome(); return; }
    if (S.mode === 'exam') { renderExamResult(); return; }
    const s = S;
    onEnter = null;
    const first = s.results.filter(x => !x.repeat);
    const firstOk = first.filter(x => x.r.correct).length;
    const wrongs = first.filter(x => !x.r.correct);
    let stars = 0;
    if (s.mode === 'round' && !gameOver) {
      const n = first.length || 1;
      const pct = firstOk / n;
      stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
      const rk = roundKey(s.world, s.round);
      P.roundStars[rk] = Math.max(P.roundStars[rk] || 0, stars);
      checkXpBadges();
      P.rounds = (P.rounds || 0) + 1;
      award('first');
      if (firstOk === s.mainCount && s.mainCount >= 10) award('perfect');
      if (s.hintsUsed === 0 && firstOk >= 8) award('nohints');
    }
    if (s.mode === 'time') {
      if (s.correctCount > (P.timeBest || 0)) P.timeBest = s.correctCount;
      if (s.correctCount >= 10) award('speed');
    }
    save();

    let title;
    if (gameOver) title = 'Keine Herzen mehr!';
    else if (s.mode === 'time') title = 'Zeit ist um!';
    else if (stars === 3) title = 'Ausgezeichnet!';
    else if (stars === 2) title = 'Gut gemacht!';
    else if (s.mode === 'mistakes') title = 'Fehler-Training fertig';
    else title = 'Runde beendet';

    let html = '<section class="bubble-card end-hero"><h1>' + esc(title) + '</h1>';
    if (s.mode === 'round') html += '<div class="big-stars">' + starsHTML(stars) + '</div>';
    html += '<div class="stat-row">' +
      (s.mode === 'time'
        ? '<div class="stat"><b>' + s.correctCount + '</b><span>richtig in 60 s</span></div><div class="stat"><b>' + (P.timeBest || 0) + '</b><span>Rekord</span></div>'
        : '<div class="stat"><b>' + firstOk + '/' + first.length + '</b><span>beim 1. Versuch</span></div>') +
      '<div class="stat"><b>+' + s.xp + '</b><span>XP</span></div>' +
      '<div class="stat"><b>' + s.maxStreak + '</b><span>beste Serie</span></div>' +
      (s.mode === 'round' ? '<div class="stat"><b>' + s.hearts + '</b><span>Herzen übrig</span></div>' : '') +
      '</div>';
    if (gameOver) html += '<p class="muted">Du hast 3 Fehler gemacht. Schau dir die Erklärungen an und probier es nochmal!</p>';
    html += '<div class="actions" style="justify-content:center">' +
      '<button class="pill ghost" data-act="home">Startseite</button>' +
      (wrongs.length ? '<button class="pill ghost" data-act="practice-these">Fehler üben (' + wrongs.length + ')</button>' : '') +
      (s.mode === 'round' && s.round < ROUNDS[s.world].length - 1
        ? '<button class="pill ghost" data-act="again">Nochmal</button><button class="pill primary" data-act="round" data-world="' + s.world + '" data-round="' + (s.round + 1) + '" data-enter>Runde ' + (s.round + 2) + ' →</button>'
        : '<button class="pill primary" data-act="again" data-enter>Nochmal</button>') +
      '</div></section>';

    if (wrongs.length) {
      html += '<div class="section-title"><h2>Deine Fehler</h2><span class="muted small">mit Erklärung</span></div>';
      wrongs.forEach(x => {
        html += x.textRes
          ? '<div class="bubble-card review-item"><div class="q-kind">Super Hard Text · ' + esc(x.q.prompt) + ' · ' + x.textRes.filter(y => y.r.correct).length + '/' + x.textRes.length + '</div>' + textFeedbackHTML(x.textRes) + '</div>'
          : reviewItem(x.q, x.r);
      });
    } else if (first.length) {
      html += '<p class="muted" style="text-align:center;margin-top:20px">Keine Fehler – stark!</p>';
    }
    lastSession = { mode: s.mode, world: s.world, round: s.round, wrongIds: [].concat.apply([], wrongs.map(x => (x.textRes ? x.textRes.filter(y => !y.r.correct).map(y => y.q.id) : [x.q.id]))) };
    S = null;
    show(html);
    onEnter = () => {
      if (lastSession.mode === 'round' && lastSession.round < ROUNDS[lastSession.world].length - 1) startRound(lastSession.world, lastSession.round + 1);
      else again();
    };
  }
  let lastSession = null;

  function reviewItem(q, r) {
    const prompt = q.type === 'verb3' ? esc(q.prompt) + (q.de ? ' <span class="muted">(' + esc(q.de) + ')</span>' : '') + ' → V2 / V3' : promptHTML(q.prompt);
    return '<div class="bubble-card review-item"><div class="q-kind">' + esc((WORLD[q.world] || WORLD.texts).name) + '</div>' +
      '<div class="review-q">' + prompt + '</div>' + feedbackHTML(q, r) + '</div>';
  }

  function again() {
    if (!lastSession) { renderHome(); return; }
    const m = lastSession.mode;
    if (m === 'round') startRound(lastSession.world, lastSession.round);
    else if (m === 'mistakes') startMistakes();
    else if (m === 'time') startTime();
    else if (m === 'exam') startExam(lastSession.exam);
    else renderHome();
  }

  function gradeLabel(pct) {
    if (pct >= 90) return [1, 'Sehr gut'];
    if (pct >= 80) return [2, 'Gut'];
    if (pct >= 65) return [3, 'Befriedigend'];
    if (pct >= 50) return [4, 'Genügend'];
    return [5, 'Nicht genügend'];
  }

  function renderExamResult() {
    const s = S;
    onEnter = null;
    let points = 0, max = 0;
    const review = [];
    s.queue.forEach((entry, i) => {
      const vals = s.answers[i] || [];
      if (entry.text) {
        const res = gradeText(entry.text, vals);
        res.forEach(x => {
          max += 1;
          if (x.r.correct) points += 1;
          else P.mistakes[x.q.id] = (P.mistakes[x.q.id] || 0) + 1;
        });
        review.push({ text: entry.text, res });
      } else {
        const q = entry.q;
        const r = grade(q, vals.length ? vals : ['']);
        max += 1;
        points += r.score;
        if (!r.correct) P.mistakes[q.id] = (P.mistakes[q.id] || 0) + 1;
        else if (P.mistakes[q.id]) { delete P.mistakes[q.id]; P.fixed = (P.fixed || 0) + 1; }
        review.push({ q, r });
      }
    });
    const pct = max ? Math.round(points / max * 100) : 0;
    const [note, word] = gradeLabel(pct);
    if (P.examBest == null || note < P.examBest) P.examBest = note;
    const ek = String(s.exam || 0);
    if (P.examGrades[ek] == null || note < P.examGrades[ek]) P.examGrades[ek] = note;
    if (note <= 2) award('exam');
    addXp('texts', Math.round(points * 5));
    checkXpBadges();
    save();

    let html = '<section class="bubble-card end-hero"><div class="q-kind">Probe-Schularbeit</div>' +
      '<div class="muted">Probe-Schularbeit ' + ((s.exam || 0) + 1) + '</div><div class="grade">' + note + '</div><h1>' + esc(word) + '</h1>' +
      '<div class="stat-row"><div class="stat"><b>' + (Math.round(points * 10) / 10) + '/' + max + '</b><span>Punkte</span></div>' +
      '<div class="stat"><b>' + pct + ' %</b><span>Prozent</span></div></div>' +
      '<p class="muted small">Notenschlüssel: ab 90 % = 1 · ab 80 % = 2 · ab 65 % = 3 · ab 50 % = 4 · darunter 5</p>' +
      '<div class="actions" style="justify-content:center"><button class="pill ghost" data-act="home">Startseite</button>' +
      '<button class="pill ghost" data-act="mistakes">Fehler üben</button>' +
      '<button class="pill primary" data-act="again" data-enter>Nochmal</button></div></section>' +
      '<div class="section-title"><h2>Auswertung</h2><span class="muted small">jede Aufgabe mit Erklärung</span></div>';
    review.forEach((x, i) => {
      if (x.text) {
        const ok = x.res.filter(y => y.r.correct).length;
        html += '<div class="bubble-card review-item"><div class="q-kind">Text · ' + esc(x.text.title) + ' · ' + ok + '/' + x.res.length + '</div>' +
          textFeedbackHTML(x.res) + '</div>';
      } else if (x.r.correct) {
        html += '<div class="bubble-card review-item"><div class="q-kind">' + (i + 1) + ' · richtig</div>' +
          '<div class="review-q">' + (x.q.type === 'verb3' ? esc(x.q.prompt) : promptHTML(x.q.prompt)) + '</div>' + feedbackHTML(x.q, x.r) + '</div>';
      } else {
        html += reviewItem(x.q, x.r).replace('<div class="q-kind">', '<div class="q-kind">' + (i + 1) + ' · ');
      }
    });
    lastSession = { mode: 'exam', exam: s.exam || 0 };
    S = null;
    show(html);
    onEnter = () => again();
  }

  // ---------------------------------------------------------------- cheat sheet
  function renderCheat(worldId) {
    S = null; onEnter = null;
    worldId = WORLD[worldId] && worldId !== 'texts' ? worldId : 'adj-adv';
    let html = '<div class="section-title"><h2>Spickzettel</h2><button class="pill small ghost" data-act="home">← Start</button></div>' +
      '<div class="tabs">' + WORLDS.map(w => '<button class="pill small ' + (w.id === worldId ? 'active' : 'ghost') + '" data-act="cheat" data-world="' + w.id + '">' + esc(w.name) + '</button>').join('') + '</div>' +
      '<div class="grid">';
    Object.keys(RULES).forEach(id => {
      const r = RULES[id];
      if (r.world !== worldId) return;
      html += '<article class="bubble-card cheat-card" id="rule-' + esc(id) + '">' + cheatCardInner(r) + '</article>';
    });
    html += '</div>';
    if (worldId === 'vocab' && VOCAB.length) {
      html += '<div class="section-title"><h2>Wortliste Units 1–3</h2><span class="muted small">' + VOCAB.length + ' Wörter</span></div>' +
        '<div class="bubble-card"><input class="search" id="vocabSearch" placeholder="Suchen … (Englisch oder Deutsch)" ' + INPUT_ATTRS + '>' +
        '<table class="vocab-table"><thead><tr><th>English</th><th>Deutsch</th></tr></thead><tbody id="vocabBody">' + vocabRows('') + '</tbody></table></div>';
    }
    if (worldId === 'past') {
      const verbs = QUESTIONS.filter(q => q.type === 'verb3');
      html += '<div class="section-title"><h2>Irregular verbs</h2><span class="muted small">V1 – V2 – V3</span></div>' +
        '<div class="bubble-card"><table class="vocab-table"><thead><tr><th>V1</th><th>V2</th><th>V3</th><th>Deutsch</th></tr></thead><tbody>' +
        verbs.map(q => '<tr><td>' + esc(q.prompt) + '</td><td>' + esc(q.answer[0].join(' / ')) + '</td><td>' + esc(q.answer[1].join(' / ')) + '</td><td>' + esc(q.de || '') + '</td></tr>').join('') +
        '</tbody></table></div>';
    }
    show(html);
  }
  function vocabRows(filter) {
    const f = filter.toLowerCase().trim();
    return VOCAB.filter(v => !f || v.en.toLowerCase().indexOf(f) >= 0 || v.de.toLowerCase().indexOf(f) >= 0)
      .map(v => '<tr><td><b>' + esc(v.en) + '</b>' + (v.def ? '<br><span class="small muted">' + esc(v.def) + '</span>' : '') + '</td><td>' + esc(v.de) + '</td></tr>').join('');
  }

  // ---------------------------------------------------------------- round & exam pickers
  function renderRounds(world) {
    S = null; onEnter = null;
    const w = WORLD[world];
    let html = '<div class="section-title"><h2>' + esc(w.name) + '</h2><button class="pill small ghost" data-act="home">← Start</button></div>' +
      '<p class="muted">Alle Runden sind für jeden gleich – vergleich deine Sterne mit deinen Freunden!</p><div class="grid-3">';
    ROUNDS[world].forEach((r, i) => {
      const st = P.roundStars[roundKey(world, i)] || 0;
      html += '<button class="bubble-card mode-card" data-act="round" data-world="' + world + '" data-round="' + i + '"><strong>Runde ' + (i + 1) +
        '</strong><span class="stars">' + starsHTML(st) + '</span><span>' + r.length + ' Aufgaben</span></button>';
    });
    show(html + '</div>');
  }
  function renderExams() {
    S = null; onEnter = null;
    let html = '<div class="section-title"><h2>Probe-Schularbeiten</h2><button class="pill small ghost" data-act="home">← Start</button></div>' +
      '<p class="muted">30 Aufgaben aus allen Welten + 1 Text. Feedback und Note gibt es erst am Ende. Jede Probe-Schularbeit ist für alle gleich.</p><div class="grid-3">';
    for (let k = 0; k < EXAM_COUNT; k++) {
      const g = P.examGrades[String(k)];
      html += '<button class="bubble-card mode-card" data-act="exam" data-exam="' + k + '"><strong>Probe-Schularbeit ' + (k + 1) +
        '</strong><span>Text: ' + esc(TEXTS[k % TEXTS.length].title) + '</span><span>' + (g != null ? 'Beste Note: ' + g : 'Noch nicht geschrieben') + '</span></button>';
    }
    show(html + '</div>');
  }

  // ---------------------------------------------------------------- badges screen
  function renderBadges() {
    S = null; onEnter = null;
    let html = '<div class="section-title"><h2>Abzeichen</h2><button class="pill small ghost" data-act="home">← Start</button></div><div class="grid-3">';
    BADGES.forEach(b => {
      const got = !!P.badges[b.id];
      html += '<div class="bubble-card badge ' + (got ? '' : 'locked') + '"><div class="b-icon">' + esc(b.icon) + '</div><strong>' + esc(b.name) +
        '</strong><span>' + esc(b.desc) + '</span></div>';
    });
    html += '</div>';
    show(html);
  }

  // ---------------------------------------------------------------- writing
  function renderWritingList() {
    S = null; onEnter = null;
    let html = '<div class="section-title"><h2>Schreibaufgaben</h2><button class="pill small ghost" data-act="home">← Start</button></div>' +
      '<p class="muted">Schreib selbst. Die Checkliste sucht automatisch nach wichtigen Phrasen. Es gibt keine KI-Bewertung – vergleiche am Ende mit der Musterlösung.</p><div class="bubble-card">';
    WRITING.forEach(w => {
      const d = P.drafts[w.id];
      const words = d ? countWords(d) : 0;
      html += '<div class="list-row"><div><h3>' + esc(w.title) + '</h3><p>' + esc(w.kind) + ' · ' + w.minWords + '–' + w.maxWords + ' Wörter' +
        (words ? ' · Entwurf: ' + words + ' Wörter' : '') + '</p></div><button class="pill small primary" data-act="write" data-id="' + esc(w.id) + '">Schreiben</button></div>';
    });
    html += '</div>';
    show(html);
  }

  function countWords(s) { return (String(s).trim().match(/[A-Za-zÄÖÜäöüß0-9'’-]+/g) || []).length; }

  const CONTRACTIONS = /\b(i'm|i've|i'd|i'll|you're|you've|you'll|you'd|we're|we've|we'll|we'd|they're|they've|they'll|they'd|he's|she's|it's|that's|there's|what's|let's|don't|doesn't|didn't|can't|couldn't|won't|wouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|shouldn't|mustn't|needn't)\b/gi;

  function renderWriting(id) {
    const w = WRITING.find(x => x.id === id);
    if (!w) return;
    S = null; onEnter = null;
    const draft = P.drafts[w.id] || '';
    const html = '<div class="section-title"><h2>' + esc(w.title) + '</h2><button class="pill small ghost" data-act="writing">← Alle Aufgaben</button></div>' +
      '<div class="task-bubble">' + w.task + '</div>' +
      '<div class="writing-grid"><div>' +
      '<textarea class="writing-area" id="writeArea" ' + INPUT_ATTRS + ' placeholder="Schreib hier deinen Text …">' + esc(draft) + '</textarea>' +
      '<div class="wordcount"><span id="wc">0 Wörter</span><span class="muted">Ziel: ' + w.minWords + '–' + w.maxWords + '</span></div>' +
      '<div class="bar"><div id="wcBar" style="width:0%"></div></div>' +
      '<div id="warnings"></div>' +
      '<details class="model"><summary>Musterlösung anzeigen</summary><div class="bubble-card model-text">' + esc(w.model) + '</div></details>' +
      '</div><aside class="bubble-card"><h3>Checkliste</h3><p class="small muted" id="checkScore"></p><ul class="check-list" id="checkList"></ul>' +
      (w.tips ? '<div class="warn-box" style="background:var(--surface-2);border-color:var(--line)"><b>Nützliche Phrasen</b><br>' + w.tips.map(esc).join('<br>') + '</div>' : '') +
      '</aside></div>';
    show(html);
    const area = document.getElementById('writeArea');
    let saveT = null;
    const update = () => {
      const text = area.value;
      const norm = text.replace(/[‘’´`]/g, "'");
      const n = countWords(text);
      document.getElementById('wc').textContent = n + ' Wörter';
      document.getElementById('wcBar').style.width = Math.min(100, Math.round(n / w.minWords * 100)) + '%';
      let done = 0;
      document.getElementById('checkList').innerHTML = w.checks.map(c => {
        const ok = c.patterns.some(p => new RegExp(p, 'i').test(norm));
        if (ok) done++;
        return '<li class="' + (ok ? 'done' : '') + '"><span class="tick">' + (ok ? '✓' : '') + '</span><span><b>' + esc(c.label) + '</b>' +
          (c.example ? '<small>z. B. ' + esc(c.example) + '</small>' : '') + '</span></li>';
      }).join('');
      document.getElementById('checkScore').textContent = done + ' von ' + w.checks.length + ' erfüllt';
      const warns = [];
      if (w.formal) {
        const found = norm.match(CONTRACTIONS);
        if (found) warns.push('<b>Achtung, Kurzformen!</b> In einer formellen E-Mail schreibt man Langformen: ' +
          esc(Array.from(new Set(found.map(x => x.toLowerCase()))).join(', ')) + ' → z. B. „I am“, „do not“.');
        if (/dear sir or madam/i.test(norm) && /yours sincerely/i.test(norm)) warns.push('Nach „Dear Sir or Madam“ endet man mit <b>Yours faithfully</b>.');
        if (/dear (mr|mrs|ms|miss)\.? \w+/i.test(norm) && /yours faithfully/i.test(norm)) warns.push('Wenn du den Namen kennst (Dear Mr …), endet man mit <b>Yours sincerely</b>.');
        if (/\b(hi|hey|hello)\b[ ,]/i.test(norm.slice(0, 40))) warns.push('„Hi/Hey“ ist zu informell – schreib „Dear …“.');
        if (/!{2,}|\b(gonna|wanna|cool|awesome|guys)\b/i.test(norm)) warns.push('Vermeide umgangssprachliche Wörter (cool, gonna, !!) in formellen Texten.');
      }
      if (n > w.maxWords) warns.push('Dein Text ist länger als ' + w.maxWords + ' Wörter – in der Schularbeit eventuell kürzen.');
      document.getElementById('warnings').innerHTML = warns.map(x => '<div class="warn-box">' + x + '</div>').join('');
      if (done === w.checks.length && n >= w.minWords) award('writer');
      clearTimeout(saveT);
      saveT = setTimeout(() => { P.drafts[w.id] = text; save(); }, 400);
    };
    area.addEventListener('input', update);
    update();
    area.focus();
  }

  // ---------------------------------------------------------------- events
  // In-page confirmation (native confirm() is blocked in some embedded viewers)
  let pendingConfirm = null;
  function askConfirm(msg, yesLabel, onYes) {
    pendingConfirm = onYes;
    openModal('<h3>' + esc(msg) + '</h3><div class="actions">' +
      '<button class="pill ghost" data-act="close-modal">Abbrechen</button>' +
      '<button class="pill primary" data-act="confirm-yes">' + esc(yesLabel) + '</button></div>');
  }

  function quit() {
    const leave = () => { stopTimer(); S = null; renderHome(); };
    if (S && S.results.length && S.mode !== 'text') {
      askConfirm('Runde wirklich beenden? Der Fortschritt dieser Runde geht verloren (XP bleiben).', 'Beenden', leave);
      return;
    }
    leave();
  }

  app.addEventListener('input', e => {
    if (e.target && e.target.id === 'vocabSearch') {
      document.getElementById('vocabBody').innerHTML = vocabRows(e.target.value);
    }
  });

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const act = el.dataset.act;
    switch (act) {
      case 'home': if (S && S.results && S.results.length && S.mode !== 'text') { quit(); } else renderHome(); break;
      case 'theme': toggleTheme(); break;
      case 'round': startRound(el.dataset.world, el.dataset.round); break;
      case 'rounds': renderRounds(el.dataset.world); break;
      case 'exams': renderExams(); break;
      case 'cheat': closeModal(); S = null; renderCheat(el.dataset.world); break;
      case 'rule': openRule(el.dataset.rule); break;
      case 'close-modal': closeModal(); break;
      case 'hint': showHint(); break;
      case 'check': check(); break;
      case 'next': next(); break;
      case 'quit': quit(); break;
      case 'texts': renderTextsList(); break;
      case 'text': startText(el.dataset.id); break;
      case 'check-text': if (S) checkText(current().text); break;
      case 'hard-texts': renderTextsList(true); break;
      case 'exam-text': if (S) submitExamText(current().text); break;
      case 'writing': renderWritingList(); break;
      case 'write': renderWriting(el.dataset.id); break;
      case 'mistakes': startMistakes(); break;
      case 'practice-these': startMistakes(lastSession && lastSession.wrongIds); break;
      case 'again': again(); break;
      case 'exam': startExam(el.dataset.exam); break;
      case 'time': startTime(); break;
      case 'badges': renderBadges(); break;
      case 'reset':
        askConfirm('Wirklich den ganzen Fortschritt (XP, Fehler, Abzeichen, Entwürfe) löschen?', 'Löschen', () => {
          Object.assign(P, defaults());
          save();
          renderHome();
          toast('Fortschritt gelöscht.');
        });
        break;
      case 'confirm-yes': {
        const fn = pendingConfirm;
        pendingConfirm = null;
        closeModal();
        if (fn) fn();
        break;
      }
    }
  });

  function currentTheme() {
    const t = document.documentElement.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function toggleTheme() {
    const t = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    storeSet('leonova.theme', t);
    updateThemeBtn();
  }
  function updateThemeBtn() {
    const b = document.getElementById('themeBtn');
    if (b) b.textContent = currentTheme() === 'dark' ? '☀' : '☾';
  }
  if (!storeGet('leonova.theme') && window.matchMedia) {
    try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeBtn); } catch (e) { /* old browsers */ }
  }

  // expose for testing in the console
  window.LEONOVA = { evaluate, grade, QMAP, P, current: () => (S ? current() : null) };

  updateThemeBtn();
  renderHome();
})();
