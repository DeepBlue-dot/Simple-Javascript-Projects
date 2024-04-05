const replayButton = document.getElementById("replay");
const canvas = document.getElementById("canvas");
const scoreLable = document.getElementById("score");
const gameBoard = document.getElementById("gameBoard");
const gameBoardctx = gameBoard.getContext("2d");

const Dimension = {
  width: 500,
  height: 500,
};

document.addEventListener("keydown", (e) => snake.changeDirection(e.code));
replayButton.addEventListener("click", (e) => gameBoardObject.restart());

function drawGride() {
  const grideColor = "rgb(34, 39, 56)";
  for (let i = 25; i < Dimension.width; i += 25) {
    gameBoardctx.moveTo(i, 0);
    gameBoardctx.lineTo(i, Dimension.height);
    gameBoardctx.strokeStyle = grideColor;
    gameBoardctx.stroke();
  }
  for (let i = 25; i < Dimension.height; i += 25) {
    gameBoardctx.moveTo(0, i);
    gameBoardctx.lineTo(Dimension.width, i);
    gameBoardctx.strokeStyle = grideColor;
    gameBoardctx.stroke();
  }
}

const gameBoardObject = {
  width: Dimension.width / 25,
  height: Dimension.height / 25,
  score: 0,
  running: false,
  lastRenderTime: 0,
  frameDelay: 1000 / 10,
  gride: [],

  start: function () {
    drawGride();
    gameBoardObject.createGride();
    snake.placeSnake();
    apple.createApple();
    gameBoardObject.drawBorde();
    requestAnimationFrame(gameBoardObject.Animate);
  },
  restart: function () {
    snake.direction = null;
    this.score = 0;
    this.running = false;
    this.gride = [];
    this.createGride();
    snake.placeSnake();
    this.drawBorde();
  },
  Animate: function (currentTime) {
    const deltaTime = currentTime - gameBoardObject.lastRenderTime;
    if (deltaTime > gameBoardObject.frameDelay && gameBoardObject.running) {
      snake.move();
      apple.check();
      gameBoardObject.drawBorde();
      gameBoardObject.lastRenderTime =
        currentTime - (deltaTime % gameBoardObject.frameDelay);
    }
    requestAnimationFrame(gameBoardObject.Animate);
  },
  updateScore: function () {
    scoreLable.textContent = this.score;
  },
  createGride: function () {
    for (let i = 0; i < this.width; i++) {
      let tempWidth = [];
      for (let j = 0; j < this.height; j++) {
        tempWidth.push(0);
      }
      this.gride.push(tempWidth);
    }
  },
  drawBorde: function () {
    for (let i = 0; i < this.gride.length; i++) {
      for (let j = 0; j < this.gride[i].length; j++) {
        switch (this.gride[i][j]) {
          case 1:
            this.drawBox(j, i, snake.color(j, i));
            break;
          case 2:
            this.drawBox(j, i, apple.color);
            break;
          case 0:
            this.drawBox(j, i, "#181825");
            break;
        }
      }
    }
  },

  drawBox: function (x, y, color) {
    gameBoardctx.strokeStyle = "rgb(34, 39, 56)";
    gameBoardctx.fillStyle = color;
    gameBoardctx.fillRect(x * 25, y * 25, 25, 25);
    gameBoardctx.strokeRect(x * 25, y * 25, 25, 25);
  },
};

const apple = {
  color: null,
  position: [],
  placeApple: function () {
    const x = Math.floor(Math.random() * gameBoardObject.width);
    const y = Math.floor(Math.random() * gameBoardObject.height);
    this.position = [[x, y]];
    gameBoardObject.gride[y][x] = 2;
  },
  check: function () {
    if (
      this.position[0][0] === snake.position[0][0] &&
      this.position[0][1] === snake.position[0][1]
    ) {
      gameBoardObject.score++;
      gameBoardObject.updateScore();
      snake.grow();
      setTimeout(apple.placeApple(), 100000);
      return true;
    }
    return false;
  },
  gameOver: function () {},
  generateColor: function () {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Construct RGB color string
    this.color = `rgb(${red}, ${green}, ${blue})`;
  },
  createApple: function () {
    this.placeApple();
    this.generateColor();
  },
};

const snake = {
  direction: "W",
  position: [],

  check: function (x, y) {
    if (y < 0) {
      y = gameBoardObject.height - 1;
    }
    if (y > gameBoardObject.height - 1) {
      y = 0;
    }
    if (x < 0) {
      x = gameBoardObject.width - 1;
    }
    if (x > gameBoardObject.width - 1) {
      x = 0;
    }
    if (gameBoardObject.gride[y][x] === 1) {
      return false;
    }
    return true;
  },

  grow: function () {
    let tail = [];
    switch (this.direction) {
      case "W":
        tail = [
          this.position[this.position.length - 1][0],
          this.position[this.position.length - 1][1] + 1,
        ];
        break;
      case "S":
        tail = [
          this.position[this.position.length - 1][0],
          this.position[this.position.length - 1][1] - 1,
        ];
        break;
      case "A":
        tail = [
          this.position[this.position.length - 1][0] + 1,
          this.position[this.position.length - 1][1],
        ];
        break;
      case "D":
        tail = [
          this.position[this.position.length - 1][0] - 1,
          this.position[this.position.length - 1][1],
        ];
        break;
    }
    this.position.push(tail);
  },
  changeDirection: function (direction) {
    switch (direction) {
      case "ArrowUp":
        if (this.direction !== "S") {
          this.direction = "W";
          gameBoardObject.running = true;
        }
        break;
      case "ArrowDown":
        if (this.direction !== "W") {
          this.direction = "S";
          gameBoardObject.running = true;
        }
        break;
      case "ArrowLeft":
        if (this.direction !== "D") {
          this.direction = "A";
          gameBoardObject.running = true;
        }
        break;
      case "ArrowRight":
        if (this.direction !== "A") {
          this.direction = "D";
          gameBoardObject.running = true;
        }
        break;
    }
  },

  color: function (x, y) {
    if (this.position[0][0] === x && this.position[0][1] === y) {
      return "#ffffff";
    }
    return "#d6d6d0";
  },

  move: function () {
    let head = [this.position[0][0], this.position[0][1]];
    switch (this.direction) {
      case "W":
        if (this.check(head[0], head[1] - 1)) {
          this.position.unshift([head[0], head[1] - 1]);
          if (this.position[0][1] < 0) {
            this.position[0][1] = gameBoardObject.height - 1;
          }
          gameBoardObject.gride[this.position[0][1]][this.position[0][0]] = 1;
          const tail = this.position.pop();
          gameBoardObject.gride[tail[1]][tail[0]] = 0;
        }
        break;
      case "S":
        if (this.check(head[0], head[1] + 1)) {
          this.position.unshift([head[0], head[1] + 1]);
          if (this.position[0][1] > gameBoardObject.height - 1) {
            this.position[0][1] = 0;
          }
          gameBoardObject.gride[this.position[0][1]][this.position[0][0]] = 1;
          const tail = this.position.pop();
          gameBoardObject.gride[tail[1]][tail[0]] = 0;
        }
        break;
      case "A":
        if (this.check(head[0] - 1, head[1])) {
          this.position.unshift([this.position[0][0] - 1, this.position[0][1]]);
          if (this.position[0][0] < 0) {
            this.position[0][0] = gameBoardObject.width - 1;
          }
          gameBoardObject.gride[this.position[0][1]][this.position[0][0]] = 1;
          const tail = this.position.pop();
          gameBoardObject.gride[tail[1]][tail[0]] = 0;
        }
        break;
      case "D":
        if (this.check(head[0] + 1, head[1])) {
          this.position.unshift([this.position[0][0] + 1, this.position[0][1]]);
          if (this.position[0][0] > gameBoardObject.width - 1) {
            this.position[0][0] = 0;
          }
          gameBoardObject.gride[this.position[0][1]][this.position[0][0]] = 1;
          const tail = this.position.pop();
          gameBoardObject.gride[tail[1]][tail[0]] = 0;
        }
        break;
    }
  },
  placeSnake: function () {
    const x = Math.floor(Math.random() * (gameBoardObject.width - 5));
    const y = Math.floor(Math.random() * (gameBoardObject.height - 5));
    this.position = [[x, y]];
    gameBoardObject.gride[y][x] = 1;
  },
};

gameBoardObject.start();
