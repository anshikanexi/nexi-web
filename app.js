const SUPABASE_URL = 'https://wzygcmsikopblntwdqsv.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWdjbXNpa29wYmxudHdkcXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NTE2MDAsImV4cCI6MjEwMDQyNzYwMH0.tykWpPXzB-cMIoZSfQKByCuyZ8ipUs2RvSwMz6xaZUs';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlist-form');
  const status = document.getElementById('waitlist-status');

  if (form) {
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
        const { error } = await supabase
          .from('waitlist')
          .insert({ name, email });

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

  // Subtle parallax on orb
  const orb = document.getElementById('nexi-orb');
  if (orb) {
    let raf = null;
    window.addEventListener('pointermove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
  }

  // Reveal animations for glass cards
  const reveal = document.querySelectorAll('.glass-panel, .waitlist-card, .proof');
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
      { threshold: 0.12 }
    );
    reveal.forEach((el) => {
      el.classList.add('reveal-ready');
      io.observe(el);
    });
  } else {
    reveal.forEach((el) => el.classList.add('revealed'));
  }
});
