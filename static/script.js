// JavasScript koda daļa čūskas spēlei
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = 400;

let snake = [{ x: 160, y: 160 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Uzzīmē čūsku
    ctx.fillStyle = "lime";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Uzzīmē ēdienu
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Aprēķina nākamo galvas pozīciju
    const head = { ...snake[0] };
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    // Pārbauda sadursmes ar sienām vai sevi
    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
        document.getElementById("gameOverMsg").textContent = "Spēle beigusies!";
        gameOver = true;
        return;
    }

    snake.unshift(head);

    // Pārbauda, vai čūska apēda ēdienu
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = `Rezultāts: ${score}`;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    const x = Math.floor(Math.random() * (canvasSize / box)) * box;
    const y = Math.floor(Math.random() * (canvasSize / box)) * box;
    return { x, y }; 
}

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}


// Atkārto zīmēšanas funkciju ik pēc 150ms
setInterval(draw, 150);

function restartGame() {
    snake = [{ x: 160, y: 160 }];
    direction = "RIGHT";
    food = spawnFood();
    score = 0;
    gameOver = false;
    document.getElementById("score").textContent = "Rezultāts: 0";
    document.getElementById("gameOverMsg").textContent = "";
}