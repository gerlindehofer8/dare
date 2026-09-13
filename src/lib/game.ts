import { builtInDares } from '../data/dares'
import type { Dare, GameMode, GameSettings, GameState, Player } from '../types'

const shuffle = <T,>(items: T[]) => {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

const randomCode = () =>
  Math.random().toString(36).slice(2, 7).toUpperCase()

export const scoreLevel = (
  score: number
): 1 | 2 | 3 | 4 | 5 =>
  Math.min(
    5,
    Math.floor(Math.min(99, score) / 20) + 1
  ) as 1 | 2 | 3 | 4 | 5


function levelsFor(
  mode: GameMode,
  score: number,
  max: number
): number[] {
  if (mode === 'Spicy') {
    return [2, 3, 4, 5].filter(n => n <= max)
  }

  const current = Math.min(scoreLevel(score), max)
  const roll = Math.random()

  if (roll < 0.7) {
    return [current]
  }

  if (roll < 0.9) {
    return [Math.min(max, current + 1)]
  }

  return [
    Math.max(1, current - 1),
    Math.min(max, current + 1)
  ]
}


function poolFor(
  mode: GameMode,
  own: Dare[],
  settings: GameSettings
) {
  const custom = own.filter(d => d.active !== false)

  const includeBuiltIn = mode !== 'Custom'

  const includeCustom =
    settings.ownDares &&
    (
      mode === 'Custom' ||
      mode === 'Choose' ||
      mode === 'Classic' ||
      mode === 'Spicy'
    )

  return [
    ...(includeBuiltIn ? builtInDares : []),
    ...(includeCustom ? custom : [])
  ]
}


/*
 * Prüft, ob ein Dare zum Geschlecht des Spielers passt.
 *
 * Beliebig -> jeder
 * Mann     -> nur Mann
 * Frau     -> nur Frau
 */
function matchesGender(
  dare: Dare,
  player: Player
): boolean {

  if (dare.target === 'Beliebig') {
    return true
  }

  if (dare.target === 'Mann') {
    return player.gender === 'Mann'
  }

  if (dare.target === 'Frau') {
    return player.gender === 'Frau'
  }

  return false
}


export function selectDare(
  mode: GameMode,
  own: Dare[],
  settings: GameSettings,
  score: number,
  used: string[],
  player: Player,
  previousId?: string
): {
  dare: Dare
  used: string[]
} {

  // Alle Dares, die grundsätzlich erlaubt sind.
  const all = poolFor(mode, own, settings).filter(dare => {
  const correctLevel =
    dare.spiceLevel <= settings.maxSpice

  const correctCategory =
    settings.selectedCategories.length === 0 ||
    settings.selectedCategories.includes(dare.category)

  const correctGender =
    matchesGender(dare, player)

  return correctLevel && correctCategory && correctGender
})

  // Fallback, falls durch die Einstellungen nichts übrig bleibt.
  const permitted =
    all.length > 0
      ? all
      : builtInDares.filter(
          dare =>
            dare.spiceLevel === 1 &&
            matchesGender(dare, player)
        )

  const targetLevels = levelsFor(
    mode,
    score,
    settings.maxSpice
  )

  const normal = permitted.filter(
    dare => targetLevels.includes(dare.spiceLevel)
  )

  const special = permitted.filter(
    dare => dare.isSpecial
  )

  const source =
    special.length > 0 &&
    Math.random() * 100 < settings.surpriseChance
      ? special
      : normal.length > 0
        ? normal
        : permitted

  /*
   * WICHTIG:
   * Nur Dares, die in diesem Spiel noch NICHT verwendet wurden.
   */
  let fresh = source.filter(
    dare =>
      !used.includes(dare.id) &&
      dare.id !== previousId
  )

  /*
   * Falls im bevorzugten Level keine neuen Dares mehr existieren,
   * suchen wir in allen erlaubten Dares nach einem neuen.
   */
  if (!fresh.length) {
    fresh = permitted.filter(
      dare =>
        !used.includes(dare.id) &&
        dare.id !== previousId
    )
  }

  /*
   * Falls nur noch der vorherige Dare übrig wäre,
   * darf dieser trotzdem nicht direkt wieder kommen.
   */
  if (!fresh.length) {
    fresh = permitted.filter(
      dare => !used.includes(dare.id)
    )
  }

  /*
   * Wenn wirklich ALLE Dares verbraucht wurden,
   * starten wir NICHT einfach wieder von vorne.
   *
   * Für den Test verhindern wir einen Crash und nehmen
   * den ersten erlaubten Dare.
   *
   * Bei der finalen Version können wir hier später
   * "Alle Dares gespielt" anzeigen.
   */
  if (!fresh.length) {
    const fallback = permitted.find(
      dare => dare.id !== previousId
    ) ?? permitted[0]

    return {
      dare: fallback,
      used: used
    }
  }

  const dare = shuffle(fresh)[0]

  return {
    dare,
    used: [...used, dare.id]
  }
}


export function createGame(
  players: [Player, Player],
  mode: GameMode,
  settings: GameSettings,
  own: Dare[]
): GameState {

  /*
   * WICHTIG:
   * Bei jedem neuen Spiel starten wir mit einem
   * komplett leeren usedIds-Array.
   */
  const first = selectDare(
    mode,
    own,
    settings,
    0,
    [],
    players[0]
  )

 return {
  id: crypto.randomUUID(),
  gameCode: randomCode(),
  players,
  mode,
  settings,
  round: 1,
  currentPlayerIndex: 0,
  spiceScore: 0,
  currentDare: first.dare,
  usedIds: mode === 'Choose' ? [] : first.used,
  history: [],
  completed: 0,
  streak: 0,
  paused: false,
  choosePending: mode === 'Choose',
  createdAt: new Date().toISOString()
}
}

export function choosePlayer(
  game: GameState,
  own: Dare[],
  playerIndex: 0 | 1
): GameState {
  const player = game.players[playerIndex]

  const next = selectDare(
    game.mode,
    own,
    game.settings,
    game.spiceScore,
    game.usedIds,
    player,
    game.currentDare.id
  )

  return {
    ...game,
    currentPlayerIndex: playerIndex,
    currentDare: next.dare,
    usedIds: next.used,
    choosePending: false
  }
}


export function advanceGame(
  game: GameState,
  own: Dare[],
  completed: boolean
): GameState {

  const score = Math.min(
    100,
    game.spiceScore +
      (
        completed
          ? game.currentDare.spiceValue
          : 0
      )
  )

  if (game.mode === 'Choose') {
  return {
    ...game,
    round: game.round + 1,
    spiceScore: score,
    history: [
      ...game.history,
      game.currentDare.id
    ],
    completed:
      game.completed + Number(completed),
    streak:
      completed
        ? game.streak + 1
        : 0,
    choosePending: true
  }
}

const nextPlayerIndex =
  game.currentPlayerIndex === 0
    ? 1
    : 0

const nextPlayer =
  game.players[nextPlayerIndex]

  /*
   * Neuer Dare wird anhand des Geschlechts
   * des NEUEN Spielers ausgewählt.
   */
  const next = selectDare(
    game.mode,
    own,
    game.settings,
    score,
    game.usedIds,
    nextPlayer,
    game.currentDare.id
  )

  return {
    ...game,
    round: game.round + 1,
    currentPlayerIndex: nextPlayerIndex,
    spiceScore: score,
    currentDare: next.dare,
    usedIds: next.used,
    history: [
      ...game.history,
      game.currentDare.id
    ],
    completed:
      game.completed + Number(completed),
    streak:
      completed
        ? game.streak + 1
        : 0
  }
}


export function replaceDare(
  game: GameState,
  own: Dare[]
): GameState {

  const currentPlayer =
    game.players[game.currentPlayerIndex]

  const next = selectDare(
    game.mode,
    own,
    game.settings,
    game.spiceScore,
    game.usedIds,
    currentPlayer,
    game.currentDare.id
  )

  return {
    ...game,
    currentDare: next.dare,
    usedIds: next.used
  }
}