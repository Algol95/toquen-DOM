const nameInput = document.getElementById("name");
const phone = document.getElementById("phone");
const mail = document.getElementById("mail");
const btn = document.getElementById("btn");
const submitButton = document.querySelector(".form__button");
const form = document.querySelector(".contact__form");
const confirmationMessage = document.querySelector("#confirmationMessage");
const contactForm = document.querySelector("#contactForm");
const closeMessageButton = document.querySelector("#closeMessageButton");

//funcion que escucha los eventos del boton y comprueba que los datos que introduce el usuario sean los esperados en cada apartado
btn.addEventListener("click", () => {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nameInput.value)) {
        alert(
            "Por favor, introduce un nombre válido (solo letras y espacios)."
        );
        return;
    }

    if (!/^\d+$/.test(phone.value)) {
        alert(
            "Por favor, introduce un número de teléfono válido (solo números)."
        );
        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail.value)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }

    //esta parte es la animación con gsap que sale cuando el formulario ha sido enviado

    gsap.to(form, {
        opacity: 0,
        transform: "translateY(-100px)",
        duration: 1,
        ease: "power2.out",
        onComplete: function () {
            confirmationMessage.style.display = "block";
            gsap.to(confirmationMessage, { opacity: 1, duration: 0.5 });

            contactForm.reset(); // Limpia el formulario

            // Si no le dan al boton se ocuta el mensaje de agradecimiento
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

// esta parte es para cerrar la ventana de agradecimiento manualmente
closeMessageButton.addEventListener("click", function () {
    gsap.to(confirmationMessage, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
            confirmationMessage.style.display = "none";
        },
    });
});
