import s2pd from '../core.js';
import Shapes from './shapes.js';

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
    this.xPos = startX;
    this.yPos = startY;
    this.clickFunction = null;
    this.color = color;
    this.velX = 0;
    this.velY = 0;
    this.thickness = thickness;
    this.loaded = true;
    s2pd.finalize(this);
    this.updatePos();
  }
  /**
   * Update position.
   * @method
   */
  updatePos() {
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
  }
}

export default Line;
