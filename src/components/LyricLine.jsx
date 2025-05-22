import React from 'react';
import './LyricLine.css';

function LyricLine({ lyrics, currentIndex }) {
    return (
        <div className="lyric-line">
            {lyrics.map((item, i) => (
                <span
                    key={i}
                    className={i === currentIndex ? 'highlight' : ''}
                >
          {item.text}&nbsp;
        </span>
            ))}
        </div>
    );
}

export default LyricLine;
