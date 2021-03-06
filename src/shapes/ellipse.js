import s2pd from '../core.js';
import Shapes from './shapes.js';

/**
 * Ellipse
 * @extends Shapes
 */
class Ellipse extends Shapes {
  /**
   * 
   * @param {string} color - Any valid css color 👉　'rgb(255, 255, 255)' -or- '#ffffff' -or- 'white'.
   * @param {number} xPos - x coordinate
   * @param {number} yPos - y coordinate
   * @param {number} radiusX -radius along the x axis
   * @param {number} radiusY - radius along the y axis
   * @param {number} rotation - rotation of ellipse
   * @param {number=} thickness - Optional! If present will draw outline of ellipse. Thickness is line width in pixels.
   */
  constructor(color, xPos, yPos, radiusX, radiusY, rotation, thickness) {
    super(color, xPos, yPos);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    !rotation ? this.rotation = 0 : this.rotation = rotation;
    this.velX = 0;
    this.velY = 0;
    this.opacity = 1;
    this.thickness = thickness;
    this.loaded = true;
    this.timeStamp = Date.now();
    this.updatePos();
  }
  /**
  * Update position.
  * @method
  */
  updatePos() {
    if (this.rotation >= Math.PI * 2) {
      this.rotation = this.rotation % Math.PI;
    }
    if (
      (this.rotation > Math.PI * 0.25 && this.rotation < Math.PI * 0.75) ||
      (this.rotation > Math.PI * 1.25 && this.rotation < Math.PI * 1.75)
    ) {
      this.hitBoxX = this.xPos - this.radiusY;
      this.hitBoxY = this.yPos - this.radiusX;
      this.hitBoxHeight = this.radiusX * 2;
      this.hitBoxWidth = this.radiusY * 2;
    } else {
      this.hitBoxWidth = this.radiusX * 2;
      this.hitBoxHeight = this.radiusY * 2;
      this.hitBoxX = this.xPos - this.radiusX;
      this.hitBoxY = this.yPos - this.radiusY;
    }


    if (typeof this.thickness === 'number') {
      s2pd.ctx.strokeStyle = this.color;
      s2pd.ctx.lineWidth = this.thickness;
      s2pd.ctx.beginPath();
      s2pd.ctx.ellipse(this.xPos, this.yPos, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
      s2pd.ctx.stroke();
    } else {
      s2pd.ctx.fillStyle = this.color;
      s2pd.ctx.beginPath();
      s2pd.ctx.ellipse(this.xPos, this.yPos, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
      s2pd.ctx.fill();
    }
    if (this.cursor) {
      if (s2pd.mouseX > this.xPos && s2pd.mouseX < this.xPos + this.width && s2pd.mouseY > this.yPos && s2pd.mouseY < this.yPos + this.height) {
        s2pd.canvas.style.cursor = 'pointer';
        this.changedCursor = true;
      } else {
        if (this.changedCursor) {
          s2pd.canvas.style.cursor = 'initial';
          this.changedCursor = false;
        }
      }
    }
    if (this.mouseOverFunction) {
      if (s2pd.mouseX > this.xPos && s2pd.mouseX < this.xPos + this.width && s2pd.mouseY > this.yPos && s2pd.mouseY < this.yPos + this.height && typeof this.mouseOverFunction === 'function') {
        if (!this.mouseOverTriggeredOnce) {
          this.mouseOverTriggeredOnce = true;
          this.mouseOverFunction();
        }
        if (!this.triggerMouseOverOnce) {
          this.mouseOverFunction();
        }
      } else {
        this.mouseOverTriggeredOnce = false;
      }
    }

    if (this.dragging) {
      if (s2pd.draggingWithMouse) {
        this.xPos = s2pd.mouseX;
        this.yPos = s2pd.mouseY;
      } else {
        this.xPos = s2pd.touchMoveX;
        this.yPos = s2pd.touchMoveY;
      }
    } else {
      this.xPos += this.velX;
      this.yPos += this.velY;
    }
  }
}

export default Ellipse;
