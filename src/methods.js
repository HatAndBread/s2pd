import s2pd from './core.js';

export async function loadAssets() {
  if (s2pd.objectsToLoad.length > 0) {
  }
}

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
      console.log('choose a valid number idiot');
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
