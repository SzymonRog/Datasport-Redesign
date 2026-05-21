import { Header } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { TicketPageSkeleton } from "@/components/dashboard/skeletons"

export default function TicketLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24 lg:pb-8">
      <Header />
      <TicketPageSkeleton />
      <BottomNav />
    </div>
  )
}
