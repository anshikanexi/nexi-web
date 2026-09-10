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
        '<p>Run Experience Nexi once. Journey will pin the last locked mission here \u2014 same store Sample Result reads.</p>' +
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

  host.innerHTML =
    '<article class="path-card glass journey-live live">' +
      '<p class="path-num">Live chapter \u00b7 locked ' + esc(stamp || 'on this device') + '</p>' +
      '<h2>' + esc(a.title || data.title || 'Your next move') + '</h2>' +
      '<p>' + esc(d.whats_going_on || d.want || 'Diagnosis persisted from Experience Nexi.') + '</p>' +
      '<div class="inner-cta" style="margin-top:.9rem">' +
        '<span class="chip teal">' + esc(primary) + '</span>' +
        '<span class="chip">' + esc(String(a.est_minutes || 30)) + ' min</span>' +
        '<span class="chip">Done when: ' + esc(a.done_when || 'evidence exists') + '</span>' +
      '</div>' +
      '<div class="inner-cta" style="margin-top:1rem">' +
        '<a class="btn" href="sample-result.html">Open assembled diagnosis</a>' +
        '<a class="btn secondary" href="experience.html">Run again</a>' +
      '</div>' +
    '</article>';

  requestAnimationFrame(function () {
    const card = host.querySelector('.path-card');
    if (card) card.classList.add('assembled');
  });
})();
