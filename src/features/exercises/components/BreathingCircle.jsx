import { useLayoutEffect, useRef, useState } from 'react'

const SMALL = 0.55
const BIG = 1

// Circle is big while breathing in / holding full, small while breathing out / holding empty.
// It only animates during inhale and exhale; holds keep the size still.
function sizeFor(phase) {
  if (!phase) return { scale: SMALL, seconds: 0.4 }
  switch (phase.kind) {
    case 'inhale':
      return { scale: BIG, seconds: phase.seconds }
    case 'holdIn':
      return { scale: BIG, seconds: 0 }
    case 'exhale':
      return { scale: SMALL, seconds: phase.seconds }
    default:
      return { scale: SMALL, seconds: 0 }
  }
}

// onToggle is called when the circle is tapped (start / pause / resume is decided by the parent)
export default function BreathingCircle({ phase, running, label, onToggle, actionLabel }) {
  const circleRef = useRef(null)
  // Size the circle had at the moment of pausing (null while running)
  const [frozenScale, setFrozenScale] = useState(null)

  // When paused, read the circle's current (mid-animation) size and hold it there.
  // Runs before the browser paints, so there is no visible jump.
  useLayoutEffect(() => {
    if (running) {
      setFrozenScale(null)
    } else if (phase) {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(circleRef.current).transform)
      setFrozenScale(matrix.a) // 'a' is the horizontal scale factor
    }
    // Only re-run when running changes; phase changes while paused don't happen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const frozen = !running && phase && frozenScale !== null
  const { scale, seconds } = frozen ? { scale: frozenScale, seconds: 0 } : sizeFor(phase)

  return (
    <div className="circle-wrap">
      {/* The button keeps a fixed size; only the circle inside it scales */}
      <button type="button" className="circle-button" onClick={onToggle} aria-label={actionLabel}>
        <div
          ref={circleRef}
          className="circle"
          style={{
            transform: `scale(${scale})`,
            transition: `transform ${seconds}s ease-in-out`,
          }}
        />
      </button>
      <p className="circle-label">{label}</p>
    </div>
  )
}
