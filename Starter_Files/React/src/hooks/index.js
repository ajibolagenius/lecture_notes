// src/hooks/useFetch.js
// ─────────────────────────────────────────────────────────────
// Generic data-fetching hook with loading, error, and cleanup.
//
// Usage:
//   const { data, isLoading, error, refetch } = useFetch('/api/courses')
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
  const [data, setData]     = useState(null)
  const [status, setStatus] = useState('idle')   // idle | loading | success | error
  const [error, setError]   = useState(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    if (!url) return

    let cancelled = false
    setStatus('loading')
    setError(null)

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(d => { if (!cancelled) { setData(d); setStatus('success') } })
      .catch(e => { if (!cancelled) { setError(e.message); setStatus('error') } })

    return () => { cancelled = true }
  }, [url, trigger])

  const refetch = useCallback(() => setTrigger(t => t + 1), [])

  return {
    data,
    isLoading: status === 'loading',
    error,
    status,
    refetch,
  }
}


// src/hooks/useLocalStorage.js
// ─────────────────────────────────────────────────────────────
// useState that syncs to localStorage automatically.
//
// Usage:
//   const [prefs, setPrefs] = useLocalStorage('prefs', { theme: 'light' })
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          typeof value === 'function' ? value(storedValue) : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`useLocalStorage('${key}') set error:`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue]
}


// src/hooks/useDebounce.js
// ─────────────────────────────────────────────────────────────
// Delays updating a value until the user pauses for `delay` ms.
// Use with search inputs to avoid a fetch on every keystroke.
//
// Usage:
//   const debouncedQuery = useDebounce(searchQuery, 400)
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
