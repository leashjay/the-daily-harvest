'use client'

import { useState } from 'react'
import { useGame } from '@/context/GameContext'
import { XP_REWARDS } from '@/lib/gardenData'

const TASK_EMOJI: Record<string, string> = {
  water: '💧',
  weed: '🌿',
  plant: '🪴',
  harvest: '🧺',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHrs = Math.floor(diffMins / 60)
  if (diffHrs < 24) return `${diffHrs}h ago`
  const diffDays = Math.floor(diffHrs / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const PAGE_SIZE = 5

export default function RecentActivity() {
  const { state } = useGame()
  const [showAll, setShowAll] = useState(false)

  const allLogs = state.taskLogs
  const visible = showAll ? allLogs : allLogs.slice(0, PAGE_SIZE)
  const hasMore = allLogs.length > PAGE_SIZE

  if (allLogs.length === 0) return null

  return (
    <section>
      <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/50 mb-3">
        Recent
      </h2>
      <div className="space-y-1.5">
        {visible.map(log => {
          const who = state.players[log.playerId]?.name ?? log.playerId
          const when = formatDate(log.loggedAt)
          return (
            <div
              key={log.id}
              className="flex items-center gap-3 bg-garden-soil/15 rounded-xl px-4 py-2.5 border border-garden-soil/10"
            >
              <span className="text-base">{TASK_EMOJI[log.taskType] ?? '📋'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-garden-straw/70 truncate">
                  {log.notes ?? log.taskType}
                </p>
                <p className="text-[11px] text-garden-straw/35">
                  {who} · {when}
                </p>
              </div>
              <span className="text-xs text-garden-light/40 font-heading flex-shrink-0">
                +{XP_REWARDS[log.taskType]} XP
              </span>
            </div>
          )
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(prev => !prev)}
          className="mt-3 w-full text-center text-xs font-heading font-semibold text-garden-straw/50 hover:text-garden-straw transition-colors py-2"
        >
          {showAll ? 'Show less' : `Show all (${allLogs.length})`}
        </button>
      )}
    </section>
  )
}
