import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function AudioPlayer({ onPlayToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);

  function toggleAudio() {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(460, ctx.currentTime);

      master.connect(filter);
      filter.connect(ctx.destination);
      masterGainRef.current = master;

      // C#3 root + G#3 fifth + C#4 octave
      const notes = [
        { freq: 138.59, type: 'sawtooth', gain: 0.18 },
        { freq: 138.59, type: 'sine', gain: 0.25 },
        { freq: 207.65, type: 'triangle', gain: 0.14 },
        { freq: 277.18, type: 'sine', gain: 0.1 }
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = n.type;
        osc.frequency.setValueAtTime(n.freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoG = ctx.createGain();
        lfo.frequency.value = 0.2 + Math.random() * 0.15;
        lfoG.gain.value = 0.8;
        lfo.connect(osc.frequency);
        lfo.start();

        g.gain.setValueAtTime(n.gain, ctx.currentTime);
        osc.connect(g);
        g.connect(master);
        osc.start();
      });
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const master = masterGainRef.current;

    if (!isPlaying) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.2);
      setIsPlaying(true);
      if (onPlayToast) onPlayToast('🎶 Playing live Sufi Tanpura drone');
    } else {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setIsPlaying(false);
    }
  }

  return (
    <div className="audio-player">
      <button
        className={`audio-play-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause drone' : 'Play drone'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
      </button>

      <div className="audio-info">
        <span className="audio-title">Preview the Vibe</span>
        <span className="audio-artist">Tanpura C# Drone & Singing Bowl (Live Web Audio)</span>
      </div>

      <div className={`audio-wave ${isPlaying ? 'active' : ''}`}>
        {[...Array(16)].map((_, i) => (
          <span key={i} className="wave-bar" style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }} />
        ))}
      </div>
    </div>
  );
}
