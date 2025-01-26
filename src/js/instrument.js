document.querySelectorAll('.xylophone__key').forEach(key => {
  key.addEventListener('click', function() {
    const keyImg = key.querySelector('img');
    
    key.classList.add('vibrating');
    
    setTimeout(() => {
      key.classList.remove('vibrating');
    }, 400);

  });
});
