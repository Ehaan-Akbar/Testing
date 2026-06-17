const friends = [
  ["Albert Flores", "438 Followers", "Follow"],
  ["Fiver", "1,49K Followers", "Pending"],
  ["Bank of America Ltd.", "895 Followers", "Follow"],
  ["Esther Howard", "048 Followers", "Unfollow"],
];

function Icon({ name }) {
  const paths = {
    home: "M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z",
    diamond: "M12 3l8 9-8 9-8-9z",
    chart: "M4 19h16M7 16v-5m5 5V7m5 9v-8",
    search: "M11 19a8 8 0 1 1 5.66-2.34L21 21",
    plus: "M12 5v14M5 12h14",
    dots: "M6 12h.01M12 12h.01M18 12h.01",
    bell: "M18 16H6l1.5-2.5V10a4.5 4.5 0 0 1 9 0v3.5zM10 19h4",
    wallet: "M4 7h16v11H4zM16 12h4M4 7l3-3h10l3 3",
    bank: "M4 10h16L12 5zM6 10v8m4-8v8m4-8v8m4-8v8M4 18h16",
    gift: "M4 10h16v10H4zM12 10v10M4 14h16M8.5 6C6 5 6 9 10 10m5.5-4c2.5-1 2.5 3-1.5 4",
    lock: "M7 11h10v9H7zM9 11V8a3 3 0 0 1 6 0v3",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    arrow: "M5 12h14m-5-5 5 5-5 5",
    expand: "M8 4H4v4M16 4h4v4M8 20H4v-4M20 16v4h-4",
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      <path d={paths[name]} />
    </svg>
  );
}

function TopNav() {
  return (
    <header className="topbar">
      <nav className="nav-pills" aria-label="Primary">
        {["Home", "Payment", "Analytics", "Education"].map((item, index) => (
          <button className={`nav-pill ${index === 0 ? "active" : ""}`} key={item}>
            <Icon name={index === 0 ? "home" : index === 2 ? "chart" : "diamond"} />
            {item}
          </button>
        ))}
      </nav>
      <button className="round-btn" aria-label="Fullscreen">
        <Icon name="expand" />
      </button>
      <div className="top-actions">
        <span className="tiny-toggle" aria-hidden="true" />
        <div className="avatar" aria-label="Profile" />
        <button className="pro-btn">+ Pro <span>i</span></button>
        <button className="round-btn" aria-label="Notifications">
          <Icon name="bell" />
        </button>
        <button className="logout-btn">
          <Icon name="diamond" /> Logout
        </button>
      </div>
    </header>
  );
}

function AnalyticsCard() {
  const series = [
    "M5 25 C18 35 37 30 47 43 S65 54 78 34 91 32 105 44 115 35 126 42 138 61 151 58 162 70 172 58",
    "M5 72 C22 70 33 67 45 72 S59 69 68 72 78 63 87 75 99 68 108 67 118 29 134 34 145 51 159 58 172 47",
    "M5 32 C26 43 47 37 57 41 S72 65 82 46 92 32 103 45 114 28 122 45 132 31 145 55 160 70 170 64",
  ];

  return (
    <section className="panel analytics-panel" aria-label="Analytics summary">
      <div className="analytics-copy">
        <span className="spark">✦</span>
        <span className="small-dots">⌃⌄</span>
        <strong>Analytics</strong>
        <span>Today</span>
        <em>+ 0.90%</em>
      </div>
      <div className="chart">
        <div className="grid" />
        <svg viewBox="0 0 180 92" preserveAspectRatio="none">
          <path className="line purple" d={series[0]} />
          <path className="line green" d={series[1]} />
          <path className="line violet" d={series[2]} />
        </svg>
      </div>
    </section>
  );
}

function OrbCard() {
  return (
    <section className="panel auth-panel" aria-label="Security transaction code">
      <div className="card-tools">
        <button className="chip">Preference</button>
        <label className="search-box">
          <span>Search</span>
          <Icon name="search" />
        </label>
        <button className="round-btn sm" aria-label="Add">
          <Icon name="plus" />
        </button>
      </div>
      <div className="orb-wrap" aria-hidden="true">
        <div className="orb aura" />
        <div className="orb pink" />
        <div className="orb orange" />
        <div className="orb blue" />
        <div className="orb teal" />
        <span className="pin p1" />
        <span className="pin p2" />
        <span className="pin p3" />
        <span className="pin p4" />
      </div>
      <div className="transfer-mode">
        <span>Instant (EFTN)</span>
        <span className="toggle" />
        <span>Standard (BEFTN)</span>
      </div>
      <p>Your Security Transaction Code Sent to ********3300<br />Please Enter the OTP for Every Payments.</p>
      <strong>Secret Code</strong>
      <div className="code-input">
        <Icon name="lock" />
        <span>2&nbsp; 5&nbsp; 4&nbsp; 8&nbsp; 6</span>
        <span>⌄</span>
      </div>
      <button className="round-btn corner left" aria-label="Expand">
        <Icon name="expand" />
      </button>
      <button className="dot-ring corner right" aria-label="More options">
        <span />
      </button>
    </section>
  );
}

function TransferPanel() {
  return (
    <section className="panel transfer-panel" aria-label="Payment transfer">
      <div className="transfer-head">
        <button className="select">Eco <span>⌄</span></button>
        <button className="select">Schedule <span>⌄</span></button>
        <span className="waves">)))</span>
      </div>
      <Field label="Account Name" value="Brayan Flores (Mr.)" />
      <Field label="Account Number" value="**** 9308 7374 5800" />
      <div className="field-row">
        <Field label="Expires On" value="28 / 2024" compact />
        <Field label="CVV" value="*68" compact />
        <Field label="Wallet Type" value=" Pay" compact />
      </div>
    </section>
  );
}

function Field({ label, value, compact }) {
  return (
    <label className={`field ${compact ? "compact" : ""}`}>
      <span>{label}</span>
      <div>{value}<small>⌄</small></div>
    </label>
  );
}

function FriendsPanel() {
  return (
    <section className="panel friends-panel">
      <div className="panel-title">
        <span>02 : Social Friends</span>
        <Icon name="dots" />
      </div>
      {friends.map((friend, index) => (
        <div className="friend" key={friend[0]}>
          <div className={`face f${index + 1}`} />
          <div>
            <strong>{friend[0]}</strong>
            <span>{friend[1]}</span>
          </div>
          <button>{friend[2]}</button>
        </div>
      ))}
    </section>
  );
}

function SecurityPanel() {
  return (
    <section className="panel security-panel">
      <div className="panel-title">
        <span>Security</span>
        <Icon name="dots" />
      </div>
      <p>Please enter the OTP to<br />Make Payment.</p>
      <div className="lock-ring">
        <Icon name="lock" />
        <span>•••</span>
      </div>
    </section>
  );
}

function WalletPanel() {
  return (
    <section className="panel wallet-panel">
      <div className="panel-title wallet-title">
        <button><Icon name="wallet" /> Wallet</button>
        <button className="round-btn sm">⊙</button>
      </div>
      <div className="wallet-shortcuts">
        <span><Icon name="diamond" />Recent</span>
        <span><Icon name="chart" />Exit</span>
      </div>
      <span className="muted-label">Balance <small>⌄</small></span>
      <strong className="balance">$24.937.00</strong>
      <div className="transfer-strip">
        <small>Transfer</small>
        <div>
          <Icon name="diamond" /><Icon name="bank" /><Icon name="chart" /><Icon name="gift" />
        </div>
      </div>
    </section>
  );
}

function ProgramsPanel() {
  const items = [
    ["Partners", "user"],
    ["Message Cent", "bell"],
    ["Banking", "bank"],
    ["Fund Transfer", "expand"],
  ];
  return (
    <section className="panel programs-panel">
      <div className="panel-title">
        <span>Programs</span>
        <Icon name="dots" />
      </div>
      <div className="program-grid">
        {items.map(([label, icon], index) => (
          <button className={index === 0 ? "selected" : ""} key={label}>
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button className="view-more">View More <Icon name="arrow" /></button>
    </section>
  );
}

function App() {
  return (
    <main className="dashboard-shell">
      <TopNav />
      <div className="dashboard-grid">
        <div className="left-column">
          <AnalyticsCard />
          <OrbCard />
        </div>
        <div className="center-column">
          <TransferPanel />
          <div className="lower-center">
            <FriendsPanel />
            <SecurityPanel />
          </div>
        </div>
        <aside className="right-column">
          <div className="action-row">
            <button className="send-btn"><Icon name="wallet" /> Send</button>
            <button className="ellipsis"><Icon name="dots" /></button>
          </div>
          <WalletPanel />
          <ProgramsPanel />
        </aside>
      </div>
    </main>
  );
}

export default App;
