(function () {
  injectCinematicNavCss();
  bootExperienceExtras();

  function injectCinematicNavCss() {
    if (document.getElementById('cinematic-nav-css')) return;
    if (!document.querySelector('link[href="cinematic.css"]')) return;
    const css = document.createElement('style');
    css.id = 'cinematic-nav-css';
    css.textContent = [
      '.nav-toggle{display:none;width:42px;height:42px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.04);backdrop-filter:blur(16px);cursor:pointer;flex-direction:column;justify-content:center;align-items:center;gap:5px}',
      '.nav-toggle span{display:block;width:16px;height:1.5px;background:var(--gold);transition:transform .3s,opacity .3s}',
      '.nav-backdrop{position:fixed;inset:0;z-index:30;background:rgba(5,10,18,.55);backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:opacity .3s}',
      'body.nav-open .nav-backdrop{opacity:1;pointer-events:auto}',
      'body.nav-open .nav-toggle span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}',
      'body.nav-open .nav-toggle span:nth-child(2){opacity:0}',
      'body.nav-open .nav-toggle span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}',
      '@media (max-width:900px){.nav-toggle{display:flex}.nav-links{display:flex!important;flex-direction:column;position:fixed;top:4.6rem;right:5.5%;min-width:220px;padding:1rem;gap:.85rem;border-radius:18px;background:rgba(8,14,24,.88);border:1px solid var(--line);backdrop-filter:blur(24px) saturate(160%);transform:translateY(-8px);opacity:0;pointer-events:none;z-index:41}body.nav-open .nav-links{opacity:1;pointer-events:auto;transform:none}}'
    ].join('');
    document.head.appendChild(css);
  }

  function bootExperienceExtras() {
    if (!document.getElementById('phase-gate')) return;
    if ([].some.call(document.scripts, function (s) { return (s.src || '').indexOf('experience-extras.js') !== -1; })) return;
    const s = document.createElement('script');
    s.src = 'experience-extras.js';
    document.body.appendChild(s);
  }
})();
