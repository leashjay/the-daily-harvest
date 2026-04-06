'use client'

import type { Achievement } from '@/types/garden'

interface AchievementToastProps {
  achievement: Achievement
  onDismiss?: () => void
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  return (
    <div
      role="status"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-garden-light bg-white px-4 py-3 shadow-lg"
    >
      <span className="text-2xl" aria-hidden>
        {achievement.emoji}
      </span>
      <div>
        <p className="font-heading text-sm font-semibold text-garden-green">{achievement.name}</p>
        <p className="text-xs text-garden-soil">{achievement.description}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-2 text-xs text-gray-500 hover:text-gray-800"
        >
          Dismiss
        </button>
      )}
    </div>
  )
}
