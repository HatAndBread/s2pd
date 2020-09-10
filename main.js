import s from './s2pd.js'

s.ezSetup();


const mySound = new s.Sound('./bgm.mp3', 0.3, true, 1);
const startButton = new s.Text('red', 'center', 'center', 'START', 'sans-serif', 32);
startButton.onClick(() => {
  s.loadAudio(); // loads all audio files associated with the Sound class.
  mySound.play(); // mySound will begin playing when it is loaded.
}, true); //trigger once);

s.loop(function () {
  if (s.percentLoaded < 100) {
    //loading screen while audio files load.
  } else {
    // game loop. mySound will start playing.
  };
});




