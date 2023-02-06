const rotateEls = document.querySelectorAll(".rotateX");
let timeCount = 500;

rotateEls.forEach( el => {
  timeCount = timeCount + 600;
  setTimeout(() => el.classList.remove("rotateX"), timeCount)
});
