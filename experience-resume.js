(function () {
  const STORE_KEY = 'nexi.lastDiagnosis';
  const btn = document.getElementById('btn-resume');
  if (!btn) return;
  let data = null;
  try { data = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) {}
  if (!data || !data.diagnosis) return;
  btn.hidden = false;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>');
  }

  function paint(data) {
    if (window.NexiExperience && window.NexiExperience.renderSaved) {
      window.NexiExperience.renderSaved(data);
      return;
    }
    const d = data.diagnosis || {};
    const a = data.next_best_action || {};
    const title = document.getElementById('result-title');
    if (title) title.textContent = a.title || data.title || 'Your next move';
    const grid = document.getElementById('diag-grid');
    if (grid) {
      const cells = [
        { k: 'Want', v: d.want, span: true },
        { k: "What's going on", v: d.whats_going_on, span: true },
        { k: 'Primary lens', v: d.lens_label || d.lens || data.lens || '\u2014' },
        { k: 'Not doing today', v: d.not_doing_today || '\u2014' }
      ];
      if (d.collapse) cells.push({ k: 'Where it collapses', v: d.collapse, span: true });
      if (d.better_path) cells.push({ k: 'Better path', v: d.better_path, span: true });
      grid.innerHTML = cells.map(function (c) {
        return '<div class="diag-cell' + (c.span ? ' span2' : '') + '"><div class="k">' + esc(c.k) + '</div><div class="v">' + esc(c.v || '\u2014') + '</div></div>';
      }).join('');
    }
    const mission = document.getElementById('mission-card');
    if (mission) {
      const steps = Array.isArray(a.steps) ? a.steps : [];
      mission.innerHTML =
        '<h3>' + esc(a.title || 'Mission') + '</h3>' +
        '<p style="color:var(--muted);font-size:0.92rem">' + esc(a.why || '') + '</p>' +
        '<div class="mission-meta">' +
          '<span class="chip">' + esc(a.type || 'execute') + '</span>' +
          '<span class="chip">' + esc(String(a.est_minutes || 30)) + ' min</span>' +
          '<span class="chip">Done when: ' + esc(a.done_when || '\u2014') + '</span>' +
        '</div>' +
        (steps.length ? '<ul class="mission-steps">' + steps.map(function (s, i) {
          return '<li><span>' + (i + 1) + '</span><div>' + esc(s) + '</div></li>';
        }).join('') + '</ul>' : '');
    }
    const belief = document.getElementById('belief-line');
    if (belief) {
      const line = data.belief || data.identity_line;
      belief.textContent = line
        ? '\u201c' + line + '\u201d' + (data.tomorrow_focus ? ' \u00b7 Tomorrow: ' + data.tomorrow_focus : '')
        : 'Evidence compounds. Run the move.';
    }
    const gate = document.getElementById('phase-gate');
    const chat = document.getElementById('phase-chat');
    const panel = document.getElementById('phase-result');
    if (gate) gate.hidden = true;
    if (chat) chat.hidden = true;
    if (panel) {
      panel.hidden = false;
      panel.classList.add('visible');
    }
  }

  btn.addEventListener('click', function () { paint(data); });
})();
