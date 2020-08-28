import s2pd from './core.js';
import loop from './loop.js';
import { createCanvas, addCanvas, stillCanvas, backgroundColor, canvasOpacity } from './canvas.js';
import { randomNumSetNoRepeat, getRandomColor, randomBetween, roundToDecimals, choose } from './methods.js';
import Sprite from './sprite.js';
import Circle from './shapes/circle.js';
import Ellipse from './shapes/ellipse.js';
import Rectangle from './shapes/rectangle.js';
import Line from './shapes/line.js';
import Text from './text.js';
import Background from './background.js';
import { mouseListeners, mouseClick, mouseUp, mouseDown, mouseMove } from './input/mouse.js';
import { touchListeners } from './input/touch.js';
import { keyboardListeners, keyDown, keyUp } from './input/keyboard.js';
import { enableAudio, Sound, Synth } from './audio/audio.js';
function clear() {
  s2pd.clear = true;
}
function dontClear() {
  s2pd.clear = false;
}

touchListeners();
mouseListeners();
keyboardListeners();

export {
  clear,
  dontClear,
  s2pd,
  loop,
  createCanvas,
  addCanvas,
  stillCanvas,
  backgroundColor,
  canvasOpacity,
  randomNumSetNoRepeat,
  getRandomColor,
  randomBetween,
  roundToDecimals,
  choose,
  Sprite,
  Circle,
  Ellipse,
  Rectangle,
  Line,
  Text,
  Background,
  keyDown,
  keyUp,
  enableAudio,
  Sound,
  Synth
};

/*

console.log(Line);

createCanvas('UYO', 500, 500);
backgroundColor(45, 54, 45, 1);
canvasOpacity(1);

const dog = new Circle(getRandomColor(), 100, 100, 100);
const frank = new Ellipse(getRandomColor(), 300, 300, 100, 20, 0.3);
const martha = new Rectangle(getRandomColor(), 400, 400, 50, 50, 4);
const joe = new Text(getRandomColor(), 100, 250, 'asdfkjasdfljladsjf', 'sans serif', 32, 2, getRandomColor());
const bat = new Sprite(300, 300, 14, './bat.png', 3, 64, 48);
stillCanvas();
bat.addAnimation('flyingRight', 0, 6);
bat.addAnimation('flyingLeft', 6, 6);
bat.addAnimation('deadLeft', 12, 1);
bat.addAnimation('deadRight', 13, 1);
bat.makeDraggable();
martha.makeDraggable();

bat.hitDetect();
martha.hitDetect();
clear();
joe.onClick(() => {
  console.log('JOe clicked');
});
document.addEventListener('collision', (e) => {
  if (e.detail.includes(bat) && e.detail.includes(martha)) {
    console.log('martha and bat collieded!');
  }
});
//s2pd.percentLoaded contains loading stuff
loop(function () {
  keyUp('up', () => {
    console.log('keyadfsf');
  });
  keyDown('space', () => {
    dog.jump(10, 3);
  });
});

console.log(dog);

*/
