(function () {
  const card = document.getElementById('exp-root');
  const chat = document.getElementById('phase-chat');
  const result = document.getElementById('phase-result');
  const input = document.getElementById('user-input');
  if (!card) return;

  card.classList.add('lock-surface');

  function setKbInset() {
    const vv = window.visualViewport;
    if (!vv) {
      document.documentElement.style.setProperty('--kb-inset', '0px');
      return;
    }
    const overlap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    document.documentElement.style.setProperty('--kb-inset', overlap + 'px');
  }

  function grow() {
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 132) + 'px';
  }

  function syncPhase() {
    const chatting = chat && !chat.hidden;
    const locked = result && !result.hidden;
    document.body.classList.toggle('exp-chat-live', !!chatting);
    document.body.classList.toggle('exp-result-live', !!locked);
    if (chatting) {
      setKbInset();
      const thread = document.getElementById('thread');
      if (thread) thread.scrollTop = thread.scrollHeight;
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setKbInset);
    window.visualViewport.addEventListener('scroll', setKbInset);
  }
  window.addEventListener('resize', setKbInset, { passive: true });

  if (input) {
    input.addEventListener('input', grow);
    input.addEventListener('focus', function () {
      setKbInset();
      setTimeout(function () {
        input.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }, 80);
    });
  }

  const observer = new MutationObserver(syncPhase);
  if (chat) observer.observe(chat, { attributes: true, attributeFilter: ['hidden'] });
  if (result) observer.observe(result, { attributes: true, attributeFilter: ['hidden', 'class'] });
  syncPhase();
})();
