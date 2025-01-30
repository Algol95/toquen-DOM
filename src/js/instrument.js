// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
  const orientationLock = document.getElementById('orientation-lock'); // Get the orientation lock element
  const keys = Array.from(document.querySelectorAll('.xylophone__key')); // Get all xylophone keys

  // Function to check screen orientation and adjust UI accordingly
  function checkOrientation() {
    if (
      window.matchMedia('(max-width: 768px) and (orientation: portrait)')
        .matches // Check if in portrait mode on small screens
    ) {
      orientationLock.style.display = 'flex'; // Show the orientation lock popup
      document.body.classList.add('popup-active'); // Add class to body for styling
      keys.forEach((key) => key.setAttribute('disabled', 'true')); // Disable keys
    } else {
      orientationLock.style.display = 'none'; // Hide the popup
      document.body.classList.remove('popup-active'); // Remove class to body
      keys.forEach((key) => key.removeAttribute('disabled')); // Enable keys
    }
  }

  checkOrientation(); // Run on page load
  window.addEventListener('resize', checkOrientation); // Run on window resize
  window.addEventListener('orientationchange', checkOrientation); // Run on orientation change
  checkOrientation(); // Run initially
});

// Wait for the DOM to be fully loaded before executing the second part
document.addEventListener('DOMContentLoaded', () => {
  const keys = Array.from(document.querySelectorAll('.xylophone__key')); // Get all xylophone keys

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
  }; // Map keyboard combos to notes

  // Function to play the note when a key is pressed
  function playNote(note) {
    const keyElement = document.querySelector(
      `.xylophone__key[data-key="${note}"]` // Find key by its data-key attribute
    );
    if (keyElement) {
      keyElement.classList.add('vibrating'); // Add vibration effect
      setTimeout(() => keyElement.classList.remove('vibrating'), 200); // Remove vibration after 200ms

      const audio = new Audio(`../sounds/${note}.mp3`); // Load the audio file
      audio.play(); // Play the sound
    }
  }

  // Function to create a combo string from the event
  function getKeyCombo(event) {
    let combo = '';
    if (event.ctrlKey) combo += 'Control+'; // Add "Control" if Ctrl is pressed
    if (event.shiftKey) combo += 'Shift+'; // Add "Shift" if Shift is pressed
    if (event.altKey) combo += 'Alt+'; // Add "Alt" if Alt is pressed
    if (event.code === 'Space') combo += 'Space+'; // Add "Space" if space key is pressed
    combo += event.key.toUpperCase(); // Add the key name in uppercase
    return combo;
  }

  // Function to show the popup (orientation lock)
  function showPopup() {
    document.querySelector('#orientation-lock').classList.add('show'); // Show the popup
    document.body.classList.add('popup-active'); // Add active class to body
  }

  // Function to hide the popup (orientation lock)
  function hidePopup() {
    document.querySelector('#orientation-lock').classList.remove('show'); // Hide the popup
    document.body.classList.remove('popup-active'); // Remove active class from body
  }

  // Event listener for keydown event to detect key combinations
  document.addEventListener('keydown', (event) => {
    const combo = getKeyCombo(event); // Get the key combo
    const note = keyMap[combo]; // Look up the note for the combo
    if (note) {
      playNote(note); // Play the note if found
      event.preventDefault(); // Prevent the default action (e.g., scrolling)
    }
  });

  // Event listeners for clicks on keys
  keys.forEach((key) => {
    key.addEventListener('click', () => {
      const note = key.dataset.key; // Get the note from the clicked key's data-key
      playNote(note); // Play the note
    });
  });
});
