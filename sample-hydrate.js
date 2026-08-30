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

  function assemble() {
    const cells = document.querySelectorAll('.diag-cell');
    const mission = document.getElementById('mission-card');
    const steps = document.querySelectorAll('#mission-steps li');
    const belief = document.getElementById('belief-line');
    const actions = document.getElementById('result-actions');
    cells.forEach((cell, i) => setTimeout(() => cell.classList.add('assembled'), 180 + i * 90));
    setTimeout(() => mission && mission.classList.add('assembled'), 780);
    steps.forEach((li, i) => setTimeout(() => li.classList.add('assembled'), 980 + i * 90));
    setTimeout(() => belief && belief.classList.add('assembled'), 1480);
    setTimeout(() => actions && actions.classList.add('assembled'), 1650);
  }

  function hydrate(data) {
    const d = data.diagnosis || {};
    const a = data.next_best_action || {};
    const titleEl = document.querySelector('.sample-title');
    const subEl = document.querySelector('.sample-sub');
    const status = document.querySelector('.status-bar span:last-child');
    if (status) status.textContent = 'Diagnosis locked · your last live run';
    if (titleEl) titleEl.textContent = a.title || data.title || titleEl.textContent;
    if (subEl) {
      subEl.textContent = 'Hydrated from your last Experience Nexi session on this device. Same triple-lens lock as the live engine.';
    }

    const cells = [
      { k: 'Want', v: d.want, span: true },
      { k: "What's going on", v: d.whats_going_on, span: true },
      { k: 'Primary lens', v: d.lens_label || d.lens || data.lens || '—' },
      { k: 'Not doing today', v: d.not_doing_today || '—' },
    ];
    if (d.collapse) cells.push({ k: 'Where it collapses', v: d.collapse, span: true });
    if (d.better_path) cells.push({ k: 'Better path', v: d.better_path, span: true });

    const grid = document.getElementById('diag-grid');
    grid.innerHTML = cells.map((c, i) =>
      '<div class="diag-cell' + (c.span ? ' span2' : '') + '" data-delay="' + (i * 80) + '">' +
        '<div class="k">' + esc(c.k) + '</div><div class="v">' + esc(c.v || '—') + '</div></div>'
    ).join('');

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
        ? '<ul class="mission-steps" id="mission-steps">' + steps.map((s, i) =>
            '<li data-delay="' + (i * 90) + '"><span>' + (i + 1) + '</span><div>' + esc(s) + '</div></li>'
          ).join('') + '</ul>'
        : '');

    const belief = document.getElementById('belief-line');
    const line = data.belief || data.identity_line;
    belief.textContent = line
      ? '“' + line + '”' + (data.tomorrow_focus ? ' · Tomorrow: ' + data.tomorrow_focus : '')
      : belief.textContent;

    const note = document.querySelector('.sample-note');
    if (note) {
      note.innerHTML = 'Live diagnosis from this device. Run again: <a href="experience.html">Experience Nexi</a>';
    }
  }

  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) hydrate(JSON.parse(raw));
  } catch (e) {
    console.warn('sample hydrate skipped', e);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', assemble);
  } else {
    assemble();
  }
})();
