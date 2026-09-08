(function () {
  const STORE_KEY = 'nexi.lastDiagnosis';
  const root = document.getElementById('sample-root');
  if (!root) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function primaryName(data) {
    const raw = (data && (data.lens || (data.diagnosis && (data.diagnosis.lens_label || data.diagnosis.lens)))) || '';
    const t = String(raw).toLowerCase();
    if (t.indexOf('wealth') !== -1) return 'Wealth';
    if (t.indexOf('soul') !== -1) return 'Soul';
    if (t.indexOf('prestige') !== -1) return 'Prestige';
    const blob = JSON.stringify(data || {}).toLowerCase();
    if (/cash|paid|revenue|customer|price/.test(blob)) return 'Wealth';
    if (/energy|recover|burn|capacity|sleep/.test(blob)) return 'Soul';
    return 'Prestige';
  }

  function paintLenses(primary) {
    const host = document.getElementById('lens-collision');
    if (!host) return;
    const weights = {
      Prestige: primary === 'Prestige' ? 86 : 54,
      Wealth: primary === 'Wealth' ? 88 : 51,
      Soul: primary === 'Soul' ? 84 : 48
    };
    host.innerHTML = ['Prestige', 'Wealth', 'Soul'].map(function (name) {
      const isP = name === primary;
      return '<div class="lens-meter' + (isP ? ' primary' : '') + '" style="--w:' + weights[name] + '%">' +
        '<div class="lm-k">' + (isP ? 'Primary lens' : 'Secondary') + '</div>' +
        '<div class="lm-v">' + name + '</div>' +
        '<div class="lm-bar"><i></i></div></div>';
    }).join('');
  }

  function assemble() {
    document.querySelectorAll('.lens-meter').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('assembled'); }, 80 + i * 90);
    });
    document.querySelectorAll('.diag-cell').forEach(function (cell, i) {
      setTimeout(function () { cell.classList.add('assembled'); }, 280 + i * 90);
    });
    const mission = document.getElementById('mission-card');
    setTimeout(function () { if (mission) mission.classList.add('assembled'); }, 780);
    document.querySelectorAll('#mission-steps li, .mission-steps li').forEach(function (li, i) {
      setTimeout(function () { li.classList.add('assembled'); }, 980 + i * 90);
    });
    const belief = document.getElementById('belief-line');
    const actions = document.getElementById('result-actions');
    setTimeout(function () { if (belief) belief.classList.add('assembled'); }, 1480);
    setTimeout(function () { if (actions) actions.classList.add('assembled'); }, 1650);
  }

  function formatWhen(ts) {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  function hydrate(data) {
    const d = data.diagnosis || {};
    const a = data.next_best_action || {};
    const titleEl = document.querySelector('.sample-title');
    const subEl = document.querySelector('.sample-sub');
    const kicker = document.getElementById('sample-kicker');
    const status = document.querySelector('.sample-status span:last-child');
    const when = formatWhen(data.savedAt);
    if (kicker) kicker.textContent = 'Diagnosis locked · your last live run';
    if (status) status.textContent = when ? ('Locked on this device · ' + when) : 'Diagnosis locked · your last live run';
    if (titleEl) {
      titleEl.innerHTML = esc(a.title || data.title || 'Your next move');
    }
    if (subEl) {
      subEl.textContent = 'Hydrated from your last Experience Nexi session on this device. Same triple-lens lock as the live engine.';
    }

    paintLenses(primaryName(data));

    const cells = [
      { k: 'Want', v: d.want, span: true },
      { k: "What's going on", v: d.whats_going_on, span: true },
      { k: 'Primary lens', v: d.lens_label || d.lens || data.lens || '—' },
      { k: 'Not doing today', v: d.not_doing_today || '—' }
    ];
    if (d.collapse) cells.push({ k: 'Where it collapses', v: d.collapse, span: true });
    if (d.better_path) cells.push({ k: 'Better path', v: d.better_path, span: true });

    const grid = document.getElementById('diag-grid');
    grid.innerHTML = cells.map(function (c, i) {
      return '<div class="diag-cell' + (c.span ? ' span2' : '') + '" data-delay="' + (i * 80) + '">' +
        '<div class="k">' + esc(c.k) + '</div><div class="v">' + esc(c.v || '—') + '</div></div>';
    }).join('');

    const steps = Array.isArray(a.steps) ? a.steps : [];
    const mission = document.getElementById('mission-card');
    mission.innerHTML =
      '<h3>' + esc(a.title || 'Mission') + '</h3>' +
      '<p>' + esc(a.why || '') + '</p>' +
      '<div class="mission-meta">' +
        '<span class="chip">' + esc(a.type || 'execute') + '</span>' +
        '<span class="chip">' + esc(String(a.est_minutes || 30)) + ' min</span>' +
        '<span class="chip">Done when: ' + esc(a.done_when || '—') + '</span>' +
      '</div>' +
      (steps.length
        ? '<ul class="mission-steps" id="mission-steps">' + steps.map(function (s, i) {
            return '<li data-delay="' + (i * 90) + '"><span>' + (i + 1) + '</span><div>' + esc(s) + '</div></li>';
          }).join('') + '</ul>'
        : '');

    const belief = document.getElementById('belief-line');
    const line = data.belief || data.identity_line;
    if (belief) {
      belief.textContent = line
        ? '“' + line + '”' + (data.tomorrow_focus ? ' · Tomorrow: ' + data.tomorrow_focus : '')
        : belief.textContent;
    }

    const note = document.querySelector('.sample-note');
    if (note) {
      note.innerHTML = 'Live diagnosis from this device. Run again: <a href="experience.html">Experience Nexi</a>.';
    }
  }

  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) hydrate(JSON.parse(raw));
    else paintLenses('Wealth');
  } catch (e) {
    console.warn('sample hydrate skipped', e);
    paintLenses('Wealth');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', assemble);
  } else {
    assemble();
  }
})();
