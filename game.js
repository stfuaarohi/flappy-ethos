const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, width: 40, height: 40, gravity: 0, velocity: 0 };
let pipes = [];
let coins = [];
let score = 0;
let gameOver = false;

const birdImg = new Image();
birdImg.src = "ethos-logo.png";

const gmCoin = new Image();
gmCoin.src = "gm-coin.png";

function spawnPipe() {
  const gap = 150;
  const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
  pipes.push({ x: canvas.width, top: topHeight, bottom: topHeight + gap });
}

function spawnCoin() {
  coins.push({ x: canvas.width + 100, y: Math.random() * (canvas.height - 50) });
}

function resetGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  coins = [];
  score = 0;
  gameOver = false;
}

setInterval(spawnPipe, 2000);
setInterval(spawnCoin, 3000);

canvas.addEventListener("click", () => {
  if (!gameOver) bird.velocity = -7;
});

function update() {
  if (gameOver) return;

  bird.velocity += 0.5;
  bird.y += bird.velocity;

  for (let pipe of pipes) {
    pipe.x -= 2;

    // Collision
    if (
      bird.x < pipe.x + 50 &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      document.getElementById("game-over").style.display = "block";
      gameOver = true;
    }
  }

  for (let coin of coins) {
    coin.x -= 2;

    if (
      bird.x < coin.x + 30 &&
      bird.x + bird.width > coin.x &&
      bird.y < coin.y + 30 &&
      bird.y + bird.height > coin.y
    ) {
      score++;
      coins.splice(coins.indexOf(coin), 1);
    }
  }

  if (bird.y > canvas.height || bird.y < 0) {
    document.getElementById("game-over").style.display = "block";
    gameOver = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  for (let pipe of pipes) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height - pipe.bottom);
  }

  for (let coin of coins) {
    ctx.drawImage(gmCoin, coin.x, coin.y, 30, 30);
  }

  ctx.fillStyle = "white";
  ctx.font = "20px sans-serif";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();