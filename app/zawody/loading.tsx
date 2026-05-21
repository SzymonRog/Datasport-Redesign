import { Header } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { ZawodyPageSkeleton } from "@/components/dashboard/skeletons"

export default function ZawodyLoading() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      <ZawodyPageSkeleton />
      <BottomNav />
    </div>
  )
}
