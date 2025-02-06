const nameInput = document.getElementById("name");
const phone = document.getElementById("phone");
const mail = document.getElementById("mail");
const btn = document.getElementById("btn");
const form = document.querySelector(".contact__form");
const confirmationMessage = document.querySelector("#confirmationMessage");
const contactForm = document.querySelector("#contactForm");
const closeMessageButton = document.querySelector("#closeMessageButton");
const alertContainer = document.querySelector("#alertContainer"); // Contenedor de alertas

// esta parte escucha al boton y hace varias cosas: si hacemos click primer compruba que los datos esten completos (si no sale una alerta)
//si estan completos observa si estan bien rellenados, si no tambien sale una alerta
//si todo esta correcto activa una animacion de envio y saca la pantalla de agradecimiento, luego la cerramos y nos devuelve al form
btn.addEventListener("click", () => {
   //comprobacion de que los campos esten cubiertos
    if (nameInput.value.trim() === "" || phone.value.trim() === "" || mail.value.trim() === "") {
        alertContainer.innerHTML = `<i class="bi bi-exclamation-triangle"></i> Por favor, completa todos los campos antes de enviar. <i class="bi bi-exclamation-triangle"></i>`;
        return;
    }
    //comprobaciones de que los datos esten correctos
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nameInput.value)) {
        alertContainer.innerHTML = `<i class="bi bi-exclamation-triangle"></i> Por favor, introduce un nombre válido (solo letras y espacios). <i class="bi bi-exclamation-triangle"></i>`;
        return;
    }
    
    if (!/^\d+$/.test(phone.value)) {
        alertContainer.innerHTML = `<i class="bi bi-exclamation-triangle"></i> Por favor, introduce un número de teléfono válido (solo números). <i class="bi bi-exclamation-triangle"></i>`;
        return;
    }
    
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail.value)) {
        alertContainer.innerHTML = `<i class="bi bi-exclamation-triangle"></i> Por favor, introduce un correo electrónico válido. <i class="bi bi-exclamation-triangle"></i>`;
        return;
    }

    // animación con GSAP al enviar el formulario
    gsap.to(form, {
        opacity: 0,
        transform: "translateY(-100px)",
        duration: 1,
        ease: "power2.out",
        onComplete: function () {
            confirmationMessage.style.display = "block";
            gsap.to(confirmationMessage, { opacity: 1, duration: 0.5 });

            contactForm.reset(); //despues de enviar el formulario y de despedir al pagina de agradecimiento reinicia el formulario
            // esta parte es para si no cerramos la ventana con el boton lo haga ella sola de manera automatica
            setTimeout(function () {
                gsap.to(confirmationMessage, {
                    opacity: 0,
                    duration: 0.4,
                    onComplete: function () {
                        confirmationMessage.style.display = "none";
                    },
                });
            }, 9000);
        },
    });
});

//esto es para que se quite el mensaje de alerta al pinchar otra vez en el input
function clearAlert() {
    alertContainer.textContent = "";
}

//en esta parte se borra la alerta al hacer click de nuevo
[nameInput, phone, mail].forEach((input) => {
    input.addEventListener("input", clearAlert);
    input.addEventListener("focus", clearAlert);
});

// a qui  cerramos manualmente la ventana de confirmación
closeMessageButton.addEventListener("click", function () {
    gsap.to(confirmationMessage, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
            confirmationMessage.style.display = "none"; // Ocultar el mensaje de confirmación

            // nos devuelve al form
            gsap.to(form, {
                opacity: 1,
                transform: "translateY(0)",
                duration: 0.5,
            });
        },
    });
});
