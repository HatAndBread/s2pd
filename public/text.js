import s2pd from './core.js';
import Shapes from './shapes.js';

export default class Text extends Shapes {
  constructor(color, xPos, yPos, text, font, size, thickness, innerColor) {
    super(color, xPos, yPos);
    this.text = text;
    this.font = font;
    this.size = size;
    this.thickness = thickness;
    this.innerColor = innerColor;
    this.velX = 0;
    this.velY = 0;
    this.opacity = 1;
    this.timeStamp = Date.now();
    s2pd.finalize(this);
    this.updatePos();
  }
  updatePos() {
    s2pd.allGameObjects[this.id] = this;
    this.hitBoxX = this.xPos;
    this.hitBoxY = this.yPos - this.size;
    if (typeof this.thickness === 'number') {
      if (typeof this.innerColor === 'string') {
        s2pd.ctx.globalAlpha = this.opacity;
        s2pd.ctx.font = `${this.size}px ${this.font}`;
        s2pd.ctx.strokeStyle = this.color;
        s2pd.ctx.fillStyle = this.innerColor;
        s2pd.ctx.lineWidth = this.thickness;
        this.width = s2pd.ctx.measureText(this.text).width;
        this.height = this.size;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.size;
        s2pd.ctx.fillText(this.text, this.xPos, this.yPos);
        s2pd.ctx.strokeText(this.text, this.xPos, this.yPos);
        s2pd.ctx.globalAlpha = 1;
      }
      s2pd.ctx.globalAlpha = this.opacity;
      s2pd.ctx.font = `${this.size}px ${this.font}`;
      s2pd.ctx.strokeStyle = this.color;
      s2pd.ctx.lineWidth = this.thickness;
      this.width = s2pd.ctx.measureText(this.text).width;
      this.height = this.size;
      s2pd.ctx.strokeText(this.text, this.xPos, this.yPos);
      s2pd.ctx.globalAlpha = 1;
    } else {
      s2pd.ctx.globalAlpha = this.opacity;
      s2pd.ctx.fillStyle = this.color;
      s2pd.ctx.font = `${this.size}px ${this.font}`;
      s2pd.ctx.fillText(this.text, this.xPos, this.yPos);
      this.width = s2pd.ctx.measureText(this.text).width;
      this.height = this.size;
      this.hitBoxWidth = this.width;
      this.hitBoxHeight = this.size;
      s2pd.ctx.globalAlpha = 1;
    }

    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }
    if (this.dragging) {
      s2pd.dragArray[0] = this;
      if (s2pd.draggingWithMouse) {
        this.xPos = s2pd.mouseX - this.width / 2;
        this.yPos = s2pd.mouseY + this.size / 2;
      } else {
        this.xPos = s2pd.touchMoveX - this.width / 2;
        this.yPos = s2pd.touchMoveY + this.size / 2;
      }
    } else {
      this.xPos += this.velX;
      this.yPos += this.velY;
      if (this.detectHit) {
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos - this.size;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;
        s2pd.hitDetectObjects[this.hitBoxId] = this;
      }
    }
  }
}
