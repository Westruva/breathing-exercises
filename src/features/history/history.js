import { readJson, writeJson } from '../../lib/storage.js'

const KEY = 'breathe.history'
const MAX_RECORDS = 500 // keeps storage small; oldest are dropped first

// Sessions shorter than this are not worth recording (an accidental Start/End tap)
export const MIN_SECONDS = 10

// Newest first. Each record: { id, date (ISO string), exerciseId, exerciseName, seconds }
export function loadHistory() {
  const records = readJson(KEY, [])
  return Array.isArray(records) ? records : []
}

export function addSession({ exerciseId, exerciseName, seconds }) {
  const record = {
    id: Date.now(),
    date: new Date().toISOString(),
    exerciseId,
    exerciseName,
    seconds,
  }
  writeJson(KEY, [record, ...loadHistory()].slice(0, MAX_RECORDS))
  return record
}

export function clearHistory() {
  writeJson(KEY, [])
}

export function summarize(records) {
  const totalSeconds = records.reduce((sum, r) => sum + r.seconds, 0)
  return { sessions: records.length, totalMinutes: Math.round(totalSeconds / 60) }
}

// 125 seconds -> "02:05"
export function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const s = String(totalSeconds % 60).padStart(2, '0')
  return `${m}:${s}`
}
