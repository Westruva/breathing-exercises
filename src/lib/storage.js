// Small wrappers around localStorage. Storage can be blocked (private mode) or hold
// broken data, so every call is wrapped and falls back instead of crashing the app.
export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore: the app still works, the value just won't be remembered
  }
}
