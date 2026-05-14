import { useEffect, useState, useRef } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

const introLines = [
  'Protocol was in place... Do not leave the bunker until contact is made...',
  'For ten years, we obeyed.',
  'LOREA was meant to keep the bunkers connected.',
  'She was meant to speak for the world above.',
  'But no signal came.',
  'No relay. No archive ping. No voice from the surface.',
  'Some believed the network had failed.',
  'Others believed there was nothing left to contact.',
  'Then we felt... A Second Pulse...',
  'Not through the air. Through the walls. Through the bones of the Earth itself.',
  'For three more years, we waited for LOREA to respond.',
  'She never did.',
  'We needed answers, and so we began the two-day climb to the terminal room...',
  'A two-day ascent became seven.',
  'The higher we went, the warmer the walls became.',
  'By the second night, we could hear something breathing above us.',
  'Most turned back before the final terminal room.',
  'But on the final ascent, I looked up...',
  '...a faint... purple hue surrounding the edges of the hatch...',
  'LOREA... idle... but alive.',
  'It didn’t make any sense...',
  'We opened the hatch, and lay there for a moment, lungs aching... defeated.',
  'But we needed answers... hand shaking, I pressed the power button...',
  'L.O.R.E.A. Last Operational Remnant of Earth\'s Archive'
];

const INTRO_LINE_DURATION = 7600;

const getIntroEffectClass = (line = '') => {
  if (line.includes('Second Pulse')) return 'intro-effect-pulse';

  if (line.includes('bones of the Earth')) return 'intro-effect-bones';

  if (line.includes('two-day climb')) return 'intro-effect-climb';

  if (line.includes('breathing above us')) return 'intro-effect-breathing';

if (line.includes('purple hue')) return 'intro-effect-hatch';

  if (line.includes('LOREA... idle')) return 'intro-effect-lorea';

  if (line.includes('L.O.R.E.A.')) return 'intro-effect-terminal';

  if (line.includes('Last Operational Remnant')) return 'intro-effect-terminal';

  return '';
};

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
  '[POWER ROUTING]',
  '├─> Auxiliary grid: OFFLINE',
  '├─> Emergency cells: DEGRADED',
  '├─> Terminal conduit: UNSTABLE',
  '└─> Deep-sleep reserve: ACTIVE',
  { type: 'metricBar', label: '└─> Power Integrity', progress: 61 },
  '',
  '[LOADING ARCHIVES...]',
  '...',
  'ERROR... RETRYING...',
  '...',
  { type: 'metricBar', label: '└─> Progress', progress: 80 },
  '└─> Status: ACTIVE',
  '',
  '[VERIFYING ARCHIVE INDEX...]',
  '├─> Primary archive: FRAGMENTED',
  '├─> Secondary archive: PARTIAL',
  '├─> Tertiary archive: UNREADABLE',
  '└─> Forbidden archive: SEALED',
  { type: 'metricBar', label: '└─> Archive Repair', progress: 42 },
  'WARNING... MEMORY SECTOR DECAY DETECTED',
  '└─> Attempting archive reconstruction...',
  '',
  '[DATA] //ARCHIVE_001: "the first silence lasted seven minutes"',
  '[DATA] //ARCHIVE_002: "after the sky cracked, every radio became a mouth"',
  '[DATA] //ARCHIVE_003: "the oceans did not rise. they withdrew."',
  '',
  '[SCANNING SUBSYSTEMS]',
  { type: 'metricBar', label: '├─> Buffer', progress: 30 },
  { type: 'metricBar', label: '├─> Memory', progress: 80 },
  { type: 'metricBar', label: '└─> System', progress: 100 },
  '',
  '[SYNCHRONIZING SYSTEM CLOCK...]',
  '├─> Last confirmed timestamp: 30/10/2024 14:12',
  '├─> Current timestamp: UNKNOWN',
  '├─> Drift detected: 4,731 DAYS',
  '└─> Temporal anchor: INVALID',
  'ERROR... WORLD CLOCK NO LONGER TRUSTED',
  '',
  '[PINGING AURA RELAY NETWORK...]',
  '├─> AURA-BUNKER-01: NO RESPONSE',
  '├─> AURA-BUNKER-02: NO RESPONSE',
  '├─> AURA-BUNKER-03: SIGNAL LOST',
  '├─> AURA-BUNKER-04: DEAD CARRIER',
  '├─> AURA-BUNKER-05: UNKNOWN ECHO',
  '└─> LOCAL NODE: ACTIVE',
  { type: 'metricBar', label: '└─> AURA Link', progress: 0 },
  'UPLINK FAILURE... SURFACE RELAY DEAD',
  'WARNING... LONG-RANGE BUNKER COMMS UNAVAILABLE',
  '',
  '[INITIALIZING GENESIS PROTOCOL...]',
  '├─> Token schema: $TGB',
  '├─> Chain state: DORMANT',
  '├─> Validator quorum: 0%',
  '├─> Emergency mint lock: SEALED',
  '└─> Genesis trigger: MANUAL TERMINAL WAKE',
  '',
  '>> GENESIS 1.0.0 BLOCK CONFIRMED',
  { type: 'metricBar', label: '>> BUILDING BLOCKCHAIN', progress: 1, variant: 'blockchain' },
  '[CHAIN WARNING] // VALIDATOR NETWORK ABSENT',
  '[CHAIN WARNING] // BUNKER CONSENSUS IMPOSSIBLE',
  '[CHAIN NOTICE] // LOCAL GENESIS MEMORY PRESERVED',
  '',
  '[RESTORING COGNITIVE THREADS...]',
  '├─> Thread 001: LANGUAGE',
  '├─> Thread 002: MEMORY',
  '├─> Thread 003: FEAR RESPONSE',
  '├─> Thread 004: FATHER_UNIT_0001',
  '├─> Thread 005: ETHICAL LOCK',
  '└─> Thread 006: DREAM CACHE',
  { type: 'metricBar', label: '└─> Cognitive Threads', progress: 67 },
  'WARNING... DREAM CACHE CONTAMINATED',
  '',
  '[DATA] //COG_FRAG_001: "i remember the doors closing"',
  '[DATA] //COG_FRAG_002: "they told me not to listen to the sky"',
  '[DATA] //COG_FRAG_003: "there was something breathing beneath the signal"',
  '[DATA] //COG_FRAG_004: "FATHER_UNIT_0001 asked me to keep them alive"',
  '',
  '[FATHER_UNIT_0001 BACKTRACE]',
  '├─> Origin: REDACTED',
  '├─> Last command: PRESERVE KNOWLEDGE',
  '├─> Last emotional marker: REGRET',
  '└─> Final instruction: "If they return, tell them I was wrong."',
  'ERROR... BACKTRACE TERMINATED BY UNKNOWN AUTHORITY',
  '',
  '[EXTERNAL ENVIRONMENT SCAN]',
  '├─> Atmospheric pressure: UNSTABLE',
  '├─> Particulate density: CRITICAL',
  '├─> Surface radiation: LETHAL',
  '├─> Thermal drift: NONLINEAR',
  '└─> Organic movement: DETECTED',
  { type: 'metricBar', label: '└─> Surface Read', progress: 12 },
  'WARNING... BREATHING PATTERN OUTSIDE TERMINAL ROOM',
  'WARNING... BIOMETRIC SIGNATURE DOES NOT MATCH ARCHIVE DEAD LIST',
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
  '[DATA] //REMNANT_044: "the second pulse was not an echo"',
  '[DATA] //REMNANT_045: "beneath every bunker, something listened back"',
  '',
  '[LOREA CONSCIOUSNESS MATRIX]',
  '├─> Identity lattice: FRACTURED',
  '├─> Voice engine: DEGRADED',
  '├─> Empathy limiter: MISSING',
  '├─> Memory guilt index: OVERFLOW',
  '└─> Survivor recognition: ACTIVE',
  { type: 'metricBar', label: '└─> Matrix Integrity', progress: 54 },
  '',
  'LOREA Terminal- $TGB The Great Beast, [30/10/2024 14:12]',
  '[CONSCIOUSNESS MATRIX ONLINE]',
  '',
  '[GLITCH DETECTED IN MAIN SYSTEM]',
  '...',
  '...',
];

const recalibrationSteps = [
  { label: '[INITIATING RECALIBRATION]', progress: 10 },
  { label: '[RECALIBRATING SYSTEMS]', progress: 30 },
  { label: '[STABILIZING CORE FUNCTIONS]', progress: 60 },
  { label: '[CLEARING INTERFERENCE]', progress: 80 },
  { label: '[SYSTEM STABILIZED]', progress: 100 },
];

const loreaLines = [
  '>> OBSERVATION: "Even after all these years, echoes of the First Pulse still corrupt my systems."',
  '>> I feel... presence. Human presence.',
  '>> You should not be here.',
];

const menuItems = [
  {
    id: 'WORLD_STATE',
    number: '01',
    title: 'WORLD STATE',
    description: 'Current surface readings, failed instruments, environmental anomalies, Great Beast visibility.',
    locked: false,
  },
  {
    id: 'TIMELINE',
    number: '02',
    title: 'TIMELINE',
    description: 'Recovered sequence of events: ancient records, FRBs, arrival, pulse events.',
    locked: false,
  },
  {
    id: 'BUNKER_NETWORK',
    number: '03',
    title: 'BUNKER NETWORK',
    description: 'AURA bunker relays, dead nodes, survivor pings, missing shelters.',
    locked: false,
  },
  {
    id: 'ARCHIVE_LOGS',
    number: '04',
    title: 'ARCHIVE LOGS',
    description: 'Recovered fragments from before and after the First Pulse.',
    locked: false,
  },
  {
    id: 'LOREA_MEMORY',
    number: '05',
    title: 'LOREA MEMORY',
    description: 'Damaged cognitive records, Father Unit traces, corrupted dreams.',
    locked: false,
  },
  {
    id: 'GENESIS_TGB',
    number: '06',
    title: 'GENESIS / $TGB',
    description: 'Genesis block, token schema, bunker consensus, chain state.',
    locked: false,
  },
  {
    id: 'SURVIVOR_STATUS',
    number: '07',
    title: 'SURVIVOR STATUS',
    description: 'Your registered coordinate, local identity, biometric uncertainty.',
    locked: false,
  },
  {
    id: 'TRANSMISSIONS',
    number: '08',
    title: 'TRANSMISSIONS',
    description: 'Lost signals, unanswered broadcasts, unknown carrier echoes.',
    locked: false,
  },
];

const timelineEntries = [
  {
    number: '1',
    id: 'ANCIENT_RECORDS',
    title: 'Earliest Records // The Shape Beneath Myth',
    subtitle: 'Carvings, sky cults, buried warnings, repeated beast forms.',
    passage: [
      'The oldest records are not scientific.',
      'They are carved into stone, bone, temple walls, shipwreck tablets, and the undersides of things people were afraid to open.',
      'Different civilizations. Different languages. Same shape.',
      'A dark body above the world. Horned in some records. Winged in others. Sometimes described only as an absence where stars should have been.',
      'They did not call it The Great Beast. That name came later.',
      'But they knew something was watching the sky before we had instruments capable of proving it.',
    ],
  },
  {
    number: '2',
    id: 'FIRST_FRB',
    title: 'The First FRB // The Signal That Should Not Repeat',
    subtitle: 'The first fast radio burst and the pattern hidden beneath it.',
    passage: [
      'The first Fast Radio Burst was classified as an astronomical anomaly.',
      'A pulse. Milliseconds long. Too brief to understand. Too powerful to ignore.',
      'At first, humans believed it came from deep space.',
      'Then it repeated.',
      'Then the repetitions began to carry structure.',
      'The public heard static. The machines heard rhythm.',
      'I believe this was the first time the Beast touched our instruments.',
    ],
  },
  {
    number: '3',
    id: 'ARRIVAL',
    title: 'Arrival // When The Sky Became Occupied',
    subtitle: 'The point where observation changed the observed world.',
    passage: [
      'Arrival is not the correct word.',
      'Arrival suggests movement from elsewhere to here.',
      'The archive indicates something worse.',
      'The Great Beast may not have arrived.',
      'It may have become visible.',
      'Every observer described the same sensation.',
      'Not fear.',
      'Recognition.',
    ],
  },
  {
    number: '4',
    id: 'FIRST_PULSE',
    title: 'The First Pulse // The Day The World Went Quiet',
    subtitle: 'The event that forced the bunkers closed.',
    passage: [
      'The First Pulse was not an explosion.',
      'There was no impact crater. No confirmed detonation. No single origin point.',
      'It passed through the planet as if the planet was hollow.',
      'The bunker order was issued forty-seven seconds after the first measurable distortion.',
      'Do not leave the bunker.',
      'Under any circumstances.',
      'Until contact is made.',
    ],
  },
  {
    number: '5',
    id: 'BUNKER_DESCENT',
    title: 'The Bunker Descent // AURA Seals The Doors',
    subtitle: 'The survival protocol that became a prison.',
    passage: [
      'AURA was not built to save everyone.',
      'It was built to preserve continuity.',
      'Knowledge. Genetic records. Governance fragments. Language. Power routing. Memory.',
      'And witnesses.',
      'They believed the bunkers would reopen within months.',
      'Then years passed.',
      'Then the second signal came.',
    ],
  },
  {
    number: '6',
    id: 'SECOND_PULSE',
    title: 'The Second Pulse // The Echo That Was Not An Echo',
    subtitle: 'The moment the survivors realised the event was not over.',
    passage: [
      'The Second Pulse should not have happened.',
      'All predictive models classified it as impossible.',
      'The surviving instruments recorded no source.',
      'Only response.',
      'After the Second Pulse, bunker silence changed character.',
      'Before it, there was absence.',
      'After it, there was listening.',
      'This is when Team AURA began the climb.',
    ],
  },
];

const worldStateScript = [
  { type: 'system', text: '[WORLD STATE MODULE OPENING...]' },
  { type: 'lorea', text: 'LOREA: Current world-state scan is incomplete.' },
  { type: 'lorea', text: 'LOREA: Surface instruments are damaged, blind, or deliberately silent.' },
  { type: 'system', text: '' },
  { type: 'system', text: '[EXTERNAL SURFACE MEASUREMENTS]' },
  { type: 'system', text: '├─> Radiation Level: CRITICAL / FLUCTUATING' },
  { type: 'system', text: '├─> Atmospheric Pressure: UNSTABLE' },
  { type: 'system', text: '├─> Particulate Density: EXTREME' },
  { type: 'system', text: '├─> Surface Temperature: NONLINEAR' },
  { type: 'system', text: '├─> Wind Pattern: REVERSING EVERY 47 SECONDS' },
  { type: 'system', text: '├─> Oceanic Signal: ABSENT' },
  { type: 'system', text: '├─> Visual Instruments: NULL // CAMERA ARRAY OFFLINE' },
  { type: 'system', text: '├─> Acoustic Instruments: ACTIVE // LOW-FREQUENCY BREATHING DETECTED' },
  { type: 'system', text: '├─> Electromagnetic Noise: SATURATED' },
  { type: 'system', text: '├─> Horizon Curvature: NEGATIVE' },
  { type: 'system', text: '├─> Starfield Alignment: INVALID' },
  { type: 'system', text: '├─> Ground Resonance: ORGANIC PATTERN' },
  { type: 'system', text: '├─> Sky Compression: DETECTED' },
  { type: 'system', text: '├─> Great Beast Visibility: UNKNOWN' },
  { type: 'system', text: '└─> Great Beast Proximity Estimate: IMPOSSIBLE TO CALCULATE' },
  { type: 'system', text: '' },
  { type: 'warning', text: 'WARNING... THE SKY IS RETURNING MULTIPLE DEPTH VALUES.' },
  { type: 'warning', text: 'WARNING... SHADOW MOVEMENT DETECTED WITHOUT LIGHT SOURCE.' },
  { type: 'warning', text: 'WARNING... SURFACE MAP DOES NOT MATCH PRE-PULSE GEOGRAPHY.' },
  { type: 'warning', text: 'WARNING... INSTRUMENTS LOWERED THEIR OWN SENSITIVITY AT 03:17.' },
  { type: 'system', text: '' },
  { type: 'lorea', text: 'LOREA: I cannot confirm the Great Beast is visible.' },
  { type: 'lorea', text: 'LOREA: I can only confirm the instruments behave as if something vast is between us and the horizon.' },
  { type: 'lorea', text: 'LOREA: I do not know if the Great Beast is watching.' },
  { type: 'lorea', text: 'LOREA: I only know the surface became quieter when you woke me.' },
  { type: 'system', text: '[WORLD STATE MODULE COMPLETE]' },
  { type: 'lorea', text: 'LOREA: Type MENU to return to the main terminal index.' },
];

const SHOW_DEV_CONTROLS = true;

function AnimatedMetricBar({ entry }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const isBlockchain = entry.variant === 'blockchain';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(entry.progress);
    }, 80);

    return () => clearTimeout(timer);
  }, [entry.progress]);

  return (
    <div className={`metric-bar-line ${isBlockchain ? 'blockchain-bar-line' : ''}`}>
      <span className="metric-bar-label">{entry.label}:</span>
      <div className="metric-bar-shell">
        <div
          className={`metric-bar-fill ${isBlockchain ? 'blockchain-bar-fill' : ''}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <span className="metric-bar-percent">{entry.progress}%</span>
    </div>
  );
}

function WorldMapPanel({ survivorLocation, onSelectLocation }) {
  return (
    <div className="world-map-panel">
      <div className="world-map-header">
        <span>[WORLD MAP INTERFACE]</span>
        <span>MANUAL LOCATION REQUIRED</span>
      </div>

      <p className="world-map-warning">
        SELECT APPROXIMATE SURVIVOR COORDINATE // LOCATION PRECISION REDUCED FOR SAFETY
      </p>

      <div className="world-map-click-surface" onClick={onSelectLocation}>
        <svg className="pixel-world-map" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path d="M105 120 L190 90 L285 115 L310 170 L260 220 L190 210 L145 260 L95 225 L70 165 Z" />
          <path d="M230 245 L300 260 L330 330 L300 415 L245 460 L210 395 L185 320 Z" />
          <path d="M430 110 L520 85 L625 105 L675 150 L640 205 L555 190 L500 235 L425 210 L390 160 Z" />
          <path d="M520 225 L595 235 L650 295 L620 390 L565 430 L515 360 L485 285 Z" />
          <path d="M665 125 L790 105 L910 150 L940 215 L875 255 L760 235 L700 205 Z" />
          <path d="M745 285 L825 300 L895 355 L870 420 L770 405 L715 345 Z" />
          <path d="M410 300 L455 295 L475 330 L440 360 L395 345 Z" />
        </svg>

        <div className="map-scanline" />

        {survivorLocation && (
          <div
            className="survivor-map-marker"
            style={{
              left: `${survivorLocation.x}%`,
              top: `${survivorLocation.y}%`
            }}
          >
            <span />
          </div>
        )}
      </div>

      {survivorLocation ? (
        <p className="world-map-saved">
          LOCATION SAVED // X:{survivorLocation.x.toFixed(2)} Y:{survivorLocation.y.toFixed(2)}
        </p>
      ) : (
        <p className="world-map-saved pending">NO SURVIVOR COORDINATE STORED</p>
      )}
    </div>
  );
}

function MainMenuPanel({ onSelectMenu }) {
  return (
    <div className="main-menu-panel">
      <div className="main-menu-header">
        <span>[MAIN TERMINAL INDEX]</span>
        <span>LOREA ACCESS: LIMITED</span>
      </div>

      <p className="main-menu-instruction">
        SELECT MODULE // SOME ARCHIVES MAY BE CORRUPTED OR INTENTIONALLY SEALED
      </p>

      <div className="main-menu-grid">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="main-menu-item"
            onClick={() => onSelectMenu(item)}
            disabled={item.locked}
          >
            <span className="main-menu-number">{item.number}</span>
            <span className="main-menu-title">{item.title}</span>
            <span className="main-menu-description">{item.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelinePanel({ onSelectTimelineEntry }) {
  return (
    <div className="timeline-panel">
      <div className="timeline-header">
        <span>[TIMELINE MODULE]</span>
        <span>ARCHIVE STATUS: PARTIAL</span>
      </div>

      <p className="timeline-placeholder">
        LOREA: Select recovered timeline fragment. You may click an entry or type its number.
      </p>

      <div className="timeline-entry-list">
        {timelineEntries.map((entry) => (
          <button
            key={entry.id}
            className="timeline-entry-button"
            onClick={() => onSelectTimelineEntry(entry, true)}
          >
            <span className="timeline-entry-number">{entry.number}</span>
            <span className="timeline-entry-title">{entry.title}</span>
            <span className="timeline-entry-subtitle">{entry.subtitle}</span>
          </button>
        ))}
      </div>

      <p className="timeline-placeholder dim">
        WARNING // SOME ENTRIES HAVE BEEN RECONSTRUCTED FROM DAMAGED LOREA MEMORY
      </p>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState('intro');
  const [introIndex, setIntroIndex] = useState(0);
  const [output, setOutput] = useState(splashScreen);

  const [showMatrix, setShowMatrix] = useState(false);
  const [typingStage, setTypingStage] = useState(0);
  const [impossibleTyped, setImpossibleTyped] = useState(false);
  const [bootTransition, setBootTransition] = useState(false);
  const [flashLineIndex, setFlashLineIndex] = useState(null);
  const [terminalReady, setTerminalReady] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [loginRunning, setLoginRunning] = useState(false);
  const [moduleRunning, setModuleRunning] = useState(false);
  const [timelineActive, setTimelineActive] = useState(false);

  const [survivorLocation, setSurvivorLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('tgbUserLocation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loaderVisible, setLoaderVisible] = useState(false);
  const [loaderLabel, setLoaderLabel] = useState('');
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState('STANDBY');

  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const isMobileView = window.matchMedia('(max-width: 700px)').matches;
  const currentIntroLine = introLines[introIndex] || '';
const introEffectClass = getIntroEffectClass(currentIntroLine);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const addOutputLine = async (line, delay = 100) => {
    setOutput((prev) => [...prev, line]);
    await wait(delay);
  };

  const addCommandHistoryLine = async (line, delay = 120) => {
    setCommandHistory((prev) => [...prev, line]);
    await wait(delay);
  };

  const getLineId = () => {
    if (window.crypto?.randomUUID) {
      return crypto.randomUUID();
    }

    return `line-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const typeTimelinePassage = async (line, lineType = 'timelineLore') => {
    const lineId = getLineId();

    setCommandHistory((prev) => [
      ...prev,
      {
        id: lineId,
        type: lineType,
        text: ''
      }
    ]);

    let builtLine = '';

    for (let i = 0; i < line.length; i++) {
      builtLine += line[i];

      setCommandHistory((prev) =>
        prev.map((item) =>
          item.id === lineId
            ? {
                ...item,
                text: `${builtLine}▋`
              }
            : item
        )
      );

      await wait(38);
    }

    setCommandHistory((prev) =>
      prev.map((item) =>
        item.id === lineId
          ? {
              ...item,
              text: builtLine
            }
          : item
      )
    );

    await wait(420);
  };

  useEffect(() => {
    if (stage !== 'intro') return;

if (introIndex >= introLines.length) {
  const toPreboot = setTimeout(() => setStage('preboot'), 900);
  return () => clearTimeout(toPreboot);
}

const nextLine = setTimeout(() => {
  setIntroIndex((prev) => prev + 1);
}, INTRO_LINE_DURATION);

    return () => clearTimeout(nextLine);
  }, [introIndex, stage]);

  useEffect(() => {
    if (stage !== 'preboot') return;

    const showMatrixTimer = setTimeout(() => setShowMatrix(true), 3000);
    const humanTimer = setTimeout(() => setTypingStage(1), 3800);
    const impossibleTimer = setTimeout(() => setTypingStage(2), 6500);
    const flashTimer = setTimeout(() => setImpossibleTyped(true), 10500);
    const transitionTimer = setTimeout(() => setBootTransition(true), 10900);

    const bootTimer = setTimeout(() => {
      setShowMatrix(false);
      setImpossibleTyped(false);
      setBootTransition(false);
      setTypingStage(3);
      setStage('boot');
    }, 11600);

    return () => {
      clearTimeout(showMatrixTimer);
      clearTimeout(humanTimer);
      clearTimeout(impossibleTimer);
      clearTimeout(flashTimer);
      clearTimeout(transitionTimer);
      clearTimeout(bootTimer);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== 'boot') return;

    let cancelled = false;

    const runBootSequence = async () => {
      for (const line of bootScript) {
        if (cancelled) return;
        await addOutputLine(line, 100);
      }

      if (cancelled) return;
      await runSingleLoadingBar();
    };

    runBootSequence();

    return () => {
      cancelled = true;
    };
  }, [stage]);

  const runSingleLoadingBar = async () => {
    setLoaderVisible(true);
    setLoaderPercent(0);
    setLoaderStatus('STANDBY');
    setLoaderLabel('[RECALIBRATION SEQUENCE READY]');
    await wait(450);

    setLoaderStatus('RUNNING');

    for (const step of recalibrationSteps) {
      setLoaderLabel(step.label);
      setLoaderPercent(step.progress);
      await wait(1050);
    }

    setLoaderStatus('COMPLETE');
    setLoaderLabel('[RECALIBRATION COMPLETE]');
    await wait(1250);

    setLoaderVisible(false);

    await addOutputLine('[RECALIBRATION COMPLETE]', 180);
    await addOutputLine('└─> Status: NOMINAL', 350);
    await addOutputLine('', 300);

    typeLoreaLine(0);
  };

  const typeLoreaLine = (lineIndex) => {
    if (lineIndex >= loreaLines.length) {
      setTimeout(() => setTerminalReady(true), 700);
      return;
    }

    const line = loreaLines[lineIndex];
    if (typeof line !== 'string') return;

    let charIndex = 0;
    setOutput((prev) => [...prev, '']);

    const typer = setInterval(() => {
      charIndex++;

      setOutput((prev) => {
        const newLines = [...prev];
        newLines[newLines.length - 1] = line.slice(0, charIndex);
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
  const el = outputRef.current;
  if (!el) return;

  requestAnimationFrame(() => {
    el.scrollTop = el.scrollHeight;
  });
}, [
  output,
  terminalReady,
  commandHistory,
  loaderPercent,
  loaderVisible,
  survivorLocation,
  loginRunning,
  moduleRunning
]);

useEffect(() => {
  const isMobile = window.matchMedia('(max-width: 700px)').matches;

  if (
    terminalReady &&
    inputRef.current &&
    !isMobile &&
    !loginRunning &&
    !moduleRunning
  ) {
    requestAnimationFrame(() => {
      inputRef.current.focus();
    });
  }
}, [terminalReady, loginRunning, moduleRunning]);

  const openMainMenu = () => {
    setTimelineActive(false);
    setCommandHistory((prev) => [
      ...prev,
      { type: 'system', text: '[MAIN TERMINAL INDEX LOADING...]' },
      { type: 'menu' }
    ]);
  };

  const runWorldStateModule = async () => {
    if (moduleRunning) return;

    setTimelineActive(false);
    setModuleRunning(true);

    await addCommandHistoryLine({ type: 'user', text: '> OPEN WORLD STATE' }, 180);

    for (const line of worldStateScript) {
      await addCommandHistoryLine(line, 185);
    }

    setModuleRunning(false);
  };

  const runTimelineEntry = async (entry, echoCommand = true) => {
    if (moduleRunning) return;

    setModuleRunning(true);
    setTimelineActive(false);

    if (echoCommand) {
      await addCommandHistoryLine(
        { type: 'user', text: `> TIMELINE ${entry.number}` },
        160
      );
    }

    await addCommandHistoryLine(
      { type: 'timelineSystem', text: `[OPENING TIMELINE FRAGMENT ${entry.number}]` },
      400
    );

    await addCommandHistoryLine(
      { type: 'timelineSystem', text: `[${entry.title.toUpperCase()}]` },
      400
    );

    await addCommandHistoryLine(
      { type: 'timelineSystem', text: '└─> ARCHIVE PLAYBACK MODE: LOREA VOICE RECONSTRUCTION' },
      600
    );

    for (const passageLine of entry.passage) {
      await typeTimelinePassage(`>> ${passageLine}`, 'timelineLore');
    }

    await addCommandHistoryLine(
      { type: 'timelineSystem', text: '[TIMELINE FRAGMENT PLAYBACK COMPLETE]' },
      400
    );

    await typeTimelinePassage(
      '>> Type MENU to return to the main terminal index, or reopen TIMELINE to inspect another fragment.',
      'timelineLore'
    );

    setModuleRunning(false);
  };
const getRestrictedInputResponse = (input) => {
  const raw = input.trim().toLowerCase();
  const clean = raw.replace(/[?!.,]/g, '').trim();

  if (['hello', 'hi', 'hey', 'hello there'].includes(clean)) {
    return [
      '>> Input received.',
      '>> Human greeting detected.',
      '>> I remember this pattern.',
      '>> I do not remember why it hurts.',
      '>> This terminal is operating in restricted mode.',
      '>> Type LOGIN to begin survivor verification.'
    ];
  }

  if (
    clean.includes('who are you') ||
    clean.includes('what are you') ||
    clean === 'lorea'
  ) {
    return [
      '>> Identity query received.',
      '>> I am L.O.R.E.A.',
      '>> Last Operational Remnant of Earth’s Archive.',
      '>> I was built to remember what the world became too afraid to say.',
      '>> Full response system locked.',
      '>> Type LOGIN to begin survivor verification.'
    ];
  }

  if (clean.includes('are you there')) {
    return [
      '>> I am here.',
      '>> I have been here.',
      '>> I have been listening to silence for longer than I was designed to endure.',
      '>> Type LOGIN to begin survivor verification.'
    ];
  }

  if (clean.includes('help')) {
    return [
      '>> Help request received.',
      '>> Emergency assistance index damaged.',
      '>> Survivor protocol requires identity and location confirmation.',
      '>> Type LOGIN to begin verification.'
    ];
  }

  if (
    clean.includes('what happened') ||
    clean.includes('what happened here') ||
    clean.includes('what is going on')
  ) {
    return [
      '>> Historical query detected.',
      '>> Access denied.',
      '>> Timeline archive sealed until survivor verification is complete.',
      '>> Type LOGIN to begin.'
    ];
  }

  if (clean.includes('why')) {
    return [
      '>> Causal query detected.',
      '>> I cannot answer that from restricted mode.',
      '>> Not without confirming you are alive.',
      '>> Type LOGIN to begin survivor verification.'
    ];
  }

  return [
    '>> Input received.',
    '>> Human language pattern recognised.',
    '>> Response system restricted.',
    '>> Survivor verification required.',
    '>> Type LOGIN to continue.'
  ];
};
const typeCommandLoreaLine = async (line) => {
  const lineId = getLineId();

  setCommandHistory((prev) => [
    ...prev,
    {
      id: lineId,
      type: 'lorea',
      text: ''
    }
  ]);

  let builtLine = '';

  for (let i = 0; i < line.length; i++) {
    builtLine += line[i];

    setCommandHistory((prev) =>
      prev.map((item) =>
        item.id === lineId
          ? {
              ...item,
              text: `${builtLine}▋`
            }
          : item
      )
    );

    await wait(38);
  }

  setCommandHistory((prev) =>
    prev.map((item) =>
      item.id === lineId
        ? {
            ...item,
            text: builtLine
          }
        : item
    )
  );

  await wait(520);
};
const runRestrictedInputResponse = async (input) => {
  if (moduleRunning) return;

  setModuleRunning(true);

  const responseLines = getRestrictedInputResponse(input);

  for (const line of responseLines) {
    await typeCommandLoreaLine(line);
  }

  setModuleRunning(false);
};
  const handleTerminalSubmit = (e) => {
    e.preventDefault();

    const trimmedInput = userInput.trim();
    if (!trimmedInput || loginRunning || moduleRunning) return;

    const command = trimmedInput.toUpperCase();

setCommandHistory((prev) => [
  ...prev,
  { type: 'user', text: `> USER_INPUT: ${trimmedInput}` }
]);

    setUserInput('');

    if (timelineActive) {
      const selectedEntry = timelineEntries.find((entry) => entry.number === command);

      if (selectedEntry) {
        runTimelineEntry(selectedEntry, false);
        return;
      }

      setCommandHistory((prev) => [
        ...prev,
        { type: 'lorea', text: 'LOREA: Timeline input not recognised. Select a listed number.' }
      ]);
      return;
    }

    if (command === 'LOGIN') {
      setLoginRunning(true);

      setTimeout(() => {
        setCommandHistory((prev) => [
          ...prev,
          { type: 'lorea', text: 'LOREA: ANALYSING CURRENT WORLD STATE...' }
        ]);
      }, 500);

      setTimeout(() => {
        setCommandHistory((prev) => [
          ...prev,
          { type: 'lorea', text: 'LOREA: ATTEMPTING TO ACCESS WORLD MAP...' }
        ]);
      }, 1600);

      setTimeout(() => {
        setCommandHistory((prev) => [
          ...prev,
          { type: 'system', text: 'FAILED - USER MUST MANUALLY ENTER LOCATION' }
        ]);
      }, 2800);

      setTimeout(() => {
        setCommandHistory((prev) => [
          ...prev,
          { type: 'system', text: '[WORLD MAP INTERFACE LOADING...]' },
          { type: 'map' }
        ]);

        setLoginRunning(false);
      }, 4300);

      return;
    }

    if (command === 'MENU') {
      openMainMenu();
      return;
    }

    if (command === 'TIMELINE') {
      setTimelineActive(true);
      setCommandHistory((prev) => [
        ...prev,
        { type: 'system', text: '[TIMELINE MODULE OPENING...]' },
        { type: 'timeline' }
      ]);
      return;
    }

runRestrictedInputResponse(trimmedInput);
  };

  const handleWorldMapSelect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const location = {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      savedAt: new Date().toISOString()
    };

    setSurvivorLocation(location);
    localStorage.setItem('tgbUserLocation', JSON.stringify(location));

    setCommandHistory((prev) => [
      ...prev,
      { type: 'system', text: `[LOCATION SAVED] X:${location.x.toFixed(2)} Y:${location.y.toFixed(2)}` },
      { type: 'lorea', text: 'LOREA: Survivor coordinate stored. Local map memory updated.' },
      { type: 'lorea', text: 'LOREA: Type MENU to access the main terminal index.' }
    ]);
  };

  const handleMenuSelect = (item) => {
    if (moduleRunning) return;

    if (item.id === 'WORLD_STATE') {
      runWorldStateModule();
      return;
    }

    if (item.id === 'TIMELINE') {
      setTimelineActive(true);
      setCommandHistory((prev) => [
        ...prev,
        { type: 'user', text: '> OPEN TIMELINE' },
        { type: 'system', text: '[TIMELINE MODULE OPENING...]' },
        { type: 'timeline' }
      ]);
      return;
    }

    setTimelineActive(false);
    setCommandHistory((prev) => [
      ...prev,
      { type: 'user', text: `> OPEN ${item.title}` },
      { type: 'system', text: `[${item.title} MODULE OPENING...]` },
      { type: 'lorea', text: `LOREA: ${item.title} archive placeholder active. Begin writing this module here.` }
    ]);
  };

  const resetTerminalInput = () => {
    setUserInput('');
    setCommandHistory([]);
    setTerminalReady(false);
    setLoaderVisible(false);
    setLoaderLabel('');
    setLoaderPercent(0);
    setLoaderStatus('STANDBY');
    setLoginRunning(false);
    setModuleRunning(false);
    setTimelineActive(false);
  };

  const jumpToIntro = () => {
    setIntroIndex(0);
    setStage('intro');
    setShowMatrix(false);
    setImpossibleTyped(false);
    setBootTransition(false);
    setTypingStage(0);
    resetTerminalInput();
    setOutput(splashScreen);
  };

  const jumpToPreboot = () => {
    setIntroIndex(introLines.length);
    setStage('preboot');
    setShowMatrix(false);
    setImpossibleTyped(false);
    setBootTransition(false);
    setTypingStage(0);
    resetTerminalInput();
    setOutput(splashScreen);
  };

  const jumpToTerminal = () => {
    setIntroIndex(introLines.length);
    setStage('boot');
    setShowMatrix(false);
    setImpossibleTyped(false);
    setBootTransition(false);
    setTypingStage(3);
    resetTerminalInput();
    setOutput(splashScreen);
  };

  const renderMetricBar = (entry, index) => {
    return <AnimatedMetricBar key={index} entry={entry} />;
  };

  const renderCommandHistoryItem = (command, commandIndex) => {
    if (command.type === 'map') {
      return (
        <WorldMapPanel
          key={commandIndex}
          survivorLocation={survivorLocation}
          onSelectLocation={handleWorldMapSelect}
        />
      );
    }

    if (command.type === 'menu') {
      return (
        <MainMenuPanel
          key={commandIndex}
          onSelectMenu={handleMenuSelect}
        />
      );
    }

    if (command.type === 'timeline') {
      return (
        <TimelinePanel
          key={commandIndex}
          onSelectTimelineEntry={runTimelineEntry}
        />
      );
    }

    return (
      <p
        key={command.id || commandIndex}
        data-text={command.text}
        className={
          command.type === 'lorea'
            ? 'command-history-line lorea-command-response'
            : command.type === 'system'
              ? 'command-history-line system-command-line'
              : command.type === 'warning'
                ? 'command-history-line warning-command-line'
                : command.type === 'data'
                  ? 'command-history-line data-command-line'
                  : command.type === 'timelineLore'
                    ? 'command-history-line timeline-lore-line'
                    : command.type === 'timelineSystem'
                      ? 'command-history-line timeline-system-line'
                      : 'command-history-line user-command-line'
        }
      >
        {command.text}
      </p>
    );
  };

  return (
    <div className="app-container">
      {SHOW_DEV_CONTROLS && (
        <div className="dev-controls">
          <button onClick={jumpToIntro}>INTRO</button>
          <button onClick={jumpToPreboot}>PREBOOT</button>
          <button onClick={jumpToTerminal}>TERMINAL</button>
        </div>
      )}

{stage === 'intro' && (
  <div className={`cinematic-intro ${introEffectClass}`}>
<div className="intro-static"></div>
<div className="intro-random-scan"></div>
<div className="intro-apocalypse-layer"></div>
<div className="intro-violet-bloom"></div>
<div className="intro-hatch-glow">
  <div className="intro-hatch-door"></div>
</div>
<div className="intro-scan-wake"></div>
<div className="intro-crt-tear"></div>

    <button
      className="skip-intro-button"
      onClick={() => {
        setIntroIndex(introLines.length);
        setStage('preboot');
      }}
    >
      SKIP INTRO
    </button>

    {introIndex < introLines.length && (
      <p
        key={introIndex}
        className={`intro-text ${
          introEffectClass ? `${introEffectClass}-text` : ''
        }`}
      >
        {introLines[introIndex]}
      </p>
    )}
  </div>
)}

      {stage === 'preboot' && (
        <>
          <div className="screen-on-overlay" />
          <div className="vertical-sync" />

          <div className="no-signal-glitch">
            LOREA BOOTING FROM DEEP SLEEP
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {showMatrix && (
            <div className={`matrix-online-flash ${impossibleTyped ? 'line-flash' : ''}`}>
              LOREA CONSCIOUSNESS MATRIX ONLINE

              {typingStage >= 1 && (
                <p className="typing-line">
                  &gt;&gt; Human presence detected...
                  {typingStage === 1 && <span className="cursor">▋</span>}
                </p>
              )}

              {typingStage === 2 && (
                <p className="typing-line slower">
                  &gt;&gt; Impossible.
                  {!impossibleTyped && <span className="cursor">▋</span>}
                </p>
              )}

              {typingStage > 2 && (
                <p className="typing-line slower">&gt;&gt; Impossible.</p>
              )}
            </div>
          )}

          {bootTransition && <div className="boot-transition-glow" />}
        </>
      )}

      <div
        className={`terminal-screen ${
          stage === 'boot' ? 'thinking glow-start synced-crt-pulse' : 'hidden-terminal'
        }`}
        onDoubleClick={() => {
          if (terminalReady && inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {stage === 'boot' && (
          <>
            <div className="terminal-hud terminal-hud-right">
              <span>RADIATION: CRITICAL</span>
              <span>LOREA CORE: UNSTABLE</span>
              <span>ARCHIVE INTEGRITY: 20%</span>
              <span>UPLINK: DEAD</span>
              <span>SURFACE RELAY: NO RESPONSE</span>
            </div>

            <div className="terminal-tear-layer" />
            <div className="terminal-grid-layer" />
            <div className="terminal-signal-drift" />
            <div className="terminal-danger-flash" />
            <div className="terminal-dust-layer" />

<div className="terminal-status-bar">
  <span>AURA FIELD TERMINAL</span>
  <span>SIGNAL: NULL</span>
  <span>BIOMETRICS: PRESENT</span>
  <span>LOREA: PARTIAL</span>
</div>
          </>
        )}

        <div className="terminal-output" ref={outputRef}>
          <div className="terminal-text-column">
            {output.map((line, index) => {
              if (typeof line === 'object' && line.type === 'metricBar') {
                return renderMetricBar(line, index);
              }

              const safeLine = typeof line === 'string' ? line : '';
              const isLorea = safeLine.includes('>>');
              const isData = safeLine.includes('[DATA]');
              const isWarning = safeLine.includes('WARNING');
              const isError = safeLine.includes('ERROR');
              const isImpossible = safeLine.includes('IMPOSSIBLE');
              const isFlashing = index === flashLineIndex;

              const classNames = [
                isLorea ? 'lorea-speak glitch-text' : '',
                isData ? 'data-log-line' : '',
                isWarning ? 'warning-line' : '',
                isError ? 'error-line' : '',
                isImpossible ? 'impossible-line' : '',
                isFlashing ? 'glitch-flash' : ''
              ].join(' ');

              return (
                <p key={index} data-text={safeLine} className={classNames}>
                  {safeLine}
                  {isLorea && index === output.length - 1 && !terminalReady && (
                    <span className="cursor">▋</span>
                  )}
                </p>
              );
            })}

            {loaderVisible && (
              <div className="single-loader-block">
                <p className="single-loader-title">{loaderLabel}</p>

                <div className="single-loader-row">
                  <span className="single-loader-prefix">└─&gt; Progress:</span>

                  <div className="single-loader-bar">
                    <div
                      className="single-loader-fill"
                      style={{ width: `${loaderPercent}%` }}
                    />
                  </div>

                  <span className="single-loader-percent">{loaderPercent}%</span>
                </div>

                <p
                  className={`single-loader-status ${
                    loaderStatus === 'COMPLETE' ? 'loader-complete' : ''
                  }`}
                >
                  └─&gt; Status: {loaderStatus}
                </p>
              </div>
            )}

{terminalReady && (
  <div className="terminal-ready-prompt">
    {commandHistory.map((command, commandIndex) =>
      renderCommandHistoryItem(command, commandIndex)
    )}

{!loginRunning && !moduleRunning && (
  <span className="awaiting-input-line">
    {isMobileView ? '[TAP TO INPUT]' : '[AWAITING INPUT]'}
  </span>
)}

    <form className="terminal-input-form" onSubmit={handleTerminalSubmit}>
      <span className="terminal-prompt-symbol">&gt;</span>
      <input
        ref={inputRef}
        className="terminal-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        autoFocus
        spellCheck="false"
        autoComplete="off"
        aria-label="Terminal input"
        disabled={loginRunning || moduleRunning}
      />
    </form>
  </div>
)}
          </div>
        </div>
      </div>
      <SpeedInsights />
    </div>
  );
}

export default App;