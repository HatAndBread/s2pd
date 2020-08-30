import s2pd from './core.js';
/**
 * Background
 */
class Background {
  /**
   * Creates a scrollable background.
   * @param {string} source - source of image file. 
   * @param {number=} numberOfFrames - (Only if background is an animation)👉　Total number of animation frames in the source image file. 
   * @param {number=} animationSpeed - (Only if background is an animation)👉 Number of ticks before the next frame is displayed
   */
  constructor(source, numberOfFrames, animationSpeed) {
    s2pd.objectsToLoad.push(this);
    this.loaded = false;
    this.xPos = 0;
    this.yPos = 0;
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
    this.negFarXPos = 0;
    this.velX = 0;
    this.velY = 0;
    this.source = source;
    this.scrolling = false;
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
      this.height = this.theImage.height;
      this.width = this.theImage.width / this.numberOfFrames;
      this.farXpos = this.width;
      this.theImage.addEventListener('load', resolve, { once: true });
      this.theImage.addEventListener('error', reject, { once: true });
    }).then(() => {
      this.loaded = true;
      s2pd.loadedAssets += 1;
      s2pd.finalize(this);
      this.updatePos();
    })
      .catch((err) => {
        console.error(`Background was unable to load.`);
        console.error(err);
      });
  }
  updatePos() {
    s2pd.allBackgrounds[this.id] = this;
    this.autoSize()
    s2pd.ctx.globalAlpha = this.opacity;
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
    if (this.width < s2pd.width / 2) {
      this.farXpos = this.width * Math.ceil(s2pd.width / this.width) + this.xPos;
      this.negFarXPos = this.width * Math.ceil(s2pd.width / this.width) * -1 + this.xPos;
      for (let i = 0; i < Math.ceil(s2pd.width / this.width); i++) {
        s2pd.ctx.drawImage(
          this.theImage,
          this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
          0,
          widthOfFrame,
          heightOfFrame,
          this.xPos + i * this.width,
          this.yPos,
          this.width + 1,
          this.height
        );
      }
      if (this.xPos > 0) {
        for (let i = 0; i < Math.ceil(s2pd.width / this.width); i++) {
          s2pd.ctx.drawImage(
            this.theImage,
            this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
            0,
            widthOfFrame,
            heightOfFrame,
            this.xPos - i * this.width,
            this.yPos,
            this.width + 1,
            this.height
          );
        }
      }

      if (this.farXpos < s2pd.width) {
        s2pd.ctx.drawImage(
          this.theImage,
          this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
          0,
          widthOfFrame,
          heightOfFrame,
          this.farXpos,
          this.yPos,
          this.width + 1,
          this.height
        );
        this.xPos = 0;
      }

      if (this.negFarXPos >= -this.width) {
        this.xPos = 0;
      }
    }
    if (this.width >= s2pd.width / 2 && this.width < s2pd.width) {
      this.farXpos = this.xPos + this.width;
      let leftOvers = this.width * 2 - s2pd.width + this.width;
      s2pd.ctx.drawImage(
        this.theImage,
        this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
        0,
        widthOfFrame,
        heightOfFrame,
        this.xPos,
        this.yPos,
        this.width + 1,
        this.height
      );
      s2pd.ctx.drawImage(
        this.theImage,
        this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
        0,
        widthOfFrame,
        heightOfFrame,
        this.farXpos,
        this.yPos,
        this.width + 1,
        this.height
      );
      s2pd.ctx.drawImage(
        this.theImage,
        this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
        0,
        widthOfFrame,
        heightOfFrame,
        this.width * 2 + this.xPos,
        this.yPos,
        this.width + 1,
        this.height
      );
      s2pd.ctx.drawImage(
        this.theImage,
        this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
        0,
        widthOfFrame,
        heightOfFrame,
        this.width * 3 + this.xPos,
        this.yPos,
        this.width + 1,
        this.height
      );

      if (this.xPos <= leftOvers * -1) {
        this.xPos = (this.width * 2 - s2pd.width) * -1;
      }

      if (this.xPos >= 0) {
        s2pd.ctx.drawImage(
          this.theImage,
          this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
          0,
          widthOfFrame,
          heightOfFrame,
          this.xPos - this.width,
          this.yPos,
          this.width + 1,
          this.height
        );
        if (this.xPos >= this.width) {
          this.xPos = 0;
          s2pd.ctx.drawImage(
            this.theImage,
            this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
            0,
            widthOfFrame,
            heightOfFrame,
            this.xPos,
            this.yPos,
            this.width + 1,
            this.height
          );
        }
      }
    }

    if (this.width >= s2pd.width) {
      this.farXpos = this.xPos + this.width;

      s2pd.ctx.drawImage(
        this.theImage,
        this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
        0,
        widthOfFrame,
        heightOfFrame,
        this.xPos,
        this.yPos,
        this.width + 1,
        this.height
      );

      if (this.farXpos <= s2pd.width) {
        s2pd.ctx.drawImage(
          this.theImage,
          this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
          0,
          widthOfFrame,
          heightOfFrame,
          this.farXpos,
          this.yPos,
          this.width + 1,
          this.height
        );
        if (this.farXpos <= s2pd.width - s2pd.width) {
          this.xPos = 0;
        }
      }

      if (this.xPos >= 0) {
        s2pd.ctx.drawImage(
          this.theImage,
          this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
          0,
          widthOfFrame,
          heightOfFrame,
          this.xPos - this.width,
          this.yPos,
          this.width + 1,
          this.height
        );
        if (this.xPos >= this.width) {
          this.xPos = 0;
          s2pd.ctx.drawImage(
            this.theImage,
            this.animations[this.currentAnimation].startFrame * widthOfFrame + this.currentFrame * widthOfFrame,
            0,
            widthOfFrame,
            heightOfFrame,
            this.xPos,
            this.yPos,
            this.width + 1,
            this.height
          );
        }
      }
    }


    s2pd.ctx.globalAlpha = 1;
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }
    this.xPos += this.velX;
    this.yPos += this.velY;
    this.timeThroughLoop += 1;
  }
  addAnimation(name, startFrame, numberOfFrames) {
    this.animations.push({
      name: name,
      startFrame: startFrame,
      numberOfFrames: numberOfFrames
    });
  }
  changeAnimationTo(name) {
    for (let i = 0; i < this.animations.length; i++) {
      if (this.animations[i].name === name) {
        this.currentAnimation = i;
      }
    }
  }
  autoSize() {
    let increaceToWidth = s2pd.height / this.height;
    this.height = s2pd.height;
    this.width = increaceToWidth * this.width;
    this.farXpos = this.xPos + s2pd.width;
  }
}


export default Background;
