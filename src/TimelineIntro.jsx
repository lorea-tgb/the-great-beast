/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import './timelineIntro.css';

const timelineEntries = [
  { date: "19th September 1959", text: "Physicists Philip Morrison and Giuseppe Cocconi speculate that communication from another species might occur through radio signals." },
  { date: "15th August 1977", text: "Ohio State University's Big Ear radio telescope detects the 'Wow' signal, an unexplained radio spike from space..." },
  { date: "12th April 2007", text: "The first-ever Fast Radio Burst (FRB) is discovered from old recorded data from 2001... FRB 180916 is found to have a repeating, rhythmic pulse every 16 days..." },
  { date: "13th September 2020", text: "FRB 180916 stops pulsing..." },
  { date: "22nd September 2020", text: "An object is recorded at the exact location of FRB 180916, showing a blueshift in the light spectrum...Indicating it is moving towards Earth..." },
  { date: "1st Nov 2020", text: "The object disappears." }
];

const entryPositions = [
  { top: '10%', left: '10%' },
  { top: '20%', left: '60%' },
  { top: '35%', left: '30%' },
  { top: '50%', left: '65%' },
  { top: '70%', left: '20%' },
  { top: '15%', left: '25%' },
  { top: '25%', left: '45%' },
  { top: '40%', left: '70%' },
  { top: '55%', left: '35%' },
  { top: '65%', left: '50%' },
  { top: '75%', left: '15%' },
];

const TimelineIntro = ({ onComplete }) => {
  const [currentEntry, setCurrentEntry] = useState(0);
  const [dateTyping, setDateTyping] = useState('');
  const [textTyping, setTextTyping] = useState('');
  const [specialStarState, setSpecialStarState] = useState('pulsing');
  const [wowSignal, setWowSignal] = useState(false);
  const [triggerEnd, setTriggerEnd] = useState(false);

  const starCount = 2000;

  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 3}s`,
      opacity: Math.random()
    }));
  }, []);

  const intervalsRef = useRef([]);

  useEffect(() => {
    if (triggerEnd) return;

    if (currentEntry >= timelineEntries.length) {
      setSpecialStarState('flash');
      setTriggerEnd(true);
    
      const container = document.querySelector('.timeline-container');
    
      // Begin slow fade to black
      if (container) {
        container.classList.add('fading');
      }
    
      // At 5s: flash, tear, star fade
      setTimeout(() => {
        setSpecialStarState('faded');
    
        if (container) {
          container.classList.add('flash-frame');       // 💥 quick white flash
          container.classList.add('screen-tear');       // ⚡ vertical glitch
          container.classList.add('horizontal-glitch'); // 🔊 horizontal wobble
        }
    
        // Remove the flash quickly so it’s just a blink
        setTimeout(() => {
          if (container) {
            container.classList.remove('flash-frame');
          }
        }, 200); // Flash lasts 150ms
      }, 5000);
    
      // At 15s: End timeline
      setTimeout(() => {
        onComplete?.();
      }, 20000);
    
      return;
    }
    
    
    

    const entry = timelineEntries[currentEntry];
    setDateTyping('');
    setTextTyping('');

    let dateIndex = 0;
    let textIndex = 0;
    let typedDate = '';
    let typedText = '';

    const dateTypingSpeed = 160;
    const textTypingSpeed = 40;
    const delayBetweenDateAndText = 1600;
    const entryDelay = 3000;
    const wowSignalDuration = 1500;
    const initialTypingDelay = currentEntry === 0 ? 2500 : 0;

    const clearAllIntervals = () => {
      intervalsRef.current.forEach(clearInterval);
      intervalsRef.current = [];
    };

    const typeDate = () => {
      const dateInterval = setInterval(() => {
        if (dateIndex < entry.date.length) {
          typedDate += entry.date[dateIndex++];
          setDateTyping(typedDate);
        } else {
          clearInterval(dateInterval);
          setTimeout(typeText, delayBetweenDateAndText);
        }
      }, dateTypingSpeed);
      intervalsRef.current.push(dateInterval);
    };

    const typeText = () => {
      const textInterval = setInterval(() => {
        if (textIndex < entry.text.length) {
          typedText += entry.text[textIndex++];
          setTextTyping(typedText);

          if (currentEntry === 1 && typedText.includes("'Wow' signal")) {
            setWowSignal(true);
            setTimeout(() => setWowSignal(false), wowSignalDuration);
          }

        } else {
          clearInterval(textInterval);
          setTimeout(() => setCurrentEntry(prev => prev + 1), entryDelay);
        }
      }, textTypingSpeed);
      intervalsRef.current.push(textInterval);
    };

    const initialDelayTimeout = setTimeout(typeDate, initialTypingDelay);
    
    return () => {
      clearTimeout(initialDelayTimeout);
      clearAllIntervals();
    };
    

  }, [currentEntry, triggerEnd]);

  return (
    <div className="timeline-container">
      <div className={`special-star ${specialStarState}`}></div>

      <div className={`starfield ${wowSignal ? 'wow-signal' : ''}`}>
        <div className="stars-only">
          {stars.map((star, idx) => (
            <div
              key={idx}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                animationDuration: star.duration,
                opacity: star.opacity
              }}
            />
          ))}
        </div>
      </div>

      {timelineEntries.map((entry, idx) => {
        if (idx !== currentEntry) return null;
        const position = entryPositions[idx % entryPositions.length];

        return (
          <div
            key={idx}
            className={`entry entry-${idx}`}
            style={{ top: position.top, left: position.left }}
          >
            <div className="date-line">{dateTyping}</div>
            <div className="text-line">
              {textTyping
                .split(/\n\n|\n/)
                .map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineIntro;