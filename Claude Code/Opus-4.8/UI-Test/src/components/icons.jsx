// Lightweight inline-SVG icon set. Each accepts standard SVG props
// (className, etc.) so size/color are controlled with Tailwind.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
}

export const HomeIcon = (p) => (
  <svg {...base} {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>
)
export const PaymentIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
)
export const AnalyticsIcon = (p) => (
  <svg {...base} {...p}><path d="M4 19V5" /><path d="M4 15l5-4 4 3 6-7" /></svg>
)
export const EducationIcon = (p) => (
  <svg {...base} {...p}><path d="M3 8l9-4 9 4-9 4-9-4z" /><path d="M7 10v5c0 1 2.5 2 5 2s5-1 5-2v-5" /></svg>
)
export const ExpandIcon = (p) => (
  <svg {...base} {...p}><path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" /></svg>
)
export const BellIcon = (p) => (
  <svg {...base} {...p}><path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 19a2 2 0 004 0" /></svg>
)
export const LogoutIcon = (p) => (
  <svg {...base} {...p}><path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" /><path d="M10 12h10M17 9l3 3-3 3" /></svg>
)
export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
)
export const PlusIcon = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const ChevronDown = (p) => (
  <svg {...base} {...p}><path d="M6 9l6 6 6-6" /></svg>
)
export const DotsIcon = (p) => (
  <svg {...base} {...p} strokeWidth="2"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
)
export const WalletIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12h3" /><path d="M3 9h13a2 2 0 012 2" /></svg>
)
export const SendIcon = (p) => (
  <svg {...base} {...p}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
)
export const LockIcon = (p) => (
  <svg {...base} {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
)
export const AppleIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.4 12.9c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-.9 2.3-1.9c.7-1.1 1-2.2 1-2.3-.1 0-2-.8-2.1-3.2zM14.6 6.5c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z" /></svg>
)
export const SwapIcon = (p) => (
  <svg {...base} {...p}><path d="M7 7h11l-3-3M17 17H6l3 3" /></svg>
)
export const CardIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18" /></svg>
)
export const GiftIcon = (p) => (
  <svg {...base} {...p}><rect x="4" y="9" width="16" height="11" rx="1" /><path d="M2 9h20v4H2zM12 9v11M12 9S9 4 7 6s5 3 5 3 7 1 5-3-5 3-5 3" /></svg>
)
export const ChartIcon = (p) => (
  <svg {...base} {...p}><path d="M4 19h16M7 16v-5M12 16V8M17 16v-8" /></svg>
)
