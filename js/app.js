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

    section: function (src) {
      var n = parseInt(src, 10) || 0;
      return '<div class="section-num" aria-hidden="true"><span>' + (n < 10 ? '0' : '') + n + '</span></div>';
    },

    note: function (src, md) {
      return '<aside class="note">' + md.render(src) + '</aside>';
    },

    image: function (src, md) {
      return parseFigures(src).map(function (f) { return figure(f, md); }).join('');
    },

    galerie: function (src, md) {
      return '<div class="gallery">' + parseFigures(src).map(function (f) { return figure(f, md); }).join('') + '</div>';
    },

    carrousel: function (src, md) {
      var figs = parseFigures(src);
      return '<div class="carousel" data-index="0">' +
        '<div class="carousel-track">' + figs.map(function (f, i) {
          return '<div class="carousel-slide"' + (i ? ' hidden' : '') + '>' + figure(f, md) + '</div>';
        }).join('') + '</div>' +
        '<div class="carousel-nav">' +
        '<button type="button" class="carousel-prev" aria-label="Image précédente">←</button>' +
        '<span class="carousel-count" aria-live="polite">1 / ' + figs.length + '</span>' +
        '<button type="button" class="carousel-next" aria-label="Image suivante">→</button>' +
        '</div></div>';
    },

    video: function (src, md) {
      var f = fields(src);
      var id = (f.youtube || '').split('?')[0];
      var start = ((f.youtube || '').match(/start=(\d+)/) || [])[1] || '';
      // La vidéo ne se charge qu'au clic : aucune requête vers YouTube avant le consentement du lecteur.
      return '<figure class="video" data-youtube="' + md.escape(id) + '" data-start="' + start + '">' +
        '<button type="button" class="video-play">' +
        '<span class="video-icon" aria-hidden="true">▶</span>' +
        '<span class="video-title">' + md.inline(f.titre || 'Vidéo') + '</span>' +
        '<span class="video-hint">Lire la vidéo — chargement depuis YouTube</span>' +
        '</button>' +
        (f.source ? '<figcaption><a href="' + md.escape(f.source) + '" target="_blank" rel="noopener">Voir sur YouTube</a></figcaption>' : '') +
        '</figure>';
    },

    citation: function (src, md) {
      var parts = src.split(/\n\s*\n/);
      var f = fields(parts.shift());
      return '<figure class="citation">' +
        (f.portrait ? '<img class="citation-portrait" src="' + md.escape(f.portrait) + '" alt="" loading="lazy">' : '') +
        '<blockquote class="citation-text">' + md.render(parts.join('\n\n')) + '</blockquote>' +
        '<figcaption>' + md.inline(f.auteur || '') + '</figcaption>' +
        '</figure>';
    },

    accordeon: function (src, md) {
      var items = [];
      src.split('\n').forEach(function (line) {
        var m = line.match(/^\+\s+(.*)$/);
        if (m) items.push({ title: m[1], body: [] });
        else if (items.length) items[items.length - 1].body.push(line);
      });
      return '<div class="accordion">' + items.map(function (it) {
        return '<details><summary>' + md.inline(it.title) + '</summary>' +
          '<div class="accordion-body">' + md.render(it.body.join('\n')) + '</div></details>';
      }).join('') + '</div>';
    },

    tri: function (src, md) {
      var piles = [];
      var items = [];
      src.split('\n').filter(Boolean).forEach(function (line, p) {
        var parts = line.split('::');
        piles.push(parts[0].trim());
        (parts[1] || '').split('|').forEach(function (w) {
          if (w.trim()) items.push({ text: w.trim(), pile: p });
        });
      });
      shuffle(items);
      return '<div class="sorting">' +
        '<p class="sorting-help">Choisissez une formule, puis la catégorie à laquelle elle appartient.</p>' +
        '<div class="sorting-pool">' + items.map(function (it) {
          return '<button type="button" class="sorting-item" data-pile="' + it.pile + '" aria-pressed="false">' + md.inline(it.text) + '</button>';
        }).join('') + '</div>' +
        '<div class="sorting-piles">' + piles.map(function (title, p) {
          return '<div class="sorting-pile" data-pile="' + p + '">' +
            '<button type="button" class="sorting-target">' + md.inline(title) + '</button>' +
            '<div class="sorting-drop"></div></div>';
        }).join('') + '</div>' +
        '<p class="sorting-feedback" aria-live="polite"></p>' +
        '<button type="button" class="sorting-reset">Recommencer</button>' +
        '</div>';
    },

    'image-annotee': function (src, md) {
      var lines = src.split('\n').filter(Boolean);
      var img = fields(lines.shift()).image || '';
      var points = lines.map(function (line) {
        var parts = line.split('::');
        var xy = parts[0].split(',');
        return { x: parseFloat(xy[0]), y: parseFloat(xy[1]), title: (parts[1] || '').trim(), text: (parts[2] || '').trim() };
      });
      return '<div class="labeled">' +
        '<div class="labeled-stage"><img src="' + md.escape(img) + '" alt="" loading="lazy">' +
        points.map(function (pt, i) {
          return '<button type="button" class="labeled-pin" style="left:' + pt.x + '%;top:' + pt.y + '%" ' +
            'data-index="' + i + '" aria-pressed="false" aria-label="Repère ' + (i + 1) + '">' + (i + 1) + '</button>';
        }).join('') + '</div>' +
        '<div class="labeled-panels">' + points.map(function (pt, i) {
          return '<div class="labeled-panel" data-index="' + i + '" hidden>' +
            '<p class="labeled-num">Repère ' + (i + 1) + ' / ' + points.length + '</p>' +
            '<p class="labeled-title">' + md.inline(pt.title) + '</p>' +
            '<p>' + md.inline(pt.text) + '</p></div>';
        }).join('') +
        '<p class="labeled-empty">Cliquez sur un numéro de l’image pour afficher l’analyse.</p>' +
        '</div></div>';
    }
  };

  /* Utilitaires des blocs */

  // « clé: valeur » sur une ligne chacune
  function fields(text) {
    var out = {};
    (text || '').split('\n').forEach(function (line) {
      var m = line.match(/^([\w-]+):\s*(.*)$/);
      if (m) out[m[1]] = m[2].trim();
    });
    return out;
  }

  // « chemin :: légende » sur une ligne chacune
  function parseFigures(src) {
    return src.split('\n').filter(function (l) { return l.trim(); }).map(function (line) {
      var k = line.indexOf('::');
      return { src: (k < 0 ? line : line.slice(0, k)).trim(), caption: k < 0 ? '' : line.slice(k + 2).trim() };
    });
  }

  function figure(f, md) {
    return '<figure class="figure">' +
      '<a class="figure-zoom" href="' + md.escape(f.src) + '" target="_blank" rel="noopener" aria-label="Agrandir l’image">' +
      '<img src="' + md.escape(f.src) + '" alt="" loading="lazy"></a>' +
      (f.caption ? '<figcaption>' + md.inline(f.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }

  function bindInteractions(root, moduleId) {
    root.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('click', function () {
        var flipped = card.getAttribute('aria-pressed') === 'true';
        card.setAttribute('aria-pressed', String(!flipped));
      });
    });

    root.querySelectorAll('.carousel').forEach(function (car) {
      var slides = car.querySelectorAll('.carousel-slide');
      var count = car.querySelector('.carousel-count');
      var index = 0;
      function go(n) {
        index = (n + slides.length) % slides.length;
        slides.forEach(function (s, i) { s.hidden = i !== index; });
        count.textContent = (index + 1) + ' / ' + slides.length;
      }
      car.querySelector('.carousel-prev').addEventListener('click', function () { go(index - 1); });
      car.querySelector('.carousel-next').addEventListener('click', function () { go(index + 1); });
    });

    root.querySelectorAll('.video').forEach(function (fig) {
      fig.querySelector('.video-play').addEventListener('click', function () {
        var src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(fig.dataset.youtube) +
          '?autoplay=1' + (fig.dataset.start ? '&start=' + fig.dataset.start : '');
        var frame = document.createElement('iframe');
        frame.src = src;
        frame.title = fig.querySelector('.video-title').textContent;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        this.replaceWith(frame);
      });
    });

    root.querySelectorAll('.labeled').forEach(function (box) {
      var pins = box.querySelectorAll('.labeled-pin');
      var panels = box.querySelectorAll('.labeled-panel');
      var empty = box.querySelector('.labeled-empty');
      pins.forEach(function (pin) {
        pin.addEventListener('click', function () {
          var i = pin.dataset.index;
          pins.forEach(function (p) {
            p.setAttribute('aria-pressed', String(p === pin));
            if (p === pin) p.classList.add('is-seen');
          });
          panels.forEach(function (panel) { panel.hidden = panel.dataset.index !== i; });
          empty.hidden = true;
        });
      });
    });

    root.querySelectorAll('.sorting').forEach(function (box) {
      var pool = box.querySelector('.sorting-pool');
      var feedback = box.querySelector('.sorting-feedback');
      var total = box.querySelectorAll('.sorting-item').length;
      var selected = null;
      function select(item) {
        box.querySelectorAll('.sorting-item').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === item));
        });
        selected = item;
      }
      box.querySelectorAll('.sorting-item').forEach(function (item) {
        item.addEventListener('click', function () { if (!item.disabled) select(item); });
      });
      box.querySelectorAll('.sorting-pile').forEach(function (pile) {
        pile.querySelector('.sorting-target').addEventListener('click', function () {
          if (!selected) { feedback.textContent = 'Choisissez d’abord une formule.'; return; }
          if (selected.dataset.pile === pile.dataset.pile) {
            selected.disabled = true;
            selected.setAttribute('aria-pressed', 'false');
            selected.classList.add('is-sorted');
            pile.querySelector('.sorting-drop').appendChild(selected);
            selected = null;
            var done = box.querySelectorAll('.sorting-item.is-sorted').length;
            feedback.textContent = done === total ? 'Bravo, tout est classé !' : 'Bien vu. ' + (total - done) + ' formule(s) restante(s).';
            feedback.className = 'sorting-feedback ok';
          } else {
            selected.classList.remove('is-wrong');
            void selected.offsetWidth;
            selected.classList.add('is-wrong');
            feedback.textContent = 'Pas dans cette catégorie. Essayez-en une autre.';
            feedback.className = 'sorting-feedback ko';
          }
        });
      });
      box.querySelector('.sorting-reset').addEventListener('click', function () {
        var items = Array.prototype.slice.call(box.querySelectorAll('.sorting-item'));
        shuffle(items).forEach(function (item) {
          item.disabled = false;
          item.classList.remove('is-sorted', 'is-wrong');
          item.setAttribute('aria-pressed', 'false');
          pool.appendChild(item);
        });
        selected = null;
        feedback.textContent = '';
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

  // Modules comptés dans la progression : les chapitres et la conclusion.
  function countable() {
    return modules.filter(function (m) { return ['accueil', 'references', 'mentions'].indexOf(m.id) === -1; });
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

    var body = MiniMarkdown.render(mod.body, handlers);
    if (mod.id === 'accueil') {
      // Titre et sous-titre de l'accueil sur le bandeau à motif de la charte
      body = body.replace(/^(<h1[\s\S]*?<\/h1>\s*(?:<h2[\s\S]*?<\/h2>)?)/, '<header class="hero">$1</header>');
    }
    var html = '<article class="module module-' + mod.id + '">' + body;

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

  // Sombre par défaut (charte Synth) ; le thème clair est un choix mémorisé.
  var themeToggle = document.querySelector('.theme-toggle');
  function applyTheme() {
    var light = state.theme === 'light';
    if (light) document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    themeToggle.setAttribute('aria-label', light ? 'Passer en thème sombre' : 'Passer en thème clair');
  }
  applyTheme();
  themeToggle.addEventListener('click', function () {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    saveState();
    applyTheme();
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
