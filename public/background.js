import s2pd from './core.js';

export default class Background {
  constructor(xPos, yPos, numberOfFrames, source, animationSpeed, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.numberOfFrames = numberOfFrames;
    this.width = width;
    this.height = height;
    this.farXpos = this.xPos + this.width;
    this.negFarXPos = 0;
    this.velX = 0;
    this.velY = 0;
    this.source = source;
    this.scrolling = false;
    this.animationSpeed = animationSpeed + (60 % animationSpeed) / Math.floor(60 / animationSpeed);
    this.refreshRate = 60 / animationSpeed;
    this.loopLength = 0;
    this.timeThroughLoop = 0;
    this.currentFrame = 0;
    this.animations = [[0, 0, 0, 0, 0]];
    this.currentAnimation = 0;
    this.opacity = 1;
    this.timeStamp = Date.now();
    this.theImage = document.createElement('img');
    s2pd.finalize(this);
    this.load();
  }
  load() {
    s2pd.objectsToLoad.push(this);
  }
  make() {
    s2pd.ctx.globalAlpha = this.opacity;
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
    if (!this.scrolling) {
      s2pd.ctx.drawImage(
        this.theImage,
        this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
        0,
        widthOfFrame,
        heightOfFrame,
        this.xPos,
        this.yPos,
        this.width + 1,
        this.height
      );
    }

    if (this.scrolling) {
      if (this.width < s2pd.width / 2) {
        this.farXpos = this.width * Math.ceil(s2pd.width / this.width) + this.xPos;
        this.negFarXPos = this.width * Math.ceil(s2pd.width / this.width) * -1 + this.xPos;
        for (let i = 0; i < Math.ceil(s2pd.width / this.width); i++) {
          s2pd.ctx.drawImage(
            this.theImage,
            this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
              this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
            this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
          this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
          this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
          this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
          this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
            this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
              this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
          this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
            this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
            this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
              this.animations[this.currentAnimation][1] * widthOfFrame + this.currentFrame * widthOfFrame,
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
    }

    s2pd.ctx.globalAlpha = 1;
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }

    this.timeThroughLoop += 1;
  }
  makeScrollable() {
    this.scrolling = true;
  }
  addAnimation(name, startFrame, numberOfFrames) {
    this.animations.push([name, startFrame, numberOfFrames]);
  }
  changeAnimationTo(name) {
    for (let i = 0; i < this.animations.length; i++) {
      if (this.animations[i][0] === name) {
        this.currentAnimation = i;
      }
    }
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
  stop() {
    this.velX = 0;
    this.velY = 0;
  }
  updatePos() {
    s2pd.allBackgrounds[this.id] = this;
    this.xPos += this.velX;
    this.yPos += this.velY;
  }
  autoSize() {
    let increaceToWidth = s2pd.height / this.height;
    this.height = s2pd.height;
    this.width = increaceToWidth * this.width;
    this.farXpos = this.xPos + s2pd.width;
  }
  updateSize(howMuch) {
    if (howMuch < 0) {
      if (this.width > howMuch * -1) {
        this.width *= howMuch;
        this.farXpos = this.xPos + this.width;
        this.newFarXpos = this.farXpos + this.width;
      }
      if (this.height > howMuch * -1) {
        this.height *= howMuch;
      }
    } else {
      this.width *= howMuch;
      this.height *= howMuch;
    }
    this.farXpos = this.xPos + this.width;
    this.newFarXpos = this.farXpos + this.width;
  }
  updateOpacity(howMuch) {
    if (howMuch < 0) {
      if (this.opacity > howMuch * -1) {
        this.opacity += howMuch;
      }
    } else {
      this.opacity += howMuch;
    }
  }
  destroy() {
    s2pd.allBackgrounds.splice(this.id, 1);
  }
}
