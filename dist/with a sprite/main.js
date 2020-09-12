
s.ezSetup();
const clouds = new s.Background('./clouds.png');
clouds.velX = -2;
const sprite = new s.Sprite(s.width / 2, s.height / 2, './hero.png', 35, 4);
sprite.addAnimation('blinking-right', 7, 4);
sprite.changeAnimationTo('blinking-right');
sprite.addAnimation('blinking-left', 11, 4);
s.keyDown('right', () => {
    sprite.changeAnimationTo('blinking-right');
    sprite.xPos += 2; // will increase sprite's position on x axis by 2 pixels
})
s.keyDown('left', () => {
    sprite.changeAnimationTo('blinking-left');
    sprite.xPos -= 2;
})
s.loop(function () { })