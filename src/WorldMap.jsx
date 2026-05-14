import { useRef, useState } from 'react';
import './WorldMap.css';

const mapMarkers = [
  {
    id: 'ground-zero',
    label: 'GROUND ZERO',
    x: 47.99,
    y: 28.42,
    title: 'GROUND ZERO // WALES / UK',
    text: 'The first confirmed ground resonance was logged beneath the old Welsh relay line. LOREA marks the region as origin-adjacent, but the archive refuses to call it impact.'
  },
  {
    id: 'first-contact',
    label: 'FIRST CONTACT',
    x: 63.70,
    y: 21.97,
    title: 'FIRST CONTACT // EASTERN VECTOR',
    text: 'The earliest structured reply crossed the dead AURA band from the eastern corridor. It was not a transmission. It was an answer sent before the question finished.'
  }
];

const innerMapBounds = {
  x: (257 / 1448) * 100,
  y: (203 / 1086) * 100,
  width: (946 / 1448) * 100,
  height: (575 / 1086) * 100
};

const projectCoreMapPoint = (point) => ({
  x: innerMapBounds.x + (point.x * innerMapBounds.width) / 100,
  y: innerMapBounds.y + (point.y * innerMapBounds.height) / 100
});

function WorldMap({ mode = 'map', onReturn, onConfirmCheckIn }) {
  const [activeNote, setActiveNote] = useState(null);
  const [debugPoint, setDebugPoint] = useState(null);
  const debugTimerRef = useRef(null);
  const noteTimerRef = useRef(null);
  const [survivorSignal] = useState(() => {
    try {
      const savedLocation = localStorage.getItem('tgbUserLocation');
      return savedLocation ? JSON.parse(savedLocation) : null;
    } catch {
      return null;
    }
  });
  const isLoginMode = mode === 'login';

  const showMarkerNote = (marker) => {
    window.clearTimeout(noteTimerRef.current);
    setActiveNote(marker);
  };

  const scheduleCloseMarkerNote = () => {
    window.clearTimeout(noteTimerRef.current);
    noteTimerRef.current = window.setTimeout(() => setActiveNote(null), 160);
  };

  const handleMapDebugClick = (e) => {
    if (!e.shiftKey) {
      setActiveNote(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const fullX = ((e.clientX - rect.left) / rect.width) * 100;
    const fullY = ((e.clientY - rect.top) / rect.height) * 100;
    const coreX = ((fullX - innerMapBounds.x) / innerMapBounds.width) * 100;
    const coreY = ((fullY - innerMapBounds.y) / innerMapBounds.height) * 100;
    const isInsideCoreMap = coreX >= 0 && coreX <= 100 && coreY >= 0 && coreY <= 100;
    const message = isInsideCoreMap
      ? `CORE MAP X:${coreX.toFixed(2)} Y:${coreY.toFixed(2)}`
      : `OUTSIDE CORE MAP // FULL IMAGE X:${fullX.toFixed(2)} Y:${fullY.toFixed(2)}`;

    setDebugPoint(message);
    console.log(`[WORLD MAP DEBUG] ${message}`);

    if (isInsideCoreMap && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(`x: ${coreX.toFixed(2)}, y: ${coreY.toFixed(2)}`).catch(() => {});
    }

    window.clearTimeout(debugTimerRef.current);
    debugTimerRef.current = window.setTimeout(() => setDebugPoint(null), 2600);
  };

  return (
    <section className="world-map-screen" aria-label="World map screen">
      <div className="world-map-crt-layer" />
      <div className="world-map-vignette" />

      <header className="world-map-screen-header">
        <span>[WORLD MAP]</span>
        <span>AURA SURFACE MEMORY // PARTIAL</span>
      </header>

      <div className="world-map-image-shell">
        <div
          className="map-image-wrapper world-map-image-wrapper"
          onClick={handleMapDebugClick}
        >
          <img
            className="map-image"
            src="/images/main-aura-map.png"
            alt=""
            aria-hidden="true"
          />

          <div className="map-coordinate-layer world-map-marker-layer">
            {mapMarkers.map((marker) => {
              const projectedMarker = projectCoreMapPoint(marker);

              return (
                <button
                  key={marker.id}
                  className={`world-map-marker world-map-marker-${marker.id} ${activeNote?.id === marker.id ? 'is-active' : ''}`}
                  style={{ left: `${projectedMarker.x}%`, top: `${projectedMarker.y}%` }}
                  type="button"
                  onMouseEnter={() => showMarkerNote(marker)}
                  onMouseLeave={scheduleCloseMarkerNote}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveNote((current) => current?.id === marker.id ? null : marker);
                  }}
                  aria-label={marker.label}
                >
                  <span className="world-map-marker-core" />
                  <span className="world-map-marker-label">{marker.label}</span>
                </button>
              );
            })}

            {survivorSignal && (
              <div
                className="world-map-survivor-signal"
                style={{
                  left: `${projectCoreMapPoint(survivorSignal).x}%`,
                  top: `${projectCoreMapPoint(survivorSignal).y}%`
                }}
                aria-label="SURVIVOR SIGNAL"
              >
                <span className="world-map-survivor-core" />
                <span className="world-map-survivor-label">SURVIVOR SIGNAL</span>
              </div>
            )}

            {activeNote && (
              <aside
                className={`world-map-note world-map-note-${activeNote.id}`}
                style={{
                  left: `${projectCoreMapPoint(activeNote).x}%`,
                  top: `${projectCoreMapPoint(activeNote).y}%`
                }}
                onMouseEnter={() => window.clearTimeout(noteTimerRef.current)}
                onMouseLeave={scheduleCloseMarkerNote}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="world-map-note-kicker">LOREA FIELD NOTE</p>
                <h2>{activeNote.title}</h2>
                <p>{activeNote.text}</p>
              </aside>
            )}
          </div>
        </div>
      </div>

      {debugPoint && (
        <div className="world-map-debug-readout">
          {debugPoint}
        </div>
      )}

      {isLoginMode ? (
        <aside className="world-map-login-panel">
          <p className="world-map-popup-kicker">AURA TERMINAL HANDSHAKE</p>
          <h2>MANUAL SURVIVOR CHECK-IN REQUIRED</h2>
          <p>AURA biometric systems are offline.</p>
          <p>Select CONFIRM CHECK-IN to register this terminal as active.</p>
          <button
            className="world-map-confirm-button"
            type="button"
            onClick={onConfirmCheckIn}
          >
            CONFIRM CHECK-IN
          </button>
        </aside>
      ) : null}

      <button className="world-map-return-button" type="button" onClick={onReturn}>
        RETURN TO TERMINAL
      </button>
    </section>
  );
}

export default WorldMap;
