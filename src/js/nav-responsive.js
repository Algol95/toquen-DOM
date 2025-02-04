const nav = document.getElementById("nav");
const open = document.getElementById("open");
const close = document.getElementById("close");


open.addEventListener("click", () => {
    nav.classList.add("visible");
})

close.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// A partir de aquí comienza el codigo del carrusel:


const sliderItems = document.querySelectorAll(".slider__item");
const nextButton = document.getElementById("nextSlide");
const backButton = document.getElementById("backSlide");

let currentIndex = 0;

// Función para mostrar el slide activo
function showSlide(index) {
  // Elimina la clase active de todos los slides
  sliderItems.forEach(slide => slide.classList.remove("active"));

  // Asegura que el índice esté en el rango correcto
  if (index >= sliderItems.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = sliderItems.length - 1;
  } else {
    currentIndex = index;
  }

  // Añade la clase active al slide correspondiente
  sliderItems[currentIndex].classList.add("active");
}

// Manejadores de eventos para los botones
nextButton.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

backButton.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

