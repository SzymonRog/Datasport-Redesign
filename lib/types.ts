// ─── Event / Race Types ───────────────────────────────────────

export type RaceStatus = "confirmed" | "pending_payment" | "cancelled"

export interface RaceDistance {
  name: string
  spots?: number
  maxSpots?: number
  price?: string
}

export interface RaceBase {
  id: number
  name: string
  location: string
  date: string
  startTime: string
  image: string
  description?: string
}

/** A race listed for browsing / sign-up */
export interface RaceEvent extends RaceBase {
  participants: number
  spotsLeft: number
  distances: string[]
  organizer?: string
  address?: string
  isPopular?: boolean
  isNear?: boolean
}

/** A race the user has registered for */
export interface UserRace extends RaceBase {
  startNumber: string
  category: string
  distance: string
  status: RaceStatus
  cover: string
  daysUntil: number
  participantName?: string
}

/** Full detail for EventHub view */
export interface EventDetail extends RaceBase {
  participants: number
  spotsLeft: number
  distances: string[]
  description: string
  organizer: string
  address: string
  showLeaderboards?: boolean
  showPricing?: boolean
  pricingTitle?: string
  pricingTiers?: PricingTier[]
  leaderboards?: Leaderboard[]
}

// ─── Leaderboard Types ────────────────────────────────────────

export interface LeaderboardEntry {
  name: string
  value: string
}

export interface Leaderboard {
  id: string
  title: string
  unit: string
  entries: LeaderboardEntry[]
}

// ─── Pricing Types ────────────────────────────────────────────

export interface PricingTier {
  from: string
  to: string
  amount: string
}

// ─── Action Types (EventHub) ──────────────────────────────────

export type EventHubActionTier = "primary" | "secondary" | "utility"

export interface EventHubAction {
  id: string
  title: string
  description: string
  href: string
  tier: EventHubActionTier
  shortLabel?: string
  variant?: "default" | "highlight"
}

// ─── Participant Types ────────────────────────────────────────

export interface Participant {
  bib: string
  name: string
  city: string
  club: string
  category: string
  status: string
}

// ─── Activity / News Types ────────────────────────────────────

export type ActivityType = "news" | "photo" | "result"

export interface Activity {
  id: number
  type: ActivityType
  title: string
  description: string
  date: string
  location: string
  likes: number
  comments: number
}

// ─── User Profile Types ───────────────────────────────────────

export interface UserProfile {
  name: string
  location: string
  stats: {
    trainings: number
    registrations: number
    results: number
  }
  completedRaces: number
  activeStarts: number
}