s.ezSetup();
const clouds = new s.Background('./clouds.png');
clouds.velX = -2;
const sprite = new s.Sprite(s.width / 2, (s.height / 2) - 100, './hero.png', 35, 4);
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
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
ground.platform(true);
s.keyUp('space', () => {
    sprite.jump(200);
});


s.loop(function () {

});