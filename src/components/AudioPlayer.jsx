import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3 } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);
  const [waveHeights, setWaveHeights] = useState([8, 14, 20, 12, 18, 10, 16]);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    gainNodeRef.current = master;

    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, ctx.currentTime);
    master.connect(filter);
    filter.connect(ctx.destination);

    // House chords: F#3, A3, C#4, E4
    const chordFreqs = [185.00, 220.00, 277.18, 329.63];
    chordFreqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle slow chorus/vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3, ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(master);
      osc.start();
    });

    // Sub-bass groove oscillator
    const bass = ctx.createOscillator();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(92.5, ctx.currentTime); // F#2
    bass.connect(master);
    bass.start();
  };

  const togglePlay = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      // Smooth fade out
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } else {
      // Smooth fade in
      gainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.5);
      setIsPlaying(true);

      // Animate waveform
      intervalRef.current = setInterval(() => {
        setWaveHeights([
          Math.floor(Math.random() * 16 + 6),
          Math.floor(Math.random() * 20 + 8),
          Math.floor(Math.random() * 24 + 10),
          Math.floor(Math.random() * 18 + 6),
          Math.floor(Math.random() * 22 + 8),
          Math.floor(Math.random() * 16 + 6),
          Math.floor(Math.random() * 20 + 10)
        ]);
      }, 120);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="synth-player-bar">
      <div className="audio-info">
        <button
          type="button"
          onClick={togglePlay}
          className="audio-play-btn"
          aria-label={isPlaying ? 'Pause music' : 'Play synthesized party track'}
          title={isPlaying ? 'Pause synth' : 'Synthesize Party Groove (Web Audio)'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
        </button>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Deep House Resonance</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-accent)', background: 'var(--accent-soft)', padding: '1px 6px', borderRadius: 4 }}>
              LIVE SYNTH
            </span>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            {isPlaying ? 'Analog oscillator warm chords active' : 'Click play to start browser soundscape'}
          </div>
        </div>
      </div>

      <div className="waveform-bars">
        {waveHeights.map((h, i) => (
          <div
            key={i}
            className="wave-bar"
            style={{
              height: isPlaying ? `${h}px` : '4px',
              opacity: isPlaying ? 0.9 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
}
