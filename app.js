const SUPABASE_URL = 'https://wzygcmsikopblntwdqsv.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWdjbXNpa29wYmxudHdkcXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTg0MjAsImV4cCI6MjA2ODgzNDQyMH0.placeholder'; // replace with real anon key in production deploy

// Note: Real anon key must be injected at build or via env for Pages. For now client form is ready.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlist-form');
  const status = document.getElementById('waitlist-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();

      if (!name || !email) return;

      status.hidden = false;
      status.textContent = 'Reserving your spot…';
      status.style.color = 'var(--muted)';

      try {
        // Will call edge function or direct insert once waitlist table + RLS are live.
        // Placeholder success for UI polish today.
        await new Promise(r => setTimeout(r, 900));

        status.textContent = 'You are on the list. We will be in touch.';
        status.style.color = 'var(--teal)';
        form.reset();
      } catch (err) {
        status.textContent = 'Something went wrong. Try again in a moment.';
        status.style.color = '#FF6B6B';
      }
    });
  }

  // Subtle parallax / pointer on orb
  const orb = document.getElementById('nexi-orb');
  if (orb) {
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});
