import { useCallback, useEffect, useState } from 'react'

// Steps through an exercise's phases in a loop while `running` is true.
// Returns the current phase (null before the first phase starts), the number of
// completed cycles, and a reset function.
// A cycle is one full pass through every phase (e.g. in, hold, out, hold for Box).
// index -1 means "about to start": the circle stays small for a moment so
// the first inhale has something to grow from.
// Pausing stops the timer; resuming restarts the current phase from its beginning.
// Use a `key` on the calling component to restart when the exercise changes.
export function useBreathingCycle(exercise, running) {
  const [index, setIndex] = useState(-1)
  const [cycles, setCycles] = useState(0)
  const { phases } = exercise

  useEffect(() => {
    if (!running) return
    const delay = index === -1 ? 50 : phases[index].seconds * 1000
    const timer = setTimeout(() => {
      // Finishing the last phase completes a cycle
      if (index === phases.length - 1) setCycles((c) => c + 1)
      setIndex((index + 1) % phases.length)
    }, delay)
    return () => clearTimeout(timer)
  }, [index, phases, running])

  const reset = useCallback(() => {
    setIndex(-1)
    setCycles(0)
  }, [])

  return { phase: index === -1 ? null : phases[index], cycles, reset }
}
