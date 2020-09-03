import s2pd from './s2pd.js'
window.s2pd = s2pd; // make methods available in console
s2pd.enableAudio()

s2pd.createCanvas('UYO', 1200, 500);
s2pd.stillCanvas();
s2pd.backgroundColor(45, 54, 45, 1);
s2pd.canvasOpacity(1);

const bgm = new s2pd.Sound('./bgm.mp3', 0.5, 'YES')
bgm.load();



const mary = new s2pd.Tile('./heart.png', 560, 400, 90, 90);
mary.onHold(() => {
  console.log('HEEEEY')
  mary.drag()
})
mary.platform(true)


const start = new s2pd.Text(s2pd.getRandomColor(), 400, 400, 'START', 'sans-serif', 48, 3)
start.onClick(() => {
  if (start.text === 'START') {
    bgm.play();
    start.text = 'pause';
  } else {
    bgm.pause();
    start.text = "START"
  }
})

window.mary = mary;


const clouds = new s2pd.Background('./hero.png', 35, 3);

s2pd.keyDown('left', () => {
  mary.innerX -= 1;
  bat.xPos -= 3;
}, false)
s2pd.keyDown('right', () => {
  mary.innerX += 1;
  bat.xPos += 3;
}, false)
s2pd.keyDown('up', () => {
  mary.innerY -= 1;
}, false)
s2pd.keyDown('down', () => {
  mary.innerY += 1;
}, false)

const martha = new s2pd.Rectangle(s2pd.getRandomColor(), 400, 400, 50, 20, 4);
martha.onHold(() => {
  martha.drag()
})
const bat = new s2pd.Sprite(600, 100, './bat.png', 14, 3);
const slim = new s2pd.Line('red', 10, 10, 500, 500, 20)
const jane = new s2pd.Line('green', 400, 200, 650, 500, 20)
const dog = new s2pd.Circle(s2pd.getRandomColor(), 100, 100, 100);



window.slim = slim
slim.onHold(() => { slim.drag() })
jane.onHold(() => {
  jane.drag()
})
s2pd.onCollision(slim, jane, false, () => {
  console.log('slim and jane collidin')
})
s2pd.keyUp('a', () => {
  slim.jump(300, 10)
})
dog.onHold(() => {
  dog.drag()
})
window.martha = martha
//const frank = new s2pd.Ellipse(s2pd.getRandomColor(), 300, 300, 100, 20, 0.3);
bat.onHold(() => {
  bat.drag()
})
dog.onClick(() => { console.log('shapes work') })

window.bat = bat;
const joe = new s2pd.Text(
  s2pd.getRandomColor(),
  100,
  250,
  `I'm a stupid monkey.\nWhat are you?\nChicken 🐔`,
  'sans-serif', 40
);


s2pd.onCollision(slim, mary, true, () => {
  console.log('Mary and Slim Colliding!')
})

s2pd.onCollision(martha, mary, true, () => {
  console.log('PIG')
})
s2pd.onCollision(mary, bat, false, () => {

})
s2pd.onCollision(bat, martha, true, () => {
  console.log('PINPON')
})

joe.leading = 1.1
joe.center = true;


bat.addAnimation('stupid', 0, 6)
bat.changeAnimationTo('stupid')




s2pd.clear();

joe.onHold(() => {
  joe.drag()
});
const ground = new s2pd.Tile('./ground.png', 0, 450, 1000, 30)
ground.platform()

//s2pd.percentLoaded contains loading stuff
bat.feelGravity(8);

s2pd.keyUp('space', () => {
  bat.jump(200)
  console.log(bat.accelerationRate)
});
s2pd.keyDown('comma', () => { joe.text = `Penguin\n🐧\nI like donuts\n🍩` }, true)
s2pd.keyUp(',', () => { joe.text = `I'm a stupid monkey.\nWhat are you?\nChicken 🐔` })
s2pd.keyDown('periOd', () => { joe.center = false })
s2pd.keyUp('.', () => { joe.center = true })

s2pd.keyDown('g', () => { console.log('🐧') })
s2pd.loop(function () {

});

