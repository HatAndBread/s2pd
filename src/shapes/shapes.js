import s2pd from '../core.js';

class Shapes {
  /**
   * @param {string} color
   * @param {number} xPos
   * @param {number} yPos
   */
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
  /**
   * Make object jump.
   * @param {number} howMuch - how many pixels to jump
   * @param {number} howLong  - how many ticks the jump will last
   */
  jump(howMuch, howLong) {
    this.jumpHeight = howMuch;
    this.jumpLength = howLong;
    this.jumpFrames = 0;
    this.jumping = true;
  }
  /**
   * Detect collision with other elements.
   */
  hitDetect() {
    this.detectHit = true;
    this.hitBoxId = s2pd.hitDetectObjects.length;
    s2pd.hitDetectObjects.push(this);
  }
  /**
   * Detect mouse clicks on object.
   */
  makeClickable() {
    this.clickable = true;
    this.draggable = false;
    this.clickableId = s2pd.clickableObjects.length;
    s2pd.clickableObjects.push(this);
  }
  /**
   * @param {function} callback - What to do when object is clicked.
   */
  onClick(callback) {
    this.makeClickable();
    this.clickFunction = callback;
    this.clicked = false;
  }
  /**
   * make object draggable
   */
  makeDraggable() {
    this.draggable = true;
    this.clickable = false;
    this.draggableId = s2pd.draggableObjects.length;
    s2pd.draggableObjects.push(this);
  }
  /**
   * detect if object is being touched continually or if the mouse is being held down over object.
   * @method
   */
  makeHoldable() {
    this.holdable = true;
    this.clickable = false;
    this.draggable = false;
    this.holdableId = s2pd.holdableObjects.length;
    s2pd.holdableObjects.push(this);
  }
}
export default Shapes;
