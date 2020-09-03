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
    //this.timeStamp = Date.now();
    //s2pd.finalize(this);
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
    s2pd.hitDetectObjects.push(this);
    this.hitBoxId = s2pd.hitDetectObjects.length;
  }

  /**
   * @param {function} callback - What to do when object is clicked.
   */
  onClick(callback) {
    this.clickFunction = callback;
  }
  onHold(callback) {
    this.holdFunction = callback;
    if (!s2pd.holdableObjects.includes(this)) {
      s2pd.holdableObjects.push(this)
    }
  }


  drag() {
    this.dragging = true;
  }
}
export default Shapes;
