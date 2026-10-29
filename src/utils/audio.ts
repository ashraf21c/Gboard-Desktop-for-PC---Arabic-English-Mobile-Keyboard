/**
 * Audio synthesis for authentic Gboard tactile feedback
 * Uses Web Audio API oscillator & noise impulse (zero external dependencies)
 */

class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playKeyClick(type: 'char' | 'space' | 'backspace' | 'action' = 'char') {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'space') {
        // Lower pitched soft thud
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.035);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'backspace') {
        // Slightly higher snappy pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.03);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'action') {
        // Medium soft tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.start(now);
        osc.stop(now + 0.04);
      } else {
        // Standard Gboard soft key tap
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.022);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

        osc.start(now);
        osc.stop(now + 0.022);
      }
    } catch {
      // Ignore audio policy errors before user gesture
    }
  }
}

export const soundEngine = new SoundEngine();
