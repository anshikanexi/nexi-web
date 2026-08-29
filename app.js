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
  initMobileNav();
  initScrollNav();
  initWaitlist();
  initOrbParallax();
  initProductOrb();
  initReveals();
});

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
          status.style.color = 'var(--teal)';
        } else {
          throw error;
        }
      } else {
        status.textContent = 'You are on the list. We will be in touch.';
        status.style.color = 'var(--teal)';
        form.reset();
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
    const intensity = 0.4 + breath * 0.28;

    ctx.clearRect(0, 0, size, size);
    const c = size / 2;
    const r = (size / 2) * 0.78;

    const aura = ctx.createRadialGradient(c, c, r * 0.2, c, c, size / 2);
    aura.addColorStop(0, rgba(champagne, 0.12 * intensity + 0.04 * Math.sin(phase)));
    aura.addColorStop(0.45, rgba(teal, 0.1 * intensity + 0.03 * Math.cos(phase * 0.7)));
    aura.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(c, c, (size / 2) * 0.98, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.clip();

    const base = ctx.createRadialGradient(c - r * 0.2, c - r * 0.3, r * 0.1, c, c, r);
    base.addColorStop(0, 'rgba(28,42,60,0.92)');
    base.addColorStop(0.55, 'rgba(10,18,28,0.96)');
    base.addColorStop(1, '#05080F');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    function blob(ax, ay, color, alpha, rf) {
      const bx = c + ax * r * 0.55;
      const by = c + ay * r * 0.55;
      const br = r * rf;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0, rgba(color, alpha));
      g.addColorStop(0.45, rgba(color, alpha * 0.35));
      g.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }

    blob(-0.45 + 0.35 * Math.sin(phase * 0.7), -0.4 + 0.25 * Math.cos(phase * 0.5), champagne, (0.28 + breath * 0.18) * intensity, 0.55 + 0.08 * Math.sin(phase));
    blob(0.4 + 0.3 * Math.cos(phase * 0.6), 0.35 + 0.28 * Math.sin(phase * 0.8), teal, (0.22 + breath * 0.16) * intensity, 0.5 + 0.1 * Math.cos(phase * 0.9));
    blob(0.05 * Math.sin(phase * 0.4), -0.1 + 0.08 * Math.cos(phase * 0.3), [255, 255, 255], (0.12 + breath * 0.14) * intensity, 0.4 + breath * 0.12);

    ctx.restore();

    const rim = ctx.createConicGradient(0, c, c);
    rim.addColorStop(0, rgba(champagne, 0.55));
    rim.addColorStop(0.33, 'rgba(200,200,208,0.2)');
    rim.addColorStop(0.66, rgba(teal, 0.25));
    rim.addColorStop(1, rgba(champagne, 0.4));
    ctx.strokeStyle = rim;
    ctx.lineWidth = size * 0.012;
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255,255,255,${0.28 + breath * 0.08})`;
    ctx.lineWidth = size * 0.018;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(c, c, r - size * 0.01, -2.5 + 0.08 * Math.sin(phase * 0.3), -1.55, false);
    ctx.stroke();

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
