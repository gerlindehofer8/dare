import type { Dare, GameSettings, GameState } from '../types'

const key = 'couple-dare-v1'
export interface StoredData { version: number; customDares: Dare[]; activeGame: GameState | null; preferences: GameSettings }

export const defaultSettings: GameSettings = {
  maxSpice: 5, timerEnabled: true, ownDares: true, selectedCategories: [], unlimitedSkips: false,
  sound: true, animations: true, language: 'de', surpriseChance: 10
}

export function readStore(): StoredData {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return { version: 2, customDares: [], activeGame: null, preferences: defaultSettings }
    const parsed = JSON.parse(raw) as Partial<StoredData>
    const preferences = { ...defaultSettings, ...parsed.preferences }
    if (!parsed.version) preferences.sound = true
    return { version: 2, customDares: parsed.customDares ?? [], activeGame: parsed.activeGame ?? null, preferences }
  } catch { return { version: 2, customDares: [], activeGame: null, preferences: defaultSettings } }
}
export function writeStore(data: StoredData) { localStorage.setItem(key, JSON.stringify(data)) }
