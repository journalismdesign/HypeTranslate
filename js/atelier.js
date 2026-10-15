/*
 * Atelier — dispositifs animés du parcours (GSAP 3 + Draggable, dans js/vendor/).
 *   Atelier.overview(root)    entrée du cartouche « Vue d'ensemble »
 *   Atelier.deck(box, data)   paquet de cartes des pièges rhétoriques, distribué sur quatre tas
 *   Atelier.questions(root)   questions à se poser, à glisser dans le carnet du lecteur
 * Sans GSAP (ou avec « réduire les animations »), tout fonctionne sans mouvement.
 */
(function () {
  'use strict';

  var CARNET_KEY = 'synth-hype-carnet';
  var hasGsap = !!window.gsap;
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var animate = hasGsap && !reduce;
  if (hasGsap && window.Draggable) gsap.registerPlugin(Draggable);
  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }
  function plain(text) { return String(text).replace(/\*+/g, ''); }

  /* =================================================================
     Vue d'ensemble
     ================================================================= */

  function overview(root) {
    if (!animate) return;
    root.querySelectorAll('.overview').forEach(function (box) {
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(box, { y: 24, opacity: 0, duration: .6 })
        .from(box.querySelector('.overview-num'), { xPercent: -30, opacity: 0, duration: .7 }, '-=.35')
        .from(box.querySelectorAll('.overview-goals li'), { y: 16, opacity: 0, stagger: .09, duration: .45 }, '-=.4');
    });
  }

  /* =================================================================
     Paquet de cartes
     ================================================================= */

  var EYE = '<img src="assets/mark-eye-cyan.png" alt="" width="44" height="28">';

  function deck(box, data) {
    if (!box || !data) return;
    var stack = box.querySelector('.deck-stack');
    var countEl = box.querySelector('.deck-count');
    var feedback = box.querySelector('.deck-feedback');
    var piles = Array.prototype.slice.call(box.querySelectorAll('.pile'));
    var parades = Array.prototype.slice.call(box.querySelectorAll('.parade'));
    var queue, placed, current, busy, drag;

    function setup() {
      queue = shuffle(data.cards.slice());
      placed = data.piles.map(function () { return 0; });
      current = null;
      busy = false;
      stack.innerHTML = '';
      piles.forEach(function (p, n) {
        p.classList.remove('is-done', 'is-wrong');
        p.querySelector('.pile-cards').innerHTML = '';
        p.querySelector('.pile-count').textContent = '0 / ' + data.piles[n].cards.length;
        p.disabled = false;
      });
      parades.forEach(function (a) { a.classList.add('is-locked'); });
      feedback.textContent = '';
      box.classList.remove('is-finished');
      // Le paquet : quelques dos de cartes empilés, la carte du dessus au-dessus.
      for (var i = 0; i < Math.min(5, queue.length - 1); i++) {
        var back = document.createElement('div');
        back.className = 'dcard-back dcard-pile';
        back.style.transform = 'translate(' + (i * 2) + 'px,' + (-i * 2) + 'px) rotate(' + (i % 2 ? 1.5 : -1.5) + 'deg)';
        back.innerHTML = EYE;
        stack.appendChild(back);
      }
      if (animate) {
        gsap.from(stack.children, { y: -80, opacity: 0, rotation: function () { return gsap.utils.random(-25, 25); }, stagger: .07, duration: .5, ease: 'back.out(1.6)' });
      }
      updateCount();
      deal();
    }

    function updateCount() {
      var left = queue.length + (current ? 1 : 0);
      countEl.textContent = left ? left + (left > 1 ? ' cartes à distribuer' : ' carte à distribuer') : 'Paquet distribué';
      // Le paquet s'amincit à mesure qu'on distribue.
      var backs = stack.querySelectorAll('.dcard-pile');
      backs.forEach(function (b, i) { b.style.visibility = i < queue.length ? 'visible' : 'hidden'; });
    }

    // Retourne la carte du dessus.
    function deal() {
      if (!queue.length) { current = null; updateCount(); return finished(); }
      var item = queue.shift();
      var el = document.createElement('div');
      el.className = 'dcard';
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', 'Carte : ' + plain(item.text));
      el.innerHTML = '<div class="dcard-inner"><div class="dcard-face dcard-front"><span class="dcard-kicker">Formule</span>' +
        '<span class="dcard-text">' + escapeHtml(item.text) + '</span></div>' +
        '<div class="dcard-face dcard-backface">' + EYE + '</div></div>';
      stack.appendChild(el);
      current = { el: el, item: item };
      updateCount();
      feedback.textContent = 'Carte retournée : ' + plain(item.text) + '. Sur quel tas ?';
      feedback.className = 'deck-feedback';
      var inner = el.querySelector('.dcard-inner');
      if (animate) {
        gsap.set(inner, { rotationY: 180 });
        gsap.timeline()
          .from(el, { y: -14, x: 10, duration: .25, ease: 'power2.out' })
          .to(inner, { rotationY: 0, duration: .55, ease: 'back.out(1.4)' }, '-=.05');
      }
      makeDraggable(el);
    }

    function makeDraggable(el) {
      if (!hasGsap || !window.Draggable) return;
      drag = Draggable.create(el, {
        type: 'x,y',
        zIndexBoost: true,
        onPress: function () { gsap.to(el, { scale: 1.04, rotation: 2, duration: .2 }); },
        onDrag: function () {
          var self = this;
          piles.forEach(function (p) { p.classList.toggle('is-target', !p.disabled && Draggable.hitTest(self.target, p, '25%')); });
        },
        onRelease: function () {
          var self = this;
          var hit = piles.filter(function (p) { return !p.disabled && Draggable.hitTest(self.target, p, '25%'); })[0];
          piles.forEach(function (p) { p.classList.remove('is-target'); });
          if (hit) place(+hit.dataset.pile);
          else gsap.to(el, { x: 0, y: 0, scale: 1, rotation: 0, duration: .45, ease: 'back.out(1.7)' });
        }
      })[0];
    }

    // Pose la carte courante sur le tas n.
    function place(n) {
      if (!current || busy) return;
      var el = current.el;
      var item = current.item;
      var pile = piles[n];
      if (item.pile !== n) return wrong(el, pile);
      busy = true;
      if (drag) { drag.kill(); drag = null; }
      var from = el.getBoundingClientRect();
      var to = pile.getBoundingClientRect();
      var dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      var dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      function done() {
        el.remove();
        var chip = document.createElement('span');
        chip.className = 'pile-chip';
        chip.textContent = item.text;
        pile.querySelector('.pile-cards').appendChild(chip);
        placed[n] += 1;
        var total = data.piles[n].cards.length;
        pile.querySelector('.pile-count').textContent = placed[n] + ' / ' + total;
        feedback.textContent = 'Bien vu : « ' + plain(item.text) + ' » relève de ' + plain(data.piles[n].name).toLowerCase() + '.';
        feedback.className = 'deck-feedback ok';
        if (animate) gsap.from(chip, { scale: 0, duration: .35, ease: 'back.out(2)' });
        if (placed[n] === total) completePile(n);
        current = null;
        busy = false;
        deal();
      }
      if (animate) {
        gsap.to(el, {
          x: '+=' + dx, y: '+=' + dy, scale: .3, rotation: gsap.utils.random(-12, 12), opacity: .2,
          duration: .55, ease: 'power3.in', onComplete: done
        });
        gsap.fromTo(pile, { y: 0 }, { y: 4, duration: .12, yoyo: true, repeat: 1, delay: .5 });
      } else {
        done();
      }
    }

    function wrong(el, pile) {
      feedback.textContent = 'Pas sur ce tas. Relisez la formule et essayez un autre tas.';
      feedback.className = 'deck-feedback ko';
      pile.classList.add('is-wrong');
      setTimeout(function () { pile.classList.remove('is-wrong'); }, 700);
      if (animate) {
        gsap.timeline()
          .to(el, { x: 0, y: 0, scale: 1, rotation: 0, duration: .3, ease: 'power2.out' })
          .to(el, { x: -8, duration: .06, repeat: 5, yoyo: true, ease: 'none' })
          .to(el, { x: 0, duration: .06 });
      }
    }

    function completePile(n) {
      var pile = piles[n];
      var parade = parades[n];
      pile.classList.add('is-done');
      pile.disabled = true;
      parade.classList.remove('is-locked');
      if (animate) {
        gsap.fromTo(pile, { rotationY: 0 }, { rotationY: 360, duration: .8, ease: 'power2.inOut' });
        var body = parade.querySelector('.parade-body');
        gsap.fromTo(body, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: .7, ease: 'power2.out', clearProps: 'height' });
        gsap.fromTo(parade, { boxShadow: '0 0 0 0 rgba(0,255,224,0)' }, { boxShadow: '0 0 0 3px rgba(0,255,224,.6)', duration: .3, yoyo: true, repeat: 1 });
      }
    }

    function finished() {
      box.classList.add('is-finished');
      feedback.textContent = 'Paquet distribué. Les quatre parades sont révélées ci-dessous.';
      feedback.className = 'deck-feedback ok';
      if (animate) gsap.fromTo(piles, { y: 0 }, { y: -10, stagger: .08, duration: .25, yoyo: true, repeat: 1, ease: 'power2.out' });
    }

    piles.forEach(function (p) {
      p.addEventListener('click', function () { place(+p.dataset.pile); });
    });
    // Un tas complet renvoie vers sa parade.
    piles.forEach(function (p, n) {
      p.addEventListener('click', function () {
        if (p.classList.contains('is-done')) parades[n].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      });
    });
    box.querySelector('.deck-reset').addEventListener('click', setup);
    setup();
  }

  /* =================================================================
     Carnet de questions
     ================================================================= */

  function loadCarnet() {
    try { return JSON.parse(localStorage.getItem(CARNET_KEY)) || []; } catch (e) { return []; }
  }
  function saveCarnet(list) {
    try { localStorage.setItem(CARNET_KEY, JSON.stringify(list)); } catch (e) {}
  }
  var carnet = loadCarnet();
  var ui = null;

  function has(q) { return carnet.some(function (c) { return c.q === q; }); }

  function buildUi() {
    if (ui) return ui;
    var fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'carnet-fab';
    fab.setAttribute('aria-controls', 'carnet-panel');
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h11a2 2 0 0 1 2 2v16l-7.5-4L4 21V5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>' +
      '<span class="carnet-fab-label">Mon carnet</span><span class="carnet-fab-count">0</span>';
    var panel = document.createElement('aside');
    panel.className = 'carnet-panel';
    panel.id = 'carnet-panel';
    panel.setAttribute('aria-label', 'Mon carnet de questions');
    panel.hidden = true;
    panel.innerHTML = '<header class="carnet-head"><div><span class="carnet-kicker">À emporter en reportage</span>' +
      '<h2>Mon carnet de questions</h2></div>' +
      '<button type="button" class="carnet-close" aria-label="Fermer le carnet">×</button></header>' +
      '<div class="carnet-body"></div>' +
      '<footer class="carnet-actions">' +
      '<button type="button" class="carnet-copy">Copier</button>' +
      '<button type="button" class="carnet-print">Imprimer</button>' +
      '<button type="button" class="carnet-clear">Vider</button>' +
      '</footer><p class="carnet-status" aria-live="polite"></p>';
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    fab.addEventListener('click', function () { toggle(panel.hidden); });
    panel.querySelector('.carnet-close').addEventListener('click', function () { toggle(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) toggle(false); });
    panel.querySelector('.carnet-copy').addEventListener('click', function () {
      var text = asText();
      var status = panel.querySelector('.carnet-status');
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(function () { status.textContent = 'Carnet copié dans le presse-papiers.'; })
        .catch(function () { status.textContent = 'Copie impossible : sélectionnez le texte du carnet.'; });
    });
    panel.querySelector('.carnet-print').addEventListener('click', function () {
      document.body.classList.add('print-carnet');
      window.print();
      setTimeout(function () { document.body.classList.remove('print-carnet'); }, 500);
    });
    panel.querySelector('.carnet-clear').addEventListener('click', function () {
      if (!carnet.length || !window.confirm('Vider le carnet ?')) return;
      carnet = [];
      saveCarnet(carnet);
      refresh();
    });
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('.carnet-remove');
      if (!btn) return;
      carnet = carnet.filter(function (c) { return c.q !== btn.dataset.q; });
      saveCarnet(carnet);
      refresh();
    });

    function toggle(open) {
      fab.setAttribute('aria-expanded', String(open));
      if (open) {
        panel.hidden = false;
        if (animate) gsap.fromTo(panel, { xPercent: 105 }, { xPercent: 0, duration: .45, ease: 'power3.out' });
        panel.querySelector('.carnet-close').focus();
      } else if (animate) {
        gsap.to(panel, { xPercent: 105, duration: .35, ease: 'power3.in', onComplete: function () { panel.hidden = true; } });
        fab.focus();
      } else {
        panel.hidden = true;
        fab.focus();
      }
    }

    ui = { fab: fab, panel: panel };
    return ui;
  }

  function asText() {
    var groups = {};
    carnet.forEach(function (c) { (groups[c.src || 'Questions'] = groups[c.src || 'Questions'] || []).push(c.q); });
    return 'Mon carnet de questions, Littératie de la hype\n\n' + Object.keys(groups).map(function (g) {
      return g + '\n' + groups[g].map(function (q) { return '☐ ' + q; }).join('\n');
    }).join('\n\n');
  }

  function refresh() {
    var u = buildUi();
    var body = u.panel.querySelector('.carnet-body');
    u.fab.querySelector('.carnet-fab-count').textContent = carnet.length;
    u.fab.classList.toggle('has-items', carnet.length > 0);
    if (!carnet.length) {
      body.innerHTML = '<p class="carnet-empty">Votre carnet est vide. Ajoutez les questions qui vous serviront en reportage avec le bouton « Au carnet ».</p>';
    } else {
      var groups = {};
      carnet.forEach(function (c) { (groups[c.src || 'Questions'] = groups[c.src || 'Questions'] || []).push(c.q); });
      body.innerHTML = Object.keys(groups).map(function (g) {
        return '<section class="carnet-group"><h3>' + escapeHtml(g) + '</h3><ul>' + groups[g].map(function (q) {
          return '<li><span>' + escapeHtml(q) + '</span><button type="button" class="carnet-remove" data-q="' + escapeHtml(q) + '" aria-label="Retirer cette question">×</button></li>';
        }).join('') + '</ul></section>';
      }).join('');
    }
    document.querySelectorAll('.qcard').forEach(function (card) {
      var on = has(plain(card.dataset.q));
      card.classList.toggle('is-saved', on);
      var b = card.querySelector('.qcard-add');
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('.qcard-add-label').textContent = on ? 'Dans le carnet' : 'Au carnet';
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Une copie de la question s'envole vers le carnet.
  function fly(card) {
    if (!animate || !ui) return;
    var from = card.getBoundingClientRect();
    var to = ui.fab.getBoundingClientRect();
    var ghost = document.createElement('div');
    ghost.className = 'qcard-ghost';
    ghost.textContent = card.querySelector('.qcard-text').textContent;
    ghost.style.left = from.left + 'px';
    ghost.style.top = from.top + 'px';
    ghost.style.width = from.width + 'px';
    document.body.appendChild(ghost);
    gsap.to(ghost, {
      x: to.left + to.width / 2 - from.left - from.width / 2,
      y: to.top + to.height / 2 - from.top - from.height / 2,
      scale: .08, opacity: .3, duration: .7, ease: 'power2.in',
      onComplete: function () {
        ghost.remove();
        gsap.fromTo(ui.fab, { scale: 1.25 }, { scale: 1, duration: .5, ease: 'elastic.out(1, .4)' });
      }
    });
  }

  function questions(root) {
    var cards = root.querySelectorAll('.qcard');
    if (!cards.length) {
      // Sans question sur la page, le carnet ne reste visible que s'il contient quelque chose.
      if (ui) ui.fab.hidden = carnet.length === 0;
      return;
    }
    buildUi();
    ui.fab.hidden = false;
    cards.forEach(function (card) {
      card.querySelector('.qcard-add').addEventListener('click', function () {
        var q = plain(card.dataset.q);
        if (has(q)) {
          carnet = carnet.filter(function (c) { return c.q !== q; });
        } else {
          carnet.push({ q: q, src: plain(card.dataset.src) });
          fly(card);
        }
        saveCarnet(carnet);
        refresh();
      });
    });
    refresh();
    if (animate && window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          gsap.from(e.target.querySelectorAll('.qcard'), { x: 30, opacity: 0, stagger: .08, duration: .45, ease: 'power2.out' });
        });
      }, { threshold: .3 });
      root.querySelectorAll('.questions-block, .qset').forEach(function (el) { if (!el.closest('.parade')) io.observe(el); });
    }
  }


  /* =================================================================
     Direction artistique « affiche » : ouverture de chapitre, rails, parties
     ================================================================= */

  // Découpe un titre en mots masqués, pour les faire monter depuis leur ligne de base.
  function maskWords(text) {
    return text.split(/\s+/).filter(Boolean).map(function (w) {
      return '<span class="mw"><span>' + escapeHtml(w) + '</span></span>';
    }).join(' ');
  }

  function facts(article) {
    var words = (article.textContent || '').split(/\s+/).length;
    var parts = article.querySelectorAll('.section-num').length;
    var chats = article.querySelectorAll('.chat');
    var questions = 0;
    chats.forEach(function (c) { var m = (c.querySelector('.chat-name small') || {}).textContent; questions += parseInt(m, 10) || 0; });
    var tools = [];
    if (article.querySelector('.deck')) tools.push('Paquet de cartes');
    if (article.querySelector('.qcard')) tools.push('Carnet');
    if (article.querySelector('.labeled')) tools.push('Image annotée');
    if (article.querySelector('.cards')) tools.push('Cartes');
    if (article.querySelector('.carousel')) tools.push('Carrousel');
    if (article.querySelector('.video')) tools.push('Vidéo');
    var list = [['Lecture', '~' + Math.max(1, Math.round(words / 200)) + ' min']];
    if (parts) list.push(['Parties', String(parts)]);
    if (questions) list.push(['Quiz', questions + ' questions']);
    if (tools.length) list.push(['À manipuler', tools.slice(0, 2).join(' · ')]);
    return list;
  }

  // Transforme le premier titre du module en ouverture « affiche ».
  function chapterHero(article, info) {
    var h1 = article.querySelector(':scope > h1');
    if (!h1 || article.querySelector('.hero')) return;
    var raw = h1.textContent.trim();
    var kicker = info.kicker || '';
    var title = raw;
    var m = raw.match(/^(?:Chapitre|Synth)\s+\d+\s*:\s*(.*)$/);
    if (m) title = m[1];
    var head = document.createElement('header');
    head.className = 'ch-hero';
    var fl = info.chapter ? facts(article) : [];
    head.innerHTML =
      '<p class="ch-kicker"><span>' + escapeHtml(kicker) + '</span>' +
      (info.chapter ? '<span>' + pad(info.chapter) + ' / ' + pad(info.total) + '</span>' : '') + '</p>' +
      '<h1 class="ch-title">' + maskWords(title) + '</h1>' +
      (fl.length ? '<dl class="ch-facts">' + fl.map(function (f) {
        return '<div><dt>' + f[0] + '</dt><dd>' + escapeHtml(f[1]) + '</dd></div>';
      }).join('') + '</dl>' : '');
    h1.replaceWith(head);
    if (animate) {
      gsap.from(head.querySelectorAll('.mw > span'), { yPercent: 110, duration: .9, stagger: .06, ease: 'power4.out' });
      gsap.from(head.querySelectorAll('.ch-kicker, .ch-facts > div'), { opacity: 0, y: 10, duration: .5, stagger: .06, delay: .35 });
    }
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // Rails verticaux dans les marges, avec micro-légendes tournées.
  var railObserver = null;
  function rails(main, labels) {
    main.querySelectorAll('.page-rail').forEach(function (r) { r.remove(); });
    if (railObserver) { railObserver.disconnect(); railObserver = null; }
    var left = document.createElement('div');
    var right = document.createElement('div');
    left.className = 'page-rail page-rail-left';
    right.className = 'page-rail page-rail-right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    main.appendChild(left);
    main.appendChild(right);
    function fill() {
      // Les rails commencent sous l'ouverture du module (bandeau noir).
      var hero = main.querySelector('.ch-hero, .hero');
      var top = hero ? hero.offsetTop + hero.offsetHeight : 0;
      left.style.top = right.style.top = top + 'px';
      var h = main.scrollHeight - top;
      var step = 560;
      var n = Math.max(1, Math.floor((h - 200) / step));
      [left, right].forEach(function (rail, side) {
        var html = '';
        for (var i = 0; i < n; i++) {
          var label = labels[(i + side) % labels.length];
          html += '<span style="top:' + (140 + i * step) + 'px">' + escapeHtml(label) + '</span>';
        }
        rail.innerHTML = html;
      });
    }
    fill();
    if ('ResizeObserver' in window) {
      var last = main.scrollHeight;
      railObserver = new ResizeObserver(function () {
        if (Math.abs(main.scrollHeight - last) > 200) { last = main.scrollHeight; fill(); }
      });
      railObserver.observe(main);
    }
  }

  // Numéros de partie et grands titres : montée depuis la ligne de masque au défilement.
  function reveals(article) {
    if (!animate || !window.ScrollTrigger) return;
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    article.querySelectorAll('.sn-num > span').forEach(function (el) {
      gsap.from(el, { yPercent: 105, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el.parentNode, start: 'top 85%' } });
    });
    article.querySelectorAll('.sn-num').forEach(function (el) {
      gsap.fromTo(el, { skewX: -8 }, { skewX: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 40%', scrub: true } });
    });
    article.querySelectorAll(':scope > h2').forEach(function (h) {
      gsap.from(h, { y: 26, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
    });
    setTimeout(function () { ScrollTrigger.refresh(); }, 400);
  }

  /* =================================================================
     Registre des promesses : tenu par le lecteur, dans son navigateur
     ================================================================= */

  var REGISTRE_KEY = 'synth-hype-registre';
  var STATUTS = ['En attente', 'Tenue', 'Repoussée', 'Non tenue', 'Abandonnée'];

  function loadRegistre() {
    try { return JSON.parse(localStorage.getItem(REGISTRE_KEY)) || []; } catch (e) { return []; }
  }
  function saveRegistre(list) {
    try { localStorage.setItem(REGISTRE_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function frDate(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : (iso || 'non précisée'); }
  // Échue = échéance passée alors que la promesse est encore « en attente » : c'est le moment de relancer.
  function isDue(p) { return p.statut === 'En attente' && p.echeance && p.echeance <= today(); }
  function sortRegistre(list) {
    return list.slice().sort(function (a, b) {
      var da = isDue(a) ? 0 : 1, db = isDue(b) ? 0 : 1;
      if (da !== db) return da - db;
      return (a.echeance || '9999') < (b.echeance || '9999') ? -1 : (a.echeance || '9999') > (b.echeance || '9999') ? 1 : 0;
    });
  }
  function csvCell(v) { v = String(v == null ? '' : v); return /[";\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }

  function registre(root) {
    root.querySelectorAll('.registre').forEach(function (box) {
      var list = loadRegistre();
      box.innerHTML =
        '<header class="registre-head"><span class="registre-kicker">Outil Synth</span>' +
        '<h3>Registre des promesses</h3><span class="registre-count" aria-live="polite"></span></header>' +
        '<form class="registre-form">' +
        '<label class="rg-wide"><span>Promesse</span><textarea name="promesse" rows="2" required placeholder="« Des robotaxis dans nos rues d\'ici un an »"></textarea></label>' +
        '<label><span>Auteur</span><input name="auteur" required placeholder="Personne ou organisation"></label>' +
        '<label><span>Faite le</span><input type="date" name="date"></label>' +
        '<label><span>Échéance</span><input type="date" name="echeance"></label>' +
        '<label><span>Source (lien)</span><input type="url" name="source" placeholder="https://"></label>' +
        '<button type="submit" class="registre-add">Ajouter au registre</button>' +
        '</form>' +
        '<ul class="registre-list"></ul>' +
        '<footer class="registre-actions"><button type="button" class="registre-csv">Exporter (CSV)</button>' +
        '<button type="button" class="registre-clear">Vider</button></footer>' +
        '<p class="registre-status" aria-live="polite"></p>';
      var form = box.querySelector('.registre-form');
      var ul = box.querySelector('.registre-list');
      var status = box.querySelector('.registre-status');
      form.elements.date.value = today();

      function render(newId) {
        var sorted = sortRegistre(list);
        var due = list.filter(isDue).length;
        box.querySelector('.registre-count').textContent = list.length + (list.length > 1 ? ' promesses' : ' promesse') +
          (due ? ' · ' + due + ' à relancer' : '');
        if (!sorted.length) {
          ul.innerHTML = '<li class="registre-empty">Aucune promesse pour l\'instant. Commencez par une déclaration récente que vous avez couverte.</li>';
          return;
        }
        ul.innerHTML = sorted.map(function (p) {
          var d = isDue(p);
          return '<li class="rg-item' + (d ? ' is-due' : '') + '" data-id="' + escapeHtml(p.id) + '" data-statut="' + escapeHtml(p.statut) + '">' +
            '<div class="rg-main">' +
            (d ? '<span class="rg-flag">Échéance passée : relancez</span>' : '') +
            '<p class="rg-promesse">' + escapeHtml(p.promesse) + '</p>' +
            '<p class="rg-meta"><b>' + escapeHtml(p.auteur) + '</b> · le ' + frDate(p.date) +
            ' · échéance ' + frDate(p.echeance) +
            (p.source ? ' · <a href="' + escapeHtml(p.source) + '" target="_blank" rel="noopener">source</a>' : '') + '</p>' +
            '</div>' +
            '<div class="rg-side"><label class="rg-statut"><span class="sr-only">Statut</span><select>' +
            STATUTS.map(function (s) { return '<option' + (s === p.statut ? ' selected' : '') + '>' + s + '</option>'; }).join('') +
            '</select></label><button type="button" class="rg-remove" aria-label="Supprimer cette promesse">×</button></div></li>';
        }).join('');
        if (animate && newId) {
          var el = ul.querySelector('[data-id="' + newId + '"]');
          if (el) gsap.from(el, { y: -16, opacity: 0, backgroundColor: 'rgba(0,255,224,.35)', duration: .6, ease: 'power3.out' });
        }
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var f = form.elements;
        var p = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          promesse: f.promesse.value.trim(), auteur: f.auteur.value.trim(),
          date: f.date.value, echeance: f.echeance.value, source: f.source.value.trim(), statut: 'En attente'
        };
        if (!p.promesse || !p.auteur) return;
        list.push(p);
        saveRegistre(list);
        form.reset();
        f.date.value = today();
        status.textContent = 'Promesse ajoutée.';
        render(p.id);
      });

      ul.addEventListener('change', function (e) {
        var li = e.target.closest('.rg-item');
        if (!li) return;
        list.forEach(function (p) { if (p.id === li.dataset.id) p.statut = e.target.value; });
        saveRegistre(list);
        render();
      });

      ul.addEventListener('click', function (e) {
        var btn = e.target.closest('.rg-remove');
        if (!btn) return;
        var li = btn.closest('.rg-item');
        var done = function () {
          list = list.filter(function (p) { return p.id !== li.dataset.id; });
          saveRegistre(list);
          render();
        };
        if (animate) gsap.to(li, { x: 40, opacity: 0, duration: .3, ease: 'power2.in', onComplete: done }); else done();
      });

      box.querySelector('.registre-csv').addEventListener('click', function () {
        if (!list.length) { status.textContent = 'Le registre est vide.'; return; }
        var rows = [['Promesse', 'Auteur', 'Date', 'Échéance', 'Source', 'Statut']].concat(sortRegistre(list).map(function (p) {
          return [p.promesse, p.auteur, p.date, p.echeance, p.source, p.statut];
        }));
        // Point-virgule et BOM : le fichier s'ouvre directement dans un tableur configuré en français.
        var csv = '﻿' + rows.map(function (r) { return r.map(csvCell).join(';'); }).join('\r\n');
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        a.download = 'registre-des-promesses-' + today() + '.csv';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
        status.textContent = 'Export CSV téléchargé.';
      });

      box.querySelector('.registre-clear').addEventListener('click', function () {
        if (!list.length || !window.confirm('Vider le registre des promesses ?')) return;
        list = [];
        saveRegistre(list);
        render();
      });

      render();
    });
  }

  window.Atelier = { overview: overview, deck: deck, questions: questions, chapterHero: chapterHero, rails: rails, reveals: reveals, registre: registre };
})();
