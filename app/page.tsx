"use client"

import { Header } from "@/components/dashboard/header"
import { NextRaceHero } from "@/components/dashboard/next-race-hero"
import { RaceSignup } from "@/components/dashboard/race-signup"
import { MyRaces } from "@/components/dashboard/my-races"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Next Race Hero — personalized top section */}
        <NextRaceHero />

        {/* Race Signup — browse events */}
        <div className="mt-8">
          <RaceSignup />
        </div>

        {/* My Registered Races */}
        <div className="mt-10">
          <MyRaces />
        </div>

        {/* Main Content Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile & Stats */}
          <div className="space-y-6 lg:col-span-2">
            <ProfileCard />
            <StatsOverview />
          </div>

          {/* Right Column - Activity Feed */}
          <div className="space-y-8">
            <RecentActivity />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
