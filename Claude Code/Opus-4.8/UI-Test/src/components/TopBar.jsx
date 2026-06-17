import { useState } from 'react'
import {
  HomeIcon, PaymentIcon, AnalyticsIcon, EducationIcon,
  ExpandIcon, BellIcon, LogoutIcon,
} from './icons'
import { Avatar, IconButton } from './primitives'

const NAV = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'payment', label: 'Payment', Icon: PaymentIcon },
  { id: 'analytics', label: 'Analytics', Icon: AnalyticsIcon },
  { id: 'education', label: 'Education', Icon: EducationIcon },
]

export default function TopBar() {
  const [active, setActive] = useState('home')

  return (
    <header className="flex items-center justify-between gap-4">
      {/* Left: nav pills inside a rounded container */}
      <nav className="flex items-center gap-1 rounded-full border border-line bg-card p-1">
        {NAV.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
                ${isActive
                  ? 'bg-card-2 text-ink shadow-card'
                  : 'text-ink-muted hover:text-ink'}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          )
        })}
        <IconButton label="Toggle fullscreen" className="ml-1 h-9 w-9">
          <ExpandIcon className="h-4 w-4" />
        </IconButton>
      </nav>

      {/* Right: avatars, pro badge, bell, logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center -space-x-2">
          <Avatar initials="JD" ring="ring-card" />
          <Avatar initials="MK" ring="ring-card" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Pro
        </span>

        <IconButton label="Notifications" className="h-9 w-9">
          <BellIcon className="h-4 w-4" />
        </IconButton>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <LogoutIcon className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  )
}
