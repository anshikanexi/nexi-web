(function () {
  if (!document.getElementById('phase-gate')) return;

  if (!document.querySelector('link[href="experience-extras.css"]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'experience-extras.css';
    document.head.appendChild(css);
  }

  const STORE_KEY = 'nexi.lastDiagnosis';
  const WANTS = [
    { label: 'Paid side project in 90 days', want: 'Ship a paid AI side project in 90 days' },
    { label: 'Stronger offer in 6 months', want: 'Get an offer at a stronger company within 6 months' },
    { label: 'Energy + one artifact this week', want: 'Recover energy and ship one real artifact this week' }
  ];

  function bootStarters() {
    const gate = document.getElementById('phase-gate');
    const start = document.getElementById('btn-start');
    const input = document.getElementById('user-input');
    const composer = document.getElementById('composer');
    if (!gate || !start || document.getElementById('gate-starters')) return;

    const hint = document.createElement('p');
    hint.className = 'exp-sub';
    hint.style.cssText = 'margin:1.25rem auto 0;font-size:0.82rem';
    hint.textContent = 'Or start from a concrete want';

    const wrap = document.createElement('div');
    wrap.className = 'starters';
    wrap.id = 'gate-starters';
    WANTS.forEach((w) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'starter';
      b.textContent = w.label;
      b.addEventListener('click', () => {
        start.click();
        setTimeout(() => {
          if (input) {
            input.value = w.want;
            input.focus();
          }
        }, 90);
      });
      wrap.appendChild(b);
    });

    const err = document.getElementById('gate-err');
    if (err) {
      gate.insertBefore(hint, err);
      gate.insertBefore(wrap, err);
    } else {
      gate.appendChild(hint);
      gate.appendChild(wrap);
    }

    if (composer) {
      const chatBox = document.createElement('div');
      chatBox.className = 'starters';
      chatBox.id = 'chat-starters';
      composer.insertAdjacentElement('afterend', chatBox);
      start.addEventListener('click', () => {
        chatBox.innerHTML = '';
        WANTS.forEach((w) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'starter';
          b.textContent = w.want;
          b.addEventListener('click', () => {
            if (!input) return;
            input.value = w.want;
            composer.requestSubmit();
            chatBox.innerHTML = '';
          });
          chatBox.appendChild(b);
        });
      });
      composer.addEventListener('submit', () => {
        chatBox.innerHTML = '';
      });
    }
  }

  function detectPrimary(text) {
    const t = String(text || '').toLowerCase();
    if (/wealth|cash|money|revenue|distribution|paid/.test(t)) return 'Wealth';
    if (/soul|energy|recover|identity|meaning|burn/.test(t)) return 'Soul';
    if (/prestige|skill|proof|offer|reputation|career/.test(t)) return 'Prestige';
    return 'Prestige';
  }

  function assembleResult(panel, snapshot) {
    if (!panel) return;
    panel.classList.add('is-assembling');

    let collision = panel.querySelector('.lens-collision');
    if (!collision) {
      collision = document.createElement('div');
      collision.className = 'lens-collision';
      const grid = panel.querySelector('.diag-grid');
      if (grid) grid.insertAdjacentElement('beforebegin', collision);
      else panel.insertBefore(collision, panel.firstChild.nextSibling);
    }

    const primary = snapshot && snapshot.lens
      ? snapshot.lens
      : detectPrimary((panel.querySelector('.diag-cell .v') || {}).textContent);

    const weights = {
      Prestige: /prestige/i.test(String(primary)) ? 86 : 54,
      Wealth: /wealth/i.test(String(primary)) ? 88 : 51,
      Soul: /soul/i.test(String(primary)) ? 84 : 48
    };

    collision.innerHTML = ['Prestige', 'Wealth', 'Soul'].map((name) => {
      const isP = new RegExp(name, 'i').test(String(primary));
      return (
        '<div class="lens-meter' + (isP ? ' primary' : '') + '" style="--w:' + weights[name] + '%">' +
          '<div class="lm-k">' + (isP ? 'Primary lens' : 'Secondary') + '</div>' +
          '<div class="lm-v">' + name + '</div>' +
          '<div class="lm-bar"><i></i></div>' +
        '</div>'
      );
    }).join('');

    requestAnimationFrame(() => {
      collision.querySelectorAll('.lens-meter').forEach((el, i) => {
        setTimeout(() => el.classList.add('assembled'), 80 + i * 90);
      });
    });

    panel.querySelectorAll('.diag-cell').forEach((cell, i) => {
      cell.classList.remove('assembled');
      setTimeout(() => cell.classList.add('assembled'), 280 + i * 90);
    });

    const mission = panel.querySelector('.mission-card');
    if (mission) {
      mission.classList.remove('assembled');
      setTimeout(() => mission.classList.add('assembled'), 720);
    }
    panel.querySelectorAll('.mission-steps li').forEach((li, i) => {
      li.classList.remove('assembled');
      setTimeout(() => li.classList.add('assembled'), 860 + i * 90);
    });

    const belief = panel.querySelector('.belief-line');
    if (belief) {
      belief.classList.remove('assembled');
      setTimeout(() => belief.classList.add('assembled'), 1280);
    }

    const actions = panel.querySelector('.result-actions');
    if (actions) {
      actions.classList.remove('assembled');
      setTimeout(() => actions.classList.add('assembled'), 1460);
      if (!actions.querySelector('[data-sample-link]')) {
        const a = document.createElement('a');
        a.href = 'sample-result.html';
        a.className = 'btn secondary';
        a.setAttribute('data-sample-link', '1');
        a.textContent = 'Open assembled sample';
        actions.appendChild(a);
      }
    }

    if (!panel.querySelector('.persist-note')) {
      const note = document.createElement('p');
      note.className = 'persist-note';
      note.innerHTML = 'This diagnosis is saved on this device only. Revisit it on <a href="sample-result.html">Sample Result</a>.';
      panel.appendChild(note);
    }
  }

  window.NexiExperience = window.NexiExperience || {};
  window.NexiExperience.onDiagnosis = function (data) {
    try {
      const payload = {
        savedAt: Date.now(),
        title: (data && data.next_best_action && data.next_best_action.title) || 'Your next move',
        diagnosis: (data && data.diagnosis) || {},
        next_best_action: (data && data.next_best_action) || {},
        belief: data && (data.belief || data.identity_line),
        tomorrow_focus: data && data.tomorrow_focus,
        lens: (data && data.diagnosis && (data.diagnosis.lens_label || data.diagnosis.lens)) || ''
      };
      localStorage.setItem(STORE_KEY, JSON.stringify(payload));
      const panel = document.getElementById('phase-result');
      assembleResult(panel, payload);
    } catch (err) {
      console.warn('NexiExperience persist skipped', err);
    }
  };

  const result = document.getElementById('phase-result');
  if (result) {
    const mo = new MutationObserver(() => {
      if (result.classList.contains('visible') && !result.hidden) {
        setTimeout(() => assembleResult(result, null), 30);
      }
    });
    mo.observe(result, { attributes: true, attributeFilter: ['class', 'hidden'] });
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function () {
    const res = await nativeFetch.apply(this, arguments);
    try {
      const url = String(arguments[0] || '');
      if (url.indexOf('onboarding-decision') !== -1) {
        const data = await res.clone().json();
        if (data && data.mode !== 'ask' && window.NexiExperience.onDiagnosis) {
          window.NexiExperience.onDiagnosis(data);
        }
      }
    } catch (err) {}
    return res;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootStarters);
  else bootStarters();
})();
