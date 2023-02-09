const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let hue = 0;

// Set canvas size and resize watch
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particles array settings
let numOfParticles = 3;
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
  const particleColor = `hsl(${hue}, 80%, 80%`;
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < numOfParticles; i++) {
    particleArray.push(new Particle(
      particleRandX(),
      particleRandY(),
      particleSize(10, 0.1),
      particleSpeedX(-1, -0.6),
      particleSpeedY(-1, -0.6),
      particleColor
    ))
  };
});

window.addEventListener("click", (event) =>{
  const particleColor = `hsl(${hue}, 60%, 50%`;
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < numOfParticles; i++) {
    particleArray.push(new Particle(
      particleRandX(),
      particleRandY(),
      particleSize(28, 1),
      particleSpeedX(-1.1, -0.8),
      particleSpeedY(0.5, -0.8),
      particleColor
    ))
  };
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
  constructor(xCoord, yCoord, size, speedX, speedY, color) {
    //this.x = xCoord; // Born in random X position on screen
    //this.y = yCoord; // Born in random Y position on screen
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.6) {this.size -= 0.04} 
    if (this.speedX > 0.1) {this.speedX -= 0.001}
    if (this.speedY > 0.1) {this.speedY -= 0.001}
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

/*
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
*/

// Fill the array with particles
//generateParticles();

//Render Particles function
const renderParticles = (particlesArray) => {
  // Include fix of index-- here. Change to regular for loop
  particlesArray.forEach((particle, index) => {
    particle.update();
    particle.draw();

    // Check particle size and remove if size is small enough
    if(particle.size < 1.3){
      particlesArray.splice(index, 1);
    }
  })
}


const animate = () => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  renderParticles(particleArray);
  // hue = Math.floor(Math.random() * 255); Random color for particle
  hue+=0.6;
  requestAnimationFrame(animate);
}

animate();
