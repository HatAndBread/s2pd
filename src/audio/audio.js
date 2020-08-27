import s2pd from '../core.js';

export function enableAudio() {
  s2pd.audioContext = new AudioContext();
}

export class Sound {
  constructor(source, volume, playbackRate, detune, loop) {
    this.source = source;
    this.volume = volume;
    this.detune = detune;
    this.playbackRate = playbackRate;
    this.loop = loop;
    this.delayTime = 0;
    this.startTime;
    this.pauseTime = 0;
    this.pauseStartTime = 0;
    this.pauseDuration = 0;
    this.gainNode;
    this.distortionGainNode;
    this.distortionNode;
    this.distortionAmount;
    this.distortionOn = false;
    this.duration;
    this.delayNode;
    this.theSound;
    this.playSound;
    this.reverse = false;
    this.loaded = false;
    this.fileSize = 0;
    this.amountLoaded = 0;
    this.loaded = false;
    this.totallyLoaded = false;
    this.load();
  }
  load() {
    let getSound = new XMLHttpRequest();
    let theSound;
    let self = this;
    getSound.open('GET', this.source, true);
    getSound.responseType = 'arraybuffer';
    getSound.onload = function () {
      s2pd.audioContext.decodeAudioData(getSound.response, function (buffer) {
        theSound = buffer;
        self.theSound = theSound;
        self.loaded = true;
      });
    };
    getSound.addEventListener(
      'progress',
      function (evt) {
        if (evt.lengthComputable) {
          self.fileSize = evt.total;
          self.amountLoaded = evt.loaded;
        }
      },
      false
    );

    getSound.onloadend = function () {
      console.log(self + ' loaded');
      self.totallyLoaded = true;
      s2pd.loadedAudio.push(self);
    };
    getSound.send();
    s2pd.allAudioObjects.push(self);
  }
  play() {
    if (this.distortionOn) {
      this.playSound = s2pd.audioContext.createBufferSource();
      this.gainNode = s2pd.audioContext.createGain();
      this.delayNode = s2pd.audioContext.createDelay();
      this.distortionGainNode = s2pd.audioContext.createGain();
      this.distortionNode = s2pd.audioContext.createWaveShaper();
      this.distortionNode.curve = this.distortionCurve(this.distortionAmount);
      this.gainNode.gain.value = this.volume;
      this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
      this.playSound.buffer = this.theSound;
      this.playSound.connect(this.gainNode);
      this.gainNode.connect(this.distortionGainNode);
      this.distortionGainNode.connect(this.distortionNode);
      this.distortionNode.connect(this.delayNode);
      this.delayNode.connect(s2pd.audioContext.destination);
      this.playSound.playbackRate.value = this.playbackRate;
      this.playSound.detune.value = this.detune;
      this.playSound.start(0, this.pauseTime);
      this.duration = this.playSound.buffer.duration;
      this.startTime = Date.now();
      if (this.loop) {
        this.playSound.loop = true;
      }
    } else {
      this.playSound = s2pd.audioContext.createBufferSource();
      this.gainNode = s2pd.audioContext.createGain();
      this.delayNode = s2pd.audioContext.createDelay();
      this.gainNode.gain.value = this.volume;
      this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
      this.playSound.buffer = this.theSound;
      this.playSound.connect(this.gainNode);
      this.gainNode.connect(this.delayNode);
      this.delayNode.connect(s2pd.audioContext.destination);
      this.playSound.playbackRate.value = this.playbackRate;
      this.playSound.detune.value = this.detune;
      this.playSound.start(0, this.pauseTime);
      this.duration = this.playSound.buffer.duration;
      this.startTime = Date.now();
      if (this.loop) {
        this.playSound.loop = true;
      }
    }
  }
  stop() {
    this.playSound.stop();
  }
  pause() {
    this.pauseStartTime = Date.now();
    this.playSound.stop();
    this.pauseTime = (Date.now() - this.startTime) / 1000;
    let dividy = this.pauseTime / this.duration;
    this.pauseTime = this.duration * (dividy - Math.floor(dividy));
  }
  unpause() {
    if (this.distortionOn) {
      this.pauseDuration = Date.now() - this.pauseStartTime;
      this.startTime += this.pauseDuration;
      this.playSound = s2pd.audioContext.createBufferSource();
      this.gainNode = s2pd.audioContext.createGain();
      this.delayNode = s2pd.audioContext.createDelay();
      this.distortionGainNode = s2pd.audioContext.createGain();
      this.distortionNode = s2pd.audioContext.createWaveShaper();
      this.distortionNode.curve = this.distortionCurve(this.distortionAmount);
      this.gainNode.gain.value = this.volume;
      this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
      this.playSound.buffer = this.theSound;
      this.playSound.connect(this.gainNode);
      this.gainNode.connect(this.distortionGainNode);
      this.distortionGainNode.connect(this.distortionNode);
      this.distortionNode.connect(this.delayNode);
      this.delayNode.connect(s2pd.audioContext.destination);
      this.playSound.playbackRate.value = this.playbackRate;
      this.playSound.detune.value = this.detune;
      this.playSound.start(0, this.pauseTime);
      if (this.loop) {
        this.playSound.loop = true;
      }
    } else {
      this.pauseDuration = Date.now() - this.pauseStartTime;
      this.startTime += this.pauseDuration;
      this.playSound = s2pd.audioContext.createBufferSource();
      this.gainNode = s2pd.audioContext.createGain();
      this.delayNode = s2pd.audioContext.createDelay();
      this.gainNode.gain.value = this.volume;
      this.delayNode.delayTime.setValueAtTime(this.delayTime, s2pd.audioContext.currentTime);
      this.playSound.buffer = this.theSound;
      this.playSound.connect(this.gainNode);
      this.gainNode.connect(this.delayNode);
      this.delayNode.connect(s2pd.audioContext.destination);
      this.playSound.playbackRate.value = this.playbackRate;
      this.playSound.detune.value = this.detune;
      this.playSound.start(0, this.pauseTime);
      if (this.loop) {
        this.playSound.loop = true;
      }
    }
  }
  updateVolume(howMuch) {
    this.volume = howMuch;
    this.gainNode.gain.value = howMuch;
  }
  updatePlaybackRate(howMuch) {
    this.playbackRate = howMuch;
    this.playSound.playbackRate.value = howMuch;
  }
  updateDetune(howMuch) {
    this.detune = howMuch;
    this.playSound.detune.value = howMuch;
  }

  updateDelay(howMuch) {
    this.delayTime = howMuch;
    this.delayNode.delayTime.setValueAtTime(howMuch, s2pd.audioContext.currentTime);
  }
  updateDistortion(howMuch) {
    this.distortionAmount = howMuch;
    this.distortionNode.curve = this.distortionCurve(howMuch);
  }
  cancelLoop() {
    this.playSound.loop = false;
    this.loop = false;
  }
  makeLoop() {
    this.playSound.loop = true;
    this.loop = true;
  }
  reverse() {
    this.reverse = true;
  }
  distortionCurve(howMuch) {
    let k = howMuch,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
  addDistortion(howMuch) {
    this.distortionOn = true;
    this.distortionAmount = howMuch;
  }
}

export class Synth {
  constructor(waveForm, gain, delay) {
    this.waveForm = waveForm;
    this.gain = gain;
    this.delay = delay;
    this.playing = false;
    this.oscillator;
    this.gainNode;
    this.delayNode;
    this.distortionGainNode;
    this.distortionNode;
    this.distortionAmount;
    this.distortionOn = false;
  }
  play(frequency) {
    if (this.distortionOn) {
      this.oscillator = s2pd.audioContext.createOscillator();
      this.gainNode = s2pd.audioContext.createGain();
      this.delayNode = s2pd.audioContext.createDelay();
      this.convolverNode = s2pd.audioContext.createConvolver;
      this.distortionGainNode = s2pd.audioContext.createGain();
      this.distortionNode = s2pd.audioContext.createWaveShaper();
      this.distortionNode.curve = this.distortionCurve(this.distortionAmount);
      this.oscillator.frequency.setValueAtTime(frequency, s2pd.audioContext.currentTime);
      this.gainNode.gain.value = this.gain;
      this.delayNode.delayTime.setValueAtTime(this.delay, s2pd.audioContext.currentTime);
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.distortionGainNode);
      this.distortionGainNode.connect(this.distortionNode);
      this.distortionNode.connect(this.delayNode);
      this.delayNode.connect(s2pd.audioContext.destination);
      this.oscillator.start();
    } else {
      this.oscillator = s2pd.audioContext.createOscillator();
      this.gainNode = s2pd.audioContext.createGain();
      this.delayNode = s2pd.audioContext.createDelay();
      this.oscillator.frequency.setValueAtTime(frequency, s2pd.audioContext.currentTime);
      this.gainNode.gain.value = this.gain;
      this.delayNode.delayTime.setValueAtTime(this.delay, s2pd.audioContext.currentTime);
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.delayNode);
      this.delayNode.connect(s2pd.audioContext.destination);
      this.oscillator.start();
    }
  }
  stop() {
    this.oscillator.stop();
  }
  updateFrequency(frequency) {
    this.oscillator.frequency.setValueAtTime(frequency, s2pd.audioContext.currentTime);
  }
  updateGain(gain) {
    this.gainNode.gain.value = gain;
  }
  updateDelay(delay) {
    this.delayNode.delayTime.setValueAtTime(delay, s2pd.audioContext.currentTime);
  }
  updateDistortion(howMuch) {
    this.distortionAmount = howMuch;
    this.distortionNode.curve = this.distortionCurve(howMuch);
  }
  distortionCurve(howMuch) {
    let k = howMuch,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
  addDistortion(howMuch) {
    this.distortionOn = true;
    this.distortionAmount = howMuch;
  }
}
