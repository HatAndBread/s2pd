import Background from './background.js';
import Line from './shapes/line.js'

const s2pd = {
  loadedAssets: 0,
  looping: false,
  objectsToLoad: [],
  ids: [],
  percentLoaded: 0,
  allAudioObjects: [],
  touching: false,
  loadedAudio: [],
  allGameObjects: [],
  allBackgrounds: [],
  holdableObjects: [],
  hitDetectObjects: [],
  cancelDraw: false,
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
  jump: function (who, howHigh) {
    if (!(who instanceof Line)) {
      const currentHeight = Math.abs(who.yPos - who.jumpStart);
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
  },
  getId: () => {
    let num = Math.floor(Math.random() * 1000000);
    if (s2pd.ids.includes(num)) {
      s2pd.getId();
    } else {
      s2pd.ids.push(num)
      return num;
    }
  },
  delete: (obj) => {
    obj = null;
  }
}

window.core = s2pd;
export default s2pd;
