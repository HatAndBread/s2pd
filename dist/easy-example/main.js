s.ezSetup();
const clouds = new s.Background('./clouds.png');
clouds.velX = -2;
const sprite = new s.Sprite(s.width / 2, s.height / 2, './hero.png', 35, 4);
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
ground.platform(true);
sprite.addAnimation('blinking-right', 8, 3);
sprite.changeAnimationTo('blinking-right');
sprite.addAnimation('blinking-left', 12, 3);
s.keyDown('right', () => {
    sprite.changeAnimationTo('blinking-right');
    sprite.xPos += 2;
})
s.keyDown('left', () => {
    sprite.changeAnimationTo('blinking-left');
    sprite.xPos -= 2;
})
sprite.feelGravity(12);
s.keyUp('space', () => {
    sprite.jump(200, true);
});
const evilCircle = new s.Circle(s.getRandomColor(), -30, s.randomBetween(-10, s.height), s.randomBetween(20, 30))


s.onCollision(evilCircle, sprite, true, () => {
    ground.notPlatform();
    evilCircle.destroy();
});

s.onFirstTime(() => {
    evilCircle.velX = 8;
});

s.loop(function () {
    if (evilCircle.xPos + evilCircle.radius > s.width) {
        evilCircle.color = s.getRandomColor();
        evilCircle.xPos = -30;
        evilCircle.yPos = s.randomBetween(0, s.height);
    }
    if (sprite.yPos > s.height) {
        sprite.destroy();
    }
});