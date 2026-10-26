import { useState } from 'react'
import { exercises } from './features/exercises/exercises.js'
import SessionPage from './features/exercises/pages/SessionPage.jsx'
import HistoryPage from './features/history/pages/HistoryPage.jsx'
import AboutDropdown from './features/about/components/AboutDropdown.jsx'

export default function App() {
  const [tab, setTab] = useState('breathe') // 'breathe' | 'history'
  const [selectedId, setSelectedId] = useState(exercises[0].id)
  const [status, setStatus] = useState('idle') // 'idle' | 'running' | 'paused'
  const exercise = exercises.find((e) => e.id === selectedId)

  return (
    <main className="app">
      <h1>Breathe</h1>

      <nav className="tabs">
        <button className={tab === 'breathe' ? 'tab active' : 'tab'} onClick={() => setTab('breathe')}>
          Breathe
        </button>
        <button className={tab === 'history' ? 'tab active' : 'tab'} onClick={() => setTab('history')}>
          History
        </button>
      </nav>

      {/* The session stays mounted (just hidden) on the History tab, so a running
          session keeps going if you peek at your history. */}
      <div hidden={tab !== 'breathe'}>
        {/* Exercise can only be changed before a session starts (or after End) */}
        <div className="picker">
          {exercises.map((e) => (
            <button
              key={e.id}
              className={e.id === selectedId ? 'pick active' : 'pick'}
              disabled={status !== 'idle'}
              onClick={() => setSelectedId(e.id)}
            >
              {e.name} <span>{e.pattern}</span>
            </button>
          ))}
        </div>

        <p className="description">{exercise.description}</p>

        {/* key gives each exercise a fresh session state */}
        <SessionPage
          key={exercise.id}
          exercise={exercise}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      {tab === 'history' && <HistoryPage />}

      <AboutDropdown />
    </main>
  )
}
