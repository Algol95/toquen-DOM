document.addEventListener('DOMContentLoaded', () => {
  // Get the orientation lock element and all xylophone keys
  const orientationLock = document.getElementById('orientation-lock');
  const keys = Array.from(document.querySelectorAll('.xylophone__key'));

  // Function to check the screen orientation and update the UI accordingly
  function checkOrientation() {
    // If in portrait mode on mobile, show the orientation lock and disable keys
    if (window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches) {
      orientationLock.style.display = 'flex';
      document.body.classList.add('popup-active');
      keys.forEach((key) => key.setAttribute('disabled', 'true'));
    } else {
      // Otherwise, hide the orientation lock and enable keys
      orientationLock.style.display = 'none';
      document.body.classList.remove('popup-active');
      keys.forEach((key) => key.removeAttribute('disabled'));
    }
  }

  // Check orientation on load and whenever the window is resized or orientation changes
  checkOrientation();
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);

  // Map keyboard combinations to xylophone notes
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

  // Function to play the note when a key or key combo is pressed
  function playNote(note) {
    const keyElement = document.querySelector(`.xylophone__key[data-key="${note}"]`);
    if (keyElement) {
      // Add animation classes to the key
      keyElement.classList.add('vibrating', 'ripple');
      setTimeout(() => keyElement.classList.remove('vibrating', 'ripple'), 300);

      // Play the corresponding sound
      const audio = new Audio(`../sounds/${note}.mp3`);
      audio.play();
    }
  }

  // Function to get the key combo (e.g., 'Space+A' or 'D')
  function getKeyCombo(event) {
    let combo = '';
    if (event.ctrlKey) combo += 'Control+';
    if (event.shiftKey) combo += 'Shift+';
    if (event.altKey) combo += 'Alt+';
    if (event.code === 'Space') combo += 'Space+';
    combo += event.key.toUpperCase(); // Convert key to uppercase for consistency
    return combo;
  }

  // Listen for keydown events and trigger corresponding note if valid
  document.addEventListener('keydown', (event) => {
    const combo = getKeyCombo(event);
    const note = keyMap[combo];
    if (note) {
      playNote(note);
      event.preventDefault(); // Prevent default behavior for the key press
    }
  });

  // Add click event to each key to play the corresponding note
  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const note = key.dataset.key;
      playNote(note);
    });
  });
});
