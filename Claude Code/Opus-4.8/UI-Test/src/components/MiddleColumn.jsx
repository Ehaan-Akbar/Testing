import { Card, Avatar, Badge, IconButton } from './primitives'
import { ChevronDown, AppleIcon, LockIcon, DotsIcon } from './icons'

/* ---------- Field helpers ---------- */
function Field({ label, value, sub }) {
  return (
    <div className="border-b border-line py-3">
      <span className="text-[11px] font-medium uppercase tracking-wide text-ink-dim">{label}</span>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{value}</span>
        {sub && <span className="text-xs text-ink-muted">{sub}</span>}
      </div>
    </div>
  )
}

function Select({ value }) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-between rounded-xl border border-line bg-card-2 px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {value}
      <ChevronDown className="h-4 w-4 text-ink-dim" />
    </button>
  )
}

/* ---------- Payment form card ---------- */
function PaymentForm() {
  return (
    <Card className="p-5">
      <div className="flex gap-3">
        <Select value="Eco" />
        <Select value="Schedule" />
      </div>

      <div className="mt-2">
        <Field label="Payee Name" value="Brayer Flores (Mr.)" />
        <Field label="Account Number" value="•••• 9308 7374 5800" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Expires On" value="28 / 2024" />
          <Field label="CVV" value="•68" />
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-dim">Wallet Type</span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card-2 px-3 py-1.5 text-sm font-medium text-ink">
            <AppleIcon className="h-4 w-4" /> Pay
          </span>
        </div>
      </div>
    </Card>
  )
}

/* ---------- Social friends card ---------- */
const FRIENDS = [
  { name: 'Albert Flores', meta: '@albertf', status: 'pending', initials: 'AF' },
  { name: 'Bank of America Ltd.', meta: '2.1k Followers', status: 'paid', initials: 'BA' },
]

function SocialFriendsCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">02 | Social Friends</h3>
        <IconButton label="More options" className="h-8 w-8">
          <DotsIcon className="h-4 w-4" />
        </IconButton>
      </div>

      <ul className="mt-4 space-y-3">
        {FRIENDS.map((f) => (
          <li key={f.name} className="flex items-center justify-between rounded-2xl border border-line bg-card-2 px-3 py-2.5">
            <div className="flex items-center gap-3">
              <Avatar initials={f.initials} />
              <div>
                <p className="text-sm font-medium text-ink">{f.name}</p>
                <p className="text-xs text-ink-dim">{f.meta}</p>
              </div>
            </div>
            <Badge tone={f.status}>{f.status === 'paid' ? 'Paid' : 'Pending'}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ---------- Security PIN card ---------- */
function SecurityCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Security</h3>
        <p className="text-[11px] text-ink-dim">Enter the PIN for<br />Make Payment</p>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-card-2 px-4 py-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/15 text-accent-soft">
          <LockIcon className="h-5 w-5" />
        </span>
        <div className="flex gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-3 w-3 rounded-full bg-ink/70" />
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function MiddleColumn() {
  return (
    <div className="flex flex-col gap-4">
      <PaymentForm />
      <div className="grid grid-cols-2 gap-4">
        <SocialFriendsCard />
        <SecurityCard />
      </div>
    </div>
  )
}
