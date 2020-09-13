# s2pd

Hi! 👋🌈  
s2pd is a stupidly simple HTML5 canvas and web audio library for making 2D games and art in JavaScript. As an example of what you can do with s2pd, here is a game thrown together in about an hour: <a href = "https://s2pd-example.netlify.app/">CLICK HERE TO PLAY EXAMPLE GAME🌈</a>

I originally created s2pd as a library for programming my own simple games and canvas animations, but it quickly got out of hand and took on a life of its own as a full-fledged (although bare-bones) game library. It is my hope that s2pd is easy and intuitive enough to be used by beginners, students, and anyone else who is curious about delving into the world of digital art. Although there are a vast number of great JavaScript game and canvas libraries out there, I hope s2pd can find its humble place among them as a dumber, uglier, lighter-weight and more beginner-friendly sibling.

Here are a few hastily thrown together examples of the kind of things you can build with s2pd. Enjoy!

<table>
<tr>
<td>Example</td>
<td>Source</td>
</tr>
<tr>
<td><a href="https://s2pdspace.netlify.app/">Space Invaders(ish) clone</a></td>
<td><a href="https://github.com/HatAndBread/s2pd/blob/master/examples/space-shooter/game.js">Source code</a></td>
</tr>
<tr>
<td><a href="https://s2pd-example.netlify.app/">Flappy Birds(ish) clone</a></td>
<td><a href="https://github.com/HatAndBread/s2pd/blob/master/examples/weird%20game/main.js">Source code</a></td>
</tr>
</table>

<h2>Contents</h2>
  <ul>
    <li><a href="#install">Installation<a/></li>
     <li><a href="#tutorial">Quick Tutorial<a/></li>
     <li><a href="#api">API<a/></li>
  </ul>

<div id="install"></div>

# Installation

The easiest way to get started is to <a href="https://playcode.io/667974/">play with s2pd on CodeSandbox</a>.
The next easiest way to start is to download <a href="https://github.com/HatAndBread/s2pd/blob/master/boiler-plate.zip">boiler-plate.zip</a> and start editing main.js right away. You will need to have a development server running to open index.html.

**_Otherwise..._**

On the command line.

```
git clone https://github.com/HatAndBread/s2pd.git
```

In your JavaScript file.

```javascript
import s from './s2pd/s2pd.js';
```

### OR

There are also two minified versions of s2pd available.<a href="https://github.com/HatAndBread/s2pd/blob/master/dist/s2pd.js">**s2pd.js**</a> can be imported into your project as an es6 module. Alternatively, <a href="https://github.com/HatAndBread/s2pd/blob/master/dist/s2pd.glob.js"> **s2pd.glob.js**</a> can be included in the head section of your html file. It is recommended, however, that you use a non-minified version in development so that you can see code hints in your text editor.

```html
<script src="s2pd.glob.js" defer></script>
<script src="my-game.js" defer></script>
```

<div id="tutorial"></div>

# Quick tutorial

Let's make a stupidly simple game! First, let's create a canvas.

```javascript
import s from './s2pd/s2pd.js';
s.ezSetup(); // Basic setup for games. For more advanced options see API.
```

Now we have an empty canvas element. Let's give it a background using this image file:

<br>
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/clouds.png" width="200">
<br>

The Background class will automatically create an infinitely repeating tile background taking up the entire width and height of your canvas (and infinitely beyond)!

```javascript
const clouds = new s.Background('./clouds.png');
```

Now let's make the clouds appear to move. We can use the background's velX property (velocity along the x axis) to make the clouds drift to the left.

```javascript
clouds.velX = -2; //clouds move -2 pixels along the x axis each call of the animation loop. We can use velY to make things move along the y axis.
```

If we try to run the program now we will only see a stationary image.😭
To complete the animation we need to create an animation loop! The animation loop will be called roughly 60 times per second.

```javascript
s.loop(function () {
  // Everything in this function will be called each tick of the loop.
});
```

All together we have...

```javascript
import s from './s2pd/s2pd.js';
s.ezSetup();
const clouds = new s.Background('./clouds.png');
clouds.velX = -2;
s.loop(function () {});
```

Which gives us <a href ="https://thirsty-yalow-db5758.netlify.app/">**this**</a>

Now let's add a sprite. Making a sprite is simple in s2pd. All you need is an image file with your animation laid out in a single horizontal row with each frame evenly spaced. Let's use this image:
<br>
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/hero.png" width="1000">
<br>
Here we have 35 evenly spaced frames. Perfect! We can make a sprite like this:

```javascript
const sprite = new s.Sprite(s.width / 2, s.height / 2, './hero.png', 35, 4);
// For a single frame sprite all you need is the first three arguments.
```

This will create an animated sprite in the center of the canvas. 35 is the number of frames in the image and 4 is animation speed. An animation speed of 1 will change frames every time the program goes through the loop. A speed of 2 every will change frames every two ticks, etc.
<br><br>
Since our sprite file contains multiple animations we need to define where our animations begin and end. (There is no need to do this step if your sprite only has one animation). Let's animate our sprite blinking while facing to the right. The blink begins on frame 7 (starting from 0) and is four frames long, so...

```javascript
sprite.addAnimation('blinking-right', 7, 4);
```

The default animation for sprites is to run through every frame of the entire image file. Since our sprite has multiple animations that would look weird, so let's set the current animation to **'blinking-right'**.

```javascript
sprite.changeAnimationTo('blinking-right');
```

And now we have an animated sprite!

Let's add one more animation and make our sprite turn to the left or right and walk when the left or right arrow keys on the keyboard are pressed.

```javascript
sprite.addAnimation('blinking-left', 11, 4);
s.keyDown('right', () => {
  sprite.changeAnimationTo('blinking-right');
  sprite.xPos += 2; // will increase sprite's position on x axis by 2 pixels
});
s.keyDown('left', () => {
  sprite.changeAnimationTo('blinking-left');
  sprite.xPos -= 2;
});
```

<a href = "https://cranky-bell-0ea677.netlify.app/">**Here is the result**</a>

Our sprite is floating in the sky. That's strange. Let's make if feel the force of gravity.

```javascript
sprite.feelGravity(12);
/* A range from about 5 to 20 is good.
5 is moonish gravity. 14 is Earthish. 
30 is Jupiterish. 14 is default.
*/
```

Oh no! <a href="https://playcode.io/667791/">Our sprite is falling!</a> Let's put some ground below it. This time let's use the Tile class. The tile class is similar to the Background class, except it won't necessarily take up the entire background. Let's use this image:

<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/ground.png">

```javascript
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
```

This will create a tile centered horizontally, 3/4ths the height of the canvas vertically, repeating 2 times on the x axis and 1 time on the y axis. Now let's make the tile into a platform so our sprite won't fall through it.

```javascript
ground.platform(true);
/*passing a truthy value as an argument will make the object into a block.
That means that objects with gravity will not be able to pass through it from any direction (from above, below, left, or right).
*/
```

Yay! Our sprite has a platform to stand on. Now let's give it the ability to jump.

```javascript
s.keyUp('space', () => {
  sprite.jump(200, true); // will make sprite jump 200 pixels.
}); // passing a truthy value as the second arguement in jump method will disable "double jumps", i.e. sprite won't be able to jump again until the jump is complete.
```

<a href="https://suspicious-franklin-91075b.netlify.app/">Here's what we have</a>. Not bad! But a little boring. Let's make our game more game-like. We need some kind of obstacle...🤔 Let's make a flying circle that will destroy our sprite when they collide.

```javascript
const evilCircle = new s.Circle(s.getRandomColor(), -30, s.randomBetween(-10, s.height), s.randomBetween(20, 30));
/*
Make a randomly colored circle 30 pixels off to the left of the canvas
at a random height between -10 and canvas height 
and with a random radius between 20 and 30.
*/
evilCircle.velX = 8; // Make the circle travel horitontally 8 pixels per frame.
s.onCollision(evilCircle, sprite, true, () => {
  ground.notPlatform(); // Ground is no longer a platform so our sprite will fall. 😢
  evilCircle.destroy(); // Delete all references to evilCircle.
});
/*A truthy third argument for onCollision method will trigger the callback function 
only once per collision. A falsy value will cause the the callback function
to be triggered every tick of the loop.
*/
```

In our loop callback let's add this code.

```javascript
s.loop(function () {
  if (evilCircle.xPos + evilCircle.radius > s.width) {
    // if evil circle goes beyond width of canvas...
    evilCircle.color = s.getRandomColor();
    evilCircle.xPos = -30; // send evil circle back to left side of canvas.
    evilCircle.yPos = s.randomBetween(0, s.height);
  }
  if (sprite.yPos > s.height) {
    sprite.destroy(); // delete all references to our sprite when it has fallen off the canvas. 😢😢😢
  }
});
```

All together...

```javascript
import s from './s2pd/s2pd.js';

s.ezSetup();
const clouds = new s.Background('./clouds.png');
clouds.velX = -2;
const sprite = new s.Sprite(s.width / 2, s.height / 2, './hero.png', 35, 4);
sprite.addAnimation('blinking-right', 7, 4);
sprite.changeAnimationTo('blinking-right');
sprite.addAnimation('blinking-left', 11, 4);
s.keyDown('right', () => {
  sprite.changeAnimationTo('blinking-right');
  sprite.xPos += 2;
});
s.keyDown('left', () => {
  sprite.changeAnimationTo('blinking-left');
  sprite.xPos -= 2;
});
sprite.feelGravity(12);
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
ground.platform(true);
s.keyUp('space', () => {
  sprite.jump(200, true);
});
const evilCircle = new s.Circle(s.getRandomColor(), -30, s.randomBetween(-10, s.height), s.randomBetween(20, 30));
evilCircle.velX = 8;

s.onCollision(evilCircle, sprite, true, () => {
  ground.notPlatform();
  evilCircle.destroy();
});

s.loop(function () {
  if (evilCircle.xPos + evilCircle.radius > s.width) {
    evilCircle.color = s.getRandomColor();
    evilCircle.xPos = -30;
    evilCircle.yPos = s.randomBetween(0, s.height);
  }
  if (sprite.yPos > s.height) {
    sprite.destroy();
  }
});
```

Let's <a href="https://compassionate-jones-9a151d.netlify.app/">give our game a try.</a>
There we have it! A working game, albeit a rather stupid one. I think you can do better! What will you create?

<div id="api"></div>

# API

<ul>
<li><a href="#variables">s2pd Variables</a></li>
<li><a href="#canvas">Canvas</a></li>
 <li><a href="#loop">Loop</a></li>
<li><a href="#sprites">Sprites</a></li>
<li><a href="#tiles">Tiles</a></li>
<li><a href="#backgrounds">Backgrounds</a></li>
<li><a href="#shapes">Shapes</a></li>
<li><a href="#text">Text</a></li>
<li><a href="#sound">Sound</a></li>
<li><a href="#mouse">Mouse</a></li>
<li><a href="#touch">Touch</a></li>
<li><a href="#keyboard">Keyboard</a></li>
<li><a href="#collision">Collision Detection</a></li>
<li><a href="#methods">Useful Methods for Lazy People</a></li>
</ul>

<div id="variables"><h1>s2pd Variables</h1></div>

<ul>
<li>s.width - width of the canvas in pixels</li>
<li>s.height - height of the canvas in pixels</li>
<li>s.percentLoaded - percent of assets (image and audio files) loaded</li>
<li>s.percentImagesLoaded - percent of image files loaded</li>
<li>s.percentSoundLoaded - percent of audio files loaded</li>
<li>s.mouseX - current x position of mouse</li>
<li>s.mouseY - current y position of mouse</li>
<li>s.touchX - current x position of touch</li>
<li>s.touchY - current y position of touch</li>
<li>s.touchMoveX - current x position of touch updated every time touch movement detected</li>
<li>s.touchMoveY - current y position of touch updated every time touch movement detected</li>
<li>s.touchEndX - last x position of touch</li>
<li>s.touchEndY - last y position of touch</li>
</ul>

<div id="canvas"><h1>Canvas</h1></div>

🌈**_ezSetup()_**

Sets your project up quickly with default settings.
Creates a canvas element with id 'canvas', sizes canvas to 900x600 on larger screens, sizes to window width and window height on mobile screens, automatically resizes on mobile orientation change, and prevents window movement on canvas touch and use of keyboard arrow keys.

- ezSetup is not recommended for integration with existing projects as it is likely to change the flow of your document in unexpected ways.

```javascript
s.ezSetup();
```

🌈**_createCanvas(id, width, height)_**

Create a new html5 canvas element.

<ul>
  <li>id: {string} id of html5 canvas element.</li>
  <li>width: {number} width of canvas in pixels. </li>
  <li>height: {number} height of canvas in pixels. </li>
</ul>

```javascript
s.createCanvas('canvas', 900, 600);
// creates a 900x600 canvas
```

🌈**_addCanvas(id, width, height)_**

Add canvas context to an existing html5 canvas element.

<ul>
  <li>id: {string} id of html5 canvas already existing in your project.</li>
  <li>width: {number} width of canvas in pixels. </li>
  <li>height: {number} height of canvas in pixels. </li>
</ul>

```javascript
s.addCanvas('someCanvasElementAlreadyExistingInYourProject', 900, 600);
// adds context to canvas and size 900x600
```

🌈**_backgroundColor(color)_**

Change background color of canvas.

<ul>
  <li>color: {string} Any valid css color passed as a string. </li>
</ul>

```javascript
s.backgroundColor('rgb(140,224,98)');
```

🌈**_canvasOpacity(opacity)_**

Change opacity of canvas.

<ul>
  <li>opacity: {number} A number between 0 and 1. 0 is invisible. 1 is fully visible.</li>
</ul>

```javascript
s.canvasOpacity(0.5);
```

🌈**_stillCanvas(how)_**

Prevent window from unwanted movement on user interaction. User interaction (such as touching canvas or using keyboard arrow keys) can often cause window to move in unexpected and unwanted ways.

<ul>
  <li>how: {string} 'keyboard' to prevent arrow from moving window. 'touch' to prevent touch of canvas from moving window. </li>
</ul>

```javascript
s.stillCanvas();
// prevents window from moving when user is touching canvas or when using arrow keys.
s.stillCanvas('touch');
// prevents window from moving when user is touching canvas only. Essential for drawing applications.
s.stillCanvas('keyboard');
// prevents window from moving when arrow keys are used only.
```

🌈**_onResize(callback)_**

What to do on window resize or orientation change.

<ul>
  <li>callback: {function} - A function to be executed every time window is resized.</li>
</ul>

<div id="loop"><h1>Loop</h1></div>

🌈**_loop(callback)_**

Creates a game loop or animation loop. The loop function is an essential element of most applications. Without it only static images are possible. The computer will run through the loop roughly 60 times per second, executing the callback function each time through. The callback function should contain all tasks that you wanted carried out each go around of the loop.

<ul>
  <li>callback: {function} a callback function that will be executed every tick of the loop after all assets have loaded.</li>
</ul>

```javascript
 s.loop(function(){
   if (mySprite.xPos >= s.width){ // if sprite's x position is greater than width of canvas
     mySprite.xPos = 0; // send it back to the far left side.
 }
}
```

🌈**_whileLoading(callback)_**

Task to be carried out while assets (image/audio files) are being loaded. Callback will be called every tick of the loop until loading is completed.

<ul>
  <li>callback: {function} a callback function that will be executed every tick of the loop while assets are loading.</li>
</ul>

```javascript
const loadingInfo = new s.Text('red', 'center', 'center', `${s.percentLoaded}%`, 'sans-serif', 32);
s.whileLoading(() => {
  // this function will be called every tick of the loop before all loading is completed.
  // this function is optional!
  loadingInfo.text = `${s.percentLoaded}%`; // continually set text to current percent loaded.
});

function game() {
  // do some fun stuff.
  // this function will be called every tick of the loop after all loading is completed.
}
s.loop(game);
```

🌈**_onFirstTime(callback)_**

Tasks to be carried out the first time through the loop after all assets have been loaded.

<ul>
  <li>callback: {function} A callback that will be executed the first time and only the first time through the loop after all assets are loaded. </li>
</ul>

```javascript
const loadingInfo = new s.Text('red', 'center', 'center', `${s.percentLoaded}%`, 'sans-serif', 32);
s.whileLoading(() => {
  loadingInfo.text = `${s.percentLoaded}%`;
});

s.onFirstTime(() => {
  loadingInfo.destroy(); // destroy loading screen after all assets loaded.
});

function game() {
  // do some cool stuff.
}

s.loop(game);
```

🌈**_stopLoop()_**

Stops the loop.

```javascript
s.stopLoop();
```

🌈**_clear()_**

Clears the canvas at the beginning of the loop. If clear is not called the image drawn to the canvas during the previous go through of the loop will remain.

```javascript
s.clear();
```

🌈**_dontClear()_**

Undoes the clear() method. Prevents the image drawn to the canvas during the previous go through of the loop from being cleared.

```javascript
let randomNumber = Math.floor(Math.random() * 10);
randomNumber === 0 ? s.clear() : s.dontClear();
// clears the canvas if random number is 0, otherwise prevents the canvas from being cleared.
```

<div id="sprites"><h1>Sprites</h1></div>

**Note: Sprite sheets must be laid out in a single horizontal row with each frame equally sized.**

Example ↓

<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/hero.png" width="1000">

🌈**_constructor(xPos, yPos, source, numberOfFrames, animationSpeed)_**

<ul>
  <li>xPos: {number} Initial x position of your sprite. </li>
  <li>yPos: {number} Initial y position of your sprite.</li>
  <li>source: {string} Source file of your sprite sheet. </li>
  <li>numberOfFrames: {number} Optional. The number of frames in your sprite sheet. Leave blank if your sprite is a single frame. </li>
  <li>animationSpeed: {number} Optional. Speed of animation. 1 is the fastest possible speed. A speed of 1 will change frames every time through the loop. A speed of 2 will change frames every two times through the loop, etc. Leave blank if your sprite is a single frame. </li>
  </ul>
  
```javascript
const bunny = new s.Sprite(s.width/2, s.height/2, './bunny.png', 4,4);
//creates a bunny sprite in the center of the canvas. Sprite sheet has four frames. Frame will change every four times through loop. 🐰
```

**_Additional Parameters_**

<ul>
<li>sprite.playedOnce {boolean} - true if animation has played all the way through once.</li>
</ul>

## **_Sprite Methods_**

🌈**_addAnimation(name, startFrame, numberOfFrames)_**

<ul>
  <li>name: {string} a string to call the animation by when changing animations.</li>
  <li>startFrame: {number} the frame in the sprite sheet where the animation begins (starting with 0 for first frame in sprite sheet).</li>
  <li>numberOfFrames: {number} the number of frames in the animation.</li>
</ul>

```javascript
const bunny = new s.Sprite(s.width / 2, s.height / 2, './bunny.png', 4, 4);
bunny.addAnimation('jump', 3, 1);
// Creates a two frame animation called 'jump'. Begins on frame 3 and continues for 1 frame (until frame 4).
```

🌈**_changeAnimationTo(name)_**

Change the sprite's current animation.

<ul>
  <li>name: {string} The name of the animation.</li>
</ul>

```javascript
bunny.changeAnimationTo('jump');
//changes current animation to 'jump'.
```

🌈**_goToFrame(which)_**

Change current animation frame.

<ul>
  <li>which: {number} Which animation frame do you want to go to.</li>
</ul>

🌈**_onClick(callback, triggerOnce)_**

What to do on mouse click.

<ul>
  <li>callback: {function} callback function to be executed when sprite is clicked</li>
  <li>triggerOnce: {boolean} falsy value - execute the callback function every time sprite is clicked. truthy value - execute callback function only once.</li>
</ul>

```javascript
bunny.onClick(() => {
  bunny.changeAnimationTo('jump');
  bunny.jump(200);
}, false);
// bunny will jump 200 pixels high each time iot is clicked.
```

🌈**_onHold(callback)_**

What to do when mouse button is held down over object or object is touched for a sustained period of time. Callback will execute each tick of the loop while object is held.

<ul>
  <li>callback: {function} callback function to be executed when sprite is held.</li>
</ul>

```javascript
bunny.onHold(() => {
  bunny.drag(); // drag and drop the sprite.
});
```

🌈**_drag()_**

Drag and drop the sprite. Must be triggered in onHold method.

```javascript
bunny.onHold(() => {
  bunny.drag();
});
```

🌈**_onMouseOver(callback, triggerOnce)_**

What to do when mouse is over object.

<ul>
<li>callback - {function} A callback function to be called whenever mouse is over object.</li>
<li>triggerOnce - {boolean} Trigger once while true or trigger continually while true.</li>
</ul>

```javascript
 sprite.onMouseOver()=>{
    sprite.updateSize(0.9);
 })
```

🌈**_feelGravity(gravity)_**

Make your sprite feel the force of gravity. Will fall unless it lands on a platform.

<ul>
  <li>gravity: {number} A number describing the strength of gravity. Higher number is more gravity. Default is 14. </li>
</ul>

```javascript
bunny.feelGravity(10);
});
```

🌈**_noGravity()_**

Remove a sprite's ability to feel gravity.

```javascript
rabbit.noGravity();
```

🌈**_jump(howHigh, noDoubleJumps)_**

Make object jump. Gravity must be enabled using the feelGravity method for the jump method to work.

<ul>
  <li>howHigh: {number} How high to make object jump in pixels. </li>
  <li>noDoubleJumps: {boolean} Prevent object from jumping when it is not on a platform. Default is false.</li>
</ul>

```javascript
rabbit.feelGravity(10);
rabbit.onClick(() => {
  rabbit.jump(200);
}, true);
//Make rabbit jump 200 pixels when clicked. Will not be able to jump again until it has landed on a platform.
```

🌈**_platform(blockify)_**

Make sprite into a platform. Objects with gravity will not fall through platforms.

<ul>
  <li>blockify: {boolean} Default value is false. If platform is a block objects with gravity will not be able to pass through it either from above, below, or to the sides. If platform is not a block objects will be prevented from passing from above.</li>
</ul>

```javascript
const bricks = new s.Sprite(200, 200, './bricks.png');
bricks.platform(true);
//bricks sprite is turned into a platform which objects with gravity will not be able to pass through from any direction.
```

🌈**_notPlatform()_**

Disable the sprite as a platform.

```javascript
bricks.notPlatform();
```

🌈**_updateSize(howMuch)_**

Increase or decrease sprite's size.

<ul>
  <li>howMuch: {number} 0.5 for half current size. 2 for twice current size, etc.</li>
</ul>

🌈**_changeCursor(type)_**

Change mouse cursor style when mouse is over object.

 <ul>
  <li>type: {string} Any valid css cursor style. No arguments will change cursor to 'pointer'.</li>
</ul>

```javascript
rabbit.updateSize(0.5);
// make rabbit half its current size.
```

🌈**_destroy()_**

Remove all references to sprite.

🌈**_Additional sprite parameters_**

<ul>
  <li>velX: {number} - The object's velocity along the x-axis.</li>
  <li>velY: {number} - The object's velocity along the y-axis.</li>
  <li>currentFrame: {number} - The frame of the animation currently being displayed.</li>
  <li>opacity: {number} - A number between 0 and 1.</li>
  <li>width: {number} - *read-only*</li>
  <li>height: {number} - *read-only*</li>
  <li>gravity: {number} - *read-only*</li>echo {}> .prettierrc.json
  <li>dragging: {boolean} - *read-only* -  is currently being dragged.</li>
  <li>jumping: {boolean} - *read-only* - is currently jumping.</li>
</ul>

<div id="tiles"><h1>Tiles</h1></div>

**Note:** Like <a href="#sprites">sprite sheets</a> , tile animations must be laid out in a single horizontal row with each frame equally sized. The Tile class automatically creates a repeated image for a specified number of times both vertically and horizontally. There are a lot of fun things you can do with the Tile class❣️

🌈**_constructor(source, xPos, yPos, repeatX, repeatY, numberOfFrames, animationSpeed)_**

<ul>
   <li>source: {string} Source file of your tile. </li>
  <li>xPos: {number} Optional. Initial x position of your tile. Default is 0. </li>
  <li>yPos: {number} Optional. Initial y position of your tile. Default is 0. </li>
  <li>repeatX: {number} Optional. How many times to repeat the image on the x axis. Default is to repeat for the entire width of the canvas. </li>
  <li>repeatY: {number} How many times to repeat the image on the y axis. Default is to repeat for the entire height of the canvas.</li>
  <li>numberOfFrames: {number} Optional. The number of frames in your sprite sheet. Leave blank if your tile is a single frame. </li>
  <li>animationSpeed: {number} Optional. Speed of animation. 1 is the fastest possible speed. A speed of 1 will change frames every time through the loop. A speed of 2 will change frames every two times through the loop, etc. Leave blank if your tile is a single frame. </li>
  </ul>
  
  ```javascript
  const backgroundTile = new s.Tile('./stars.png');
  // creates a tile background that covers the entire width and height of the canvas.
  const ground = new s.Tile('./ground.png', 50,100, 5, 1);
  // creates a tile at coordinates 50,100 that repeats 5 times along the x-axis.
  const animatedTileBackground = new s.Tile('./cool-animation.png',false,false,false,false, 10, 4)
  // creates an animated tile background that covers the entire width and height of the canvas.
  ```
  
  🌈***Tile Methods***
---
The tile class shares all methods and parameters with the <a href="#sprites">Sprite class</a>, with the exception of updateSize.
  
  🌈***Additional tile parameters***
  
  In addition to the parameters the Tile class shares with the <a href="#sprites">Sprite class</a>, the Tile class has a few unique parameters.
  
  <ul>
  <li>repeatX: {number} - the number of times the tile repeats along the x-axis.</li>
  <li>repeatY: {number} - the number of times the tile repeats along the y-axis.</li>
  <li>innerX: {number} - x position of images within the Tile objects boundaries.</li>
  <li>innerY: {number} - y position of images within the Tile objects boundaries.</li>
  <li>innerVelX: {number} - velocity of images within the Tile objects boundaries along the x axis.</li>
  <li>innerVelY: {number} - velocity of images within the Tile objects boundaries along the y axis.</li>
</ul>

```javascript
const hearts = new s.Tile('./hearts.png', 100, 100);
hearts.innerVelX = 3;
// make hearts appear to move 3 pixels to the right within the boundaries of their frame every tick of the loop.
```

See an example of innerVelX and innerVelY in action 👉 <a href="https://playcode.io/667957/">Click me!</a>

<div id="backgrounds"><h1>Backgrounds</h1></div>

**Note:** Like <a href="#sprites">sprite sheets</a> , background animations must be laid out in a single horizontal row with each frame equally sized. The Background class automatically creates an infinitely repeating tile background taking up the entire width and height of your canvas (and infinitely beyond)! Takes the hard work out of creating scrolling backgrounds and parralax effects.

🌈**_constructor(source, numberOfFrames, animationSpeed)_**

<ul>
  <li>source: {string} Source file of your background. </li>
  <li>numberOfFrames: {number} Optional. The number of frames in your background animation. Leave blank if your background is not an animation.</li>
  <li>animationSpeed: {number} Optional. Speed of animation. 1 is the fastest possible speed. A speed of 1 will change frames every time through the loop. A speed of 2 will change frames every two times through the loop, etc. Leave blank if your background is not an animation. </li>
  </ul>
  
```javascript
const sky = new s.Background('./sky.png', 10,4);
// creates an animated background with 10 frames and a speed of four.
```

## **_Background Methods_**

🌈**_addAnimation(name, startFrame, numberOfFrames)_**

Add an animation to the background.

<ul>
  <li>name: {string} a string to call the animation by when changing animations.</li>
  <li>startFrame: {number} the frame in the sprite sheet where the animation begins.</li>
  <li>numberOfFrames: {number} the number of frames the animation continues for.</li>
</ul>

```javascript
const sky = new s.Background(s.width / 2, s.height / 2, './bunny.png', 4, 4);
sky.addAnimation('rain', 3, 1);
// Creates a two frame animation called 'rain'. Begins on frame 3 and continues for 1 frame (until frame 4).
```

🌈**_changeAnimationTo(name)_**

Change the background's current animation.

<ul>
  <li>name: {string} The name of the animation.</li>
</ul>

```javascript
sky.changeAnimationTo('sunny');
//changes current animation to 'sunny'.
```

🌈**_destroy()_**

Remove all references to background.

🌈**_Additional background parameters_**

<ul>
  <li>opacity: {number} - A number between 0 and 1.</li>
</ul>

<div id="shapes"><h1>Shapes</h1></div>

⭕️ **Circle**

🌈**_constructor(color, xPos, yPos, radius, thickness)_**

<ul>
  <li>color: {string} Any valid css color. </li>
  <li>xPos: {number} Position on the x axis. The xPos of a circle describes the shape's center point.</li>
  <li>yPos: {number} Position on the y axis. The yPos of a circle describes the shape's center point.</li>
  <li>radius: {number} Distance from center of circle to its outer edge.</li>
  <li>thickness: {number} Optional! If present the thickness parameter will make your circle into an outline. Thickness describes the width of the circle's outline.</li>
  </ul>

```javascript
const myCircle = new s.Circle('rgb(1,2,3)', s.width / 2, s.height / 2, 30, 3);
//creates an outline of a circle with a diameter of 60 pixels in the center of the canvas.
```

🥚 **_Ellipse_**

🌈**_constructor(color, xPos, yPos, radiusX, radiusY, rotation, thickness)_**

<ul>
  <li>color: {string} Any valid css color. </li>
  <li>xPos: {number} Position on the x axis. The xPos of a ellipse describes the shape's center point.</li>
  <li>yPos: {number} Position on the y axis. The yPos of a ellipse describes the shape's center point.</li>
  <li>radiusX: {number} Distance from center of ellipse to its outer edge along the x axis.</li>
  <li>radiusY: {number} Distance from center of ellipse to its outer edge along the y axis.</li>
  <li>rotation: {number} Rotation of ellipse in radians. Default is 0.</li>
  <li>thickness: {number} Optional! If present the thickness parameter will make your ellipse into an outline. Thickness describes the width of the ellipse's outline.</li>
  </ul>
  
  ```javascript
  const myEllipse = new s.Ellipse('rgb(1,2,3)', s.width/2,s.height/2,30,60,1,3)
  // creates an outline of an ellipse in the center of the canvas with a diameter of 60 along the x axis, 120 along the y axis, rotated 1 radian.
  ```
⬛️　***Rectangle***

🌈**_constructor(color, xPos, yPos, width, height, thickness)_**

<ul>
  <li>color: {string} Any valid css color. </li>
  <li>xPos: {number} Position on the x axis. The xPos of a rectangle describes the shape's leftmost point.</li>
  <li>yPos: {number} Position on the y axis. The yPos of a rectangle describes the shape's uppermost point.</li>
  <li>width: {number} Width of rectangle.</li>
  <li>height: {number} Height of rectangle.</li>
  <li>thickness: {number} Optional! If present the thickness parameter will make your rectangle into an outline. Thickness describes the width of the rectangle's outline.</li>
  </ul>
  
  ```javascript
  const myRectangle = new s.Rectangle('rgb(1,2,3)', s.width/2, w.height/2, 100, 100);
  // creates a 100x100 square with the square's upper-left point in the center of the canvas.
  ```
  
📏 ***Line***
  
🌈***constructor(color, startX, startY, endX, endY, thickness)***

<ul>
  <li>color: {string} Any valid css color. </li>
  <li>startX: {number} Starting position on the x axis.</li>
  <li>startY: {number} Starting position on the y axis</li>
  <li>endX: {number} End position on the x axis.</li>
  <li>endY: {number} End position on the y axis.</li>
  <li>thickness: {number} Width of line.</li>
  </ul>
  
   ```javascript
  const myLine = new s.Line('rgb(1,2,3)', 100,100,100,300, 3);
  // Creates a 3 pixel-wide vertical line stretching from coordinates (100,100) to (100, 300).
  ```
  
  ***Shape Methods***
---

**Note: all members of the Shapes super class share the same methods.**

🌈**_onClick(callback, triggerOnce)_**

What to do on mouse click.

<ul>
  <li>callback: {function} callback function to be executed when shape is clicked</li>
  <li>triggerOnce: {boolean} falsy value - execute the callback function every time the shape is clicked. truthy value - execute callback function only once.</li>
</ul>

```javascript
myCircle.onClick(() => {
  myCircle.color = s.getRandomColor();
}, false);
// Will change myCircle's color to a random color each time it is clicked.
```

🌈**_onHold(callback)_**

What to do when mouse button is held down over shape or shape is touched for a sustained period of time. Callback will execute each tick of the loop while object is held.

<ul>
  <li>callback: {function} callback function to be executed when shape is held.</li>
</ul>

```javascript
myRectangle.onHold(() => {
  myRectangle.drag(); // drag and drop myRectangle.
});
```

🌈**_drag()_**

Drag and drop the shape. Must be triggered in onHold method.

```javascript
myRectangle.onHold(() => {
  myRectangle.drag(); // drag and drop myRectangle.
});
```

🌈**_onMouseOver(callback, triggerOnce)_**

What to do when mouse is over object.

<ul>
<li>callback - {function} A callback function to be called whenever mouse is over object.</li>
<li>triggerOnce - {boolean} Trigger once while true or trigger continually while true.</li>
</ul>

```javascript
 circle.onMouseOver()=>{
    circle.color = s.getRandomColor();
 })
```

🌈**_changeCursor(type)_**

Change mouse cursor style when mouse is over object.

 <ul>
  <li>type: {string} Any valid css cursor style. No arguments will change cursor to 'pointer'.</li>
</ul>

🌈**_destroy()_**

Remove all references to object.

🌈**_Additional shape parameters_**

<ul>
  <li>opacity: {number} - A number between 0 and 1.</li>
  <li>velX: {number} - The shape's velocity along the x-axis.</li>
  <li>velY: {number} - The shape's velocity along the y-axis.</li>
</ul>

<div id="text"><h1>Text</h1></div>

🌈**_constructor(color, xPos, yPos, text, font, size, thickness, innerColor)_**

Prints text to the canvas. Text may be printed on multiple lines by inserting '\n' into the text parameter.

<ul>
  <li>color: {string} Any valid css color. </li>
  <li>xPos: {number or string} Position of text on x axis. xPos of text descibes leftmost point of text. Enter string 'center' to center on x axis.</li>
  <li>yPos: {number or string} Position of text on y axis. yPos of text describes uppermost point of text. Enter string 'center' to center on y axis.</li>
  <li>text: {string} The text to be displayed on screen.</li>
  <li>font: {string} Any valid font.</li>
  <li>size: {number} Size of font in pixels.</li>
  <li>thickness: {number} Optional! Width of font outline.</li>
  <li>size: {number} Optional! Inner color of text if an outline is present. Any valid css color. </li>
  </ul>

```javascript
const someText = new s.Text('red', 'center', 'center', 'HELLO! 👋 \n I ❤️ you', 'sans-serif', 28, 3, 'green');
someText.center = true;
/*
prints...
  HELLO!👋
  I ❤️ you
... with text object centered on the canvas and text alignment within the text object also centered.
*/
```

## **_Text Methods_**

🌈**_onClick(callback, triggerOnce)_**

What to do on mouse click.

<ul>
  <li>callback: {function} callback function to be executed when text is clicked</li>
  <li>triggerOnce: {boolean} Optional! falsy value - execute the callback function every time the text is clicked. truthy value - execute callback function only once. Default is false.</li>
</ul>

```javascript
myText.onClick(() => {
  myText.center = false;
});
// Will uncenter text alignment (align to left) on mouse click.
```

🌈**_onHold(callback)_**

What to do when mouse button is held down over shape or shape is touched for a sustained period of time. Callback will execute each tick of the loop while object is held.

<ul>
  <li>callback: {function} callback function to be executed when shape is held.</li>
</ul>

```javascript
myText.onHold(()=>{
  myText.text = Math.floor(Math.random()*10000));
});
// sets text to a new random number every tick of the loop while text object is held.
```

🌈**_drag()_**

Drag and drop the shape. Must be triggered in onHold method.

```javascript
myText.onHold(() => {
  myText.drag(); // drag and drop myText.
});
```

🌈**_destroy()_**

Remove all references to object.

🌈**_Additional text parameters_**

<ul>
  <li>opacity: {number} - A number between 0 and 1.</li>
  <li>velX: {number} - Velocity along the x-axis.</li>
  <li>velY: {number} - Velocity along the y-axis.</li>
  <li>center: {boolean} - True 👉 Set text alignment to centered. False 👉 Set text alignment to left.</li>
  <li>leading: {number} - Leading increases space between rows. 1.1 is default. Example 👉 *** myText.leading = 2; *** Double spaces text</li>
</ul>

<div id="sound"><h1>Sound</h1></div>

**A note on using web audio**

<ul>
  <li>Most web browsers will throw an error if you try to load or play audio before the user has interacted with the site.</li>
  <li>Best practice when using audio is to solicit a mouse click or touch from the user before creating an audio context and loading audio.</li>
  <li>If you load s2pd through a script tag in your html file's head most features of s2pd are available without a development server, but using audio will require you to be connected to a server.</li>
  <li>For more info on web audio 👉　https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API</li>
  </ul>
  
🌈***constructor(source, volume, loop, playbackRate)***

<ul>
  <li>source: {string} Audio source file path. </li>
  <li>volume: {number} Playback volume. A number between 0 and 1. Default is 0.5</li>
  <li>loop: {boolean} True 👉 Loop at end of playback. False 👉 Don't loop at end of playback.</li>
  <li>playbackRate: {number} Speed of playback. 1 is nomrmal speed. 0.5 is half normal speed. 2 is twice normal speed etc. Changing playback rate will also affect pitch on most browsers. Default is 1. </li>
  </ul>
  
  ```javascript
  const mySound = new s.Sound('./niceMusic.mp3', 0.3, true, 1);
  const startButton = new s.Text('red', 'center', 'center', 'START', 'sans-serif', 32);
  startButton.onClick(()=>{
    s.loadAudio(); // loads all audio files associated with the Sound class.
    mySound.play(); // mySound will begin playing when it is loaded.
  }, true); //trigger once

s.whileLoading(()=>{
console.log(s.percentLoaded) // print percent of assets loaded to console while loading.
});

s.onFirstTime(()=>{
mySound.play(); // play audio after assets are loaded and loop begins.
});

s.loop(function(){
//do some cool stuff.
});

````

***Sound Methods***
---

🌈***s.loadAudio()***
Global method to load ALL audio files.
Percent of audio files (and image files) loaded can be retrieved through the global variable 👉 s.percentLoaded

See above example for usage.

🌈***play()***

Plays audio file.

```javascript
mySound.play();
````

🌈**_stop()_**

Stops audio file.

```javascript
mySound.stop();
```

🌈**_pause()_**

Pause audio file. Will resume where it left off when play is called again.

```javascript
mySound.pause();
```

🌈**_Additional sound parameters_**

<ul>
  <li>loaded: {boolean} Is file loaded or not. </li>  
  <li>stopped: {boolean} Is file stopped or not. </li>  
</ul>

<div id="mouse"><h1>Mouse Methods</h1></div>

Mouse methods. Sprites, tiles, and shapes all have their own mouse methods. Refer to Sprite, Tile, and Shape sections of the API to see mouse methods for each individual class.

🌈**_onClick(callback, triggerOnce)_**

What to do on mouse click. Works for "touch clicks" too.

<ul>
  <li> callback: {function}  - a callback to be execruted on any mouse click.</li>
 <li> triggerOnce: {boolean} - Truthy value to trigger callback only one time, or falsy value to trigger on every click.
  </ul>
  
  ```javascript
    s.onClick(()=>{
      console.log('🐧');
    })
    //prints a penguin to the console every time user clicks mouse.
  ```
  
  🌈***mouse variables***
 
 <ul>
  <li>s.mouseX: current x position of mouse.</li>
  <li>s.mouseY: current y position of mouse.</li>
  </ul>


<div id="touch"><h1>Touch Methods</h1></div>

🌈**_onTouch(callback)_**

What to do when user is touching screen. For a touch click use s.onClick() method.

<ul>
  <li> callback: {function}  - a callback to be executed every tick of the loop while user is touching screen.</li>
  </ul>
  
  ```javascript
  const mySprite = new s.Sprite(100, 100, 'cool-image.png');
    s.onTouch(()=>{
      mySprite.xPos = s.touchMoveX;
      mySprite.yPos = s.touchMoveY;
    })
    //move sprite to touch coordinates everytime user moves their finger.
  ```

🌈**_touch variables_**

 <ul>
  <li>s.touchX: current x position of touch.</li>
  <li>s.touchY: current y position of touch.</li>
  <li>s.touchEndX: x position of last touch end.</li>
  <li>s.touchEndY: y position of last touch end.</li>
  <li>s.touchMoveX: x position of touch updated every time user moves finger</li>
  <li>s.touchMoveY: y position of touch updated every time user moves finger</li>
  </ul>

<div id="keyboard"><h1>Keyboard Methods</h1></div>

🌈**_keyDown(key, callback, triggerOnce)_**

What to do when user is holding keyboard key down.

 <ul>
  <li>key: {string or number} JS keycode (number) or a string. Example strings →　'space' for space key. ',' for comma. 'left' for left arrow. 'g' for g. '1' for 1. etc.</li>
  <li>callback:{function} function to be called on key down.</li>
  <li>triggerOnce: {boolean} Optional! Default is false. Trigger callback once while key is down (true), or trigger callback every tick while key is down(false).</li>
  </ul>
  
  ```javascript
  s.keyDown('right', ()=>{
    mySprite.xPos += 2;
  })
  //make sprite move 2 pixels to the right every tick that right arrow key is held down.
  ```
  
   🌈***keyUp(key, callback)***
 
 What to do when keyboard key is released.
 
 <ul>
  <li>key: {string or number} JS keycode (number) or a string. Example strings →　'space' for space key. ',' for comma. 'left' for left arrow. 'g' for g. '1' for 1. etc.</li>
  <li>callback:{function} function to be called when key is up.</li>
  </ul>
  
  ```javascript
  s.keyUp('space', ()=>{
    mySprite.jump(200);
  })
  //make sprite jump 200 pixels high when space key is lifted.
  ```
  
<div id="collision"><h1>Collision Detection</h1></div>

🌈**_onCollision(obj1, obj2, triggerOnce, callback)_**

Triggers a callback function when two game objects collide.

 <ul>
  <li>obj1: Any s2pd game object. </li>
  <li>obj2: Any s2pd game object.</li>
  <li>triggerOnce: {boolean} Trigger callback once while true, or trigger continually while true.</li>
  <li>callback: {function} A callback function that will be exectued every time object 1 and object 2 collide.</li>
  </ul>

```javascript
s.onCollision(mySprite, myOtherSprite, true, () => {
  myOtherSprite.destroy();
});
//destroy myOtherSprite on collision with mySprite.
```

<div id="methods"><h1>Methods for Lazy People</h1></div>

_Random numbers_

Random numbers are an essential part of game development and digital art. Here are some useful methods for obtaining them. ⬇︎

🌈**_choose(option1, option2)_**

Randomly choose between option 1 and 2.

<ul>
  <li>option1: {any}</li> 
  <li>option2: {any}</li>  
</ul>

```javascript
s.choose(thisSprite, thatSprite);
// returns either thisSprite or thatSprite randomly.
```

🌈**_randomBetween(min, max)_**

Returns a random integer between and including min and max.

```javascript
s.randomBetween(-1, 1);
// will return either -1, 0, or 1
```

🌈**_RandomNoRepeat(arr)_**

RandomNoRepeat is a class that creates an object that will return random selections from a list without repeating any previous selections until all items in the list have been selected. After all items have been selected the object will start from the beginning again. get() method returns an item.

<ul>
  <li>arr: {array} An array containing items you want returned to you in a randomized order without repetition.
  </ul>

```javascript
const fruits = ['🍌', '🍎', '🍓', '🍊', '🍈', '🍉'];
const getFruits = new s.RandomNoRepeat(fruits);
for (let i = 0; i < 12; i++) {
  console.log(getFruits.get());
}
// prints to the console...
// ["🍌"]
// ["🍈"]
// ["🍓"]
// ["🍉"]
// ["🍎"]
// ["🍊"]
// ["🍌"]
// ["🍓"]
// ["🍈"]
// ["🍊"]
// ["🍎"]
// ["🍉"]
```

🌈**_getRandomColor()_**

Will return a random color in rgb format.

```javascript
console.log(s.getRandomColor());
// in the console 👉 'rgb(29, 201, 144)'
```

🌈**_roundToDecimals(num, howManyDecimals)_**]

Returns inputed number rounded to decimals.

<ul>
  <li>num: {number} The number you want rounded. </li>
  <li>howManyDecimals: {number} How many decimal places to round the number.</li>
</ul>

```javascript
s.roundToDecimals(10 / 3, 3);
// returns 3.333
```
