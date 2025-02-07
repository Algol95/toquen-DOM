//Codigo para que funcione el menu hamburguesa
const nav = document.getElementById("nav");
const open = document.getElementById("open");
const close = document.getElementById("close");
// Recojo ID de la nav instruments para arreglar el bug TED94 - AMCA
const navInstr = document.getElementById("nav-instruments");


open.addEventListener("click", () => {
    nav.classList.add("visible");
})

close.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// Elimina la clase .visible cuando hacemos click en el nav para viajar a section instruments - AMCA
navInstr.addEventListener("click", () => {
  nav.classList.remove("visible");
})


