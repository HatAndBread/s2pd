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

There are also two minified versions of s2pd available in the dist folder. s2pd.js can be included in a project as an es6 module. Alternatively, s2pd.glob.js can be included in your index.html file to create a global variable, 's'.

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
clouds.velX = -2; //clouds move -2 pixels along the x axis each call of the animation loop.
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
s.loop(function(){
  // Everything in this function will be called each tick of the loop.
})
```

Which gives us this...

We can also make the clouds go up or down with velY.

# API

## Creating a canvas

## Table of contents
