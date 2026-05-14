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

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.75;
const ZOOM_STEP = 0.25;
const DRAG_THRESHOLD = 4;

function WorldMap({ mode = 'map', onReturn, onConfirmCheckIn }) {
  const [activeNote, setActiveNote] = useState(null);
  const [debugPoint, setDebugPoint] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(MIN_ZOOM);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const imageShellRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const dragStateRef = useRef(null);
  const suppressClickRef = useRef(false);
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

  const clampPan = (pan, zoom = zoomLevel) => {
    const shell = imageShellRef.current;
    const wrapper = imageWrapperRef.current;

    if (!shell || !wrapper || zoom <= MIN_ZOOM) {
      return { x: 0, y: 0 };
    }

    const maxX = Math.max(0, ((wrapper.offsetWidth * zoom) - shell.clientWidth) / 2);
    const maxY = Math.max(0, ((wrapper.offsetHeight * zoom) - shell.clientHeight) / 2);

    return {
      x: Math.max(-maxX, Math.min(maxX, pan.x)),
      y: Math.max(-maxY, Math.min(maxY, pan.y))
    };
  };

  const showMarkerNote = (marker) => {
    window.clearTimeout(noteTimerRef.current);
    setActiveNote(marker);
  };

  const scheduleCloseMarkerNote = () => {
    window.clearTimeout(noteTimerRef.current);
    noteTimerRef.current = window.setTimeout(() => setActiveNote(null), 160);
  };

  const handleMapDebugClick = (e) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

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

  const zoomIn = () => {
    setZoomLevel((currentZoom) =>
      {
        const nextZoom = Math.min(MAX_ZOOM, Number((currentZoom + ZOOM_STEP).toFixed(2)));
        setPanOffset((currentPan) => clampPan(currentPan, nextZoom));
        return nextZoom;
      }
    );
  };

  const zoomOut = () => {
    setZoomLevel((currentZoom) =>
      {
        const nextZoom = Math.max(MIN_ZOOM, Number((currentZoom - ZOOM_STEP).toFixed(2)));
        setPanOffset((currentPan) => clampPan(currentPan, nextZoom));
        return nextZoom;
      }
    );
  };

  const resetZoom = () => {
    setZoomLevel(MIN_ZOOM);
    setPanOffset({ x: 0, y: 0 });
  };

  // TODO: Polish pan/drag behavior, especially touch devices and marker click conflicts.
  const handlePanStart = (e) => {
    if (zoomLevel <= MIN_ZOOM || e.button !== 0) return;

    if (e.target.closest('.world-map-marker, .world-map-note')) {
      return;
    }

    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startPan: panOffset,
      dragging: false
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePanMove = (e) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    const hasMovedPastThreshold =
      Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD;

    if (!dragState.dragging && !hasMovedPastThreshold) return;

    dragState.dragging = true;
    setIsPanning(true);
    setActiveNote(null);

    setPanOffset(
      clampPan(
        {
          x: dragState.startPan.x + dx,
          y: dragState.startPan.y + dy
        },
        zoomLevel
      )
    );
  };

  const handlePanEnd = (e) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== e.pointerId) return;

    if (dragState.dragging) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    setIsPanning(false);
    dragStateRef.current = null;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section className="world-map-screen" aria-label="World map screen">
      <div className="world-map-crt-layer" />
      <div className="world-map-vignette" />

      <header className="world-map-screen-header">
        <span>[WORLD MAP]</span>
        <span>AURA SURFACE MEMORY // PARTIAL</span>
      </header>

      <div
        ref={imageShellRef}
        className={`world-map-image-shell ${zoomLevel > MIN_ZOOM ? 'is-pan-enabled' : ''} ${isPanning ? 'is-panning' : ''}`}
        onPointerDown={handlePanStart}
        onPointerMove={handlePanMove}
        onPointerUp={handlePanEnd}
        onPointerCancel={handlePanEnd}
      >
        <div
          ref={imageWrapperRef}
          className="map-image-wrapper world-map-image-wrapper"
          onClick={handleMapDebugClick}
          style={{
            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`
          }}
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
                  onPointerDown={(e) => e.stopPropagation()}
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

      <div className="world-map-controls" aria-label="World map controls">
        <button
          className="world-map-control-button"
          type="button"
          onClick={zoomIn}
          disabled={zoomLevel >= MAX_ZOOM}
        >
          ZOOM +
        </button>
        <button
          className="world-map-control-button"
          type="button"
          onClick={zoomOut}
          disabled={zoomLevel <= MIN_ZOOM}
        >
          ZOOM -
        </button>
        <button
          className="world-map-control-button"
          type="button"
          onClick={resetZoom}
          disabled={zoomLevel === MIN_ZOOM}
        >
          RESET
        </button>
        <span className="world-map-zoom-readout">{Math.round(zoomLevel * 100)}%</span>
        <button className="world-map-return-button" type="button" onClick={onReturn}>
          RETURN TO TERMINAL
        </button>
      </div>
    </section>
  );
}

export default WorldMap;
