const fullscreenButton = document.querySelector('.fullscreen');

fullscreenButton.addEventListener('click', () => {
  !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
});

const btnContainer = document.querySelectorAll('.btn-container');

const addActiveClass = (e) => e.target.classList.add('btn-active');
const removeActiveClass = (btn) => {
  const activeEl = btn.getElementsByClassName('btn-active');
  activeEl[0].classList.remove('btn-active');
};

btnContainer.forEach(btn => btn.addEventListener('click', (e) => {
  removeActiveClass(btn);
  addActiveClass(e);
}));


const inputsContainer = document.querySelectorAll('.filters');

inputsContainer.forEach(el => {
  inputsContainer.forEach(inputEl => {
    inputEl.addEventListener('change', (e) => {
      document.documentElement.style.setProperty(`--${e.target.name}`, `${e.target.value}` + `${e.target.dataset.sizing}`)
    })
  })
})

// console.log(inputsContainer.getAttributeNames('blur'))