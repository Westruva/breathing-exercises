import { useState } from 'react'
import { clearHistory, formatTime, loadHistory, summarize } from '../history.js'

const SHOWN = 20 // most recent sessions listed

export default function HistoryPage() {
  const [records, setRecords] = useState(loadHistory)
  const { sessions, totalCycles, totalMinutes } = summarize(records)

  function handleClear() {
    if (window.confirm('Delete all your session history? This cannot be undone.')) {
      clearHistory()
      setRecords([])
    }
  }

  if (records.length === 0) {
    return <p className="empty">No sessions yet. Finish a session with End and it will appear here.</p>
  }

  return (
    <>
      <div className="stats">
        <div>
          <strong>{sessions}</strong>
          <span>{sessions === 1 ? 'session' : 'sessions'}</span>
        </div>
        <div>
          <strong>{totalCycles}</strong>
          <span>{totalCycles === 1 ? 'cycle' : 'cycles'}</span>
        </div>
        <div>
          <strong>{totalMinutes === 0 ? '<1' : totalMinutes}</strong>
          <span>total minutes</span>
        </div>
      </div>

      <ul className="history-list">
        {records.slice(0, SHOWN).map((r) => (
          <li key={r.id}>
            <div>
              <strong>{r.exerciseName}</strong>
              <span>
                {new Date(r.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                {r.cycles ? ` · ${r.cycles} ${r.cycles === 1 ? 'cycle' : 'cycles'}` : ''}
              </span>
            </div>
            <span className="duration">{formatTime(r.seconds)}</span>
          </li>
        ))}
      </ul>
      {records.length > SHOWN && <p className="empty">Showing the latest {SHOWN} of {records.length}.</p>}

      <button className="danger" onClick={handleClear}>
        Clear history
      </button>
    </>
  )
}
