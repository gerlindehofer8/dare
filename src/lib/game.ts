import { builtInDares } from '../data/dares'
import type { Dare, GameMode, GameSettings, GameState, Player } from '../types'

const shuffle = <T,>(items: T[]) => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]] }
  return result
}
const randomCode = () => Math.random().toString(36).slice(2, 7).toUpperCase()
export const scoreLevel = (score: number): 1 | 2 | 3 | 4 | 5 => Math.min(5, Math.floor(Math.min(99, score) / 20) + 1) as 1 | 2 | 3 | 4 | 5

function levelsFor(mode: GameMode, score: number, max: number): number[] {
  if (mode === 'Random') return Array.from({ length: max }, (_, i) => i + 1)
  if (mode === 'Chill') return [1, 2].filter(n => n <= max)
  if (mode === 'Spicy') return [2, 3, 4, 5].filter(n => n <= max)
  const current = Math.min(scoreLevel(score), max)
  const roll = Math.random()
  if (roll < .7) return [current]
  if (roll < .9) return [Math.min(max, current + 1)]
  return [Math.max(1, current - 1), Math.min(max, current + 1)]
}
function poolFor(mode: GameMode, own: Dare[], settings: GameSettings) {
  const custom = own.filter(d => d.active !== false)
  const includeBuiltIn = mode !== 'Custom'
  const includeCustom = settings.ownDares && (mode === 'Custom' || mode === 'Mixed' || mode === 'Classic' || mode === 'Random' || mode === 'Chill' || mode === 'Spicy')
  return [...(includeBuiltIn ? builtInDares : []), ...(includeCustom ? custom : [])]
}
export function selectDare(mode: GameMode, own: Dare[], settings: GameSettings, score: number, used: string[], previousId?: string): { dare: Dare; used: string[] } {
  const all = poolFor(mode, own, settings).filter(d => d.spiceLevel <= settings.maxSpice && (settings.selectedCategories.length === 0 || settings.selectedCategories.includes(d.category)))
  const permitted = all.length ? all : builtInDares.filter(d => d.spiceLevel === 1)
  const targetLevels = levelsFor(mode, score, settings.maxSpice)
  const normal = permitted.filter(d => targetLevels.includes(d.spiceLevel))
  const special = permitted.filter(d => d.isSpecial)
  const source = special.length && Math.random() * 100 < settings.surpriseChance ? special : (normal.length ? normal : permitted)
  let fresh = source.filter(d => !used.includes(d.id) && d.id !== previousId)
  let nextUsed = used
  if (!fresh.length) {
    const reset = source.length > 1 ? source.filter(d => d.id !== previousId) : source
    fresh = reset.length ? reset : permitted
    nextUsed = []
  }
  const dare = shuffle(fresh)[0]
  return { dare, used: [...nextUsed, dare.id] }
}
export function createGame(players: [Player, Player], mode: GameMode, settings: GameSettings, own: Dare[]): GameState {
  const first = selectDare(mode, own, settings, 0, [])
  return { id: crypto.randomUUID(), gameCode: randomCode(), players, mode, settings, round: 1, currentPlayerIndex: 0, spiceScore: 0, currentDare: first.dare, usedIds: first.used, history: [], completed: 0, streak: 0, paused: false, createdAt: new Date().toISOString() }
}
export function advanceGame(game: GameState, own: Dare[], completed: boolean): GameState {
  const score = Math.min(100, game.spiceScore + (completed ? game.currentDare.spiceValue : 0))
  const next = selectDare(game.mode, own, game.settings, score, game.usedIds, game.currentDare.id)
  return { ...game, round: game.round + 1, currentPlayerIndex: game.currentPlayerIndex === 0 ? 1 : 0, spiceScore: score, currentDare: next.dare, usedIds: next.used, history: [...game.history, game.currentDare.id], completed: game.completed + Number(completed), streak: completed ? game.streak + 1 : 0 }
}
export function replaceDare(game: GameState, own: Dare[]): GameState {
  const next = selectDare(game.mode, own, game.settings, game.spiceScore, game.usedIds, game.currentDare.id)
  return { ...game, currentDare: next.dare, usedIds: next.used }
}
