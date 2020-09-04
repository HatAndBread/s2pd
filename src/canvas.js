import s2pd from './core.js';
/**
 * Create a new html5 canvas element.
 * @param {string} id - id of the html5 canvas element
 * @param {number} width - canvas width
 * @param {number} height - canvas height
 */
function createCanvas(id, width, height) {
  s2pd.canvas = document.createElement('canvas');
  s2pd.canvas.id = id;
  s2pd.canvas.width = width;
  s2pd.canvas.height = height;
  document.body.appendChild(s2pd.canvas);
  s2pd.ctx = s2pd.canvas.getContext('2d');
  s2pd.width = width;
  s2pd.height = height;
}
/**
 * Add canvas context to an existing html5 canvas element.
 * @param {string} id - id of an existing html5 canvas element.
 * @param {number} width - canvas width
 * @param {number} height - canvas height
 */
function addCanvas(id, width, height) {
  s2pd.canvas = document.getElementById(id);
  s2pd.canvas.width = width;
  s2pd.canvas.height = height;
  s2pd.ctx = s2pd.canvas.getContext('2d');
  s2pd.width = width;
  s2pd.height = height;
}
/**
 * Prevent canvas from unwanted movement on user interaction. 
 * @param {string=} how - 'touch': Prevent the window from moving on touch input. 'keyboard': Prevent the window from moving on keyboard input(arrow keys). No arguments: Prevent window from moving on all input.
 * @example 
 * s.stillCanvas('touch');
 * // prevent canvas from moving when user touches canvas on a touch device.
 * s.stillCanvas('keyboard');
 * // prevent canvas from moving when user presses keyboard arrows.
 * s.stillCanvas();
 * // prevent canvas from moving on both touch and keyboard input.
 */
function stillCanvas(how) {
  if (!how) {
    s2pd.canvas.style.touchAction = 'none';
    s2pd.preventDefaultKeyboard = true;
  } else {
    how.toLowerCase()
    if (how === 'touch') {
      s2pd.canvas.style.touchAction = 'none';
    } else if (how === 'keyboard') {
      s2pd.preventDefaultKeyboard = true;
    } else {
      s2pd.canvas.style.touchAction = 'none';
      s2pd.preventDefaultKeyboard = true;
    }
  }

}

/**
 * Change background color of canvas.
 * @param {string} color - any valid css color.
 */
function backgroundColor(color) {
  s2pd.canvas.style.backgroundColor = color;
}
/**
 * Change opacity of canvas element.
 * @param {number} opacity - a number from 0 to 1.
 */
function canvasOpacity(opacity) {
  s2pd.canvas.style.opacity = opacity;
}
export { createCanvas, addCanvas, stillCanvas, backgroundColor, canvasOpacity };
