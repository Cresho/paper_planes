document.addEventListener("DOMContentLoaded", () => {
  //#region Vars
  const plane = document.querySelector(".plane");
  const gameDisplay = document.querySelector(".game-container");
  const gameWrapper = document.querySelector(".game-wrapper");
  const ground = document.querySelector(".ground");
  const counterDisplay = document.querySelector(".counter");

  let planeLeft = 225;
  let planeBottom = 255;
  let gravity = 1.5;
  let isGameOver = true;
  let gap = 420;
  let count = 0;

  let pipes = [];
  //#endregion

  //#region App
  document.addEventListener("keydown", control);
  document.addEventListener("keydown", start);

  let gameTimerId = setInterval(startGame, 20);

  function start(s) {
    if (s.keyCode === 13 && isGameOver) {
      setTimeout(() => {
        gameOver();
        initVars();
        initGame();
      }, 1000);
    }
  }
  //#endregion

  //#region Functions
  function initVars() {
    planeLeft = 225;
    planeBottom = 255;

    gravity = 1.5;
    isGameOver = false;
    gap = 420;
    count = 0;
    pipes = [];

    plane.style.bottom = planeBottom;
    plane.style.left = planeLeft;
  }

  function startGame() {
    updateDisplay();
    plane.style.bottom = planeBottom + "px";
    plane.style.left = planeLeft + "px";
    planeBottom -= gravity;
    if (isGameOver && planeBottom <= 200) {
      planeBottom += 75;
    }
  }

  function control(e) {
    if (e.keyCode === 32) {
      up();
    }
  }

  function up() {
    if (!isGameOver) {
      if (planeBottom < 520) planeBottom += 75;
      plane.style.bottom = planeBottom + "px";
    }
  }

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;

    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    pipes.push(obstacle);
    pipes.push(topObstacle);

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2.5;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -50) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        (obstacleLeft > 205 &&
          obstacleLeft < 275 &&
          planeLeft === 225 &&
          (planeBottom < obstacleBottom + 150 ||
            planeBottom > obstacleBottom + gap - 183)) ||
        planeBottom <= 0
      ) {
        gameOver();
        clearInterval(timerId);
      } else if (obstacleLeft === 220) {
        count++;
        updateDisplay();
      }
    }

    const timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) {
      setTimeout(generateObstacle, 3000);
    } else {
      clearInterval(timerId);
      gameOver();
    }
  }

  function updateDisplay() {
    counterDisplay.innerHTML = count;
  }

  function gameOver() {
    clearInterval(gameTimerId);
    // :(
    Array.from(gameDisplay.children).forEach((c) => {
      if (pipes.includes(c)) {
        gameDisplay.removeChild(c);
      }
    });
    //
    isGameOver = true;
  }

  function initGame() {
    isGameOver = false;
    gameTimerId = setInterval(startGame, 20);
    generateObstacle();
  }
  //#endregion
});
