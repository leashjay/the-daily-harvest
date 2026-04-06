export const XP_LEVELS = [
  { level: 1, name: 'Seedling',        xpRequired: 0    },
  { level: 2, name: 'Sprout',          xpRequired: 150  },
  { level: 3, name: 'Grower',          xpRequired: 400  },
  { level: 4, name: 'Harvester',       xpRequired: 900  },
  { level: 5, name: 'Master Gardener', xpRequired: 2000 },
]

export function levelForXp(xp: number): number {
  let level = 1
  for (const threshold of XP_LEVELS) {
    if (xp >= threshold.xpRequired) level = threshold.level
  }
  return level
}

export function levelName(level: number): string | undefined {
  return XP_LEVELS.find((l) => l.level === level)?.name
}

export function nextLevelThreshold(currentLevel: number): number | undefined {
  return XP_LEVELS.find((l) => l.level === currentLevel + 1)?.xpRequired
}

export function progressPercent(xp: number, currentLevel: number): number {
  const next = nextLevelThreshold(currentLevel)
  if (next === undefined) return 100
  const current = XP_LEVELS.find((l) => l.level === currentLevel)?.xpRequired ?? 0
  return Math.min(100, ((xp - current) / (next - current)) * 100)
}
