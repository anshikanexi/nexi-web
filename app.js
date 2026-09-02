const SUPABASE_URL = 'https://wzygcmsikopblntwdqsv.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWdjbXNpa29wYmxudHdkcXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NTE2MDAsImV4cCI6MjEwMDQyNzYwMH0.tykWpPXzB-cMIoZSfQKByCuyZ8ipUs2RvSwMz6xaZUs';

const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('script[src="product-bridge.js"]')) {
    const bridge = document.createElement('script');
    bridge.src = 'product-bridge.js';
    document.body.appendChild(bridge);
  }
  captureReferral();
  initMobileNav();
  initScrollNav();
  initWaitlist();
  initOrbParallax();
  initProductOrb();
  initReveals();
});

function captureReferral() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get('ref') || '').trim().toUpperCase();
    if (ref) localStorage.setItem('nexi.ref', ref.slice(0, 40));
  } catch (err) {}
}

function circleCodeFromEmail(email) {
  const raw = String(email || '').trim().toLowerCase();
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = ((h << 5) - h) + raw.charCodeAt(i);
    h |= 0;
  }
  return 'NX-' + Math.abs(h).toString(36).toUpperCase().slice(0, 6);
}

function aliasFromName(name, email) {
  const n = String(name || '').trim();
  if (n) {
    const parts = n.split(/\s+/);
    const first = parts[0].slice(0, 1).toUpperCase();
    const last = parts.length > 1 ? parts[parts.length - 1].slice(0, 1).toUpperCase() + '.' : '';
    return (first + (last ? '. ' + last : '.')).trim();
  }
  const local = String(email || '').split('@')[0] || 'B';
  return local.slice(0, 1).toUpperCase() + '.';
}

function initMobileNav() {
  const nav = document.querySelector('.nav');
  const links = document.querySelector('.nav-links');
  if (!nav || !links) return;
  if (nav.querySelector('.nav-toggle')) return;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  nav.appendChild(toggle);
  document.body.appendChild(backdrop);

  function close() {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function open() {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) close();
    else open();
  });

  backdrop.addEventListener('click', close);

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', close);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initScrollNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initWaitlist() {
  const form = document.getElementById('waitlist-form');
  const status = document.getElementById('waitlist-status');
  if (!form || !status || !supabase) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();

    if (!name || !email) return;

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Reserving\u2026';
    }

    status.hidden = false;
    status.textContent = 'Reserving your spot\u2026';
    status.style.color = 'var(--muted)';

    try {
      const { error } = await supabase.from('waitlist').insert({ name, email });

      if (error) {
        if (error.code === '23505') {
          status.textContent = 'You are already on the list. We will be in touch.';
          status.style.color = 'var(--teal, #2dd4bf)';
        } else {
          throw error;
        }
      } else {
        status.textContent = 'You are on the list. We will be in touch.';
        status.style.color = 'var(--teal, #2dd4bf)';
        form.reset();
        await creditInviteIfAny(email);
        await claimOwnCircle(name, email);
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Something went wrong. Try again in a moment.';
      status.style.color = '#FF6B6B';
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Reserve my spot';
      }
    }
  });
}

async function creditInviteIfAny(joinerEmail) {
  if (!supabase) return;
  let ref = '';
  try {
    ref = (localStorage.getItem('nexi.ref') || '').toUpperCase();
  } catch (err) {}
  if (!ref) return;
  if (ref === circleCodeFromEmail(joinerEmail)) return;
  try {
    await supabase.rpc('credit_circle_invite', { p_code: ref });
  } catch (err) {
    console.warn('circle credit skipped', err);
  }
}

async function claimOwnCircle(name, email) {
  if (!supabase) return;
  try {
    await supabase.rpc('claim_circle_code', {
      p_code: circleCodeFromEmail(email),
      p_alias: aliasFromName(name, email),
    });
  } catch (err) {}
}

function initOrbParallax() {
  const orb = document.getElementById('nexi-orb');
  if (!orb) return;

  let raf = null;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    },
    { passive: true },
  );
}

function initReveals() {
  const selectors = [
    '.glass-panel',
    '.waitlist-card',
    '.proof',
    '.feature-card',
    '.page-hero',
    '.section-cta',
    '.loop-card',
    '.preview-card',
    '.section-intro',
    '.contrast-card',
    '.engine',
    '.quote-line',
    '.principle-card',
    '.lens-card',
    '.flow-body',
    '.dash',
  ];
  const reveal = document.querySelectorAll(selectors.join(', '));
  if (!reveal.length) return;

  document.querySelectorAll('.card-grid').forEach((grid) => {
    grid.querySelectorAll('.feature-card').forEach((card, i) => {
      card.style.setProperty('--stagger', `${i * 70}ms`);
    });
  });
  document.querySelectorAll('.loop-row').forEach((grid) => {
    grid.querySelectorAll('.loop-card').forEach((card, i) => {
      card.style.setProperty('--stagger', `${i * 80}ms`);
    });
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('revealed');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    reveal.forEach((el) => {
      el.classList.add('reveal-ready');
      io.observe(el);
    });
  } else {
    reveal.forEach((el) => el.classList.add('revealed'));
  }
}

function initProductOrb() {
  const canvas = document.getElementById('nexi-orb-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  let t0 = performance.now();
  let running = true;

  const champagne = [232, 213, 181];
  const teal = [45, 212, 191];

  function rgba(c, a) {
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  }

  function paint(now) {
    if (!running) return;
    const elapsed = (now - t0) / 1000;
    const phase = elapsed * ((Math.PI * 2) / 8);
    const breath = 0.5 + 0.5 * Math.sin((elapsed * Math.PI * 2) / 3.4);
    const intensity = 0.55 + breath * 0.35;

    ctx.clearRect(0, 0, size, size);
    const c = size / 2;

    const aura = ctx.createRadialGradient(c, c, size * 0.12, c, c, size / 2);
    aura.addColorStop(0, rgba(champagne, 0.08 * intensity));
    aura.addColorStop(0.42, rgba(teal, 0.16 * intensity + 0.04 * Math.cos(phase * 0.7)));
    aura.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(c, c, size / 2, 0, Math.PI * 2);
    ctx.fill();

    function halo(ax, ay, color, alpha, rf) {
      const bx = c + ax * size * 0.22;
      const by = c + ay * size * 0.22;
      const br = size * rf;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0, rgba(color, alpha));
      g.addColorStop(0.5, rgba(color, alpha * 0.28));
      g.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }

    halo(-0.35 + 0.2 * Math.sin(phase * 0.7), -0.32 + 0.16 * Math.cos(phase * 0.5), champagne, 0.18 * intensity, 0.28);
    halo(0.32 + 0.18 * Math.cos(phase * 0.6), 0.28 + 0.16 * Math.sin(phase * 0.8), teal, 0.2 * intensity, 0.3);

    requestAnimationFrame(paint);
  }

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) {
      t0 = performance.now();
      requestAnimationFrame(paint);
    }
  });

  requestAnimationFrame(paint);
}
