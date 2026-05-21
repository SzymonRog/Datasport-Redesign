"use client"

import { Header } from "@/components/dashboard/header"
import { DemoPlaceholder } from "@/components/dashboard/demo-placeholder"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function RywalizacjePage() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      <DemoPlaceholder title="Profil" />
      <BottomNav />
    </div>
  )
}
