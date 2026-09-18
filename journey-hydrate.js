(function () {
  const STORE_KEY = 'nexi.lastDiagnosis';
  const host = document.getElementById('journey-live');
  if (!host) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function when(ts) {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  function lensOf(data) {
    const raw = (data && (data.lens || (data.diagnosis && (data.diagnosis.lens_label || data.diagnosis.lens)))) || '';
    const t = String(raw).toLowerCase();
    if (t.indexOf('wealth') !== -1) return 'Wealth';
    if (t.indexOf('soul') !== -1) return 'Soul';
    if (t.indexOf('prestige') !== -1) return 'Prestige';
    return 'Prestige';
  }

  function paintLenses(primary) {
    const weights = {
      Prestige: primary === 'Prestige' ? 86 : 54,
      Wealth: primary === 'Wealth' ? 88 : 51,
      Soul: primary === 'Soul' ? 84 : 48
    };
    return ['Prestige', 'Wealth', 'Soul'].map(function (name) {
      const isP = name === primary;
      return '<div class="lens-meter' + (isP ? ' primary' : '') + '" style="--w:' + weights[name] + '%">' +
        '<div class="lm-k">' + (isP ? 'Primary lens' : 'Secondary') + '</div>' +
        '<div class="lm-v">' + name + '</div>' +
        '<div class="lm-bar"><i></i></div></div>';
    }).join('');
  }

  function assemble(root) {
    root.querySelectorAll('.lens-meter').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('assembled'); }, 80 + i * 90);
    });
    root.querySelectorAll('.diag-cell').forEach(function (cell, i) {
      setTimeout(function () { cell.classList.add('assembled'); }, 280 + i * 90);
    });
    const mission = root.querySelector('.mission-card');
    setTimeout(function () { if (mission) mission.classList.add('assembled'); }, 780);
    root.querySelectorAll('.mission-steps li').forEach(function (li, i) {
      setTimeout(function () { li.classList.add('assembled'); }, 980 + i * 90);
    });
    const belief = root.querySelector('.belief-line');
    const actions = root.querySelector('.result-actions');
    setTimeout(function () { if (belief) belief.classList.add('assembled'); }, 1480);
    setTimeout(function () { if (actions) actions.classList.add('assembled'); }, 1650);
  }

  let data = null;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) data = JSON.parse(raw);
  } catch (e) {}

  if (!data || !data.diagnosis) {
    host.innerHTML =
      '<article class="path-card glass journey-live empty">' +
        '<p class="path-num">Live chapter \u00b7 this device</p>' +
        '<h2>No diagnosis locked yet</h2>' +
        '<p>Run Experience Nexi once. Journey pins the last lock here \u2014 same surface Sample Result and Experience use.</p>' +
        '<div class="inner-cta" style="margin-top:.9rem">' +
          '<a class="btn" href="experience.html">Start Mission Zero</a>' +
          '<a class="btn secondary" href="sample-result.html">See sample lock</a>' +
        '</div>' +
      '</article>';
    requestAnimationFrame(function () {
      const card = host.querySelector('.path-card');
      if (card) card.classList.add('assembled');
    });
    return;
  }

  const d = data.diagnosis || {};
  const a = data.next_best_action || {};
  const primary = lensOf(data);
  const stamp = when(data.savedAt);
  const steps = Array.isArray(a.steps) ? a.steps : [];
  const line = data.belief || data.identity_line;
  const cells = [
    { k: 'Want', v: d.want, span: true },
    { k: "What's going on", v: d.whats_going_on, span: true },
    { k: 'Primary lens', v: d.lens_label || d.lens || data.lens || '\u2014' },
    { k: 'Not doing today', v: d.not_doing_today || '\u2014' }
  ];
  if (d.collapse) cells.push({ k: 'Where it collapses', v: d.collapse, span: true });
  if (d.better_path) cells.push({ k: 'Better path', v: d.better_path, span: true });

  host.innerHTML =
    '<article class="journey-live live journey-lock lock-surface">' +
      '<p class="path-num">Live chapter \u00b7 locked ' + esc(stamp || 'on this device') + '</p>' +
      '<h2>' + esc(a.title || data.title || 'Your next move') + '</h2>' +
      '<div class="lens-collision">' + paintLenses(primary) + '</div>' +
      '<div class="diag-grid">' + cells.map(function (c) {
        return '<div class="diag-cell' + (c.span ? ' span2' : '') + '"><div class="k">' + esc(c.k) + '</div><div class="v">' + esc(c.v || '\u2014') + '</div></div>';
      }).join('') + '</div>' +
      '<div class="mission-card">' +
        '<h3>' + esc(a.title || 'Mission') + '</h3>' +
        '<p>' + esc(a.why || d.whats_going_on || '') + '</p>' +
        '<div class="mission-meta">' +
          '<span class="chip">' + esc(a.type || 'execute') + '</span>' +
          '<span class="chip">' + esc(String(a.est_minutes || 30)) + ' min</span>' +
          '<span class="chip">Done when: ' + esc(a.done_when || 'evidence exists') + '</span>' +
        '</div>' +
        (steps.length
          ? '<ul class="mission-steps">' + steps.map(function (s, i) {
              return '<li><span>' + (i + 1) + '</span><div>' + esc(s) + '</div></li>';
            }).join('') + '</ul>'
          : '') +
      '</div>' +
      '<div class="belief-line">' +
        (line ? '\u201c' + esc(line) + '\u201d' : 'Evidence compounds. Run the move.') +
        (data.tomorrow_focus ? ' \u00b7 Tomorrow: ' + esc(data.tomorrow_focus) : '') +
      '</div>' +
      '<div class="result-actions inner-cta">' +
        '<a class="btn" href="sample-result.html">Open assembled diagnosis</a>' +
        '<a class="btn secondary" href="experience.html">Run again</a>' +
      '</div>' +
    '</article>';

  assemble(host);
})();
