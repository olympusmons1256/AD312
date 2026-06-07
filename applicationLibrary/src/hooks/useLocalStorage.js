import { useState, useEffect } from 'react'

// useLocalStorage — custom hook
// Works exactly like useState, but automatically persists the value to
// localStorage so it survives page refreshes.
//
// Parameters:
//   key          — the localStorage key to read from / write to
//   initialValue — the fallback value when nothing is stored yet
//
// Returns: [storedValue, setValue] — same shape as useState
export function useLocalStorage(key, initialValue) {
  // 1. STATE — use a lazy initializer function so localStorage is only read
  // once, on the very first render. Passing a function to useState instead of
  // a plain value prevents the read from running on every re-render.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Look up the key in localStorage. If something is there, parse it back
      // from the JSON string it was saved as and use it as the initial value.
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch (error) {
      // If localStorage is blocked (e.g. private browsing restrictions) or
      // the stored JSON is corrupt, fall back to the provided initialValue
      // so the component still renders correctly.
      console.warn(`useLocalStorage: could not read key "${key}"`, error)
      return initialValue
    }
  })

  // 2. SIDE EFFECT — every time storedValue changes, write the new value back
  // to localStorage so the backup stays in sync with React state.
  useEffect(() => {
    try {
      // JSON.stringify converts any value (object, array, boolean, number) into
      // a string that localStorage can hold.
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`useLocalStorage: could not write key "${key}"`, error)
    }
  }, [key, storedValue])

  // 3. RETURN — expose the same [value, setter] tuple as useState so callers
  // can swap in useLocalStorage anywhere they currently use useState.
  return [storedValue, setStoredValue]
}
