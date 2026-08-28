(function () {
  if (!document.getElementById('phase-gate')) return;
  if (!document.querySelector('link[href="experience-extras.css"]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'experience-extras.css';
    document.head.appendChild(css);
  }
  const WANTS = [
    { label: 'Paid side project in 90 days', want: 'Ship a paid AI side project in 90 days' },
    { label: 'Stronger offer in 6 months', want: 'Get an offer at a stronger company within 6 months' },
    { label: 'Energy + one artifact this week', want: 'Recover energy and ship one real artifact this week' }
  ];
  function boot() {
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
        setTimeout(() => { if (input) { input.value = w.want; input.focus(); } }, 90);
      });
      wrap.appendChild(b);
    });
    const err = document.getElementById('gate-err');
    if (err) { gate.insertBefore(hint, err); gate.insertBefore(wrap, err); }
    else { gate.appendChild(hint); gate.appendChild(wrap); }
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
      composer.addEventListener('submit', () => { chatBox.innerHTML = ''; });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
