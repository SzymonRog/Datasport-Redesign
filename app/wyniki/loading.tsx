import { Header } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { Skeleton } from "@/components/ui/skeleton"

export default function WynikiLoading() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-7 w-32 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-md" />
          </div>
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
