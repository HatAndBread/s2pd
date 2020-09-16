import s2pd from '../core.js';

const keyDownEvents = new Array(222);
const keyUpEvents = new Array(222);

function returnKeyCode(key) {
  if (typeof key === 'number') {
    key = key.toString();
  } else if (typeof key === 'string') {
    key = key.toLowerCase();
  } else {
    console.error('Type error.');
  }
  switch (key) {
    case 'shift':
      return 16;
    case 'up':
      return 38;
    case 'uparrow':
      return 38;
    case 'uparrowkey':
      return 38;
    case 'arrowupkey':
      return 38;
    case 'up-arrow':
      return 38;
    case 'up arrow':
      return 38;
    case 'arrowup':
      return 38;
    case 'arrow-up':
      return 38;
    case 'arrow up':
      return 38;
    case 'down':
      return 40;
    case 'downarrow':
      return 40;
    case 'downarrowkey':
      return 40;
    case 'arrowdownkey':
      return 40;
    case 'down-arrow':
      return 40;
    case 'down arrow':
      return 40;
    case 'arrow down':
      return 40;
    case 'arrowdown':
      return 40;
    case 'arrow-down':
      return 40;
    case 'left':
      return 37;
    case 'leftarrow':
      return 37;
    case 'leftarrowkey':
      return 37;
    case 'arrowleftkey':
      return 37;
    case 'arrowleft':
      return 37;
    case 'arrow-left':
      return 37;
    case 'arrow left':
      return 37;
    case 'left arrrow':
      return 37;
    case 'left-arrow':
      return 37;
    case 'right':
      return 39;
    case 'rightarrow':
      return 39;
    case 'arrowright':
      return 39;
    case 'right-arrow':
      return 39;
    case 'arrow-right':
      return 39;
    case 'right arrow':
      return 39;
    case 'arrow right':
      return 39;
    case 'rightarrowkey':
      return 39;
    case 'arrowrightkey':
      return 39;
    case 'space':
      return 32;
    case 'spacekey':
      return 32;
    case 'enter':
      return 13;
    case 'return':
      return 13;
    case 'returnkey':
      return 13;
    case 'esc':
      return 27;
    case 'escape':
      return 27;
    case 'escapekey':
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
    case '.':
      return 190;
    case ',':
      return 188;
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
    case 'hyphen':
      return 109;
    case '_':
      return 189;
    case 'underscore':
      return 189;
    case 'under-score':
      return 189;
    case 'under score':
      return 189;
    case 'lodash':
      return 189;
    case 'lowdash':
      return 189;
    case 'low-dash':
      return 189;
    case 'low dash':
      return 189;
    case 'underdash':
      return 189;
    case 'under-dash':
      return 189;
    case 'underline':
      return 189;
    case 'under-line':
      return 189;
    default:
      console.error('unknown keycode: ' + key);
      break;
  }
}

/**
 * Call a callback function when a certain keyboard key is released.
 * @param {(string|number)} key - JavaScript keycode (number) or a string. Example →　'space' for space key. ',' for comma.
 * @param {function} callback -  function to be called on key up.
 * * @example
 * // rabbit will jump every time up arrow key is lifted.
 * s.keyUp('up',()=>{
 *    rabbit.jump(200)
 * });
 */
function keyUp(key, callback) {
  if (typeof key === 'string') {
    let code = returnKeyCode(key);
    keyUpEvents[code] = callback;
  } else {
    keyUpEvents[key] = callback;
  }
}

/**
 * Call a callback function when a certain keyboard key is being held down.
 * @param {(string|number)} key - JS keycode (number) or a string. Example →　'space' for space key. ',' for comma.
 * @param {function} callback -  function to be called on key down.
 * @param {boolean} triggerOnce - Optional! Default is false. Trigger callback once while key is down (true), or trigger callback every tick while key is down(false).
 * @example
 * // rabbit will move 3 pixels to the right every tick that right arrow is held down.
 * s.keyDown('right',()=>{
 *    rabbit.xPos+=3
 * },false);
 */
function keyDown(key, callback, triggerOnce) {
  if (typeof key === 'string') {
    let code = returnKeyCode(key);
    keyDownEvents[code] = { callback: callback, triggerOnce: triggerOnce, triggered: false };
  } else {
    keyDownEvents[key] = { callback: callback, triggerOnce: triggerOnce, triggered: false };
  }
}

function keyDownHandler(event) {
  let a = keyDownEvents[event.keyCode];
  if (s2pd.preventDefaultKeyboard) {
    if (
      event.code === 'ArrowRight' ||
      event.code === 'ArrowLeft' ||
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }
  if (a && !s2pd.looping) {
    if (a.triggerOnce && !a.triggered) {
      a.callback();
      a.triggered = true;
    } else {
      a.callback();
    }
  }
  if (a && s2pd.looping) {
    // if string isn't recognized use JS keycode.
    if (!s2pd.keyDown.includes(event.keyCode)) {
      s2pd.keyDown.push(event.keyCode);
    }
  }
}

function keyUpHandler(event) {
  if (s2pd.preventDefaultKeyboard) {
    if (
      event.code === 'ArrowRight' ||
      event.code === 'ArrowLeft' ||
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }
  keyDownEvents.forEach((el) => {
    if (el.triggered) {
      el.triggered = false;
      s2pd.keyDown.splice(0, s2pd.keyDown.length);
    }
  });

  if (keyUpEvents[event.keyCode] && !s2pd.looping) {
    keyUpEvents[event.keyCode]();
  }
  if (s2pd.looping) {
    s2pd.keyUp.push(event.keyCode);
  }
}
function keyboardListeners() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
}

export { keyDown, keyUp, keyboardListeners, keyDownEvents, keyUpEvents };
