const fullscreenButton = document.querySelector('.fullscreen');

const btnContainer = document.querySelectorAll('.btn-container');

const inputsContainer = document.querySelectorAll('.filters');

const btnReset = document.querySelector('.btn-reset');


fullscreenButton.addEventListener('click', () => {
  !document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen();
});

const addActiveClass = (e) => e.target.classList.add('btn-active');
const removeActiveClass = (btn) => {
  const activeEl = btn.getElementsByClassName('btn-active');
  activeEl[0].classList.remove('btn-active');
};

btnContainer.forEach(btn => btn.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    removeActiveClass(btn);
    addActiveClass(e);
  }
}));

inputsContainer.forEach(inputEl => {
  inputEl.addEventListener('input', (e) => {
    document.documentElement.style.setProperty(`--${e.target.name}`, `${e.target.value}` + `${e.target.dataset.sizing}`);
    console.log(`--${e.target.name}`, `${e.target.value}` + `${e.target.dataset.sizing}`)
    e.target.nextElementSibling.value = e.target.value
  })
})

btnReset.addEventListener('click', () => {
  inputsContainer.forEach(el => {
    const inputs = el.querySelectorAll('input');
    inputs.forEach(input => {
      document.documentElement.style.setProperty(`--${input.name}`, `${input.dataset.value}` + `${input.dataset.sizing}`);
      input.nextElementSibling.value = input.dataset.value;
      input.value = input.dataset.value;
    });
  })
});