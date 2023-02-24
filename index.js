let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;
let gameStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = createSprite(width / 2, height / 2, 10, 10);
  leftPaddle = createSprite(50, height / 2, 10, 80);
  rightPaddle = createSprite(width - 50, height / 2, 10, 80);
}

function draw() {
  background(0);
  drawSprites();
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 40);
  text(rightScore, 3 * width / 4, 40);

  if (!gameStarted) {
    textSize(24);
    text("Click to start", width / 2 - 80, height / 2);
    if (mouseIsPressed) {
      gameStarted = true;
      ball.velocity.x = random(-5, 5);
      ball.velocity.y = random(-5, 5);
    }
    return;
  }

  // Ball movement and collision with paddles
  if (ball.bounce(leftPaddle) || ball.bounce(rightPaddle)) {
    // Increase ball speed
    ball.velocity.x *= 1.05;
    ball.velocity.y *= 1.05;
  }
  if (ball.bounce(topWall) || ball.bounce(bottomWall)) {
    ball.velocity.y *= -1;
  }
  if (ball.position.x < 0) {
    rightScore++;
    resetBall();
  } else if (ball.position.x > width) {
    leftScore++;
    resetBall();
  }
  ball.velocity.limit(10);
  ball.position.add(ball.velocity);

  // Left paddle movement
  if (keyIsDown(87)) { // "W" key
    leftPaddle.position.y -= 5;
  }
  if (keyIsDown(83)) { // "S" key
    leftPaddle.position.y += 5;
  }
  leftPaddle.position.y = constrain(leftPaddle.position.y, 40, height - 40);

  // Right paddle movement
  if (keyDown(UP_ARROW)) {
    rightPaddle.position.y -= 5;
  }
  if (keyDown(DOWN_ARROW)) {
    rightPaddle.position.y += 5;
  }
  rightPaddle.position.y = constrain(rightPaddle.position.y, 40, height - 40);

  // Draw center line
  stroke(255);
  line(width / 2, 0, width / 2, height);
}

function resetBall() {
  ball.position.x = width / 2;
  ball.position.y = height / 2;
  ball.velocity.x = 0;
  ball.velocity.y = 0;
  gameStarted = false;
}