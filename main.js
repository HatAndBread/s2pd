const app = s2pd();

app.createCanvas('canvas', 800, 600);
app.backgroundColor(50, 243, 156, 0.2);

const dog = new app.Circle(40, 40, 30, 'rgb(100,40,240)');
const rec = new app.Rectangle(100, 100, 40, 40, 'rgb(32,32,32)', 4);
const tex = new app.Text('YOYOYO', 200, 500, 'sans-serif', 32, 'blue');
const rightArrow = new app.Sprite(100, 200, 1, './rightArrow.png', 1, 32, 32);
const frank = new app.Ellipse(300, 300, 200, 34, Math.PI / 2, 'rgb(23,84,23)', 23);
rightArrow.addAnimation('main', 0, 1);

const fire = new app.Sprite(32, 32, 8, 'fire.png', 1, 16, 16);
fire.addAnimation('main', 0, 8);

const bat = new app.Sprite(200, 200, 14, 'bat.png', 1, 64, 48);
bat.addAnimation('flyingRight', 0, 6);
bat.addAnimation('flyingLeft', 6, 6);
bat.addAnimation('deadLeft', 12, 1);
bat.addAnimation('deadRight', 13, 1);
app.loadSprites();

dog.velX = 1;
dog.makeDraggable();
rec.makeDraggable();
tex.makeDraggable();
bat.makeDraggable();
frank.onClick(() => {
  console.log('frank clicked');
});

bat.hitDetect();
dog.hitDetect();
tex.hitDetect();

document.addEventListener('collision', function (e) {
  if (e.detail.includes(bat) && e.detail.includes(tex)) {
    bat.destroy();
  }
  if (e.detail.includes(bat) && e.detail.includes(dog)) {
    dog.destroy();
  }
  console.log(e.detail);
});

fire.onClick(function () {
  console.log('fire clicked.');
});
tex.onClick(function () {
  console.log('yoyo clicked');
});
rec.onClick(function () {
  console.log('rec clicked');
});
dog.onClick(function () {
  console.log('dog clicked');
});
bat.onClick(function () {
  console.log('bat clicked');
});

function game() {
  app.clear = true;
  //frank.rotation += 0.01;
  console.log(frank.rotation);
  app.keyUp('E', () => {
    tex.jump(30, 10);
  });
  app.keyUp('space', () => {
    frank.jump(2000, 13);
  });
  app.keyDown('r', () => {
    dog.velX = app.randomBetween(-4, 2);
    bat.changeAnimationTo('deadRight');
  });
  app.keyUp('r', () => {
    bat.changeAnimationTo('flyingLeft');
  });
  app.keyUp('r', () => {
    dog.velX = 0.1;
  });
  app.keyUp('h', () => {
    dog.jump(300, 10);
  });
  app.keyUp(';', () => {
    bat.changeAnimationTo('deadLeft');
  });
}

app.loop(game);
