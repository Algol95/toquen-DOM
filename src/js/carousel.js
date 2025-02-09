

// CODIGO CARRUSEL


const sliderItems = document.querySelectorAll(".content__container__div__article");
const leftButton = document.querySelector('.content__container__btn--left');
const rightButton = document.querySelector('.content__container__btn--right');


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
rightButton.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

leftButton.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

