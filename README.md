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
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/clouds.png" width="200">
The Background class will automatically create an infinitely repeating tile background taking up the entire width and height of your canvas (and infinitely beyond)!
```javascript
const clouds = new s.Background('./clouds.png');
```
Now let's make the clouds appear to move. We can use the backgrounds velX property (velocity along the x axis) to make the clouds drift to the left.
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
<img src="https://github.com/HatAndBread/s2pd/blob/master/dist/example/hero.png" width="200">
Here we have 35 evenly spaced frames. Perfect! We make a sprite like this: 
```javascript
const sprite = new s.Sprite(s.width / 2, s.height/2, './hero.png', 35, 4); // For a single frame sprite all you need is the first three arguments. 
```
This will create an animated sprite in the center of the canvas. 35 is the number of frames in the image and 4 is animation speed. An animation speed of 1 will change frames every tick of the loop. A speed of 2 every two ticks, etc.
<br>
Since our sprite file contains multiple animations we need to define where our animations begin and end. (There is no need to do this step if your sprite only has one animation). Let's animate our sprite blinking while facing right. The blink begins on frame 8 and continues for three frames after that, so...
```javascript
sprite.addAnitimation('blinking-right', 8,3);
```
Our sprite will automatically be animated for each frame in the image file. That would like weird, so let's set it to just animate the blinking part.
```javascript
sprite.changeAnimationTo('blinking-right);
```
And now we have an animated sprite!




# API

## Creating a canvas

## Table of contents
