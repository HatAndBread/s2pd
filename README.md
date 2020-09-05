# UNDER CONSTRUCTION 😇

# s2pd

Hi! 👋🌈  
s2pd is a stupidly simple HTML5 canvas and web audio library for making 2D games and art in JavaScript. Here is a game written in s2pd in just 200 lines of code: 

It is my hope that s2pd is easy and intuitive enough to be used by beginners, students, and anyone else who is curious about delving into the world of digital art.

# Installation 
On the command line.
```
npm install s2pd
```
In your JavaScript file.
```javascript
import s from 's2pd';
```
### OR

There are also two minified versions of s2pd available in the dist folder. **s2pd.js** can be included in your project as an es6 module. Alternatively, **s2pd.glob.js** can be included in your index.html file to create a global variable, 's'.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>s2pd</title>
  <script src="s2pd.glob.js" defer></script>
  <script src="main.js" defer></script>
</head>

<body></body>

</html>
```
# Quick tutorial

Let's make a stupidly simple game! First, let's create a canvas.

```javascript
import s from 's2pd';
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
import s from 's2pd';
s.ezSetup(); 
const clouds = new s.Background('./clouds.png');
clouds.velX = -2; 
s.loop(function(){})
```

Which gives us this...

Now let's add a sprite. Making a sprite is simple in s2pd. All you need is an image file with your animation laid out in a single horizontal row with each frame evently spaced. Let's use this image: 
<br>
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/hero.png" width="1000">
<br>
Here we have 35 evenly spaced frames. Perfect! We make a sprite like this: 
```javascript
const sprite = new s.Sprite(s.width / 2, s.height/2, './hero.png', 35, 4); // For a single frame sprite all you need is the first three arguments. 
```
This will create an animated sprite in the center of the canvas. 35 is the number of frames in the image and 4 is animation speed. An animation speed of 1 will change frames every tick of the loop. A speed of 2 every two ticks, etc.
<br><br>
Since our sprite file contains multiple animations we need to define where our animations begin and end. (There is no need to do this step if your sprite only has one animation). Let's animate our sprite blinking while facing to the right. The blink begins on frame 8 and continues for three frames after that, so...
```javascript
sprite.addAnitimation('blinking-right', 8,3);
```
The default animation for sprites is to run through every frame of the entire image file. Since our sprite has multiple animations that would look weird, so let's set the current animation to **'blinking-right'**.
```javascript
sprite.changeAnimationTo('blinking-right);
```
And now we have an animated sprite!

Let's add one more animation and make our sprite turn to the left or right when the left or right arrow keys on the keyboard are pressed.
```javascript
sprite.addAnitimation('blinking-left', 12 ,3);
s.keyUp('right', ()=>{
  sprite.changeAnimationTo('blinking-right');
})
s.keyUp('left', ()=>{
  sprite.changeAnimationTo('blinking-left'); 
})
```

Here is the result:

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
  sprite.jump(200); // will make sprite jump 200 pixels.
}, true); // passing a truthy value as the 3rd arguement will disable "double jumps", i.e. sprite won't be able to jump again until the jump is complete.
```
Here's what we have. Not bad! But a little boring. Let's gameify our game. Let's make a flying circle that will destroy our sprite if they collide.
```javascript
const evilCircle = new s.Circle(s.getRandomColor(), s.width + 30, s.randomBetween(-10, s.height), s.randomBetween(20, 30))
// make a randomly colored circle 30 pixels off to the right of the canvas at a random height between -10 and canvas height and with a random radius between 20 and 30.
evilCircle.velX = -10;
if (evilCircle.xPos + evilCircle.radius < 0){
  evilCircle.xPos = s.width+30; //xPos is the objects position on the x axis.
}
s.onCollision(evilCircle, sprite, true, ()=>{　// a truthy third argument will trigger the callback function only once while objects are colliding.
  sprite.destroy(); //delete all references to our sprite😢
});
```
All together...
```javascript
import s from 's2pd';
s.ezSetup(); 
const clouds = new s.Background('./clouds.png');
clouds.velX = -2; 
const sprite = new s.Sprite(s.width / 2, s.height/2, './hero.png', 35, 4);
sprite.addAnitimation('blinking-right', 8,3);
sprite.changeAnimationTo('blinking-right);
sprite.addAnitimation('blinking-left', 12 ,3);
s.keyUp('right', ()=>{
  sprite.changeAnimationTo('blinking-right');
})
s.keyUp('left', ()=>{
  sprite.changeAnimationTo('blinking-left'); 
})
sprite.feelGravity(12);
const ground = new s.Tile('./ground.png', s.width / 2, s.height * 0.75, 2, 1);
ground.platform(true);
s.keyUp('space', ()=>{
  sprite.jump(200); 
}, true);
const evilCircle = new s.Circle(s.getRandomColor(), s.width + 30, s.randomBetween(-10, s.height), s.randomBetween(20, 30))
evilCircle.velX = -10;
if (evilCircle.xPos + evilCircle.radius < 0){
  evilCircle.xPos = s.width+30; 
}
s.onCollision(evilCircle, sprite, true, ()=>{　
  sprite.destroy(); 
});

s.loop(function(){})
```

Let's give our game a try.
There we have it! A working game, albeit a rather simple one. What can you create?





# API

## Creating a canvas

## Table of contents
