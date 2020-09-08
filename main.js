import s from './s2pd.js'

s.createCanvas('canvas', 1200, 300)
const clouds = new s.Background('./clouds.png');


s.keyDown('left', () => {
  clouds.xPos -= 2
})
s.keyDown('right', () => {
  clouds.xPos += 2
})
s.keyDown('up', () => {
  clouds.yPos -= 2
})
s.keyDown('down', () => {
  clouds.yPos += 2
})

function game() {
}
s.loop(game)


