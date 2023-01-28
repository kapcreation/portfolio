import React, { useState, useEffect } from 'react';

function Typewriter({ text }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return displayText
}

export default Typewriter;
