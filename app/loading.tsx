import { Header } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { DashboardPageSkeleton } from "@/components/dashboard/skeletons"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      <DashboardPageSkeleton />
      <BottomNav />
    </div>
  )
}
