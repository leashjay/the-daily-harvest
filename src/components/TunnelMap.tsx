'use client'

import { useGame } from '@/context/GameContext'
import PlantCard from './PlantCard'

const BAYS: { label: string; ids: number[] }[] = [
  { label: 'Bay A', ids: [1, 2] },
  { label: 'Bay B', ids: [3, 4, 5] },
  { label: 'Bay C', ids: [6, 7] },
]

function BayDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px flex-1 bg-garden-straw/20" />
      <span className="text-[10px] uppercase tracking-widest font-heading font-semibold text-garden-straw/50">
        {label}
      </span>
      <div className="h-px flex-1 bg-garden-straw/20" />
    </div>
  )
}

export default function TunnelMap() {
  const { state } = useGame()

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-heading text-xl font-semibold text-garden-light">The Grow Tunnel</h2>
        <span className="text-xs text-garden-soil bg-garden-straw px-3 py-1 rounded-full font-heading font-semibold">
          7 spaces · 3 bays
        </span>
      </div>

      <div className="relative rounded-3xl overflow-hidden border-2 border-garden-soil/30 bg-garden-soil/15">
        <div className="h-3 bg-gradient-to-b from-garden-slate/40 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y-2 md:divide-y-0 md:divide-x-2 divide-garden-slate/20 px-4 md:px-6 pb-6 pt-4">
          {BAYS.map((bay) => {
            const baySlots = state.tunnelSlots.filter(s => bay.ids.includes(s.id))
            return (
              <div key={bay.label} className="md:px-4 first:md:pl-0 last:md:pr-0 space-y-3">
                <BayDivider label={bay.label} />
                <div className="space-y-3">
                  {baySlots.map(slot => (
                    <PlantCard key={slot.id} slot={slot} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="h-3 bg-gradient-to-t from-garden-soil/20 to-transparent" />
      </div>
    </section>
  )
}
