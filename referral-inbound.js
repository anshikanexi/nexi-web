(function () {
  const statusEl = document.getElementById('ref-status');
  if (!statusEl) return;
  const params = new URLSearchParams(window.location.search);
  const inbound = (params.get('ref') || '').trim().toUpperCase();
  if (!inbound) return;
  if (statusEl.textContent) return;
  statusEl.textContent = 'You arrived on circle ' + inbound + '. Join the waitlist to credit them \u2014 then claim your own code.';
})();
