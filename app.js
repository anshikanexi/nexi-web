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
  restoreCircleHandoff();
  initOrbParallax();
  initProductOrb();
  initReveals();
});

function captureReferral() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get('ref') || '').trim().toUpperCase();
    if (ref) {
      localStorage.setItem('nexi.ref', ref.slice(0, 40));
      document.documentElement.dataset.inboundRef = ref.slice(0, 40);
    }
    paintInboundBanner();
  } catch (err) {}
}

function paintInboundBanner() {
  let ref = '';
  try { ref = (localStorage.getItem('nexi.ref') || '').toUpperCase(); } catch (err) {}
  if (!ref) return;
  if (document.querySelector('[data-inbound-ref]')) return;

  const banner = document.createElement('div');
  banner.className = 'inbound-banner';
  banner.setAttribute('data-inbound-ref', ref);
  banner.innerHTML =
    '<span class="dot"></span>' +
    '<span>Invited by <b>' + ref.replace(/</g, '') + '</b> · waitlist join credits their circle</span>' +
    '<a href="index.html#waitlist">Reserve with this code</a>';

  const nav = document.querySelector('.nav');
  if (nav && nav.parentNode) nav.parentNode.insertBefore(banner, nav.nextSibling);
  document.body.classList.add('has-inbound');
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
