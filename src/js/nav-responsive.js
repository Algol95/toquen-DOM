//Codigo para que funcione el menu hamburguesa
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
<<<<<<< HEAD
const leftButton = document.querySelector('.content__container__btn--left');
const rightButton = document.querySelector('.content__container__btn--right');
=======
const nextButton = document.querySelector(".content__container__btn--right");
const backButton = document.querySelector(".content__container__btn--left");
>>>>>>> 45fb1eec03f37753c51d5c2e923e03487b4c2f6f


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

