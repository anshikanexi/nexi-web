(function () {
  const STORE_KEY = 'nexi.lastDiagnosis';
  const btn = document.getElementById('btn-resume');
  if (!btn) return;
  let data = null;
  try { data = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) {}
  if (!data || !data.diagnosis) return;
  btn.hidden = false;
  btn.addEventListener('click', function () {
    if (window.NexiExperience && window.NexiExperience.renderSaved) {
      window.NexiExperience.renderSaved(data);
      return;
    }
    window.location.href = 'sample-result.html';
  });
})();
