document.addEventListener('DOMContentLoaded', () => {
  const keys = Array.from(document.querySelectorAll('.xylophone__key'));

  const keyMap = {
    'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'A': 'A', 'B': 'B',
    'C2': 'Shift+C', 'D2': 'Shift+D', 'F2': 'Shift+F', 'G2': 'Shift+G', 'A2': 'Shift+A',
  };

  function vibrateKey(keyElement) {
    keyElement.classList.add('vibrating');
    setTimeout(() => {
      keyElement.classList.remove('vibrating');
    }, 400);
  }

  window.addEventListener('keydown', (e) => {
    const keyPressed = e.key;
    const isShiftPressed = e.shiftKey;

    if (!isShiftPressed && keyMap[keyPressed]) {
      const key = document.querySelector(`.xylophone__key[data-key="${keyMap[keyPressed]}"]`);
      if (key) {
        vibrateKey(key);
      }
    }

    if (isShiftPressed && keyPressed.toUpperCase() in keyMap) {
      const shiftedKey = keyPressed.toUpperCase();
      const key = document.querySelector(`.xylophone__key[data-key="${keyMap[shiftedKey]}"]`);
      if (key) {
        vibrateKey(key);
      }
    }
  });

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      vibrateKey(key);
    });
  });
});
