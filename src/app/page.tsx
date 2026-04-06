import Image from 'next/image'
import TunnelMap from '@/components/TunnelMap'
import PlayerProgress from '@/components/PlayerProgress'
import RecentActivity from '@/components/RecentActivity'

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 py-6 md:px-8 pb-24">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 md:h-72">
          <Image
            src="/images/garden-plot.jpeg"
            alt="Our grow tunnel"
            fill
            className="object-cover object-[center_75%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white drop-shadow-md">
              The Daily Harvest
            </h1>
            <p className="text-garden-straw text-sm mt-1">
              Cam &amp; Leesh — growing together, richer harvests
            </p>
          </div>
        </div>

        <PlayerProgress />
        <TunnelMap />
        <RecentActivity />
      </div>
    </main>
  )
}
