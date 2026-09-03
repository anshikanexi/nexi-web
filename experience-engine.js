(function () {
  const SUPABASE_URL = 'https://wzygcmsikopblntwdqsv.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWdjbXNpa29wYmxudHdkcXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NTE2MDAsImV4cCI6MjEwMDQyNzYwMH0.tykWpPXzB-cMIoZSfQKByCuyZ8ipUs2RvSwMz6xaZUs';
  const FN_URL = SUPABASE_URL + '/functions/v1/onboarding-decision';

  if (!window.supabase) return;
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

  const el = {
    gate: document.getElementById('phase-gate'),
    chat: document.getElementById('phase-chat'),
    result: document.getElementById('phase-result'),
    thread: document.getElementById('thread'),
    composer: document.getElementById('composer'),
    input: document.getElementById('user-input'),
    btnStart: document.getElementById('btn-start'),
    btnSend: document.getElementById('btn-send'),
    btnAgain: document.getElementById('btn-again'),
    gateErr: document.getElementById('gate-err'),
    chatErr: document.getElementById('chat-err'),
    statusText: document.getElementById('status-text'),
    chatTitle: document.getElementById('chat-title'),
    chatSub: document.getElementById('chat-sub'),
    chatPhase: document.getElementById('chat-phase-label'),
    diagGrid: document.getElementById('diag-grid'),
    missionCard: document.getElementById('mission-card'),
    beliefLine: document.getElementById('belief-line'),
    resultTitle: document.getElementById('result-title'),
  };

  if (!el.gate || !el.btnStart) return;

  const state = { sessionId: null, phase: 'gate', busy: false };

  function setProtocol(step) {
    if (window.NexiExperience && window.NexiExperience.setProtocol) {
      window.NexiExperience.setProtocol(step);
      return;
    }
    const map = { gate: 0, star: 1, ask: 2, lock: 3 };
    const n = map[step] || 0;
    document.querySelectorAll('[data-protocol]').forEach((rail) => {
      rail.querySelectorAll('span[data-step]').forEach((node) => {
        node.classList.toggle('on', Number(node.dataset.step) <= n && n > 0);
      });
    });
  }

  function showPhase(name) {
    el.gate.hidden = name !== 'gate';
    el.chat.hidden = name !== 'chat';
    el.result.hidden = name !== 'result';
    el.result.classList.toggle('visible', name === 'result');
    state.phase = name;
  }

  function addMsg(role, text) {
    const div = document.createElement('div');
    div.className = 'msg ' + role;
    const who = document.createElement('span');
    who.className = 'who';
    who.textContent = role === 'nexi' ? 'Nexi' : 'You';
    div.appendChild(who);
    const body = document.createElement('div');
    body.textContent = text;
    div.appendChild(body);
    el.thread.appendChild(div);
    el.thread.scrollTop = el.thread.scrollHeight;
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className = 'msg nexi';
    div.id = 'typing-indicator';
    div.innerHTML = '<span class="who">Nexi</span><span class="typing"><i></i><i></i><i></i></span>';
    el.thread.appendChild(div);
    el.thread.scrollTop = el.thread.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  function setBusy(v) {
    state.busy = v;
    if (el.btnSend) el.btnSend.disabled = v;
    if (el.input) el.input.disabled = v;
    el.btnStart.disabled = v;
    if (el.statusText) el.statusText.textContent = v ? 'Nexi is thinking\u2026' : 'Nexi is listening';
  }

  async function ensureGuest() {
    const { data: { session } } = await sb.auth.getSession();
    if (session) return session;
    const { data, error } = await sb.auth.signInAnonymously();
    if (error) throw error;
    return data.session;
  }

  async function callDecision(payload) {
    const session = await ensureGuest();
    const res = await fetch(FN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session.access_token,
        apikey: SUPABASE_ANON,
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || json.detail || ('Request failed (' + res.status + ')'));
    }
    return json;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"');
  }

  function renderResult(data) {
    const d = data.diagnosis || {};
    const a = data.next_best_action || {};
    el.resultTitle.textContent = a.title || 'Your next move';
    const cells = [
      { k: 'Want', v: d.want, span: true },
      { k: "What's going on", v: d.whats_going_on, span: true },
      { k: 'Primary lens', v: d.lens_label || d.lens || '\u2014' },
      { k: 'Not doing today', v: d.not_doing_today || '\u2014' },
    ];
    if (d.collapse) cells.push({ k: 'Where it collapses', v: d.collapse, span: true });
    if (d.better_path) cells.push({ k: 'Better path', v: d.better_path, span: true });
    el.diagGrid.innerHTML = cells.map((c) =>
      '<div class="diag-cell' + (c.span ? ' span2' : '') + '"><div class="k">' + esc(c.k) + '</div><div class="v">' + esc(c.v || '\u2014') + '</div></div>'
    ).join('');
    const steps = Array.isArray(a.steps) ? a.steps : [];
    el.missionCard.innerHTML =
      '<h3>' + esc(a.title || 'Mission') + '</h3>' +
      '<p style="color:var(--muted);font-size:0.92rem">' + esc(a.why || '') + '</p>' +
      '<div class="mission-meta">' +
        '<span class="chip">' + esc(a.type || 'execute') + '</span>' +
        '<span class="chip">' + esc(String(a.est_minutes || 30)) + ' min</span>' +
        '<span class="chip">Done when: ' + esc(a.done_when || '\u2014') + '</span>' +
      '</div>' +
      (steps.length
        ? '<ul class="mission-steps">' + steps.map((s, i) =>
            '<li><span>' + (i + 1) + '</span><div>' + esc(s) + '</div></li>'
          ).join('') + '</ul>'
        : '');
    const belief = data.belief || data.identity_line || data.tomorrow_focus;
    el.beliefLine.textContent = belief
      ? (data.belief ? '\u201c' + belief + '\u201d' : belief)
      : 'Evidence compounds. Run the move.';
    if (data.tomorrow_focus) {
      el.beliefLine.textContent += ' \u00b7 Tomorrow: ' + data.tomorrow_focus;
    }
  }

  async function startSession() {
    el.gateErr.hidden = true;
    setBusy(true);
    try {
      await ensureGuest();
      el.thread.innerHTML = '';
      state.sessionId = null;
      showPhase('chat');
      setProtocol('star');
      el.chatPhase.textContent = 'North star';
      el.chatTitle.textContent = 'What do you want?';
      el.chatSub.textContent = 'One concrete destination. Nexi will ask only for facts that matter.';
      el.input.placeholder = 'e.g. Ship a paid AI side project in 90 days';
      el.input.focus();
      addMsg('nexi', 'State the one outcome you actually want. Concrete. No vision-board language.');
    } catch (e) {
      el.gateErr.hidden = false;
      el.gateErr.textContent = e.message || 'Could not start guest session.';
    } finally {
      setBusy(false);
    }
  }

  async function handleSend(text) {
    if (!text || state.busy) return;
    el.chatErr.hidden = true;
    addMsg('user', text);
    el.input.value = '';
    setBusy(true);
    addTyping();
    try {
      const payload = !state.sessionId
        ? { north_star_text: text }
        : { session_id: state.sessionId, answer: text };
      const data = await callDecision(payload);
      removeTyping();
      state.sessionId = data.session_id;
      if (data.mode === 'ask') {
        setProtocol('ask');
        el.chatPhase.textContent = 'Investigate';
        el.chatTitle.textContent = 'One more fact';
        el.chatSub.textContent = 'Nexi is mapping the bottleneck \u2014 answer with a concrete detail.';
        el.input.placeholder = 'Your answer\u2026';
        if (data.reaction) addMsg('nexi', data.reaction);
        addMsg('nexi', data.next_question || 'What have you already tried?');
      } else {
        setProtocol('lock');
        if (data.reaction) addMsg('nexi', data.reaction);
        addMsg('nexi', 'Diagnosis locked. Here is the move.');
        renderResult(data);
        if (window.NexiExperience && window.NexiExperience.onDiagnosis) {
          window.NexiExperience.onDiagnosis(data);
        }
        setTimeout(() => showPhase('result'), 480);
      }
    } catch (e) {
      removeTyping();
      el.chatErr.hidden = false;
      el.chatErr.textContent = e.message || 'Something went wrong. Try again.';
    } finally {
      setBusy(false);
      el.input.focus();
    }
  }

  el.btnStart.addEventListener('click', startSession);
  el.btnAgain.addEventListener('click', () => {
    state.sessionId = null;
    setProtocol('gate');
    showPhase('gate');
  });
  el.composer.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSend(el.input.value.trim());
  });
  el.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(el.input.value.trim());
    }
  });

  document.querySelectorAll('[data-want]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const want = btn.getAttribute('data-want');
      if (state.phase === 'gate') {
        startSession().then(() => {
          if (el.input) el.input.value = want;
        });
      } else if (el.input) {
        el.input.value = want;
        handleSend(want);
      }
    });
  });
})();
