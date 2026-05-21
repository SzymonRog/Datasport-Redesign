import type { EventHubTab } from "./types"

const TAB_LABELS: Record<EventHubTab, string> = {
  info: "Informacje",
  leaderboard: "Rywalizacja",
  regulations: "Opłaty i Regulamin",
  participants: "Lista startowa",
}

const TABS: EventHubTab[] = ["info", "leaderboard", "regulations", "participants"]

type TabNavigationProps = {
  activeTab: EventHubTab
  onTabChange: (tab: EventHubTab) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 sm:hidden" />
      <div className="flex border-b border-border overflow-x-auto scrollbar-hide gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {TABS.map((tab) => {
          const isActive = activeTab === tab

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`relative pb-3 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {TAB_LABELS[tab]}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
