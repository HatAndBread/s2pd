import s2pd from './core.js';


/**
 * a class
 */
export class RandomNumSetNoRepeat {
  /**
   *
   * @param {number} min - asdfasd
   * @param {number} max - sdfasf
   */
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
    for (let i = 0; i < this.arrayWidth + 1; i++) {
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
}
/**
 *
 * @param {number} min - minimum
 * @param {number} max - maximum
 * @returns - Returns an integer between and including min and max
 */
export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor() {
  return `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`;
}

export function roundToDecimals(num, howManyDecimals) {
  let multiplier;
  switch (howManyDecimals) {
    case 0:
      multiplier = 1;
      break;
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
      console.log('Max digits is 6.');
  }

  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}

export function choose(option1, option2) {
  let chooser = Math.floor(Math.random() * 2);
  if (chooser === 0) {
    return option1;
  }
  if (chooser === 1) {
    return option2;
  }
}

export function pythagorean(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

/**
 * @function - Detect collision between sprites or any other game object.
 * @param {object} obj1 - Any s2pd game object. 
 * @param {object} obj2 - Any s2pd game object.
 * @param {boolean} triggerOnce - Trigger callback once while true, or trigger continually while true.
 * @param {function} callback - A callback function that will be exectued every time object 1 and object 2 collide.
 */
export function onCollision(obj1, obj2, triggerOnce, callback) {
  if (!obj1.detectHit && obj1.hitDetect) {
    obj1.hitDetect();
  }
  if (!obj2.detectHit && obj2.hitDetect) {
    obj2.hitDetect();
  }
  if (typeof callback !== 'function') {
    console.error(`@onCollision: Callback function required.`)
  } else if (!s2pd.hitDetectObjects.includes(obj1) || !s2pd.hitDetectObjects.includes(obj2)) {
    console.error('@onCollision: Objects must be valid game objects (sprites, tiles, or shapes) ⬇︎', obj1, obj2)
  } else {
    s2pd.collisions.push({ obj1: obj1, obj2: obj2, callback: callback, triggerOnce: triggerOnce, triggered: false })
  }
}
