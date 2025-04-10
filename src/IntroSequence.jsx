import React from 'react';
import { useState, useEffect } from 'react';
import './IntroSequence.css';

const introLines = [
  '',
  'March 3rd, 2038',
  '',
  'Protocol was in place...',
  '',
  'DO NOT leave the bunkers, under any circumstances, until contact is made...',
  '',
  'Ten years passed...',
  'Until we heard it again...',
  'Felt it.',
  'A second Pulse. Exactly like the first...',
  'Impossible...',
  'There wasn’t supposed to be another one...',
  'We waited three more agonizing years.',
  'No contact.',
  'Nothing but silence.',
  '',
  '',
  '',
  'We had no choice but to climb...',
  '',
  'A two-day climb turned into ten',
  'Each step we could feel the air getting warmer... thicker',
  '',
  'On day three... a distant after-echo from above, we all could hear it...',
  '',
  <>
    Breathing?... It can’t be... it didn’t <em>breathe</em> before...
  </>,
  '',
  '',
  'That night the howls shook the very souls of our strongest',
  '',
  'By the second night, most had to return back down below.',
  'I couldn’t blame them, we didn’t know if we was climbing to our death...',
  'That howling — it changed everything.',
  <>
    It <em>really</em> was alive...
  </>,
  '',
  'We needed to know...',
  <>
    Was it <em>truly</em> the end of the world?
  </>,
  '',
  '',
  '',
  '',
  'We scrambled through the hatch, the final step...',
  'Exhausted... we lay on the floor to take a moment',
  '',
  '',
  '',
  'Eyes open... I look up',
  '',
  'It can’t be...',
  'A faint violet glow pulsing from the corner of the room...',
  '',
  'LOREA.',
  'Idle. But alive.',
  '',
  'But no contact was ever made...',
  'It doesn’t make sense...',
  '',
  '',
  'With a shaking hand, I look round at the others, confused...',
  'I press the power button...',
];



export default function IntroSequence({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [line, setLine] = useState(introLines[0]);
  const [lineKey, setLineKey] = useState(Date.now());

  useEffect(() => {
    if (index >= introLines.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    const current = introLines[index];
    setLine(current);
    setLineKey(Date.now());

    const delay = current === '' ? 950 : 4800;

    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <div className="intro-sequence">
     {/* 🧠 Intro line */}
      {line !== '' && index < introLines.length && (
        <p key={lineKey} className="intro-line fade-glitch">
          {line}
        </p>
      )}
    </div>
  );
}
