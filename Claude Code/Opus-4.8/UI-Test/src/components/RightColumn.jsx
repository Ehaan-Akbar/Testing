import { Card, IconButton, Avatar } from './primitives'
import {
  SendIcon, DotsIcon, WalletIcon, SwapIcon, CardIcon,
  GiftIcon, ChartIcon, ChevronDown,
} from './icons'

/* ---------- Send button + wallet row ---------- */
function SendBar() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white shadow-accent transition-colors hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <SendIcon className="h-4 w-4" /> Send
      </button>
      <IconButton label="More" className="h-11 w-11">
        <DotsIcon className="h-4 w-4" />
      </IconButton>
    </div>
  )
}

/* ---------- Balance card ---------- */
const ACTIONS = [
  { label: 'Wallet', Icon: WalletIcon },
  { label: 'Swap', Icon: SwapIcon },
  { label: 'Card', Icon: CardIcon },
  { label: 'Gift', Icon: GiftIcon },
]

function BalanceCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card-2 px-3 py-1.5 text-xs font-medium text-ink-muted">
          <WalletIcon className="h-4 w-4" /> Wallet
        </span>
        <IconButton label="Settings" className="h-8 w-8">
          <DotsIcon className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="mt-5">
        <p className="text-xs text-ink-dim">Total Balance</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-ink">$24,937.00</p>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {ACTIONS.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-card-2 py-3 text-[11px] font-medium text-ink-muted transition-colors hover:text-ink hover:border-ink-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Programs card ---------- */
const PROGRAMS = [
  { name: 'Partners', meta: 'Active', initials: 'PT', Icon: ChartIcon },
  { name: 'Message Center', meta: '12 new', initials: 'MC', Icon: GiftIcon },
]

function ProgramsCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Programs</h3>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink focus:outline-none"
        >
          Sort <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {PROGRAMS.map(({ name, meta, initials, Icon }) => (
          <li key={name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar initials={initials} ring="ring-accent/30" />
              <div>
                <p className="text-sm font-medium text-ink">{name}</p>
                <p className="text-xs text-ink-dim">{meta}</p>
              </div>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent-soft">
              <Icon className="h-4 w-4" />
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 w-full rounded-full border border-line bg-card-2 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink hover:border-ink-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        View More
      </button>
    </Card>
  )
}

export default function RightColumn() {
  return (
    <div className="flex flex-col gap-4">
      <SendBar />
      <BalanceCard />
      <ProgramsCard />
    </div>
  )
}
