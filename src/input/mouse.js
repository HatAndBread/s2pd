import s2pd from '../core.js';
import { updateGlobals } from '../index.js'

export function mouseMove(event) {

  let canvasPos = s2pd.canvas.getBoundingClientRect();
  s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
  s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
  updateGlobals()

}

export function isLine(obj) {
  if (obj.distanceFromMe) {
    let d;
    if (!s2pd.touchX) {
      d = obj.distanceFromMe(s2pd.mouseX, s2pd.mouseY)
    } else {
      d = obj.distanceFromMe(s2pd.touchX, s2pd.touchY)
    }
    if (d < obj.thickness * 0.1) return true
  }
}

export function searchArr(arr, x, y, options) {
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i]
    const execute = () => {
      if (!a.clickFunction && options) {
        s2pd.heldObject = a;
      } else {
        if (a.clickFunction) { a.clickFunction() }
      }
    }
    if (isLine(a)) {
      execute();
    } else if (
      x >= a.hitBoxX &&
      y >= a.hitBoxY &&
      x <= a.hitBoxX + a.hitBoxWidth &&
      y <= a.hitBoxY + a.hitBoxHeight
    ) {
      execute();
    }
  }
}

export function mouseDown(event) {
  s2pd.draggingWithMouse = true;
  updateGlobals();
  searchArr(s2pd.holdableObjects, s2pd.mouseX, s2pd.mouseY, true)
}

export function mouseUp() {
  s2pd.heldObject = null;
  updateGlobals();
  s2pd.allGameObjects.forEach((el) => {
    el.dragging = false;
  })
}

export function mouseClick(event) {
  let canvasPos = s2pd.canvas.getBoundingClientRect();
  s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
  s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
  s2pd.heldObject = null;
  updateGlobals();
  if (typeof s2pd.globalClick === 'function') {
    s2pd.globalClick();
  }
  s2pd.allGameObjects.forEach((el) => {
    el.dragging = false;
  })
  searchArr(s2pd.allGameObjects, s2pd.mouseX, s2pd.mouseY)
}

export function mouseListeners() {
  document.addEventListener('click', function (event) {
    mouseClick(event);
  });
  document.addEventListener('mousemove', function (event) {
    mouseMove(event);
  });
  document.addEventListener('mousedown', function (event) {
    mouseDown(event);
  });
  document.addEventListener('mouseup', function () {
    mouseUp();
  });
  document.addEventListener('pointerdown', function () {
    mouseDown(event);
  }); // chrome doesn't use mousedown. must you pointerdown
}
