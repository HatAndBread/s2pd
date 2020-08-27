import s2pd from '../core.js';

export function touchListeners() {
  document.addEventListener(
    'touchstart',
    function (e) {
      s2pd.touching = true;
      s2pd.touchScreen = true;
      // Cache the client X/Y coordinates
      let canvasPos = s2pd.canvas.getBoundingClientRect();
      s2pd.touchX = Math.floor(e.touches[0].clientX - canvasPos.left);
      s2pd.touchY = Math.floor(e.touches[0].clientY - canvasPos.top);
      s2pd.touchMoveX = Math.floor(e.touches[0].clientX - canvasPos.left);
      s2pd.touchMoveY = s2pd.touchY = Math.floor(e.touches[0].clientY - canvasPos.top);
      if (s2pd.enableDragAndDrop === true) {
        let clickedObject;
        let draggableOrNot = false;
        s2pd.dragStarted = true;
        for (let i = 0; i < s2pd.draggableObjects.length; i++) {
          if (
            s2pd.touchX >= s2pd.draggableObjects[i].hitBoxX &&
            s2pd.touchY >= s2pd.draggableObjects[i].hitBoxY &&
            s2pd.touchX <= s2pd.draggableObjects[i].hitBoxX + s2pd.draggableObjects[i].hitBoxWidth &&
            s2pd.touchY <= s2pd.draggableObjects[i].hitBoxY + s2pd.draggableObjects[i].hitBoxHeight
          ) {
            s2pd.draggingWithMouse = false;
            draggableOrNot = true;
            if (draggableOrNot) {
              clickedObject = s2pd.draggableObjects[i];
              clickedObject.dragging = true;
            }
          }
        }
      }
    },
    false
  );

  document.addEventListener('touchmove', function (e) {
    let canvasPos = s2pd.canvas.getBoundingClientRect();
    s2pd.touchMoveX = e.touches[0].clientX - canvasPos.left;
    s2pd.touchMoveY = e.touches[0].clientY - canvasPos.top;
  });

  document.addEventListener('touchend', function (e) {
    let canvasPos = s2pd.canvas.getBoundingClientRect();
    s2pd.touchEndX = Math.floor(e.changedTouches[0].clientX - canvasPos.left);
    s2pd.touchEndY = Math.floor(e.changedTouches[0].clientY - canvasPos.top);
    s2pd.touchX = null;
    s2pd.touchY = null;
    s2pd.touchMoveX = null;
    s2pd.touchMoveY = null;
    for (let i = 0; i < s2pd.draggableObjects.length; i++) {
      s2pd.draggableObjects[i].dragging = false;
      s2pd.dragStarted = false;
    }
    s2pd.touching = false;
  });
}
