import Line from './shapes/line.js'

const s2pd = {
  loadedImages: 0,
  loadedAudio: 0,
  looping: false,
  objectsToLoad: [],
  ids: [],
  percentLoaded: 0,
  percentImagesLoaded: 0,
  percentSoundLoaded: 0,
  allAudioObjects: [],
  touching: false,
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
  clear: true,
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
  onResize: null,
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
