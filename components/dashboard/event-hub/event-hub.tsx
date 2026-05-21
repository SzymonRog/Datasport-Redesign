"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import type { EventHubProps, EventHubTab } from "./types"
import { HeroCover } from "./hero-cover"
import { MobileRegistrationCta } from "./mobile-registration-cta"
import { TabNavigation } from "./tab-navigation"
import { TabInfo } from "./tab-info"
import { TabLeaderboard } from "./tab-leaderboard"
import { TabRegulations } from "./tab-regulations"
import { TabParticipants } from "./tab-participants"
import { SidebarRegistry } from "./sidebar-registry"

export function EventHub({ event, actions, onBack }: EventHubProps) {
  const [activeTab, setActiveTab] = useState<EventHubTab>("info")

  const totalSpots = event.participants + event.spotsLeft
  const spotsPercent = totalSpots > 0 ? Math.round((event.spotsLeft / totalSpots) * 100) : 0
  const showLeaderboards = event.showLeaderboards !== false

  const handleRegister = () => {
    toast.success("Zostałeś zapisany!", { description: `${event.name} — potwierdzenie na e-mail` })
  }
  const handleDemoAction = () => {
    toast("Funkcja niedostępna w wersji demo")
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Back navigation */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Powrót do listy zawodów
        </button>
      </div>

      <HeroCover event={event} />

      <MobileRegistrationCta
        event={event}
        spotsPercent={spotsPercent}
        totalSpots={totalSpots}
        onRegister={handleRegister}
        onDemoAction={handleDemoAction}
      />

      {/* Dual-column grid layout */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start w-full max-w-full overflow-hidden lg:overflow-visible">

        {/* Left column: tabbed details */}
        <div className="lg:col-span-2 space-y-6 min-w-0 w-full">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="min-h-[400px]">
            {activeTab === "info" && (
              <TabInfo event={event} onDemoAction={handleDemoAction} />
            )}
            {activeTab === "leaderboard" && (
              <TabLeaderboard showLeaderboards={showLeaderboards} />
            )}
            {activeTab === "regulations" && (
              <TabRegulations event={event} />
            )}
            {activeTab === "participants" && (
              <TabParticipants event={event} />
            )}
          </div>
        </div>

        {/* Right column: sticky registry panel */}
        <SidebarRegistry
          event={event}
          spotsPercent={spotsPercent}
          totalSpots={totalSpots}
          onRegister={handleRegister}
          onDemoAction={handleDemoAction}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  )
}
