export class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Master volume
        this.masterGain.connect(this.ctx.destination);
    }

    playTone(freq, type, duration, startTime = 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playDeal() {
        // Quick swish sound
        this.playTone(400, 'triangle', 0.1);
        this.playTone(600, 'sine', 0.1, 0.05);
    }

    playChip() {
        // High pitched metallic clink
        this.playTone(1200, 'sine', 0.1);
        this.playTone(1600, 'square', 0.05, 0.02);
    }

    playWin() {
        // Ascending arpeggio
        this.playTone(440, 'square', 0.2, 0);
        this.playTone(554, 'square', 0.2, 0.1);
        this.playTone(659, 'square', 0.4, 0.2);
    }

    playLose() {
        // Descending tone
        this.playTone(300, 'sawtooth', 0.3, 0);
        this.playTone(200, 'sawtooth', 0.4, 0.2);
    }

    playClick() {
        // Short blip
        this.playTone(800, 'sine', 0.05);
    }
}

export const soundManager = new SoundManager();
