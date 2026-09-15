/* ============================================================
   GET YOUR ADMISSION – MAIN JS
   ============================================================ */

// ── Hamburger menu toggle ───────────────────────────────────
(function () {
  const btn = document.getElementById('hamburger-btn');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    btn.setAttribute('aria-expanded', isOpen);
  });
  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
})();

// ── Active nav link based on URL ────────────────────────────
(function () {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const navMap = {
    'students': 'nav-students',
    'colleges': 'nav-colleges',
    'help':     'nav-help',
    'videos':   'nav-videos',
    'account':  'nav-home',
  };
  if (cat && navMap[cat]) {
    const all = document.querySelectorAll('.nav-link');
    all.forEach(function (a) { a.classList.remove('active'); });
    const active = document.getElementById(navMap[cat]);
    if (active) active.classList.add('active');
  }
})();

// ── Breadcrumb update for article page ─────────────────────
(function () {
  const bc = document.getElementById('bc-current');
  if (!bc) return;
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const labels = {
    'students': 'For Students',
    'colleges': 'For Institutes',
    'help':     'Help & Support',
    'videos':   'Video Tutorials',
    'account':  'Account Settings',
  };
  if (cat && labels[cat]) bc.textContent = labels[cat];
})();

// ── Hero search form (placeholder behaviour) ─────────────────
(function () {
  const form = document.getElementById('hero-search-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const q = document.getElementById('hero-search-input').value.trim();
    if (q) {
      alert('Search coming soon! You searched for: "' + q + '"');
    }
  });
})();

// ── Article video playlist is handled by videos.js ──────────
