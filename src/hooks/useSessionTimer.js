import { useCallback, useEffect, useState } from 'react'

// Counts whole seconds while `running` is true. Paused time is not counted.
export function useSessionTimer(running) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [running])

  const reset = useCallback(() => setSeconds(0), [])

  return { seconds, reset }
}
