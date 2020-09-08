import s from './s2pd.js'

s.createCanvas('canvas', 700, 200);
s.backgroundColor(s.getRandomColor())
const ground = new s.Tile('./ground.png', 100, 100, 1, 1)


s.keyDown('left', () => {
  ground.innerX -= 2
})
s.keyDown('right', () => {
  ground.innerX += 2
})
s.keyDown('up', () => {
  ground.innerY -= 2
})
s.keyDown('down', () => {
  ground.innerY += 2
})

function game() {
}
s.loop(game)


