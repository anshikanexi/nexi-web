(function () {
  const board = document.getElementById('board');
  const note = document.getElementById('lb-meta-note');
  if (!board) return;

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function skeleton() {
    board.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const row = document.createElement('article');
      row.className = 'row glass skel revealed';
      row.innerHTML = '<div class="rank">\u2014</div><div class="who"><div class="skel-bar lg"></div><div class="skel-bar sm"></div></div><div class="score"><span class="n">\u00b7\u00b7</span><span class="l">invites</span></div>';
      board.appendChild(row);
    }
  }

  function paintEmpty(kind) {
    board.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'empty-state glass revealed' + (kind === 'error' ? ' error' : '');
    if (kind === 'error') {
      if (note) note.textContent = 'Board unreachable';
      empty.innerHTML = '<h2>Ranks are live. This view is not.</h2><p>Could not reach the circle table. Refresh \u2014 we never invent placeholder names.</p><div class="inner-cta" style="margin-top:1.2rem"><a class="btn" href="referral.html">Claim a code anyway</a></div>';
    } else {
      if (note) note.textContent = 'Waiting on first conversion';
      empty.innerHTML = '<h2>The board is live. Empty on purpose.</h2><p>No fabricated ranks. The first verified invite that joins the waitlist writes row one.</p><div class="inner-cta" style="margin-top:1.2rem"><a class="btn" href="referral.html">Get your invite link</a><a class="btn secondary" href="index.html#waitlist">Join waitlist</a></div>';
    }
    board.appendChild(empty);
  }

  function paint(ranks) {
    board.innerHTML = '';
    if (!ranks.length) {
      paintEmpty('empty');
      return;
    }
    if (note) note.textContent = ranks.length + ' live ' + (ranks.length === 1 ? 'rank' : 'ranks');
    ranks.forEach((r, i) => {
      const row = document.createElement('article');
      row.className = 'row glass' + (r.rank <= 3 ? ' top' : '');
      row.style.transitionDelay = (i * 0.07) + 's';
      row.innerHTML =
        '<div class="rank">' + String(r.rank).padStart(2, '0') + '</div>' +
        '<div class="who"><div class="name">' + escapeHtml(r.alias) + '</div><div class="tag">' + escapeHtml(r.tag) + '</div></div>' +
        '<div class="score"><span class="n">' + r.invites + '</span><span class="l">invites</span></div>';
      board.appendChild(row);
    });
    const rows = board.querySelectorAll('.row');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      rows.forEach((el) => io.observe(el));
    } else {
      rows.forEach((el) => el.classList.add('revealed'));
    }
  }

  async function load() {
    skeleton();
    if (typeof supabase === 'undefined' || !supabase) { paintEmpty('error'); return; }
    const { data, error } = await supabase.rpc('get_circle_leaderboard', { p_limit: 16 });
    if (error) { console.error(error); paintEmpty('error'); return; }
    paint(data || []);
  }
  load();
})();
