window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let score = 0;
  let highscore = 0;

  let x = canvas.width / 2 - 5;
  let y = canvas.height / 2 - 5;
  let yVel = 0;
  let xVel = 0;
  function drawPlayer() {
    ctx.fillStyle = '#099500';
    ctx.fillRect(x, y, 10, 10);
  }

  function physics() {
    yVel += .1;
    y += yVel;
  }

  let obstacles = [];
  function spawnObstacle() {
    obstacles.push({
      x: canvas.width - 10,
      y: 0,
      holeY: Math.random() * canvas.height - 25,
      holeHeight: Math.random() * 20 + 40,
      holeWidth: 10
    });
  }
  function drawObstacles() {
    for(let current of obstacles) {
      ctx.fillStyle = 'red';
      ctx.fillRect(current.x, current.y, 10, canvas.width);
      ctx.fillStyle = '#00158D';
      ctx.fillRect(current.x, current.holeY, current.holeWidth, current.holeHeight);
    }
  }
  function moveObstacles() {
    for(let current of obstacles) {
      current.x -= 1;
    }
  }

  function collisionDetection() {
    for(let current of obstacles) {
      if((y < current.holeY || y + 10 > current.holeY + current.holeHeight) && (x + 10 > current.x && x < current.x + 10) || y + 10 > canvas.height + 100 || y < -100) {
        obstacles = [];
        y = canvas.height / 2 - 5;
        yVel = 0;
        score = 0;
      }
    }
  }
  function drawScore() {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px lato';
    ctx.fillText(`Score: ${score} | Highscore: ${highscore}`, 10, 25);
  }

  function keyPress(e) {
    if (e.code == 'Space') {
      yVel = -2;
    }
  }
  document.addEventListener('keypress', function(e) {
    if (e.code == 'Space') {
      yVel = -2;
      e.preventDefault();
    }
  });
  document.addEventListener('touchstart', function() {
    yVel = -2;
  })

  function updateFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    physics();
    drawObstacles();
    moveObstacles();
    drawPlayer();
    collisionDetection();
    drawScore();
    score++;
    if(score > highscore) {
      highscore = score;
    }
    requestAnimationFrame(updateFrame);
  }
  requestAnimationFrame(updateFrame);

  let obsInt = setInterval(spawnObstacle, 1500);
};
