import s from './s2pd.js';
window.s = s.s2pd;

s.ezSetup();
let r = s.randomBetween(0, 255);
let g = s.randomBetween(0, 255);
let b = s.randomBetween(0, 255);

const clouds = new s.Background('./dev-assets/cloudsii.png');
const mountains = new s.Tile('./dev-assets/mountains.png', 0, -100, 0, 1);

const fire = new s.Sprite(0, 0, './dev-assets/fire.png', 8, 3);
fire.opacity = 0;
const hero = new s.Sprite(50, 0, './dev-assets/longerhero.png', 35, 4);
hero.trimHitBox(40, 40, 18, 0);

const tube1 = new s.Sprite(s.width / 1.8, s.height - s.randomBetween(80, 190), './dev-assets/tube.png');
const tube2 = new s.Sprite(s.width / 3, s.height - s.randomBetween(80, 190), './dev-assets/tube.png');
tube1.increasing = s.choose(0, 1);
tube2.increasing = s.choose(0, 1);
tube1.platform(true);
tube2.platform(true);
clouds.velX = -0.5;

const hearts = new s.Tile('./dev-assets/heart.png', 30, 30, 5, 1);
const blackHearts = new s.Tile('./dev-assets/blackheart.png', s.width - 200, 30, 5, 1);
const ground = new s.Tile('./dev-assets/ground.png', 20, s.height - 100, 2, 1);
ground.platform(true);
const enemyGround = new s.Tile('./dev-assets/ground.png', s.width - 190, s.height - 100, 2, 1);
enemyGround.platform(true);
const enemy = new s.Sprite(enemyGround.xPos, 0, './dev-assets/scary.png', 2, 8);
enemy.feelGravity();
const enemyBullets = [];
function remove(what) {
  what.velX = 0;
  what.velY = 0;
  what.xPos = -1000;
  what.repeatX -= 1;
}
for (let i = 0; i < 10; i++) {
  const bullet = new s.Circle(
    `rgb(${s.randomBetween(200, 255)},${s.randomBetween(0, 150)},${s.randomBetween(0, 150)}`,
    300,
    -1000,
    10
  );
  s.onCollision(hero, bullet, true, () => {
    moveExplosion(bullet.xPos, bullet.yPos);
    remove(bullet);
    ouch.play();
    hearts.repeatX -= 1;
  });
  s.onCollision(bullet, tube1, true, () => {
    moveExplosion(bullet.xPos, bullet.yPos);
    remove(bullet);
  });
  s.onCollision(bullet, tube2, true, () => {
    moveExplosion(bullet.xPos, bullet.yPos);
    remove(bullet);
  });
  enemyBullets.push(bullet);
}
const bananas = [];
for (let i = 0; i < 10; i++) {
  const banana = new s.Sprite(-1000, 200, './dev-assets/banana.png');

  bananas.push(banana);
  s.onCollision(enemy, banana, true, () => {
    moveExplosion(banana.xPos, banana.yPos);
    blackHearts.repeatX -= 1;
    remove(banana);
  });
  s.onCollision(banana, tube1, true, () => {
    moveExplosion(banana.xPos, banana.yPos);
    remove(banana);
  });
  s.onCollision(banana, tube2, true, () => {
    moveExplosion(banana.xPos, banana.yPos);
    remove(banana);
  });
  for (let i = 0; i < enemyBullets.length; i++) {
    s.onCollision(banana, enemyBullets[i], true, () => {
      moveExplosion(banana.xPos, banana.yPos);
      remove(enemyBullets[i]);
      remove(banana);
    });
  }
}

const explosions = [];
let exNum = 0;
function moveExplosion(x, y) {
  let e = explosions[exNum];
  e.xPos = x;
  e.yPos = y;
  e.currentFrame = 0;
  exNum < 5 ? (exNum += 1) : (exNum = 0);
}
function removeExplosions() {
  for (let i = 0; i < explosions.length; i++) {
    let e = explosions[i];
    if (e.xPos > 0 && e.currentFrame === 5) {
      e.xPos = -1000;
    }
  }
}
for (let i = 0; i < 6; i++) {
  const explosion = new s.Sprite(-300, -300, './dev-assets/explosion.png', 6, 5);
  explosions.push(explosion);
}
const lava = new s.Tile('./dev-assets/lava.png', 0, s.height - 32, 0, 1);
lava.platform(true);
lava.innerVelX = 0.4;
lava.innerVelY = 0.1;

let bulletNum = 0;
let stopEnFi = false;
function enemyFire() {
  let ran = s.randomBetween(0, 30);
  if (ran === 1 && stopEnFi === false) {
    let a = enemyBullets[bulletNum];
    bulletNum >= 9 ? (bulletNum = 0) : undefined;
    a.xPos = enemy.xPos;
    a.yPos = enemy.yPos + 30;
    a.velX = s.randomBetween(-12, -7);
    a.velY = s.randomBetween(2, -2);
    bulletNum += 1;
    stopEnFi = true;
    setTimeout(() => {
      stopEnFi = false;
    }, s.randomBetween(300, 600));
  }
}

function moveGrounds(ground) {
  let ranNum = s.randomBetween(0, 30);
  if (
    ground.xPos > 0 &&
    ground.xPos < s.width - ground.width &&
    ground.yPos > 0 + hero.height * 2 &&
    ground.yPos < s.height - 80
  ) {
    if (ranNum === 1) {
      ground.velY = s.randomBetween(-2, 2);
    }
  } else {
    ground.velY = ground.velY * -1;
  }
}

function moveTubes(tube) {
  if (tube.yPos <= s.height - 190) {
    tube.increasing = true;
  } else if (tube.yPos >= s.height - 80) {
    tube.increasing = false;
  }
  tube.increasing ? (tube.yPos += s.randomBetween(1, 3)) : (tube.yPos -= s.randomBetween(1, 3));
}
function inTube() {
  if (hero.inTube) {
    if (hero.yPos > s.height) {
      hero.xPos = tube1.xPos - 10;
      hero.velY = -10;
    }
    if (hero.yPos > tube2.yPos - 60 && hero.xPos < tube1.xPos - 30) {
      hero.changeAnimationTo('tubeRight');
      hero.xPos = tube2.xPos - 15;
    }
    if (hero.yPos <= tube2.yPos - hero.height && hero.xPos >= tube1.xPos - 20) {
      hero.inTube = false;
      hero.velY = 0;
      hero.feelGravity();
      hero.inTube = false;
      hero.jump(600);
      hero.changeAnimationTo('standRight');
    }
  }
}

s.onCollision(hero, tube2, true, () => {
  if (hero.xPos > tube2.xPos - 40 && hero.xPos < tube2.xPos - 8) {
    hero.changeAnimationTo('standRight');
    hero.noGravity();
    hero.inTube = true;
    hero.velY = 3;
  }
});

s.onCollision(hero, enemyGround, true, () => {
  hero.jump(1000);
  ouch.play();
  hearts.repeatX -= 1;
  hero.velX = -10;
  setTimeout(() => {
    hero.velX = 0;
  }, 840);
});

s.onCollision(hero, lava, true, () => {
  if (!hero.inTube && !gameOver) {
    hero.jump(300, true);
    hearts.repeatX -= 1;
    fire.opacity = 1;
    ouch.play();
  }
});

hero.addAnimation('standRight', 0, 1);
hero.addAnimation('standLeft', 21, 1);
hero.addAnimation('blinkRight', 7, 4);
hero.addAnimation('blinkLeft', 11, 4);
hero.addAnimation('walkRight', 0, 7);
hero.addAnimation('walkLeft', 15, 7);
hero.addAnimation('tubeRight', 34, 1);
hero.changeAnimationTo('standRight');
const openBack = new s.Rectangle(`rgb(${r},${g},${b})`, 0, 0, s.width, s.height);
const loadText = new s.Text(
  `rgb(${b},${g},${r})`,
  'center',
  'center',
  '🌈CLICK ME TO LOAD GAME🌈',
  'monospace',
  28,
  1.5,
  `rgb(${g},${r},${b})`
);

loadText.center = true;
const bgm = new s.Sound('./dev-assets/nicemusic.mp3', 0.2, true);
const endMusic = new s.Sound('./dev-assets/gameOverMusic.mp3', 0.2);
const ouch = new s.Sound('./dev-assets/ouch.mp3', 0.2);
loadText.changeCursor();
const opaque = new s.Rectangle(s.getRandomColor(), 0, 0, s.width, s.height);

function blink() {
  let ran = s.randomBetween(0, 150);
  if (ran === 1) {
    if (hero.currentAnimationName === 'standRight') {
      hero.changeAnimationTo('blinkRight');
    } else if (hero.currentAnimationName === 'standLeft') {
      hero.changeAnimationTo('blinkLeft');
    }
  }
  if (hero.currentAnimationName === 'blinkRight' && hero.currentFrame === 3) {
    hero.changeAnimationTo('standRight');
  } else if (hero.currentAnimationName === 'blinkLeft' && hero.currentFrame === 3) {
    hero.changeAnimationTo('standLeft');
  }
}

function inBounds() {
  if (hero.xPos < 0) {
    hero.xPos = 0;
  } else if (hero.xPos > s.width - hero.width) {
    hero.xPos = s.width - hero.width;
  }
}

loadText.onClick(() => {
  s.loadAudio();
  opaque.destroy();
  openBack.destroy();
  bgm.play();
  loadText.destroy();
  loadingText.opacity = 1;
}, true);

let firstLeft = true;
s.keyDown('left', () => {
  if (!hero.inTube) {
    if (firstLeft && hero.currentAnimationName !== 'walkRight') {
      firstLeft = false;
      hero.changeAnimationTo('walkLeft');
    }
    hero.xPos -= 3;
    mountains.innerX += 0.2;
  }
});
let firstRight = true;
s.keyDown('right', () => {
  if (!hero.inTube) {
    if (firstRight && hero.currentAnimationName !== 'walkLeft') {
      firstRight = false;
      hero.changeAnimationTo('walkRight');
    }
    hero.xPos += 3;
    mountains.innerX -= 0.2;
  }
});
s.keyUp('left', () => {
  if (!hero.inTube) {
    if (hero.currentAnimationName === 'walkLeft') {
      hero.changeAnimationTo('standLeft');
    }
    firstLeft = true;
  }
});
s.keyUp('right', () => {
  if (!hero.inTube) {
    if (hero.currentAnimationName === 'walkRight') {
      hero.changeAnimationTo('standRight');
    }
    firstRight = true;
  }
});
let currentBanana = 0;

let stopFire = false;
s.keyUp('space', () => {
  if (!stopFire) {
    let b = bananas[currentBanana];
    b.xPos = hero.xPos;
    b.yPos = hero.yPos + 50;
    b.velX = 10;
    b.velY = s.randomBetween(-2, 2);
    currentBanana <= 8 ? (currentBanana += 1) : (currentBanana = 0);
    stopFire = true;
    setTimeout(() => {
      stopFire = false;
    }, s.randomBetween(600, 800));
  }
});
s.keyUp('up', () => {
  let diff = hero.yPos + hero.height - ground.yPos;
  let diff2 = hero.yPos + hero.height - tube1.yPos;
  let diff3 = hero.yPos + hero.height - tube2.yPos;
  !hero.jumping && diff < 5 && diff > -5 ? hero.jump(150) : hero.jump(150, true);
  !hero.jumping && diff2 < 5 && diff2 > -5 ? hero.jump(150) : hero.jump(150, true);
  !hero.jumping && diff3 < 5 && diff3 > -5 ? hero.jump(150) : hero.jump(150, true);
});
let win = false;
let gameOver = false;
let firstTimeOver = true;
function checkGameOver() {
  if (hearts.repeatX <= 0) {
    gameOver = true;
  }
  if (blackHearts.repeatX <= 0) {
    gameOver = true;
    win = true;
  }
}
const loadingText = new s.Text('black', 'center', 'center', '0% loaded...', 'monospace', 28);
loadingText.opacity = 0;
s.whileLoading(() => {
  r += s.randomBetween(-1, 1);
  g += s.randomBetween(-1, 1);
  b += s.randomBetween(-1, 1);
  loadingText.text = `${s.roundToDecimals(s.percentSoundLoaded, 1)}% loaded...`;
  loadText.color = `rgb(${b},${g},${r})`;
  loadText.innerColor = `rgb(${g},${r},${b})`;
  openBack.width = s.width;
  openBack.height = s.height;
  openBack.color = `rgb(${r},${g},${b})`;
  loadText.size = s.width * 0.05;
  loadText.xPos += s.randomBetween(-3, 3);
  loadText.yPos += s.randomBetween(-3, 3);
  if (opaque.opacity > 0.004) {
    opaque.opacity -= 0.004;
  } else {
    opaque.opacity = 0;
  }
});

s.onClick(() => {
  if (gameOver) {
    location.reload();
  }
});
s.onFirstTime(() => {
  hero.feelGravity();
  tube1.updateSize(2.7);
  tube2.updateSize(2.7);
  fire.updateSize(3.5);
  loadingText.destroy();
});

function game() {
  if (!gameOver) {
    blink();
    inBounds();
    moveGrounds(ground);
    moveGrounds(enemyGround);
    moveTubes(tube1);
    moveTubes(tube2);
    inTube();
    enemyFire();
    removeExplosions();
    checkGameOver();
    fire.xPos = hero.xPos + 35;
    fire.yPos = hero.yPos - 20;
  } else {
    if (firstTimeOver) {
      if (!win) {
        const gameOverScreen = new s.Rectangle('black', 0, 0, s.width, s.height);
        const gameOverText = new s.Text('red', 'center', 'center', 'You died\n😭😭😭😭😭', 'monospace', 34);
        gameOverText.center = true;
        bgm.stop();
        firstTimeOver = false;
        endMusic.play();
      } else {
        const gameOverScreen = new s.Rectangle('yellow', 0, 0, s.width, s.height);
        const gameOverText = new s.Text(
          'black',
          'center',
          'center',
          'YOU WON!!!!\n☺️☺️☺️☺️☺️☺️☺️☺️☺️',
          'monospace',
          34
        );
        gameOverText.center = true;
      }
    }
  }
}

s.loop(game);
