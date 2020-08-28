var s2pd=function(t){var i={};function e(s){if(i[s])return i[s].exports;var h=i[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,e),h.l=!0,h.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)e.d(s,h,function(i){return t[i]}.bind(null,h));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i),e.d(i,"clear",(function(){return C})),e.d(i,"dontClear",(function(){return M})),e.d(i,"s2pd",(function(){return o})),e.d(i,"loop",(function(){return a})),e.d(i,"createCanvas",(function(){return n})),e.d(i,"addCanvas",(function(){return r})),e.d(i,"stillCanvas",(function(){return c})),e.d(i,"backgroundColor",(function(){return d})),e.d(i,"canvasOpacity",(function(){return l})),e.d(i,"randomNumSetNoRepeat",(function(){return u})),e.d(i,"getRandomColor",(function(){return g})),e.d(i,"randomBetween",(function(){return m})),e.d(i,"roundToDecimals",(function(){return p})),e.d(i,"choose",(function(){return x})),e.d(i,"Sprite",(function(){return s})),e.d(i,"Circle",(function(){return y})),e.d(i,"Ellipse",(function(){return f})),e.d(i,"Rectangle",(function(){return j})),e.d(i,"Line",(function(){return P})),e.d(i,"Text",(function(){return w})),e.d(i,"Background",(function(){return h})),e.d(i,"keyDown",(function(){return B})),e.d(i,"keyUp",(function(){return A})),e.d(i,"enableAudio",(function(){return N})),e.d(i,"Sound",(function(){return T})),e.d(i,"Synth",(function(){return Y}));class s{constructor(t,i,e,s,h,a,n){this.xPos=t,this.yPos=i,this.numberOfFrames=e,this.width=a,this.height=n,this.velX=0,this.velY=0,this.animationSpeed=h+60%h/Math.floor(60/h),this.refreshRate=60/h,this.loopLength=0,this.timeThroughLoop=0,this.currentFrame=0,this.animations=[[0,0,0,0,0]],this.currentAnimation=0,this.currentAnimationName="",this.opacity=1,this.timeStamp=Date.now(),this.loaded=!1,this.loader=new Promise((t,i)=>{this.theImage=new Image,this.theImage.src=s,this.theImage.addEventListener("load",t,{once:!0}),this.theImage.addEventListener("error",i,{once:!0})}).then(()=>{this.loaded=!0,o.loadedAssets+=1,o.finalize(this),this.updatePos()}).catch(t=>{console.error("Sprite was unable to load."),console.error(t)}),o.objectsToLoad.push(this)}updatePos(){o.allGameObjects[this.id]=this,this.hitBoxX=this.xPos,this.hitBoxY=this.yPos,this.hitBoxWidth=this.width,this.hitBoxHeight=this.height;let t=this.theImage.height,i=this.theImage.width/this.numberOfFrames;this.loopLength=this.refreshRate*this.animations[this.currentAnimation][2],this.timeThroughLoop===this.animationSpeed&&(this.currentFrame+=1,this.timeThroughLoop=0,this.currentFrame>=this.animations[this.currentAnimation][2]&&(this.currentFrame=0)),o.ctx.globalAlpha=this.opacity,o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos,this.yPos,this.width,this.height),o.ctx.globalAlpha=1,this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength),!0===this.dragging?(o.dragArray[0]=this,o.draggingWithMouse?(this.xPos=o.mouseX-this.width/2,this.yPos=o.mouseY-this.height/2):(this.xPos=o.touchMoveX-this.width/2,this.yPos=o.touchMoveY-this.height/2)):(this.xPos+=this.velX,this.yPos+=this.velY,this.detectHit&&(this.hitBoxX=this.xPos,this.hitBoxY=this.yPos,this.hitBoxWidth=this.width,this.hitBoxHeight=this.height,o.hitDetectObjects[this.hitBoxId]=this)),this.timeThroughLoop+=1}addAnimation(t,i,e){this.animations.push([t,i,e]),this.currentAnimationName=t}changeAnimationTo(t){for(let i=0;i<this.animations.length;i++)this.animations[i][0]===t&&(this.currentAnimation=i),this.currentAnimationName=t}hitDetect(){this.detectHit=!0,this.hitBoxId=o.hitDetectObjects.length,o.hitDetectObjects.push(this)}makeClickable(){this.clickable=!0,this.draggable=!1,this.clickableId=o.clickableObjects.length,o.clickableObjects.push(this)}onClick(t){this.makeClickable(),this.clickFunction=t,this.clicked=!1}makeDraggable(){this.draggable=!0,this.clickable=!1,this.draggableId=o.draggableObjects.length,o.draggableObjects.push(this)}makeHoldable(){this.holdable=!0,this.clickable=!1,this.draggable=!1,this.holdableId=o.holdableObjects.length,o.holdableObjects.push(this)}jump(t,i){this.jumpHeight=t,this.jumpLength=i,this.jumpFrames=0,this.jumping=!0}moveTo(t,i){this.xPos=t,this.yPos=i}updateSize(t){t<0?(this.width>-1*t&&(this.width*=t,this.hitBoxWidth=this.width),this.height>-1*t&&(this.height*=t,this.hitBoxHeight=this.height)):(this.width*=t,this.height*=t,this.hitBoxHeight=this.height,this.hitBoxWidth=this.width)}destroy(){if(this.clickable&&o.clickableObjects.splice(this.clickableId,1),this.detectHit){o.hitDetectObjects.splice(this.hitBoxId,1);for(let t=0;t<o.hitDetectObjects.length;t++)o.hitDetectObjects[t].hitBoxId=t}o.allGameObjects.splice(this.id,1)}}class h{constructor(t,i,e,s,h,a,n){this.xPos=t,this.yPos=i,this.numberOfFrames=e,this.width=a,this.height=n,this.farXpos=this.xPos+this.width,this.negFarXPos=0,this.velX=0,this.velY=0,this.source=s,this.scrolling=!1,this.animationSpeed=h+60%h/Math.floor(60/h),this.refreshRate=60/h,this.loopLength=0,this.timeThroughLoop=0,this.currentFrame=0,this.animations=[[0,0,0,0,0]],this.currentAnimation=0,this.opacity=1,this.timeStamp=Date.now(),this.theImage=document.createElement("img"),o.finalize(this),this.load()}load(){o.objectsToLoad.push(this)}make(){o.ctx.globalAlpha=this.opacity;let t=this.theImage.height,i=this.theImage.width/this.numberOfFrames;if(this.loopLength=this.refreshRate*this.animations[this.currentAnimation][2],this.timeThroughLoop===this.animationSpeed&&(this.currentFrame+=1,this.timeThroughLoop=0,this.currentFrame>=this.animations[this.currentAnimation][2]&&(this.currentFrame=0)),this.scrolling||o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos,this.yPos,this.width+1,this.height),this.scrolling){if(this.width<o.width/2){this.farXpos=this.width*Math.ceil(o.width/this.width)+this.xPos,this.negFarXPos=this.width*Math.ceil(o.width/this.width)*-1+this.xPos;for(let e=0;e<Math.ceil(o.width/this.width);e++)o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos+e*this.width,this.yPos,this.width+1,this.height);if(this.xPos>0)for(let e=0;e<Math.ceil(o.width/this.width);e++)o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos-e*this.width,this.yPos,this.width+1,this.height);this.farXpos<o.width&&(o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.farXpos,this.yPos,this.width+1,this.height),this.xPos=0),this.negFarXPos>=-this.width&&(this.xPos=0)}if(this.width>=o.width/2&&this.width<o.width){this.farXpos=this.xPos+this.width;let e=2*this.width-o.width+this.width;o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos,this.yPos,this.width+1,this.height),o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.farXpos,this.yPos,this.width+1,this.height),o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,2*this.width+this.xPos,this.yPos,this.width+1,this.height),o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,3*this.width+this.xPos,this.yPos,this.width+1,this.height),this.xPos<=-1*e&&(this.xPos=-1*(2*this.width-o.width)),this.xPos>=0&&(o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos-this.width,this.yPos,this.width+1,this.height),this.xPos>=this.width&&(this.xPos=0,o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos,this.yPos,this.width+1,this.height)))}this.width>=o.width&&(this.farXpos=this.xPos+this.width,o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos,this.yPos,this.width+1,this.height),this.farXpos<=o.width&&(o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.farXpos,this.yPos,this.width+1,this.height),this.farXpos<=o.width-o.width&&(this.xPos=0)),this.xPos>=0&&(o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos-this.width,this.yPos,this.width+1,this.height),this.xPos>=this.width&&(this.xPos=0,o.ctx.drawImage(this.theImage,this.animations[this.currentAnimation][1]*i+this.currentFrame*i,0,i,t,this.xPos,this.yPos,this.width+1,this.height))))}o.ctx.globalAlpha=1,this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength),this.timeThroughLoop+=1}makeScrollable(){this.scrolling=!0}addAnimation(t,i,e){this.animations.push([t,i,e])}changeAnimationTo(t){for(let i=0;i<this.animations.length;i++)this.animations[i][0]===t&&(this.currentAnimation=i)}jump(t,i){this.jumpHeight=t,this.jumpLength=i,this.jumpFrames=0,this.jumping=!0}moveTo(t,i){this.xPos=t,this.yPos=i}stop(){this.velX=0,this.velY=0}updatePos(){o.allBackgrounds[this.id]=this,this.xPos+=this.velX,this.yPos+=this.velY}autoSize(){let t=o.height/this.height;this.height=o.height,this.width=t*this.width,this.farXpos=this.xPos+o.width}updateSize(t){t<0?(this.width>-1*t&&(this.width*=t,this.farXpos=this.xPos+this.width,this.newFarXpos=this.farXpos+this.width),this.height>-1*t&&(this.height*=t)):(this.width*=t,this.height*=t),this.farXpos=this.xPos+this.width,this.newFarXpos=this.farXpos+this.width}updateOpacity(t){t<0?this.opacity>-1*t&&(this.opacity+=t):this.opacity+=t}destroy(){o.allBackgrounds.splice(this.id,1)}}var o={loadedAssets:0,objectsToLoad:[],percentLoaded:0,allAudioObjects:[],touching:!1,loadedAudio:[],allGameObjects:[],allBackgrounds:[],clickableObjects:[],draggableObjects:[],dragArray:[],holdableObjects:[],hitDetectObjects:[],dragStarted:!1,draggingWithMouse:!0,holdStarted:!1,clear:!1,mouseX:null,mouseY:null,touchX:null,touchY:null,touchMoveX:null,touchMoveY:null,touchEndX:null,touchEndY:null,keyboardUp:null,keyboardDown:null,orientation:void 0,exit:!1,enableDragAndDrop:!0,firstTimeThroughLoop:!0,canvas:null,ctx:null,finalize:function(t){t instanceof s&&t.animations.shift(),t instanceof h?this.allBackgrounds.push(t):this.allGameObjects.push(t)},jump:function(t,i,e){e<1&&(e=1),t.jumpFrames+=1,t.jumpFrames>0&&t.jumpFrames<=e?t.yPos-=i/10/e:t.jumpFrames>e&&t.jumpFrames<=2*e?t.yPos-=i/20/e:t.jumpFrames>2*e&&t.jumpFrames<=3*e?t.yPos-=i/25/e:t.jumpFrames>3*e&&t.jumpFrames<=4*e?t.yPos-=i/50/e:t.jumpFrames>4*e&&t.jumpFrames<=5*e?t.yPos+=i/50/e:t.jumpFrames>5*e&&t.jumpFrames<=6*e?t.yPos+=i/25/e:t.jumpFrames>6*e&&t.jumpFrames<=7*e?t.yPos+=i/20/e:t.jumpFrames>7*e&&t.jumpFrames<=8*e?t.yPos+=i/10/e:(t.jumping=!1,t.jumpFrames=0)}};function a(t){o.percentLoaded=o.objectsToLoad.length/o.loadedAssets*100,o.percentLoaded===1/0&&(o.percentLoaded=0),o.clear&&o.ctx.clearRect(0,0,o.width,o.height);for(let t=0;t<o.allAudioObjects.length;t++)o.allAudioObjects[t].ended&&(o.allAudioObjects.nowPlaying=!1);for(let t=0;t<o.allBackgrounds.length;t++)o.allBackgrounds[t].id=t,o.allBackgrounds[t].updatePos(),o.allBackgrounds[t].autoSize();for(let t=0;t<o.allGameObjects.length;t++)o.allGameObjects[t].id=t,o.allGameObjects[t].updatePos();for(let t=0;t<o.clickableObjects.length;t++)o.clickableObjects[t].clickableId=t;if(o.hitDetectObjects.length>0)for(let t=0;t<o.hitDetectObjects.length;t++)o.hitDetectObjects[t].hitBoxId=t;if(o.enableDragAndDrop)for(let t=0;t<o.draggableObjects.length;t++)o.draggableObjects[t].draggableId=t;const i="The loop() method requires a callback function😭 Example ===> loop(function(){//do something})";if(t&&"function"==typeof t?t():(console.error(i),o.exit=!0),o.hitDetectObjects.length>1)for(let t=0;t<o.hitDetectObjects.length;t++)for(let i=0;i<o.hitDetectObjects.length;i++)if(t!==i&&o.hitDetectObjects[t].hitBoxX<=o.hitDetectObjects[i].hitBoxX+o.hitDetectObjects[i].hitBoxWidth&&o.hitDetectObjects[t].hitBoxX+o.hitDetectObjects[t].hitBoxWidth>=o.hitDetectObjects[i].hitBoxX&&o.hitDetectObjects[t].hitBoxY<=o.hitDetectObjects[i].hitBoxY+o.hitDetectObjects[i].hitBoxHeight&&o.hitDetectObjects[t].hitBoxY+o.hitDetectObjects[t].hitBoxHeight>=o.hitDetectObjects[i].hitBoxY){let e=o.hitDetectObjects[t],s=o.hitDetectObjects[i];const h=new CustomEvent("collision",{detail:[e,s]});document.dispatchEvent(h);break}o.exit||requestAnimationFrame((function(){a(t)}))}function n(t,i,e){o.canvas=document.createElement("canvas"),o.canvas.id=t,o.canvas.width=i,o.canvas.height=e,document.body.appendChild(o.canvas),o.ctx=o.canvas.getContext("2d"),o.width=i,o.height=e}function r(t,i,e){o.canvas=document.getElementById(t),o.canvas.width=i,o.canvas.height=e,o.ctx=o.canvas.getContext("2d"),o.width=i,o.height=e}function c(){o.canvas.style.touchAction="none"}function d(t,i,e,s){o.canvas.style.backgroundColor=s||0===s?`rgba(${t},${i},${e},${s})`:`rgb(${t},${i},${e})`}function l(t){o.canvas.style.opacity=t}class u{constructor(t,i){this.max=i,this.min=t,this.originalMax=i,this.originalMin=t,this.numArray=[],this.randomizedArray=[],this.arrayWidth=this.originalMax-this.originalMin,this.numnum=0,this.numnum2=0,this.numnum3=0,this.make()}make(){for(let t=0;t<this.arrayWidth+1;t++)this.numArray[t]=this.min,this.min+=1;for(let t=0;t<this.arrayWidth+1;t++)this.numnum=Math.floor(Math.random()*this.numArray.length),this.numnum2=this.numArray[this.numnum],this.randomizedArray.push(this.numnum2),this.numArray.splice(this.numnum,1)}getNum(){return this.randomizedArray.length>1?(this.numnum3=this.randomizedArray[0],this.randomizedArray.splice(0,1),this.numnum3):1===this.randomizedArray.length?(this.numnum3=this.randomizedArray[0],this.randomizedArray.splice(0,1),this.numArray.splice(0,this.numArray.length),this.randomizedArray.splice(0,this.randomizedArray.length),this.max=this.originalMax,this.min=this.originalMin,this.numnum=0,this.numnum2=0,this.make(this.originalMin,this.originalMax),this.numnum3):void 0}}function m(t,i){return Math.floor(Math.random()*(i-t+1))+t}function g(){return`rgb(${m(0,255)},${m(0,255)},${m(0,255)})`}function p(t,i){let e;switch(i){case 0:e=1;break;case 1:e=10;break;case 2:e=100;break;case 3:e=1e3;break;case 4:e=1e4;break;case 5:e=1e5;break;case 6:e=1e6;break;default:e=100,console.log("choose a valid number idiot")}return Math.round((t+Number.EPSILON)*e)/e}function x(t,i){let e=Math.floor(2*Math.random());return 0===e?t:1===e?i:void 0}class b{constructor(t,i,e){this.color=t,this.xPos=i,this.yPos=e,this.velX=0,this.velY=0,this.opacity=1,this.timeStamp=Date.now(),o.finalize(this)}jump(t,i){this.jumpHeight=t,this.jumpLength=i,this.jumpFrames=0,this.jumping=!0}hitDetect(){this.detectHit=!0,this.hitBoxId=o.hitDetectObjects.length,o.hitDetectObjects.push(this)}makeClickable(){this.clickable=!0,this.draggable=!1,this.clickableId=o.clickableObjects.length,o.clickableObjects.push(this)}onClick(t){this.makeClickable(),this.clickFunction=t,this.clicked=!1}makeDraggable(){this.draggable=!0,this.clickable=!1,this.draggableId=o.draggableObjects.length,o.draggableObjects.push(this)}makeHoldable(){this.holdable=!0,this.clickable=!1,this.draggable=!1,this.holdableId=o.holdableObjects.length,o.holdableObjects.push(this)}}class y extends b{constructor(t,i,e,s,h){super(t,i,e),this.radius=s,this.thickness=h,this.updatePos()}updatePos(){o.allGameObjects[this.id]=this,this.hitBoxWidth=2*this.radius,this.hitBoxHeight=2*this.radius,this.hitBoxX=this.xPos-this.radius,this.hitBoxY=this.yPos-this.radius,"number"==typeof this.thickness?(o.ctx.beginPath(),o.ctx.globalAlpha=this.opacity,o.ctx.strokeStyle=this.color,o.ctx.lineWidth=this.thickness,o.ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI),o.ctx.stroke(),o.ctx.globalAlpha=1):(o.ctx.beginPath(),o.ctx.globalAlpha=this.opacity,o.ctx.fillStyle=this.color,o.ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI),o.ctx.fill(),o.ctx.globalAlpha=1,this.outline&&(o.ctx.strokeStyle=this.outlineColor,o.ctx.lineWidth=this.outlineThickness,o.ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI),o.ctx.stroke())),this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength),this.dragging?(o.dragArray[0]=this,o.draggingWithMouse?(this.xPos=o.mouseX,this.yPos=o.mouseY):(this.xPos=o.touchMoveX,this.yPos=o.touchMoveY)):(this.xPos+=this.velX,this.yPos+=this.velY)}}class f extends b{constructor(t,i,e,s,h,a,n){super(t,i,e),this.radiusX=s,this.radiusY=h,this.rotation=a,this.velX=0,this.velY=0,this.opacity=1,this.thickness=n,this.timeStamp=Date.now(),o.finalize(this),this.updatePos()}updatePos(){o.allGameObjects[this.id]=this,this.rotation>=2*Math.PI&&(this.rotation=this.rotation%Math.PI,console.log(this.rotation)),this.rotation>.25*Math.PI&&this.rotation<.75*Math.PI||this.rotation>1.25*Math.PI&&this.rotation<1.75*Math.PI?(this.hitBoxX=this.xPos-this.radiusY,this.hitBoxY=this.yPos-this.radiusX,this.hitBoxHeight=2*this.radiusX,this.hitBoxWidth=2*this.radiusY):(this.hitBoxWidth=2*this.radiusX,this.hitBoxHeight=2*this.radiusY,this.hitBoxX=this.xPos-this.radiusX,this.hitBoxY=this.yPos-this.radiusY),"number"==typeof this.thickness?(o.ctx.strokeStyle=this.color,o.ctx.lineWidth=this.thickness,o.ctx.beginPath(),o.ctx.ellipse(this.xPos,this.yPos,this.radiusX,this.radiusY,this.rotation,0,2*Math.PI),o.ctx.stroke()):(o.ctx.fillStyle=this.color,o.ctx.beginPath(),o.ctx.ellipse(this.xPos,this.yPos,this.radiusX,this.radiusY,this.rotation,0,2*Math.PI),o.ctx.fill()),this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength),this.dragging?(o.dragArray[0]=this,o.draggingWithMouse?(this.xPos=o.mouseX,this.yPos=o.mouseY):(this.xPos=o.touchMoveX,this.yPos=o.touchMoveY)):(this.xPos+=this.velX,this.yPos+=this.velY)}}class j extends b{constructor(t,i,e,s,h,a){super(t,i,e),this.width=s,this.height=h,this.velX=0,this.velY=0,this.thickness=a,this.opacity=1,this.hitBoxX=this.xPos,this.hitBoxY=this.yPos,this.hitBoxWidth=this.width,this.hitBoxHeight=this.height,this.timeStamp=Date.now(),o.finalize(this),this.updatePos()}updatePos(){o.allGameObjects[this.id]=this,this.hitBoxX=this.xPos,this.hitBoxY=this.yPos,this.hitBoxWidth=this.width,this.hitBoxHeight=this.height,"number"==typeof this.thickness?(o.ctx.globalAlpha=this.opacity,o.ctx.strokeStyle=this.color,o.ctx.lineWidth=this.thickness,o.ctx.strokeRect(this.xPos,this.yPos,this.width,this.height),o.ctx.globalAlpha=1):(o.ctx.globalAlpha=this.opacity,o.ctx.fillStyle=this.color,o.ctx.fillRect(this.xPos,this.yPos,this.width,this.height),o.ctx.globalAlpha=1),this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength),!0===this.dragging?(o.dragArray[0]=this,o.draggingWithMouse?(this.xPos=o.mouseX-this.width/2,this.yPos=o.mouseY-this.height/2):(this.xPos=o.touchMoveX-this.width/2,this.yPos=o.touchMoveY-this.height/2)):(this.xPos+=this.velX,this.yPos+=this.velY,this.detectHit&&(this.hitBoxX=this.xPos,this.hitBoxY=this.yPos,this.hitBoxWidth=this.width,this.hitBoxHeight=this.height,o.hitDetectObjects[this.hitBoxId]=this))}}class P{constructor(t,i,e,s,h,a){this.startX=t,this.startY=i,this.endX=e,this.endY=s,this.clickFunction=null,this.color=h,this.velX=0,this.velY=0,this.thickness=a,o.finalize(this),this.make()}make(){o.ctx.beginPath(),o.ctx.moveTo(this.startX,this.startY),o.ctx.lineTo(this.endX,this.endY),o.ctx.lineWidth=this.thickness,o.ctx.strokeStyle=this.color,o.ctx.stroke(),this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength)}jump(t,i){this.jumpHeight=t,this.jumpLength=i,this.jumpFrames=0,this.jumping=!0}makeClickable(){this.clickable=!0,this.draggable=!1,this.clickableId=o.clickableObjects.length,o.clickableObjects.push(this)}onClick(t){this.makeClickable(),this.clickFunction=t,this.clicked=!1}updatePos(){this.startX+=this.velX,this.endX+=this.velX,this.startY+=this.velY,this.endY+=this.velY}}class w extends b{constructor(t,i,e,s,h,a,n,r){super(t,i,e),this.text=s,this.font=h,this.size=a,this.thickness=n,this.innerColor=r,this.velX=0,this.velY=0,this.opacity=1,this.timeStamp=Date.now(),o.finalize(this),this.updatePos()}updatePos(){o.allGameObjects[this.id]=this,this.hitBoxX=this.xPos,this.hitBoxY=this.yPos-this.size,"number"==typeof this.thickness?("string"==typeof this.innerColor&&(o.ctx.globalAlpha=this.opacity,o.ctx.font=`${this.size}px ${this.font}`,o.ctx.strokeStyle=this.color,o.ctx.fillStyle=this.innerColor,o.ctx.lineWidth=this.thickness,this.width=o.ctx.measureText(this.text).width,this.height=this.size,this.hitBoxWidth=this.width,this.hitBoxHeight=this.size,o.ctx.fillText(this.text,this.xPos,this.yPos),o.ctx.strokeText(this.text,this.xPos,this.yPos),o.ctx.globalAlpha=1),o.ctx.globalAlpha=this.opacity,o.ctx.font=`${this.size}px ${this.font}`,o.ctx.strokeStyle=this.color,o.ctx.lineWidth=this.thickness,this.width=o.ctx.measureText(this.text).width,this.height=this.size,o.ctx.strokeText(this.text,this.xPos,this.yPos),o.ctx.globalAlpha=1):(o.ctx.globalAlpha=this.opacity,o.ctx.fillStyle=this.color,o.ctx.font=`${this.size}px ${this.font}`,o.ctx.fillText(this.text,this.xPos,this.yPos),this.width=o.ctx.measureText(this.text).width,this.height=this.size,this.hitBoxWidth=this.width,this.hitBoxHeight=this.size,o.ctx.globalAlpha=1),this.jumping&&o.jump(this,this.jumpHeight,this.jumpLength),this.dragging?(o.dragArray[0]=this,o.draggingWithMouse?(this.xPos=o.mouseX-this.width/2,this.yPos=o.mouseY+this.size/2):(this.xPos=o.touchMoveX-this.width/2,this.yPos=o.touchMoveY+this.size/2)):(this.xPos+=this.velX,this.yPos+=this.velY,this.detectHit&&(this.hitBoxX=this.xPos,this.hitBoxY=this.yPos-this.size,this.hitBoxWidth=this.width,this.hitBoxHeight=this.height,o.hitDetectObjects[this.hitBoxId]=this))}}function v(t){if(o.enableDragAndDrop){let i,e=!1,s=o.canvas.getBoundingClientRect();o.mouseX=Math.floor(t.clientX-s.left),o.mouseY=Math.floor(t.clientY-s.top);for(let t=0;t<o.draggableObjects.length;t++)o.mouseX>=o.draggableObjects[t].hitBoxX&&o.mouseY>=o.draggableObjects[t].hitBoxY&&o.mouseX<=o.draggableObjects[t].hitBoxX+o.draggableObjects[t].hitBoxWidth&&o.mouseY<=o.draggableObjects[t].hitBoxY+o.draggableObjects[t].hitBoxHeight&&(o.dragStarted=!0,e=!0,o.draggingWithMouse=!0,e&&(i=o.draggableObjects[t],console.log(i),i.dragging=!0));for(let t=0;t<o.holdableObjects.length;t++)o.mouseX>=o.holdableObjects[t].hitBoxX&&o.mouseY>=o.holdableObjects[t].hitBoxY&&o.mouseX<=o.holdableObjects[t].hitBoxX+o.holdableObjects[t].hitBoxWidth&&o.mouseY<=o.holdableObjects[t].hitBoxY+o.holdableObjects[t].hitBoxHeight&&(o.holdStarted=!0,i=o.holdableObjects[t],i.holdDown=!0)}}function k(t){switch("number"==typeof t?t=t.toString():"string"==typeof t?t=t.toLowerCase():console.error("Type error."),t){case"shift":return 16;case"up":return 38;case"down":return 40;case"left":return 37;case"right":return 39;case"space":return 32;case"enter":case"return":return 13;case"esc":case"escape":return 27;case"a":return 65;case"b":return 66;case"c":return 67;case"d":return 68;case"e":return 69;case"f":return 70;case"g":return 71;case"h":return 72;case"i":return 73;case"j":return 74;case"k":return 75;case"l":return 76;case"m":return 77;case"n":return 78;case"o":return 79;case"p":return 80;case"q":return 81;case"r":return 82;case"s":return 83;case"t":return 84;case"u":return 85;case"v":return 86;case"w":return 87;case"x":return 88;case"y":return 89;case"z":return 90;case"1":return 49;case"2":return 50;case"3":return 51;case"4":return 52;case"5":return 53;case"6":return 54;case"7":return 55;case"8":return 56;case"9":return 57;case"0":return 48;case"period":case",":return 190;case"comma":return 188;case"backslash":case"/":case"back-slash":case"back slash":return 220;case"singlequote":case"single-quote":case"'":case"single quote":return 222;case"equal":case"equals":case"=":return 187;case"semicolon":case"semi-colon":case"semi colon":case";":return 186;case"back":case"backspace":case"back-space":return 8;case"tab":return 9;case"ctrl":return 17;case"alt":return 18;case"del":case"delete":return 46;case"add":case"+":case"plus":return 107;case"subtract":case"minus":case"-":return 109;default:console.error("unknown keycode: "+t)}}function O(t,i,e){"up"===t?o.keyboardUp===i&&(e(),o.keyboardUp=null):o.keyboardDown===i&&e()}function A(t,i){if("string"==typeof t){O("up",k(t),i)}else O("up",t,i)}function B(t,i){if("string"==typeof t){O("down",k(t),i)}else O("down",t,i)}function X(t){o.keyboardDown=t.keyCode}function S(t){o.keyboardDown=null,o.keyboardUp=t.keyCode}function N(){o.audioContext=new AudioContext}class T{constructor(t,i,e,s,h){this.source=t,this.volume=i,this.detune=s,this.playbackRate=e,this.loop=h,this.delayTime=0,this.startTime,this.pauseTime=0,this.pauseStartTime=0,this.pauseDuration=0,this.gainNode,this.distortionGainNode,this.distortionNode,this.distortionAmount,this.distortionOn=!1,this.duration,this.delayNode,this.theSound,this.playSound,this.reverse=!1,this.loaded=!1,this.fileSize=0,this.amountLoaded=0,this.loaded=!1,this.totallyLoaded=!1,this.load()}load(){let t,i=new XMLHttpRequest,e=this;i.open("GET",this.source,!0),i.responseType="arraybuffer",i.onload=function(){o.audioContext.decodeAudioData(i.response,(function(i){t=i,e.theSound=t,e.loaded=!0}))},i.addEventListener("progress",(function(t){t.lengthComputable&&(e.fileSize=t.total,e.amountLoaded=t.loaded)}),!1),i.onloadend=function(){console.log(e+" loaded"),e.totallyLoaded=!0,o.loadedAudio.push(e)},i.send(),o.allAudioObjects.push(e)}play(){this.distortionOn?(this.playSound=o.audioContext.createBufferSource(),this.gainNode=o.audioContext.createGain(),this.delayNode=o.audioContext.createDelay(),this.distortionGainNode=o.audioContext.createGain(),this.distortionNode=o.audioContext.createWaveShaper(),this.distortionNode.curve=this.distortionCurve(this.distortionAmount),this.gainNode.gain.value=this.volume,this.delayNode.delayTime.setValueAtTime(this.delayTime,o.audioContext.currentTime),this.playSound.buffer=this.theSound,this.playSound.connect(this.gainNode),this.gainNode.connect(this.distortionGainNode),this.distortionGainNode.connect(this.distortionNode),this.distortionNode.connect(this.delayNode),this.delayNode.connect(o.audioContext.destination),this.playSound.playbackRate.value=this.playbackRate,this.playSound.detune.value=this.detune,this.playSound.start(0,this.pauseTime),this.duration=this.playSound.buffer.duration,this.startTime=Date.now(),this.loop&&(this.playSound.loop=!0)):(this.playSound=o.audioContext.createBufferSource(),this.gainNode=o.audioContext.createGain(),this.delayNode=o.audioContext.createDelay(),this.gainNode.gain.value=this.volume,this.delayNode.delayTime.setValueAtTime(this.delayTime,o.audioContext.currentTime),this.playSound.buffer=this.theSound,this.playSound.connect(this.gainNode),this.gainNode.connect(this.delayNode),this.delayNode.connect(o.audioContext.destination),this.playSound.playbackRate.value=this.playbackRate,this.playSound.detune.value=this.detune,this.playSound.start(0,this.pauseTime),this.duration=this.playSound.buffer.duration,this.startTime=Date.now(),this.loop&&(this.playSound.loop=!0))}stop(){this.playSound.stop()}pause(){this.pauseStartTime=Date.now(),this.playSound.stop(),this.pauseTime=(Date.now()-this.startTime)/1e3;let t=this.pauseTime/this.duration;this.pauseTime=this.duration*(t-Math.floor(t))}unpause(){this.distortionOn?(this.pauseDuration=Date.now()-this.pauseStartTime,this.startTime+=this.pauseDuration,this.playSound=o.audioContext.createBufferSource(),this.gainNode=o.audioContext.createGain(),this.delayNode=o.audioContext.createDelay(),this.distortionGainNode=o.audioContext.createGain(),this.distortionNode=o.audioContext.createWaveShaper(),this.distortionNode.curve=this.distortionCurve(this.distortionAmount),this.gainNode.gain.value=this.volume,this.delayNode.delayTime.setValueAtTime(this.delayTime,o.audioContext.currentTime),this.playSound.buffer=this.theSound,this.playSound.connect(this.gainNode),this.gainNode.connect(this.distortionGainNode),this.distortionGainNode.connect(this.distortionNode),this.distortionNode.connect(this.delayNode),this.delayNode.connect(o.audioContext.destination),this.playSound.playbackRate.value=this.playbackRate,this.playSound.detune.value=this.detune,this.playSound.start(0,this.pauseTime),this.loop&&(this.playSound.loop=!0)):(this.pauseDuration=Date.now()-this.pauseStartTime,this.startTime+=this.pauseDuration,this.playSound=o.audioContext.createBufferSource(),this.gainNode=o.audioContext.createGain(),this.delayNode=o.audioContext.createDelay(),this.gainNode.gain.value=this.volume,this.delayNode.delayTime.setValueAtTime(this.delayTime,o.audioContext.currentTime),this.playSound.buffer=this.theSound,this.playSound.connect(this.gainNode),this.gainNode.connect(this.delayNode),this.delayNode.connect(o.audioContext.destination),this.playSound.playbackRate.value=this.playbackRate,this.playSound.detune.value=this.detune,this.playSound.start(0,this.pauseTime),this.loop&&(this.playSound.loop=!0))}updateVolume(t){this.volume=t,this.gainNode.gain.value=t}updatePlaybackRate(t){this.playbackRate=t,this.playSound.playbackRate.value=t}updateDetune(t){this.detune=t,this.playSound.detune.value=t}updateDelay(t){this.delayTime=t,this.delayNode.delayTime.setValueAtTime(t,o.audioContext.currentTime)}updateDistortion(t){this.distortionAmount=t,this.distortionNode.curve=this.distortionCurve(t)}cancelLoop(){this.playSound.loop=!1,this.loop=!1}makeLoop(){this.playSound.loop=!0,this.loop=!0}reverse(){this.reverse=!0}distortionCurve(t){let i,e=t,s=new Float32Array(44100),h=0;for(;h<44100;++h)i=2*h/44100-1,s[h]=(3+e)*Math.atan(5*Math.sinh(.25*i))/(Math.PI+e*Math.abs(i));return s}addDistortion(t){this.distortionOn=!0,this.distortionAmount=t}}class Y{constructor(t,i,e){this.waveForm=t,this.gain=i,this.delay=e,this.playing=!1,this.oscillator,this.gainNode,this.delayNode,this.distortionGainNode,this.distortionNode,this.distortionAmount,this.distortionOn=!1}play(t){this.distortionOn?(this.oscillator=o.audioContext.createOscillator(),this.gainNode=o.audioContext.createGain(),this.delayNode=o.audioContext.createDelay(),this.convolverNode=o.audioContext.createConvolver,this.distortionGainNode=o.audioContext.createGain(),this.distortionNode=o.audioContext.createWaveShaper(),this.distortionNode.curve=this.distortionCurve(this.distortionAmount),this.oscillator.frequency.setValueAtTime(t,o.audioContext.currentTime),this.gainNode.gain.value=this.gain,this.delayNode.delayTime.setValueAtTime(this.delay,o.audioContext.currentTime),this.oscillator.connect(this.gainNode),this.gainNode.connect(this.distortionGainNode),this.distortionGainNode.connect(this.distortionNode),this.distortionNode.connect(this.delayNode),this.delayNode.connect(o.audioContext.destination),this.oscillator.start()):(this.oscillator=o.audioContext.createOscillator(),this.gainNode=o.audioContext.createGain(),this.delayNode=o.audioContext.createDelay(),this.oscillator.frequency.setValueAtTime(t,o.audioContext.currentTime),this.gainNode.gain.value=this.gain,this.delayNode.delayTime.setValueAtTime(this.delay,o.audioContext.currentTime),this.oscillator.connect(this.gainNode),this.gainNode.connect(this.delayNode),this.delayNode.connect(o.audioContext.destination),this.oscillator.start())}stop(){this.oscillator.stop()}updateFrequency(t){this.oscillator.frequency.setValueAtTime(t,o.audioContext.currentTime)}updateGain(t){this.gainNode.gain.value=t}updateDelay(t){this.delayNode.delayTime.setValueAtTime(t,o.audioContext.currentTime)}updateDistortion(t){this.distortionAmount=t,this.distortionNode.curve=this.distortionCurve(t)}distortionCurve(t){let i,e=t,s=new Float32Array(44100),h=0;for(;h<44100;++h)i=2*h/44100-1,s[h]=(3+e)*Math.atan(5*Math.sinh(.25*i))/(Math.PI+e*Math.abs(i));return s}addDistortion(t){this.distortionOn=!0,this.distortionAmount=t}}function C(){o.clear=!0}function M(){o.clear=!1}document.addEventListener("touchstart",(function(t){o.touching=!0,o.touchScreen=!0;let i=o.canvas.getBoundingClientRect();if(o.touchX=Math.floor(t.touches[0].clientX-i.left),o.touchY=Math.floor(t.touches[0].clientY-i.top),o.touchMoveX=Math.floor(t.touches[0].clientX-i.left),o.touchMoveY=o.touchY=Math.floor(t.touches[0].clientY-i.top),!0===o.enableDragAndDrop){let t,i=!1;o.dragStarted=!0;for(let e=0;e<o.draggableObjects.length;e++)o.touchX>=o.draggableObjects[e].hitBoxX&&o.touchY>=o.draggableObjects[e].hitBoxY&&o.touchX<=o.draggableObjects[e].hitBoxX+o.draggableObjects[e].hitBoxWidth&&o.touchY<=o.draggableObjects[e].hitBoxY+o.draggableObjects[e].hitBoxHeight&&(o.draggingWithMouse=!1,i=!0,i&&(t=o.draggableObjects[e],t.dragging=!0))}}),!1),document.addEventListener("touchmove",(function(t){let i=o.canvas.getBoundingClientRect();o.touchMoveX=t.touches[0].clientX-i.left,o.touchMoveY=t.touches[0].clientY-i.top})),document.addEventListener("touchend",(function(t){let i=o.canvas.getBoundingClientRect();o.touchEndX=Math.floor(t.changedTouches[0].clientX-i.left),o.touchEndY=Math.floor(t.changedTouches[0].clientY-i.top),o.touchX=null,o.touchY=null,o.touchMoveX=null,o.touchMoveY=null;for(let t=0;t<o.draggableObjects.length;t++)o.draggableObjects[t].dragging=!1,o.dragStarted=!1;o.touching=!1})),document.addEventListener("click",(function(t){!function(t){let i,e=o.canvas.getBoundingClientRect();o.mouseX=Math.floor(t.clientX-e.left),o.mouseY=Math.floor(t.clientY-e.top),console.log(`${o.mouseX} ${o.mouseY}`);for(let t=0;t<o.clickableObjects.length;t++)o.mouseX>=o.clickableObjects[t].hitBoxX&&o.mouseY>=o.clickableObjects[t].hitBoxY&&o.mouseX<=o.clickableObjects[t].hitBoxX+o.clickableObjects[t].hitBoxWidth&&o.mouseY<=o.clickableObjects[t].hitBoxY+o.clickableObjects[t].hitBoxHeight&&(i=o.clickableObjects[t],i.clicked=!0,i.clickFunction&&i.clickFunction())}(t)})),document.addEventListener("mousemove",(function(t){!function(t){if(o.dragStarted){let i=o.canvas.getBoundingClientRect();o.mouseX=Math.floor(t.clientX-i.left),o.mouseY=Math.floor(t.clientY-i.top)}}(t)})),document.addEventListener("mousedown",(function(t){v(t)})),document.addEventListener("mouseup",(function(){!function(){if(o.dragStarted){o.dragStarted=!1;for(let t=0;t<o.draggableObjects.length;t++)o.draggableObjects[t].dragging=!1}if(o.holdStarted){for(let t=0;t<o.holdableObjects.length;t++)o.holdableObjects[t].holdDown&&(o.holdableObjects[t].finishedHolding=!0,o.holdableObjects[t].holdDown=!1);o.holdStarted=!1}}()})),document.addEventListener("pointerdown",(function(){v(event)})),document.addEventListener("keydown",X,!1),document.addEventListener("keyup",S,!1)}]);