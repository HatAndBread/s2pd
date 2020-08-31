import s2pd from './core.js'

/**
 * Tile
 */
class Tile {
    /**
     * 
     * @param {string} source - Image file source. 
     * @param {number=} xPos - Optional! x Position. Default xPos is 0. Make value 'false' to enter further arguments.
     * @param {number=} yPos - Optional! y Position. Default yPos is 0. Make value 'false' to enter further arguments.
     * @param {width=} width - Optional! Width of tile. If no argument default width is canvas width. Make value 'false' to enter further arguments.
     * @param {height=} height - Optional! Height of tile. If no argument default height is canvas height. Make value 'false' to enter further arguments.
     * @param {number=} numberOfFrames - (Only if tile is an animation!)👉　Number of frames in the animation. 
     * @param {number=} animationSpeed - (Only if tile is an animation!)👉 Number of ticks before the next frame is displayed
     * 
     */
    constructor(source, xPos, yPos, width, height, numberOfFrames, animationSpeed) {
        s2pd.objectsToLoad.push(this);
        this.loaded = false;
        !xPos ? this.xPos = 0 : this.xPos = xPos;
        !yPos ? this.yPos = 0 : this.yPos = yPos;
        !width ? this.width = s2pd.width : this.width = width;
        !height ? this.height = s2pd.height : this.height = height;
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
            this.animationSpeed = animationSpeed + (60 % animationSpeed) / Math.floor(60 / animationSpeed);
            this.refreshRate = 60 / animationSpeed;
        }

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
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;
        this.heightOfFrame = this.theImage.height;
        this.widthOfFrame = this.theImage.width / this.numberOfFrames;
        this.theFormula = this.animations[this.currentAnimation].startFrame * this.widthOfFrame + this.currentFrame * this.widthOfFrame;

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
        let columns = Math.ceil(this.width / this.imageWidth);
        let rows = Math.ceil(this.height / this.imageHeight);





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
                    );///////////////////HERE! DRAW ONE AT THE VERY BOTTOM
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
            else {
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
                    this.drawImage(increasingX + this.innerX, this.yPos + this.innerY)
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

}

export default Tile;