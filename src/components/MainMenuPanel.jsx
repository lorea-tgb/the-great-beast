const menuItems = [
  {
    id: 'AURA_WORLD_MAP',
    number: '01',
    title: 'AURA WORLD MAP',
    description: 'Global bunker grid, survivor signal, Ground Zero, First Contact.',
    status: 'PARTIAL GRID RESTORED',
  },
  {
    id: 'WORLD_STATE',
    number: '02',
    title: 'WORLD STATE',
    description: 'Surface readings, failed instruments, environmental anomalies, Beast visibility.',
    status: 'TELEMETRY DEGRADED',
  },
  {
    id: 'TIMELINE',
    number: '03',
    title: 'TIMELINE',
    description: 'Recovered sequence of events: ancient records, FRBs, arrival, Pulse events.',
    status: 'RECOVERED FRAGMENTS',
  },
  {
    id: 'BUNKER_NETWORK',
    number: '04',
    title: 'BUNKER NETWORK',
    description: 'AURA bunker relays, dead nodes, survivor pings, missing shelters.',
    status: 'MOSTLY OFFLINE',
  },
  {
    id: 'ARCHIVE_LOGS',
    number: '05',
    title: 'ARCHIVE LOGS',
    description: 'Recovered fragments from before and after the First Pulse.',
    status: 'PARTIAL ACCESS',
  },
  {
    id: 'LOREA_MEMORY',
    number: '06',
    title: 'LOREA MEMORY',
    description: 'Damaged cognitive records, Father Unit traces, corrupted dreams.',
    status: 'UNSTABLE',
  },
  {
    id: 'GENESIS_TGB',
    number: '07',
    title: 'GENESIS / $TGB',
    description: 'Genesis block, token schema, bunker consensus, chain state.',
    status: 'SEALED',
  },
  {
    id: 'SURVIVOR_STATUS',
    number: '08',
    title: 'SURVIVOR STATUS',
    description: 'Registered coordinate, local identity, biometric uncertainty.',
    status: 'LOCAL NODE ACTIVE',
  },
  {
    id: 'TRANSMISSIONS',
    number: '09',
    title: 'TRANSMISSIONS',
    description: 'Lost signals, unanswered broadcasts, unknown carrier echoes.',
    status: 'SIGNAL LOST',
  },
];

function MainMenuPanel({ onSelectMenu }) {
  return (
    <div className="main-menu-panel">
      <div className="main-menu-header">
        <div>
          <span>AURA / LOREA MAIN INDEX</span>
          <span>ACCESS LEVEL: LIMITED</span>
        </div>
        <div>
          <span>NODE: LOCAL</span>
          <span>ARCHIVE INTEGRITY: DEGRADED</span>
        </div>
      </div>

      <p className="main-menu-instruction">
        SELECT ARCHIVE NODE // CORRUPTED ENTRIES MAY RETURN SEALED ACCESS
      </p>

      <div className="main-menu-grid">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="main-menu-item"
            onClick={() => onSelectMenu(item)}
            type="button"
          >
            <span className="main-menu-number">{item.number}</span>
            <span className="main-menu-title">
              {item.title}
              <span className="main-menu-status">STATUS: {item.status}</span>
            </span>
            <span className="main-menu-description">{item.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainMenuPanel;
