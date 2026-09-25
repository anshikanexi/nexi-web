(function () {
  const lock = document.getElementById('home-lock');
  if (!lock) return;

  function assemble() {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', assemble);
  } else {
    assemble();
  }
})();
