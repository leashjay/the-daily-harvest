import type { Player, PlayerId, AppState } from '@/types/garden'
import { tunnelSlots } from './gardenData'
import { levelForXp } from './xp'

export const PLAYERS: Record<PlayerId, Pick<Player, 'id' | 'name'>> = {
  cam:   { id: 'cam',   name: 'Cam' },
  leesh: { id: 'leesh', name: 'Leesh' },
}

export function initialState(): AppState {
  return {
    players: {
      cam:   { id: 'cam',   name: 'Cam',   xp: 0, level: 1 },
      leesh: { id: 'leesh', name: 'Leesh', xp: 0, level: 1 },
    },
    taskLogs: [],
    tunnelSlots,
    unlockedAchievements: { cam: [], leesh: [] },
  }
}

export function playerWithUpdatedLevel(player: Player): Player {
  return { ...player, level: levelForXp(player.xp) }
}
