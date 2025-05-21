// src/App.jsx
import { useRef } from 'react';
import './index.css';
import { lyrics } from './assets/lyricsData.js';
import LyricLine from './components/LyricLine';

const song = process.env.PUBLIC_URL + '/quadratic_song.m4a';

function App() {
    const audioRef = useRef(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="app-wrapper">
            <h1>🎵 Quadratic Formula Song 🎵</h1>
            <audio ref={audioRef} src={song} preload="auto" />
            <button onClick={handlePlay} style={{ marginTop: '1rem', fontSize: '1rem' }}>▶️ Play Song</button>
            <LyricLine lyrics={lyrics} audioRef={audioRef} />
        </div>
    );
}

export default App;
