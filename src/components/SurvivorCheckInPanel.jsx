import { useState } from 'react';

function SurvivorCheckInPanel({ onConfirmCheckIn }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [warningVisible, setWarningVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleMapClick = (e) => {
    if (confirmed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setSelectedLocation({
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      savedAt: new Date().toISOString()
    });
    setWarningVisible(false);
  };

  const handleConfirm = () => {
    if (!selectedLocation) {
      setWarningVisible(true);
      return;
    }

    setConfirmed(true);
    onConfirmCheckIn(selectedLocation);
  };

  return (
    <div className="survivor-checkin-panel">
      <div className="survivor-checkin-header">
        <span>MANUAL SURVIVOR CHECK-IN REQUIRED</span>
        <span>AURA NODE: LOCAL</span>
      </div>

      <p className="survivor-checkin-text">
        AURA biometric systems are offline. Select your last known surface region.
      </p>

      <div
        className="map-image-wrapper survivor-checkin-map"
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
        aria-label="Select last known surface region"
      >
        <img
          className="map-image"
          src="/images/aura-map-core.png"
          alt=""
          aria-hidden="true"
        />

        <div className="map-scanline" />

        <div className="map-coordinate-layer">
          {selectedLocation && (
            <div
              className="survivor-map-marker"
              style={{
                left: `${selectedLocation.x}%`,
                top: `${selectedLocation.y}%`
              }}
            >
              <span />
            </div>
          )}
        </div>
      </div>

      {selectedLocation ? (
        <p className="survivor-checkin-coordinates">
          SELECTED // X:{selectedLocation.x.toFixed(2)} Y:{selectedLocation.y.toFixed(2)}
        </p>
      ) : (
        <p className="survivor-checkin-coordinates pending">NO SURFACE REGION SELECTED</p>
      )}

      {warningVisible && (
        <p className="survivor-checkin-warning">[LOCATION REQUIRED]</p>
      )}

      <button
        className="survivor-checkin-confirm"
        type="button"
        onClick={handleConfirm}
        disabled={confirmed}
      >
        CONFIRM CHECK-IN
      </button>
    </div>
  );
}

export default SurvivorCheckInPanel;
