document.addEventListener("DOMContentLoaded", () => {
  const orientationLock = document.querySelector(".orientation-lock");
  const keys = Array.from(document.querySelectorAll(".xylophone__key"));

  function checkOrientation() {
    if (
      window.matchMedia("(max-width: 768px) and (orientation: portrait)")
        .matches
    ) {
      orientationLock.style.display = "flex";
      document.body.classList.add("popup-active");
      keys.forEach((key) => key.setAttribute("disabled", "true"));
    } else {
      orientationLock.style.display = "none";
      document.body.classList.remove("popup-active");
      keys.forEach((key) => key.removeAttribute("disabled"));
    }
  }

  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);

  const NOTE_FREQUENCIES = {
    C: 261.63,
    D: 293.66,
    E: 329.63,
    F: 349.23,
    G: 392.0,
    A: 440.0,
    BB: 466.16, // Esta es un SI bemol (B bemol en inglés), no existe en nuestro xilofono pero la pongo para terEnar de tocar la canción: "La Cucaracha" - AMCA
    B: 493.88,
    C2: 523.25,
    D2: 587.33,
    E2: 659.26,
    F2: 698.46,
    G2: 783.99
  };

  /* Edité las viejas asignaciones de keys-notas y cambie el nombre del parametro por la nomenclatura de constante - AMCA*/
  // Map keyboard combinations to xylophone notes
  const KEY_NOTE = {
    1: "C",
    2: "D",
    3: "E",
    4: "F",
    5: "G",
    6: "A",
    BB: "BB", //No existe en nuestro teclado - AMCA
    7: "B",
    Y: "C2",
    U: "D2",
    I: "E2",
    O: "F2",
    P: "G2",
  };

  /* SOUND GENERATOR - AUDIOCONTEXT (Quiero llorar) 
  Crear contexto de audio - AMCA */
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  function playNote(note) {
    const keyElement = document.querySelector(
      `.xylophone__key[data-key="${note}"]`
    );
    if (keyElement) {
      keyElement.classList.add("dimKey");
      setTimeout(() => keyElement.classList.remove("dimKey"), 300);
      keyElement.classList.add("vibrating");
      setTimeout(() => keyElement.classList.remove("vibrating"), 300);
      
      oscillator(note);
    } else {
      oscillator(note);
    }
  }

  // OSCILLATOR FUNCTION
  // generá las notas mediante la simulación de ondas - AMCA
  function oscillator(note) {
    const frequency = NOTE_FREQUENCIES[note];

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Configuración oscillator - .type define la onda
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      // Configuración envolvente, basicamente alarga la duración de la nota (Socorro) - AMCA
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 1
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
  }

  // Function to get the key combo (e.g., 'Space+A' or 'D')
  function getKeyCombo(event) {
    let combo = "";
    combo += event.key.toUpperCase();
    console.log(combo);
    return combo;
  }

  // Listen for keydown events and trigger corresponding note if valid
  document.addEventListener("keydown", (event) => {
    const combo = getKeyCombo(event);
    const note = KEY_NOTE[combo];
    if (note) {
      playNote(note);
      event.preventDefault();
    }
  });

  // Add click event to each key to play the corresponding note
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const note = key.dataset.key;
      playNote(note);
    });
  });

  // BTN MUSIC - AMCA
  // Función para tocar "La Cucaracha" extendida - AMCA
  // Hotfix: Editado para que se deshabiliten los botones mientras toque una canción, que además se reutilice pasando un valor por parametro: - AMCA
window.playMusic = function(melodyName){
  const btns = document.querySelectorAll(".music__play-button");
  btns.forEach(btn => {
    btn.disabled=true;
  });

  //La lógica es: según el melodyName pasado por parámetro la melody hazquiere un valor u otro.
  let melody;
  switch (melodyName) {
    case "laCucaracha":
      melody = [
        "C", "C", "C", "F", "", "A",
        "C", "C", "C", "F", "", "A", "", "",
        "F", "F", "E", "E", "D", "D", "C", "", "",
        "C", "C", "C", "E", "", "G",
        "C", "C", "C", "E", "", "G", "",
        "C2", "D2", "C2", "BB", "A", "G", "F"
      ];
      break;
    case "StarWars":
      melody = ["C", " ",  "G",  " ",
                "F", "E", "D", "C2", " ", "G", " ",
                "F", "E", "D", "C2", " ", "G", " ",
                "F", "E", "F", "D", " ",
                "C" ," ", "G", " ",
                "F" ,"E", "D", "C2", " ", "G", " ",
                "F", "E", "D", "C2", "  ", "G" ," ",
                "F", "E,", "F", "D"
      ];
      break;
    case "OHSUSANA":
      melody = ["C",  "D", "E", "G", "G", "A", "G", "E",
                "C", "D", "E", "E", "D", "C", "D", "",
                "C", "D", "E", "G", "G", "A", "G", "E",
                "C", "D", "E", "E", "D", "D", "C", "",
                "F", "F", "A", "A", "",  "A", "G", "A", "G", "E", "D", "",
                "C", "D", "E", "G", "G", "A", "G", "E",
                "C", "D", "E", "E", "D", "D", "C"
      ];
    default:
      console.error("No existe la canción");
      break;
  }

  
  const tempo = 300;
  const totalDuration = tempo * melody.length;
  melody.forEach((note, index) => {
      setTimeout(() => {
          playNote(note);
      }, index * tempo);
  });

  setTimeout(() => {
    btns.forEach(btn => {
      btn.disabled=false;
    });
  }, totalDuration);
}
});
