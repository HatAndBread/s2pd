import s2pd from '../core.js';
import Shapes from './shapes.js';

/**
 * Rectangle
 * @extends Shapes
 */
export default class Rectangle extends Shapes {
  /**
   * 
   * @param {string} color - Any valid css color 👉　'rgb(255, 255, 255)' -or- '#ffffff' -or- 'white'
   * @param {number} xPos - x coordinate
   * @param {number} yPos - y coordinate
   * @param {number} width 
   * @param {number} height
   * @param {number=} thickness - Optional! If present will draw outline of rectangle. Thickness is line width in pixels.
   */
  constructor(color, xPos, yPos, width, height, thickness) {
    super(color, xPos, yPos);
    this.width = width;
    this.height = height;
    this.velX = 0;
    this.velY = 0;
    this.thickness = thickness;
    this.opacity = 1;
    this.hitBoxX = this.xPos;
    this.hitBoxY = this.yPos;
    this.hitBoxWidth = this.width;
    this.hitBoxHeight = this.height;
    this.loaded = true;
    this.timeStamp = Date.now();
    s2pd.finalize(this)
    this.updatePos();
  }
  updatePos() {
    this.hitBoxX = this.xPos;
    this.hitBoxY = this.yPos;
    this.hitBoxWidth = this.width;
    this.hitBoxHeight = this.height;


    if (typeof this.thickness === 'number') {
      s2pd.ctx.globalAlpha = this.opacity;
      s2pd.ctx.strokeStyle = this.color;
      s2pd.ctx.lineWidth = this.thickness;
      s2pd.ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
      s2pd.ctx.globalAlpha = 1;
    } else {
      s2pd.ctx.globalAlpha = this.opacity;
      s2pd.ctx.fillStyle = this.color;
      s2pd.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
      s2pd.ctx.globalAlpha = 1;
    }
    if (this.dragging === true) {
      if (s2pd.draggingWithMouse) {
        this.xPos = s2pd.mouseX - this.width / 2;
        this.yPos = s2pd.mouseY - this.height / 2;
      } else {
        this.xPos = s2pd.touchMoveX - this.width / 2;
        this.yPos = s2pd.touchMoveY - this.height / 2;
      }
    } else {
      this.xPos += this.velX;
      this.yPos += this.velY;
      if (this.detectHit) {
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;

      }
    }
  }
}
