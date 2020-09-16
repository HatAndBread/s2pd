import s2pd from './core.js';

export default class Sprite {
  /**
   * Sprite must be laid out in a single horizontal row with each frame sized equally.
   * @constructor
   * @param {number} xPos
   * @param {number} yPos
   * @param {string} source
   * @param {number=} numberOfFrames - (Only if sprite is an animation!)👉　Number of frames in the animation.
   * @param {number=} animationSpeed - (Only if sprite is an animation!)👉 Number of ticks before the next frame is displayed. 1 is change frames every tick. 2 is change frames every 2 clicks etc.
   * @example
   * const rabbit = new s.Sprite(300, 300, './rabbit.png', 20,3);
   * // will create a sprite with 20 frames, with the frame changing every three ticks of the loop.
   * // To use multiple animations in the same sprite sheet ⬇︎
   * rabbit.addAnimation('jump',3,10);
   * rabbit.changeAnimationTo('jump');
   * //// creates an animation starting at frame 3 and continues for 10 frames. (Start counting at frame 0!)
   *
   */
  constructor(xPos, yPos, source, numberOfFrames, animationSpeed) {
    s2pd.objectsToLoad.push(this);
    s2pd.allGameObjects.push(this);
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
      this.animationSpeed = animationSpeed;
      this.refreshRate = 60 / animationSpeed;
    }
    this.id = s2pd.getId();
    this.playedOnce = false;
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
        s2pd.loadedImages += 1;
        this.updatePos();
      })
      .catch((err) => {
        console.error(`Sprite was unable to load.`);
        console.error(err);
      });
  }
  updatePos() {
    let heightOfFrame = this.theImage.height;
    this.currentAnimationName = this.animations[this.currentAnimation].name;

    let widthOfFrame = this.theImage.width / this.numberOfFrames;
    if (this.jumping) {
      s2pd.jump(this, this.jumpHeight, this.jumpLength);
    }
    if (this.gravity) {
      this.onGravity();
    }
    this.loopLength = this.refreshRate * this.animations[this.currentAnimation].numberOfFrames;

    if (this.timeThroughLoop === this.animationSpeed) {
      this.currentFrame += 1;
      this.timeThroughLoop = 0;
      if (this.currentFrame >= this.animations[this.currentAnimation].numberOfFrames) {
        this.currentFrame = 0;
        this.playedOnce = true;
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
    if (this.cursor) {
      if (
        s2pd.mouseX > this.xPos &&
        s2pd.mouseX < this.xPos + this.width &&
        s2pd.mouseY > this.yPos &&
        s2pd.mouseY < this.yPos + this.height
      ) {
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
      if (
        s2pd.mouseX > this.xPos &&
        s2pd.mouseX < this.xPos + this.width &&
        s2pd.mouseY > this.yPos &&
        s2pd.mouseY < this.yPos + this.height &&
        typeof this.mouseOverFunction === 'function'
      ) {
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
        this.xPos = s2pd.mouseX - this.width / 2;
        this.yPos = s2pd.mouseY - this.height / 2;
      } else {
        this.xPos = s2pd.touchMoveX - this.width / 2;
        this.yPos = s2pd.touchMoveY - this.height / 2;
      }
    }
    this.xPos += this.velX;
    this.yPos += this.velY;
    if (this.detectHit) {
      if (!this.customHitBox) {
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;
      } else {
        this.hitBoxX = this.xPos + this.customHitBox.left;
        this.hitBoxY = this.yPos + this.customHitBox.top;
        this.hitBoxWidth = this.width - this.customHitBox.left - this.customHitBox.right;
        this.hitBoxHeight = this.height - this.customHitBox.top - this.customHitBox.bottom;
      }
    }

    this.timeThroughLoop += 1;
  }

  /**
   *
   * @param {string} name - A name to call the animation by.
   * @param {number} startFrame - Frame in the sprite sheet at which the animation should start.
   * @param {number} numberOfFrames - The number of frames the animation should last for.
   * @example
   * rabbit.addAnimation('jump', 3,9)
   * // creates a 9 frame animation starting at frame 3 (start counting from 0!).
   */
  addAnimation(name, startFrame, numberOfFrames) {
    this.animations.push({ name: name, startFrame: startFrame, numberOfFrames: numberOfFrames });
  }
  /**
   *
   * @param {string} name - Change to a new animation. Animation must first be declared with addAnimation().
   * @example
   * rabbit.addAnimation('jump', 3,9)
   * rabbit.changeAnimationTo('jump')
   */
  changeAnimationTo(name) {
    this.currentFrame = 0;
    for (let i = 0; i < this.animations.length; i++) {
      if (this.animations[i].name === name) {
        this.currentAnimation = i;
      }
    }
  }

  hitDetect() {
    if (!this.detectHit) {
      s2pd.hitDetectObjects.push(this);
      this.detectHit = true;
    }
  }
  /**
   * @param {function} callback - What to do when object is clicked.
   * @param {boolean} triggerOnce - Truthy value to only trigger callback one time.
   * @example
   * circle.onClick(()=>{
   *   circle.color = 'rgb(1,2,3)'
   * })
   */
  onClick(callback, triggerOnce) {
    this.clickFunction = callback;
    if (triggerOnce) {
      this.triggerClickOnce = true;
    }
  }
  /**
   * What to do when mouse is over object.
   * @param {function} callback - A callback function to be called whenever mouse is over object.
   * @param  {boolean} triggerOnce - Trigger once while true or every tick of the loop.
   * @example
   * circle.onMouseOver()=>{
   *   circle.color = s.getRandomColor()
   * })
   */
  onMouseOver(callback, triggerOnce) {
    if (typeof callback === 'function') {
      this.mouseOverFunction = callback;
      if (triggerOnce) {
        this.triggerMouseOverOnce = true;
      }
    } else {
      console.error('@onMouseOver: typeerror');
    }
  }

  /**
   * Change the cursor style when mouse is over object.
   * @param {string} type - Type of cursor to use when mouse is over object. Default is 'pointer'
   */
  changeCursor(type) {
    !type ? (this.cursor = 'pointer') : (this.cursor = type);
  }

  /**
   *
   * @param {function} callback - What to do when mouse is held down over object or object is touched.
   * @example
   * sprite.onHold(()=>{
   *   sprite.color = s.getRandomColor()
   * })
   */
  onHold(callback) {
    this.holdFunction = callback;
    if (!s2pd.holdableObjects.includes(this)) {
      s2pd.holdableObjects.push(this);
    }
  }
  /**
   * Drag when mouse is held down over the object or user is touching the object. Object will be released when mouse is up or touching stops. Only works in conjunction with onHold().
   * @example
   * rabbit.onHold(()=>{
   *   rabbit.drag();
   * });
   */
  drag() {
    this.dragging = true;
  }
  /**
   * Make sprite into a platform. Objects with gravity will not fall through platforms.
   * @param {boolean=} blockify - Optional! Default value is false. If platform is a block objects with gravity will not be able to pass through it either from above, below, or to the sides.
   */
  platform(blockify) {
    this.hitDetect();
    blockify ? (this.block = true) : (this.block = false);
    s2pd.platforms.push(this);
  }
  /**
   * Disable the sprites as a platform.
   */
  notPlatform() {
    this.block = false;
    for (let i = 0; i < s2pd.platforms.length; i++) {
      s2pd.platforms[i] === this ? s2pd.platforms.splice(i, 1) : undefined;
    }
  }
  /**
   * Give the object gravity. Will fall unless it lands on a platform.
   * @param {number=} gravity - Amount of gravity. Higher number is more gravity. Default is 14.
   */
  feelGravity(gravity) {
    this.hitDetect();
    if (s2pd.gravity.includes(this)) {
      this.gravity = true;
      this.accelerating = 0;
      !gravity ? (this.gravityLevel = 14) : (this.gravityLevel = gravity);
      this.originalGravityLevel = this.gravityLevel;
      this.accelerationRate = this.originalGravityLevel * 0.05;
    } else {
      s2pd.gravity.push(this);
      this.gravity = true;
      this.accelerating = 0;
      !gravity ? (this.gravityLevel = 14) : (this.gravityLevel = gravity);
      this.originalGravityLevel = this.gravityLevel;
      this.accelerationRate = this.originalGravityLevel * 0.05;
    }
  }
  /**
   * turns of gravity on object.
   */
  noGravity() {
    this.gravity = false;
    for (let i = 0; i < s2pd.gravity.length; i++) {
      s2pd.gravity[i] === this ? s2pd.gravity.splice(i, 1) : undefined;
    }
  }
  // onGravity to be called every tick while jumping
  onGravity() {
    if (!this.landed && !this.jumping) {
      if (this.accelerating < this.originalGravityLevel) {
        this.accelerating += this.accelerationRate;
        this.velY = this.accelerating;
      }
      if (this.accelerating >= this.originalGravityLevel) {
        this.velY = this.originalGravityLevel;
      }
    }
  }
  /**
   * Make the object jump. Gravity must be enabled 👉 call: sprite.feelGravity(howMuchGravity) first;
   * @param {number} howHigh - How high to make object jump in pixels.
   * @param {boolean=} noDoubleJumps - Optional! Prevent object from jumping when it is not on a platform. Default is false.
   * @example
   * sprite.feelGravity(10);
   * sprite.jump(200,true)
   */
  jump(howHigh, noDoubleJumps) {
    this.hitDetect();
    if (this.gravity) {
      noDoubleJumps ? (this.noDoubleJumps = true) : (this.noDoubleJumps = false);
      if (!this.noDoubleJumps) {
        this.accelerating = 0;
        this.accelerationRate = this.originalGravityLevel * 0.05;
        this.velY = 0;
        this.jumpStart = this.yPos;
        this.jumpHeight = howHigh;
        this.jumping = true;
      } else {
        if (this.landed) {
          //this is your problem
          this.accelerating = 0;
          this.accelerationRate = this.originalGravityLevel * 0.05;
          this.velY = 0;
          this.jumpStart = this.yPos;
          this.jumpHeight = howHigh;
          this.jumping = true;
        }
      }
    } else {
      console.warn('object.feelGravity() must be called for jump to work. 😇');
    }
  }
  /**
   * Reduces object's hit box (the area around the sprite used to detect collisions).
   * By default a sprite's hit box is a rectangle having the width and height of the current animation frame.
   * trimHitBox allows you to reduce that size for improved collision detection.
   *
   * @param {number} left - pixels to trim on left side
   * @param {number} right - pixels to trim on right side
   * @param {number} top - pixels to trim on top
   * @param {number} bottom - pixels to trim on bottom
   */
  trimHitBox(left, right, top, bottom) {
    this.customHitBox = {
      left: Math.abs(left),
      right: Math.abs(right),
      top: Math.abs(top),
      bottom: Math.abs(bottom)
    };
  }
  /**
   * increase sprites size
   * @param {number} howMuch - Increase or decrease sprite's size. 0.5 for half current size. 2 for twice current size, etc.
   */
  updateSize(howMuch) {
    howMuch = Math.abs(howMuch);
    this.width *= howMuch;
    this.height *= howMuch;
    this.hitBoxHeight = this.height;
    this.hitBoxWidth = this.width;
  }
  /**
   * Change current animation frame.
   * @param {number} which - Which animation frame do you want to go to.
   */
  goToFrame(which) {
    if (typeof which === 'number') {
      this.currentFrame = which;
    } else {
      console.error(`@goToFrame: ${which} not a valid argument.`);
    }
  }
  /**
   * Remove all references to object.
   *
   */
  destroy() {
    s2pd.canvas.style.cursor = 'initial';
    const searchAndDestroy = (arr) => {
      for (let i = arr.length; i >= 0; i--) {
        if (arr[i]) {
          if (arr[i].id) {
            if (arr[i].id === this.id) {
              arr.splice(i, 1);
            }
          }
        }
      }
    };
    for (let i = 0; i < s2pd.collisions.length; i++) {
      if (s2pd.collisions[i].obj1.id === this.id || s2pd.collisions[i].obj2.id === this.id) {
        s2pd.collisions.splice(i, 1);
      }
    }
    searchAndDestroy(s2pd.allBackgrounds);
    searchAndDestroy(s2pd.allGameObjects);
    searchAndDestroy(s2pd.hitDetectObjects);
    searchAndDestroy(s2pd.holdableObjects);
    searchAndDestroy(s2pd.gravity);
    searchAndDestroy(s2pd.platforms);
    s2pd.delete(this);
  }
}
