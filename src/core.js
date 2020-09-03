import Background from './background.js';
import Line from './shapes/line.js'

const s2pd = {
  loadedAssets: 0,
  looping: false,
  objectsToLoad: [],
  percentLoaded: 0,
  allAudioObjects: [],
  touching: false,
  loadedAudio: [],
  allGameObjects: [],
  allBackgrounds: [],
  holdableObjects: [],
  hitDetectObjects: [],
  collisions: [],
  platforms: [],
  gravity: [],
  dragStarted: false,
  draggingWithMouse: true,
  clear: false,
  mouseX: null,
  mouseY: null,
  touchX: null,
  touchY: null,
  touchMoveX: null,
  touchMoveY: null,
  touchEndX: null,
  touchEndY: null,
  keyDown: [],
  keyUp: [],
  orientation: undefined,
  exit: false,
  enableDragAndDrop: true,
  firstTimeThroughLoop: true,
  canvas: null,
  ctx: null,
  finalize: function (object) {
    if (object instanceof Background) {
      s2pd.allBackgrounds.push(object);
    } else {
      s2pd.allGameObjects.push(object);
    }
  },
  jump: function (who, howHigh) {
    if (!(who instanceof Line)) {

      const currentHeight = Math.abs(who.yPos - who.jumpStart);
      //let howManyTimesToTop = Math.floor(howHigh / who.originalGravityLevel / 2)
      if (currentHeight <= howHigh / 2) {
        who.yPos -= who.originalGravityLevel;
      } else if (currentHeight > howHigh / 2) {
        who.gravityLevel -= who.accelerationRate
        who.yPos -= who.gravityLevel;
        if (who.gravityLevel <= 0) {
          who.gravityLevel = who.originalGravityLevel;
          who.jumping = false
        }
      } else {
        who.gravityLevel = who.originalGravityLevel;
        who.jumping = false;
      }
    }
  }
};

window.detect = s2pd.hitDetectObjects;
export default s2pd;
