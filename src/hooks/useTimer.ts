import { useEffect, useRef, useState } from 'react'

export function useTimer(initialSeconds?: number) {
  const [remaining, setRemaining] = useState(initialSeconds ?? 0)
  const [running, setRunning] = useState(false)
  const ended = useRef(false)
  useEffect(() => { setRemaining(initialSeconds ?? 0); setRunning(false); ended.current = false }, [initialSeconds])
  useEffect(() => {
    if (!running || remaining <= 0) return
    const id = window.setInterval(() => setRemaining(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(id)
  }, [running, remaining])
  useEffect(() => { if (remaining === 0 && initialSeconds && !ended.current) { ended.current = true; setRunning(false) } }, [remaining, initialSeconds])
  return { remaining, running, ended: Boolean(initialSeconds && remaining === 0 && ended.current), start: () => setRunning(true), pause: () => setRunning(false), reset: () => { setRemaining(initialSeconds ?? 0); setRunning(false); ended.current = false } }
}
