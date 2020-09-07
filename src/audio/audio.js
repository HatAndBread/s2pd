import s2pd from '../core.js';
/**
 * Enables audio and creates audio context. Enable audio must be called before trying to load or play any music files.
 * Audio context will not start until after the user interacts on the page (mouse click, etc.)
 * Audio context will automatically be resumed after user interacts with the page. 
 */
function enableAudio() {

  let AudioContext = window.AudioContext
    || window.webkitAudioContext
    || false;
  if (AudioContext) {
    s2pd.audioContext = new AudioContext();
  } else {
    alert('Sorry. You need to update your browser to use web audio. ');
  }

}
/**
 * Create an audio context and load all audio files associated with the Sound class.
 * Call loadAudio after some kind of user interaction (mouse click, touch).
 * Most browsers will throw an error if audio play is not user initiated. 
 */
function loadAudio() {
  let AudioContext = window.AudioContext
    || window.webkitAudioContext
    || false;
  if (AudioContext) {
    s2pd.audioContext = new AudioContext();
  } else {
    alert('Sorry. You need to update your browser in order to play this game. ')
  }
  s2pd.objectsToLoad.forEach(el => {
    el instanceof Sound ? el.load() : undefined;
  })
}
/**
 * Sound
 */
class Sound {
  /**
   * 
   * @param {string} source - Source of audio file. 
   * @param {number=} volume - Playback volume. An integer between 0 and 1. Default is 0.5
   * @param {boolean=} loop - Loop back to beginning of audio file on end? Default is false;
   * @param {number=} playbackRate - Speed of playback. 1 is nomrmal speed. 0.5 is half normal speed. 2 is twice normal speed etc. Changing playback rate will also affect pitch on most browsers. Default is 1.
   * @example 
   * s.enableAudio(); 
   * const backgroundMusic = new s.Sound('./someCoolMusic.mp3',0.5,true,1);
   * backgroundMusic.load();
   * button.onClick(()=>{
   *    backgroundMusic.play();
   * });
   * // most browsers require web audio to be enabled after user interaction. Must call play and load AFTER audio enabled.
   * pauseButton.onClick(()=>{
   *   backgroundMusic.pause();
   * })
   */
  constructor(source, volume, loop, playbackRate, ) {
    s2pd.objectsToLoad.push(this);
    this.source = source;
    this.volume = volume;
    if (volume === 0) {
      this.volume = volume;
    } else if (volume) {
      this.volume = volume;
    } else {
      this.volume = 0.5;
    }
    if (!playbackRate) {
      this.playbackRate = 1;
    } else {
      this.playbackRate = playbackRate;
    }
    !loop ? this.loop = false : this.loop = true;
    this.startTime;
    this.pauseTime = 0;
    this.pauseStartTime = 0
    this.pauseDuration = 0;
    this.gainNode;
    this.duration;
    this.theSound;
    this.playSound;
    this.stopped = true;
    this.fileSize = 0
    this.amountLoaded = 0
    this.loaded = false;
    this.totallyLoaded = false;
  }
  /**
   * load audio file
   */
  load() {
    let getSound = new XMLHttpRequest();
    let theSound;
    getSound.open("GET", this.source, true);
    getSound.responseType = 'arraybuffer';
    getSound.onload = () => {
      s2pd.audioContext.decodeAudioData(getSound.response, (buffer) => {
        theSound = buffer;
        this.theSound = theSound;
        this.loaded = true;
        if (this.requestToPlayBeforeLoaded) {
          this.play();
          this.stopped = false;
          this.requestToPlayBeforeLoaded = false;
        }
      });
    }
    getSound.onloadend = () => {
      this.totallyLoaded = true;
      this.loaded = true;
      s2pd.loadedAudio += 1;
    }
    getSound.send();
    s2pd.allAudioObjects.push(this);
  }
  /**
   * play audio file
   */
  play() {
    if (this.loaded) {
      this.stopped = false;
      this.playSound = s2pd.audioContext.createBufferSource();
      this.gainNode = s2pd.audioContext.createGain();
      this.gainNode.gain.value = this.volume;
      this.playSound.buffer = this.theSound;
      this.playSound.connect(this.gainNode);
      this.gainNode.connect(s2pd.audioContext.destination);
      this.playSound.playbackRate.value = this.playbackRate;
      this.playSound.start(0, this.pauseTime)
      this.startTime = Date.now()
      if (this.loop) {
        this.playSound.loop = true;
      }
    } else {
      this.requestToPlayBeforeLoaded = true;
    }
  }
  /**
   * Stop audio. When audio play is resumed will go back to the beginning. 
   */
  stop() {
    if (!this.stopped) {
      this.playSound.stop();
      this.stopped = true;
    } else {
      console.warn('Called stop on already stopped audio object. 👮‍♀️', 'This may cause errors in some browsers.')
    }
  }
  /**
  * Pause audio.
  */
  pause() {
    if (!this.stopped) {
      this.playSound.stop();
      this.stopped = true;
    }
    this.pauseStartTime = Date.now()
    this.playSound.stop()
    this.pauseTime += (Date.now() - this.startTime) / 1000
    if (this.pauseTime > this.playSound.buffer.duration) {
      this.pauseTime = this.pauseTime % this.playSound.buffer.duration;
    }

  }
}

export { enableAudio, loadAudio, Sound };