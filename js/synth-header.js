/*
 * Header Synth — modèle « Zéro Clics ».
 * Thème : clé localStorage « synth-theme » partagée par les long formats Synth ;
 * sans choix enregistré, on suit la préférence système.
 * Défilement : barre de lecture, fond flouté, masquage en descente.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');

  function systemPrefersDark() {
    try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return true; }
  }
  function resolvedTheme() {
    var stored = null;
    try { stored = localStorage.getItem('synth-theme'); } catch (e) {}
    if (stored === 'light' || stored === 'dark') return stored;
    return systemPrefersDark() ? 'dark' : 'light';
  }
  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.classList.toggle('show-sun', theme === 'dark');
      themeBtn.classList.toggle('show-moon', theme === 'light');
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
    }
    if (persist) {
      try { localStorage.setItem('synth-theme', theme); } catch (e) {}
    }
  }
  applyTheme(resolvedTheme(), false);
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

  var fill = document.getElementById('progressFill');
  var header = document.getElementById('siteHeader');
  var lastY = window.scrollY || 0;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || 0;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    if (fill) fill.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    if (header) {
      header.classList.toggle('scrolled', y > 8);
      // Un menu ouvert garde le header visible
      var locked = document.body.classList.contains('menu-open');
      header.classList.toggle('hide', !locked && y > lastY && y > 140);
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  // Changement de chapitre : la page revient en haut, la barre doit suivre
  window.addEventListener('hashchange', function () { setTimeout(onScroll, 0); });
  onScroll();
})();
