import { particles } from "./particles.js";
import { setActive } from "./setActive.js";
particles()

let currActive = document.querySelector(".active")
const links = document.querySelectorAll(".nav-link");

links.forEach( link => {
  link.addEventListener("click", (event) => {
    setActive(event.target.getAttribute("href"), currActive)
    currActive = document.querySelector(".active")
  })
})