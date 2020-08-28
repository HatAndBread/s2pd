import s2pd from './s2pd.js';

s2pd.createCanvas('UYO', 500, 500);
s2pd.backgroundColor(45, 54, 45, 1);
s2pd.canvasOpacity(1);

const dog = new s2pd.Circle(s2pd.getRandomColor(), 100, 100, 100);
const frank = new s2pd.Ellipse(s2pd.getRandomColor(), 300, 300, 100, 20, 0.3);
const martha = new s2pd.Rectangle(s2pd.getRandomColor(), 400, 400, 50, 50, 4);
const joe = new s2pd.Text(
  s2pd.getRandomColor(),
  100,
  250,
  'asdfkjasdfljladsjf',
  'sans serif',
  32,
  2,
  s2pd.getRandomColor()
);
const bat = new s2pd.Sprite(300, 300, 14, './bat.png', 3, 64, 48);
s2pd.stillCanvas();
bat.addAnimation('flyingRight', 0, 6);
bat.addAnimation('flyingLeft', 6, 6);
bat.addAnimation('deadLeft', 12, 1);
bat.addAnimation('deadRight', 13, 1);
bat.makeDraggable();
martha.makeDraggable();

bat.hitDetect();
martha.hitDetect();
s2pd.clear();
joe.onClick(() => {
  console.log('JOe clicked');
});
document.addEventListener('collision', (e) => {
  if (e.detail.includes(bat) && e.detail.includes(martha)) {
    console.log('martha and bat collieded!');
  }
});
//s2pd.percentLoaded contains loading stuff
s2pd.loop(function () {
  s2pd.keyUp('up', () => {
    console.log('keyadfsf');
  });
  s2pd.keyDown('space', () => {
    dog.jump(10, 3);
  });
});
