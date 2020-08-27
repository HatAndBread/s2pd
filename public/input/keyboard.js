import s2pd from '../core.js';

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
      break;
  }
}

function keyAction(keyboardAction, code, callback) {
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
}
export function keyUp(key, callback) {
  if (typeof key === 'string') {
    let code = returnKeyCode(key);
    keyAction('up', code, callback);
  } else {
    keyAction('up', key, callback);
  }
}
export function keyDown(key, callback) {
  if (typeof key === 'string') {
    let code = returnKeyCode(key);
    keyAction('down', code, callback);
  } else {
    keyAction('down', key, callback);
  }
}
function keyDownHandler(event) {
  s2pd.keyboardDown = event.keyCode;
}
function keyUpHandler(event) {
  s2pd.keyboardDown = null;
  s2pd.keyboardUp = event.keyCode;
}
export function keyboardListeners() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
}
