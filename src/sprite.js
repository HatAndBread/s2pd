import s2pd from './core.js';

export default class Sprite {
  /**
   * Sprite must be laid out in a single horizontal row with each frame sized equally.
   * @constructor
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} numberOfFrames
   * @param {string} source
   * @param {number} animationSpeed - number of ticks before the next frame is displayed
   * @param {number} width
   * @param {number} height
   */
  constructor(xPos, yPos, numberOfFrames, source, animationSpeed, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.numberOfFrames = numberOfFrames;
    this.width = width;
    this.height = height;
    this.velX = 0;
    this.velY = 0;
    this.animationSpeed = animationSpeed + (60 % animationSpeed) / Math.floor(60 / animationSpeed);
    this.refreshRate = 60 / animationSpeed;
    this.loopLength = 0;
    this.timeThroughLoop = 0;
    this.currentFrame = 0;
    this.animations = [[0, 0, 0, 0, 0]];
    this.currentAnimation = 0;
    this.currentAnimationName = '';
    this.opacity = 1;
    this.timeStamp = Date.now();
    this.loaded = false;
    this.loader = new Promise((resolve, reject) => {
      this.theImage = new Image();
      this.theImage.src = source;
      this.theImage.addEventListener('load', resolve, { once: true });
      this.theImage.addEventListener('error', reject, { once: true });
    })
      .then(() => {
        this.loaded = true;
        s2pd.loadedAssets += 1;
        s2pd.finalize(this);
        this.updatePos();
      })
      .catch((err) => {
        console.error(`Sprite was unable to load.`);
        console.error(err);
      });
    s2pd.objectsToLoad.push(this);
  }
  updatePos() {
    s2pd.allGameObjects[this.id] = this;
    this.hitBoxX = this.xPos;
    this.hitBoxY = this.yPos;
    this.hitBoxWidth = this.width;
    this.hitBoxHeight = this.height;
    let heightOfFrame = this.theImage.height;
    let widthOfFrame = this.theImage.width / this.numberOfFrames;

    this.loopLength = this.refreshRate * this.animations[this.currentAnimation][2];

    if (this.timeThroughLoop === this.animationSpeed) {
      this.currentFrame += 1;
      this.timeThroughLoop = 0;
      if (
        this.currentFrame >=
        this.animations[this.currentAnimation][2] /* **this is the number of frames in animation** */
      ) {
        this.currentFrame = 0;
      }
    }
    s2pd.ctx.globalAlpha = this.opacity;
    s2pd.ctx.drawImage(
      this.theImage,
      this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
      0,
      widthOfFrame,
      heightOfFrame,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );

    s2pd.ctx.globalAlpha = 1;
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }
    if (this.dragging === true) {
      s2pd.dragArray[0] = this;
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
        s2pd.hitDetectObjects[this.hitBoxId] = this;
      }
    }

    this.timeThroughLoop += 1;
  }
  addAnimation(name, startFrame, numberOfFrames) {
    this.animations.push([name, startFrame, numberOfFrames]);
    this.currentAnimationName = name;
  }
  changeAnimationTo(name) {
    for (let i = 0; i < this.animations.length; i++) {
      if (this.animations[i][0] === name) {
        this.currentAnimation = i;
      }
      this.currentAnimationName = name;
    }
  }

  hitDetect() {
    this.detectHit = true;
    this.hitBoxId = s2pd.hitDetectObjects.length;
    s2pd.hitDetectObjects.push(this);
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
  makeDraggable() {
    this.draggable = true;
    this.clickable = false;
    this.draggableId = s2pd.draggableObjects.length;
    s2pd.draggableObjects.push(this);
  }
  makeHoldable() {
    this.holdable = true;
    this.clickable = false;
    this.draggable = false;
    this.holdableId = s2pd.holdableObjects.length;
    s2pd.holdableObjects.push(this);
  }
  jump(howMuch, howLong) {
    this.jumpHeight = howMuch;
    this.jumpLength = howLong;
    this.jumpFrames = 0;
    this.jumping = true;
  }
  moveTo(newX, newY) {
    this.xPos = newX;
    this.yPos = newY;
  }
  updateSize(howMuch) {
    if (howMuch < 0) {
      if (this.width > howMuch * -1) {
        this.width *= howMuch;
        this.hitBoxWidth = this.width;
      }
      if (this.height > howMuch * -1) {
        this.height *= howMuch;
        this.hitBoxHeight = this.height;
      }
    } else {
      this.width *= howMuch;
      this.height *= howMuch;
      this.hitBoxHeight = this.height;
      this.hitBoxWidth = this.width;
    }
  }
  destroy() {
    if (this.clickable) {
      s2pd.clickableObjects.splice(this.clickableId, 1);
    }
    if (this.detectHit) {
      s2pd.hitDetectObjects.splice(this.hitBoxId, 1);
      for (let i = 0; i < s2pd.hitDetectObjects.length; i++) {
        s2pd.hitDetectObjects[i].hitBoxId = i;
      }
    }

    s2pd.allGameObjects.splice(this.id, 1);
  }
}
