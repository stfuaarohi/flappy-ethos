
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.4; // Reduced gravity
const jump = -6;
let birdY = canvas.height / 2;
let birdVelocity = 0;

let score = 0;
let obstacles = [];
let coin = { x: canvas.width, y: Math.random() * canvas.height };
let frame = 0;
let gameOver = false;

function drawBird() {
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(60, birdY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawCoin() {
    ctx.fillStyle = '#fcd535';
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawObstacles() {
    ctx.fillStyle = '#ffffff';
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, 0, 40, obs.top);
        ctx.fillRect(obs.x, canvas.height - obs.bottom, 40, obs.bottom);
    }
}

function updateObstacles() {
    if (frame % 90 === 0) {
        const gap = 140;
        const top = Math.random() * (canvas.height - gap - 100) + 20;
        const bottom = canvas.height - top - gap;
        obstacles.push({ x: canvas.width, top, bottom });
    }
    for (let obs of obstacles) {
        obs.x -= 2;
    }
    obstacles = obstacles.filter(obs => obs.x > -40);
}

function checkCollision() {
    for (let obs of obstacles) {
        if (60 + 15 > obs.x && 60 - 15 < obs.x + 40) {
            if (birdY - 15 < obs.top || birdY + 15 > canvas.height - obs.bottom) {
                gameOver = true;
            }
        }
    }
    if (birdY > canvas.height || birdY < 0) gameOver = true;
}

function checkCoin() {
    if (coin.x < 75 && coin.x > 45 && birdY > coin.y - 15 && birdY < coin.y + 15) {
        score += 1;
        coin.x = canvas.width + 100;
        coin.y = Math.random() * canvas.height;
    }
}

function drawText() {
    ctx.fillStyle = '#fff';
    ctx.font = '24px sans-serif';
    ctx.fillText("Score: " + score, 20, 30);
    if (gameOver) {
        ctx.fillStyle = '#ff0055';
        ctx.font = '32px sans-serif';
        ctx.fillText("REBOOT THE CHAIN", 70, canvas.height / 2);
    }
}

function resetGame() {
    birdY = canvas.height / 2;
    birdVelocity = 0;
    obstacles = [];
    coin = { x: canvas.width, y: Math.random() * canvas.height };
    score = 0;
    frame = 0;
    gameOver = false;
}

document.addEventListener('keydown', function () {
    if (gameOver) {
        resetGame();
    } else {
        birdVelocity = jump;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    birdVelocity += gravity;
    birdY += birdVelocity;

    updateObstacles();
    checkCollision();
    checkCoin();

    drawObstacles();
    drawBird();
    drawCoin();
    drawText();

    coin.x -= 2;
    frame++;

    requestAnimationFrame(gameLoop);
}

gameLoop();
