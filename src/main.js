import s from './s2pd.js'
window.s = s; // make methods available in console

s.ezSetup();


const bgm = new s.Sound('./bgm.mp3', 0.5, true)
bgm.load();


const terry = new s.Ellipse(s.getRandomColor(), 500, 300, 140, 50)
terry.onHold(() => {
  terry.drag()
})
terry.platform(true)



const mary = new s.Tile('./heart.png', 560, 400, 3, 3);
mary.onHold(() => {
  console.log('HEEEEY')
  mary.drag()
})
mary.platform(true)


const start = new s.Text(s.getRandomColor(), 400, 400, 'START', 'sans-serif', 48, 3)
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


const clouds = new s.Background('./hero.png', 35, 3);

s.keyDown('left', () => {
  mary.innerX -= 1;
  bat.xPos -= 3;
}, false)
s.keyDown('right', () => {
  mary.innerX += 1;
  bat.xPos += 3;
}, false)
s.keyDown('up', () => {
  mary.innerY -= 1;
}, false)
s.keyDown('down', () => {
  mary.innerY += 1;
}, false)

const martha = new s.Rectangle(s.getRandomColor(), 400, 400, 50, 20, 4);
martha.onHold(() => {
  martha.drag()
})
martha.platform(true);
const bat = new s.Sprite(600, 100, './bat.png', 14, 3);
const slim = new s.Line('red', 10, 10, 500, 500, 20)
const jane = new s.Line('green', 400, 200, 650, 500, 20)
const dog = new s.Circle(s.getRandomColor(), 100, 100, 100);


window.slim = slim
slim.onHold(() => { slim.drag() })
jane.onHold(() => {
  jane.drag()
})
s.onCollision(slim, jane, false, () => {
  console.log('slim and jane collidin')
})
s.keyUp('a', () => {
  slim.jump(300, 10)
})
dog.onHold(() => {
  dog.drag()
})
window.martha = martha

bat.onHold(() => {
  bat.drag()
})




bat.onClick(() => {
  bat.destroy()
  console.log(bat)
})
const joe = new s.Text(
  s.getRandomColor(),
  100,
  250,
  `I'm a stupid monkey.\nWhat are you?\nChicken 🐔`,
  'sans-serif', 40
);


s.onCollision(slim, mary, true, () => {
  console.log('Mary and Slim Colliding!')
})

s.onCollision(martha, mary, true, () => {
  console.log('PIG')
})
s.onCollision(mary, bat, false, () => {

})
s.onCollision(bat, martha, true, () => {
  console.log('PINPON')
})

joe.leading = 1.1
joe.center = true;


bat.addAnimation('stupid', 0, 6)
bat.changeAnimationTo('stupid')




s.clear();

joe.onHold(() => {
  joe.drag()
});
const ground = new s.Tile('./fire.png', 100, 400, 5, 5, 8, 7)

ground.platform(true)


bat.feelGravity(8);

s.keyUp('space', () => {
  bat.jump(200)
  console.log(bat.accelerationRate)
});
s.keyDown('comma', () => { joe.text = `Penguin\n🐧\nI like donuts\n🍩` }, true)
s.keyUp(',', () => { joe.text = `I'm a stupid monkey.\nWhat are you?\nChicken 🐔` })
s.keyDown('periOd', () => { joe.center = false })
s.keyUp('.', () => { joe.center = true })


s.keyDown('g', () => { console.log('🐧') })
const fruits = ['🍉', '🍊', '🍈', '🍇', '🍌', '🍎']
const fruitsRan = new s.RandomNoRepeat(fruits)
window.fruitsRan = fruitsRan
s.loop(function () {
  if (s.loaded() < 100) {
    console.log('Loading...')
  } else {
  }
});



