import { levelName, nextLevelThreshold, progressPercent } from '@/lib/xp'
import type { Player } from '@/types/garden'

interface XPBarProps {
  player: Player
}

export default function XPBar({ player }: XPBarProps) {
  const name = levelName(player.level)
  const next = nextLevelThreshold(player.level)
  const progressPct = progressPercent(player.xp, player.level)

  return (
    <div className="flex items-center gap-4 bg-garden-soil/30 backdrop-blur rounded-2xl px-5 py-3 border border-garden-soil/20">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-garden-brick flex items-center justify-center text-white font-heading font-semibold text-lg shadow">
        {player.level}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-heading font-semibold text-garden-light">{player.name} — {name}</span>
          <span className="text-garden-straw/70 text-xs">
            {player.xp} / {next ?? '∞'} XP
          </span>
        </div>
        <div className="h-3 bg-garden-straw rounded-full overflow-hidden">
          <div
            className="h-full bg-garden-brick rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
