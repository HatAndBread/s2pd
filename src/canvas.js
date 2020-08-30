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

function stillCanvas() {
  s2pd.canvas.style.touchAction = 'none';
}

function backgroundColor(r, g, b, a) {
  if (a || a === 0) {
    s2pd.canvas.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
  } else {
    s2pd.canvas.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
}

function canvasOpacity(opacity) {
  s2pd.canvas.style.opacity = opacity;
}
export { createCanvas, addCanvas, stillCanvas, backgroundColor, canvasOpacity };
