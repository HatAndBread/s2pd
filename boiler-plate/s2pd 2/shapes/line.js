import s2pd from '../core.js';
import Shapes from './shapes.js';
import { pythagorean } from '../methods.js'

/**
 * Line
 * @extends Shapes
 */
class Line extends Shapes {
  /**
   * 
   * @param {string} color - Any valid css color 👉　'rgb(255, 255, 255)' -or- '#ffffff' -or- 'white'.
   * @param {number} startX - Starting x coordinate.
   * @param {number} startY - Starting y coordinate.
   * @param {number} endX - Ending x coordinate.
   * @param {number} endY - Ending y coordinate.
   * @param {number} thickness - Width (stroke weight) of line in pixels. 
   */
  constructor(color, startX, startY, endX, endY, thickness) {
    super(color);
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.clickFunction = null;
    this.color = color;
    this.velX = 0;
    this.velY = 0;
    this.thickness = thickness;
    this.loaded = true;
    this.length = pythagorean(this.startX - this.endX, this.startY - this.endY)
    this.dragStart = { xStart: null, yStart: null, xEnd: null, yEnd: null, lastX: null, lastY: null };
    this.updatePos();
  }
  /**
   * Update position.
   * @method
   */
  updatePos() {
    this.length = pythagorean(this.startX - this.endX, this.startY - this.endY)
    s2pd.ctx.beginPath();
    s2pd.ctx.moveTo(this.startX, this.startY);
    s2pd.ctx.lineTo(this.endX, this.endY);
    s2pd.ctx.lineWidth = this.thickness;
    s2pd.ctx.strokeStyle = this.color;
    s2pd.ctx.stroke();
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }

    this.startX += this.velX;
    this.endX += this.velX;
    this.startY += this.velY;
    this.endY += this.velY;

    if (this.dragging) {
      if (!this.dragStart.xStart) {
        this.dragStart.xStart = this.startX;
        this.dragStart.yStart = this.startY;
        this.dragStart.xEnd = this.endY;
        this.dragStart.yEnd = this.endY;
        if (s2pd.draggingWithMouse) {
          this.dragStart.lastX = s2pd.mouseX;
          this.dragStart.lastY = s2pd.mouseY;
        } else {
          this.dragStart.lastX = s2pd.touchX;
          this.dragStart.lastY = s2pd.touchY;
          console.log(s2pd.touchX)
        }
      } else {
        if (s2pd.draggingWithMouse) {
          this.dragStart.xDiff = s2pd.mouseX - this.dragStart.lastX;
          this.dragStart.yDiff = s2pd.mouseY - this.dragStart.lastY;
          this.startX = this.startX + this.dragStart.xDiff;
          this.startY = this.startY + this.dragStart.yDiff;
          this.endX = this.endX + this.dragStart.xDiff;
          this.endY = this.endY + this.dragStart.yDiff;
          this.dragStart.lastX = s2pd.mouseX;
          this.dragStart.lastY = s2pd.mouseY;
        } else {
          this.dragStart.xDiff = s2pd.touchMoveX - this.dragStart.lastX;
          this.dragStart.yDiff = s2pd.touchMoveY - this.dragStart.lastY;
          this.startX = this.startX + this.dragStart.xDiff;
          this.startY = this.startY + this.dragStart.yDiff;
          this.endX = this.endX + this.dragStart.xDiff;
          this.endY = this.endY + this.dragStart.yDiff;
          this.dragStart.lastX = s2pd.touchMoveX;
          this.dragStart.lastY = s2pd.touchMoveY;
        }
      }
    } else { // not dragging
      this.dragStart.x = null;
      this.dragStart.y = null;
      this.dragStart.xDiff = null;
      this.dragStart.yDiff = null;
    }
  }
  /**
   * Get distance of an object from line.
   * @param {number} x - x position of object
   * @param {number} y - y position of object
   */
  distanceFromMe(x, y) {
    const d1 = pythagorean(x - this.startX, y - this.startY);
    const d2 = pythagorean(x - this.endX, y - this.endY)
    return Math.abs(this.length - (d1 + d2))
  }
  intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var a1, a2, b1, b2, c1, c2;
    var r1, r2, r3, r4;
    var denom, offset, num;
    function sameSign(a, b) {
      return Math.sign(a) == Math.sign(b);
    }
    a1 = y2 - y1;
    b1 = x1 - x2;
    c1 = (x2 * y1) - (x1 * y2);
    r3 = ((a1 * x3) + (b1 * y3) + c1);
    r4 = ((a1 * x4) + (b1 * y4) + c1);

    if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)) {
      return 0;
    }
    a2 = y4 - y3;
    b2 = x3 - x4;
    c2 = (x4 * y3) - (x3 * y4);

    // Compute r1 and r2
    r1 = (a2 * x1) + (b2 * y1) + c2;
    r2 = (a2 * x2) + (b2 * y2) + c2;


    if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))) {
      return 0; //return that they do not intersect
    }

    denom = (a1 * b2) - (a2 * b1);

    if (denom === 0) {
      return 1; //collinear
    }

    // lines_intersect
    return 1; //lines intersect, return true
  }
}

export default Line;
