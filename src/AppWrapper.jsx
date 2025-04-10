import React, { useState, useEffect } from 'react';
import App from './App';
import IntroSequence from './IntroSequence';
import TimelineIntro from './TimelineIntro';

export default function AppWrapper() {
  const [phase, setPhase] = useState('timeline');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.altKey && e.key === '1') setPhase('timeline');
      if (e.altKey && e.key === '2') setPhase('intro');
      if (e.altKey && e.key === '3') setPhase('app');
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {phase === 'timeline' && (
        <TimelineIntro onComplete={() => setPhase('intro')} />
      )}
      {phase === 'intro' && (
        <IntroSequence onComplete={() => setPhase('app')} />
      )}
      {phase === 'app' && <App />}
    </>
  );
}
