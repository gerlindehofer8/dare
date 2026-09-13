import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { categories } from './data/dares'
import { advanceGame, createGame, choosePlayer, replaceDare, scoreLevel } from './lib/game'
import { defaultSettings, readStore, writeStore } from './lib/storage'
import { supabase } from './lib/supabase'
import { cloudIdentity, deleteCloudDare, fetchCloudDares, requestMagicLink, signOutCloud, syncCloudDares } from './services/customDares'
import { useTimer } from './hooks/useTimer'
import type { Category, Dare, GameMode, GameSettings, GameState, Gender, Player, Target } from './types'

type View = 'home' | 'setup' | 'game' | 'dares' | 'settings' | 'join'
const genders: Gender[] = ['Mann', 'Frau',]
const modes: { mode: GameMode; hint: string }[] = [
  { mode: 'Classic', hint: 'Steigt natürlich an' }, { mode: 'Custom', hint: 'Nur eure eigenen Dares' },
  { mode: 'Choose', hint: 'Ihr entscheidet, wer dran ist' }, { mode: 'Spicy', hint: 'Direkt ab Level 2' }
]
const initialPlayer = (): Player => ({ name: '', gender: 'Mann', skips: 3 })
const labelForLevel = (n: number) => ['Cute', 'Flirty', 'Spicy', 'Hot', 'Very Hot'][n - 1]
function playGentleChime() {
  try {
    const context = new AudioContext()
    const now = context.currentTime
    ;[523.25, 659.25].forEach((frequency, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const start = now + index * 0.16
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.045, start + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.48)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(start)
      oscillator.stop(start + 0.5)
    })
    window.setTimeout(() => void context.close(), 800)
  } catch { /* Audio is optional and may be blocked by the browser. */ }
}

function App() {
  const [stored] = useState(readStore)
  const [view, setView] = useState<View>(stored.activeGame ? 'home' : 'home')
  const [game, setGame] = useState<GameState | null>(stored.activeGame)
  const [customDares, setCustomDares] = useState<Dare[]>(stored.customDares)
  const [preferences, setPreferences] = useState<GameSettings>(stored.preferences)
  const [notice, setNotice] = useState('')
  const cloudReady = useRef(false)
  useEffect(() => writeStore({ version: 2, activeGame: game, customDares, preferences }), [game, customDares, preferences])
  useEffect(() => {
    if (!supabase) return
    const refreshCloud = () => void Promise.all([cloudIdentity(), fetchCloudDares()]).then(([identity, remote]) => {
      if (!remote) return
      cloudReady.current = true
      setCustomDares(local => identity ? remote : Array.from(new Map([...remote, ...local].map(dare => [dare.id, dare])).values()))
    })
    refreshCloud()
    const { data } = supabase.auth.onAuthStateChange(() => window.setTimeout(refreshCloud, 0))
    return () => data.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!supabase || view !== 'dares') return
    let active = true
    const refreshDares = () => void Promise.all([cloudIdentity(), fetchCloudDares()]).then(([identity, remote]) => {
      if (!active || !remote) return
      setCustomDares(local => identity ? remote : Array.from(new Map([...remote, ...local].map(dare => [dare.id, dare])).values()))
    })
    refreshDares()
    const interval = window.setInterval(refreshDares, 5000)
    return () => { active = false; window.clearInterval(interval) }
  }, [view])
  useEffect(() => { if (supabase && cloudReady.current) void syncCloudDares(customDares) }, [customDares])
  const go = (next: View) => { setNotice(''); setView(next) }
  const show = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 3200) }
  const start = (players: [Player, Player], mode: GameMode, settings: GameSettings) => { const next = createGame(players, mode, settings, customDares); setGame(next); setView('game') }
  if (view === 'setup') return <Setup initial={preferences} hasCustomDares={customDares.some(d => d.active !== false)} onBack={() => go('home')} onStart={start} />
  if (view === 'game' && game) return <Game game={game} customDares={customDares} setGame={setGame} onHome={() => go('home')} announce={show} />
  if (view === 'dares') return <DareManager dares={customDares} setDares={setCustomDares} onDelete={id => { setCustomDares(dares => dares.filter(dare => dare.id !== id)); void deleteCloudDare(id) }} onBack={() => go('home')} />
  if (view === 'settings') return <Settings value={preferences} onChange={setPreferences} onBack={() => go('home')} />
  if (view === 'join') return <Join game={game} onBack={() => go('home')} onOpen={() => go('game')} />
  return <Home game={game} onGo={go} notice={notice} backend={Boolean(supabase)} />
}

function Shell({ children }: { children: ReactNode }) { return <main className="shell"><div className="brand" aria-label="Couple Dare">COUPLE <i>DARE</i></div>{children}</main> }
function Home({ game, onGo, notice, backend }: { game: GameState | null; onGo: (v: View) => void; notice: string; backend: boolean }) {
  return <Shell><section className="hero"><p className="eyebrow">FOR TWO · 18+</p><h1>Wie mutig<br />seid ihr?</h1><p className="muted">Ein Spiel für Nähe, Lachen und freiwillige Momente.</p><div className="home-actions"><button className="primary" onClick={() => onGo('setup')}>Neues Spiel starten <span>→</span></button>{game && <button className="secondary" onClick={() => onGo('game')}>Spiel fortsetzen <small>Code {game.gameCode}</small></button>}<button className="ghost" onClick={() => onGo('dares')}>Meine Dares</button><button className="ghost" onClick={() => onGo('join')}>Spiel beitreten</button><button className="ghost" onClick={() => onGo('settings')}>Einstellungen</button></div></section><footer><span>Immer freiwillig. Jederzeit überspringbar.</span><span>{backend ? 'Sync bereit' : 'Privat auf diesem Gerät gespeichert'}</span></footer>{notice && <div className="toast" role="status">{notice}</div>}</Shell>
}

function Setup({ initial, hasCustomDares, onBack, onStart }: { initial: GameSettings; hasCustomDares: boolean; onBack: () => void; onStart: (p: [Player, Player], m: GameMode, s: GameSettings) => void }) {
  const [step, setStep] = useState(1); const [players, setPlayers] = useState<[Player, Player]>([initialPlayer(), initialPlayer()]); const [mode, setMode] = useState<GameMode>('Classic'); const [settings, setSettings] = useState(initial); const [error, setError] = useState('')
  const updatePlayer = (index: 0 | 1, field: keyof Player, value: string | number) => setPlayers(old => { const copy = [...old] as [Player, Player]; copy[index] = { ...copy[index], [field]: value }; return copy })
  const next = () => { if (step < 3 && !players[step - 1].name.trim()) return setError('Bitte gib einen Namen ein.'); setError(''); setStep(s => s + 1) }
  return <Shell><header className="page-head"><button className="icon-button" onClick={onBack} aria-label="Zurück">←</button><span>NEUES SPIEL</span><b>Schritt {step}/4</b></header><div className="progress-line"><span style={{ width: `${step * 25}%` }} /></div>
    {step <= 2 && <section className="setup-card"><p className="eyebrow">SPIELER {step}</p><h2>Wer spielt mit?</h2><label>Name<input autoFocus value={players[step - 1].name} onChange={e => updatePlayer((step - 1) as 0 | 1, 'name', e.target.value)} placeholder={step === 1 ? 'z. B. Alex' : 'z. B. Sam'} maxLength={24} /></label><label>Geschlecht<select value={players[step - 1].gender} onChange={e => updatePlayer((step - 1) as 0 | 1, 'gender', e.target.value as Gender)}>{genders.map(g => <option key={g}>{g}</option>)}</select></label>{error && <p className="error">{error}</p>}<button className="primary" onClick={next}>Weiter →</button></section>}
    {step === 3 && <section className="setup-card"><p className="eyebrow">SPIELMODUS</p><h2>Welche Stimmung?</h2><div className="mode-grid">{modes.map(item => <button key={item.mode} className={mode === item.mode ? 'mode selected' : 'mode'} onClick={() => { setMode(item.mode); setError('') }}><strong>{item.mode}</strong><small>{item.hint}</small></button>)}</div>{error && <p className="error">{error}</p>}<button className="primary" onClick={() => { if (mode === 'Custom' && !hasCustomDares) return setError('Erstellt zuerst mindestens eine aktive eigene Dare.'); setStep(4) }}>Weiter →</button></section>}
    {step === 4 && <section className="setup-card"><p className="eyebrow">EUER ABEND</p><h2>Feintuning</h2><label>Maximales Spice-Level<div className="level-picks">{[1, 2, 3, 4, 5].map(n => <button key={n} className={settings.maxSpice === n ? 'selected' : ''} onClick={() => setSettings(s => ({ ...s, maxSpice: n as GameSettings['maxSpice'] }))}>{n}</button>)}</div></label><Toggle label="Timer anzeigen" checked={settings.timerEnabled} onChange={v => setSettings(s => ({ ...s, timerEnabled: v }))} /><Toggle label="Eigene Dares einbeziehen" checked={settings.ownDares} onChange={v => setSettings(s => ({ ...s, ownDares: v }))} /><Toggle label="Unbegrenzte Skips" checked={settings.unlimitedSkips} onChange={v => setSettings(s => ({ ...s, unlimitedSkips: v }))} /><p className="consent">Nur für Erwachsene. Spielt ausschließlich freiwillig – ein „Nein“ ist immer genug.</p><button className="primary" onClick={() => onStart(players, mode, settings)}>GAME STARTEN ✦</button></section>}
  </Shell>
}

function Game({ game, customDares, setGame, onHome, announce }: { game: GameState; customDares: Dare[]; setGame: (g: GameState) => void; onHome: () => void; announce: (s: string) => void }) {
  const timer = useTimer(game.settings.timerEnabled && game.currentDare.isTimer ? game.currentDare.duration : undefined)
  const soundedFor = useRef('')
  useEffect(() => {
    const timerKey = `${game.currentDare.id}-${game.round}`
    if (timer.ended && game.settings.sound && soundedFor.current !== timerKey) {
      soundedFor.current = timerKey
      playGentleChime()
    }
  }, [game.currentDare.id, game.round, game.settings.sound, timer.ended])
  const player = game.players[game.currentPlayerIndex];const partner =
  game.players[game.currentPlayerIndex === 0 ? 1 : 0]

const dareText = game.currentDare.text
  .replace(/deinem Partner/gi, partner.name)
  .replace(/deinen Partner/gi, partner.name)
  .replace(/dein Partner/gi, partner.name); const level = scoreLevel(game.spiceScore)
if (game.mode === 'Choose' && game.choosePending) {
  return (
    <Shell>
      <header className="game-head">
        <button
          className="icon-button"
          onClick={onHome}
          aria-label="Zur Startseite"
        >
          ⌂
        </button>

        <div>
          <b>RUNDE {game.round}</b>
          <small>
            {game.mode} · Code {game.gameCode}
          </small>
        </div>

        <div style={{ width: 38 }} />
      </header>

      <section className="choose-turn">
        <div className="turn">
          <p>NÄCHSTE RUNDE</p>
          <h1>Wer ist dran?</h1>
        </div>

        <div className="choose-players">
          {game.players.map((p, index) => (
            <button
              key={index}
              className="choose-player"
              onClick={() => {
                const next = choosePlayer(
                  game,
                  customDares,
                  index as 0 | 1
                )

                setGame(next)
                announce(`${p.name} ist dran.`)
              }}
            >
              <span>{p.name}</span>
              <small>Ich bin dran</small>
            </button>
          ))}
        </div>
      </section>
    </Shell>
  )
}
  const formatted = `${Math.floor(timer.remaining / 60).toString().padStart(2, '0')}:${(timer.remaining % 60).toString().padStart(2, '0')}`
  const proceed = (done: boolean) => { if (!done && !game.settings.unlimitedSkips && player.skips <= 0) return announce(`${player.name} hat keine Skips mehr.`); let current = game; if (!done && !game.settings.unlimitedSkips) { const players = [...game.players] as [Player, Player]; players[game.currentPlayerIndex] = { ...player, skips: player.skips - 1 }; current = { ...game, players } } const next = advanceGame(current, customDares, done); setGame(next); announce(done ? `Jetzt ist ${next.players[next.currentPlayerIndex].name} dran.` : 'Übersprungen – ganz ohne Druck.'); }
  if (game.paused) return <Shell><section className="pause"><p className="eyebrow">PAUSE</p><h1>Ganz in eurem Tempo.</h1><p className="muted">Sprecht miteinander. Ihr müsst nichts tun, was sich nicht gut anfühlt.</p><button className="primary" onClick={() => setGame({ ...game, paused: false })}>Spiel fortsetzen</button><button className="ghost" onClick={onHome}>Zur Startseite</button></section></Shell>
  return <Shell><header className="game-head"><button className="icon-button" onClick={() => setGame({ ...game, paused: true })} aria-label="Spiel pausieren">Ⅱ</button><div><b>RUNDE {game.round}</b><small>{game.mode} · Code {game.gameCode}</small></div><button className="icon-button" onClick={onHome} aria-label="Zur Startseite">⌂</button></header><section className="turn"><p>{player.name.toUpperCase()}</p><h1>Du bist dran</h1></section><div className="spice"><div><span>SPICE PROGRESS</span><b>{game.spiceScore}%</b></div><div className="spice-bar"><i style={{ width: `${game.spiceScore}%` }} /></div><p>Level {level} · {labelForLevel(level)}</p></div><article className={game.settings.animations ? 'dare-card reveal' : 'dare-card'}><div className="dare-meta"><span>{game.currentDare.isSpecial ? '✦ SURPRISE DARE' : game.currentDare.category}</span><span>LEVEL {game.currentDare.spiceLevel}</span></div><h2>{dareText}</h2>{game.currentDare.description && <p>{game.currentDare.description}</p>}{game.currentDare.isTimer && game.settings.timerEnabled && <div className="timer"><strong>{formatted}</strong>{timer.ended && <b className="timeup">Time’s up! ✦</b>}<div><button onClick={timer.running ? timer.pause : timer.start}>{timer.running ? 'Pause' : 'Start'}</button><button onClick={timer.reset}>Zurücksetzen</button></div></div>}</article><div className="game-actions"><button className="primary" onClick={() => proceed(true)}>Geschafft <span>✓</span></button><button className="secondary" onClick={() => proceed(false)}>Überspringen {game.settings.unlimitedSkips ? '' : `· ${player.skips} ○`}</button><button className="ghost" onClick={() => setGame(replaceDare(game, customDares))}>Neue Aufgabe</button></div><div className="stats"><span>✦ {game.completed} erledigt</span><span>⚡ {game.streak} Streak</span></div>{game.completed > 0 && game.completed % 10 === 0 && <p className="achievement">{game.completed} Dares geschafft! Ihr seid im Flow. ✦</p>}</Shell>
}

function DareManager({ dares, setDares, onDelete, onBack }: { dares: Dare[]; setDares: (d: Dare[]) => void; onDelete: (id: string) => void; onBack: () => void }) {
  const [filter, setFilter] = useState<number>(0); const [category, setCategory] = useState<Category | 'Alle'>('Alle'); const [editing, setEditing] = useState<Dare | null>(null)
  const visible = useMemo(() => dares.filter(d => (!filter || d.spiceLevel === filter) && (category === 'Alle' || d.category === category)), [dares, filter, category])
  const save = (dare: Dare) => { setDares(dares.some(d => d.id === dare.id) ? dares.map(d => d.id === dare.id ? dare : d) : [...dares, dare]); setEditing(null) }
  return <Shell><header className="page-head"><button className="icon-button" onClick={onBack} aria-label="Zurück">←</button><span>MEINE DARES</span><button className="small-primary" onClick={() => setEditing({ id: crypto.randomUUID(), text: '', category: 'Romantic', spiceLevel: 1, target: 'Beliebig', isTimer: false, isSpecial: false, spiceValue: 3, isCustom: true, active: true })}>+ Erstellen</button></header>{editing ? <DareForm dare={editing} onSave={save} onCancel={() => setEditing(null)} /> : <><div className="filters"><select value={filter} onChange={e => setFilter(Number(e.target.value))}><option value="0">Alle Level</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>Level {n}</option>)}</select><select value={category} onChange={e => setCategory(e.target.value as Category | 'Alle')}><option>Alle</option>{categories.map(c => <option key={c}>{c}</option>)}</select></div>{visible.length ? <div className="dare-list">{visible.map(d => <article key={d.id} className={d.active === false ? 'mini-dare inactive' : 'mini-dare'}><div><b>Level {d.spiceLevel} · {d.category}</b><p>{d.text}</p>{d.duration && <small>⏱ {d.duration} Sek.</small>}</div><div className="mini-actions"><button onClick={() => setDares(dares.map(x => x.id === d.id ? { ...x, active: x.active === false } : x))}>{d.active === false ? 'Aktivieren' : 'Deaktivieren'}</button><button onClick={() => setEditing(d)}>Bearbeiten</button><button className="danger" onClick={() => onDelete(d.id)}>Löschen</button></div></article>)}</div> : <section className="empty"><h2>Noch keine eigenen Dares.</h2><p>Erstellt etwas, das genau zu euch passt.</p><button className="primary" onClick={() => setEditing({ id: crypto.randomUUID(), text: '', category: 'Romantic', spiceLevel: 1, target: 'Beliebig', isTimer: false, isSpecial: false, spiceValue: 3, isCustom: true, active: true })}>Erste Dare erstellen</button></section>}</>}</Shell>
}

function DareForm({ dare, onSave, onCancel }: { dare: Dare; onSave: (d: Dare) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState(dare); const submit = (e: FormEvent) => { e.preventDefault(); if (draft.text.trim()) onSave({ ...draft, text: draft.text.trim(), spiceValue: draft.spiceLevel * 3 + (draft.isSpecial ? 3 : 0) }) }
  return <form className="setup-card dare-form" onSubmit={submit}><h2>Eigene Dare</h2><label>Dare-Text<textarea value={draft.text} onChange={e => setDraft({ ...draft, text: e.target.value })} placeholder="Umarme deinen Partner für 60 Sekunden." required maxLength={280} /></label><label>Beschreibung (optional)<input value={draft.description ?? ''} onChange={e => setDraft({ ...draft, description: e.target.value })} maxLength={180} /></label><div className="two-col"><label>Kategorie<select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value as Category })}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Spice<select value={draft.spiceLevel} onChange={e => setDraft({ ...draft, spiceLevel: Number(e.target.value) as Dare['spiceLevel'] })}>{[1,2,3,4,5].map(n => <option key={n} value={n}>Level {n}</option>)}</select></label></div><div className="two-col"><label>Zielperson<select value={draft.target} onChange={e => setDraft({ ...draft, target: e.target.value as Target })}>{(['Mann','Frau','Beliebig'] as Target[]).map(x => <option key={x}>{x}</option>)}</select></label><label>Timer (Sek.)<input type="number" min="0" max="3600" value={draft.duration ?? ''} onChange={e => { const duration = Number(e.target.value) || undefined; setDraft({ ...draft, duration, isTimer: Boolean(duration) }) }} /></label></div><Toggle label="Surprise Dare" checked={draft.isSpecial} onChange={v => setDraft({ ...draft, isSpecial: v })} /><div className="form-actions"><button type="button" className="ghost" onClick={onCancel}>Abbrechen</button><button className="primary">Speichern</button></div></form>
}

function Settings({ value, onChange, onBack }: { value: GameSettings; onChange: (s: GameSettings) => void; onBack: () => void }) {
  const update = <K extends keyof GameSettings>(key: K, val: GameSettings[K]) => onChange({ ...value, [key]: val } as GameSettings)
  const [email, setEmail] = useState(''); const [identity, setIdentity] = useState<string | null>(null); const [syncMessage, setSyncMessage] = useState('')
  useEffect(() => { void cloudIdentity().then(setIdentity) }, [])
  const sendLink = async (event: FormEvent) => { event.preventDefault(); const error = await requestMagicLink(email.trim()); setSyncMessage(error ? `Der Link konnte nicht gesendet werden: ${error}` : 'Link gesendet. Öffne ihn auf diesem Gerät, um die Synchronisierung zu verbinden.') }
  const logout = async () => { await signOutCloud(); setIdentity(null); setSyncMessage('Dieses Gerät ist abgemeldet.') }
  return <Shell><header className="page-head"><button className="icon-button" onClick={onBack} aria-label="Zurück">←</button><span>EINSTELLUNGEN</span><span /></header><section className="settings"><h2>Deine Standard-Einstellungen</h2><Toggle label="Timer aktivieren" checked={value.timerEnabled} onChange={v => update('timerEnabled', v)} /><Toggle label="Eigene Dares aktivieren" checked={value.ownDares} onChange={v => update('ownDares', v)} /><Toggle label="Unbegrenzte Skips" checked={value.unlimitedSkips} onChange={v => update('unlimitedSkips', v)} /><Toggle label="Soundeffekte" checked={value.sound} onChange={v => update('sound', v)} /><Toggle label="Animationen" checked={value.animations} onChange={v => update('animations', v)} /><label>Überraschungs-Dares: {value.surpriseChance}%<input type="range" min="0" max="30" value={value.surpriseChance} onChange={e => update('surpriseChance', Number(e.target.value))} /></label><fieldset><legend>Kategorien (leer = alle)</legend><div className="chips">{categories.map(c => <button type="button" key={c} className={value.selectedCategories.includes(c) ? 'chip selected' : 'chip'} onClick={() => update('selectedCategories', value.selectedCategories.includes(c) ? value.selectedCategories.filter(x => x !== c) : [...value.selectedCategories, c])}>{c}</button>)}</div></fieldset><CloudSync identity={identity} email={email} setEmail={setEmail} message={syncMessage} onSend={sendLink} onLogout={logout} /><button className="secondary" onClick={() => onChange(defaultSettings)}>Standard wiederherstellen</button></section></Shell>
}
function CloudSync({ identity, email, setEmail, message, onSend, onLogout }: { identity: string | null; email: string; setEmail: (s: string) => void; message: string; onSend: (e: FormEvent) => void; onLogout: () => void }) {
  if (!supabase) return <section className="cloud-sync"><b>Cloud-Sync</b><p>Supabase ist für diesen Deploy noch nicht eingerichtet.</p></section>
  return <section className="cloud-sync"><b>Cloud-Sync für eigene Dares</b>{identity ? <><p>Verbunden als <strong>{identity}</strong>. Eigene Dares erscheinen auf allen Geräten, auf denen du dich mit dieser E-Mail anmeldest.</p><button type="button" className="ghost" onClick={onLogout}>Abmelden</button></> : <form onSubmit={onSend}><p>Melde dich auf beiden Geräten mit derselben E-Mail an.</p><label>E-Mail-Adresse<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@beispiel.de" required /></label><button className="primary">Anmeldelink senden</button></form>}{message && <p className="sync-message" role="status">{message}</p>}</section>
}
function Join({ game, onBack, onOpen }: { game: GameState | null; onBack: () => void; onOpen: () => void }) { const [code, setCode] = useState(''); const [error, setError] = useState(''); const join = () => { if (game && code.toUpperCase() === game.gameCode) onOpen(); else setError('Auf diesem Gerät wurde kein passendes Spiel gefunden. Online-Beitritt wird mit Supabase aktiviert.') }; return <Shell><header className="page-head"><button className="icon-button" onClick={onBack} aria-label="Zurück">←</button><span>SPIEL BEITRETEN</span><span /></header><section className="setup-card"><p className="eyebrow">GAME CODE</p><h2>Seid ihr bereit?</h2><label>Code<input value={code} onChange={e => setCode(e.target.value.toUpperCase())} maxLength={5} placeholder="X7K92" /></label>{error && <p className="error">{error}</p>}<button className="primary" onClick={join}>Beitreten →</button></section></Shell> }
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="toggle"><span>{label}</span><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} /><i aria-hidden="true" /></label> }
export default App
