// src/App.js
import React, { useRef, useState, useEffect } from 'react';
import './index.css';
import { lyrics } from './assets/lyricsData';
import LyricLine from './components/LyricLine';

const song = process.env.PUBLIC_URL + '/quadratic_song.m4a';

export default function App() {
    const audioRef = useRef(null);
    const [currentFormulaPart, setCurrentFormulaPart] = useState(null);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

    const handlePlay  = () => audioRef.current?.play();
    const handlePause = () => audioRef.current?.pause();

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            const t = audio.currentTime;
            // Update lyric index
            const idx = lyrics.findIndex((l,i) =>
                i === lyrics.length - 1
                    ? t >= l.time
                    : t >= l.time && t < lyrics[i+1].time
            );
            if (idx !== -1) setCurrentLyricIndex(idx);

            // Update formula part
            const entry = lyrics
                .filter(l => l.formulaPart)
                .reduce((best, curr) =>
                        curr.time <= t && curr.time > (best?.time ?? -1) ? curr : best,
                    null);
            setCurrentFormulaPart(entry?.formulaPart ?? null);
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        return () => audio.removeEventListener('timeupdate', onTimeUpdate);
    }, []);

    const hl = (part) => currentFormulaPart === part ? 'highlight' : '';

    return (
        <div className="app-wrapper">
            <h1>🎵 Quadratic Formula Song 🎵</h1>
            <audio ref={audioRef} src={song} preload="auto" />
            <div style={{ marginTop: '1rem' }}>
                <button onClick={handlePlay}>▶️ Play</button>
                <button onClick={handlePause} style={{ marginLeft: 12 }}>⏸️ Pause</button>
            </div>

            <LyricLine lyrics={lyrics} currentIndex={currentLyricIndex} />

            {/* Plain-HTML formula */}
            {/* Plain‐HTML fraction, LaTeX‐style */}
            <div
                className="formula-visible"
                style={{ marginTop: '2rem', textAlign: 'center', fontSize: '2em' }}
            >
                <span style={{ marginRight: '0.5em' }}>x =</span>

                <span className="fraction">
    <span className="numerator">
      <span className={hl('minusB')}>-b</span>
      <span> ± </span>
      <span className={hl('sqrt')}>√</span>
      <span>(</span>
      <span className={hl('bSquared')}>b<sup>2</sup></span>
      <span> − </span>
      <span className={hl('minus4ac')}>4ac</span>
      <span>)</span>
    </span>
    <span className="bar" />
    <span className="denominator">
      <span className={hl('denominator')}>2a</span>
    </span>
  </span>
            </div>

            {/* Standard form */}
            <div className="formula-visible" style={{ marginTop: '1rem', fontSize: '1.8rem', textAlign: 'center' }}>
                y = ax<sup>2</sup> + bx + c
            </div>
        </div>
    );
}
