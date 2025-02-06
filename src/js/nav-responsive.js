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




