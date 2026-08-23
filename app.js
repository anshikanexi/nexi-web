const SUPABASE_URL = 'https://wzygcmsikopblntwdqsv.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWdjbXNpa29wYmxudHdkcXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NTE2MDAsImV4cCI6MjEwMDQyNzYwMH0.tykWpPXzB-cMIoZSfQKByCuyZ8ipUs2RvSwMz6xaZUs';

const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollNav();
  initWaitlist();
  initOrbParallax();
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
      btn.textContent = 'Reserving…';
    }

    status.hidden = false;
    status.textContent = 'Reserving your spot…';
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
  ];
  const reveal = document.querySelectorAll(selectors.join(', '));
  if (!reveal.length) return;

  // Stagger feature cards in each grid
  document.querySelectorAll('.card-grid').forEach((grid) => {
    grid.querySelectorAll('.feature-card').forEach((card, i) => {
      card.style.setProperty('--stagger', `${i * 70}ms`);
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
