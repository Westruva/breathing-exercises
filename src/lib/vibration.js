// Vibration patterns are [vibrate, pause, vibrate, ...] in milliseconds.
// Inhale = one long buzz, exhale = two short buzzes, holds = one tiny tick,
// so you can follow the exercise with your eyes closed.
const patterns = {
  inhale: [250],
  exhale: [100, 80, 100],
  holdIn: [40],
  holdOut: [40],
}

// Not every browser supports vibration (iPhone Safari does not), so check first.
export const canVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator

export function vibratePhase(kind) {
  if (canVibrate && patterns[kind]) navigator.vibrate(patterns[kind])
}

export function stopVibration() {
  if (canVibrate) navigator.vibrate(0)
}
