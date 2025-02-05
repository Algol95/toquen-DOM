// GSAP ANIMATIONS - AMCA

window.onload = function() {

    //WELCOME ANIMATIONS A-MCA
    gsap.to("#clave", {
    duration:3,
    ease: "back.inOut",
    y: 30,
    repeat: -1,
    yoyo: true ,
    
    });

    gsap.to("#note", {
        duration:2.5,
        ease: "back.out",
        y: -20,
        repeat: -1,
        yoyo: true,
        
        });
};