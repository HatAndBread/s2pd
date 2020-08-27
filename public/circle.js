import s2pd from './core.js';
import Shapes from './shapes.js';

export default class Circle extends Shapes {
  constructor(color, xPos, yPos, radius, thickness) {
    super(color, xPos, yPos);
    this.radius = radius;
    this.thickness = thickness;
    this.updatePos();
  }
  updatePos() {
    s2pd.allGameObjects[this.id] = this;
    this.hitBoxWidth = this.radius * 2;
    this.hitBoxHeight = this.radius * 2;
    this.hitBoxX = this.xPos - this.radius;
    this.hitBoxY = this.yPos - this.radius;
    if (typeof this.thickness === 'number') {
      s2pd.ctx.beginPath();
      s2pd.ctx.globalAlpha = this.opacity;
      s2pd.ctx.strokeStyle = this.color;
      s2pd.ctx.lineWidth = this.thickness;
      s2pd.ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
      s2pd.ctx.stroke();
      s2pd.ctx.globalAlpha = 1;
    } else {
      s2pd.ctx.beginPath();
      s2pd.ctx.globalAlpha = this.opacity;
      s2pd.ctx.fillStyle = this.color;
      s2pd.ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
      s2pd.ctx.fill();
      s2pd.ctx.globalAlpha = 1;
      if (this.outline) {
        s2pd.ctx.strokeStyle = this.outlineColor;
        s2pd.ctx.lineWidth = this.outlineThickness;
        s2pd.ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        s2pd.ctx.stroke();
      }
    }
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }
    if (this.dragging) {
      s2pd.dragArray[0] = this;
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
