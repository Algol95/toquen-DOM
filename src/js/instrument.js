document.addEventListener('DOMContentLoaded', () => {
  const keys = Array.from(document.querySelectorAll('.xylophone__key'));

  const keyMap = {
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'A': 'A',
    'B': 'B',
    'Space+A': 'C2',
    'Space+D': 'D2',
    'Space+F': 'F2',
    'Space+G': 'G2',
    'Space+A2': 'A2',
  };

  function playNote(note) {
    const keyElement = document.querySelector(`.xylophone__key[data-key="${note}"]`);
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
