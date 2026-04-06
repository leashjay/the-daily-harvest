import { PlantSlot } from '@/types/garden'
import { STAGE_COLORS } from '@/lib/gardenData'

const STAGE_EMOJIS: Record<string, string> = {
  empty:     '⬜',
  planted:   '🌰',
  sprouting: '🌱',
  growing:   '🌿',
  flowering: '🌸',
  harvest:   '🍅',
}

const STAGE_TEXT: Record<string, string> = {
  empty:     'Empty',
  planted:   'Planted',
  sprouting: 'Sprouting',
  growing:   'Growing',
  flowering: 'Flowering',
  harvest:   'Ready!',
}

const GROWTH_PROGRESS: Record<string, number> = {
  empty:     0,
  planted:   12,
  sprouting: 35,
  growing:   62,
  flowering: 82,
  harvest:   100,
}

interface PlantCardProps {
  slot: PlantSlot
}

export default function PlantCard({ slot }: PlantCardProps) {
  const stageColor = STAGE_COLORS[slot.stage] ?? 'bg-gray-100 text-gray-500'
  const stageText  = STAGE_TEXT[slot.stage] ?? slot.stage
  const stageEmoji = STAGE_EMOJIS[slot.stage] ?? '🪴'
  const growthPct  = GROWTH_PROGRESS[slot.stage] ?? 0
  const isEmpty    = slot.stage === 'empty'

  return (
    <div className="group rounded-2xl border border-garden-soil/30 bg-garden-soil/25 hover:bg-garden-soil/35 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
      {/* Soil strip */}
      <div className="h-1.5 bg-gradient-to-r from-garden-soil/50 via-garden-soil/80 to-garden-soil/50" />

      <div className="px-4 pt-3 pb-4 space-y-2.5">
        {/* Top row: label + emoji */}
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest font-heading text-garden-straw/50 font-semibold">
              {slot.label}
            </p>
            <p className="font-heading font-semibold text-garden-straw text-base leading-tight mt-0.5 truncate">
              {isEmpty
                ? <span className="text-garden-straw/40 italic text-sm">Empty bed</span>
                : slot.plantName}
            </p>
          </div>
          <span className="text-2xl flex-shrink-0 ml-2 mt-0.5">{stageEmoji}</span>
        </div>

        {/* Growth progress bar */}
        <div>
          <div className="h-2 bg-garden-straw/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-garden-green/70 to-garden-green rounded-full transition-all duration-500"
              style={{ width: `${growthPct}%` }}
            />
          </div>
        </div>

        {/* Stage pill + harvest countdown */}
        <div className="flex items-center justify-between">
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${stageColor}`}>
            {stageText}
          </span>
          {slot.expectedHarvestDays && !isEmpty && (
            <span className="text-xs text-garden-straw/50 font-heading">~{slot.expectedHarvestDays}d</span>
          )}
        </div>

        {slot.notes && (
          <p className="text-xs text-garden-straw/40 italic">{slot.notes}</p>
        )}
      </div>
    </div>
  )
}
