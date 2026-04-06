import { PlantSlot } from '@/types/garden'
import { STAGE_LABELS, STAGE_COLORS } from '@/lib/gardenData'

interface PlantCardProps {
  slot: PlantSlot
}

export default function PlantCard({ slot }: PlantCardProps) {
  const stageColor = STAGE_COLORS[slot.stage] ?? 'bg-gray-100 text-gray-500'
  const stageLabel = STAGE_LABELS[slot.stage] ?? slot.stage

  return (
    <div className="group rounded-2xl border border-garden-light bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
      {/* Header strip */}
      <div className="bg-garden-green px-4 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-heading font-semibold tracking-wide uppercase">
          {slot.label}
        </span>
        {slot.expectedHarvestDays && (
          <span className="text-garden-light text-xs">~{slot.expectedHarvestDays}d</span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <p className="font-heading font-semibold text-garden-soil text-lg leading-tight mb-2">
          {slot.stage === 'empty' ? <span className="text-gray-400 italic">Empty</span> : slot.plantName}
        </p>

        {/* Stage pill */}
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${stageColor}`}>
          {stageLabel}
        </span>

        {/* Notes */}
        {slot.notes && (
          <p className="mt-3 text-xs text-gray-500 italic">{slot.notes}</p>
        )}
      </div>
    </div>
  )
}
