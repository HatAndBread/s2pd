import s2pd from './core.js';

export default class Shapes {
  constructor(color, xPos, yPos) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.velX = 0;
    this.velY = 0;
    this.opacity = 1;
    this.timeStamp = Date.now();
    s2pd.finalize(this);
  }
  jump(howMuch, howLong) {
    this.jumpHeight = howMuch;
    this.jumpLength = howLong;
    this.jumpFrames = 0;
    this.jumping = true;
  }
  hitDetect() {
    this.detectHit = true;
    this.hitBoxId = s2pd.hitDetectObjects.length;
    s2pd.hitDetectObjects.push(this);
  }
  makeClickable() {
    this.clickable = true;
    this.draggable = false;
    this.clickableId = s2pd.clickableObjects.length;
    s2pd.clickableObjects.push(this);
  }
  onClick(callback) {
    this.makeClickable();
    this.clickFunction = callback;
    this.clicked = false;
  }
  makeDraggable() {
    this.draggable = true;
    this.clickable = false;
    this.draggableId = s2pd.draggableObjects.length;
    s2pd.draggableObjects.push(this);
  }
  makeHoldable() {
    this.holdable = true;
    this.clickable = false;
    this.draggable = false;
    this.holdableId = s2pd.holdableObjects.length;
    s2pd.holdableObjects.push(this);
  }
}
