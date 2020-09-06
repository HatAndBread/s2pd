
s.ezSetup();
const bgm = new s.Sound('./bgm.mp3', 0.5, true);
const ouch = new s.Sound('./ouch.mp3', 0.5, false, 1.2);
const gameOverMusic = new s.Sound('./gameOverMusic.mp3', 0.5);
const clouds = new s.Background('./clouds.png');
const mountains = new s.Background('./mountains.png');
const fire = new s.Sprite(-10, -10, './fire.png', 8, 3);
fire.opacity = 0; // make invisible at start
const bat = new s.Sprite(s.width / 2, 100, './bat.png', 14, 4);
const hearts = new s.Tile('./heart.png', 20, 20, 5, 1);
const lava = new s.Tile('./lava.png', 0, s.height - 16);
lava.innerVelX = 0.5, lava.innerVelY = 0.3;
lava.platform(true);
const circle = new s.Circle(s.getRandomColor(), s.width + 30, s.randomBetween(-10, s.height), s.randomBetween(20, 30))
const square = new s.Rectangle(s.getRandomColor, -30, s.randomBetween(0, s.height), 30, 30)
const ellipse = new s.Ellipse(s.getRandomColor(), -30, s.randomBetween(0, s.height), 10, 30, 0, 7);
const ellipse2 = new s.Ellipse(s.getRandomColor(), s.width + 30, s.randomBetween(0, s.height), 10, 30, 0, 7)
bat.addAnimation('flyRight', 0, 5);
bat.addAnimation('flyLeft', 6, 5);
bat.addAnimation('deadLeft', 12, 1);
bat.addAnimation('deadRight', 13, 1);
bat.changeAnimationTo('flyRight');
let directionBatFacing = 'right';
const start = new s.Text(s.getRandomColor(), 'center', 'center', 'START', 'sans-serif', 42, 2, s.getRandomColor())
const instructions = new s.Text('black', 'center', start.yPos + 50, `You are the bat.\n☠️Don't touch the lava or circles or squares or you will die.☠️\nClick or touch the screen to move.\nOn PC you can use arrow keys and space bar.`, 'sans-serif', 22);
instructions.center = true;
const time = new s.Text('black', s.width - 150, 30, 'Time: 0.00', 'sans-serif', 22);
let gameStarted = false;
let gameOver = false;
let startTime;
let gameTime = 0;
start.onClick(() => {
  if (!gameStarted) {
    s.loadAudio(); // Call loadAudio after user interaction. Most browsers will throw an error otherwise.
    startTime = Date.now()
    gameStarted = true;
    start.opacity = 0;
    instructions.opacity = 0;
    bgm.play();
    bat.feelGravity(9);
    fire.updateSize(3);
    circle.velX = -7;
    circle.velY = s.randomBetween(-3, 3);
    square.velX = 7;
    square.velYX = 7;
    ellipse.velX = 4;
    ellipse2.velX = -4;
  }
})
s.keyUp('space', () => {
  if (gameStarted && !gameOver) {
    bat.jump(200);
  }
})
s.keyDown('right', () => {
  if (gameStarted && !gameOver) {
    bat.xPos += 4;
    mountains.xPos -= 0.5;
    bat.changeAnimationTo('flyRight')
    directionBatFacing = 'right';
  }
});
s.keyDown('left', () => {
  if (gameStarted && !gameOver) {
    bat.changeAnimationTo('flyLeft');
    bat.xPos -= 4;
    mountains.xPos += 0.5;
    directionBatFacing = 'left';
  }
})
s.onTouch(() => {
  if (gameStarted && !gameOver) {
    bat.jump(200);
    if (s.touchX > bat.xPos) {
      bat.velX = 3;
      bat.changeAnimationTo('flyRight');
    } else {
      bat.velX = -3;
      bat.changeAnimationTo('flyLeft');
    }
  }
})
s.onClick(() => {
  if (gameStarted && !gameOver) {
    bat.jump(200);
    if (s.mouseX > bat.xPos) {
      bat.velX = 3;
      bat.changeAnimationTo('flyRight');
    } else {
      bat.velX = -3;
      bat.changeAnimationTo('flyLeft');
    }
  }
})
function shuffle(object) {
  object.xPos < -30 ? object.xPos = s.width + 30 : object.xPos = -30;
  object.yPos = s.randomBetween(0, s.height);
  object.color = s.getRandomColor();
  object.velY = s.randomBetween(-3, 3);
}
function batCollision(obj) {
  if (gameStarted && !gameOver) {
    hearts.repeatX -= 1;
    ouch.play();
    shuffle(obj);
  }
}
s.onCollision(square, bat, true, () => {
  batCollision(square);
})
s.onCollision(circle, bat, true, () => {
  batCollision(circle);
})
s.onCollision(bat, ellipse, true, () => {
  batCollision(ellipse);
})
s.onCollision(bat, ellipse2, true, () => {
  batCollision(ellipse2);
})
s.onCollision(bat, lava, true, () => {
  if (gameStarted && !gameOver) {
    hearts.repeatX -= 1;
    ouch.play();
    fire.opacity = 1;
    hearts.repeatX > 0 ? bat.jump(50) : undefined;
  }
  if (gameOver) {
    bat.noGravity();
    bat.velY = 0.1
    bat.velX = 0.1
    fire.opacity = 1;
  }
})
function randomizeDirection(...args) {
  args.forEach((arg) => {
    arg.color = s.getRandomColor()
    arg.velX += s.randomBetween(-1, 1);
    arg.velY += s.randomBetween(-1, 1);
  })
}
function centerObjects() {
  instructions.yPos = start.yPos + 50;
  bat.xPos = s.width / 2 - bat.width / 2;
  bat.yPos = start.yPos - bat.height * 1.8;
  circle.xPos = s.width + 30;
  ellipse2.xPos = s.width + 40;
  instructions.size = canvas.width * 0.03;
}
function keepFromGoingTooFast(obj, min, max, newVel) {
  obj.velX < min || obj.velX > max ? obj.velX = newVel : undefined;
}
function game() {
  s.uncancelDraw();
  if (!gameStarted) { // keep objects in position in case of window resize.
    centerObjects();
  }
  lava.yPos = s.height - 16;//keep in position in case of window resize.
  time.xPos = s.width - 150;
  clouds.xPos -= 2;
  fire.xPos = bat.xPos;
  fire.yPos = bat.yPos - bat.height / 2;
  ellipse.rotation += 0.3;
  ellipse2.rotation += 0.3;
  if (gameStarted && !gameOver) {
    gameTime = s.roundToDecimals((Date.now() - startTime) * 0.001, 2);
    time.text = `Time: ${gameTime}`;
    if (bat.yPos < 0) {
      bat.jumping = false;
    }
    if (bat.xPos < 0) {
      bat.xPos += 10
    }
    if (bat.xPos > s.width - bat.width) {
      bat.xPos -= 10
    }
    randomizeDirection(circle, square, ellipse, ellipse2);
    keepFromGoingTooFast(circle, -10, 0, -7);
    keepFromGoingTooFast(ellipse2, -6, 0, -4);
    keepFromGoingTooFast(square, 0, 10, 7);
    keepFromGoingTooFast(ellipse, 0, 6, 4);
    if (circle.xPos < -30) {
      shuffle(circle);
    }
    if (square.xPos > s.width + 30) {
      shuffle(square);
    }
    if (ellipse.xPos > s.width + 30) {
      shuffle(ellipse);
    }
    if (ellipse2.xPos < -30) {
      shuffle(ellipse2)
    }
  }
  if (hearts.repeatX === 0) {
    if (!gameOver) { // prevent from playing repeatedly;
      gameOverMusic.play();
    }
    gameOver = true;
    bgm.stop();
    start.text = '☠️GAME OVER☠️'
    start.opacity = 1;
    directionBatFacing === 'left' ? bat.changeAnimationTo('deadLeft') : bat.changeAnimationTo('deadRight');
    lava.notPlatform();
    bat.jumping = false;
    bat.velY = 0.1, bat.velX = 0.1;
  }
}
s.loop(game)


