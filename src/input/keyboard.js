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
    case '-':
      return 109;
    default:
      console.error('unknown keycode: ' + key);
      break;
  }
}

/**
 * Call a callback function when a certain keyboard key is released.
 * @param {(string|number)} key - JS keycode (number) or a string. Example →　'space' for space key. ',' for comma.
 * @param {function} callback -  function to be called on key up.
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
 */

function keyDown(key, callback) {
  if (typeof key === 'string') {
    let code = returnKeyCode(key);
    keyDownEvents[code] = callback;
  } else {
    keyDownEvents[key] = callback;
  }
}
function keyDownHandler(event) {
  if (s2pd.preventDefaultKeyboard) {
    event.preventDefault()
  }
  if (keyDownEvents[event.keyCode] && !s2pd.looping) {
    keyDownEvents[event.keyCode]()
  }
  if (keyDownEvents[event.keyCode] && s2pd.looping) {
    if (!s2pd.keyDown.includes(event.keyCode)) {
      s2pd.keyDown.push(event.keyCode);
    }
  }
}
function keyUpHandler(event) {
  if (s2pd.preventDefaultKeyboard) {
    event.preventDefault()
  }
  if (keyUpEvents[event.keyCode] && !s2pd.looping) {
    keyUpEvents[event.keyCode]()
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
