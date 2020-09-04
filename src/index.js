import s2pd from './core.js';
import loop from './loop.js';
import { createCanvas, addCanvas, stillCanvas, backgroundColor, canvasOpacity } from './canvas.js';
import { RandomNoRepeat, getRandomColor, randomBetween, roundToDecimals, choose, onCollision } from './methods.js';
import Sprite from './sprite.js';
import Circle from './shapes/circle.js';
import Ellipse from './shapes/ellipse.js';
import Rectangle from './shapes/rectangle.js';
import Line from './shapes/line.js';
import Text from './text.js';
import Background from './background.js';
import Tile from './tile.js';
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
function width() {
  return s2pd.width;
}
function height() {
  return s2pd.height;
}
function stopLoop() {
  s2pd.exit = true;
}
touchListeners();
mouseListeners();
keyboardListeners();

console.log('٩(๑^o^๑)۶', 'Welcome to s2pd!ლ(╹◡╹ლ)')
export {
  clear,
  dontClear,
  onCollision,
  s2pd,
  loop,
  createCanvas,
  stopLoop,
  addCanvas,
  stillCanvas,
  backgroundColor,
  canvasOpacity,
  RandomNoRepeat,
  getRandomColor,
  randomBetween,
  roundToDecimals,
  choose,
  width,
  height,
  Sprite,
  Circle,
  Ellipse,
  Rectangle,
  Line,
  Text,
  Background,
  Tile,
  keyDown,
  keyUp,
  enableAudio,
  Sound
};
