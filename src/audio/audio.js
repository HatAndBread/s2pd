import s2pd from '../core.js';

function enableAudio() {
  s2pd.audioContext = new AudioContext();
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
   */
  constructor(source, volume, loop, playbackRate, ) {
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
    this.loop = loop;
    this.startTime;
    this.pauseTime = 0;
    this.pauseStartTime = 0
    this.pauseDuration = 0;
    this.gainNode;
    this.duration;
    this.theSound;
    this.playSound
    this.fileSize = 0
    this.amountLoaded = 0
    this.loaded = false;
    this.totallyLoaded = false;
  }
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
      });
    }

    getSound.onloadend = () => {
      this.totallyLoaded = true;
      s2pd.loadedAudio.push(this)
    }
    getSound.send();
    s2pd.allAudioObjects.push(this)
  }
  play() {
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
  }

  stop() {
    this.playSound.stop();
  }
  pause() {
    this.pauseStartTime = Date.now()
    this.playSound.stop()
    this.pauseTime += (Date.now() - this.startTime) / 1000
    if (this.pauseTime > this.playSound.buffer.duration) {
      this.pauseTime = this.pauseTime % this.playSound.buffer.duration;
      console.log(this.pauseTime)
    }



  }
  unpause() {
    this.pauseDuration = (Date.now() - this.pauseStartTime)
    this.startTime += this.pauseDuration
    this.playSound = s2pd.audioContext.createBufferSource();
    this.gainNode = s2pd.audioContext.createGain()
    this.gainNode.gain.value = this.volume;
    this.playSound.buffer = this.theSound;
    this.playSound.connect(this.gainNode);
    this.gainNode.connect(s2pd.audioContext.destination);
    this.playSound.playbackRate.value = this.playbackRate;
    this.playSound.start(0, this.pauseTime)
    if (this.loop) {
      this.playSound.loop = true;
    }
  }
}

export { enableAudio, Sound };