import { readJson, writeJson } from '../../lib/storage.js'

const KEY = 'breathe.history'
const MAX_RECORDS = 500 // keeps storage small; oldest are dropped first

// Newest first. Each record: { id, date (ISO string), exerciseId, exerciseName, seconds, cycles }
// (records saved by an earlier version have no `cycles`)
export function loadHistory() {
  const records = readJson(KEY, [])
  return Array.isArray(records) ? records : []
}

export function addSession({ exerciseId, exerciseName, seconds, cycles }) {
  const record = {
    id: Date.now(),
    date: new Date().toISOString(),
    exerciseId,
    exerciseName,
    seconds,
    cycles,
  }
  writeJson(KEY, [record, ...loadHistory()].slice(0, MAX_RECORDS))
  return record
}

export function clearHistory() {
  writeJson(KEY, [])
}

export function summarize(records) {
  const totalSeconds = records.reduce((sum, r) => sum + r.seconds, 0)
  const totalCycles = records.reduce((sum, r) => sum + (r.cycles || 0), 0)
  return { sessions: records.length, totalCycles, totalMinutes: Math.round(totalSeconds / 60) }
}

// 125 seconds -> "02:05"
export function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const s = String(totalSeconds % 60).padStart(2, '0')
  return `${m}:${s}`
}
