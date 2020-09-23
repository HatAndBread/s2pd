import s from './s2pd.js';

const myCanvas = document.getElementById('myCanvas');

s.listenForKeyboard();
s.listenForMouse();
s.listenForTouch();
s.addCanvas(myCanvas, 600, 900);

const circ = new s.Circle('red', 30, 30, 30, 3);
circ.onClick(() => {
  console.log('Happy');
});
