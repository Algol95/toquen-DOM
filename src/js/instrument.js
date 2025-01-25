/* ---------------------------------- KEY VIBRATION ----------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
  const keys = document.querySelectorAll('.xylophone__key');

  keys.forEach(key => {
    key.addEventListener('click', function() {
      const keyImg = key.querySelector('img');
      keyImg.classList.add('vibrating');
      setTimeout(() => {
        keyImg.classList.remove('vibrating');
      }, 200);
    });
  });
});
/* ---------------------------------- END OF CODE ----------------------------------*/