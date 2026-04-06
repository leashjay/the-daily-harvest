import TunnelMap from '@/components/TunnelMap'

export default function GardenPage() {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-garden-sky/30 px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-garden-green">
            Grow tunnel map
          </h1>
          <p className="text-garden-soil text-sm mt-1">All seven spaces at a glance</p>
        </header>
        <TunnelMap />
      </div>
    </main>
  )
}
