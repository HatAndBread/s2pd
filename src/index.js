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
/**
 * @returns
 * returns current width of canvas
 */
function width() {
  return s2pd.width;
}
/**
 * @returns
 * returns current height of canvas
 */
function height() {
  return s2pd.height;
}
/**
 * Stop loop.
 */
function stopLoop() {
  s2pd.exit = true;
}
/**
 * Resize canvas
 * @param {number} width - new canvas width.
 * @param {number} height - new canvas height.
 */
function resize(width, height) {
  s2pd.canvas.width = width;
  s2pd.canvas.height = height;
  s2pd.width = width;
  s2pd.height = height;
}
/**
 * Sets up project quickly.
 * Creates canvas element with id canvas, enables audio, and prevents unwanted canvas movement on touch and keyboard input.
 */
function ezSetup() {
  enableAudio();
  console.log('Ignore audio context warning☝️', 'Audio context will automatically resume after user interaction (mouse click etc). ', 'In production it is best practice to enable audio context and load all audio files after that. For more info see 👉 https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices', '♬(ノ゜∇゜)ノ♩ ')
  createCanvas('canvas', 800, 600);
  stillCanvas();
}
/**
 * @returns
 * returns what percent of sprites and audio files have been loaded.
 * @example
 * s.loop(function(){
 *   if (s.loaded()<100){
 *     //loading screen
 *   }else{
 *     //do some cool stuff
 *   }
 * })
 */
function loaded() {
  return s2pd.percentLoaded;
}
touchListeners();
mouseListeners();
keyboardListeners();



console.log('٩(๑^o^๑)۶', 'Welcome to s2pd!ლ(╹◡╹ლ)');
export {
  resize,
  clear,
  dontClear,
  onCollision,
  loaded,
  s2pd,
  ezSetup,
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
