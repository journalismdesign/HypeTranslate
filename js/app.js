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
  var progress = document.querySelector('.course-progress');
  var progressBar = document.querySelector('.course-progress-bar');
  var progressCount = document.querySelector('.course-progress-count');
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
  state.quiz = state.quiz || {};      // meilleur résultat de quiz par chapitre : { score, total }

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) { /* stockage indisponible : la page fonctionne sans */ }
  }

  /* ---------- Blocs interactifs ---------- */

  var counter = 0;
  function uid(prefix) { return prefix + '-' + (++counter); }

  var chatData = {};
  var deckData = {};

  function questionList(list, source, md) {
    if (!list.length) return '';
    return '<div class="qset"><p class="qset-title">Questions à se poser</p><ul class="qset-list">' +
      list.map(function (q) {
        return '<li class="qcard" data-q="' + md.escape(q) + '" data-src="' + md.escape(source) + '">' +
          '<span class="qcard-text">' + md.inline(q) + '</span>' +
          '<button type="button" class="qcard-add" aria-pressed="false"><span class="qcard-add-label">Au carnet</span></button></li>';
      }).join('') + '</ul></div>';
  }
  // Signatures des bulles : Synth. (logo) pour les questions, le lecteur pour les réponses
  var AVATAR = {
    bot: '<span class="chat-avatar chat-avatar-bot"><img src="assets/mark-eye-cyan.png" alt="Synth." width="22" height="14"></span>',
    me: '<span class="chat-avatar chat-avatar-me"><img src="assets/avatar-lecteur.svg" alt="Vous" width="32" height="32"></span>'
  };

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

    // Quiz en mode conversation : le contenu reste dans le .md (Q: / - [ ] / - [x] / >),
    // le déroulé (frappe, bulles, réponses) est joué par bindInteractions.
    quiz: function (src, md) {
      var id = uid('chat');
      var title = 'Quiz';
      src = src.replace(/^titre:\s*(.*)\n?/, function (_, t) { title = t.trim(); return ''; });
      var questions = src.split(/\n\s*\n/).filter(function (b) { return b.trim(); }).map(function (block) {
        var q = { text: '', answers: [], explanation: [] };
        block.split('\n').forEach(function (line) {
          var m;
          if ((m = line.match(/^Q:\s*(.*)$/))) q.text = m[1];
          else if ((m = line.match(/^-\s*\[([ xX])\]\s*(.*)$/))) q.answers.push({ ok: m[1] !== ' ', html: md.inline(m[2]) });
          else if ((m = line.match(/^>\s?(.*)$/))) q.explanation.push(m[1]);
        });
        return {
          html: md.inline(q.text),
          plain: q.text.replace(/\*+/g, ''),
          answers: q.answers,
          explanation: md.inline(q.explanation.join(' '))
        };
      });
      chatData[id] = questions;
      return '<section class="chat" id="' + id + '" aria-label="' + md.escape(title) + '">' +
        '<header class="chat-head">' +
        '<span class="chat-name">' + md.inline(title) + '<small>' + questions.length + ' questions</small></span>' +
        '<span class="chat-score" aria-live="polite">0 / ' + questions.length + '</span>' +
        '</header>' +
        '<div class="chat-log" role="log" aria-live="polite"><p class="chat-system">Aujourd\u2019hui</p></div>' +
        '<div class="chat-replies" role="group" aria-label="Vos réponses"></div>' +
        '</section>';
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
    },

    // Cartouche d'ouverture de chapitre : introduction + objectifs.
    'vue-ensemble': function (src, md) {
      var k = src.search(/^objectifs:/m);
      var intro = k < 0 ? src : src.slice(0, k);
      var rest = k < 0 ? '' : src.slice(k);
      var lead = (rest.match(/^objectifs:\s*(.*)$/m) || [])[1] || '';
      var goals = rest.split('\n').filter(function (l) { return /^-\s+/.test(l); }).map(function (l) { return l.replace(/^-\s+/, ''); });
      return '<section class="overview" aria-label="Vue d’ensemble">' +
        '<div class="overview-side"><span class="overview-label">Vue d’ensemble</span><span class="overview-num" aria-hidden="true"></span></div>' +
        '<div class="overview-main">' + md.render(intro.trim()) +
        (goals.length ? '<p class="overview-lead">' + md.inline(lead) + '</p><ol class="overview-goals">' +
          goals.map(function (g, n) {
            return '<li><span class="overview-goal-n">' + (n < 9 ? '0' : '') + (n + 1) + '</span><span>' + md.inline(g) + '</span></li>';
          }).join('') + '</ol>' : '') +
        '</div></section>';
    },

    // Paquet de cartes : « + Tas :: carte | carte », la parade (markdown), puis « ? question ».
    paquet: function (src, md) {
      var id = uid('deck');
      var piles = [];
      src.split('\n').forEach(function (line) {
        var m = line.match(/^\+\s+(.*?)\s*::\s*(.*)$/);
        if (m) { piles.push({ name: m[1], cards: m[2].split('|').map(function (c) { return c.trim(); }).filter(Boolean), text: [], questions: [] }); return; }
        if (!piles.length) return;
        var cur = piles[piles.length - 1];
        if (/^\?\s+/.test(line)) cur.questions.push(line.replace(/^\?\s+/, ''));
        else cur.text.push(line);
      });
      var cards = [];
      piles.forEach(function (pl, n) { pl.cards.forEach(function (c) { cards.push({ text: c, pile: n }); }); });
      deckData[id] = { cards: cards, piles: piles };
      return '<section class="deck" id="' + id + '" aria-label="Paquet de cartes des pièges rhétoriques">' +
        '<div class="deck-table">' +
        '<div class="deck-stack" aria-hidden="true"></div>' +
        '<div class="deck-help"><p class="deck-count"></p>' +
        '<p class="deck-hint">Glissez la carte sur un tas, ou choisissez un tas.</p>' +
        '<p class="deck-feedback" aria-live="polite"></p></div>' +
        '</div>' +
        '<div class="deck-piles" role="group" aria-label="Les quatre tas">' + piles.map(function (pl, n) {
          return '<button type="button" class="pile" data-pile="' + n + '">' +
            '<span class="pile-name">' + md.inline(pl.name) + '</span>' +
            '<span class="pile-count">0 / ' + pl.cards.length + '</span>' +
            '<span class="pile-cards" aria-hidden="true"></span></button>';
        }).join('') + '</div>' +
        '<div class="deck-parades">' + piles.map(function (pl, n) {
          return '<article class="parade is-locked" data-pile="' + n + '">' +
            '<header class="parade-head"><span class="parade-kicker">Parade</span>' +
            '<h4>' + md.inline(pl.name) + '</h4>' +
            '<span class="parade-lock">Complétez le tas pour révéler la parade</span></header>' +
            '<div class="parade-body">' + md.render(pl.text.join('\n').trim()) +
            questionList(pl.questions, pl.name, md) + '</div></article>';
        }).join('') + '</div>' +
        '<button type="button" class="deck-reset">Rebattre les cartes</button>' +
        '</section>';
    },

    // Questions à se poser : chacune peut rejoindre le carnet du lecteur.
    questions: function (src, md) {
      var lines = src.split('\n').filter(function (l) { return l.trim(); });
      var source = '';
      if (/^source:/.test(lines[0] || '')) source = lines.shift().replace(/^source:\s*/, '');
      return questionList(lines, source, md);
    },

    section: function (src) {
      var n = parseInt(src, 10) || 0;
      return '<div class="section-num" aria-hidden="true"><span class="sn-label">Partie</span>' +
        '<span class="sn-num"><span>' + (n < 10 ? '0' : '') + n + '</span></span></div>';
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

    root.querySelectorAll('.overview-num').forEach(function (el) {
      var n = (moduleId.match(/chapitre-(\d+)/) || [])[1];
      el.textContent = n ? (n < 10 ? '0' : '') + n : '';
    });
    if (window.Atelier) {
      Atelier.overview(root);
      root.querySelectorAll('.deck').forEach(function (box) { Atelier.deck(box, deckData[box.id]); });
      Atelier.questions(root);
    }

    root.querySelectorAll('.chat').forEach(function (box) { startChat(box, chatData[box.id] || [], moduleId); });

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

  /* ---------- Quiz en conversation ---------- */

  var reduceMotion = false;
  try { reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, reduceMotion ? 0 : ms); });
  }

  function startChat(box, questions, moduleId) {
    var log = box.querySelector('.chat-log');
    var replies = box.querySelector('.chat-replies');
    var scoreEl = box.querySelector('.chat-score');
    var score = 0;
    var alive = true;
    var started = false;

    function scrollLog() { log.scrollTop = log.scrollHeight; }

    function clock() {
      var d = new Date();
      return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }

    // Une ligne de conversation : avatar en bas, colonne de bulle à côté.
    function row(side, extraClass) {
      var r = document.createElement('div');
      r.className = 'chat-row chat-' + side + (extraClass ? ' ' + extraClass : '');
      r.innerHTML = AVATAR[side] + '<div class="chat-col"></div>';
      log.appendChild(r);
      scrollLog();
      return r;
    }

    function bubble(side, html, label) {
      var r = row(side);
      var col = r.querySelector('.chat-col');
      if (label) col.insertAdjacentHTML('beforeend', '<span class="chat-step">' + label + '</span>');
      var b = document.createElement('div');
      b.className = 'chat-bubble';
      var text = document.createElement('span');
      text.className = 'chat-text';
      if (html !== undefined) text.innerHTML = html;
      b.appendChild(text);
      b.insertAdjacentHTML('beforeend', '<span class="chat-meta">' + clock() +
        (side === 'me' ? ' <svg class="chat-ticks" width="16" height="10" viewBox="0 0 16 10" aria-label="lu" role="img"><path d="M1 5.5l3 3L10.5 1.5M6.5 8.5l1 0.2L14.5 1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') + '</span>');
      col.appendChild(b);
      scrollLog();
      return text;
    }

    function typing(side) {
      var r = row(side, 'chat-typing-row');
      r.querySelector('.chat-col').innerHTML = '<div class="chat-bubble chat-typing" aria-label="' +
        (side === 'bot' ? 'Synth. écrit…' : 'À vous de répondre') + '"><i></i><i></i><i></i></div>';
      scrollLog();
      return r;
    }

    // La question se tape lettre à lettre, puis prend sa mise en forme définitive.
    function typeInto(el, plain, html) {
      if (reduceMotion) { el.innerHTML = html; return Promise.resolve(); }
      var step = Math.max(8, Math.min(28, 1500 / plain.length));
      var i = 0;
      el.classList.add('is-typing');
      return new Promise(function (resolve) {
        (function next() {
          if (!alive) return resolve();
          i += 1;
          el.textContent = plain.slice(0, i);
          scrollLog();
          if (i < plain.length) setTimeout(next, step);
          else { el.classList.remove('is-typing'); el.innerHTML = html; resolve(); }
        })();
      });
    }

    function chips(list, onPick) {
      replies.innerHTML = '';
      list.forEach(function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-chip' + (item.primary ? ' is-primary' : '');
        btn.innerHTML = item.html;
        btn.addEventListener('click', function () {
          replies.innerHTML = '';
          onPick(item);
        });
        replies.appendChild(btn);
      });
    }

    function ask(index) {
      if (!alive) return;
      if (index >= questions.length) return finish();
      var q = questions[index];
      var dots = typing('bot');
      wait(650).then(function () {
        dots.remove();
        var b = bubble('bot', '', 'Question ' + (index + 1) + ' / ' + questions.length);
        return typeInto(b, q.plain, q.html);
      }).then(function () {
        // Les trois réponses apparaissent avec la bulle « en train d'écrire » côté lecteur.
        var mine = typing('me');
        chips(shuffle(q.answers.slice()), function (answer) {
          mine.remove();
          bubble('me', answer.html);
          var botDots = typing('bot');
          wait(800).then(function () {
            botDots.remove();
            var good = q.answers.filter(function (a) { return a.ok; })[0];
            if (answer.ok) score += 1;
            scoreEl.textContent = score + ' / ' + questions.length;
            bubble('bot', answer.ok
              ? '<strong class="chat-verdict is-right">✓ Juste.</strong> ' + q.explanation
              : '<strong class="chat-verdict is-wrong">✗ Faux.</strong> La bonne réponse : « ' + good.html + ' ». ' + q.explanation);
            chips([{ html: index + 1 < questions.length ? 'Question suivante →' : 'Voir mon score', primary: true }], function () {
              ask(index + 1);
            });
          });
        });
      });
    }

    function finish() {
      var dots = typing('bot');
      wait(600).then(function () {
        dots.remove();
        var all = score === questions.length;
        recordQuiz(moduleId, score, questions.length);
        bubble('bot', '<strong>Score : ' + score + ' / ' + questions.length + '.</strong> ' +
          (all ? 'Sans faute. Le hype ne vous aura pas.' : 'Relisez le chapitre pour les points manqués, puis retentez votre chance.'));
        chips([{ html: 'Recommencer', primary: true }], function () {
          log.innerHTML = '<p class="chat-system">Aujourd\u2019hui</p>';
          score = 0;
          scoreEl.textContent = '0 / ' + questions.length;
          ask(0);
        });
      });
    }

    // La conversation démarre quand le quiz arrive à l'écran.
    function begin() { if (!started) { started = true; ask(0); } }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); begin(); }
      }, { threshold: 0.35 });
      io.observe(box);
    } else {
      begin();
    }
    // Changement de chapitre : on arrête les minuteries en cours.
    window.addEventListener('hashchange', function stop() { alive = false; window.removeEventListener('hashchange', stop); });
  }

  // Le sommaire garde la couleur du dernier résultat de quiz du chapitre.
  function recordQuiz(moduleId, score, total) {
    if (!moduleId) return;
    state.quiz[moduleId] = { score: score, total: total };
    saveState();
    renderToc(currentModule);
    var link = toc.querySelector('a[href="#/' + moduleId + '"]');
    if (link && window.gsap && !reduceMotion) {
      gsap.fromTo(link, { scale: 1.06 }, { scale: 1, duration: .6, ease: 'elastic.out(1, .5)' });
    }
  }

  function quizClass(id) {
    var r = state.quiz[id];
    if (!r || !r.total) return '';
    if (r.score === r.total) return 'quiz-ok';
    if (r.score * 2 >= r.total) return 'quiz-mid';
    return 'quiz-low';
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
    return modules.filter(function (m) { return ['accueil', 'boite-a-outils', 'references', 'mentions'].indexOf(m.id) === -1; });
  }

  /* ---------- Rendu ---------- */

  function renderToc(currentId) {
    toc.innerHTML = modules.map(function (m) {
      var cls = [];
      if (m.id === currentId) cls.push('is-current');
      if (state.lus[m.id]) cls.push('is-read');
      var q = quizClass(m.id);
      if (q) cls.push(q);
      var r = state.quiz[m.id];
      var badge = r ? '<span class="toc-quiz" aria-label="Quiz : ' + r.score + ' sur ' + r.total + '">' + r.score + '/' + r.total + '</span>' : '';
      return '<li class="' + cls.join(' ') + '"><a href="#/' + m.id + '"' +
        (m.id === currentId ? ' aria-current="page"' : '') + '><span class="toc-title">' +
        MiniMarkdown.escape(m.title) + '</span>' + badge + '</a></li>';
    }).join('');
  }

  function renderProgress() {
    var list = countable();
    var read = list.filter(function (m) { return state.lus[m.id]; }).length;
    var pct = list.length ? Math.round((read / list.length) * 100) : 0;
    progressBar.style.width = pct + '%';
    progress.setAttribute('aria-valuenow', String(pct));
    progress.setAttribute('aria-valuetext', read + ' module(s) sur ' + list.length);
    progressCount.textContent = read + ' / ' + list.length;
  }

  var endObserver = null;
  var currentModule = null;

  function show(id) {
    var index = modules.findIndex(function (m) { return m.id === id; });
    currentModule = (modules[index] || modules[0]).id;
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
    // Direction artistique « affiche » : ouverture, rails de marge, révélations au défilement
    if (window.Atelier) {
      var chapters = modules.filter(function (m) { return /^chapitre-/.test(m.id); });
      var chNum = (mod.id.match(/^chapitre-(\d+)/) || [])[1];
      var article = main.querySelector('.module');
      Atelier.chapterHero(article, {
        chapter: chNum ? +chNum : 0,
        total: chapters.length,
        kicker: chNum ? 'Chapitre' : 'Littératie du hype'
      });
      Atelier.rails(main, [
        chNum ? 'Chapitre ' + (chNum < 10 ? '0' : '') + chNum + ' / ' + (chapters.length < 10 ? '0' : '') + chapters.length : mod.title,
        'Littératie du hype',
        mod.title,
        'Synth.'
      ]);
    }
    bindInteractions(main, mod.id);
    if (window.Atelier) Atelier.reveals(main.querySelector('.module'));
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
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', function () {
    var open = sidebar.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  // Le thème est géré par js/synth-header.js (clé partagée « synth-theme »).

  document.querySelector('.reset').addEventListener('click', function () {
    if (!window.confirm('Effacer votre progression, vos résultats de quiz et vos cases cochées ?')) return;
    state.lus = {};
    state.cases = {};
    state.quiz = {};
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
