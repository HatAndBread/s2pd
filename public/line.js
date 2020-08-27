import s2pd from './core.js';

export default class Line {
  constructor(startX, startY, endX, endY, color, thickness) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.clickFunction = null;
    this.color = color;
    this.velX = 0;
    this.velY = 0;
    this.thickness = thickness;
    s2pd.finalize(this);
    this.make();
  }
  make() {
    s2pd.ctx.beginPath();
    s2pd.ctx.moveTo(this.startX, this.startY);
    s2pd.ctx.lineTo(this.endX, this.endY);
    s2pd.ctx.lineWidth = this.thickness;
    s2pd.ctx.strokeStyle = this.color;
    s2pd.ctx.stroke();
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }
  }
  jump(howMuch, howLong) {
    this.jumpHeight = howMuch;
    this.jumpLength = howLong;
    this.jumpFrames = 0;
    this.jumping = true;
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
  updatePos() {
    this.startX += this.velX;
    this.endX += this.velX;
    this.startY += this.velY;
    this.endY += this.velY;
  }
}
