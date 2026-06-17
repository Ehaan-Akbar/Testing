import React from "react";

/**
 * Dark fintech dashboard — self-contained React + Tailwind component.
 * Drop into a Tailwind-enabled React app. Requires Tailwind ≥3.
 */

const card =
  "rounded-2xl bg-[#141318] border border-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]";

const subtle = "text-white/50";

/* ---------- Icons (inline SVG, stroke-based) ---------- */
const Icon = ({ d, size = 16, className = "", fill = "none", strokeWidth = 1.6 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {d}
  </svg>
);

const I = {
  home: <Icon d={<path d="M3 11 12 4l9 7v8a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />} />,
  card: <Icon d={<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></>} />,
  chart: <Icon d={<><path d="M4 19V5" /><path d="M20 19H4" /><path d="M7 15l3-4 3 2 4-6" /></>} />,
  cap: <Icon d={<><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v4c3 2 9 2 12 0v-4" /></>} />,
  maximize: <Icon d={<><path d="M4 9V4h5" /><path d="M20 9V4h-5" /><path d="M4 15v5h5" /><path d="M20 15v5h-5" /></>} />,
  bell: <Icon d={<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></>} />,
  logout: <Icon d={<><path d="M15 17l5-5-5-5" /><path d="M20 12H9" /><path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" /></>} />,
  plus: <Icon d={<><path d="M12 5v14" /><path d="M5 12h14" /></>} />,
  search: <Icon d={<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>} />,
  chevron: <Icon d={<path d="m6 9 6 6 6-6" />} />,
  dots: <Icon d={<><circle cx="5" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="19" cy="12" r="1.4" fill="currentColor" /></>} fill="currentColor" />,
  send: <Icon d={<path d="M22 2 11 13" />} />,
  arrowSend: <Icon d={<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></>} />,
  wallet: <Icon d={<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 13h2" /></>} />,
  clock: <Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />,
  edit: <Icon d={<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4z" /></>} />,
  transfer: <Icon d={<><path d="M7 4v16" /><path d="m3 8 4-4 4 4" /><path d="M17 20V4" /><path d="m21 16-4 4-4-4" /></>} />,
  download: <Icon d={<><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>} />,
  grid: <Icon d={<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>} />,
  lock: <Icon d={<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>} />,
  apple: <Icon d={<path d="M16.5 12.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.5 3 2.5 1.2 0 1.7-.8 3.1-.8s1.9.8 3.1.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-4z" />} fill="currentColor" />,
  food: <Icon d={<><path d="M3 11h18" /><path d="M5 11a7 7 0 0 1 14 0" /><path d="M2 16h20" /><path d="M4 19h16" /></>} />,
};

/* ---------- Small primitives ---------- */
const IconBtn = ({ children, className = "", size = "md" }) => (
  <button
    className={`grid place-items-center rounded-full bg-white/5 hover:bg-white/10 transition text-white/80 ${
      size === "sm" ? "h-8 w-8" : "h-10 w-10"
    } ${className}`}
  >
    {children}
  </button>
);

const Tab = ({ icon, label, active }) => (
  <button
    className={`flex items-center gap-2 rounded-full px-4 h-9 text-sm transition ${
      active ? "bg-white text-black" : "text-white/70 hover:text-white"
    }`}
  >
    <span className="opacity-90">{icon}</span>
    <span>{label}</span>
  </button>
);

const Avatar = ({ src, ring = false, className = "" }) => (
  <div
    className={`h-9 w-9 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 overflow-hidden ${
      ring ? "ring-2 ring-violet-400/70" : ""
    } ${className}`}
    style={
      src
        ? { background: `center/cover url(${src})` }
        : undefined
    }
  />
);

/* ---------- Top bar ---------- */
const TopBar = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className={`${card} flex items-center gap-1 px-1.5 py-1.5`}>
        <Tab icon={I.home} label="Home" active />
        <Tab icon={I.card} label="Payment" />
        <Tab icon={I.chart} label="Analytics" />
        <Tab icon={I.cap} label="Education" />
      </div>
      <IconBtn>{I.maximize}</IconBtn>
    </div>

    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar ring />
        <span className="absolute -top-1 -right-1 rounded-full bg-violet-500 text-[10px] px-1.5 py-0.5 font-medium">
          Pro
        </span>
      </div>
      <IconBtn>{I.bell}</IconBtn>
      <button className="flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 h-10 px-4 text-sm text-white/80">
        {I.logout} Logout
      </button>
    </div>
  </div>
);

/* ---------- Analytics card w/ chart ---------- */
const AnalyticsChart = () => (
  <svg viewBox="0 0 320 120" className="w-full h-28">
    <defs>
      <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0" stopColor="#22d3ee" />
        <stop offset=".5" stopColor="#a78bfa" />
        <stop offset="1" stopColor="#f472b6" />
      </linearGradient>
      <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#a78bfa" stopOpacity=".35" />
        <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* grid */}
    {[20, 50, 80, 110].map((y) => (
      <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#ffffff10" />
    ))}
    <path
      d="M0,80 C30,60 50,95 80,70 C110,45 130,85 160,55 C190,25 210,60 240,45 C270,30 290,55 320,40 L320,120 L0,120 Z"
      fill="url(#g2)"
    />
    <path
      d="M0,80 C30,60 50,95 80,70 C110,45 130,85 160,55 C190,25 210,60 240,45 C270,30 290,55 320,40"
      fill="none"
      stroke="url(#g1)"
      strokeWidth="2.5"
    />
    <path
      d="M0,95 C40,85 70,70 110,78 C160,90 210,65 260,72 C290,76 305,82 320,78"
      fill="none"
      stroke="#ef4444"
      strokeOpacity=".55"
      strokeWidth="1.5"
    />
  </svg>
);

const AnalyticsCard = () => (
  <div className={`${card} p-5 relative overflow-hidden`}>
    <div className="flex items-start justify-between">
      <div className="h-10 w-10 rounded-xl bg-violet-500/90 grid place-items-center text-white">
        {I.plus}
      </div>
      <IconBtn size="sm">{I.dots}</IconBtn>
    </div>
    <div className="mt-3">
      <div className="text-lg font-medium">Analytics</div>
      <div className={`text-xs ${subtle}`}>Today</div>
    </div>
    <div className="mt-2 -mx-2">
      <AnalyticsChart />
    </div>
  </div>
);

/* ---------- Preference / Search card w/ gradient bubbles ---------- */
const Bubbles = () => (
  <div className="relative h-28 w-28 mx-auto">
    <div className="absolute inset-0 rounded-full blur-2xl bg-fuchsia-500/30" />
    <div className="absolute left-2 top-3 h-10 w-10 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500" />
    <div className="absolute right-3 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600" />
    <div className="absolute left-8 bottom-1 h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700" />
    <div className="absolute right-1 bottom-4 h-7 w-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-500" />
    <div className="absolute left-1 bottom-6 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-300 to-teal-500" />
  </div>
);

const PreferenceCard = () => (
  <div className={`${card} p-5`}>
    <div className="flex items-center justify-between text-xs text-white/60">
      <button className="flex items-center gap-1 hover:text-white">
        <span className="tracking-wide">Preference</span> {I.chevron}
      </button>
      <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 h-8 w-36">
        {I.search}
        <span className="text-white/40">Search</span>
      </div>
      <button className="text-white/60 hover:text-white">{I.plus}</button>
    </div>

    <Bubbles />

    <div className="mt-3 flex items-center gap-2">
      <button className="flex-1 rounded-full bg-white text-black text-xs font-medium h-8">
        Instant
      </button>
      <button className="flex-1 rounded-full bg-white/5 text-white/70 text-xs h-8">
        Standard (BEFT)
      </button>
    </div>

    <p className="mt-3 text-[11px] leading-relaxed text-white/50">
      Your Security Transaction Code Send to{" "}
      <span className="text-white/80">+XXXX 7300</span>.
      <br />
      Please Enter the OTP for Every Payments.
    </p>
  </div>
);

/* ---------- Secret code ---------- */
const SecretCodeCard = () => (
  <div className={`${card} px-5 py-4 flex items-center justify-between`}>
    <div>
      <div className="text-sm">Secret Code</div>
      <div className="mt-1 flex gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-1.5 w-6 rounded-full bg-white/15" />
        ))}
      </div>
    </div>
    <div className="h-9 w-9 rounded-full border-2 border-white/10 border-t-violet-400 animate-spin" />
  </div>
);

/* ---------- Payment form ---------- */
const Field = ({ label, value, right }) => (
  <div className="border-b border-white/5 py-3">
    <div className="text-[11px] text-white/40">{label}</div>
    <div className="mt-1 flex items-center justify-between">
      <div className="text-sm text-white/90">{value}</div>
      {right}
    </div>
  </div>
);

const PaymentFormCard = () => (
  <div className={`${card} p-5`}>
    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-between rounded-xl bg-white/5 h-10 px-3 text-sm">
        Eco <span className="text-white/50">{I.chevron}</span>
      </button>
      <button className="flex items-center justify-between rounded-xl bg-white/5 h-10 px-3 text-sm">
        Schedule <span className="text-white/50">{I.chevron}</span>
      </button>
    </div>

    <Field label="Social Name" value="BrayerFlores (Mr.)" />
    <Field label="Account Number" value="XXXX XX68 7374 5800" />

    <div className="grid grid-cols-2 gap-6">
      <Field label="Expires On" value="28 / 2024" />
      <Field label="CVV" value="*68" />
    </div>

    <div className="pt-3 flex items-center justify-between">
      <div>
        <div className="text-[11px] text-white/40">Wallet Type</div>
        <div className="mt-1 flex items-center gap-1.5 text-sm">
          {I.apple} Pay
        </div>
      </div>
    </div>
  </div>
);

/* ---------- Social friends ---------- */
const FriendRow = ({ name, followers, status = "Pending" }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8" />
      <div>
        <div className="text-sm">{name}</div>
        <div className="text-[11px] text-white/40">{followers}</div>
      </div>
    </div>
    <span className="text-[11px] text-amber-300/80 rounded-full bg-amber-300/10 px-2 py-0.5">
      {status}
    </span>
  </div>
);

const SocialFriendsCard = () => (
  <div className={`${card} p-5`}>
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <span className="text-white/50">02</span> Social Friends
      </div>
      <IconBtn size="sm">{I.dots}</IconBtn>
    </div>
    <div className="mt-2">
      <FriendRow name="Albert Flores" followers="1.2k Followers" />
      <FriendRow name="Bank of America Ltd." followers="12k Followers" />
      <FriendRow name="Leslie Howard" followers="980 Followers" />
    </div>
  </div>
);

/* ---------- Right column ---------- */
const SendBar = () => (
  <div className="flex items-center gap-3">
    <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium shadow-[0_10px_30px_-10px_rgba(139,92,246,0.6)]">
      {I.arrowSend} Send
    </button>
    <IconBtn>{I.dots}</IconBtn>
  </div>
);

const ActionTile = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] py-3">
    <span className="text-white/80">{icon}</span>
    <span className="text-[10px] text-white/50">{label}</span>
  </button>
);

const WalletCard = () => (
  <div className={`${card} p-5`}>
    <div className="flex items-center justify-between">
      <button className="flex items-center gap-2 rounded-full bg-white/5 h-8 px-3 text-xs">
        {I.wallet} Wallet {I.chevron}
      </button>
      <IconBtn size="sm">{I.dots}</IconBtn>
    </div>
    <div className="mt-6 text-center">
      <div className="text-[11px] text-white/40">Available</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">$24,937.00</div>
    </div>
    <div className="mt-5 grid grid-cols-4 gap-2">
      <ActionTile icon={I.clock} label="Recent" />
      <ActionTile icon={I.edit} label="Edit" />
      <ActionTile icon={I.send} label="Send" />
      <ActionTile icon={I.transfer} label="Transfer" />
      <ActionTile icon={I.download} label="Save" />
      <ActionTile icon={I.grid} label="More" />
      <ActionTile icon={I.card} label="Card" />
      <ActionTile icon={I.wallet} label="Pay" />
    </div>
  </div>
);

const SecurityCard = () => (
  <div className={`${card} p-5`}>
    <div className="flex items-center justify-between">
      <div className="text-xs text-white/60">Security</div>
      <div className="flex items-center gap-1">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/30" />
        ))}
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between">
      <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center">
        {I.lock}
      </div>
      <div className="text-right">
        <div className="text-[11px] text-white/40">Use The OTP for</div>
        <div className="text-xs">Every Payment</div>
      </div>
    </div>
    <button className="mt-3 w-full h-8 rounded-full bg-white/5 text-xs text-white/70">
      Setting
    </button>
  </div>
);

const ProgressCard = () => (
  <div className={`${card} p-5`}>
    <div className="flex items-center justify-between">
      <div className="text-xs text-white/60">Progress</div>
      <div className="h-7 w-7 rounded-full bg-violet-500/20 grid place-items-center text-violet-300">
        {I.send}
      </div>
    </div>

    <div className="mt-4 flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-full bg-white/5 grid place-items-center">
        <svg className="absolute inset-0" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#ffffff10" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="3"
            strokeDasharray="94"
            strokeDashoffset="30"
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <span className="text-[10px] relative">{I.card}</span>
      </div>
      <div>
        <div className="text-xs">Payment</div>
        <div className="text-[10px] text-white/40">Message Cycle</div>
      </div>
    </div>

    <div className="mt-3 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-white/5 grid place-items-center text-orange-300">
        {I.food}
      </div>
      <div>
        <div className="text-xs">Food Delivery</div>
        <div className="text-[10px] text-white/40">Weekly</div>
      </div>
    </div>

    <button className="mt-4 w-full h-8 rounded-full bg-white/5 text-xs text-white/70">
      View More
    </button>
  </div>
);

/* ---------- Root ---------- */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white font-[ui-sans-serif,system-ui]">
      <div className="mx-auto max-w-[1200px] p-6">
        <TopBar />

        <div className="mt-6 grid grid-cols-12 gap-5">
          {/* Left */}
          <div className="col-span-4 flex flex-col gap-5">
            <AnalyticsCard />
            <PreferenceCard />
            <SecretCodeCard />
          </div>

          {/* Middle */}
          <div className="col-span-5 flex flex-col gap-5">
            <PaymentFormCard />
            <SocialFriendsCard />
          </div>

          {/* Right */}
          <div className="col-span-3 flex flex-col gap-5">
            <SendBar />
            <WalletCard />
            <div className="grid grid-cols-1 gap-5">
              <SecurityCard />
              <ProgressCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
