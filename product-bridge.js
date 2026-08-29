(function () {
  injectCinematicNavCss();
  bootExperienceExtras();
  reconnectHome();

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

  function reconnectHome() {
    if (!document.querySelector('link[href="cinematic.css"]')) return;
    const links = document.querySelector('.nav-links');
    if (links && /Features|Testimonials/.test(links.textContent)) {
      links.innerHTML = '<a href="why.html">Why Nexi</a><a href="how.html">How It Works</a><a href="experience.html">Experience</a><a href="#waitlist" class="cta-nav">Join Waitlist</a>';
    }
    const lead = document.querySelector('#hero .lead');
    if (lead && /companion that helps you grow/i.test(lead.textContent)) {
      lead.textContent = 'One intelligence reads Prestige, Wealth, and Soul \u2014 then names the bottleneck and gives you one move.';
    }
    const actions = document.querySelector('#hero .actions');
    if (actions) {
      const primary = actions.querySelector('.btn');
      const ghost = actions.querySelector('.ghost');
      if (primary) { primary.href = 'experience.html'; primary.textContent = 'Experience Nexi \u2192'; }
      if (ghost) { ghost.href = '#waitlist'; ghost.textContent = 'Join the waitlist'; }
    }
    document.querySelectorAll('a.ghost').forEach(function (a) {
      if (/See How It Works/.test(a.textContent)) a.href = 'how.html';
    });
    const stats = document.querySelector('#waitlist .stats');
    if (stats && /10,000/.test(stats.textContent)) {
      stats.innerHTML = '<div><b class="gold">3 lenses</b><span>Prestige \u00b7 Wealth \u00b7 Soul</span></div><div><b>Live engine</b><span>Experience Nexi</span></div><div><b>Name + email</b><span>Waitlist only</span></div>';
    }
  }
})();
