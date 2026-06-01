const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
  { x: 200, y: 200 }
];

let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

function setDirection(newDirection) {
  if (newDirection === "LEFT" && direction !== "RIGHT")
    direction = "LEFT";

  if (newDirection === "UP" && direction !== "DOWN")
    direction = "UP";

  if (newDirection === "RIGHT" && direction !== "LEFT")
    direction = "RIGHT";

  if (newDirection === "DOWN" && direction !== "UP")
    direction = "DOWN";
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Move snake
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY
  };

  snake.unshift(newHead);

  // Game Over
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height
  ) {
    clearInterval(game);
    alert("Game Over!");
  }
}

const game = setInterval(drawGame, 150);