import s2pd from './s2pd.js'
s2pd.enableAudio()

s2pd.createCanvas('UYO', 500, 500);
s2pd.stillCanvas();
s2pd.backgroundColor(45, 54, 45, 1);
s2pd.canvasOpacity(1);


const bgm = new s2pd.Sound('./bgm.mp3', .5, 1, true, 762)
bgm.load();
s2pd.keyUp('p', () => {
  bgm.stop()
})
s2pd.keyUp('o', () => {
  bgm.play()
})
const clouds = new s2pd.Background('./hero.png', 35, 4);
clouds.addAnimation('standing', 0, 4);
clouds.changeAnimationTo('standing');
s2pd.keyDown('left', () => {
  clouds.xPos -= 10;
})
s2pd.keyDown('right', () => {
  clouds.xPos += 10;
})
s2pd.keyDown('up', () => {
  clouds.yPos -= 10;
})
s2pd.keyDown('down', () => {
  clouds.yPos += 10;
})

const slim = new s2pd.Line('red', 10, 10, 500, 500, 20)
const dog = new s2pd.Circle(s2pd.getRandomColor(), 100, 100, 100);
const frank = new s2pd.Ellipse(s2pd.getRandomColor(), 300, 300, 100, 20, 0.3);
const martha = new s2pd.Rectangle(s2pd.getRandomColor(), 400, 400, 50, 50, 4);
const joe = new s2pd.Text(
  s2pd.getRandomColor(),
  100,
  250,
  `I'm a stupid monkey.\nWhat are you?\nChicken 🐔`,
  'sans-serif', 40
);
joe.leading = 1.1
joe.center = true;
joe.makeDraggable()
const bat = new s2pd.Sprite(300, 300, './bat.png', 14, 3);
bat.addAnimation('stupid', 0, 6)
bat.changeAnimationTo('stupid')
bat.makeDraggable();
bat.hitDetect();


martha.makeDraggable();

martha.hitDetect();
s2pd.clear();

joe.onClick(() => {
  bgm.play()
});
document.addEventListener('collision', (e) => {
  if (e.detail.includes(bat) && e.detail.includes(martha)) {
    console.log('martha and bat collieded!');
  }
});
//s2pd.percentLoaded contains loading stuff

s2pd.keyUp('space', () => {
  console.log(joe.words)
  console.log(joe.letters)
  console.log(joe.lineBreaks)
  console.log(joe.longestLine)
  console.log(joe.longestLineLength)
});
s2pd.keyDown('comma', () => { joe.text = `Penguin\n🐧\nI like donuts\n🍩` })
s2pd.keyUp(',', () => { joe.text = `I'm a stupid monkey.\nWhat are you?\nChicken 🐔` })
s2pd.keyDown('periOd', () => { joe.center = false })
s2pd.keyUp('.', () => { joe.center = true })


s2pd.loop(function () {

});
