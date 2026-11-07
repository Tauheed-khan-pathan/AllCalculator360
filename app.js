/* All Calculator 360 — shared site script (Module 0)
   - Dark-mode toggle (localStorage 'ac360-theme')
   - Mobile menu toggle
   - Homepage calculator search (hero + header inputs, kept in sync)
   All lookups are null-guarded: this script also runs on calculator
   pages, which have no search inputs and no calculator cards. */

(function () {
  'use strict';

  /* ---------- Dark mode ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var root = document.documentElement;

  function syncThemeIcon() {
    if (!themeToggle) { return; }
    themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }

  if (themeToggle) {
    syncThemeIcon();
    themeToggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        try { localStorage.setItem('ac360-theme', 'light'); } catch (e) { /* storage unavailable */ }
      } else {
        root.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('ac360-theme', 'dark'); } catch (e) { /* storage unavailable */ }
      }
      syncThemeIcon();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
    var mobileLinks = mobileNav.querySelectorAll('a');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    }
  }

  /* ---------- Homepage search ---------- */
  var heroSearch = document.getElementById('heroSearch');
  var headerSearch = document.getElementById('headerSearch');
  var noResults = document.getElementById('noResults');
  var cards = document.querySelectorAll('.calc-card');

  // No search inputs on this page (e.g. calculator pages): nothing to do.
  if (!heroSearch && !headerSearch) { return; }

  function filterCards(query) {
    var q = (query || '').trim().toLowerCase();
    var visibleCount = 0;

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var haystack = ((card.getAttribute('data-name') || '') + ' ' +
        (card.getAttribute('data-desc') || '')).toLowerCase();
      var match = q === '' || haystack.indexOf(q) !== -1;
      card.style.display = match ? '' : 'none';
      if (match) { visibleCount++; }
    }

    // Hide a section whose grid has no visible cards.
    var grids = document.querySelectorAll('.calc-grid');
    for (var j = 0; j < grids.length; j++) {
      var grid = grids[j];
      var section = grid.closest('section');
      if (!section) { continue; }
      var visibleInGrid = 0;
      var gridCards = grid.querySelectorAll('.calc-card');
      for (var k = 0; k < gridCards.length; k++) {
        if (gridCards[k].style.display !== 'none') { visibleInGrid++; }
      }
      section.style.display = visibleInGrid === 0 ? 'none' : '';
    }

    if (noResults) {
      noResults.classList.toggle('show', q !== '' && visibleCount === 0);
    }
  }

  function onSearchInput(source, other) {
    if (other && other.value !== source.value) { other.value = source.value; }
    filterCards(source.value);
  }

  if (heroSearch) {
    heroSearch.addEventListener('input', function () {
      onSearchInput(heroSearch, headerSearch);
    });
  }
  if (headerSearch) {
    headerSearch.addEventListener('input', function () {
      onSearchInput(headerSearch, heroSearch);
    });
  }
})();
