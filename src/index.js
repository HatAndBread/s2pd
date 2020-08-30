import s2pd from './core.js';
import loop from './loop.js';
import { createCanvas, addCanvas, stillCanvas, backgroundColor, canvasOpacity } from './canvas.js';
import { RandomNumSetNoRepeat, getRandomColor, randomBetween, roundToDecimals, choose } from './methods.js';
import Sprite from './sprite.js';
import { Circle } from './shapes/circle.js';
import Ellipse from './shapes/ellipse.js';
import Rectangle from './shapes/rectangle.js';
import Line from './shapes/line.js';
import Text from './text.js';
import Background from './background.js';
import { mouseListeners } from './input/mouse.js';
import { touchListeners } from './input/touch.js';
import { keyboardListeners, keyDown, keyUp } from './input/keyboard.js';
import { enableAudio, Sound } from './audio/audio.js';
/**
 * clear the canvas
 * @function
 */
function clear() {
  s2pd.clear = true;
}
/**
 * prevent canvas from clearing
 * @function
 */
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
  RandomNumSetNoRepeat,
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
  Sound
};
