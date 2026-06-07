import { useState, useEffect } from 'react'

// useWindowSize — custom hook
// Tracks the browser window's current width and height, keeping React state
// in sync with the live viewport dimensions.
// Returns: { width: number, height: number }
export function useWindowSize() {
  // 1. STATE — seed with current dimensions so the first render has real values.
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // 2. SIDE EFFECT
  useEffect(() => {
    // Called by the browser every time the viewport is resized.
    // Reads new dimensions and pushes them into state, triggering a re-render
    // in every component that called this hook.
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Register the listener once — when the hook first mounts.
    window.addEventListener('resize', handleResize)

    // 3. CLEANUP — remove the listener on unmount to prevent memory leaks.
    return () => {
      window.removeEventListener('resize', handleResize)
    }

    // Empty [] — listener registered once on mount, torn down once on unmount.
  }, [])

  // 4. RETURN — any caller gets a live { width, height } that updates on resize.
  return windowSize
}
