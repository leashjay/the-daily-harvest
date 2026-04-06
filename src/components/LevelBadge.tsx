import { levelName } from '@/lib/xp'

interface LevelBadgeProps {
  level: number
  className?: string
}

export default function LevelBadge({ level, className = '' }: LevelBadgeProps) {
  const name = levelName(level)
  return (
    <div
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-garden-brick text-white font-heading font-semibold text-base shadow ${className}`}
      title={name}
    >
      {level}
    </div>
  )
}
