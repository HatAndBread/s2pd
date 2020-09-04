import s2pd from '../core.js';

class Shapes {
  /**
   * @param {string} color
   * @param {number} xPos
   * @param {number} yPos
   */
  constructor(color, xPos, yPos) {
    this.id = s2pd.getId()
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.velX = 0;
    this.velY = 0;
    this.opacity = 1;
    //this.timeStamp = Date.now();
    //s2pd.finalize(this);
  }

  hitDetect() {
    this.detectHit = true;
    s2pd.hitDetectObjects.push(this);

  }

  /**
   * @param {function} callback - What to do when object is clicked.
   * @example
   * circle.onClick(()=>{
   *   circle.color = 'rgb(1,2,3)'
   * })
   */
  onClick(callback) {
    this.clickFunction = callback;
  }
  /**
   * 
   * @param {function} callback - What to do when mouse is held down over object or object is touched.
   * @example
   * circle.onHold(()=>{
   *   circle.color = s.getRandomColor()
   * })
   */
  onHold(callback) {
    this.holdFunction = callback;
    if (!s2pd.holdableObjects.includes(this)) {
      s2pd.holdableObjects.push(this)
    }
  }
  /**
  * Drag when mouse is held down over the object or user is touching the object. Object will be released when mouse is up or touching stops. Only works in conjunction with onHold().
  * @example
  * circle.onHold(()=>{
  *   circle.drag();
  * });
  */
  drag() {
    this.dragging = true;
  }
  /**
 * Make sprite into a platform. Objects with gravity will not fall through platforms. 
 * @param {boolean=} blockify - Optional! Default value is false. If platform is a block objects with gravity will not be able to pass through it either from above, below, or to the sides. 
 */
  platform(blockify) {
    if (!this.intersect) {
      blockify ? this.block = true : this.block = false;
      s2pd.platforms.push(this)
    } else {
      console.warn('Lines are not supported as platforms yet. Use a rectangle instead.')
    }
  }
  /**
   * Disable the sprites ability to be a platform. 
   */
  notPlatform() {
    this.block = false;
    for (let i = 0; i < s2pd.platforms.length; i++) {
      s2pd.platforms[i] === this ? s2pd.platforms.splice(i, 1) : undefined;
    }
    console.log(s2pd.platforms)
  }
  /**
 * Remove all references to object. 
 * 
 */
  destroy() {
    const searchAndDestroy = (arr) => {
      for (let i = arr.length; i >= 0; i--) {
        if (arr[i]) {
          if (arr[i].id) {
            if (arr[i].id === this.id) {
              arr.splice(i, 1);
            }
          }
        }
      }
    }
    searchAndDestroy(s2pd.allBackgrounds);
    searchAndDestroy(s2pd.allGameObjects);
    searchAndDestroy(s2pd.hitDetectObjects);
    searchAndDestroy(s2pd.holdableObjects);
    searchAndDestroy(s2pd.gravity);
    searchAndDestroy(s2pd.platforms)
    s2pd.delete(this);
  }







}
export default Shapes;
