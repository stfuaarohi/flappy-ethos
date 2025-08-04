
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');

const birdImg = new Image();
birdImg.src = 'ethos-logo.png';

let bird = { x: 50, y: 200, width: 40, height: 40, velocity: 0 };
let gravity = 0.5;
let jumpStrength = -8;
let isGameOver = false;

document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && !isGameOver) {
    bird.velocity = jumpStrength;
  }
});

function resetGame() {
  bird.y = 200;
  bird.velocity = 0;
  isGameOver = false;
  restartBtn.style.display = 'none';
  animate();
}

function restartGame() {
  resetGame();
}

function drawBird() {
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function showGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "28px sans-serif";
  ctx.fillText("Reboot the Chain", 100, 300);
  restartBtn.style.display = 'block';
}

function animate() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height) {
    isGameOver = true;
    showGameOver();
    return;
  }

  drawBird();
  requestAnimationFrame(animate);
}

birdImg.onload = animate;
