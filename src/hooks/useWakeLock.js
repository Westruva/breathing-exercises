import { useEffect } from 'react'

// Not every browser has the Screen Wake Lock API.
export const canKeepAwake = typeof navigator !== 'undefined' && 'wakeLock' in navigator

// Keeps the screen on while `active` is true.
// The browser drops the lock whenever the page is hidden (e.g. you switch apps),
// so we ask for it again when the page becomes visible.
export function useWakeLock(active) {
  useEffect(() => {
    if (!active || !canKeepAwake) return

    let lock = null
    let cancelled = false

    async function acquire() {
      if (lock && !lock.released) return
      try {
        const sentinel = await navigator.wakeLock.request('screen')
        if (cancelled) sentinel.release()
        else lock = sentinel
      } catch {
        // Denied (e.g. battery saver): the session still works, the screen may just sleep
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === 'visible') acquire()
    }

    acquire()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (lock) lock.release()
    }
  }, [active])
}
