"use client"

import { Header } from "@/components/dashboard/header"
import { RaceSignup } from "@/components/dashboard/race-signup"
import { MyRaces } from "@/components/dashboard/my-races"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { EmptyTrainingStats } from "@/components/dashboard/empty-states"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function NoTrainingsDashboardPage() {

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Race Signup - Top Priority */}
        <RaceSignup />

        {/* My Registered Races */}
        <div className="mt-10">
          <MyRaces />
        </div>

        {/* Main Content Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-8 lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <ProfileCard />
            <EmptyTrainingStats />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
