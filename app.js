var slideIndex = 0;
var autoSlideTimeout;

// Automatic slideshow function
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) { slideIndex = 1 }
  x[slideIndex - 1].style.display = "block";
  autoSlideTimeout = setTimeout(carousel, 2000); // Change every 2 seconds
}

// Manual navigation function
// function plusDivs(n) {
//   clearTimeout(autoSlideTimeout); // Stop automatic slideshow temporarily
//   slideIndex += n - 1; // Adjust for 1-based indexing
//   carousel(); // Restart carousel with updated index
// }

// Start the carousel
carousel();

const canvas = document.getElementById('figureCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const figures = [];
const numFigures = 10; // Number of figures to draw
const figureRadius = 80; // Area where dots move within each figure

// Create a figure
class Figure {
  constructor(centerX, centerY, numDots) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.numDots = numDots;
    this.dots = [];

    // Generate dots for this figure
    for (let i = 0; i < numDots; i++) {
      const angle = (Math.PI * 2 * i) / numDots;
      const radius = Math.random() * figureRadius;
      this.dots.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }
  }

  update() {
    // Update dot positions within the figure's bounds
    for (let dot of this.dots) {
      dot.x += dot.dx;
      dot.y += dot.dy;

      const dx = dot.x - this.centerX;
      const dy = dot.y - this.centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Keep dots within a radius
      if (distance > figureRadius) {
        const angle = Math.atan2(dy, dx);
        dot.x = this.centerX + Math.cos(angle) * figureRadius;
        dot.y = this.centerY + Math.sin(angle) * figureRadius;
      }
    }
  }

  draw() {
    // Draw lines connecting the dots
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"; // White lines
    ctx.lineWidth = 1;

    for (let i = 0; i < this.numDots; i++) {
      const dotA = this.dots[i];
      const dotB = this.dots[(i + 1) % this.numDots];
      ctx.moveTo(dotA.x, dotA.y);
      ctx.lineTo(dotB.x, dotB.y);
    }

    ctx.stroke();

    // Draw dots
    for (let dot of this.dots) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }
}

// Initialize figures
function createFigures() {
  figures.length = 0; // Clear existing figures
  for (let i = 0; i < numFigures; i++) {
    // Spread figures evenly across the screen
    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height;
    const numDots = Math.floor(Math.random() * 6) + 5; // Random number of dots (5–10)
    figures.push(new Figure(centerX, centerY, numDots));
  }
}

// Animate figures
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let figure of figures) {
    figure.update();
    figure.draw();
  }

  requestAnimationFrame(animate);
}

// Resize canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createFigures(); // Recreate figures after resize
});

createFigures();
animate();