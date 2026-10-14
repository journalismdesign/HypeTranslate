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
    return 'Mon carnet de questions — Littératie du hype\n\n' + Object.keys(groups).map(function (g) {
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

  window.Atelier = { overview: overview, deck: deck, questions: questions };
})();
