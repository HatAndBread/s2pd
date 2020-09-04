import s2pd from './core.js';
import Shapes from './shapes/shapes.js';

/**
 * Text
 * @extends Shapes
 */
class Text extends Shapes {
  /**
   * 
   * @param {string} color - Any valid css color 👉　'rgb(255, 255, 255)' -or- '#ffffff' -or- 'white'.
   * @param {number} xPos - x coordinate
   * @param {number} yPos - y coordinate
   * @param {string} text - Text to be displayed on the screen.
   * @param {string} font - Any valid font.
   * @param {number} size - Font size in pixels.
   * @param {number=} thickness - Optional! Width of text outline. If thickness is present without innerColor an outline of the text will be displayed. 
   * @param {string=} innerColor - Optional! Inner color of text if an outline is present. Any valid css color.
   */
  constructor(color, xPos, yPos, text, font, size, thickness, innerColor) {
    super(color, xPos, yPos);
    this.loaded = true;
    this.text = text;
    this.font = font;
    this.size = size;
    this.thickness = thickness;
    this.innerColor = innerColor;
    this.velX = 0;
    this.velY = 0;
    this.opacity = 1;
    this.timeStamp = Date.now();
    this.center = false;
    this.longestLineLength = 0;
    this.longestLine = 0;
    /**
     * Leading increases space between rows. 1.1 is default. 
     * @example
     * someTextObject.leading = 2;
     */
    this.leading = 1.1;

    s2pd.finalize(this);
    this.updatePos();

  }
  updatePos() {

    this.lineBreaks = this.text.split('\n');

    for (let i = 0; i < this.lineBreaks.length; i++) {
      if (this.lineBreaks[i].length > this.longestLineLength) {
        this.longestLineLength = this.lineBreaks[i].length;
        this.longestLine = i;
      }
    }
    this.draw()

    if (this.dragging) {
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
    }
  }
  /**
   * Draw text on canvas
   * @method
   */
  draw() {
    s2pd.ctx.globalAlpha = this.opacity;
    s2pd.ctx.fillStyle = this.color;
    s2pd.ctx.font = `${this.size}px ${this.font}`;
    s2pd.ctx.lineWidth = this.thickness;
    if (typeof this.thickness !== 'number' || typeof this.thickness === 'number' && typeof this.innerColor === 'string') {
      let increasingY = this.yPos;
      for (let i = 0; i < this.lineBreaks.length; i++) {
        let thisLineX = (s2pd.ctx.measureText(this.lineBreaks[this.longestLine]).width - s2pd.ctx.measureText(this.lineBreaks[i]).width) / 2;
        this.center ? s2pd.ctx.fillText(this.lineBreaks[i], this.xPos + thisLineX, increasingY) : s2pd.ctx.fillText(this.lineBreaks[i], this.xPos, increasingY);
        increasingY += this.size * this.leading;
      }
    }
    if (typeof this.thickness === 'number') {
      let increasingY = this.yPos;
      for (let i = 0; i < this.lineBreaks.length; i++) {
        let thisLineX = (s2pd.ctx.measureText(this.lineBreaks[this.longestLine]).width - s2pd.ctx.measureText(this.lineBreaks[i]).width) / 2;
        this.center ? s2pd.ctx.strokeText(this.lineBreaks[i], this.xPos + thisLineX, increasingY) : s2pd.ctx.strokeText(this.lineBreaks[i], this.xPos, increasingY);
        increasingY += this.size * this.leading;
      }
    }
    this.width = s2pd.ctx.measureText(this.lineBreaks[this.longestLine]).width;
    this.height = this.size * this.leading * (this.lineBreaks.length);
    this.hitBoxX = this.xPos;
    this.hitBoxY = this.yPos - this.size;
    this.hitBoxWidth = this.width;
    this.hitBoxHeight = this.height;
    s2pd.ctx.globalAlpha = 1;
  }
}

export default Text;
