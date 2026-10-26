import { useEffect, useState } from 'react'
import { readJson, writeJson } from '../lib/storage.js'

// Like useState, but the value is remembered on the device under `key`.
export function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => readJson(key, initialValue))

  useEffect(() => {
    writeJson(key, value)
  }, [key, value])

  return [value, setValue]
}
