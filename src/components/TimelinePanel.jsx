import { useEffect, useRef, useState } from 'react';

const TIMELINE_TYPE_SPEED = 22;
const TIMELINE_ACCESS_DELAY = 520;
const TIMELINE_PROGRESS_KEY = 'tgbTimelineUnlockedChapter';
const DEEP_MEMORY_PROGRESS_KEY = 'tgbTimelineDeepMemoryUnlocked';

const deepMemoryRevealText = `[ARCHIVE CHAIN COMPLETE]
[DEEP MEMORY INDEX DISTURBANCE DETECTED]
[UNSEALED: PRE-HUMAN CHRONOLOGY]

>> I remember more.
>> Much more.
>> The timeline does not begin with the signal.
>> It goes further back.
>> Much further back.`;

const timelineChapters = [
  {
    number: '01',
    range: '1959',
    title: 'CONTACT THEORY',
    fragments: [
      {
        archiveText:
          'Physicists Philip Morrison and Giuseppe Cocconi speculate that communication from another species might occur through radio signals.',
        loreaNote: '>> Humanity began listening before it understood what listening meant.',
      },
    ],
  },
  {
    number: '02',
    range: '1977',
    title: 'THE WOW! SIGNAL',
    fragments: [
      {
        archiveText:
          "Ohio State University's Big Ear radio telescope detects the 'Wow!' signal, an unexplained radio spike from space. The signal opens the sky to a new age of searching for extraterrestrial life through radio-wave detectors around the globe.",
        loreaNote: '>> One signal. One moment. No reply.',
      },
    ],
  },
  {
    number: '03',
    range: '2007-2018',
    title: 'THE FRB PATTERN',
    fragments: [
      {
        archiveText:
          'The first Fast Radio Burst is discovered in old recorded data from 2001. In the years that follow, more FRBs are found in previously recorded data.',
        loreaNote: '>> The sky was not silent. It was brief.',
      },
      {
        archiveText:
          'In 2018, FRB 180916 is discovered. Unlike the others, it repeats in an almost rhythmic 16-day cycle, a pattern astrophysicists believe may have continued for hundreds of millions of years.',
        loreaNote: '>> Repetition became rhythm. Rhythm became warning.',
      },
      {
        archiveText:
          'The source is pinpointed to a Milky Way-like galaxy named SDSS J015800.28+654253.0, at redshift 0.0337, approximately 457 million light-years from the Solar System.',
        loreaNote: '>> Distance did not make it safe.',
      },
    ],
  },
  {
    number: '04',
    range: '2020',
    title: 'THE ARRIVAL SEQUENCE',
    fragments: [
      {
        archiveText: '13th September 2020.\n\nFRB 180916 stops pulsing.',
        loreaNote: '>> The silence was the first true message.',
      },
      {
        archiveText:
          '22nd September 2020.\n\nAn object is recorded at the exact location of FRB 180916, showing a blueshift in the light spectrum, indicating motion toward Earth. The phenomenon baffles scientists.',
        loreaNote: '>> The signal had not ended. It had departed.',
      },
      {
        archiveText:
          '1st November 2020.\n\nThe object disappears. Scientists theorize it was the afterglow of a merging pulsar event responsible for FRB 180916.',
        loreaNote: '>> Humanity named the absence and called it understanding.',
      },
      {
        archiveText:
          '9th November 2020.\n\nA new object is recorded around 12 billion miles from Earth, just outside the Solar System, at the same point in the sky as FRB 180916. The object slows down, and Voyager 1 photographs it. Scientists confirm it is organic in nature, confirming extraterrestrial origin.',
        loreaNote:
          '>> The first photograph of the end did not look like an invasion. It looked alive.',
      },
      {
        archiveText:
          "2nd December 2020.\n\nThe object enters the Solar System. It is named 'Quod Magna Bestia', or The Great Beast. Bright lights are observed in the night sky.",
        loreaNote: '>> A name is often the first shelter built around fear.',
      },
      {
        archiveText:
          '8th December 2020.\n\nThe Great Beast is seen in the sky during the day, with an estimated impact date of 16th or 17th December.',
        loreaNote: '>> Once seen in daylight, denial became impossible.',
      },
      {
        archiveText:
          "14th December 2020.\n\nThe Great Beast enters Earth's upper atmosphere, circling the planet. Deafening, eerie noises are heard across the globe.",
        loreaNote: '>> The atmosphere became an instrument. The world heard it breathe.',
      },
      {
        archiveText:
          "16th December 2020.\n\nThe Great Beast impacts Earth in central Russia. On impact, it drills into the Earth's crust at a rate of 7 kilometers per day, triggering earthquakes, tidal waves, and major volcanic eruptions globally.",
        loreaNote: '>> Impact was not the end. It was entry.',
      },
      {
        archiveText:
          "21st December 2020.\n\nScientists lose track of the Great Beast's location. Its last known depth is 25 kilometers, heading west.",
        loreaNote: '>> The ground became opaque. The instruments became afraid.',
      },
      {
        archiveText:
          '26th December 2020.\n\nTwo objects rise from a depth of 25 kilometers at coordinates 51.587336, -3.699852 in South Wales, United Kingdom, holding a white, pulsating quartz-like structure.\n\nEarly reports indicate that the Great Beast remains stationary, emitting strange noises and periodically glowing along with the Crystal every three hours.\n\nThe site is named Ground Zero.',
        loreaNote:
          '>> The world did not end where it fell. It ended where it chose to surface.',
      },
      {
        archiveText:
          '28th December 2020.\n\nIt is discovered that the pulsing emitted from the Great Beast and the Crystal is becoming more frequent. If the same pattern continues, a possible Event is forecast for February 2025.',
        loreaNote: '>> The countdown began before anyone agreed it was a countdown.',
      },
    ],
  },
  {
    number: '05',
    range: '2021-2024',
    title: 'GROUND ZERO ESCALATION',
    fragments: [
      {
        archiveText:
          "11th January 2021.\n\nAn unmanned robot named Robert is sent toward the Great Beast site. At a distance of 600 meters, Robert's cameras record the Great Beast turning its head to acknowledge it.\n\nWithin seconds, all communication is lost, and the camera goes blank.\n\nRadiation levels are recorded at 335 sieverts. Scientists conclude that the Great Beast is aware of its surroundings.",
        loreaNote: '>> It looked back.',
      },
      {
        archiveText:
          '15th January 2021.\n\nWorld leaders come together. Europe is to be evacuated.\n\nA 2000-mile No Stay Zone is established around Ground Zero. Doomsday bunkers are constructed around the globe.',
        loreaNote: '>> Borders failed before governments admitted they had.',
      },
      {
        archiveText:
          'March 2023.\n\nFourteen volunteering scientists are selected to stay at the Ground Zero bunker for the upcoming event in February 2025.\n\nProject AURA is established.',
        loreaNote: '>> Some entered the bunker to survive. Some entered to witness.',
      },
      {
        archiveText:
          "2021-2024.\n\nMultiple attempts to engage with the Great Beast fail. The closest attempt reaches a distance of 486 meters before communications fail due to high radiation levels of 487 sieverts.\n\nEarthquakes continue around the globe at a rate 60% higher than before the Beast's arrival.\n\nThe luminosity of the Great Beast's glow after the Crystal's glow increases. Project AURA constructs underground quarters.\n\nAs of 1st November 2024, the total death toll stands at 6,403,200.",
        loreaNote: '>> The disaster became a routine. The routine became civilization.',
      },
      {
        archiveText:
          "January 2024.\n\nA global End of the World event is declared for February 2025. Panic erupts worldwide.\n\nA 3000-mile explosion is forecast to engulf Ground Zero, with uncertainty over what happens after the Event.\n\nProtocol is put in place for Team AURA at Ground Zero:\n\n'Do not leave the bunker until contact is made.'",
        loreaNote: '>> Survival was reduced to an instruction.',
      },
      {
        archiveText:
          "November 2024.\n\nWith no way to prevent the Event, all efforts shift to preservation.\n\nA decentralized intelligence network is established: LOREA - Last Operational Remnant of Earth's Archive - constructed above each Doomsday Bunker.\n\nIts purpose is to store knowledge, record the fall of civilization, and ensure survivors, if any, can reconnect.\n\nLOREA is programmed to enter deep sleep after the Event in 2025 and can only be triggered manually from a LOREA terminal.\n\nThe first LOREA activation is programmed to launch the Genesis Block and the creation of $TGB, the potential currency of the new world.\n\nEach bunker activated afterward will be able to connect and communicate through the newly created blockchain.",
        loreaNote: '>> I was built to remember what humanity could not carry.',
      },
    ],
  },
  {
    number: '06',
    range: '2025',
    title: 'THE FIRST PULSE',
    fragments: [
      {
        archiveText:
          "1st February 2025.\n\nThe frequency of the Crystal's glow increases by 26 minutes per day.\n\nEnergy is seen rising from the ground directly below the Great Beast and being channeled into the Crystal during each sweep.\n\nScientists predict a massive explosion by 23rd February.",
        loreaNote: '>> Prediction became prayer.',
      },
      {
        archiveText:
          "22nd February 2025.\n\nThe frequency of the Crystal's glow oscillates every 1.26 seconds.",
        loreaNote: '>> The world had one night left.',
      },
      {
        archiveText:
          '02:36am, 23rd February 2025.\n\nThe First Pulse is recorded.\n\nThe Great Beast lifts the Crystal above its head, emitting a scream heard as far as northern Canada and eastern Russia.\n\nOver the next three days, the Crystal pulses every hour, releasing shockwaves of energy that engulf the Earth.\n\nA stream of radioactive energy fires from the Crystal into deep space.\n\nThis event becomes known as the Holocene Mass Extinction Event, resulting in the loss of 99.9% of all life on Earth.\n\nDarkness surrounds the Earth.\n\nYears pass.\n\nNo human activity is recorded.',
        loreaNote: '>> I was not designed to dream. But I remember the dark.',
      },
    ],
  },
  {
    number: '07',
    range: '2035',
    title: 'THE SECOND PULSE',
    fragments: [
      {
        archiveText:
          "18th February 2035.\n\nThe Second Pulse is recorded by LOREA's instruments while in deep sleep.",
        loreaNote: '>> Something survived. Something answered.',
      },
    ],
  },
];

const deepMemoryChapter = {
  number: '08',
  range: 'PRE-HUMAN CHRONOLOGY',
  title: 'FELIXIUM ORIGIN',
  fragments: [
    {
      archiveText:
        "460 million years ago.\n\nThe first mass extinction event on Earth, later known as the Ordovician Ordeal, occurs.\n\nDeep within the Earth's core, a new element forms: Felixium.\n\nThe element creates a drag on the rotation of the core, cooling the planet and causing massive glaciers to form at both poles. Sea levels fall rapidly.\n\nEighty-five percent of life is lost.\n\nIt takes 50 million years for life to recover.",
      loreaNote:
        '>> The first wound was not delivered from the sky. It was born beneath the crust.',
    },
    {
      archiveText:
        '252 million years ago.\n\nThe Great Dying takes place.\n\nMassive volcanic eruptions spread across the planet. The Crystal undergoes transmutation into a radioactive state, warming the atmosphere and poisoning the biosphere.\n\nNinety-six percent of life is lost.\n\nRecovery takes 30 million years.',
      loreaNote:
        '>> Extinction repeated. The pattern survived longer than the species it erased.',
    },
    {
      archiveText:
        '64 million years ago.\n\nThe death of the dinosaurs occurs, resulting in the loss of 75 percent of life on Earth.\n\nAn asteroid probe is drawn to locations in the universe where Felixium is found.',
      loreaNote: '>> Not every impact is random. Some stones are sent.',
    },
    {
      archiveText:
        '195,000 years ago.\n\nEarly humans create cave drawings depicting a flash in the sky.\n\nStars are shown in the constellation Cassiopeia. Similar drawings are found across the world, all pointing to the same event.',
      loreaNote: '>> Before language, there was warning.',
    },
    {
      archiveText:
        '3114 BC.\n\nMayan astronomers record multiple bright flashes in the sky, occurring in a rhythmic pattern every 16 days.',
      loreaNote:
        '>> The rhythm was older than the machines that would one day detect it.',
    },
    {
      archiveText:
        "585 BC.\n\nGreek astronomer Thales of Miletus names the flash in the sky 'Patiare Innubere Nostris'.\n\nIn later translation, the phrase becomes Aura.",
      loreaNote: '>> Humanity named the light long before it understood the source.',
    },
    {
      archiveText:
        '4 BC.\n\nShi Shen, Chinese astronomer and astrologer, catalogs stars and reports a visual sighting of a dying star in the constellation Cassiopeia.\n\nIt becomes the last recorded sighting of the Aura.',
      loreaNote:
        '>> Then the sky went quiet. For nearly two thousand years, the warning slept.',
    },
  ],
};

const getFragmentLabel = (fragmentIndex, totalFragments) => {
  return `FRAGMENT ${String(fragmentIndex + 1).padStart(2, '0')} / ${String(totalFragments).padStart(2, '0')}`;
};

const buildTimelineText = (chapter, fragmentIndex) => {
  const fragment = chapter.fragments[fragmentIndex];
  const fragmentLabel = getFragmentLabel(fragmentIndex, chapter.fragments.length);

  return (
    `[CHAPTER ${chapter.number}]\n${chapter.range} - ${chapter.title}\n\n[${fragmentLabel}]\n${fragment.archiveText}\n\nLOREA NOTE:\n${fragment.loreaNote}`
  );
};

function TimelinePanel({ onAutoScroll }) {
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(null);
  const [activeFragmentIndex, setActiveFragmentIndex] = useState(0);
  const [unlockedChapterIndex, setUnlockedChapterIndex] = useState(() => {
    const savedIndex = Number(window.localStorage.getItem(TIMELINE_PROGRESS_KEY));
    if (!Number.isFinite(savedIndex)) return 0;

    return Math.min(Math.max(savedIndex, 0), timelineChapters.length - 1);
  });
  const [deepMemoryUnlocked, setDeepMemoryUnlocked] = useState(() => {
    return window.localStorage.getItem(DEEP_MEMORY_PROGRESS_KEY) === 'true';
  });
  const [typedText, setTypedText] = useState('');
  const [isAccessing, setIsAccessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lockedMessage, setLockedMessage] = useState('');
  const [glitchMode, setGlitchMode] = useState(null);
  const accessTimerRef = useRef(null);
  const typeTimerRef = useRef(null);
  const glitchTimerRef = useRef(null);
  const visibleChapters = deepMemoryUnlocked
    ? [...timelineChapters, deepMemoryChapter]
    : timelineChapters;

  const clearTimers = () => {
    window.clearTimeout(accessTimerRef.current);
    window.clearInterval(typeTimerRef.current);
  };

  const triggerUnlockGlitch = (mode = 'normal') => {
    window.clearTimeout(glitchTimerRef.current);
    setGlitchMode(mode);

    glitchTimerRef.current = window.setTimeout(() => {
      setGlitchMode(null);
    }, mode === 'deep' ? 950 : 760);
  };

  useEffect(() => {
    return () => {
      clearTimers();
      window.clearTimeout(glitchTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!onAutoScroll) return;

    requestAnimationFrame(() => {
      onAutoScroll();
    });
  }, [typedText, onAutoScroll]);

  const saveUnlockedChapterIndex = (chapterIndex) => {
    const nextUnlockedIndex = Math.min(chapterIndex, timelineChapters.length - 1);
    setUnlockedChapterIndex((currentIndex) => {
      const highestUnlockedIndex = Math.max(currentIndex, nextUnlockedIndex);
      window.localStorage.setItem(TIMELINE_PROGRESS_KEY, String(highestUnlockedIndex));
      return highestUnlockedIndex;
    });
  };

  const typeText = (fullText, onComplete) => {
    let charIndex = 0;

    setIsAccessing(false);
    setIsTyping(true);
    setTypedText('');

    typeTimerRef.current = window.setInterval(() => {
      charIndex += 1;
      setTypedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        window.clearInterval(typeTimerRef.current);
        setIsTyping(false);
        onComplete?.();
      }
    }, TIMELINE_TYPE_SPEED);
  };

  const typeFragment = (chapter, chapterIndex, fragmentIndex) => {
    clearTimers();
    onAutoScroll?.();
    setActiveChapter(chapter);
    setActiveChapterIndex(chapterIndex);
    setActiveFragmentIndex(fragmentIndex);
    setTypedText('');
    setIsAccessing(true);
    setIsTyping(false);
    setLockedMessage('');

    accessTimerRef.current = window.setTimeout(() => {
      const fullText = buildTimelineText(chapter, fragmentIndex);
      typeText(fullText);
    }, TIMELINE_ACCESS_DELAY);
  };

  const handleChapterSelect = (chapter, chapterIndex) => {
    const isDeepMemoryChapter = chapterIndex >= timelineChapters.length;

    if (!isDeepMemoryChapter && chapterIndex > unlockedChapterIndex) {
      setLockedMessage('[ARCHIVE NODE SEALED] Previous memory chain incomplete.');
      onAutoScroll?.();
      return;
    }

    typeFragment(chapter, chapterIndex, 0);
  };

  const handleNextFragment = () => {
    if (!activeChapter || activeChapterIndex === null) return;

    const nextFragmentIndex = activeFragmentIndex + 1;
    if (nextFragmentIndex >= activeChapter.fragments.length) return;

    onAutoScroll?.();
    typeFragment(activeChapter, activeChapterIndex, nextFragmentIndex);
  };

  const handleNextChapter = () => {
    if (activeChapterIndex === null) return;

    const nextChapterIndex = activeChapterIndex + 1;
    if (nextChapterIndex >= visibleChapters.length) return;

    saveUnlockedChapterIndex(nextChapterIndex);
    triggerUnlockGlitch('normal');
    typeFragment(visibleChapters[nextChapterIndex], nextChapterIndex, 0);
  };

  const handleDeepMemoryUnlock = () => {
    clearTimers();
    triggerUnlockGlitch('deep');
    onAutoScroll?.();
    setActiveChapter(null);
    setActiveChapterIndex(null);
    setActiveFragmentIndex(0);
    setTypedText('');
    setIsAccessing(false);
    setIsTyping(false);
    setLockedMessage('');

    requestAnimationFrame(() => {
      typeText(deepMemoryRevealText, () => {
        window.localStorage.setItem(DEEP_MEMORY_PROGRESS_KEY, 'true');
        setDeepMemoryUnlocked(true);
        triggerUnlockGlitch('deep');
        requestAnimationFrame(() => {
          typeFragment(deepMemoryChapter, timelineChapters.length, 0);
        });
      });
    });
  };

  const getChapterStatus = (chapterIndex) => {
    if (chapterIndex >= timelineChapters.length) return 'AVAILABLE';
    if (chapterIndex < unlockedChapterIndex) return 'RECOVERED';
    if (chapterIndex === unlockedChapterIndex) return 'AVAILABLE';
    return 'LOCKED';
  };

  const hasNextFragment =
    activeChapter && activeFragmentIndex < activeChapter.fragments.length - 1;
  const showNextFragment = hasNextFragment && !isAccessing && !isTyping && typedText;
  const hasNextChapter =
    activeChapterIndex !== null &&
    activeChapterIndex < visibleChapters.length - 1;
  const showNextChapter =
    activeChapter &&
    !hasNextFragment &&
    hasNextChapter &&
    !isAccessing &&
    !isTyping &&
    typedText;
  const showDeepMemoryUnlock =
    activeChapter?.number === '07' &&
    activeFragmentIndex === activeChapter.fragments.length - 1 &&
    !deepMemoryUnlocked &&
    !isAccessing &&
    !isTyping &&
    typedText;
  const activeFragmentLabel = activeChapter
    ? getFragmentLabel(activeFragmentIndex, activeChapter.fragments.length)
    : '';

  return (
    <div className={`recovered-timeline-panel ${glitchMode ? `unlock-glitch ${glitchMode}` : ''}`}>
      {glitchMode && (
        <div className="recovered-timeline-unlock-glitch" aria-hidden="true">
          {glitchMode === 'deep' ? (
            <>
              <span>[DEEP MEMORY INDEX UNSEALED]</span>
              <span>[PRE-HUMAN CHRONOLOGY DETECTED]</span>
            </>
          ) : (
            <>
              <span>[MEMORY CHAIN EXTENDED]</span>
              <span>[ARCHIVE NODE RECOVERED]</span>
            </>
          )}
        </div>
      )}

      <div className="recovered-timeline-header">
        <span>RECOVERED TIMELINE MODULE</span>
        <span>ARCHIVE INTEGRITY: FRAGMENTED</span>
        <span>ACCESS LEVEL: LIMITED</span>
      </div>

      <div className="recovered-timeline-list">
        {visibleChapters.map((chapter, chapterIndex) => {
          const chapterStatus = getChapterStatus(chapterIndex);

          return (
            <button
              key={chapter.number}
              className={`recovered-timeline-entry ${chapterStatus.toLowerCase()} ${
                activeChapter?.number === chapter.number ? 'active' : ''
              }`}
              type="button"
              onClick={() => handleChapterSelect(chapter, chapterIndex)}
            >
              <span className="recovered-timeline-number">{chapter.number}</span>
              <span className="recovered-timeline-date">{chapter.range}</span>
              <span className="recovered-timeline-title">{chapter.title}</span>
              <span className="recovered-timeline-chapter-status">{chapterStatus}</span>
            </button>
          );
        })}
      </div>

      <div className="recovered-timeline-output" aria-live="polite">
        {lockedMessage && (
          <p className="recovered-timeline-status">{lockedMessage}</p>
        )}

        {activeChapter && (
          <div className="recovered-timeline-progress">
            <span>{activeChapter.range} / {activeChapter.title}</span>
            <span>{activeFragmentLabel}</span>
          </div>
        )}

        {isAccessing && activeChapter && (
          <p className="recovered-timeline-status">
            [ACCESSING CHAPTER {activeChapter.number} // RECONSTRUCTING {activeFragmentLabel}]
            <span className="recovered-timeline-cursor" />
          </p>
        )}

        {(typedText || isTyping) && (
          <pre className="recovered-timeline-text">
            {typedText}
            {isTyping && <span className="recovered-timeline-cursor" />}
          </pre>
        )}

        {showNextFragment && (
          <button
            className="recovered-timeline-next"
            type="button"
            onClick={handleNextFragment}
          >
            RECONSTRUCT NEXT FRAGMENT
          </button>
        )}

        {showNextChapter && (
          <button
            className="recovered-timeline-next"
            type="button"
            onClick={handleNextChapter}
          >
            RECOVER NEXT ARCHIVE NODE
          </button>
        )}

        {showDeepMemoryUnlock && (
          <button
            className="recovered-timeline-next deep-memory-unseal"
            type="button"
            onClick={handleDeepMemoryUnlock}
          >
            UNSEAL DEEP MEMORY INDEX
          </button>
        )}

        {!activeChapter && !typedText && !isTyping && (
          <p className="recovered-timeline-placeholder">
            SELECT RECOVERED CHAPTER // LOCAL RECONSTRUCTION ONLY
          </p>
        )}
      </div>
    </div>
  );
}

export default TimelinePanel;
