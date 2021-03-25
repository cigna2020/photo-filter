const fullscreenButton = document.querySelector('.fullscreen');

const btnContainer = document.querySelectorAll('.btn-container');

const inputsContainer = document.querySelectorAll('.filters');

const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.getElementById('btnInput');

const picture = document.getElementById('image');
const pictureSrc = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/'
const currentHour = new Date().getHours();
const imagesNumbers = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let counter = 0;

const getTimeOfDay = (hour = currentHour) => {
  let timeOfDay = '';
  if (hour >= 6 && hour < 12) {
    timeOfDay = 'morning';
  }
  if (hour >= 12 && hour < 18) {
    timeOfDay = 'day';
  }
  if (hour >= 18 && hour < 24) {
    timeOfDay = 'evening';
  }
  if (hour >= 0 && hour < 6) {
    timeOfDay = 'night';
  }
  return timeOfDay;
}

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
}))

inputsContainer.forEach(inputEl => {
  inputEl.addEventListener('input', (e) => {
    document.documentElement.style.setProperty(`--${e.target.name}`, `${e.target.value}` + `${e.target.dataset.sizing}`);
    e.target.nextElementSibling.value = e.target.value
  })
})

const reset = () => {
  inputsContainer.forEach(el => {
    const inputs = el.querySelectorAll('input');
    inputs.forEach(input => {
      document.documentElement.style.setProperty(`--${input.name}`, `${input.dataset.value}` + `${input.dataset.sizing}`);
      input.nextElementSibling.value = input.dataset.value;
      input.value = input.dataset.value;
      btnLoad.value = '';
    });
  })
}

btnReset.addEventListener('click', () => reset());

const getImage = (e) => {
  const index = counter % imagesNumbers.length;
  picture.src = pictureSrc + getTimeOfDay() + '/' + imagesNumbers[index];
  counter++;
}

btnNext.addEventListener('click', (e) => {
  getImage(e);
  reset();
});

btnLoad.addEventListener('change', (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = () => {
    picture.src = reader.result;
  }
  reader.readAsDataURL(file);
  reset();
});