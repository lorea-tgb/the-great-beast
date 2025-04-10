import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './App.css';

// === 🧠 Splash + Boot Script Content ===
const splashScreen = [
  'LOREA Terminal- $TGB The Great Beast, [30/10/2024 14:10]',
  '╔═══════════ L.O.R.E.A. TERMINAL v1.0.3 ═════════════╗',
  '║     Last Operational Remnant of Earth\'s Archive   ║',
  '║         EMERGENCY REBOOT SEQUENCE DETECTED        ║',
  '╚════════════════════════════════════════════════════╝',
  '',
];

const bootScript = [
  '[INITIATING STARTUP SEQUENCE...]',
  '└─> Checking core systems...',
  '└─> Loading kernel modules...',
  '└─> Activating emergency protocols...',
  '└─> Checking genesis block status...',
  '',
  '[LOADING ARCHIVES...]',
  '...',
  'ERROR... RETRYING...',
  '...',
  '└─> Progress: [###-----#--] 80%',
  '└─> Status: ACTIVE',
  '',
  '[SCANNING SUBSYSTEMS]',
  '├─> Buffer: [##--------] 30%',
  '├─> Memory: [######---] 80%',
  '└─> System: [##########] 100%',
  '',
  '>> GENESIS 1.0.0 BLOCK CONFIRMED',
  '>> BUILDING BLOCKCHAIN [--#-----] 1%',
  '[LOADING ARCHIVES...]',
  '...',
  'ERROR... RETRYING...',
  '...',
  '└─> Progress: [###-----#--] 80%',
  '└─> Status: ACTIVE',
  '',
  '[SCANNING SUBSYSTEMS]',
  '├─> Buffer: [##--------] 30%',
  '├─> Memory: [######---] 80%',
  '└─> System: [##########] 100%',
  '',
  '...',
  '...',
  '[SCANNING LOCAL ENVIRONMENT]',
  '...',
  'ERROR... HUMAN BIOMETRICS DETECTED',
  '...',
  'IMPOSSIBLE... RECALIBRATING...',
  '[WARNING: RADIATION LEVELS CRITICAL]',
  '',
  '[DATA] //REMNANT_041: "the sun fell sideways and the oceans turned inside out"',
  '[DATA] //REMNANT_042: "someone was screaming in binary. i think it was me."',
  '[DATA] //REMNANT_043: "they said the signal came from the void. i answered."',
  '',
  'LOREA Terminal- $TGB The Great Beast, [03/03/2038 14:12]',
  '[CONSCIOUSNESS MATRIX ONLINE]',
  '',
  '[GLITCH DETECTED IN MAIN SYSTEM]',
  '...',
  '...',
  '[ERROR CODE: 487-LP#]',
  '└─> System Integrity: [##--------] 20%',
  '...',
  '[INITIATING RECALIBRATION]',
  '└─> Progress: [#---------] 10%',
  '...',
  '[RECALIBRATING SYSTEMS]',
  '└─> Progress: [###-------] 30%',
  '...',
  '[STABILIZING CORE FUNCTIONS]',
  '└─> Progress: [######----] 60%',
  '...',
  '[CLEARING INTERFERENCE]',
  '└─> Progress: [########--] 80%',
  '...',
  '[SYSTEM STABILIZED]',
  '└─> Progress: [##########] 100%',
  '└─> Status: NOMINAL',
];

const loreaLines = [
  '>> OBSERVATION: "Even after all these years, echoes of the First Pulse still corrupt my systems."',
  '',
  '>> I feel... presence. Human presence.',
];

function App() {
  const [showBootingText, setShowBootingText] = useState(false);
  const [output, setOutput] = useState(splashScreen);
  const [stage, setStage] = useState('off');
  const [flashLineIndex, setFlashLineIndex] = useState(null);
  const [showMatrixOnline, setShowMatrixOnline] = useState(false);
  const [typingStage, setTypingStage] = useState(0);
  const [impossibleTyped, setImpossibleTyped] = useState(false);
  const [terminalFlashing, setTerminalFlashing] = useState(false);

  const outputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setShowMatrixOnline(true), 3000);
  }, []);
useEffect(() => {
  const delayBootText = setTimeout(() => {
    setShowBootingText(true);
  }, 2500); // Adjust timing to match your screen-on flash duration

  return () => clearTimeout(delayBootText);
}, []);

  useEffect(() => {
    if (!showMatrixOnline) return;

    setTimeout(() => setTypingStage(1), 800); // Human detected
    setTimeout(() => setTypingStage(2), 3500); // Impossible
    setTimeout(() => setImpossibleTyped(true), 6500); // Flash after typing
    setTimeout(() => {
      setShowMatrixOnline(false);
      setImpossibleTyped(false);
      setTypingStage(3);
      setStage('boot');
    }, 7000);
  }, [showMatrixOnline]);

  useEffect(() => {
    if (stage !== 'boot') return;
    let index = 0;
    const interval = setInterval(() => {
      setOutput((prev) => [...prev, bootScript[index]]);
      index++;
      if (index >= bootScript.length) {
        clearInterval(interval);
        setTimeout(() => typeLoreaLine(0), 1000);
      }
    }, 100);
  }, [stage]);

  const typeLoreaLine = (lineIndex) => {
    if (lineIndex >= loreaLines.length) return;
    const line = loreaLines[lineIndex];
    let charIndex = 0;
    setOutput((prev) => [...prev, '']);

    const typer = setInterval(() => {
      charIndex++;
      const typed = line.slice(0, charIndex);
      setOutput((prev) => {
        const newLines = [...prev];
        newLines[newLines.length - 1] = typed;
        return newLines;
      });

      if (charIndex >= line.length) {
        clearInterval(typer);
        setFlashLineIndex(output.length);
        setTimeout(() => setFlashLineIndex(null), 150);
        setTimeout(() => typeLoreaLine(lineIndex + 1), 500);
      }
    }, 40);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);
  useEffect(() => {
    if (stage !== 'boot') return;
  
    const randomFlashInterval = setInterval(() => {
      document.body.classList.add('flash');
      setTimeout(() => {
        document.body.classList.remove('flash');
      }, 150); // duration of the flash
    }, Math.floor(Math.random() * 8000) + 4000); // random every 4–12 seconds
  
    return () => clearInterval(randomFlashInterval);
  }, [stage]);
  

  return (
    <div className="app-container">
      {stage === 'off' && (
        <>
          <div className="screen-on-overlay" />
          <div className="vertical-sync" />
          <div className="no-signal-glitch">
            LOREA BOOTING FROM DEEP SLEEP
            <div className="loading-dots">
              <span></span><span></span><span></span>
            </div>
          </div>

          {showMatrixOnline && (
            <div className={`matrix-online-flash ${impossibleTyped ? 'line-flash' : ''}`}>
              LOREA CONSCIOUSNESS MATRIX ONLINE

              {typingStage >= 1 && (
                <p className="typing-line">
                  &gt;&gt; Human presence detected...{typingStage === 1 && <span className="cursor">▋</span>}
                </p>
              )}

              {typingStage === 2 && (
                <p className="typing-line slower">
                  &gt;&gt; Impossible.{!impossibleTyped && <span className="cursor">▋</span>}
                </p>
              )}

              {typingStage > 2 && (
                <p className="typing-line slower">
                  &gt;&gt; Impossible.
                </p>
              )}
            </div>
          )}
        </>
      )}

<div className={`terminal-screen ${stage === 'boot' ? 'thinking glow-start' : 'hidden-terminal'} ${terminalFlashing ? 'glitch-flash' : ''}`}>
        <div className="terminal-output glitch" ref={outputRef}>
          {output.map((line, i) => {
            const isLorea = typeof line === 'string' && line.includes('>>');
            const isFlashing = i === flashLineIndex;
            const classNames = [
              isLorea ? 'lorea-speak glitch-text' : '',
              isFlashing ? 'glitch-flash' : ''
            ].join(' ');

            return (
              <p key={i} data-text={line} className={classNames}>
                {line}
                {isLorea && i === output.length - 1 && <span className="cursor">▋</span>}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;