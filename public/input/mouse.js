import s2pd from '../core.js';

export function mouseMove(event) {
  if (s2pd.dragStarted) {
    let canvasPos = s2pd.canvas.getBoundingClientRect();
    s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
    s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
  }
}

export function mouseDown(event) {
  if (s2pd.enableDragAndDrop) {
    let clickedObject;
    let draggableOrNot = false;
    let canvasPos = s2pd.canvas.getBoundingClientRect();
    s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
    s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
    for (let i = 0; i < s2pd.draggableObjects.length; i++) {
      if (
        s2pd.mouseX >= s2pd.draggableObjects[i].hitBoxX &&
        s2pd.mouseY >= s2pd.draggableObjects[i].hitBoxY &&
        s2pd.mouseX <= s2pd.draggableObjects[i].hitBoxX + s2pd.draggableObjects[i].hitBoxWidth &&
        s2pd.mouseY <= s2pd.draggableObjects[i].hitBoxY + s2pd.draggableObjects[i].hitBoxHeight
      ) {
        s2pd.dragStarted = true;
        draggableOrNot = true;
        s2pd.draggingWithMouse = true;

        if (draggableOrNot) {
          clickedObject = s2pd.draggableObjects[i];
          console.log(clickedObject);
          clickedObject.dragging = true;
        }
      }
    }
    for (let i = 0; i < s2pd.holdableObjects.length; i++) {
      if (
        s2pd.mouseX >= s2pd.holdableObjects[i].hitBoxX &&
        s2pd.mouseY >= s2pd.holdableObjects[i].hitBoxY &&
        s2pd.mouseX <= s2pd.holdableObjects[i].hitBoxX + s2pd.holdableObjects[i].hitBoxWidth &&
        s2pd.mouseY <= s2pd.holdableObjects[i].hitBoxY + s2pd.holdableObjects[i].hitBoxHeight
      ) {
        s2pd.holdStarted = true;
        clickedObject = s2pd.holdableObjects[i];
        clickedObject.holdDown = true;
      }
    }
  }
}

export function mouseUp() {
  if (s2pd.dragStarted) {
    s2pd.dragStarted = false;
    for (let i = 0; i < s2pd.draggableObjects.length; i++) {
      s2pd.draggableObjects[i].dragging = false;
    }
  }
  if (s2pd.holdStarted) {
    for (let i = 0; i < s2pd.holdableObjects.length; i++) {
      if (s2pd.holdableObjects[i].holdDown) {
        s2pd.holdableObjects[i].finishedHolding = true;
        s2pd.holdableObjects[i].holdDown = false;
      }
    }
    s2pd.holdStarted = false;
  }
}

export function mouseClick(event) {
  let clickedObject;
  let canvasPos = s2pd.canvas.getBoundingClientRect();
  s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
  s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
  console.log(`${s2pd.mouseX} ${s2pd.mouseY}`);
  for (let i = 0; i < s2pd.clickableObjects.length; i++) {
    if (
      s2pd.mouseX >= s2pd.clickableObjects[i].hitBoxX &&
      s2pd.mouseY >= s2pd.clickableObjects[i].hitBoxY &&
      s2pd.mouseX <= s2pd.clickableObjects[i].hitBoxX + s2pd.clickableObjects[i].hitBoxWidth &&
      s2pd.mouseY <= s2pd.clickableObjects[i].hitBoxY + s2pd.clickableObjects[i].hitBoxHeight
    ) {
      clickedObject = s2pd.clickableObjects[i];
      clickedObject.clicked = true;
      if (clickedObject.clickFunction) {
        clickedObject.clickFunction();
      }
    }
  }
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
