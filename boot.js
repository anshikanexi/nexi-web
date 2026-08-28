document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('phase-gate')) return;
  var s = document.createElement('script');
  s.src = 'experience-extras.js';
  document.body.appendChild(s);
});
