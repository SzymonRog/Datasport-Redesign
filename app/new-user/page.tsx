"use client"

import { Header } from "@/components/dashboard/header"
import { RaceSignup } from "@/components/dashboard/race-signup"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { 
  EmptyMyRaces, 
  EmptyQuickActions, 
  EmptyTrainingStats,
  EmptyProfileStats 
} from "@/components/dashboard/empty-states"
import { Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewUserDashboard() {

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Hero - Empty State */}
        <EmptyQuickActions />

        {/* Race Signup - Top Priority */}
        <div className="mt-10">
          <RaceSignup />
        </div>

        {/* My Races - Empty State */}
        <div className="mt-10">
          <EmptyMyRaces />
        </div>

        {/* Main Content Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Training Stats - Empty State */}
            <EmptyTrainingStats />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Card - Empty State */}
            <EmptyProfileCard />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

function EmptyProfileCard() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar Placeholder */}
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-foreground">
              Szymon Rogala
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              rogalamarcel5@gmail.com
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Nowy użytkownik
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="mt-4 w-full gap-2">
          <Edit className="h-4 w-4" />
          Uzupełnij profil
        </Button>
      </div>

      <div className="border-t border-border p-4">
        <EmptyProfileStats />
      </div>
    </section>
  )
}
