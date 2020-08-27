import s2pd from './core.js';
import Shapes from './shapes.js';

export default class Ellipse extends Shapes {
  constructor(color, xPos, yPos, radiusX, radiusY, rotation, thickness) {
    super(color, xPos, yPos);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.rotation = rotation;
    this.velX = 0;
    this.velY = 0;
    this.opacity = 1;
    this.thickness = thickness;
    this.timeStamp = Date.now();
    s2pd.finalize(this);
    this.updatePos();
  }
  updatePos() {
    s2pd.allGameObjects[this.id] = this;
    if (this.rotation >= Math.PI * 2) {
      this.rotation = this.rotation % Math.PI;
      console.log(this.rotation);
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
