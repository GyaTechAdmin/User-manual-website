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
