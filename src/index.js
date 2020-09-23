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
import { enableAudio, Sound, loadAudio } from './audio/audio.js';

let mouseX = s2pd.mouseX;
let mouseY = s2pd.mouseY;
let touchX = s2pd.touchX;
let touchY = s2pd.touchY;
let touchMoveX = s2pd.touchMoveX;
let touchMoveY = s2pd.touchMoveY;
let touchEndX = s2pd.touchEndX;
let touchEndY = s2pd.touchEndY;
let width = s2pd.width;
let height = s2pd.height;
let percentLoaded = 0;
let percentImagesLoaded = 0;
let percentSoundLoaded = 0;

function updateGlobals() {
  mouseX = s2pd.mouseX;
  mouseY = s2pd.mouseY;
  touchX = s2pd.touchX;
  touchY = s2pd.touchY;
  touchMoveX = s2pd.touchMoveX;
  touchMoveY = s2pd.touchMoveY;
  touchEndX = s2pd.touchEndX;
  touchEndY = s2pd.touchEndY;
  width = s2pd.width;
  height = s2pd.height;
  percentLoaded = s2pd.percentLoaded;
  percentImagesLoaded = s2pd.percentImagesLoaded;
  percentSoundLoaded = s2pd.percentSoundLoaded;
}
/**
 *
 * @param {function} callback - a callback to be on any mouse click.
 * @param {boolean} triggerOnce - Truthy value to trigger callback only once time.
 */
const onClick = (callback, triggerOnce) => {
  if (typeof callback === 'function') {
    s2pd.globalClick = callback;
    if (triggerOnce) {
      s2pd.globalClickTriggerOnce = true;
    }
  } else {
    console.error('@onClick 👉 typeerror: onClick requires a callback function.');
  }
};
/**
 *
 * @param {function} callback - a callback to be called on every touch.
 */
const onTouch = (callback) => {
  if (typeof callback === 'function') {
    s2pd.globalTouch = callback;
  } else {
    console.error('@onTouch 👉 typeerror: onTouch requires a callback function.');
  }
};
/**
 * What to do while assets are being loaded.
 * @param {function} callback - a function that will be executed every tick of the loop while assets such as image files and audio files are being loaded.
 */
function whileLoading(callback) {
  s2pd.loadingCallback = callback;
}
/**
 *
 * @param {function} callback - a callback that will be executed the first time and only the first time through the loop after all assets are loaded.
 */
function onFirstTime(callback) {
  s2pd.firstTimeCallback = callback;
}

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
 * prevent drawing during loop.
 */
function cancelDraw() {
  s2pd.cancelDraw = true;
}
/**
 * allow drawing during loop.
 */
function uncancelDraw() {
  s2pd.cancelDraw = false;
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
 * Set up project quickly.
 * Creates canvas element with id 'canvas', sizes to window, automatically resizes on window resize, enables audio, adds listeners for mouse, touch, and keyboard, and prevents unwanted canvas movement on touch and keyboard input.
 * Not recommended for integration with existing projects as it is likely to change the flow of your document in unexpected ways.
 */
function ezSetup() {
  touchListeners();
  mouseListeners();
  keyboardListeners();
  document.body.style.position = 'fixed';
  document.body.style.top = 0;
  document.body.style.left = 0;
  document.body.style.margin = 0;
  document.body.style.padding = 0;
  if (window.innerWidth < 900) {
    createCanvas('canvas', window.innerWidth, window.innerHeight);
    s2pd.sizeToWindow = true;
  } else {
    createCanvas('canvas', 900, 500);
  }
  s2pd.canvas.style.position = 'relative';
  s2pd.canvas.style.left = 0;
  s2pd.canvas.style.userSelect = 'none';
  s2pd.canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  s2pd.canvas.addEventListener('select', (e) => {
    e.preventDefault();
  });
  document.body.style.userSelect = 'none';
  document.body.style.msUserSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.mozUserSelect = 'none';
  document.body.style.webkitTouchCallout = 'none';
  document.body.style.height = window.innerHeight;
  stillCanvas();
}

/**
 * What to do on window resize.
 * @param {function} callback - A callback function to be called when window is resized or orientation is changed.
 */
function onResize(callback) {
  if (typeof callback === 'function') {
    s2pd.onResize = callback;
  } else {
    console.error('👮‍♀️@onResize: Type error. Callback must be a function.');
  }
}

/**
 * Listen for touch events.
 */
function listenForTouch() {
  touchListeners();
}

/**
 * Listen for mouse events.
 */
function listenForMouse() {
  mouseListeners();
}

/**
 * Listen for keyboard events.
 */
function listenForKeyboard() {
  keyboardListeners();
}

console.log('٩(๑^o^๑)۶', 'Welcome to s2pd!ლ(╹◡╹ლ)');
export {
  mouseX,
  mouseY,
  touchX,
  touchY,
  touchEndX,
  touchEndY,
  touchMoveX,
  touchMoveY,
  percentLoaded,
  percentImagesLoaded,
  percentSoundLoaded,
  onClick,
  onTouch,
  onResize,
  updateGlobals,
  resize,
  clear,
  dontClear,
  onCollision,
  loadAudio,
  s2pd,
  ezSetup,
  whileLoading,
  onFirstTime,
  cancelDraw,
  uncancelDraw,
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
