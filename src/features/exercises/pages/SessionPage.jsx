import { useEffect, useState } from 'react'
import BreathingCircle from '../components/BreathingCircle.jsx'
import { useBreathingCycle } from '../../../hooks/useBreathingCycle.js'
import { useSessionTimer } from '../../../hooks/useSessionTimer.js'
import { useStoredState } from '../../../hooks/useStoredState.js'
import { canKeepAwake, useWakeLock } from '../../../hooks/useWakeLock.js'
import { canVibrate, stopVibration, vibratePhase } from '../../../lib/vibration.js'
import { MIN_SECONDS, addSession, formatTime } from '../../history/history.js'

// status is 'idle' (not started), 'running' or 'paused'. App owns it so it can lock the picker.
export default function SessionPage({ exercise, status, onStatusChange }) {
  const running = status === 'running'
  const { phase, reset: resetCycle } = useBreathingCycle(exercise, running)
  const { seconds, reset: resetTimer } = useSessionTimer(running)
  // These two settings are remembered on the device
  const [vibrationOn, setVibrationOn] = useStoredState('breathe.vibration', true)
  const [keepAwake, setKeepAwake] = useStoredState('breathe.keepAwake', true)
  const [savedNote, setSavedNote] = useState('')

  useWakeLock(running && keepAwake)

  // Buzz at the start of every phase. vibrationOn is read at that moment, so
  // toggling the checkbox alone does not trigger a buzz.
  useEffect(() => {
    if (running && phase && vibrationOn) vibratePhase(phase.kind)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, running])

  function start() {
    setSavedNote('')
    onStatusChange('running')
  }

  function end() {
    stopVibration()
    // Very short sessions (accidental taps) are not saved
    if (seconds >= MIN_SECONDS) {
      addSession({ exerciseId: exercise.id, exerciseName: exercise.name, seconds })
      setSavedNote(`Session saved: ${exercise.name}, ${formatTime(seconds)}`)
    }
    resetCycle()
    resetTimer()
    onStatusChange('idle')
  }

  function pause() {
    stopVibration()
    onStatusChange('paused')
  }

  const label = phase ? phase.label : status === 'idle' ? 'Ready' : 'Get ready'

  return (
    <>
      <BreathingCircle phase={phase} running={running} label={label} />

      <p className="timer">{formatTime(seconds)}</p>

      <div className="controls">
        {status === 'idle' && (
          <button className="primary" onClick={start}>
            Start
          </button>
        )}
        {status === 'running' && (
          <button className="primary" onClick={pause}>
            Pause
          </button>
        )}
        {status === 'paused' && (
          <button className="primary" onClick={() => onStatusChange('running')}>
            Resume
          </button>
        )}
        {status !== 'idle' && (
          <button className="secondary" onClick={end}>
            End
          </button>
        )}
      </div>

      {savedNote && <p className="saved-note">{savedNote}</p>}

      <div className="settings">
        <label className="toggle">
          <input
            type="checkbox"
            checked={vibrationOn}
            disabled={!canVibrate}
            onChange={(e) => setVibrationOn(e.target.checked)}
          />
          {canVibrate ? 'Vibration cues' : 'Vibration not supported on this device'}
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={keepAwake}
            disabled={!canKeepAwake}
            onChange={(e) => setKeepAwake(e.target.checked)}
          />
          {canKeepAwake ? 'Keep screen awake during a session' : 'Keep-awake not supported on this device'}
        </label>
      </div>
    </>
  )
}
