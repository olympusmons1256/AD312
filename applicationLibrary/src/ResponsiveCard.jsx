import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export default function ResponsiveCard() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const isMobile = windowSize.width < MOBILE_BREAKPOINT

  useEffect(() => {
    // Handler reads the current window dimensions and pushes them into state,
    // keeping the component in sync with the real browser environment.
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Attach the handler to the window's resize event so it fires whenever
    // the viewport dimensions change.
    window.addEventListener('resize', handleResize)

    // The dependency array is intentionally empty []. The resize listener only
    // needs to be registered once — when the component mounts — and torn down
    // once — when it unmounts. Adding values here would re-run the effect on
    // every render, creating duplicate listeners. Omitting the array entirely
    // would do the same, re-registering on every render and causing a memory leak.
    return () => {
      // Cleanup: remove the event listener when the component unmounts so the
      // handler is never called against an unmounted component, preventing
      // state updates on dead components and freeing the listener from memory.
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const bg = isMobile ? '#4f46e5' : '#0891b2'
  const layout = isMobile ? 'column' : 'row'

  return (
    <section className="component-section">
      <h2>Responsive Card</h2>
      <p style={{ color: '#888', marginBottom: '1rem' }}>
        Resize the browser window to see the card respond in real-time.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: layout,
          alignItems: 'center',
          gap: '1.5rem',
          background: bg,
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          color: '#fff',
          transition: 'background 0.3s ease, flex-direction 0.3s ease',
        }}
      >
        {/* Mode badge */}
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {isMobile ? '📱 Mobile' : '🖥️ Desktop'}
        </div>

        {/* Divider */}
        <div
          style={{
            width: isMobile ? '100%' : '1px',
            height: isMobile ? '1px' : '48px',
            background: 'rgba(255,255,255,0.35)',
          }}
        />

        {/* Dimension readout */}
        <div style={{ fontFamily: 'monospace', lineHeight: 1.7 }}>
          <div>
            <span style={{ opacity: 0.75 }}>Width: </span>
            <strong>{windowSize.width}px</strong>
          </div>
          <div>
            <span style={{ opacity: 0.75 }}>Height: </span>
            <strong>{windowSize.height}px</strong>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.65, marginTop: '0.25rem' }}>
            Breakpoint: &lt; {MOBILE_BREAKPOINT}px = mobile
          </div>
        </div>
      </div>
    </section>
  )
}
