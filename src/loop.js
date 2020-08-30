import s2pd from './core.js';
import { keyDownEvents, keyUpEvents } from './input/keyboard.js'


export default function loop(game) {
  s2pd.looping = true;
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
    s2pd.allBackgrounds[i].id = i;
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

  if (s2pd.keyDown) {
    if (keyDownEvents[s2pd.keyDown]) {
      keyDownEvents[s2pd.keyDown]();
    }
  }
  if (s2pd.keyUp) {
    console.log(s2pd.keyUp)
    if (keyUpEvents[s2pd.keyUp]) {
      keyUpEvents[s2pd.keyUp]();
    }
    s2pd.keyUp = null;
  }
  const errorMessage = 'The loop() method requires a callback function😭 Example ===> loop(function(){//do something})';
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
            s2pd.hitDetectObjects[i].hitBoxY + s2pd.hitDetectObjects[i].hitBoxHeight >= s2pd.hitDetectObjects[j].hitBoxY
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
      loop(game);
    });
  } else {
    s2pd.looping = false;
  }
}
