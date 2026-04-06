import { tunnelSlots } from '@/lib/gardenData'
import PlantCard from './PlantCard'

export default function TunnelMap() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-heading text-2xl font-semibold text-garden-green">🏕️ The Grow Tunnel</h2>
        <span className="text-sm text-garden-soil bg-garden-straw px-3 py-1 rounded-full">
          7 spaces
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tunnelSlots.map(slot => (
          <PlantCard key={slot.id} slot={slot} />
        ))}
      </div>
    </section>
  )
}
