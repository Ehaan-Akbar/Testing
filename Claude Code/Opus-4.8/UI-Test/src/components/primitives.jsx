// Small shared building blocks used across the dashboard cards.

export function Card({ className = '', children, ...rest }) {
  return (
    <div
      className={`rounded-3xl bg-card border border-line shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

// Pill-shaped icon button used for the many small round controls in the UI.
export function IconButton({ children, label, active = false, className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`grid place-items-center rounded-full border transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
        ${active
          ? 'bg-accent border-accent text-white hover:bg-accent-soft'
          : 'bg-card-2 border-line text-ink-muted hover:text-ink hover:border-ink-dim'}
        ${className}`}
    >
      {children}
    </button>
  )
}

// Generic small avatar with a ring; falls back to initials.
export function Avatar({ initials, src, size = 'h-9 w-9', ring = 'ring-line' }) {
  return (
    <span
      className={`relative inline-grid place-items-center ${size} shrink-0 overflow-hidden
        rounded-full bg-card-2 text-xs font-semibold text-ink-muted ring-2 ${ring}`}
    >
      {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : initials}
    </span>
  )
}

export function Badge({ children, tone = 'muted' }) {
  const tones = {
    muted: 'bg-card-2 text-ink-muted border-line',
    paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accent: 'bg-accent/15 text-accent-soft border-accent/30',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}
