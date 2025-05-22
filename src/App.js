// src/App.jsx
import { useRef } from 'react';
import './index.css';
import { lyrics } from './assets/lyricsData.js';
import LyricLine from './components/LyricLine';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const song = process.env.PUBLIC_URL + '/quadratic_song.m4a';

function App() {
    const audioRef = useRef(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <div className="app-wrapper">
            <h1>🎵 Quadratic Formula Song 🎵</h1>
            <audio ref={audioRef} src={song} preload="auto" />
            <button onClick={handlePlay} style={{ marginTop: '1rem', fontSize: '1rem' }}>▶️ Play Song</button>
            <button onClick={handlePause} style={{ marginLeft: '1rem', marginTop: '1rem', fontSize: '1rem' }}>⏸️ Pause Song</button>
            {/* Lyric line component */}
            <LyricLine lyrics={lyrics} audioRef={audioRef} />

            {/* Static LaTeX equations below lyrics */}
            <MathJaxContext>
                <div className="formula-visible" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <MathJax dynamic>{`\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]`}</MathJax>
                    <MathJax dynamic>{`\\[ y = ax^2 + bx + c \\]`}</MathJax>
                </div>
            </MathJaxContext>
        </div>
    );
}

export default App;
