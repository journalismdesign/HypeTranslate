/*
 * Littératie du hype — application.
 * Charge contenu/hype-literacy.fr.md, le découpe en modules et gère
 * navigation, exercices interactifs et progression (stockée localement).
 */
(function () {
  'use strict';

  var CONTENT_URL = 'contenu/hype-literacy.fr.md';
  var STORE_KEY = 'synth-hype-literacy';
  var MODULE_RE = /<!--\s*module:\s*([\w-]+)\s*\|\s*(.*?)\s*-->/g;

  var main = document.getElementById('contenu');
  var toc = document.querySelector('.toc');
  var sidebar = document.getElementById('sommaire');
  var menuToggle = document.querySelector('.menu-toggle');
  var progress = document.querySelector('.progress');
  var progressBar = document.querySelector('.progress-bar');
  var modules = [];

  /* ---------- Stockage local (tolérant aux navigateurs qui le bloquent) ---------- */

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  var state = loadState();
  state.lus = state.lus || {};
  state.cases = state.cases || {};

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) { /* stockage indisponible : la page fonctionne sans */ }
  }

  /* ---------- Blocs interactifs ---------- */

  var counter = 0;
  function uid(prefix) { return prefix + '-' + (++counter); }

  var handlers = {
    cartes: function (src, md) {
      var cards = src.split('\n').filter(Boolean).map(function (line) {
        var parts = line.split('::');
        return { recto: parts[0].trim(), verso: (parts[1] || '').trim() };
      });
      return '<div class="cards">' + cards.map(function (c) {
        return '<button type="button" class="card" aria-pressed="false">' +
          '<span class="card-face card-recto">' + md.inline(c.recto) + '<small>Retourner</small></span>' +
          '<span class="card-face card-verso">' + md.inline(c.verso) + '</span>' +
          '</button>';
      }).join('') + '</div>';
    },

    quiz: function (src, md) {
      var blocks = src.split(/\n\s*\n/).filter(function (b) { return b.trim(); });
      return blocks.map(function (block) {
        var id = uid('q');
        var question = '';
        var answers = [];
        var explanation = [];
        block.split('\n').forEach(function (line) {
          var m;
          if ((m = line.match(/^Q:\s*(.*)$/))) question = m[1];
          else if ((m = line.match(/^-\s*\[([ xX])\]\s*(.*)$/))) answers.push({ ok: m[1] !== ' ', text: m[2] });
          else if ((m = line.match(/^>\s?(.*)$/))) explanation.push(m[1]);
        });
        return '<fieldset class="quiz" id="' + id + '">' +
          '<legend><span class="tag">Quiz</span>' + md.inline(question) + '</legend>' +
          '<div class="answers">' + answers.map(function (a) {
            return '<button type="button" class="answer" data-ok="' + a.ok + '">' + md.inline(a.text) + '</button>';
          }).join('') + '</div>' +
          '<p class="feedback" aria-live="polite" hidden></p>' +
          '<p class="explanation" hidden>' + md.inline(explanation.join(' ')) + '</p>' +
          '</fieldset>';
      }).join('');
    },

    hypemetre: function (src, md) {
      var labels = ['Factuel', 'Léger', 'Marqué', 'Hype pur'];
      var rows = src.split('\n').filter(Boolean).map(function (line) {
        var parts = line.split('::').map(function (s) { return s.trim(); });
        return { title: parts[0], score: parseInt(parts[1], 10) || 0, note: parts[2] || '' };
      });
      return '<div class="hypemetre">' + rows.map(function (r) {
        return '<div class="hm-item" data-score="' + r.score + '">' +
          '<p class="hm-title">« ' + md.inline(r.title) + ' »</p>' +
          '<div class="hm-scale" role="group" aria-label="Votre note de hype">' +
          labels.map(function (label, n) {
            return '<button type="button" class="hm-btn" data-value="' + n + '" title="' + label + '">' +
              '<span class="hm-num">' + n + '</span><span class="hm-label">' + label + '</span></button>';
          }).join('') +
          '</div>' +
          '<div class="hm-result" aria-live="polite" hidden>' +
          '<p class="hm-verdict"></p><p>' + md.inline(r.note) + '</p></div>' +
          '</div>';
      }).join('') + '</div>';
    }
  };

  function bindInteractions(root, moduleId) {
    root.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('click', function () {
        var flipped = card.getAttribute('aria-pressed') === 'true';
        card.setAttribute('aria-pressed', String(!flipped));
      });
    });

    root.querySelectorAll('.quiz').forEach(function (quiz) {
      var feedback = quiz.querySelector('.feedback');
      var explanation = quiz.querySelector('.explanation');
      quiz.querySelectorAll('.answer').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var ok = btn.dataset.ok === 'true';
          quiz.querySelectorAll('.answer').forEach(function (b) {
            b.classList.remove('is-wrong');
            if (b.dataset.ok === 'true' && ok) b.classList.add('is-right');
          });
          btn.classList.add(ok ? 'is-right' : 'is-wrong');
          feedback.hidden = false;
          feedback.textContent = ok ? 'Bonne réponse.' : 'Pas tout à fait. Essayez encore, ou lisez l\u2019explication.';
          feedback.className = 'feedback ' + (ok ? 'ok' : 'ko');
          explanation.hidden = false;
        });
      });
    });

    root.querySelectorAll('.hm-item').forEach(function (item) {
      var expected = parseInt(item.dataset.score, 10);
      var result = item.querySelector('.hm-result');
      var verdict = item.querySelector('.hm-verdict');
      item.querySelectorAll('.hm-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var value = parseInt(btn.dataset.value, 10);
          item.querySelectorAll('.hm-btn').forEach(function (b) {
            b.classList.toggle('is-chosen', b === btn);
            b.classList.toggle('is-expected', parseInt(b.dataset.value, 10) === expected);
          });
          var gap = Math.abs(value - expected);
          verdict.textContent = gap === 0
            ? 'Même lecture que la nôtre (' + expected + '/3).'
            : 'Notre lecture : ' + expected + '/3 (écart de ' + gap + ').';
          result.hidden = false;
        });
      });
    });

    root.querySelectorAll('.checklist').forEach(function (list, listIndex) {
      list.querySelectorAll('input[type="checkbox"]').forEach(function (box, boxIndex) {
        var key = moduleId + ':' + listIndex + ':' + boxIndex;
        if (state.cases[key]) box.checked = true;
        box.addEventListener('change', function () {
          if (box.checked) state.cases[key] = true; else delete state.cases[key];
          saveState();
        });
      });
    });
  }

  /* ---------- Découpage du contenu ---------- */

  function parseModules(src) {
    var found = [];
    var match;
    MODULE_RE.lastIndex = 0;
    while ((match = MODULE_RE.exec(src))) {
      found.push({ id: match[1], title: match[2], start: match.index + match[0].length, tagStart: match.index });
    }
    return found.map(function (m, idx) {
      var end = idx + 1 < found.length ? found[idx + 1].tagStart : src.length;
      return { id: m.id, title: m.title, body: src.slice(m.start, end).trim() };
    });
  }

  // Modules comptés dans la progression : tous sauf l'accueil et les crédits.
  function countable() {
    return modules.filter(function (m) { return m.id !== 'accueil' && m.id !== 'credits'; });
  }

  /* ---------- Rendu ---------- */

  function renderToc(currentId) {
    toc.innerHTML = modules.map(function (m) {
      var cls = [];
      if (m.id === currentId) cls.push('is-current');
      if (state.lus[m.id]) cls.push('is-read');
      return '<li class="' + cls.join(' ') + '"><a href="#/' + m.id + '"' +
        (m.id === currentId ? ' aria-current="page"' : '') + '>' +
        MiniMarkdown.escape(m.title) + '</a></li>';
    }).join('');
  }

  function renderProgress() {
    var list = countable();
    var read = list.filter(function (m) { return state.lus[m.id]; }).length;
    var pct = list.length ? Math.round((read / list.length) * 100) : 0;
    progressBar.style.width = pct + '%';
    progress.setAttribute('aria-valuenow', String(pct));
    progress.setAttribute('aria-valuetext', read + ' module(s) sur ' + list.length);
  }

  var endObserver = null;

  function show(id) {
    var index = modules.findIndex(function (m) { return m.id === id; });
    if (index === -1) index = 0;
    var mod = modules[index];
    var prev = modules[index - 1];
    var next = modules[index + 1];

    var html = '<article class="module module-' + mod.id + '">' +
      MiniMarkdown.render(mod.body, handlers);

    if (mod.id === 'accueil' && next) {
      html += '<p class="cta"><a class="button" href="#/' + next.id + '">Commencer le parcours →</a></p>';
    }

    html += '<span class="module-end" aria-hidden="true"></span></article>';
    html += '<nav class="pager" aria-label="Navigation entre modules">' +
      (prev ? '<a class="pager-prev" href="#/' + prev.id + '"><small>Précédent</small>' + MiniMarkdown.escape(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="pager-next" href="#/' + next.id + '"><small>Suivant</small>' + MiniMarkdown.escape(next.title) + '</a>' : '<span></span>') +
      '</nav>';

    main.innerHTML = html;
    bindInteractions(main, mod.id);
    renderToc(mod.id);
    renderProgress();
    document.title = (mod.id === 'accueil' ? '' : mod.title + ' — ') + 'Littératie du hype — Synth';

    // Un module est « lu » quand on atteint sa fin.
    if (endObserver) endObserver.disconnect();
    if ('IntersectionObserver' in window) {
      endObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; }) && !state.lus[mod.id]) {
          state.lus[mod.id] = true;
          saveState();
          renderToc(mod.id);
          renderProgress();
        }
      });
      endObserver.observe(main.querySelector('.module-end'));
    }

    closeMenu();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  function currentId() {
    return location.hash.replace(/^#\/?/, '') || 'accueil';
  }

  /* ---------- Menu mobile et thème ---------- */

  function closeMenu() {
    sidebar.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', function () {
    var open = sidebar.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  var themeToggle = document.querySelector('.theme-toggle');
  if (state.theme) document.documentElement.dataset.theme = state.theme;
  themeToggle.addEventListener('click', function () {
    var dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = state.theme;
    saveState();
  });

  document.querySelector('.reset').addEventListener('click', function () {
    if (!window.confirm('Effacer votre progression et vos cases cochées ?')) return;
    state.lus = {};
    state.cases = {};
    saveState();
    show(currentId());
  });

  /* ---------- Démarrage ---------- */

  fetch(CONTENT_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    })
    .then(function (src) {
      modules = parseModules(src);
      window.addEventListener('hashchange', function () { show(currentId()); });
      show(currentId());
    })
    .catch(function (err) {
      main.innerHTML = '<div class="error"><h1>Contenu introuvable</h1>' +
        '<p>Le fichier <code>' + CONTENT_URL + '</code> n\u2019a pas pu être chargé (' + MiniMarkdown.escape(err.message) + ').</p>' +
        '<p>Si vous ouvrez <code>index.html</code> directement depuis votre disque, le navigateur bloque la lecture du fichier. ' +
        'Lancez un petit serveur local dans le dossier du projet, par exemple <code>python3 -m http.server</code>, ' +
        'puis ouvrez <code>http://localhost:8000</code>.</p></div>';
    });
})();
