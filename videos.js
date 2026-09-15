/* ============================================================
   GET YOUR ADMISSION – VIDEO TUTORIALS
   ============================================================ */

(function () {
  var CATALOG = {
    students: [
      {
        id: '4Xk7mC6EQkM',
        title: 'How to Register & Create an Account',
        description: 'Complete step-by-step tutorial on how to register and create your account on the GetYourAdmission platform.',
        url: 'https://youtu.be/4Xk7mC6EQkM'
      },
      {
        id: 'i6rqc9wB_z4',
        title: 'How to Apply for Courses Directly',
        description: 'In this video, learn how to apply for courses directly through the GetYourAdmission platform step-by-step.',
        url: 'https://youtu.be/i6rqc9wB_z4'
      },
      {
        id: 'kKJqR4Aw7nA',
        title: 'How to Apply to Specific Institutes',
        description: 'Learn how to search for colleges and submit course applications directly through institute profiles on the GetYourAdmission platform in this step-by-step tutorial.',
        url: 'https://youtu.be/kKJqR4Aw7nA'
      },
      {
        id: 'oDoPvm3bU3w',
        title: 'How to Upload Documents & Profile Data',
        description: 'How to Upload Documents and Information on GetYourAdmission.',
        url: 'https://youtu.be/oDoPvm3bU3w'
      },
      {
        id: 'Gylu0ffhrB0',
        title: 'Student Dashboard Overview & Navigation',
        description: 'A complete walkthrough of the GetYourAdmission student dashboard. Learn how to navigate your profile, track submitted applications, upload documents, and manage your account in one place.',
        url: 'https://youtu.be/Gylu0ffhrB0'
      }
    ],
    institutes: [
      {
        id: '4RFaVGWnjMM',
        title: 'How to Register Your Institute',
        description: 'Welcome to the GetYourAdmission Institute Guide! In this first tutorial, we walk you through the complete process of registering your institution on our platform so you can start receiving student applications.',
        url: 'https://youtu.be/4RFaVGWnjMM'
      },
      {
        id: 'NihVxxXH1KQ',
        title: 'Institute Dashboard Overview',
        description: 'Welcome to the GetYourAdmission Institute Guide! In this video, we provide a complete walkthrough of your institute dashboard.',
        url: 'https://youtu.be/NihVxxXH1KQ'
      },
      {
        id: '8Jzo8hBc48Q',
        title: 'How to Edit Institute Details & Profile',
        description: "Welcome to the GetYourAdmission Institute Guide! In this video, learn how to edit and update your institute's profile, contact information, and branding to make your page stand out to prospective students.",
        url: 'https://youtu.be/8Jzo8hBc48Q'
      },
      {
        id: 'Vv3gZ0rOyqY',
        title: 'How to Add Courses to Your Profile',
        description: 'Welcome to the GetYourAdmission Institute Guide! Learn how to easily add, upload, and manage your specific course offerings, fee structures, and seat availability on the platform.',
        url: 'https://youtu.be/Vv3gZ0rOyqY'
      },
      {
        id: 'iNrMt24h8F0',
        title: 'How Your Institute Profile Becomes Public',
        description: "Welcome to the GetYourAdmission Institute Guide! You've set up your profile and added your courses — now what? This video explains the final verification process and how your institute becomes publicly visible to students on the platform.",
        url: 'https://youtu.be/iNrMt24h8F0'
      }
    ]
  };

  var GROUP_LABEL = { students: 'Student', institutes: 'Institute' };
  var lbState = { group: 'students', index: 0 };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function embedSrc(id, autoplay) {
    var src = 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?rel=0&modestbranding=1';
    if (autoplay) src += '&autoplay=1';
    return src;
  }

  function thumbSrc(id) {
    return 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg';
  }

  function iframeHtml(video, autoplay) {
    return (
      '<iframe src="' + embedSrc(video.id, autoplay) + '"' +
      ' title="' + escapeHtml(video.title) + ' | GetYourAdmission"' +
      ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
      ' referrerpolicy="strict-origin-when-cross-origin"' +
      ' allowfullscreen></iframe>'
    );
  }

  function padStep(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function resolveGroup(root) {
    var explicit = root.getAttribute('data-video-player') || root.getAttribute('data-video-gallery');
    if (explicit && CATALOG[explicit]) return explicit;
    var cat = new URLSearchParams(window.location.search).get('cat');
    if (cat === 'colleges') return 'institutes';
    return 'students';
  }

  function requestedIndex(videos) {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get('v');
    if (!requested) return 0;
    var index = -1;
    videos.forEach(function (video, i) {
      if (video.id === requested) index = i;
    });
    return index < 0 ? 0 : index;
  }

  function injectLightbox() {
    if (document.getElementById('gya-lightbox')) return;

    var style = document.createElement('style');
    style.id = 'gya-lightbox-css';
    style.textContent =
      '#gya-lightbox{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;}' +
      '#gya-lightbox[hidden]{display:none !important;}' +
      '.gya-lb-backdrop{position:absolute;inset:0;background:rgba(7,11,22,.82);backdrop-filter:blur(10px);}' +
      '.gya-lb-dialog{position:relative;width:min(1080px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;background:#0B1220;border-radius:22px;box-shadow:0 40px 80px -24px rgba(0,0,0,.55);color:#fff;}' +
      '.gya-lb-close{position:absolute;top:12px;right:12px;z-index:2;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;font-size:22px;line-height:1;}' +
      '.gya-lb-close:hover{background:rgba(255,255,255,.22);}' +
      '.gya-lb-player{aspect-ratio:16/9;background:#000;overflow:hidden;border-radius:22px 22px 0 0;}' +
      '.gya-lb-player iframe{width:100%;height:100%;border:0;display:block;}' +
      '.gya-lb-meta{padding:20px 22px 10px;}' +
      '.gya-lb-kicker{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#93C5FD;margin-bottom:8px;}' +
      '.gya-lb-meta h3{margin:0 0 8px;font-size:22px;line-height:1.25;}' +
      '.gya-lb-meta p{margin:0;color:rgba(255,255,255,.62);font-size:14px;line-height:1.6;}' +
      '.gya-lb-controls{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 8px;}' +
      '.gya-lb-controls button{border:0;background:rgba(255,255,255,.1);color:#fff;border-radius:10px;padding:10px 14px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;}' +
      '.gya-lb-controls button:hover{background:rgba(255,255,255,.18);}' +
      '.gya-lb-controls button:disabled{opacity:.35;cursor:default;}' +
      '.gya-lb-step{font-size:13px;font-weight:700;color:rgba(255,255,255,.7);}' +
      '.gya-lb-queue{display:flex;gap:10px;overflow-x:auto;padding:8px 22px 22px;}' +
      '.gya-lb-qitem{flex:none;width:168px;border:0;padding:0;background:transparent;color:#fff;text-align:left;cursor:pointer;font-family:inherit;}' +
      '.gya-lb-qitem img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px;display:block;border:2px solid transparent;}' +
      '.gya-lb-qitem.active img{border-color:#3B6DF0;}' +
      '.gya-lb-qitem span{display:block;margin-top:6px;font-size:12px;font-weight:600;line-height:1.35;color:rgba(255,255,255,.82);}' +
      'body.gya-lb-open{overflow:hidden;}' +
      '@media (max-width:700px){.gya-lb-dialog{width:100%;border-radius:16px;}.gya-lb-player{border-radius:16px 16px 0 0;}.gya-lb-meta h3{font-size:18px;}.gya-lb-qitem{width:132px;}}';
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.id = 'gya-lightbox';
    wrap.setAttribute('hidden', '');
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Video player');
    wrap.innerHTML =
      '<div class="gya-lb-backdrop" data-lb-close></div>' +
      '<div class="gya-lb-dialog">' +
        '<button class="gya-lb-close" type="button" data-lb-close aria-label="Close video">×</button>' +
        '<div class="gya-lb-player" data-lb-frame></div>' +
        '<div class="gya-lb-meta">' +
          '<div class="gya-lb-kicker" data-lb-kicker></div>' +
          '<h3 data-lb-title></h3>' +
          '<p data-lb-desc></p>' +
        '</div>' +
        '<div class="gya-lb-controls">' +
          '<button type="button" data-lb-prev>← Previous</button>' +
          '<div class="gya-lb-step" data-lb-step></div>' +
          '<button type="button" data-lb-next>Next →</button>' +
        '</div>' +
        '<div class="gya-lb-queue" data-lb-queue></div>' +
      '</div>';
    document.body.appendChild(wrap);

    wrap.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-lb-close')) closeLightbox();
    });
    wrap.querySelector('[data-lb-prev]').addEventListener('click', function () {
      openLightbox(lbState.group, lbState.index - 1);
    });
    wrap.querySelector('[data-lb-next]').addEventListener('click', function () {
      openLightbox(lbState.group, lbState.index + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (wrap.hasAttribute('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(lbState.group, lbState.index - 1);
      if (e.key === 'ArrowRight') openLightbox(lbState.group, lbState.index + 1);
    });
  }

  function renderLightbox() {
    var videos = CATALOG[lbState.group] || [];
    var video = videos[lbState.index];
    if (!video) return;
    var wrap = document.getElementById('gya-lightbox');
    wrap.querySelector('[data-lb-frame]').innerHTML = iframeHtml(video, true);
    wrap.querySelector('[data-lb-kicker]').textContent =
      GROUP_LABEL[lbState.group] + ' tutorial · Step ' + (lbState.index + 1) + ' of ' + videos.length;
    wrap.querySelector('[data-lb-title]').textContent = video.title;
    wrap.querySelector('[data-lb-desc]').textContent = video.description;
    wrap.querySelector('[data-lb-step]').textContent = 'Step ' + (lbState.index + 1) + ' of ' + videos.length;
    wrap.querySelector('[data-lb-prev]').disabled = lbState.index <= 0;
    wrap.querySelector('[data-lb-next]').disabled = lbState.index >= videos.length - 1;

    var queue = wrap.querySelector('[data-lb-queue]');
    queue.innerHTML = '';
    videos.forEach(function (item, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gya-lb-qitem' + (i === lbState.index ? ' active' : '');
      btn.innerHTML =
        '<img src="' + thumbSrc(item.id) + '" alt="">' +
        '<span>' + padStep(i + 1) + '. ' + escapeHtml(item.title) + '</span>';
      btn.addEventListener('click', function () { openLightbox(lbState.group, i); });
      queue.appendChild(btn);
    });
  }

  function openLightbox(group, index) {
    var videos = CATALOG[group];
    if (!videos || !videos.length) return;
    if (index < 0 || index >= videos.length) return;
    injectLightbox();
    lbState.group = group;
    lbState.index = index;
    renderLightbox();
    var wrap = document.getElementById('gya-lightbox');
    wrap.removeAttribute('hidden');
    document.body.classList.add('gya-lb-open');
    wrap.querySelector('.gya-lb-close').focus();
  }

  function closeLightbox() {
    var wrap = document.getElementById('gya-lightbox');
    if (!wrap) return;
    wrap.setAttribute('hidden', '');
    wrap.querySelector('[data-lb-frame]').innerHTML = '';
    document.body.classList.remove('gya-lb-open');
  }

  function initGallery(root) {
    var group = resolveGroup(root);
    var videos = CATALOG[group];
    if (!videos) return;
    root.innerHTML = '';
    videos.forEach(function (video, i) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'vid-card';
      card.setAttribute('aria-label', 'Play ' + video.title);
      card.innerHTML =
        '<span class="vid-card-media">' +
          '<img src="' + thumbSrc(video.id) + '" alt="">' +
          '<span class="vid-card-play" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>' +
          '</span>' +
          '<span class="vid-card-step">Step ' + padStep(i + 1) + '</span>' +
        '</span>' +
        '<span class="vid-card-body">' +
          '<span class="vid-card-kicker">' + GROUP_LABEL[group] + ' · ' + (i + 1) + ' / ' + videos.length + '</span>' +
          '<strong>' + escapeHtml(video.title) + '</strong>' +
          '<span class="vid-card-desc">' + escapeHtml(video.description) + '</span>' +
        '</span>';
      card.addEventListener('click', function () { openLightbox(group, i); });
      root.appendChild(card);
    });
  }

  function initPlayer(root) {
    var group = resolveGroup(root);
    var videos = CATALOG[group];
    if (!videos || !videos.length) return;

    var frameHost = root.querySelector('[data-video-frame]');
    var titleEl = root.querySelector('[data-video-title]');
    var descEl = root.querySelector('[data-video-desc]');
    var listEl = root.querySelector('[data-video-list]');
    var expandEl = root.querySelector('[data-video-expand]');
    var index = requestedIndex(videos);

    function render(i, openLarge) {
      index = i;
      var video = videos[i];
      if (openLarge) {
        openLightbox(group, i);
        return;
      }
      if (frameHost) frameHost.innerHTML = iframeHtml(video, false);
      if (titleEl) titleEl.textContent = video.title;
      if (descEl) descEl.textContent = video.description;
      if (!listEl) return;
      listEl.querySelectorAll('[data-video-index]').forEach(function (item) {
        var active = Number(item.getAttribute('data-video-index')) === i;
        item.classList.toggle('active', active);
        item.setAttribute('aria-current', active ? 'true' : 'false');
      });
    }

    if (listEl) {
      listEl.innerHTML = '';
      videos.forEach(function (video, i) {
        var item = document.createElement('button');
        item.type = 'button';
        item.className = 'mv-item';
        item.style.color = 'inherit';
        item.setAttribute('data-video-index', String(i));
        item.setAttribute('aria-label', 'Play step ' + (i + 1) + ': ' + video.title);
        item.innerHTML =
          '<span class="mv-thumb">' +
            '<img src="' + thumbSrc(video.id) + '" alt="">' +
            '<span class="mv-step">' + padStep(i + 1) + '</span>' +
          '</span>' +
          '<span class="mv-text">' +
            '<p>' + escapeHtml(video.title) + '</p>' +
            '<span>Step ' + (i + 1) + ' of ' + videos.length + ' · Watch larger</span>' +
          '</span>';
        item.addEventListener('click', function () { render(i, true); });
        listEl.appendChild(item);
      });
    }

    if (expandEl) {
      expandEl.addEventListener('click', function () { openLightbox(group, index); });
    }

    if (frameHost) {
      frameHost.style.cursor = 'pointer';
      frameHost.addEventListener('click', function (e) {
        if (e.target.tagName === 'IFRAME') return;
        openLightbox(group, index);
      });
    }

    render(index, false);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('[data-video-tab]');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-video-tab');
        tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        document.querySelectorAll('[data-video-panel]').forEach(function (panel) {
          var show = target === 'all' || panel.getAttribute('data-video-panel') === target;
          panel.hidden = !show;
        });
      });
    });
  }

  document.querySelectorAll('[data-video-gallery]').forEach(initGallery);
  document.querySelectorAll('[data-video-player]').forEach(initPlayer);
  initTabs();

  var autoOpen = new URLSearchParams(window.location.search).get('v');
  if (autoOpen) {
    ['students', 'institutes'].some(function (group) {
      var idx = -1;
      CATALOG[group].forEach(function (video, i) { if (video.id === autoOpen) idx = i; });
      if (idx >= 0) {
        openLightbox(group, idx);
        return true;
      }
      return false;
    });
  }

  window.GYA_VIDEOS = CATALOG;
  window.GYA_openVideo = openLightbox;
})();
