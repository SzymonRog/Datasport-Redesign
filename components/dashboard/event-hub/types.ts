import type { EventHubAction, PricingTier } from "@/lib/mock-data"

export type EventHubEvent = {
  id: number
  name: string
  location: string
  date: string
  startTime: string
  participants: number
  spotsLeft: number
  image: string
  distances: string[]
  description: string
  organizer: string
  address: string
  showLeaderboards?: boolean
  showPricing?: boolean
  pricingTitle?: string
  pricingTiers?: PricingTier[]
  leaderboards?: any[]
}

export type EventHubTab = "info" | "leaderboard" | "regulations" | "participants"

export type EventHubProps = {
  event: EventHubEvent
  actions: EventHubAction[]
  onBack: () => void
}
