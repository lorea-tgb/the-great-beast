const readings = [
  ['SURFACE ACCESS', 'PROHIBITED'],
  ['ATMOSPHERIC INTEGRITY', 'FAILED'],
  ['GLOBAL LIGHT LEVEL', '03%'],
  ['GROUND ZERO RADIATION', 'EXTREME'],
  ['BEAST VISIBILITY', 'INTERMITTENT'],
  ['BUNKER NETWORK', 'MOSTLY OFFLINE'],
  ['LOREA CONFIDENCE', '41%'],
];

function WorldStatePanel() {
  return (
    <div className="world-state-panel">
      <div className="world-state-header">
        <span>WORLD STATE MODULE</span>
        <span>SURFACE TELEMETRY DEGRADED</span>
      </div>

      <div className="world-state-grid">
        {readings.map(([label, value]) => (
          <div className="world-state-reading" key={label}>
            <span className="world-state-label">{label}</span>
            <span className="world-state-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="world-state-lorea">
        <p>&gt;&gt; Most of the surface instruments are gone.</p>
        <p>&gt;&gt; The ones still speaking are not telling the same story.</p>
      </div>
    </div>
  );
}

export default WorldStatePanel;
