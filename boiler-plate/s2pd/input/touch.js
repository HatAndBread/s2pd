import s2pd from '../core.js';
import { searchArr } from './mouse.js';
import { updateGlobals } from '../index.js'

function handleTouchStart(e) {
  s2pd.draggingWithMouse = false;
  let canvasPos = s2pd.canvas.getBoundingClientRect();
  s2pd.touchX = Math.floor(e.touches[0].clientX - canvasPos.left);
  s2pd.touchY = Math.floor(e.touches[0].clientY - canvasPos.top);
  s2pd.touchMoveX = Math.floor(e.touches[0].clientX - canvasPos.left);
  s2pd.touchMoveY = s2pd.touchY = Math.floor(e.touches[0].clientY - canvasPos.top);
  searchArr(s2pd.holdableObjects, s2pd.touchX, s2pd.touchY, true);
  s2pd.draggingWithMouse = false;
  updateGlobals();
  if (typeof s2pd.globalTouch === 'function') {
    s2pd.globalTouch();
  }
}

export function touchListeners() {
  document.addEventListener(
    'touchstart',
    handleTouchStart,
    false
  );

  document.addEventListener('touchmove', function (e) {
    let canvasPos = s2pd.canvas.getBoundingClientRect();
    s2pd.draggingWithMouse = false;
    s2pd.touchMoveX = e.touches[0].clientX - canvasPos.left;
    s2pd.touchMoveY = e.touches[0].clientY - canvasPos.top;
    updateGlobals();
  });

  document.addEventListener('touchend', function (e) {
    s2pd.heldObject = null;
    s2pd.allGameObjects.forEach((el) => {
      el.dragging = false;
    })
    let canvasPos = s2pd.canvas.getBoundingClientRect();
    s2pd.touchEndX = Math.floor(e.changedTouches[0].clientX - canvasPos.left);
    s2pd.touchEndY = Math.floor(e.changedTouches[0].clientY - canvasPos.top);
    s2pd.touchX = null;
    s2pd.touchY = null;
    s2pd.touchMoveX = null;
    s2pd.touchMoveY = null;
    updateGlobals()
  });
}
