import Sprite from './sprite.js';
import Background from './background.js';

const s2pd = {
  loadedAssets: 0,
  objectsToLoad: [],
  percentLoaded: 0,
  allAudioObjects: [],
  touching: false,
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
  keyboardUp: null,
  keyboardDown: null,
  orientation: undefined,
  exit: false,
  enableDragAndDrop: true,
  firstTimeThroughLoop: true,
  canvas: null,
  ctx: null,
  finalize: function (object) {
    if (object instanceof Sprite) {
      object.animations.shift();
    }
    if (object instanceof Background) {
      this.allBackgrounds.push(object);
    } else {
      this.allGameObjects.push(object);
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
  }
};

export default s2pd;
