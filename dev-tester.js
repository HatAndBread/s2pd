import s from './s2pd.js'
window.s = s.s2pd;
s.ezSetup();
s.backgroundColor('black');
const stars = new s.Tile('./dev-assets/stars.png');
const player = new s.Sprite(s.width / 2 - 32, s.height - 100, './dev-assets/player.png');
const ammoText = new s.Text('red', 0, 50, 'Ammo: 10\nScore: 0\nTime: 0.00', 'monospace', 28);
const hearts = new s.Tile('./dev-assets/heart.png', s.width - 200, 10, 5, 1);
const buttonBack = new s.Rectangle('purple', s.width / 2 - 90, s.height / 2 - 43, 180, 40);
const startButton = new s.Text('snow', 'center', 'center', 'LOAD GAME', 'monospace', 28);
const timeBonusText = new s.Text('red', 'center', 200, 'TIME BONUS!\n+50 POINTS!', 'monospace', 24);
timeBonusText.opacity = 0;
timeBonusText.center = true;

buttonBack.onClick(() => {
  buttonBack.destroy();
  startButton.destroy();
}, true);

let score = 0;
let startTime;
let time;
const explosions = [];

const unusedBullets = [];
const firedBullets = [];
for (let i = 0; i < 10; i++) {
  const bullet = new s.Circle(`rgb(${s.randomBetween(200, 255)},${s.randomBetween(0, 130)},${s.randomBetween(0, 130)})`, player.xPos + 32, player.yPos - 5, 5);
  bullet.opacity = 0;
  unusedBullets.push(bullet);
}


function locateToPlayer() {
  for (let i = 0; i < unusedBullets.length; i++) {
    unusedBullets[i].xPos = player.xPos + 32
    unusedBullets[i].yPos = player.yPos - 5;
  }
}


const enemies = [];
const enemyBullets = [];

for (let i = 0; i < 10; i++) {
  const enemy = new s.Sprite(s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2), -50, './dev-assets/enemy.png');
  s.onCollision(enemy, player, true, () => {
    const explosion = new s.Sprite(enemy.xPos + 16, enemy.yPos + 16, './dev-assets/explosion.png', 6, 4);
    explosions.push(explosion);
    enemy.yPos = -60;
    s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2);
    enemy.velX = 0;
    enemy.velY = 0;
    hearts.repeatX -= 1;
    setTimeout(() => {
      enemy.velY = s.randomBetween(2, 5);
      enemy.velX = s.randomBetween(-2, 2);
    }, 1000)
  });
  for (let j = 0; j < unusedBullets.length; j++) {
    const bullet = unusedBullets[j];
    s.onCollision(enemy, bullet, true, () => {
      if (!enemy.inPrison && bullet.opacity === 1) {
        score += 10;
        const explosion = new s.Sprite(enemy.xPos + 16, enemy.yPos + 16, './dev-assets/explosion.png', 6, 4);
        explosions.push(explosion);
        enemy.yPos = -60;
        s.randomBetween(player.xPos - s.width / 2, player.xPos + s.width / 2);
        enemy.velX = 0;
        enemy.velY = 0;
        enemy.inPrison = true;
        setTimeout(() => {
          enemy.inPrison = false;
          enemy.velY = s.randomBetween(2, 5);
          enemy.velX = s.randomBetween(-2, 2);
        }, 3000)
      }
    });
  }
  enemies.push(enemy);
}

for (let i = 0; i < 10; i++) {
  const enemyBullet = new s.Circle(`rgb(${s.randomBetween(100, 255)},
      ${s.randomBetween(0, 130)},
      ${s.randomBetween(200, 255)})`,
    -1000,
    -1000,
    5);
  s.onCollision(enemyBullet, player, true, () => {
    const explosion = new s.Sprite(enemyBullet.xPos, enemyBullet.yPos, './dev-assets/explosion.png', 6, 4);
    explosions.push(explosion);
    hearts.repeatX -= 1;
    enemyBullet.velX = 0;
    enemyBullet.velY = 0;
    enemyBullet.yPos = -1500;
  });
  for (let j = 0; j < unusedBullets.length; j++) {
    s.onCollision(enemyBullet, unusedBullets[j], true, () => {
      const explosion = new s.Sprite(enemyBullet.xPos, enemyBullet.yPos, './dev-assets/explosion.png', 6, 4);
      explosions.push(explosion);
      enemyBullet.velX = 0;
      enemyBullet.velY = 0;
      enemyBullet.yPos = -1000;
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
      unusedBullets.push(returnBullet)
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
      if (explosions[i].playedOnce) {
        explosions[i].destroy();
        explosions.splice(i, 1);
      }
    }
  }
}

s.keyUp('space', () => {
  if (unusedBullets.length > 0) {
    let newBullet = unusedBullets.shift();
    newBullet.opacity = 1;
    newBullet.velY = -10;
    firedBullets.push(newBullet);
  }
});

function moveEnemies(howMuch) {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].xPos += howMuch;
  }
}
s.keyDown('left', () => {
  stars.innerX += 1;
  player.xPos >= 0 ? player.xPos -= 2 : moveEnemies(2);
})
s.keyDown('right', () => {
  stars.innerX -= 1;
  player.xPos < s.width - 64 ? player.xPos += 2 : moveEnemies(-2);
})

s.whileLoading(() => {

});

s.onFirstTime(() => {
  stars.innerVelY = 1;
  startTime = Date.now();
})
let preventBonus = false;
let bonus = 50;


s.loop(() => {
  time = s.roundToDecimals((Date.now() - startTime) * .001, 2);
  if (Math.floor(time) % 15 === 0 && !preventBonus && time > 1) {
    preventBonus = true;
    console.log('Time Bonus')
    score += bonus;
    timeBonusText.text = `TIME BONUS!\n+${bonus} POINTS!`
    let stringBo = Math.floor(bonus * 1.3).toString().split('')
    stringBo[stringBo.length - 1] = "0";
    bonus = parseInt(stringBo.join(''))
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

  hearts.xPos = s.width - 200;
  player.yPos = s.height - 100;
  returnBullets();
  returnEnemies();
  locateToPlayer();
  removeFinishedExplosions();
  ammoText.text = `Ammo: ${unusedBullets.length}\nScore: ${score}\nTime: ${time}`
  let randomNumber = s.randomBetween(0, 30);
  if (randomNumber === 0) {
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    if (!randomEnemy.inPrison) {
      randomEnemy.velY = s.randomBetween(2, 5);
      randomEnemy.velX = s.randomBetween(-2, 2);
      const randomBullet = enemyBullets[Math.floor(Math.random() * enemyBullets.length)]
      if (randomBullet.velY === 0) {
        randomBullet.xPos = randomEnemy.xPos + 16;
        randomBullet.yPos = randomEnemy.yPos + 32;
        let xSpeed = ((player.xPos - randomBullet.xPos) * 0.1) + s.randomBetween(-1, 1);
        xSpeed > 10 ? xSpeed = xSpeed * 0.1 : undefined;
        xSpeed < -10 ? xSpeed = xSpeed * 0.1 : undefined;
        randomBullet.velX = xSpeed;
        randomBullet.velY = s.randomBetween(4, 7);
      }
    }
  }
});


/*
game art courtesy of Bert-o-Naught
https://opengameart.org/content/space-shooter-top-down-2d-pixel-art
*/