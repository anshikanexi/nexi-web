(function () {
  function hydrate() {
    const section = document.getElementById('waitlist');
    if (!section) return;

    let lock = document.getElementById('home-lock');
    const form = document.getElementById('waitlist-form');
    if (!lock && form) {
      lock = document.createElement('div');
      lock.className = 'home-lock lock-surface';
      lock.id = 'home-lock';

      const parent = form.parentElement;
      const heading = parent.querySelector('h2');
      const lead = parent.querySelector('.lead');
      const status = document.getElementById('waitlist-status');
      const stats = parent.querySelector('.stats');

      lock.innerHTML =
        '<div class="protocol" data-protocol="1">' +
          '<span data-step="1">Reserve</span>' +
          '<span data-step="2">Code</span>' +
          '<span data-step="3">Circle</span>' +
        '</div>' +
        '<p class="phase-label">Early circle</p>' +
        '<h2 class="home-heading">Reserve the first wave.</h2>' +
        '<p class="home-lead">Name and email only. A hashed invite code is issued on this device — the same surface Referral and Leaderboard use.</p>' +
        '<div class="lens-collision">' +
          '<div class="lens-meter primary" data-meter="seat" style="--w:82%"><div class="lm-k">Seat</div><div class="lm-v">Waitlist</div><div class="lm-bar"><i></i></div></div>' +
          '<div class="lens-meter" data-meter="code" style="--w:64%"><div class="lm-k">Circle code</div><div class="lm-v">Pending</div><div class="lm-bar"><i></i></div></div>' +
          '<div class="lens-meter" data-meter="invite" style="--w:48%"><div class="lm-k">Inbound</div><div class="lm-v">Open join</div><div class="lm-bar"><i></i></div></div>' +
        '</div>';

      if (heading) heading.remove();
      if (lead) lead.remove();
      parent.insertBefore(lock, form);
      lock.appendChild(form);
      if (status) lock.appendChild(status);
      if (stats) lock.appendChild(stats);
    }

    if (!lock) return;
    assemble(lock);
  }

  function assemble(lock) {
    lock.querySelectorAll('.lens-meter').forEach((el, i) => {
      setTimeout(() => el.classList.add('assembled'), 80 + i * 110);
    });
    const rail = lock.querySelector('[data-protocol]');
    if (!rail) return;
    let ref = '';
    try { ref = (localStorage.getItem('nexi.ref') || '').toUpperCase(); } catch (err) {}
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem('nexi.circle') || 'null'); } catch (err) {}
    const step = saved && saved.code ? 3 : ref ? 2 : 1;
    rail.querySelectorAll('span[data-step]').forEach((node) => {
      node.classList.toggle('on', Number(node.dataset.step) <= step);
    });
    if (ref) {
      const inviteMeter = lock.querySelector('[data-meter="invite"] .lm-v');
      if (inviteMeter) inviteMeter.textContent = ref;
    }
    if (saved && saved.code) {
      const codeMeter = lock.querySelector('[data-meter="code"] .lm-v');
      if (codeMeter) codeMeter.textContent = saved.code;
    }
  }

  const origPaint = window.paintCircleHandoff;
  if (typeof origPaint === 'function') {
    window.paintCircleHandoff = function (host, name, email, already, invites) {
      origPaint(host, name, email, already, invites);
      const lock = document.getElementById('home-lock');
      if (!lock) return;
      const codeEl = host && host.querySelector('[data-code]');
      const code = codeEl ? codeEl.getAttribute('data-code') : '';
      const codeMeter = lock.querySelector('[data-meter="code"] .lm-v');
      if (codeMeter && code) codeMeter.textContent = code;
      lock.querySelectorAll('[data-protocol] span[data-step]').forEach((node) => {
        node.classList.toggle('on', Number(node.dataset.step) <= 3);
      });
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrate);
  else hydrate();
})();
