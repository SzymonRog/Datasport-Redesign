"use client"

import { Header } from "@/components/dashboard/header"
import { RaceList } from "@/components/dashboard/race-list"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function ZapisyPage() {
  return (
    <div className="bg-geometric min-h-screen bg-background pb-24 lg:pb-8">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RaceList />
      </main>

      <BottomNav activeTab="register" />
    </div>
  )
}