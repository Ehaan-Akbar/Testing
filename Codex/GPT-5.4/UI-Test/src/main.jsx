import React from "react";
import { createRoot } from "react-dom/client";
import {
  AlignJustify,
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CircleDot,
  CreditCard,
  Ellipsis,
  Expand,
  GraduationCap,
  Home,
  Landmark,
  LockKeyhole,
  LogOut,
  Moon,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
  Send,
  Settings2,
  ShoppingBag,
  Smartphone,
  Star,
  Target,
  WalletCards,
  Wifi,
} from "lucide-react";
import "./styles.css";

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Payment", icon: Target },
  { label: "Analytics", icon: BarChart3 },
  { label: "Education", icon: GraduationCap },
];

const friends = [
  { name: "Albert Flores", followers: "438 followers", action: "Follow", tone: "blue" },
  { name: "Fiverr", followers: "1.49K followers", action: "Pending", tone: "green" },
  { name: "Bank of America Ln.", followers: "895 followers", action: "Follow", tone: "violet" },
  { name: "Esther Howard", followers: "048 followers", action: "Unfollow", tone: "white" },
];

const transferItems = [
  { label: "Linking", icon: Landmark, active: true },
  { label: "Fund Transfer", icon: BriefcaseBusiness, active: true },
  { label: "Message Center", icon: Smartphone, active: true },
];

function App() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white antialiased">
      <section className="dashboard-shell" aria-label="Finance dashboard recreation">
        <div className="dashboard-frame">
          <TopNav />
          <div className="grid-area">
            <AnalyticsCard />
            <TransferCard />
            <QuickActions />
            <SecurityCodeCard />
            <SocialFriendsCard />
            <SecurityCard />
            <WalletCard />
            <ProgramsCard />
          </div>
        </div>
      </section>
    </main>
  );
}

function TopNav() {
  return (
    <header className="top-nav">
      <nav className="nav-pill" aria-label="Primary">
        {navItems.map(({ label, icon: Icon, active }) => (
          <a className={`nav-item ${active ? "active" : ""}`} href="#" key={label}>
            <Icon size={12} strokeWidth={1.55} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <button className="round-control" aria-label="Expand dashboard">
        <Expand size={12} />
      </button>
      <div className="top-spacer" />
      <button className="theme-switch" aria-label="Toggle theme">
        <span />
        <Moon size={11} />
      </button>
      <div className="profile-chip">
        <div className="avatar" />
        <span>+Pro</span>
        <CircleDot size={11} />
      </div>
      <button className="round-control" aria-label="Notifications">
        <Bell size={12} />
      </button>
      <button className="logout">
        <LogOut size={12} />
        <span>Logout</span>
      </button>
    </header>
  );
}

function AnalyticsCard() {
  return (
    <section className="card analytics-card">
      <div className="analytics-copy">
        <span className="sparkle">
          <Star size={11} fill="currentColor" />
        </span>
        <h2>Analytics</h2>
        <p>Today</p>
        <strong>+ 0.9%</strong>
      </div>
      <div className="chart-wrap" aria-hidden="true">
        <svg viewBox="0 0 310 100" preserveAspectRatio="none">
          <g stroke="rgba(255,255,255,.08)" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 28} y1="0" x2={i * 28} y2="100" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 24} x2="310" y2={i * 24} />
            ))}
          </g>
          <polyline className="line purple" points="0,6 12,18 38,22 62,28 76,50 90,54 110,30 126,28 138,42 152,32 168,36 184,55 205,62 220,72 235,92 248,78 262,91 276,84 292,86 310,70" />
          <polyline className="line green" points="0,86 24,83 42,84 58,82 68,88 82,86 96,76 110,78 126,72 142,82 154,78 168,20 184,26 198,38 212,44 228,60" />
          <polyline className="line gold" points="184,30 200,30 216,44 232,56 250,58 266,58 284,56 300,49 310,42" />
        </svg>
      </div>
    </section>
  );
}

function TransferCard() {
  return (
    <section className="card transfer-card">
      <div className="transfer-top">
        <SelectPill label="Eco" />
        <SelectPill label="Schedule" />
        <Wifi size={14} />
      </div>
      <LabeledField label="Account Name" value="Brayan Flores (Mr.)" />
      <LabeledField label="Account Number" value="**** 9308 7374 5800" />
      <div className="transfer-row">
        <LabeledField label="Expires On" value="28 / 2024" compact />
        <LabeledField label="CVV" value="*48" compact />
        <LabeledField label="Wallet Type" value="Pay" compact icon />
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <div className="quick-actions">
      <button className="send-button">
        <Send size={13} />
        <span>Send</span>
      </button>
      <button className="menu-button" aria-label="More actions">
        <Ellipsis size={17} />
      </button>
    </div>
  );
}

function SecurityCodeCard() {
  return (
    <section className="card code-card">
      <div className="code-toolbar">
        <button className="tiny-button">
          <Settings2 size={10} />
          <span>Preference</span>
        </button>
        <label className="search-box">
          <span>Search</span>
          <Search size={15} />
        </label>
        <button className="tiny-round" aria-label="Add">
          <Plus size={13} />
        </button>
      </div>
      <div className="orb-panel" aria-hidden="true">
        <span className="core one" />
        <span className="core two" />
        <span className="core three" />
        <span className="dot d1" />
        <span className="dot d2" />
        <span className="dot d3" />
      </div>
      <div className="network-toggle">
        <span>Instant (EFTN)</span>
        <i />
        <span>Standard (BEFTN)</span>
      </div>
      <p className="security-note">Your Security Transection Code Sent to ******3300<br />Please Enter the OTP for Every Payments.</p>
      <span className="secret-label">Secret Code</span>
      <div className="code-input">
        <span>2 5 4 A 6</span>
        <AlignJustify size={12} />
      </div>
      <button className="expand-small" aria-label="Expand code panel">
        <Expand size={13} />
      </button>
      <div className="loading-dots" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
      </div>
    </section>
  );
}

function SocialFriendsCard() {
  return (
    <section className="card social-card">
      <div className="card-title-row">
        <h3>02: Social Friends</h3>
        <MoreHorizontal size={13} />
      </div>
      <div className="friend-list">
        {friends.map((friend, index) => (
          <article className="friend-row" key={friend.name}>
            <div className={`mini-avatar ${friend.tone}`}>{initials(friend.name)}</div>
            <div>
              <h4>{friend.name}</h4>
              <p>{friend.followers}</p>
            </div>
            <button>{friend.action}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function SecurityCard() {
  return (
    <section className="card security-card">
      <div className="card-title-row">
        <h3>Security</h3>
        <MoreHorizontal size={13} />
      </div>
      <p>Please enter the OTP to<br />Make Payment.</p>
      <div className="lock-orbit">
        <div className="lock-inner">
          <LockKeyhole size={23} />
          <span>***</span>
        </div>
        <Radio size={14} className="orbit-radio" />
      </div>
    </section>
  );
}

function WalletCard() {
  return (
    <section className="card wallet-card">
      <div className="wallet-top">
        <button className="wallet-chip">
          <WalletCards size={11} />
          <span>Wallet</span>
        </button>
        <button className="tiny-round" aria-label="Wallet settings">
          <CircleDot size={11} />
        </button>
      </div>
      <div className="wallet-options">
        <span><ShoppingBag size={13} />Recent</span>
        <span><Target size={13} />Edit</span>
      </div>
      <p>Balance</p>
      <strong>$24.937.00</strong>
      <div className="wallet-transfer">
        <span>Transfer</span>
        <div>
          <button><ShoppingBag size={13} /></button>
          <button><Landmark size={13} /></button>
          <button><CreditCard size={13} /></button>
          <button><BriefcaseBusiness size={13} /></button>
        </div>
      </div>
    </section>
  );
}

function ProgramsCard() {
  return (
    <section className="card programs-card">
      <div className="card-title-row">
        <h3>Programs</h3>
        <MoreHorizontal size={13} />
      </div>
      <div className="program-grid">
        <ProgramItem icon={<Home size={21} />} label="Partners" />
        <ProgramItem icon={<Smartphone size={21} />} label="Message Center" active />
        <ProgramItem icon={<Landmark size={21} />} label="Linking" active />
        <ProgramItem icon={<BriefcaseBusiness size={21} />} label="Fund Transfer" active />
      </div>
      <button className="view-more">View More <ArrowRight size={13} /></button>
    </section>
  );
}

function ProgramItem({ icon, label, active }) {
  return (
    <button className={`program-item ${active ? "accent" : ""}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SelectPill({ label }) {
  return (
    <button className="select-pill">
      <span>{label}</span>
      <span className="chevron">⌄</span>
    </button>
  );
}

function LabeledField({ label, value, compact, icon }) {
  return (
    <label className={`field ${compact ? "compact" : ""}`}>
      <span>{label}</span>
      <strong>{icon && <Star size={9} fill="currentColor" />} {value}</strong>
    </label>
  );
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

createRoot(document.getElementById("root")).render(<App />);
