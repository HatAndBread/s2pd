import s2pd from './core.js'

/**
 * Tile
 */
class Tile {
    /**
     * 
     * @param {string} source - Image file source. 
     * @param {number=} xPos - x Position. Default is 0. 
     * @param {number=} yPos - y Position. Default is 0.
     * @param {number=} repeatX - How many times to repeat the image on the x axis. Default is to repeat for the entire width of window.
     * @param {number=} repeatY - How many times to repeat the image on the y axis. Default is to repeat for the entire height of window.
     * @param {number=} numberOfFrames - (Only if tile is an animation!)👉　Number of frames in the animation. 
     * @param {number=} animationSpeed - (Only if tile is an animation!)👉 Number of ticks before the next frame is displayed. 1 is change frames every tick. 2 is change frames every 2 clicks etc.
     * @example
     * const background = new s.Tile('./stars.png');
     * // will create a tile that takes up the whole canvas.
     * const tile = new s.Tile('./ground.png', 0,400,10,1);
     * // will create a tile repeating 10 times on the x axis.
     * const animatedTile = new s.Tile('./unicorn.png', 100,100,3,4,10,3)
     * // Creates a 10 frame animated tile from sprite sheet. 
     * animatedTile.addAnimation('first',1,5);
     * animatedTile.changeAnimationTo('first');
     * // Creates a 5 frame animation called 'first' starting at frame 1.
     *
     */
    constructor(source, xPos, yPos, repeatX, repeatY, numberOfFrames, animationSpeed) {
        s2pd.objectsToLoad.push(this);
        s2pd.allGameObjects.push(this);
        this.loaded = false;
        !xPos ? this.xPos = 0 : this.xPos = xPos;
        !yPos ? this.yPos = 0 : this.yPos = yPos;
        this.repeatX = repeatX;
        this.repeatY = repeatY;
        //!width ? this.width = s2pd.width : this.width = width;
        //!height ? this.height = s2pd.height : this.height = height;
        !numberOfFrames ? this.numberOfFrames = 1 : this.numberOfFrames = numberOfFrames;
        !animationSpeed ? this.animationSpeed = 1 : this.animationSpeed = animationSpeed;
        this.imageWidth;
        this.imageHeight;
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
        this.id = s2pd.getId()
        this.velX = 0;
        this.velY = 0;
        this.innerX = 0;
        this.innerY = 0;
        this.innerVelX = 0;
        this.innerVelY = 0;
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
                this.imageWidth = this.theImage.width / this.numberOfFrames;
                this.imageHeight = this.theImage.height;
                if (!this.repeatX) {
                    this.repeatX = s2pd.width / this.imageWidth;
                    this.autoResizeX = true;
                }
                if (!this.repeatY) {
                    this.repeatY = s2pd.height / this.imageHeight;
                    this.autoResizeY = true;
                }
                this.width = this.imageWidth * this.repeatX;
                this.height = this.imageHeight * this.repeatY;
                this.loaded = true;
                s2pd.loadedImages += 1;
                this.updatePos();
            })
            .catch((err) => {
                console.error(`Sprite was unable to load.`, err);
            });
    }
    updatePos() {
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;
        this.heightOfFrame = this.theImage.height;
        this.widthOfFrame = this.theImage.width / this.numberOfFrames;
        if (this.autoResizeX) {
            this.repeatX = s2pd.width / this.imageWidth;
        }
        if (this.autoResizeY) {
            this.repeatY = s2pd.height / this.imageHeight;
        }
        this.theFormula = this.animations[this.currentAnimation].startFrame * this.widthOfFrame + this.currentFrame * this.widthOfFrame;
        if (this.jumping) {
            s2pd.jump(this, this.jumpHeight, this.jumpLength);
        }
        if (this.gravity) {
            this.onGravity()
        }
        if (this.innerX <= this.imageWidth * -1 || this.innerX >= this.imageWidth) {
            this.innerX = 0;
        }
        if (this.innerY <= this.imageHeight * -1 || this.innerY >= this.imageHeight) {
            this.innerY = 0;
        }
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
        if (this.width < this.imageWidth) {
            this.width = this.imageWidth
        }




        let columns = this.repeatX;
        let rows = this.repeatY - 1;






        let increasingX = this.xPos - this.imageWidth;

        for (let i = -1; i < columns + 1; i++) {


            //on the column to the left side
            if (i === -1 && this.innerX <= 0) {


            } else if (i === -1 && this.innerX > 0) {

                if (this.innerY <= 0) {
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula + this.imageWidth - this.innerX,
                        this.innerY * -1,
                        this.innerX,
                        this.heightOfFrame,
                        this.xPos,
                        this.yPos,
                        this.innerX,
                        this.imageHeight
                    );

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula + this.imageWidth - this.innerX,
                        0,
                        this.innerX,
                        0 - this.innerY,
                        this.xPos,
                        this.yPos + this.imageHeight + (rows * this.imageHeight),
                        this.innerX,
                        this.innerY
                    );


                } else if (this.innerY > 0) {
                    if (this.repeatY > 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula + this.imageWidth - this.innerX,
                            0,
                            this.innerX,
                            this.heightOfFrame,
                            this.xPos,
                            this.yPos + this.innerY,
                            this.innerX,
                            this.imageHeight
                        );
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula + this.imageWidth - this.innerX,
                            this.innerY * -1,
                            this.innerX,
                            this.heightOfFrame,
                            this.xPos,
                            this.yPos,
                            this.innerX,
                            this.imageHeight
                        );
                    }



                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula + this.imageWidth - this.innerX,
                        this.imageHeight - this.innerY,
                        this.innerX,
                        this.heightOfFrame,
                        this.xPos,
                        this.yPos,
                        this.innerX,
                        this.imageHeight
                    );


                }
                else {

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula + this.imageWidth - this.innerX,
                        0,
                        this.innerX,
                        this.heightOfFrame,
                        this.xPos,
                        this.yPos + this.innerY,
                        this.innerX,
                        this.imageHeight
                    );//



                }
                let increasingY = this.yPos + this.imageHeight;
                for (let j = 0; j < rows; j++) {
                    if (j < rows - 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula + this.imageWidth - this.innerX,
                            0,
                            this.innerX,
                            this.heightOfFrame,
                            this.xPos,
                            this.innerY + increasingY,
                            this.innerX,
                            this.imageHeight
                        );
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula + this.imageWidth - this.innerX,
                            0,
                            this.innerX,
                            this.heightOfFrame - this.innerY,
                            this.xPos,
                            this.innerY + increasingY,
                            this.innerX,
                            this.imageHeight - this.innerY
                        );
                    }
                    increasingY += this.imageHeight;
                }
            }
            ///the first actual column START HERE
            else if (i === 0 && this.innerX < 0) {
                if (this.innerY <= 0) {
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula - this.innerX, //
                        this.innerY * -1,
                        this.widthOfFrame,
                        this.heightOfFrame,
                        increasingX, //
                        this.yPos,
                        this.imageWidth,
                        this.imageHeight
                    );

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula - this.innerX, //
                        0,
                        this.widthOfFrame,
                        this.innerY * -1,
                        increasingX, //
                        this.yPos + this.imageHeight + (rows * this.imageHeight),
                        this.imageWidth,
                        this.innerY
                    );




                } else if (this.innerY > 0) {
                    if (this.repeatY > 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula - this.innerX, //
                            0,
                            this.widthOfFrame,
                            this.heightOfFrame,
                            increasingX, //
                            this.yPos + this.innerY,
                            this.imageWidth,
                            this.imageHeight
                        );
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula - this.innerX, //
                            this.innerY * -1,
                            this.widthOfFrame,
                            this.heightOfFrame,
                            increasingX, //
                            this.yPos,
                            this.imageWidth,
                            this.imageHeight
                        );
                    }


                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula - this.innerX, //
                        this.imageHeight - this.innerY,
                        this.widthOfFrame,
                        this.heightOfFrame,
                        increasingX, //
                        this.yPos,
                        this.imageWidth,
                        this.imageHeight
                    );





                } else {

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula - this.innerX, //
                        0,
                        this.widthOfFrame,
                        this.heightOfFrame,
                        increasingX, //
                        this.yPos + this.innerY,
                        this.imageWidth,
                        this.imageHeight
                    );

                }
                let increasingY = this.yPos + this.imageHeight;
                for (let j = 0; j < rows; j++) {
                    if (j < rows - 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula - this.innerX, //
                            0,
                            this.widthOfFrame,
                            this.heightOfFrame,
                            increasingX, //
                            this.innerY + increasingY,
                            this.imageWidth,
                            this.imageHeight
                        );
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula - this.innerX,
                            0,
                            this.widthOfFrame,
                            this.heightOfFrame - this.innerY,
                            increasingX,
                            this.innerY + increasingY,
                            this.imageWidth,
                            this.imageHeight - this.innerY
                        );
                    }
                    increasingY += this.imageHeight;
                }
            }
            else if (i === columns && this.innerX <= 0) {

                if (this.innerY <= 0) {
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        this.innerY * -1,
                        0 - this.innerX,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos,
                        Math.abs(this.innerX),
                        this.imageHeight
                    );
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        0,
                        0 - this.innerX,
                        this.innerY * -1,
                        increasingX + this.innerX,
                        this.yPos + this.imageHeight + (rows * this.imageHeight),
                        Math.abs(this.innerX),
                        this.innerY
                    );
                } else if (this.innerY > 0) {
                    if (this.repeatY > 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            0 - this.innerX,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.yPos + this.innerY,
                            Math.abs(this.innerX),
                            this.imageHeight
                        );

                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            this.innerY * -1,
                            0 - this.innerX,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.yPos,
                            Math.abs(this.innerX),
                            this.imageHeight
                        );
                    }

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        this.imageHeight - this.innerY,
                        0 - this.innerX,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos,
                        Math.abs(this.innerX),
                        this.imageHeight
                    );

                } else {
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        0,
                        0 - this.innerX,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos + this.innerY,
                        Math.abs(this.innerX),
                        this.imageHeight
                    );
                }

                let increasingY = this.yPos + this.imageHeight;
                for (let j = 0; j < rows; j++) {
                    if (j < rows - 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            0 - this.innerX,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.innerY + increasingY,
                            Math.abs(this.innerX),
                            this.imageHeight
                        );
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            0 - this.innerX,
                            this.heightOfFrame - this.innerY,
                            increasingX + this.innerX,
                            this.innerY + increasingY,
                            Math.abs(this.innerX),
                            this.imageHeight - this.innerY
                        );
                    }
                    increasingY += this.imageHeight;
                }

            } else if (i === columns - 1 && this.innerX > 0) {
                if (this.innerY <= 0) {
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        this.innerY * -1,
                        this.imageWidth - this.innerX,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos,
                        this.imageWidth - this.innerX,
                        this.imageHeight
                    );

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        0,
                        this.imageWidth - this.innerX,
                        this.innerY * -1,
                        increasingX + this.innerX,
                        this.yPos + this.imageHeight + (rows * this.imageHeight),
                        this.imageWidth - this.innerX,
                        this.innerY
                    );

                } else if (this.innerY > 0) {
                    ///////HERE
                    if (this.repeatY > 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            this.imageWidth - this.innerX,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.yPos + this.innerY,
                            this.imageWidth - this.innerX,
                            this.imageHeight
                        );
                    } else {
                        ////////////////?????????
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            this.innerY * -1,
                            this.imageWidth - this.innerX,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.yPos,
                            this.imageWidth - this.innerX,
                            this.imageHeight
                        );
                    }

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        this.imageHeight - this.innerY,
                        this.imageWidth - this.innerX,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos,
                        this.imageWidth - this.innerX,
                        this.imageHeight
                    );
                } else {
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        0,
                        this.imageWidth - this.innerX,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos + this.innerY,
                        this.imageWidth - this.innerX,
                        this.imageHeight
                    );
                }

                let increasingY = this.yPos + this.imageHeight;
                for (let j = 0; j < rows; j++) {
                    if (j < rows - 1) {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            this.imageWidth - this.innerX,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.innerY + increasingY,
                            this.imageWidth - this.innerX,
                            this.imageHeight
                        );
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            this.imageWidth - this.innerX,
                            this.heightOfFrame - this.innerY,
                            increasingX + this.innerX,
                            this.innerY + increasingY,
                            this.imageWidth - this.innerX,
                            this.imageHeight - this.innerY
                        );
                    }
                    increasingY += this.imageHeight;
                }


            } else if (i === columns && this.innerX > 0) {

            }
            else {////////////////////////////// ALL The tiles in the middle
                if (this.innerY <= 0) {

                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        this.innerY * -1,
                        this.widthOfFrame,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos,
                        this.imageWidth,
                        this.imageHeight
                    );


                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        0,
                        this.widthOfFrame,
                        this.innerY * -1,
                        increasingX + this.innerX,
                        this.yPos + this.imageHeight + (rows * this.imageHeight),
                        this.imageWidth,
                        this.innerY
                    );

                } else if (this.innerY > 0) {
                    if (this.repeatY > 1) {
                        this.drawImage(increasingX + this.innerX, this.yPos + this.innerY);
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            this.innerY * -1,
                            this.widthOfFrame,
                            this.heightOfFrame,
                            increasingX + this.innerX,
                            this.yPos,
                            this.imageWidth,
                            this.imageHeight
                        );
                    }
                    s2pd.ctx.drawImage(
                        this.theImage,
                        this.theFormula,
                        this.imageHeight - this.innerY,
                        this.imageWidth,
                        this.heightOfFrame,
                        increasingX + this.innerX,
                        this.yPos,
                        this.imageWidth,
                        this.imageHeight
                    );


                } else {
                    this.drawImage(increasingX + this.innerX, this.yPos + this.innerY)
                }
                let increasingY = this.yPos + this.imageHeight;
                for (let j = 0; j < rows; j++) {
                    if (j < rows - 1) {
                        this.drawImage(increasingX + this.innerX, increasingY + this.innerY)
                    } else {
                        s2pd.ctx.drawImage(
                            this.theImage,
                            this.theFormula,
                            0,
                            this.widthOfFrame,
                            this.heightOfFrame - this.innerY,
                            increasingX + this.innerX,
                            this.innerY + increasingY,
                            this.imageWidth,
                            this.imageHeight - this.innerY
                        );
                    }
                    increasingY += this.imageHeight;
                }
            }
            increasingX += this.imageWidth;
        }





        s2pd.ctx.globalAlpha = 1;
        if (this.jumping) {
            s2pd.jump(this, this.jumpHeight, this.jumpLength);
        }
        if (this.dragging) {
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
            this.innerX += this.innerVelX;
            this.innerY += this.innerVelY;

            this.hitBoxX = this.xPos;
            this.hitBoxY = this.yPos;
            this.hitBoxWidth = this.width;
            this.hitBoxHeight = this.height;

        }

        this.timeThroughLoop += 1;
    }
    /**
     * 
     * @param {string} name - A name to call the animation by.
     * @param {number} startFrame - Frame in the sprite sheet at which the animation should start.
     * @param {number} numberOfFrames - The number of frames frames in the animation 
     * @example
     * rabbit.addAnimation('jump', 3,9);
     * creates a 9 frame animation starting a frame 3.
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
        for (let i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                this.currentAnimation = i;
            }
        }
    }
    drawImage(x, y) {
        s2pd.ctx.drawImage(
            this.theImage,
            this.theFormula,
            0,
            this.widthOfFrame,
            this.heightOfFrame,
            x,
            y,
            this.imageWidth,
            this.imageHeight
        );
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
    *
    * @param {function} callback - What to do when mouse is held down over object or object is touched.
    * @example
    * tile.onHold(()=>{
    *   tile.color = s.getRandomColor()
    * })
    */
    onHold(callback) {
        this.holdFunction = callback;
        if (!s2pd.holdableObjects.includes(this)) {
            s2pd.holdableObjects.push(this)
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
        blockify ? this.block = true : this.block = false;
        s2pd.platforms.push(this)
    }
    /**
     * Disable the sprites ability to be a platform. 
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

        if (s2pd.gravity.includes(this)) {
            this.gravity = true;
            this.accelerating = 0;
            !gravity ? this.gravityLevel = 14 : this.gravityLevel = gravity;
            this.originalGravityLevel = this.gravityLevel;
            this.accelerationRate = this.originalGravityLevel * .05;
        } else {
            s2pd.gravity.push(this);
            this.gravity = true;
            this.accelerating = 0;
            !gravity ? this.gravityLevel = 14 : this.gravityLevel = gravity;
            this.originalGravityLevel = this.gravityLevel;
            this.accelerationRate = this.originalGravityLevel * .05;
        }

    }
    /**
     * turns of gravity on object.
     */
    noGravity() {
        this.gravity = false;
        for (let i = 0; i < s2pd.gravity.length; i++) {
            s2pd.gravity[i] === this ? s2pd.gravity.splice(i, 1) : undefined
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
     * tile.feelGravity(10);
     * tile.jump(200,true)
     */
    jump(howHigh, noDoubleJumps) {
        if (this.gravity) {
            noDoubleJumps ? this.noDoubleJumps = true : this.noDoubleJumps = false;
            if (!this.noDoubleJumps) {
                this.accelerationRate = this.originalGravityLevel * .05;
                this.velY = 0;
                this.jumpStart = this.yPos;
                this.jumpHeight = howHigh;
                this.jumping = true;
            } else {
                if (this.landed) {
                    this.accelerationRate = this.originalGravityLevel * .05;
                    this.velY = 0;
                    this.jumpStart = this.yPos;
                    this.jumpHeight = howHigh;
                    this.jumping = true;
                }
            }
        } else {
            console.warn('object.feelGravity() must be called for jump to work. 😇')
        }

    }
    /**
 * Remove all references to object. 
 * 
 */
    destroy() {
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
        }
        searchAndDestroy(s2pd.allBackgrounds);
        searchAndDestroy(s2pd.allGameObjects);
        searchAndDestroy(s2pd.hitDetectObjects);
        searchAndDestroy(s2pd.holdableObjects);
        searchAndDestroy(s2pd.gravity);
        searchAndDestroy(s2pd.platforms)
        s2pd.delete(this);
    }
}

export default Tile;