// Each exercise is a list of phases that repeat in a loop.
// kind: 'inhale' | 'holdIn' (hold with full lungs) | 'exhale' | 'holdOut' (hold with empty lungs)
// seconds: how long the phase lasts.
export const exercises = [
  {
    id: 'box',
    name: 'Box breathing',
    pattern: '4-4-4-4',
    description: 'Equal breath in, hold, out, hold. Steadies the mind and helps with focus.',
    phases: [
      { kind: 'inhale', label: 'Breathe in', seconds: 4 },
      { kind: 'holdIn', label: 'Hold', seconds: 4 },
      { kind: 'exhale', label: 'Breathe out', seconds: 4 },
      { kind: 'holdOut', label: 'Hold', seconds: 4 },
    ],
  },
  {
    id: '478',
    name: '4-7-8 breathing',
    pattern: '4-7-8',
    description: 'A long exhale and a long hold. Often used to wind down before sleep.',
    phases: [
      { kind: 'inhale', label: 'Breathe in', seconds: 4 },
      { kind: 'holdIn', label: 'Hold', seconds: 7 },
      { kind: 'exhale', label: 'Breathe out', seconds: 8 },
    ],
  },
  {
    id: 'coherent',
    name: 'Coherent breathing',
    pattern: '5-5',
    description: 'Slow, even breaths, about six per minute. Calming and easy to keep up.',
    phases: [
      { kind: 'inhale', label: 'Breathe in', seconds: 5 },
      { kind: 'exhale', label: 'Breathe out', seconds: 5 },
    ],
  },
  {
    id: 'diaphragmatic',
    name: 'Diaphragmatic breathing',
    pattern: '4-6',
    description: 'Deep belly breaths with a longer exhale. Good for releasing tension.',
    phases: [
      { kind: 'inhale', label: 'Breathe in', seconds: 4 },
      { kind: 'exhale', label: 'Breathe out', seconds: 6 },
    ],
  },
]
