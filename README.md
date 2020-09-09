# s2pd

Hi! 👋🌈  
s2pd is a stupidly simple HTML5 canvas and web audio library for making 2D games and art in JavaScript. As an example of what you can do with s2pd, here is a game thrown together in about an hour: <a href = "https://s2pd-example.netlify.app/">CLICK HERE TO PLAY EXAMPLE GAME🌈</a>

It is my hope that s2pd is easy and intuitive enough to be used by beginners, students, and anyone else who is curious about delving into the world of digital art.
<h2>Contents</h2>
  <ul>
    <li><a href="#install">Installation<a/></li>
     <li><a href="#tutorial">Quick Tutorial<a/></li>
     <li><a href="#api">API<a/></li>
  </ul>

<div id="install"></div>

# Installation 

On the command line.
```
git clone https://github.com/HatAndBread/s2pd.git
```

In your JavaScript file.
```javascript
import s from './s2pd/s2pd.js';
```
### OR

There are also two minified versions of s2pd available.<a href="https://github.com/HatAndBread/s2pd/blob/master/dist/s2pd.js">**s2pd.js**</a>  can be imported into your project as an es6 module. Alternatively, <a href="https://github.com/HatAndBread/s2pd/blob/master/dist/s2pd.glob.js"> **s2pd.glob.js**</a> can be included in the head section of your html file.

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
s.loop(function(){
  // Everything in this function will be called each tick of the loop.
})
```
All together we have...
```javascript
import s from './s2pd/s2pd.js';
s.ezSetup(); 
const clouds = new s.Background('./clouds.png');
clouds.velX = -2; 
s.loop(function(){})
```

Which gives us <a href ="https://thirsty-yalow-db5758.netlify.app/">**this**</a>

Now let's add a sprite. Making a sprite is simple in s2pd. All you need is an image file with your animation laid out in a single horizontal row with each frame evenly spaced. Let's use this image: 
<br>
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/hero.png" width="1000">
<br>
Here we have 35 evenly spaced frames. Perfect! We make a sprite like this: 
```javascript
const sprite = new s.Sprite(s.width / 2, s.height/2, './hero.png', 35, 4); // For a single frame sprite all you need is the first three arguments. 
```
This will create an animated sprite in the center of the canvas. 35 is the number of frames in the image and 4 is animation speed. An animation speed of 1 will change frames every time the program goes through the loop. A speed of 2 every will change frames every two ticks, etc.
<br><br>
Since our sprite file contains multiple animations we need to define where our animations begin and end. (There is no need to do this step if your sprite only has one animation). Let's animate our sprite blinking while facing to the right. The blink begins on frame 8 and continues for three frames after that, so...
```javascript
sprite.addAnimation('blinking-right', 8,3);
```
The default animation for sprites is to run through every frame of the entire image file. Since our sprite has multiple animations that would look weird, so let's set the current animation to **'blinking-right'**.
```javascript
sprite.changeAnimationTo('blinking-right');
```
And now we have an animated sprite!

Let's add one more animation and make our sprite turn to the left or right and walk when the left or right arrow keys on the keyboard are pressed.
```javascript
sprite.addAnimation('blinking-left', 12 ,3);
s.keyDown('right', ()=>{
  sprite.changeAnimationTo('blinking-right');
  sprite.xPos += 2; // will increase sprite's position on x axis by 2 pixels
})
s.keyDown('left', ()=>{
  sprite.changeAnimationTo('blinking-left'); 
  sprite.xPos -= 2;
})
```

<a href = "https://cranky-bell-0ea677.netlify.app/">**Here is the result**</a>

Our sprite is floating in the sky. That's strange. Let's make if feel the force of gravity. 
```javascript
sprite.feelGravity(12); // A range from about 5 to 20 is good. 5 is moonish gravity. 14 is Earthish. 30 is Jupiterish. 14 is default.
```
Oh no! Our sprite is falling! Let's put some ground below it. This time let's use the Tile class. The tile class is similar to the Background class, except it won't necessarily take up the entire background. Let's use this image: 
<br>
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/ground.png">
```javacript
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
```
This will create a tile centered horizontally, 3/4ths the height of the canvas vertically, repeating 2 times on the x axis and 1 time on the y axis. Now let's make the tile into a platform so our sprite won't fall through it.
```javascript
ground.platform(true); // passing a truthy value as an argument will make the object into a block, meaning that objects with gravity will not be able to pass through them from any direction (from above, below, left, or right).
```
Yay! Our sprite has a platform to stand on. Now let's give it the ability to jump. 
```javascript
s.keyUp('space', ()=>{
  sprite.jump(200, true); // will make sprite jump 200 pixels.
}); // passing a truthy value as the second arguement in jump method will disable "double jumps", i.e. sprite won't be able to jump again until the jump is complete.
```
Here's what we have. Not bad! But a little boring. Let's gameify our game. Let's make a flying circle that will destroy our sprite if they collide.
```javascript
const evilCircle = new s.Circle(s.getRandomColor(), -30, s.randomBetween(-10, s.height), s.randomBetween(20, 30))
// Make a randomly colored circle 30 pixels off to the leftt of the canvas at a random height between -10 and canvas height and with a random radius between 20 and 30.
evilCircle.velX = 8; // Make the circle travel horitontally 8 pixels per frame.
s.onCollision(evilCircle, sprite, true, ()=>{　// A truthy third argument will trigger the callback function only once while objects are colliding.
  ground.notPlatform(); // Ground is no longer a platform so our sprite will fall. 😢
  evilCircle.destroy(); // Delete all references to evilCircle.
});
```
In our loop callback let's add this code. 
```javascript
s.loop(function () {
   if (evilCircle.xPos + evilCircle.radius > s.width) { // if evil circle goes beyond width of canvas...
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
sprite.addAnimation('blinking-right', 8, 3);
sprite.changeAnimationTo('blinking-right');
sprite.addAnimation('blinking-left', 12, 3);
s.keyDown('right', () => {
    sprite.changeAnimationTo('blinking-right');
    sprite.xPos += 2;
})
s.keyDown('left', () => {
    sprite.changeAnimationTo('blinking-left');
    sprite.xPos -= 2;
})
sprite.feelGravity(12);
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
ground.platform(true);
s.keyUp('space', () => {
    sprite.jump(200, true);
});
const evilCircle = new s.Circle(s.getRandomColor(), -30, s.randomBetween(-10, s.height), s.randomBetween(20, 30))
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
<li><a href="#methods">Methods</a></li>
</ul>

<div id="canvas"><h1>Canvas</h1></div>

🌈***ezSetup()***

Sets your project up quickly with default settings.
Creates canvas element with id 'canvas', sizes canvas to 900x600 on larger screens, sizes to window width and window height on mobile screens, automatically resizes on mobile orientation change, and prevents window movement on canvas touch and use of keyboard arrow keys.
 * ezSetup is not recommended for integration with existing projects as it is likely to change the flow of your document in unexpected ways.

```javascript
s.ezSetup();
```

🌈***createCanvas(id, width, height)***

Create a new html5 canvas element.

<ul>
  <li>id: {string} id of html5 canvas element.</li>
  <li>width: {number} width of canvas in pixels. </li>
  <li>height: {number} height of canvas in pixels. </li>
</ul>

```javascript
  s.createCanvas('canvas',900,600)
  // creates a 900x600 canvas
```

🌈***addCanvas(id, width, height)***

Add canvas context to an existing html5 canvas element.

<ul>
  <li>id: {string} id of html5 canvas already existing in your project.</li>
  <li>width: {number} width of canvas in pixels. </li>
  <li>height: {number} height of canvas in pixels. </li>
</ul>

```javascript
  s.addCanvas('someCanvasElementAlreadyInYourProject',900,600)
  // adds context to canvas and size 900x600
```

🌈***backgroundColor(color)***

Change background color of canvas.

<ul>
  <li>color: {string} Any valid css color passed as a string. </li>
</ul>

```javascript
  s.backgroundColor('rgb(140,224,98)');
  // color parameter: any valid css color
```

🌈***canvasOpacity(opacity)***

Change opacity of canvas.

<ul>
  <li>opacity: {number} A number between 0 and 1. 0 is invisible. 1 is fully visible.</li>
</ul>

```javascript
s.canvasOpacity(0.5)
// opacity parameter: a number between 0 and 1
```

🌈***stillCanvas(how)***

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

<div id="loop"><h1>Loop</h1></div>

🌈***loop(callback)***

Creates a game loop or animation loop. The loop function is an essential element of most applications. Without it only static images are possible. The computer will run through the loop roughly 60 times per second, executing the callback function each time through. The callback function should contain all tasks that you wanted carried out each go around of the loop.

<ul>
  <li>callback: {function} a callback function that will be executed every time through the loop.</li>
</ul>

```javascript
 s.loop(function(){
   if (mySprite.xPos >= s.width){
     mySprite.xPos = 0;
 }
}
```
🌈***stopLoop()***

Stops the loop. 

```javascript
s.stopLoop();
}
```



🌈***clear()***

Clears the canvas at the beginning of the loop. If clear is not called the image drawn to the canvas during the previous go through of the loop will remain.

```javascript
s.clear();
```

🌈***dontClear()***

Undoes the clear() method. Prevents the image drawn to the canvas during the previous go through of the loop from being cleared.

```javascript
let randomNumber = Math.floor(Math.random()*10)
randomNumber === 0 ? s.clear() : s.dontClear()
// clears the canvas if random number is 0, otherwise prevents the canvas from being cleared.
```


<div id="sprites"><h1>Sprites</h1></div>

**Note: Sprite sheets must be laid out in a single horizontal row with each frame equally sized.**
Example ↓

<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/hero.png" width="1000">

🌈***constructor(xPos, yPos, source, numberOfFrames, animationSpeed)***

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

***Methods***
---

🌈***addAnimation(name, startFrame, numberOfFrames)***

<ul>
  <li>name: {string} a string to call the animation by when changing animations.</li>
  <li>startFrame: {number} the frame in the sprite sheet where the animation begins.</li>
  <li>numberOfFrames: {number} the number of frames the animation continues for.</li>
</ul>

```javascript
const bunny = new s.Sprite(s.width/2, s.height/2, './bunny.png', 4,4);
bunny.addAnimation('jump', 3,1);
// Creates a two frame animation called 'jump'. Begins on frame 3 and continues for 1 frame (until frame 4).
```

🌈***changeAnimationTo(name)***

Change the sprite's current animation.

<ul>
  <li>name: {string} The name of the animation.</li>
</ul>

```javascript
bunny.changeAnimationTo('jump');
//changes current animation to 'jump'.
```

🌈***onClick(callback, triggerOnce)***

What to do on mouse click.

<ul>
  <li>callback: {function} callback function to be executed when sprite is clicked</li>
  <li>triggerOnce: {boolean} falsy value - execute the callback function every time sprite is clicked. truthy value - execute callback function only once.</li>
</ul>

```javascript
bunny.onClick(()=>{
bunny.changeAnimationTo('jump');
  bunny.jump(200);
}, false)
// bunny will jump 200 pixels high each time iot is clicked. 
```
  
🌈***onHold(callback)***

What to do when mouse button is held down over object or object is touched for a sustained period of time. 

<ul>
  <li>callback: {function} callback function to be executed when sprite is held.</li>
</ul>

```javascript
bunny.onHold(()=>{
  bunny.drag(); // drag and drop the sprite. 
});
```

🌈***drag()***

Drag and drop the sprite. Must be triggered in onHold method.

```javascript
bunny.onHold(()=>{
  bunny.drag(); 
});
```

🌈***feelGravity(gravity)***

Make your sprite feel the force of gravity. Will fall unless it lands on a platform.  

<ul>
  <li>gravity: {number} A number describing the strength of gravity. Higher number is more gravity. Default is 14. </li>
</ul>

```javascript
bunny.feelGravity(10);
});
```

🌈***noGravity()***

Remove a sprite's ability to feel gravity.

```javascript
rabbit.noGravity();
```

🌈***jump(howHigh, noDoubleJumps)***

Make object jump. Gravity must be enabled using the feelGravity method for the jump method to work.

<ul>
  <li>howHigh: {number} How high to make object jump in pixels. </li>
  <li>noDoubleJumps: {boolean} Prevent object from jumping when it is not on a platform. Default is false.</li>
</ul>

```javascript
rabbit.feelGravity(10);
rabbit.onClick(()=>{
  rabbit.jump(200);
},true);
//Make rabbit jump 200 pixels when clicked. Will not be able to jump again until it has landed on a platform.
```

🌈***platform(blockify)***

Make sprite into a platform. Objects with gravity will not fall through platforms. 
<ul>
  <li>blockify: {boolean} Default value is false. If platform is a block objects with gravity will not be able to pass through it either from above, below, or to the sides. If platform is not a block objects will be prevented from passing from above.</li>
</ul>

```javascript
const bricks = new s.Sprite(200, 200, './bricks.png');
bricks.platform(true);
//bricks sprite is turned into a platform which objects with gravity will not be able to pass through from any direction.
```

🌈***notPlatform()***

Disable the sprite as a platform.

```javascript
bricks.notPlatform();
```

🌈***updateSize(howMuch)***

 Increase or decrease sprite's size. 
 
<ul>
  <li>howMuch: 0.5 for half current size. 2 for twice current size, etc.</li>
</ul>  

```javascript
rabbit.updateSize(0.5);
// make rabbit half its current size.
```

🌈***destroy()***

Remove all references to sprite.

🌈***Additional sprite parameters***

<ul>
  <li>velX: {number} - The object's velocity along the x-axis.</li>
  <li>velY: {number} - The object's velocity along the y-axis.</li>
  <li>opacity: {number} - A number between 0 and 1.</li>
  <li>width: {number} - *read-only*</li>
  <li>height: {number} - *read-only*</li>
  <li>gravity: {number} - *read-only*</li>
  <li>dragging: {boolean} - *read-only* -  is currently being dragged.</li>
  <li>jumping: {boolean} - *read-only* - is currently jumping.</li>
</ul>

<div id="tiles"><h1>Tiles</h1></div>

<div id="backgrounds"><h1>Backgrounds</h1></div>

**Note: Like** <a href="sprites">sprite sheets</a>**, background animations must be laid out in a single horizontal row with each frame equally sized **
The Background class automatically creates an infinitely repeating tile background taking up the entire width and height of your canvas (and infinitely beyond)! Takes the hard work out of creating scrolling backgrounds and parralax effects.

🌈***constructor(source, numberOfFrames, animationSpeed)***

<ul>
  <li>source: {string} Source file of your background. </li>
  <li>numberOfFrames: {number} Optional. The number of frames in your background animation. Leave blank if your background is not an animation.</li>
  <li>animationSpeed: {number} Optional. Speed of animation. 1 is the fastest possible speed. A speed of 1 will change frames every time through the loop. A speed of 2 will change frames every two times through the loop, etc. Leave blank if your background is not an animation. </li>
  </ul>
  
```javascript
const sky = new s.Background('./sky.png', 10,4);
// creates an animated background with 10 frames and a speed of four.
```

***Methods***
---

🌈***addAnimation(name, startFrame, numberOfFrames)***

Add an animation to the background.

<ul>
  <li>name: {string} a string to call the animation by when changing animations.</li>
  <li>startFrame: {number} the frame in the sprite sheet where the animation begins.</li>
  <li>numberOfFrames: {number} the number of frames the animation continues for.</li>
</ul>

```javascript
const sky = new s.Background(s.width/2, s.height/2, './bunny.png', 4,4);
sky.addAnimation('rain', 3,1);
// Creates a two frame animation called 'rain'. Begins on frame 3 and continues for 1 frame (until frame 4).
```

🌈***changeAnimationTo(name)***

Change the background's current animation.

<ul>
  <li>name: {string} The name of the animation.</li>
</ul>

```javascript
sky.changeAnimationTo('sunny');
//changes current animation to 'sunny'.
```

🌈***destroy()***

Remove all references to background.

🌈***Additional background parameters***

<ul>
  <li>opacity: {number} - A number between 0 and 1.</li>
</ul>

<div id="shapes"><h1>Shapes</h1></div>

<div id="text"><h1>Text</h1></div>

<div id="sound"><h1>Sound</h1></div>

<div id="mouse"><h1>Mouse</h1></div>

<div id="touch"><h1>Touch</h1></div>

<div id="keyboard"><h1>Keyboard</h1></div>

<div id="methods"><h1>Methods</h1></div>



## Table of contents
