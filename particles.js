const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Set canvas size and resize watch
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particles array settings
let numOfParticles = 1000;
let particleArray = [];

// Random Initial Position coords
const particleRandX = () => Math.random() * canvas.width;
const particleRandY = () => Math.random() * canvas.height;

// Resize listener function
window.addEventListener("resize", () =>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Handle Mouse Movement
let mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("click", (event) =>{
  // empty atm
});

// Particle shape and draw
const particleSize = (times, add) => {
  return Math.random() * times + add;
}

const particleSpeedX = (times, subtract) => {
  return Math.random() * times - subtract;
}

const particleSpeedY = (times, subtract) => {
  return Math.random() * times - subtract;
}

class Particle {
  constructor(xCoord, yCoord, size, speedX, speedY) {
    this.x = xCoord;
    this.y = yCoord;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.6) {this.size -= 0.001} 
    if (this.speedX > 0.1) {this.speedX -= 0.001}
    if (this.speedY > 0.1) {this.speedY -= 0.001}
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    //ctx.fill();
    ctx.stroke();
  }
}

const generateParticles = () => {
  for (let i = 0; i < numOfParticles; i++) {
    particleArray.push(new Particle(
      particleRandX(),
      particleRandY(),
      particleSize(8, 1),
      particleSpeedX(-1.1, -0.8),
      particleSpeedY(-1.1, -0.8)
    ));
  }
}

// Fill the array with particles
generateParticles();

//Render Particles function
const renderParticles = (particlesArray) => {
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  })
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderParticles(particleArray);
  requestAnimationFrame(animate);
}

animate();
