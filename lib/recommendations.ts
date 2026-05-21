import { Event } from "./mock-data"

export type BadgeType = "last-year" | "near-you" | "popular" | "recommended"

export type RecommendationBadge = {
  type: BadgeType
  label: string
}

// Mock: event IDs the user finished last year
const LAST_YEAR_FINISHED_IDS = new Set([2, 4, 7])

// Mock: event IDs within 30 km of user's location
const NEARBY_EVENT_IDS = new Set([1, 4, 5])

const POPULAR_THRESHOLD = 400

// Priority order: last-year > near-you > popular
export function getTopRecommendationBadge(event: Event): RecommendationBadge | null {
  if (LAST_YEAR_FINISHED_IDS.has(event.id)) {
    return { type: "last-year", label: "Finisher 2025" }
  }

  if (NEARBY_EVENT_IDS.has(event.id)) {
    return { type: "near-you", label: "Blisko Ciebie" }
  }

  if (event.participants >= POPULAR_THRESHOLD) {
    return { type: "popular", label: "Popularne" }
  }

  return { type: "recommended", label: "Polecane" }
}
