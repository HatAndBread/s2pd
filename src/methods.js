import s2pd from './core.js';

/**
 * Create an object that will return items randomally from a list without repeating until every item in the list has been returned.
 * @example
 * // returns a random fruit. Will not repeat until all items in fruits array have been returned.
 * const fruits = ['🍌','🍎','🍓','🍊','🍈','🍉']
 * const getFruits = new s.RandomNoRepeat(fruits)
 * getFruits.get()
 */
export class RandomNoRepeat {
  /**
   * 
   * @param {array} arr - An array of items to randomize.
   */
  constructor(arr) {
    this.arr = arr;
    this.storage = []
    this.randomize()
  }
  randomize() {
    while (this.arr.length > 0) {
      let ranNum = Math.floor(Math.random() * this.arr.length)
      this.storage.push(this.arr[ranNum])
      this.arr.splice(ranNum, 1)
      if (this.arr.length === 0) {
        this.arr = [...this.storage]
        break;
      }
    }
  }
  /**
   * Get an item randomally. Will not repeat until all items have been used. 
   */
  get() {
    if (this.storage.length === 0) {
      this.randomize()
      let nextWord = this.storage.splice(0, 1);
      return nextWord
    } else {
      let nextWord = this.storage.splice(0, 1);
      return nextWord
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
/**
 * @returns
 * returns a random rgb color as a string.
 */
export function getRandomColor() {
  return `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`;
}
/**
 * Returns inputed number rounded to decimals.
 * @param {number} num 
 * @param {number} howManyDecimals 
 * @example
 * // returns 3.333
 * s.roundToDecimals(10/3, 3)
 */
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
      console.error('@roundToDecimal: Max digits is 6.');
  }

  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}
/**
 * returns option one or two randomally.
 * @param {*} option1 - Anything. Number, string, or object.
 * @param {*} option2 - Anything. Number, string, or object.
 * @example
 * s.choose(coffee,tea);
 * // returns either coffee or tea randomally.
 */
export function choose(option1, option2) {
  let chooser = Math.floor(Math.random() * 2);
  if (chooser === 0) {
    return option1;
  }
  if (chooser === 1) {
    return option2;
  }
}
/**
 * 
 * @param {number} sideA 
 * @param {number} sideB 
 */
export function pythagorean(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

/**
 * @function - Detect collision between sprites or any other game object.
 * @param {object} obj1 - Any s2pd game object. 
 * @param {object} obj2 - Any s2pd game object.
 * @param {boolean} triggerOnce - Trigger callback once while true, or trigger continually while true.
 * @param {function} callback - A callback function that will be exectued every time object 1 and object 2 collide.
 * @example
 * s.onCollision(cat,dog,true,()=>{
 *   cat.changeAnimationTo('bite');
 * })
 * // Will trigger function one time when cat and dog are overlapping.
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

