import { useCallback, useEffect, useState } from 'react'

// Steps through an exercise's phases in a loop while `running` is true.
// Returns the current phase (null before the first phase starts) and a reset function.
// index -1 means "about to start": the circle stays small for a moment so
// the first inhale has something to grow from.
// Pausing stops the timer; resuming restarts the current phase from its beginning.
// Use a `key` on the calling component to restart when the exercise changes.
export function useBreathingCycle(exercise, running) {
  const [index, setIndex] = useState(-1)
  const { phases } = exercise

  useEffect(() => {
    if (!running) return
    const delay = index === -1 ? 50 : phases[index].seconds * 1000
    const timer = setTimeout(() => setIndex((index + 1) % phases.length), delay)
    return () => clearTimeout(timer)
  }, [index, phases, running])

  const reset = useCallback(() => setIndex(-1), [])

  return { phase: index === -1 ? null : phases[index], reset }
}
