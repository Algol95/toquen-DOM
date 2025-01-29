document.addEventListener('DOMContentLoaded', () => {
  const orientationLock = document.getElementById('orientation-lock');
  const keys = Array.from(document.querySelectorAll('.xylophone__key'));

  function checkOrientation() {
    if (window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches) {
      orientationLock.style.display = 'flex';
      document.body.classList.add('popup-active');
       keys.forEach(key => key.setAttribute('disabled', 'true'));
        } else {
            orientationLock.style.display = 'none';
            document.body.classList.remove('popup-active');
            keys.forEach(key => key.removeAttribute('disabled'));
        }
    }

  checkOrientation();
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);
  checkOrientation();
});

document.addEventListener('DOMContentLoaded', () => {
  const keys = Array.from(document.querySelectorAll('.xylophone__key'));

  const keyMap = {
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    G: 'G',
    A: 'A',
    B: 'B',
    'Space+A': 'C2',
    'Space+D': 'D2',
    'Space+F': 'F2',
    'Space+G': 'G2',
    'Space+A2': 'A2',
  };

  function playNote(note) {
    const keyElement = document.querySelector(
      `.xylophone__key[data-key="${note}"]`
    );
    if (keyElement) {
      keyElement.classList.add('vibrating');
      setTimeout(() => keyElement.classList.remove('vibrating'), 200);

      const audio = new Audio(`../sounds/${note}.mp3`);
      audio.play();
    }
  }

  function getKeyCombo(event) {
    let combo = '';
    if (event.ctrlKey) combo += 'Control+';
    if (event.shiftKey) combo += 'Shift+';
    if (event.altKey) combo += 'Alt+';
    if (event.code === 'Space') combo += 'Space+';
    combo += event.key.toUpperCase();
    return combo;
  }

  function showPopup() {
    document.querySelector('#orientation-lock').classList.add('show');
    document.body.classList.add('popup-active');
  }

  function hidePopup() {
    document.querySelector('#orientation-lock').classList.remove('show');
    document.body.classList.remove('popup-active');
  }

  document.addEventListener('keydown', (event) => {
    const combo = getKeyCombo(event);
    const note = keyMap[combo];
    if (note) {
      playNote(note);
      event.preventDefault();
    }
  });

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const note = key.dataset.key;
      playNote(note);
    });
  });
});
