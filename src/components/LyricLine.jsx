// src/components/LyricLine.jsx
import { useEffect, useState } from 'react';

function LyricLine({ lyrics, audioRef }) {
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        if (!audioRef.current) return;

        const interval = setInterval(() => {
            const currentTime = audioRef.current.currentTime;
            const index = lyrics.findIndex((line, i) => {
                const next = lyrics[i + 1];
                return currentTime >= line.time && (!next || currentTime < next.time);
            });
            setActiveIndex(index);
        }, 100);

        return () => clearInterval(interval);
    }, [audioRef, lyrics]);

    return (
        <div style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '2rem' }}>
            {lyrics.map((word, i) => (
                <span
                    key={i}
                    style={{
                        marginRight: '0.5rem',
                        color: i === activeIndex ? 'red' : 'black',
                        fontWeight: i === activeIndex ? 'bold' : 'normal',
                        textDecoration: i === activeIndex ? 'underline' : 'none',
                    }}
                >
          {word.text}
        </span>
            ))}
        </div>
    );
}

export default LyricLine;
