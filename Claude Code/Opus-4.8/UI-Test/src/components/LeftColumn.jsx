import { useState } from 'react'
import { Card, IconButton } from './primitives'
import { PlusIcon, ChevronDown, SearchIcon } from './icons'

/* ---------- Analytics line-chart card ---------- */
function AnalyticsCard() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-ink">Analytics</h3>
          <p className="mt-0.5 text-xs text-ink-dim">Today</p>
        </div>
        <IconButton label="Add analytics" active className="h-10 w-10 shadow-accent">
          <PlusIcon className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="mt-4 h-24">
        <svg viewBox="0 0 280 90" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="fadeA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* faint grid */}
          {[18, 40, 62].map((y) => (
            <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#20202a" strokeWidth="1" />
          ))}
          {/* area + primary line */}
          <path d="M0,70 C40,55 60,35 95,45 C130,55 150,20 190,30 C225,38 250,18 280,26 L280,90 L0,90 Z" fill="url(#fadeA)" />
          <path d="M0,70 C40,55 60,35 95,45 C130,55 150,20 190,30 C225,38 250,18 280,26" fill="none" stroke="#8b6dff" strokeWidth="2" />
          {/* secondary lines */}
          <path d="M0,55 C45,60 70,48 110,52 C150,56 175,40 215,46 C245,50 265,42 280,44" fill="none" stroke="#f59e0b" strokeWidth="1.6" opacity="0.8" />
          <path d="M0,78 C50,72 80,76 120,70 C160,64 185,72 220,66 C250,61 268,64 280,62" fill="none" stroke="#10b981" strokeWidth="1.6" opacity="0.7" />
        </svg>
      </div>
    </Card>
  )
}

/* ---------- Preference + search row ---------- */
function SearchBar() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        Preference
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim" />
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="w-full rounded-full border border-line bg-card py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-dim focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>
    </div>
  )
}

/* ---------- Colorful bubbles / secret-code card ---------- */
function BubblesCard() {
  const [mode, setMode] = useState('instant')
  return (
    <Card className="overflow-hidden p-5">
      {/* bubble visualization */}
      <div className="relative mx-auto h-40 w-full">
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />
        <Bubble className="left-[34%] top-[20%] h-12 w-12" from="#22d3ee" to="#3b82f6" />
        <Bubble className="left-[48%] top-[14%] h-16 w-16" from="#a855f7" to="#6366f1" />
        <Bubble className="left-[40%] top-[44%] h-20 w-20" from="#7c5cff" to="#4338ca" />
        <Bubble className="left-[58%] top-[40%] h-10 w-10" from="#ec4899" to="#a855f7" />
        <Bubble className="left-[30%] top-[54%] h-8 w-8" from="#f59e0b" to="#ef4444" />
        <Bubble className="left-[62%] top-[58%] h-6 w-6" from="#10b981" to="#06b6d4" />
      </div>

      {/* instant / standard toggle */}
      <div className="mt-2 grid grid-cols-2 gap-2 rounded-full border border-line bg-card-2 p-1">
        {[
          { id: 'instant', label: 'Instant (EFT%)' },
          { id: 'standard', label: 'Standard (BEFT%)' },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-full px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
              ${mode === id ? 'bg-accent text-white' : 'text-ink-muted hover:text-ink'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink-dim">
        Your Security Transaction Code Secret <span className="text-accent-soft">#5453300</span>.
        Please Enter the OTP for Every Payments.
      </p>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink-muted">Secret Code</label>
        <div className="mt-2 flex items-center justify-between rounded-full border border-line bg-card-2 px-4 py-3">
          <div className="flex gap-2">
            {[2, 5, 4, 8].map((d, i) => (
              <span key={i} className="grid h-6 w-6 place-items-center rounded-md bg-card text-xs font-semibold text-ink">
                {d}
              </span>
            ))}
          </div>
          <span className="block h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </div>
    </Card>
  )
}

function Bubble({ className, from, to }) {
  return (
    <span
      className={`absolute rounded-full shadow-lg ${className}`}
      style={{ background: `radial-gradient(circle at 30% 25%, ${from}, ${to})` }}
    />
  )
}

export default function LeftColumn() {
  return (
    <div className="flex flex-col gap-4">
      <AnalyticsCard />
      <SearchBar />
      <BubblesCard />
    </div>
  )
}
