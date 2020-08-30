import s2pd from './core.js';

export default class Sprite {
  /**
   * Sprite must be laid out in a single horizontal row with each frame sized equally.
   * @constructor
   * @param {number} xPos
   * @param {number} yPos
   * @param {string} source
   * @param {number=} numberOfFrames - (Only if sprite is an animation!)👉　Number of frames in the animation
   * @param {number=} animationSpeed - (Only if sprite is an animation!)👉 Number of ticks before the next frame is displayed
   */
  constructor(xPos, yPos, source, numberOfFrames, animationSpeed) {
    s2pd.objectsToLoad.push(this);
    this.loaded = false;
    this.xPos = xPos;
    this.yPos = yPos;
    if (!numberOfFrames) {
      this.numberOfFrames = 1;
    } else {
      this.numberOfFrames = numberOfFrames;
    }
    if (!animationSpeed) {
      this.animationSpeed = 1;
      this.refreshRate = 1;
    } else {
      this.animationSpeed = animationSpeed + (60 % animationSpeed) / Math.floor(60 / animationSpeed);
      this.refreshRate = 60 / animationSpeed;
    }

    this.velX = 0;
    this.velY = 0;
    this.loopLength = 0;
    this.timeThroughLoop = 0;
    this.currentFrame = 0;
    this.animations = [{ name: 'default', startFrame: 0, numberOfFrames: this.numberOfFrames }];
    this.currentAnimation = 0;
    this.opacity = 1;
    this.timeStamp = Date.now();
    this.loader = new Promise((resolve, reject) => {
      this.theImage = new Image();
      this.theImage.src = source;
      this.theImage.addEventListener('load', resolve, { once: true });
      this.theImage.addEventListener('error', reject, { once: true });
    })
      .then(() => {
        this.width = this.theImage.width / this.numberOfFrames;
        this.height = this.theImage.height;
        this.loaded = true;
        s2pd.loadedAssets += 1;
        s2pd.finalize(this);
        this.updatePos();
      })
      .catch((err) => {
        console.error(`Sprite was unable to load.`);
        console.error(err);
      });

  }
  updatePos() {
    s2pd.allGameObjects[this.id] = this;
    this.hitBoxX = this.xPos;
    this.hitBoxY = this.yPos;
    this.hitBoxWidth = this.width;
    this.hitBoxHeight = this.height;
    let heightOfFrame = this.theImage.height;
    let widthOfFrame = this.theImage.width / this.numberOfFrames;

    this.loopLength = this.refreshRate * this.animations[this.currentAnimation].numberOfFrames;

    if (this.timeThroughLoop === this.animationSpeed) {
      this.currentFrame += 1;
      this.timeThroughLoop = 0;
      if (
        this.currentFrame >=
        this.animations[this.currentAnimation].numberOfFrames
      ) {
        this.currentFrame = 0;
      }
    }
    s2pd.ctx.globalAlpha = this.opacity;
    s2pd.ctx.drawImage(
      this.theImage,
      this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
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
    this.animations.push({ name: name, startFrame: startFrame, numberOfFrames: numberOfFrames });
  }
  changeAnimationTo(name) {
    for (let i = 0; i < this.animations.length; i++) {
      if (this.animations[i].name === name) {
        this.currentAnimation = i;
      }
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
}
