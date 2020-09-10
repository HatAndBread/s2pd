import s from './s2pd.js'

s.ezSetup();
s.backgroundColor(s.getRandomColor())

const notJoe = new s.Circle('red', 200, 300, 200)
const joe = new s.Sprite(120, 100, './hero.png', 35, 2);
joe.feelGravity(12);
const ground = new s.Tile('./ground.png', 100, s.height - 100, 1, 1);
ground.platform(true);



s.keyDown('left', () => {
  ground.innerX -= 2
  joe.xPos -= 2;
})
s.keyDown('right', () => {
  ground.innerX += 2
  joe.xPos += 2;
})
s.keyDown('up', () => {
  ground.innerY -= 2
})
s.keyDown('down', () => {
  ground.innerY += 2
})
s.keyUp('space', () => {
  joe.jump(200);
})

function game() {
}
s.loop(game);


