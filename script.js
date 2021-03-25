const fullscreenButton = document.querySelector('.fullscreen');

const btnContainer = document.querySelectorAll('.btn-container');

const inputsContainer = document.querySelectorAll('.filters');

const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnSave = document.querySelector('.btn-save');
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

const canvas = document.querySelector('canvas');

function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = picture.src;

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    let filetrList = '';
    inputsContainer.forEach(el => {
      const inputs = el.querySelectorAll('input');
      inputs.forEach(input => {
        let filter = ''
        if (input.name === 'blur') {
          const coef = canvas.width * canvas.height;
          let size = input.value;
          coef > 431600 ? size = input.value * 2 : size = input.value / 1.6;
          console.log(size)
          filter = 'blur' + '(' + `${size}` + `${input.dataset.sizing}` + ')'
          filetrList = filetrList + ' ' + filter;
        }
        else if (input.name === 'hue') {
          filter = 'hue-rotate' + '(' + `${input.value}` + `${input.dataset.sizing}` + ')'
          filetrList = filetrList + ' ' + filter;
        } else {
          filter = `${input.name}` + '(' + `${input.value}` + `${input.dataset.sizing}` + ')'
          filetrList = filetrList + ' ' + filter;
        }
      });
    })
    console.log(filetrList)
    ctx.filter = filetrList.toString();

    ctx.drawImage(img, 0, 0);
  };
}

const loadImage = () => {
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

btnSave.addEventListener('click', function (e) {
  drawImage();
  setTimeout(loadImage, 1000);
});