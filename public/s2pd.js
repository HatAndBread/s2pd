export default function s2pd() {
  const s2pd = {
    touching: false,
    allAudioObjects: [],
    loadedAudio: [],
    allGameObjects: [],
    allBackgrounds: [],
    clickableObjects: [],
    draggableObjects: [],
    dragArray: [],
    holdableObjects: [],
    hitDetectObjects: [],
    dragStarted: false,
    draggingWithMouse: true,
    holdStarted: false,
    clear: false,
    mouseX: null,
    mouseY: null,
    touchX: null,
    touchY: null,
    touchMoveX: null,
    touchMoveY: null,
    touchEndX: null,
    touchEndY: null,
    objectsToLoad: [],
    orientation: undefined,
    exit: false,
    enableDragAndDrop: true,
    firstTimeThroughLoop: true,
    canvas: null,
    ctx: null,

    loadSprites: function () {
      let loadedSprites = 0;
      const loaded = (sprite) => {
        loadedSprites += 1;
        s2pd.finalize(sprite);
        sprite.make();
        if (s2pd.objectsToLoad.length === loadedSprites) {
          console.log('all sprites loaded');
        }
      };
      for (let i = 0; i < s2pd.objectsToLoad.length; i++) {
        s2pd.objectsToLoad[i].theImage.src = s2pd.objectsToLoad[i].source;
        s2pd.objectsToLoad[i].theImage.addEventListener('load', () => {
          loaded(s2pd.objectsToLoad[i]);
        });
      }
    },
    createCanvas: function (id, width, height) {
      s2pd.canvas = document.createElement('canvas');
      s2pd.canvas.id = id;
      s2pd.canvas.width = width;
      s2pd.canvas.height = height;
      document.body.appendChild(s2pd.canvas);
      s2pd.ctx = s2pd.canvas.getContext('2d');
      s2pd.width = width;
      s2pd.height = height;
    },
    addCanvas: function (id, width, height) {
      s2pd.canvas = document.getElementById(id);
      s2pd.canvas.width = width;
      s2pd.canvas.height = height;
      s2pd.ctx = s2pd.canvas.getContext('2d');
      s2pd.width = width;
      s2pd.height = height;
    },

    stillCanvas: function () {
      s2pd.canvas.style.touchAction = 'none';
    },
    loop: function (game) {
      if (s2pd.clear) {
        s2pd.ctx.clearRect(0, 0, s2pd.width, s2pd.height);
      }

      for (let i = 0; i < s2pd.allAudioObjects.length; i++) {
        if (s2pd.allAudioObjects[i].ended) {
          s2pd.allAudioObjects.nowPlaying = false;
        }
      }
      for (let i = 0; i < s2pd.allBackgrounds.length; i++) {
        s2pd.allBackgrounds[i].make();
        s2pd.allBackgrounds[i].id = i;
        s2pd.allBackgrounds[i].updatePos();
        s2pd.allBackgrounds[i].autoSize();
      }
      for (let i = 0; i < s2pd.allGameObjects.length; i++) {
        s2pd.allGameObjects[i].make();
        s2pd.allGameObjects[i].id = i;
        s2pd.allGameObjects[i].updatePos();
      }
      for (let i = 0; i < s2pd.clickableObjects.length; i++) {
        s2pd.clickableObjects[i].clickableId = i;
      }
      if (s2pd.hitDetectObjects.length > 0) {
        for (let i = 0; i < s2pd.hitDetectObjects.length; i++) {
          s2pd.hitDetectObjects[i].hitBoxId = i;
        }
      }
      if (s2pd.enableDragAndDrop) {
        for (let i = 0; i < s2pd.draggableObjects.length; i++) {
          s2pd.draggableObjects[i].draggableId = i;
        }
      }
      const errorMessage =
        'The loop() method requires a callback function😭 Example ===> loop(function(){//do something})';
      if (game) {
        if (typeof game === 'function') {
          game();
        } else {
          console.error(errorMessage);
          s2pd.exit = true;
        }
      } else {
        console.error(errorMessage);
        s2pd.exit = true;
      }

      if (s2pd.hitDetectObjects.length > 1) {
        for (let i = 0; i < s2pd.hitDetectObjects.length; i++) {
          for (let j = 0; j < s2pd.hitDetectObjects.length; j++) {
            if (i !== j) {
              if (
                s2pd.hitDetectObjects[i].hitBoxX <=
                  s2pd.hitDetectObjects[j].hitBoxX + s2pd.hitDetectObjects[j].hitBoxWidth &&
                s2pd.hitDetectObjects[i].hitBoxX + s2pd.hitDetectObjects[i].hitBoxWidth >=
                  s2pd.hitDetectObjects[j].hitBoxX &&
                s2pd.hitDetectObjects[i].hitBoxY <=
                  s2pd.hitDetectObjects[j].hitBoxY + s2pd.hitDetectObjects[j].hitBoxHeight &&
                s2pd.hitDetectObjects[i].hitBoxY + s2pd.hitDetectObjects[i].hitBoxHeight >=
                  s2pd.hitDetectObjects[j].hitBoxY
              ) {
                let hitObject1 = s2pd.hitDetectObjects[i];
                let hitObject2 = s2pd.hitDetectObjects[j];

                const event = new CustomEvent('collision', { detail: [hitObject1, hitObject2] });
                document.dispatchEvent(event);
                break;
              }
            }
          }
        }
      }

      if (!s2pd.exit) {
        requestAnimationFrame(function () {
          s2pd.loop(game);
        });
      }
    },

    enableAudio: function () {
      s2pd.audioContext = new AudioContext();
    },

    backgroundColor: function (r, g, b, a) {
      if (a || a === 0) {
        s2pd.canvas.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
      } else {
        s2pd.canvas.style.backgroundColor = `rgb(${r},${g},${b})`;
      }
    },
    transparent: function () {
      s2pd.canvas.style.backgroundColor = `rgba(0,0,0,0)`;
    },
    choose: function (option1, option2) {
      let chooser = Math.floor(Math.random() * 2);
      if (chooser === 0) {
        return option1;
      }
      if (chooser === 1) {
        return option2;
      }
    },
    ///01. get a random integer between two numbers.
    randomBetween: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /// get a random integer between two numbers excluding zero (example between -10 and 10 except for zero)
    roundToDecimals: function (num, howManyDecimals) {
      let multiplier;
      switch (howManyDecimals) {
        case 0:
          return (multiplier = 1);

        case 1:
          multiplier = 10;
          break;
        case 2:
          multiplier = 100;
          break;
        case 3:
          multiplier = 1000;
          break;
        case 4:
          multiplier = 10000;
          break;
        case 5:
          multiplier = 100000;
          break;
        case 6:
          multiplier = 1000000;
          break;
        default:
          multiplier = 100;
          console.log('choose a valid number idiot');
          break;
      }

      return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
    },

    ///02. random no repeat array
    //get random elements from an arrray witout repeating.
    // must call it with arrayToBeRandomized as the array you want randomized,
    //and accompanyingArray as an empty array unique to the array to be randomized.
    // EXAMPLE: getRandomNoRepeatLoop(myArray, myArrayEmpty)
    getRandomNoRepeatLoop: function (arrayToBeRandomized, accompanyingArray, theWord, theNumber) {
      if (arrayToBeRandomized.length > 0) {
        theNumber = Math.floor(Math.random() * arrayToBeRandomized.length);
        theWord = arrayToBeRandomized[theNumber];
        accompanyingArray.push(theWord);
        arrayToBeRandomized.splice(theNumber, 1);
        return theWord;
      } else {
        for (let c = 0; c < accompanyingArray.length; c++) {
          arrayToBeRandomized.push(accompanyingArray[c]);
          if (c === accompanyingArray.length - 1) {
            accompanyingArray.splice(0, accompanyingArray.length);
            theNumber = Math.floor(Math.random() * arrayToBeRandomized.length);
            theWord = arrayToBeRandomized[theNumber];
            accompanyingArray.push(theWord);
            arrayToBeRandomized.splice(theNumber, 1);
            return theWord;
          }
        }
      }
    },

    ///03. getRandomColor
    getRandomColor: function () {
      return `rgb(${this.randomBetween(0, 255)},${this.randomBetween(0, 255)},${this.randomBetween(0, 255)})`;
    },

    ///04. return a random integer without any repeats between a range. when every number has been used will start over with the same set of numbers.
    ///
    ///  const newSet = new NoRepeatIntegerSet (15,30)
    ///  console.log(newSet.getNum()) <---- logs a random number between 15 and 30 without repeating itself
    ///                                     until all numbers within the range have been used.

    NoRepeatIntegerSet: class {
      constructor(min, max) {
        this.max = max;
        this.min = min;
        this.originalMax = max;
        this.originalMin = min;
        this.numArray = [];
        this.randomizedArray = [];
        this.arrayWidth = this.originalMax - this.originalMin;
        this.numnum = 0;
        this.numnum2 = 0;
        this.numnum3 = 0;
        this.make();
      }
      make() {
        for (let i = 0; i < this.arrayWidth + 1; i++) {
          this.numArray[i] = this.min;
          this.min += 1;
        }
        for (i = 0; i < this.arrayWidth + 1; i++) {
          this.numnum = Math.floor(Math.random() * this.numArray.length);
          this.numnum2 = this.numArray[this.numnum];
          this.randomizedArray.push(this.numnum2);
          this.numArray.splice(this.numnum, 1);
        }
      }
      getNum() {
        if (this.randomizedArray.length > 1) {
          this.numnum3 = this.randomizedArray[0];
          this.randomizedArray.splice(0, 1);
          return this.numnum3;
        }
        if (this.randomizedArray.length === 1) {
          this.numnum3 = this.randomizedArray[0];
          this.randomizedArray.splice(0, 1);
          this.numArray.splice(0, this.numArray.length);
          this.randomizedArray.splice(0, this.randomizedArray.length);
          this.max = this.originalMax;
          this.min = this.originalMin;
          this.numnum = 0;
          this.numnum2 = 0;
          this.make(this.originalMin, this.originalMax);
          return this.numnum3;
        }
      }
    },

    /////Random boolean

    finalize: function (object) {
      if (object instanceof s2pd.Sprite) {
        object.animations.shift();
      }
      if (object instanceof s2pd.Background) {
        s2pd.allBackgrounds.push(object);
      } else {
        s2pd.allGameObjects.push(object);
      }
    },

    jump: function (who, howHigh, howLong) {
      if (howLong < 1) {
        howLong = 1;
      }

      who.jumpFrames += 1;
      if (who.jumpFrames > 0 && who.jumpFrames <= howLong) {
        who.yPos -= howHigh / 10 / howLong;
      } else if (who.jumpFrames > howLong && who.jumpFrames <= howLong * 2) {
        who.yPos -= howHigh / 20 / howLong;
      } else if (who.jumpFrames > howLong * 2 && who.jumpFrames <= howLong * 3) {
        who.yPos -= howHigh / 25 / howLong;
      } else if (who.jumpFrames > howLong * 3 && who.jumpFrames <= howLong * 4) {
        who.yPos -= howHigh / 50 / howLong;
      } else if (who.jumpFrames > howLong * 4 && who.jumpFrames <= howLong * 5) {
        who.yPos += howHigh / 50 / howLong;
      } else if (who.jumpFrames > howLong * 5 && who.jumpFrames <= howLong * 6) {
        who.yPos += howHigh / 25 / howLong;
      } else if (who.jumpFrames > howLong * 6 && who.jumpFrames <= howLong * 7) {
        who.yPos += howHigh / 20 / howLong;
      } else if (who.jumpFrames > howLong * 7 && who.jumpFrames <= howLong * 8) {
        who.yPos += howHigh / 10 / howLong;
      } else {
        who.jumping = false;
        who.jumpFrames = 0;
      }
    },

    /// Sprite must be laid out in a single row with each frame sized equally.
    /// For example, a 10 frame animation with 32 x 32 pixel individual frames must be laid out
    /// in a 320 x 32 file. The library will take care of the rest.
    ///
    ///  const rabbit = new Sprite ('rabbit', 100,100,10,'./rabbits.png',3) **create rabbit at coordinates 100,100.10 frames in file. source. speed (1 to 60 with one being the fastest)
    ///  rabbit.addAnimation('left',0,4) *** add an animation starting at frame 0 and continuing for 4 frames
    ///  rabbit.addAnimation('right',4,4) *** add an animation starting at frame 4 and continuing for 4 frames
    ///  rabbit.addAnimation('stopLeft',8,1) *** add a single frame animation starting at frame 8
    ///  rabbit.addAnimation('stopRight',9,1)  *** add a single frame animation starting at frame 9
    ///  finalize(rabbit)

    Sprite: class {
      /**
       * Sprite must be laid out in a single horizontal row with each frame sized equally.
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
        this.source = source;
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
        this.theImage = document.createElement('img');
        this.load();
      }
      load() {
        s2pd.objectsToLoad.push(this);
      }
      make() {
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
      stop() {
        this.velX = 0;
        this.velY = 0;
      }

      updatePos() {
        s2pd.allGameObjects[this.id] = this;
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
      updateOpacity(howMuch) {
        this.opacity = howMuch;
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
    },

    Background: class {
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
    },

    // ***********************TEXT*****************************

    Text: class {
      constructor(text, xPos, yPos, font, size, color, thickness, innerColor) {
        this.text = text;
        this.xPos = xPos;
        this.yPos = yPos;
        this.font = font;
        this.size = size;
        this.color = color;
        this.thickness = thickness;
        this.innerColor = innerColor;
        this.velX = 0;
        this.velY = 0;
        this.opacity = 1;
        this.timeStamp = Date.now();
        s2pd.finalize(this);

        this.make();
      }
      make() {
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
      }
      updatePos() {
        s2pd.allGameObjects[this.id] = this;

        if (this.dragging === true) {
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
    },

    Circle: class {
      constructor(xPos, yPos, radius, color, thickness) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
        this.thickness = thickness;
        this.velX = 0;
        this.velY = 0;
        this.opacity = 1;
        this.outline = false;
        this.outlineThickness = 0;
        this.outlineColor = 'rgb(0,0,0)';
        this.timeStamp = Date.now();
        s2pd.finalize(this);
        this.make();
      }

      make() {
        this.hitBoxWidth = this.radius * 2;
        this.hitBoxHeight = this.radius * 2;
        this.hitBoxX = this.xPos - this.radius;
        this.hitBoxY = this.yPos - this.radius;
        if (typeof this.thickness === 'number') {
          s2pd.ctx.beginPath();
          s2pd.ctx.globalAlpha = this.opacity;
          s2pd.ctx.strokeStyle = this.color;
          s2pd.ctx.lineWidth = this.thickness;
          s2pd.ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
          s2pd.ctx.stroke();
          s2pd.ctx.globalAlpha = 1;
        } else {
          s2pd.ctx.beginPath();
          s2pd.ctx.globalAlpha = this.opacity;
          s2pd.ctx.fillStyle = this.color;
          s2pd.ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
          s2pd.ctx.fill();
          s2pd.ctx.globalAlpha = 1;
          if (this.outline) {
            s2pd.ctx.strokeStyle = this.outlineColor;
            s2pd.ctx.lineWidth = this.outlineThickness;
            s2pd.ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
            s2pd.ctx.stroke();
          }
        }
        if (this.jumping) {
          s2pd.jump(this, this.jumpHeight, this.jumpLength);
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
      moveTo(newX, newY) {
        this.xPos = newX;
        this.yPos = newY;
      }
      stop() {
        this.velX = 0;
        this.velY = 0;
      }
      jump(howMuch, howLong) {
        this.jumpHeight = howMuch;
        this.jumpLength = howLong;
        this.jumpFrames = 0;
        this.jumping = true;
      }
      updatePos() {
        s2pd.allGameObjects[this.id] = this;
        s2pd.hitDetectObjects[this.hitBoxId] = this;

        if (this.dragging) {
          s2pd.dragArray[0] = this;
          if (s2pd.draggingWithMouse) {
            this.xPos = s2pd.mouseX;
            this.yPos = s2pd.mouseY;
          } else {
            this.xPos = s2pd.touchMoveX;
            this.yPos = s2pd.touchMoveY;
          }
        } else {
          this.xPos += this.velX;
          this.yPos += this.velY;
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
    },

    Rectangle: class {
      constructor(xPos, yPos, width, height, color, thickness) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velX = 0;
        this.velY = 0;
        this.thickness = thickness;
        this.opacity = 1;
        this.outline = false;
        this.outlineThickness = 0;
        this.outlineColor = 'rgb(0,0,0)';
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;
        this.timeStamp = Date.now();
        s2pd.finalize(this);
        this.make();
      }

      make() {
        this.hitBoxX = this.xPos;
        this.hitBoxY = this.yPos;
        this.hitBoxWidth = this.width;
        this.hitBoxHeight = this.height;
        if (typeof this.thickness === 'number') {
          s2pd.ctx.globalAlpha = this.opacity;
          s2pd.ctx.strokeStyle = this.color;
          s2pd.ctx.lineWidth = this.thickness;
          s2pd.ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
          s2pd.ctx.globalAlpha = 1;
        } else {
          s2pd.ctx.globalAlpha = this.opacity;
          s2pd.ctx.fillStyle = this.color;
          s2pd.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
          s2pd.ctx.globalAlpha = 1;
          if (this.outline) {
            s2pd.ctx.globalAlpha = this.opacity;
            s2pd.ctx.strokeStyle = this.outlineColor;
            s2pd.ctx.lineWidth = this.outlineThickness;
            s2pd.ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
            s2pd.ctx.globalAlpha = 1;
          }
        }
        if (this.jumping) {
          s2pd.jump(this, this.jumpHeight, this.jumpLength);
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
      updatePos() {
        s2pd.allGameObjects[this.id] = this;
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
      }
      updateSize(howMuch) {
        if (howMuch < 0) {
          if (this.width > howMuch * -1) {
            this.width *= howMuch;
          }
          if (this.height > howMuch * -1) {
            this.height *= howMuch;
          }
        } else {
          this.width *= howMuch;
          this.height *= howMuch;
        }
      }
      updateOpacity(howMuch) {
        if (howMuch < 0) {
          if (this.opacity > howMuch * -1) {
            this.opacity += howMuch;
          }
        } else {
          this.opacity = howMuch;
        }
      }
      addOutline(color, thickness) {
        this.outline = true;
        this.outlineColor = color;
        this.outlineThickness = thickness;
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
    },

    Line: class {
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
    },

    Ellipse: class {
      constructor(xPos, yPos, radiusX, radiusY, rotation, color, thickness) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
        this.color = color;
        this.velX = 0;
        this.velY = 0;
        this.opacity = 1;
        this.thickness = thickness;
        this.timeStamp = Date.now();
        s2pd.finalize(this);
        this.make();
      }
      make() {
        if (this.rotation >= Math.PI * 2) {
          this.rotation = this.rotation % Math.PI;
          console.log(this.rotation);
        }
        if (
          (this.rotation > Math.PI * 0.25 && this.rotation < Math.PI * 0.75) ||
          (this.rotation > Math.PI * 1.25 && this.rotation < Math.PI * 1.75)
        ) {
          this.hitBoxX = this.xPos - this.radiusY;
          this.hitBoxY = this.yPos - this.radiusX;
          this.hitBoxHeight = this.radiusX * 2;
          this.hitBoxWidth = this.radiusY * 2;
        } else {
          this.hitBoxWidth = this.radiusX * 2;
          this.hitBoxHeight = this.radiusY * 2;
          this.hitBoxX = this.xPos - this.radiusX;
          this.hitBoxY = this.yPos - this.radiusY;
        }

        if (typeof this.thickness === 'number') {
          s2pd.ctx.strokeStyle = this.color;
          s2pd.ctx.lineWidth = this.thickness;
          s2pd.ctx.beginPath();
          s2pd.ctx.ellipse(this.xPos, this.yPos, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
          s2pd.ctx.stroke();
        } else {
          s2pd.ctx.fillStyle = this.color;
          s2pd.ctx.beginPath();
          s2pd.ctx.ellipse(this.xPos, this.yPos, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
          s2pd.ctx.fill();
        }
        if (this.jumping) {
          s2pd.jump(this, this.jumpHeight, this.jumpLength);
        }
      }
      updatePos() {
        s2pd.allGameObjects[this.id] = this;

        if (this.dragging) {
          console.log('yo how it going?');
          s2pd.dragArray[0] = this;
          if (s2pd.draggingWithMouse) {
            this.xPos = s2pd.mouseX;
            this.yPos = s2pd.mouseY;
          } else {
            this.xPos = s2pd.touchMoveX;
            this.yPos = s2pd.touchMoveY;
          }
        } else {
          this.xPos += this.velX;
          this.yPos += this.velY;
        }
      }
      jump(howMuch, howLong) {
        this.jumpHeight = howMuch;
        this.jumpLength = howLong;
        this.jumpFrames = 0;
        this.jumping = true;
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
    },
    ////// *******************WEB AUDIO ***********************
    //////

    Sound: class {
      constructor(source, volume, playbackRate, detune, loop) {
        this.source = source;
        this.volume = volume;
        this.detune = detune;
        this.playbackRate = playbackRate;
        this.loop = loop;
        this.delayTime = 0;
        this.startTime;
        this.pauseTime = 0;
        this.pauseStartTime = 0;
        this.pauseDuration = 0;
        this.gainNode;
        this.distortionGainNode;
        this.distortionNode;
        this.distortionAmount;
        this.distortionOn = false;
        this.duration;
        this.delayNode;
        this.theSound;
        this.playSound;
        this.reverse = false;
        this.loaded = false;
        this.fileSize = 0;
        this.amountLoaded = 0;
        this.loaded = false;
        this.totallyLoaded = false;
        this.load();
      }
      load() {
        let getSound = new XMLHttpRequest();
        let theSound;
        let self = this;
        getSound.open('GET', this.source, true);
        getSound.responseType = 'arraybuffer';
        getSound.onload = function () {
          s2pd.audioContext.decodeAudioData(getSound.response, function (buffer) {
            theSound = buffer;
            self.theSound = theSound;
            self.loaded = true;
          });
        };
        getSound.addEventListener(
          'progress',
          function (evt) {
            if (evt.lengthComputable) {
              self.fileSize = evt.total;
              self.amountLoaded = evt.loaded;
            }
          },
          false
        );

        getSound.onloadend = function () {
          console.log(self + ' loaded');
          self.totallyLoaded = true;
          s2pd.loadedAudio.push(self);
        };
        getSound.send();
        s2pd.allAudioObjects.push(self);
      }
      play() {
        if (this.distortionOn) {
          this.playSound = s2pd.audioContext.createBufferSource();
          this.gainNode = s2pd.audioContext.createGain();
          this.delayNode = s2pd.audioContext.createDelay();
          this.distortionGainNode = s2pd.audioContext.createGain();
          this.distortionNode = s2pd.audioContext.createWaveShaper();
          this.distortionNode.curve = this.distortionCurve(this.distortionAmount);
          this.gainNode.gain.value = this.volume;
          this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
          this.playSound.buffer = this.theSound;
          this.playSound.connect(this.gainNode);
          this.gainNode.connect(this.distortionGainNode);
          this.distortionGainNode.connect(this.distortionNode);
          this.distortionNode.connect(this.delayNode);
          this.delayNode.connect(s2pd.audioContext.destination);
          this.playSound.playbackRate.value = this.playbackRate;
          this.playSound.detune.value = this.detune;
          this.playSound.start(0, this.pauseTime);
          this.duration = this.playSound.buffer.duration;
          this.startTime = Date.now();
          if (this.loop) {
            this.playSound.loop = true;
          }
        } else {
          this.playSound = s2pd.audioContext.createBufferSource();
          this.gainNode = s2pd.audioContext.createGain();
          this.delayNode = s2pd.audioContext.createDelay();
          this.gainNode.gain.value = this.volume;
          this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
          this.playSound.buffer = this.theSound;
          this.playSound.connect(this.gainNode);
          this.gainNode.connect(this.delayNode);
          this.delayNode.connect(s2pd.audioContext.destination);
          this.playSound.playbackRate.value = this.playbackRate;
          this.playSound.detune.value = this.detune;
          this.playSound.start(0, this.pauseTime);
          this.duration = this.playSound.buffer.duration;
          this.startTime = Date.now();
          if (this.loop) {
            this.playSound.loop = true;
          }
        }
      }
      stop() {
        this.playSound.stop();
      }
      pause() {
        this.pauseStartTime = Date.now();
        this.playSound.stop();
        this.pauseTime = (Date.now() - this.startTime) / 1000;
        let dividy = this.pauseTime / this.duration;
        this.pauseTime = this.duration * (dividy - Math.floor(dividy));
      }
      unpause() {
        if (this.distortionOn) {
          this.pauseDuration = Date.now() - this.pauseStartTime;
          this.startTime += this.pauseDuration;
          this.playSound = s2pd.audioContext.createBufferSource();
          this.gainNode = s2pd.audioContext.createGain();
          this.delayNode = s2pd.audioContext.createDelay();
          this.distortionGainNode = s2pd.audioContext.createGain();
          this.distortionNode = s2pd.audioContext.createWaveShaper();
          this.distortionNode.curve = this.distortionCurve(this.distortionAmount);
          this.gainNode.gain.value = this.volume;
          this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
          this.playSound.buffer = this.theSound;
          this.playSound.connect(this.gainNode);
          this.gainNode.connect(this.distortionGainNode);
          this.distortionGainNode.connect(this.distortionNode);
          this.distortionNode.connect(this.delayNode);
          this.delayNode.connect(s2pd.audioContext.destination);
          this.playSound.playbackRate.value = this.playbackRate;
          this.playSound.detune.value = this.detune;
          this.playSound.start(0, this.pauseTime);
          if (this.loop) {
            this.playSound.loop = true;
          }
        } else {
          this.pauseDuration = Date.now() - this.pauseStartTime;
          this.startTime += this.pauseDuration;
          this.playSound = s2pd.audioContext.createBufferSource();
          this.gainNode = s2pd.audioContext.createGain();
          this.delayNode = s2pd.audioContext.createDelay();
          this.gainNode.gain.value = this.volume;
          this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
          this.playSound.buffer = this.theSound;
          this.playSound.connect(this.gainNode);
          this.gainNode.connect(this.delayNode);
          this.delayNode.connect(s2pd.audioContext.destination);
          this.playSound.playbackRate.value = this.playbackRate;
          this.playSound.detune.value = this.detune;
          this.playSound.start(0, this.pauseTime);
          if (this.loop) {
            this.playSound.loop = true;
          }
        }
      }
      updateVolume(howMuch) {
        this.volume = howMuch;
        this.gainNode.gain.value = howMuch;
      }
      updatePlaybackRate(howMuch) {
        this.playbackRate = howMuch;
        this.playSound.playbackRate.value = howMuch;
      }
      updateDetune(howMuch) {
        this.detune = howMuch;
        this.playSound.detune.value = howMuch;
      }

      updateDelay(howMuch) {
        this.delayTime = howMuch;
        this.delayNode.delayTime.setValueAtTime(howMuch, s2pd.audioContext.currentTime);
      }
      updateDistortion(howMuch) {
        this.distortionAmount = howMuch;
        this.distortionNode.curve = this.distortionCurve(howMuch);
      }
      cancelLoop() {
        this.playSound.loop = false;
        this.loop = false;
      }
      makeLoop() {
        this.playSound.loop = true;
        this.loop = true;
      }
      reverse() {
        this.reverse = true;
      }
      distortionCurve(howMuch) {
        let k = howMuch,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          i = 0,
          x;
        for (; i < n_samples; ++i) {
          x = (i * 2) / n_samples - 1;
          curve[i] = ((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) / (Math.PI + k * Math.abs(x));
        }
        return curve;
      }
      addDistortion(howMuch) {
        this.distortionOn = true;
        this.distortionAmount = howMuch;
      }
    },

    ///// ****************SYNTH****************

    Synth: class {
      constructor(waveForm, gain, delay) {
        this.waveForm = waveForm;
        this.gain = gain;
        this.delay = delay;
        this.playing = false;
        this.oscillator;
        this.gainNode;
        this.delayNode;
        this.distortionGainNode;
        this.distortionNode;
        this.distortionAmount;
        this.distortionOn = false;
      }
      play(frequency) {
        if (this.distortionOn) {
          this.oscillator = s2pd.audioContext.createOscillator();
          this.gainNode = s2pd.audioContext.createGain();
          this.delayNode = s2pd.audioContext.createDelay();
          this.convolverNode = s2pd.audioContext.createConvolver;
          this.distortionGainNode = s2pd.audioContext.createGain();
          this.distortionNode = s2pd.audioContext.createWaveShaper();
          this.distortionNode.curve = this.distortionCurve(this.distortionAmount);
          this.oscillator.frequency.setValueAtTime(frequency, s2pd.audioContext.currentTime);
          this.gainNode.gain.value = this.gain;
          this.delayNode.delayTime.setValueAtTime(this.delay, s2pd.audioContext.currentTime);
          this.oscillator.connect(this.gainNode);
          this.gainNode.connect(this.distortionGainNode);
          this.distortionGainNode.connect(this.distortionNode);
          this.distortionNode.connect(this.delayNode);
          this.delayNode.connect(s2pd.audioContext.destination);
          this.oscillator.start();
        } else {
          this.oscillator = s2pd.audioContext.createOscillator();
          this.gainNode = s2pd.audioContext.createGain();
          this.delayNode = s2pd.audioContext.createDelay();
          this.oscillator.frequency.setValueAtTime(frequency, s2pd.audioContext.currentTime);
          this.gainNode.gain.value = this.gain;
          this.delayNode.delayTime.setValueAtTime(this.delay, s2pd.audioContext.currentTime);
          this.oscillator.connect(this.gainNode);
          this.gainNode.connect(this.delayNode);
          this.delayNode.connect(s2pd.audioContext.destination);
          this.oscillator.start();
        }
      }
      stop() {
        this.oscillator.stop();
      }
      updateFrequency(frequency) {
        this.oscillator.frequency.setValueAtTime(frequency, s2pd.audioContext.currentTime);
      }
      updateGain(gain) {
        this.gainNode.gain.value = gain;
      }
      updateDelay(delay) {
        this.delayNode.delayTime.setValueAtTime(delay, s2pd.audioContext.currentTime);
      }
      updateDistortion(howMuch) {
        this.distortionAmount = howMuch;
        this.distortionNode.curve = this.distortionCurve(howMuch);
      }
      distortionCurve(howMuch) {
        let k = howMuch,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          i = 0,
          x;
        for (; i < n_samples; ++i) {
          x = (i * 2) / n_samples - 1;
          curve[i] = ((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) / (Math.PI + k * Math.abs(x));
        }
        return curve;
      }
      addDistortion(howMuch) {
        this.distortionOn = true;
        this.distortionAmount = howMuch;
      }
    },

    ////////**************CONTROLS******************* */

    ////////**************MOUSE METHODS******************* */
    mouseMove: function (event) {
      if (s2pd.dragStarted === true) {
        let canvasPos = s2pd.canvas.getBoundingClientRect();
        s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
        s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
      }
    },

    mouseDown: function (event) {
      if (s2pd.enableDragAndDrop === true) {
        let clickedObject;
        let draggableOrNot = false;
        let canvasPos = s2pd.canvas.getBoundingClientRect();
        s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
        s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
        for (let i = 0; i < s2pd.draggableObjects.length; i++) {
          if (
            s2pd.mouseX >= s2pd.draggableObjects[i].hitBoxX &&
            s2pd.mouseY >= s2pd.draggableObjects[i].hitBoxY &&
            s2pd.mouseX <= s2pd.draggableObjects[i].hitBoxX + s2pd.draggableObjects[i].hitBoxWidth &&
            s2pd.mouseY <= s2pd.draggableObjects[i].hitBoxY + s2pd.draggableObjects[i].hitBoxHeight
          ) {
            s2pd.dragStarted = true;
            draggableOrNot = true;
            s2pd.draggingWithMouse = true;

            if (draggableOrNot) {
              clickedObject = s2pd.draggableObjects[i];
              console.log(clickedObject);
              clickedObject.dragging = true;
            }
          }
        }
        for (let i = 0; i < s2pd.holdableObjects.length; i++) {
          if (
            s2pd.mouseX >= s2pd.holdableObjects[i].hitBoxX &&
            s2pd.mouseY >= s2pd.holdableObjects[i].hitBoxY &&
            s2pd.mouseX <= s2pd.holdableObjects[i].hitBoxX + s2pd.holdableObjects[i].hitBoxWidth &&
            s2pd.mouseY <= s2pd.holdableObjects[i].hitBoxY + s2pd.holdableObjects[i].hitBoxHeight
          ) {
            s2pd.holdStarted = true;
            clickedObject = s2pd.holdableObjects[i];
            clickedObject.holdDown = true;
          }
        }
      }
    },

    mouseUp: function () {
      if (s2pd.dragStarted) {
        s2pd.dragStarted = false;
        for (let i = 0; i < s2pd.draggableObjects.length; i++) {
          s2pd.draggableObjects[i].dragging = false;
        }
      }
      if (s2pd.holdStarted) {
        for (let i = 0; i < s2pd.holdableObjects.length; i++) {
          if (s2pd.holdableObjects[i].holdDown) {
            s2pd.holdableObjects[i].finishedHolding = true;
            s2pd.holdableObjects[i].holdDown = false;
          }
        }
        s2pd.holdStarted = false;
      }
    },

    mouseClick: function (event) {
      let clickedObject;
      let canvasPos = s2pd.canvas.getBoundingClientRect();
      s2pd.mouseX = Math.floor(event.clientX - canvasPos.left);
      s2pd.mouseY = Math.floor(event.clientY - canvasPos.top);
      console.log(`${s2pd.mouseX} ${s2pd.mouseY}`);
      for (let i = 0; i < s2pd.clickableObjects.length; i++) {
        if (
          s2pd.mouseX >= s2pd.clickableObjects[i].hitBoxX &&
          s2pd.mouseY >= s2pd.clickableObjects[i].hitBoxY &&
          s2pd.mouseX <= s2pd.clickableObjects[i].hitBoxX + s2pd.clickableObjects[i].hitBoxWidth &&
          s2pd.mouseY <= s2pd.clickableObjects[i].hitBoxY + s2pd.clickableObjects[i].hitBoxHeight
        ) {
          clickedObject = s2pd.clickableObjects[i];
          clickedObject.clicked = true;
          if (clickedObject.clickFunction) {
            clickedObject.clickFunction();
          }
        }
      }
    },
    /// Detect keys touched.
    returnKeyCode: function (key) {
      if (typeof key === 'number') {
        key = key.toString();
      } else if (typeof key === 'string') {
        key = key.toLowerCase();
      } else {
        console.error('Type error. This function takes a number or string.');
        s2pd.exit = true;
      }
      switch (key) {
        case 'shift':
          return 16;
        case 'up':
          return 38;
        case 'down':
          return 40;
        case 'left':
          return 37;
        case 'right':
          return 39;
        case 'space':
          return 32;
        case 'enter':
          return 13;
        case 'return':
          return 13;
        case 'esc':
          return 27;
        case 'escape':
          return 27;
        case 'a':
          return 65;
        case 'b':
          return 66;
        case 'c':
          return 67;
        case 'd':
          return 68;
        case 'e':
          return 69;
        case 'f':
          return 70;
        case 'g':
          return 71;
        case 'h':
          return 72;
        case 'i':
          return 73;
        case 'j':
          return 74;
        case 'k':
          return 75;
        case 'l':
          return 76;
        case 'm':
          return 77;
        case 'n':
          return 78;
        case 'o':
          return 79;
        case 'p':
          return 80;
        case 'q':
          return 81;
        case 'r':
          return 82;
        case 's':
          return 83;
        case 't':
          return 84;
        case 'u':
          return 85;
        case 'v':
          return 86;
        case 'w':
          return 87;
        case 'x':
          return 88;
        case 'y':
          return 89;
        case 'z':
          return 90;
        case '1':
          return 49;
        case '2':
          return 50;
        case '3':
          return 51;
        case '4':
          return 52;
        case '5':
          return 53;
        case '6':
          return 54;
        case '7':
          return 55;
        case '8':
          return 56;
        case '9':
          return 57;
        case '0':
          return 48;
        case 'period':
          return 190;
        case ',':
          return 190;
        case 'comma':
          return 188;
        case 'backslash':
          return 220;
        case '/':
          return 220;
        case 'back-slash':
          return 220;
        case 'back slash':
          return 220;
        case 'singlequote':
          return 222;
        case 'single-quote':
          return 222;
        case `'`:
          return 222;
        case 'single quote':
          return 222;
        case 'equal':
          return 187;
        case 'equals':
          return 187;
        case '=':
          return 187;
        case 'semicolon':
          return 186;
        case 'semi-colon':
          return 186;
        case 'semi colon':
          return 186;
        case ';':
          return 186;
        case 'back':
          return 8;
        case 'backspace':
          return 8;
        case 'back-space':
          return 8;
        case 'tab':
          return 9;
        case 'ctrl':
          return 17;
        case 'alt':
          return 18;
        case 'del':
          return 46;
        case 'delete':
          return 46;
        case 'add':
          return 107;
        case '+':
          return 107;
        case 'plus':
          return 107;
        case 'subtract':
          return 109;
        case 'minus':
          return 109;
        case '-':
          return 109;
        default:
          console.error('unknown keycode: ' + key);
          s2pd.exit = true;
          break;
      }
    },
    keyboardUp: null,
    keyboardDown: null,
    keyAction: function (keyboardAction, code, callback) {
      if (keyboardAction === 'up') {
        if (s2pd.keyboardUp === code) {
          callback();
          s2pd.keyboardUp = null;
        }
      } else {
        if (s2pd.keyboardDown === code) {
          callback();
        }
      }
    },
    keyUp: function (key, callback) {
      if (typeof key === 'string') {
        let code = this.returnKeyCode(key);
        s2pd.keyAction('up', code, callback);
      } else {
        s2pd.keyAction('up', key, callback);
      }
    },
    keyDown: function (key, callback) {
      if (typeof key === 'string') {
        let code = this.returnKeyCode(key);
        s2pd.keyAction('down', code, callback);
      } else {
        s2pd.keyAction('down', key, callback);
      }
    },
    keyDownHandler: function (event) {
      s2pd.keyboardDown = event.keyCode;
    },
    keyUpHandler: function (event) {
      s2pd.keyboardDown = null;
      s2pd.keyboardUp = event.keyCode;
    },
    keyboardListeners: function () {
      document.addEventListener('keydown', s2pd.keyDownHandler, false);
      document.addEventListener('keyup', s2pd.keyUpHandler, false);
    },
    mouseListeners: function () {
      document.addEventListener('click', function (event) {
        s2pd.mouseClick(event);
      });
      document.addEventListener('mousemove', function (event) {
        s2pd.mouseMove(event);
      });
      document.addEventListener('mousedown', function (event) {
        s2pd.mouseDown(event);
      });
      document.addEventListener('mouseup', function () {
        s2pd.mouseUp();
      });
      document.addEventListener('pointerdown', function () {
        s2pd.mouseDown(event);
      }); // chrome doesn't use mousedown. must you pointerdown
    },
    touchListeners: function () {
      document.addEventListener(
        'touchstart',
        function (e) {
          s2pd.touching = true;
          s2pd.touchScreen = true;
          // Cache the client X/Y coordinates
          let canvasPos = s2pd.canvas.getBoundingClientRect();
          s2pd.touchX = Math.floor(e.touches[0].clientX - canvasPos.left);
          s2pd.touchY = Math.floor(e.touches[0].clientY - canvasPos.top);
          s2pd.touchMoveX = Math.floor(e.touches[0].clientX - canvasPos.left);
          s2pd.touchMoveY = s2pd.touchY = Math.floor(e.touches[0].clientY - canvasPos.top);
          if (s2pd.enableDragAndDrop === true) {
            let clickedObject;
            let draggableOrNot = false;
            s2pd.dragStarted = true;
            for (let i = 0; i < s2pd.draggableObjects.length; i++) {
              if (
                s2pd.touchX >= s2pd.draggableObjects[i].hitBoxX &&
                s2pd.touchY >= s2pd.draggableObjects[i].hitBoxY &&
                s2pd.touchX <= s2pd.draggableObjects[i].hitBoxX + s2pd.draggableObjects[i].hitBoxWidth &&
                s2pd.touchY <= s2pd.draggableObjects[i].hitBoxY + s2pd.draggableObjects[i].hitBoxHeight
              ) {
                s2pd.draggingWithMouse = false;
                draggableOrNot = true;
                if (draggableOrNot) {
                  clickedObject = s2pd.draggableObjects[i];
                  clickedObject.dragging = true;
                }
              }
            }
          }
        },
        false
      );

      document.addEventListener('touchmove', function (e) {
        let canvasPos = s2pd.canvas.getBoundingClientRect();
        s2pd.touchMoveX = e.touches[0].clientX - canvasPos.left;
        s2pd.touchMoveY = e.touches[0].clientY - canvasPos.top;
      });

      document.addEventListener('touchend', function (e) {
        let canvasPos = s2pd.canvas.getBoundingClientRect();
        s2pd.touchEndX = Math.floor(e.changedTouches[0].clientX - canvasPos.left);
        s2pd.touchEndY = Math.floor(e.changedTouches[0].clientY - canvasPos.top);
        s2pd.touchX = null;
        s2pd.touchY = null;
        s2pd.touchMoveX = null;
        s2pd.touchMoveY = null;
        for (let i = 0; i < s2pd.draggableObjects.length; i++) {
          s2pd.draggableObjects[i].dragging = false;
          s2pd.dragStarted = false;
        }
        s2pd.touching = false;
      });
    }
  };
  s2pd.mouseListeners();
  s2pd.touchListeners();
  s2pd.keyboardListeners();
  if (window.innerWidth < window.innerHeight) {
    s2pd.orientation = 'portrait';
  }
  if (window.innerWidth >= window.innerHeight) {
    s2pd.orientation = 'landscape';
  }
  return s2pd;
}
