import type { Achievement } from '@/types/garden'

export const achievements: Achievement[] = [
  { id: 'first_drop',       name: 'First Drop',       emoji: '💧', description: 'Log your first watering' },
  { id: 'weed_warrior',     name: 'Weed Warrior',     emoji: '⚔️', description: 'Weed 5 times total' },
  { id: 'first_harvest',    name: 'First Harvest',    emoji: '🍅', description: 'Log your first harvest' },
  { id: 'on_a_streak',      name: 'On a Streak',      emoji: '🔥', description: 'Log a task 3 days in a row' },
  { id: 'green_fingers',    name: 'Green Fingers',    emoji: '🌿', description: '3 plants growing or beyond at once' },
  { id: 'dedicated_grower', name: 'Dedicated Grower', emoji: '🏅', description: 'Log 10 tasks total' },
  { id: 'tunnel_complete',  name: 'Tunnel Complete',  emoji: '🏕️', description: 'All 7 spaces have an active plant' },
]

export function achievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id)
}
