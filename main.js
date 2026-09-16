(function () {
  var btn = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!nav.classList.contains('is-open'));
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });
})();

(function () {
  var bc = document.getElementById('bc-current');
  if (!bc) return;
  var cat = new URLSearchParams(window.location.search).get('cat');
  var labels = {
    students: 'For Students',
    colleges: 'For Institutes',
    help: 'Help',
    videos: 'Video Tutorials',
    account: 'Account'
  };
  if (cat && labels[cat]) bc.textContent = labels[cat];
})();

/* ============================================================
   COLLAPSIBLE STEP ACCORDIONS
   ============================================================ */
(function () {
  var collapsibles = document.querySelectorAll('.steps > li.is-collapsible');
  if (!collapsibles.length) return;

  collapsibles.forEach(function (stepEl) {
    var header = stepEl.querySelector('.step-header');
    var dropdown = stepEl.querySelector('.step-dropdown');
    var stepList = stepEl.closest('.steps');
    var videoGroup = stepList ? stepList.getAttribute('data-video-group') || 'students' : 'students';
    if (!header || !dropdown) return;

    function toggleStep(forceOpen) {
      var shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : dropdown.hasAttribute('hidden');
      if (shouldOpen) {
        var iframe = dropdown.querySelector('iframe[data-src]');
        if (iframe && !iframe.hasAttribute('src')) {
          iframe.setAttribute('src', iframe.getAttribute('data-src'));
        }
        dropdown.removeAttribute('hidden');
        stepEl.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      } else {
        dropdown.setAttribute('hidden', '');
        stepEl.classList.remove('is-open');
        header.setAttribute('aria-expanded', 'false');
      }
    }

    header.addEventListener('click', function (e) {
      // Don't toggle if clicking on an interactive element inside header
      if (e.target.closest('a, button')) return;
      toggleStep();
    });

    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStep();
      }
    });

    // Wire "Watch larger" button in step dropdown
    var expandBtn = stepEl.querySelector('[data-step-video-expand]');
    if (expandBtn) {
      expandBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var videoIdx = parseInt(expandBtn.getAttribute('data-step-video-expand'), 10) || 0;
        if (typeof window.GYA_openVideo === 'function') {
          window.GYA_openVideo(videoGroup, videoIdx);
        }
      });
    }
  });
})();
