import s from './s2pd.js';

s.ezSetup();
s.backgroundColor('black');

document.body.style.background = 'black';

//DECLARE GAME OBJECTS IN Z-ORER YOU WANT THEM TO APPEAR ON SCREEN
const stars = new s.Tile('./assets/stars.png');
const player = new s.Sprite(s.width / 2 - 32, s.height - 100, './assets/player.png');
const ammoText = new s.Text('red', 0, 50, 'Ammo: 10\nScore: 0\nTime: 0.00', 'monospace', 28);
const hearts = new s.Tile('./assets/heart.png', s.width - 200, 10, 5, 1);
const buttonBack = new s.Rectangle('purple', s.width / 2 - 100, s.height / 2 - 43, 200, 40);
buttonBack.changeCursor(); //change cursor to pointer over button.
const startButton = new s.Text('snow', 'center', 'center', 'LOAD GAME', 'monospace', 28);
const restartButton = new s.Text('snow', 'center', 'center', 'Play again?', 'monospace', 28);
const instructions = new s.Text(
  'snow',
  'center',
  startButton.yPos + 50,
  '🎮INSTRUCTIONS🎮\nPC: LEFT AND RIGHT ARROW KEYS TO MOVE\nSPACE TO SHOOT\nTOUCHSCREEN: TOUCH LEFT OR RIGHT SIDE OF SCREEN TO MOVE\nTOUCH SPACESHIP TO SHOOT',
  'monospace',
  s.width * 0.025
);
instructions.center = true;
restartButton.opacity = 0;
const rightController = new s.Rectangle('pink', s.width / 2, 0, s.width / 2, s.height);
const leftController = new s.Rectangle('green', 0, 0, s.width / 2, s.height);
leftController.opacity = 0;
rightController.opacity = 0;
const timeBonusText = new s.Text('red', 'center', 200, 'TIME BONUS!\n+50 POINTS!', 'monospace', 24);
const bgm = new s.Sound('./assets/retrobgm.mp3', 0.3, true);
const ouch = new s.Sound('./assets/ouch.wav', 0.2);
const explosionSound = new s.Sound('./assets/explodify5.wav');
const laser = new s.Sound('./assets/laser2.wav', 0.07);
const hitEnemy = new s.Sound('./assets/collect2.wav', 0.07);
const overMusic = new s.Sound('./assets/gameover2.mp3', 0.3);

//Game variables
timeBonusText.opacity = 0;
timeBonusText.center = true;
let score = 0;
let startTime;
let time;
let currentExplosion = 0;
let windowResized = false;
const explosions = [];
const unusedBullets = [];
const firedBullets = [];
const enemies = [];
const enemyBullets = [];
let preventBonus = false;
let bonus = 50;
let firstTimeGameOver = true;
let startButtonClicked;

buttonBack.onClick(() => {
  if (firstTimeGameOver && !time) {
    s.loadAudio(); // load audio after user interaction!
    startButtonClicked = 1;
    buttonBack.opacity = 0;
    buttonBack.changeCursor('initial');
    bgm.play();
  } else {
    if (!firstTimeGameOver) {
      location.reload();
    }
  }
});

// Create explosion sprites.
// Hint✨- The best way to make numerous copies of the same sprite is to keep them in an array.
for (let i = 0; i < 6; i++) {
  const explosion = new s.Sprite(-1000, -1000, './assets/explosion.png', 6, 4);
  explosions.push(explosion);
}
// And then recycle them when they are no longer needed.
// It is possible to destroy sprites and create new ones,
// however this means the program will have to reload the image file
// each time the sprite is needed.
// This can dramatically affect the performance of games.
function getExplosion(x, y) {
  //
  let newExplosion = explosions[currentExplosion];
  newExplosion.xPos = x;
  newExplosion.yPos = y;
  newExplosion.goToFrame(0);
  if (currentExplosion < 5) {
    currentExplosion += 1;
    return newExplosion;
  } else {
    currentExplosion = 0;
    return newExplosion;
  }
}

for (let i = 0; i < 10; i++) {
  const bullet = new s.Circle(
    `rgb(${s.randomBetween(200, 255)},${s.randomBetween(0, 130)},${s.randomBetween(0, 130)})`,
    player.xPos + 32,
    player.yPos - 5,
    5
  );
  bullet.opacity = 0;
  unusedBullets.push(bullet);
}
function locateToPlayer() {
  for (let i = 0; i < unusedBullets.length; i++) {
    unusedBullets[i].xPos = player.xPos + 32;
    unusedBullets[i].yPos = player.yPos - 5;
  }
}

for (let i = 0; i < 10; i++) {
  const enemy = new s.Sprite(
    s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2),
    -50,
    './assets/enemy.png'
  );
  s.onCollision(enemy, player, true, () => {
    getExplosion(enemy.xPos + 16, enemy.yPos);
    enemy.yPos = -60;
    s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2);
    enemy.velX = 0;
    enemy.velY = 0;
    hearts.repeatX -= 1;
    ouch.play();
    setTimeout(() => {
      enemy.velY = s.randomBetween(2, 5);
      enemy.velX = s.randomBetween(-2, 2);
    }, 1000);
  });
  for (let j = 0; j < unusedBullets.length; j++) {
    const bullet = unusedBullets[j];
    s.onCollision(enemy, bullet, true, () => {
      if (!enemy.inPrison && bullet.opacity === 1) {
        score += 10;
        getExplosion(enemy.xPos + 16, enemy.yPos);
        enemy.yPos = -60;
        s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2);
        enemy.velX = 0;
        enemy.velY = 0;
        enemy.inPrison = true;
        hitEnemy.play();
        setTimeout(() => {
          enemy.inPrison = false;
          enemy.velY = s.randomBetween(2, 5);
          enemy.velX = s.randomBetween(-2, 2);
        }, 3000);
      }
    });
  }
  enemies.push(enemy);
}

for (let i = 0; i < 10; i++) {
  const enemyBullet = new s.Circle(
    `rgb(${s.randomBetween(100, 255)},
      ${s.randomBetween(0, 130)},
      ${s.randomBetween(200, 255)})`,
    -1000,
    -1000,
    5
  );
  s.onCollision(enemyBullet, player, true, () => {
    getExplosion(enemyBullet.xPos, enemyBullet.yPos);
    hearts.repeatX -= 1;
    enemyBullet.velX = 0;
    enemyBullet.velY = 0;
    enemyBullet.yPos = -1500;
    ouch.play();
  });
  for (let j = 0; j < unusedBullets.length; j++) {
    const bullet = unusedBullets[j];
    s.onCollision(enemyBullet, bullet, true, () => {
      if (bullet.opacity === 1) {
        getExplosion(enemyBullet.xPos, enemyBullet.yPos);
        enemyBullet.velX = 0;
        enemyBullet.velY = 0;
        enemyBullet.yPos = -1000;
        score += 20;
      }
    });
  }
  enemyBullets.push(enemyBullet);
}

function returnEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].yPos > s.height + enemies[i].height) {
      enemies[i].yPos = enemies[i].height * -1;
      enemies[i].xPos = s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2);
    }
  }
}

function returnBullets() {
  for (let i = 0; i < firedBullets.length; i++) {
    if (firedBullets[i].yPos < -1000) {
      let returnBullet = firedBullets[i];
      returnBullet.velY = 0;
      returnBullet.opacity = 0;
      firedBullets.splice(i, 1);
      unusedBullets.push(returnBullet);
    }
  }
  for (let i = 0; i < enemyBullets.length; i++) {
    if (enemyBullets[i].yPos > s.height + 5) {
      enemyBullets[i].yPos = -1000;
      enemyBullets[i].velX = 0;
      enemyBullets[i].velY = 0;
    }
  }
}

function removeFinishedExplosions() {
  if (explosions.length > 0) {
    for (let i = 0; i < explosions.length; i++) {
      if (explosions[i].currentFrame >= 5) {
        explosions[i].yPos = -1000;
      }
    }
  }
}

s.keyUp('space', () => {
  if (unusedBullets.length > 0 && firstTimeGameOver) {
    let newBullet = unusedBullets.shift();
    newBullet.opacity = 1;
    newBullet.velY = -10;
    firedBullets.push(newBullet);
    laser.play();
  }
});

s.keyUp('_', () => {
  if (unusedBullets.length > 0 && firstTimeGameOver) {
    let newBullet = unusedBullets.shift();
    newBullet.opacity = 1;
    newBullet.velY = -10;
    firedBullets.push(newBullet);
    laser.play();
  }
});

s.keyUp('up', () => {
  if (unusedBullets.length > 0 && firstTimeGameOver) {
    let newBullet = unusedBullets.shift();
    newBullet.opacity = 1;
    newBullet.velY = -10;
    firedBullets.push(newBullet);
    laser.play();
  }
});

player.onClick(() => {
  if (unusedBullets.length > 0 && firstTimeGameOver && time) {
    let newBullet = unusedBullets.shift();
    newBullet.opacity = 1;
    newBullet.velY = -10;
    firedBullets.push(newBullet);
    laser.play();
  }
});

function moveEnemies(howMuch) {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].xPos += howMuch;
  }
}
leftController.onHold(() => {
  if (time) {
    if (
      typeof s.touchMoveX === 'number' &&
      s.touchMoveX > player.xPos &&
      s.touchMoveX < player.xPos + player.width &&
      s.touchMoveY > player.yPos &&
      s.touchMoveY < player.yPos + player.height
    ) {
    } else {
      stars.innerX += 1;
      player.xPos >= 0 ? (player.xPos -= 2) : moveEnemies(2);
    }
  }
});
rightController.onHold(() => {
  if (time) {
    if (
      typeof s.touchMoveX === 'number' &&
      s.touchMoveX > player.xPos &&
      s.touchMoveX < player.xPos + player.width &&
      s.touchMoveY > player.yPos &&
      s.touchMoveY < player.yPos + player.height
    ) {
    } else {
      stars.innerX -= 1;
      player.xPos < s.width - 64 ? (player.xPos += 2) : moveEnemies(-2);
    }
  }
});

s.keyDown('left', () => {
  if (firstTimeGameOver) {
    stars.innerX += 1;
    player.xPos >= 0 ? (player.xPos -= 2) : moveEnemies(2);
  }
});
s.keyDown('right', () => {
  if (firstTimeGameOver) {
    stars.innerX -= 1;
    player.xPos < s.width - 64 ? (player.xPos += 2) : moveEnemies(-2);
  }
});

s.onResize(() => {
  windowResized = true;
});

s.whileLoading(() => {
  player.yPos = s.height - 100;
  player.xPos = s.width / 2 - 32;
  stars.innerVelY = 1;
  hearts.xPos = s.width - 200;
  buttonBack.xPos = startButton.xPos - 20;
  buttonBack.yPos = startButton.yPos - startButton.height;
  if (startButtonClicked) {
    startButton.text = `${Math.floor(s.percentSoundLoaded)}% loaded...`;
  }
  let ranNum = s.randomBetween(-3, 3);
  let ranNum2 = s.randomBetween(-3, 3);
  startButton.xPos += ranNum;
  startButton.yPos += ranNum2;
});

s.onFirstTime(() => {
  startButton.destroy();
  instructions.destroy();
  stars.innerVelY = 1;
  startTime = Date.now();
  buttonBack.xPos = -1000;
});

s.loop(() => {
  if (hearts.repeatX > 0) {
    time = s.roundToDecimals((Date.now() - startTime) * 0.001, 2);
    if (Math.floor(time) % 15 === 0 && !preventBonus && time > 1) {
      preventBonus = true;
      score += bonus;
      timeBonusText.text = `TIME BONUS!\n+${bonus} POINTS!`;
      let stringBo = Math.floor(bonus * 1.3)
        .toString()
        .split('');
      stringBo[stringBo.length - 1] = '0';
      bonus = parseInt(stringBo.join(''));
      timeBonusText.increasingOpa = true;
      timeBonusText.bonusTime = true;
      timeBonusText.opacity = 0;
    }
    if (timeBonusText.bonusTime) {
      if (timeBonusText.increasingOpa) {
        timeBonusText.opacity += 0.01;
        if (timeBonusText.opacity >= 0.7) {
          timeBonusText.increasingOpa = false;
        }
      } else {
        timeBonusText.opacity -= 0.01;
        if (timeBonusText.opacity <= 0) {
          timeBonusText.opacity = 0;
          timeBonusText.bonusTime = false;
          preventBonus = false;
        }
      }
    }
    if (windowResized) {
      player.xPos = s.width / 2 - 32;
      windowResized = false;
      hearts.xPos = s.width - 200;
      player.yPos = s.height - 100;
      rightController.xPos = s.width / 2;
      rightController.width = s.width / 2;
      rightController.height = s.height;
      leftController.xPos = 0;
      leftController.width = s.width / 2;
      leftController.height = s.height;
    }

    returnBullets();
    returnEnemies();
    locateToPlayer();
    removeFinishedExplosions();
    ammoText.text = `Ammo: ${unusedBullets.length}\nScore: ${score}\nTime: ${time}`;
    let randomNumber = s.randomBetween(0, 30);
    if (randomNumber === 0) {
      const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
      if (!randomEnemy.inPrison) {
        randomEnemy.velY = s.randomBetween(2, 5);
        randomEnemy.velX = s.randomBetween(-2, 2);
        const randomBullet = enemyBullets[Math.floor(Math.random() * enemyBullets.length)];
        if (randomBullet.velY === 0) {
          randomBullet.xPos = randomEnemy.xPos + 16;
          randomBullet.yPos = randomEnemy.yPos + 32;
          let xSpeed = (player.xPos - randomBullet.xPos) * 0.1 + s.randomBetween(-1, 1);
          xSpeed > 10 ? (xSpeed = xSpeed * 0.1) : undefined;
          xSpeed < -10 ? (xSpeed = xSpeed * 0.1) : undefined;
          randomBullet.velX = xSpeed;
          randomBullet.velY = s.randomBetween(4, 7);
        }
      }
    }
  } else {
    if (firstTimeGameOver) {
      ammoText.text = `FINAL SCORE: ${score}`;
      ammoText.xPos = 'center';
      buttonBack.opacity = 1;
      restartButton.opacity = 1;
      bgm.stop();
      player.destroy();
      timeBonusText.destroy();
      overMusic.play();
      explosionSound.play();
      firstTimeGameOver = false;
    }
    buttonBack.xPos = restartButton.xPos - 20;
    buttonBack.yPos = restartButton.yPos - restartButton.height + 3;
    buttonBack.width = restartButton.width + 40;
    let ranNum = s.randomBetween(-3, 3);
    let ranNum2 = s.randomBetween(-3, 3);
    restartButton.xPos += ranNum;
    restartButton.yPos -= ranNum2;
    removeFinishedExplosions();
  }
});

/*
game art courtesy of Bert-o-Naught
https://opengameart.org/content/space-shooter-top-down-2d-pixel-art

Main theme music by Christovix Games
https://opengameart.org/content/the-good-fight

Game over music by Kosmo The Cat
https://opengameart.org/content/game-over-short-jingle

Sound effects by OwlishMedia
https://opengameart.org/content/8-bit-sound-effect-pack
*/
