const timeCount = 550;

const setActive = (elName, currActive) => {
  const el = document.querySelector(`.${elName.substring(1)}`)

  if (!currActive) {
    el.classList.toggle("active")
    
  } else {
    currActive.classList.remove("active")
    el.classList.add("active")
  }
}

export { setActive }