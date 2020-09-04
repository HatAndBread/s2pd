import s2pd from './core.js';
import { keyDownEvents, keyUpEvents } from './input/keyboard.js'
import Line from './shapes/line.js'


function executeCollision(collision) {

  if (collision.triggerOnce) {
    if (!collision.triggered) {
      collision.triggered = true;
      collision.callback();
    }
  } else {
    collision.callback();
  }
}


function findCollisionFunction(obj1, obj2, colliding) {
  for (let i = 0; i < s2pd.collisions.length; i++) {
    if (s2pd.collisions[i].obj1 === obj1 && s2pd.collisions[i].obj2 === obj2) {
      if (colliding) {
        executeCollision(s2pd.collisions[i])
      } else {
        s2pd.collisions[i].triggered = false;
      }
    } else if (s2pd.collisions[i].obj1 === obj2 && s2pd.collisions[i].obj2 === obj1) {
      if (colliding) {
        executeCollision(s2pd.collisions[i])
      } else {
        s2pd.collisions[i].triggered = false;
      }
    } else {
    }
  }
}

function distanceFromLine(a, b) {
  let bX = b.hitBoxX + (b.hitBoxWidth / 2)
  let bY = b.hitBoxY + (b.hitBoxY / 2)
  let d = a.distanceFromMe(bX, bY)
  if (d < a.thickness * 0.1) {
    findCollisionFunction(a, b, true)
  } else {
    findCollisionFunction(a, b, false)
  }
}

function checkOverlap(a, b) {
  if (
    a.hitBoxX <=
    b.hitBoxX + b.hitBoxWidth &&
    a.hitBoxX + a.hitBoxWidth >=
    b.hitBoxX &&
    a.hitBoxY <=
    b.hitBoxY + b.hitBoxHeight &&
    a.hitBoxY + a.hitBoxHeight >= b.hitBoxY
  ) {
    return true;
  }
}

function checkPlatforms() {
  for (let i = 0; i < s2pd.platforms.length; i++) {
    for (let j = 0; j < s2pd.gravity.length; j++) {
      let a = s2pd.platforms[i];
      let b = s2pd.gravity[j];

      if (checkOverlap(a, b)) {
        if (a.block) { //prevent sprite from going through solid object

          if (b.yPos < a.hitBoxY && b.xPos > a.hitBoxX - b.hitBoxWidth / 1.2 && b.xPos < a.hitBoxX + a.hitBoxWidth / 1.2) {
            b.landed = true;
            b.velY = 0;
            b.yPos = a.hitBoxY - b.hitBoxHeight;
            b.accelerating = 0;
          } else if (b.xPos <= a.xPos) {
            if (b.yPos > a.hitBoxY + a.hitBoxHeight / 1.2) {
              b.jumping = false;
              b.landed = false;
              b.gravityLevel = b.originalGravityLevel;
            } else {
              b.xPos = a.hitBoxX - b.hitBoxWidth - 1
            }
          } else if (b.xPos >= a.xPos) {
            if (b.yPos > a.hitBoxY + a.hitBoxHeight / 1.2) {
              b.jumping = false;
              b.landed = false;
              b.gravityLevel = b.originalGravityLevel;
            } else {
              b.xPos = a.hitBoxX + a.hitBoxWidth + 1
            }
          }
        } else {
          b.landed = true;
          b.velY = 0;
          b.yPos = a.hitBoxY - b.hitBoxHeight;
          b.accelerating = 0;
        }
      } else {
        b.landed = false;
      }
    }
  }
}
/**
 * Create an animation loop.
 * @param {function} game - A function containing tasks that you want to be carried out every tick of the loop.
 * @example
 * s.loop(function(){
 *   if (rabbit.xPos > s.width){
 *     rabbit.changeAnimationTo('sleep')
 *   }
 * });
 */
export default function loop(game) {
  s2pd.looping = true;
  s2pd.width = s2pd.canvas.width;
  s2pd.height = s2pd.canvas.height;
  if (s2pd.firstTimeThroughLoop) {
    s2pd.firstTimeThroughLoop = false;
  }
  s2pd.percentLoaded = (s2pd.objectsToLoad.length / s2pd.loadedAssets) * 100;
  if (s2pd.percentLoaded === Infinity) {
    s2pd.percentLoaded = 0;
  }

  if (s2pd.clear) {
    s2pd.ctx.clearRect(0, 0, s2pd.width, s2pd.height);
  }

  for (let i = 0; i < s2pd.allAudioObjects.length; i++) {
    if (s2pd.allAudioObjects[i].ended) {
      s2pd.allAudioObjects.nowPlaying = false;
    }
  }
  for (let i = 0; i < s2pd.allBackgrounds.length; i++) {
    if (s2pd.allBackgrounds[i].loaded) {
      s2pd.allBackgrounds[i].updatePos();
      s2pd.allBackgrounds[i].autoSize();
    }

  }
  for (let i = 0; i < s2pd.allGameObjects.length; i++) {
    s2pd.allGameObjects[i].id = i;
    if (s2pd.allGameObjects[i].loaded) {
      s2pd.allGameObjects[i].updatePos();
    }
  }


  if (s2pd.heldObject) {
    s2pd.heldObject.holdFunction()
  }
  // KEYBOARD
  if (s2pd.keyDown.length > 0) {
    s2pd.keyDown.forEach((el) => {
      if (keyDownEvents[el].triggerOnce && !keyDownEvents[el].triggered) {
        keyDownEvents[el].callback();
        keyDownEvents[el].triggered = true;
      }
      else if (!keyDownEvents[el].triggerOnce) {
        keyDownEvents[el].callback()
      }
    })
  }
  if (s2pd.keyUp.length > 0) {
    for (let i = 0; i < s2pd.keyUp.length; i++) {
      for (let j = 0; j < s2pd.keyDown.length; j++) {
        if (s2pd.keyDown[j] === s2pd.keyUp[i]) {
          s2pd.keyDown.splice(j, 1);
        }
      }
      if (typeof keyUpEvents[s2pd.keyUp[i]] === 'function') {
        keyUpEvents[s2pd.keyUp[i]]();
      }
      s2pd.keyUp.splice(i, 1);
    }
  }
  //END KEYBOARD
  checkPlatforms()


  if (game) {
    game()
  }

  if (s2pd.hitDetectObjects.length > 1) {
    for (let i = 0; i < s2pd.hitDetectObjects.length; i++) {
      for (let j = 0; j < s2pd.hitDetectObjects.length; j++) {
        if (i !== j) {
          let a = s2pd.hitDetectObjects[i];
          let b = s2pd.hitDetectObjects[j];
          if (a instanceof Line && !(b instanceof Line)) {
            distanceFromLine(a, b)
          } else if (b instanceof Line && !(a instanceof Line)) {
            distanceFromLine(b, a)
          } else if (a instanceof Line && b instanceof Line) {
            if (a.intersect(a.startX, a.startY, a.endX, a.endY, b.startX, b.startY, b.endX, b.endY)) {
              findCollisionFunction(a, b, true)
            } else {
              findCollisionFunction(a, b, false)
            }
          } else {
            if (checkOverlap(a, b)) {
              findCollisionFunction(a, b, true)
            } else {
              findCollisionFunction(a, b, false)
            }
          }
        }
      }
    }
  }

  if (!s2pd.exit) {
    requestAnimationFrame(function () {
      loop(game);
    });
  } else {
    s2pd.looping = false;
    s2pd.exit = false;
    s2pd.firstTimeThroughLoop = true;
  }
}
