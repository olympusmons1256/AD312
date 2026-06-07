// StreamingLayout — streaming-website demo using the useWindowSize custom hook.
import { useState } from 'react'
import { useWindowSize } from './hooks/useWindowSize'

const MOBILE_BREAKPOINT = 768

const NOW_PLAYING = {
  title: 'Cosmic Odyssey',
  genre: 'Sci-Fi - Adventure',
  description:
    'A crew of unlikely heroes launches into the unknown reaches of deep space, discovering ancient civilizations and confronting the limits of human courage.',
  duration: '2h 14m',
  rating: '4.5 / 5',
}

const SHOWS = [
  { id: 1, title: 'Neon Samurai',      genre: 'Action',   color: '#be123c' },
  { id: 2, title: 'The Last Garden',   genre: 'Drama',    color: '#15803d' },
  { id: 3, title: 'Midnight Protocol', genre: 'Thriller', color: '#1d4ed8' },
  { id: 4, title: 'Pixel Dreams',      genre: 'Anime',    color: '#7c3aed' },
  { id: 5, title: 'Solar Drift',       genre: 'Sci-Fi',   color: '#0369a1' },
  { id: 6, title: 'Harbor Lights',     genre: 'Romance',  color: '#b45309' },
]

const NAV_LINKS = ['Home', 'Browse', 'Trending', 'My List', 'Settings']

// Fake video player placeholder
function VideoPlayer({ isMobile }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1e1b4b 50%, #0f0f1a 100%)',
        borderRadius: isMobile ? '10px' : '14px',
        aspectRatio: '16 / 9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Starfield dots */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            borderRadius: '50%',
            background: 'white',
            opacity: Math.random() * 0.6 + 0.2,
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
        />
      ))}

      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
        [ Video Player ]
      </div>

      {/* Play button */}
      <div
        style={{
          width: isMobile ? '44px' : '56px',
          height: isMobile ? '44px' : '56px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '1.1rem' : '1.4rem',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
        }}
      >
        ▶
      </div>
    </div>
  )
}

// One show card in the browse grid
function ShowCard({ show, compact }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? show.color : '#1e1e2e',
        borderRadius: '10px',
        padding: compact ? '0.75rem' : '1rem',
        display: 'flex',
        alignItems: compact ? 'center' : 'flex-start',
        flexDirection: compact ? 'row' : 'column',
        gap: compact ? '0.75rem' : '0.5rem',
        cursor: 'pointer',
        transition: 'background 0.2s ease, transform 0.15s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div>
        <div
          style={{
            color: '#fff',
            fontWeight: 600,
            fontSize: compact ? '0.85rem' : '0.9rem',
            lineHeight: 1.2,
          }}
        >
          {show.title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: '2px' }}>
          {show.genre}
        </div>
      </div>
    </div>
  )
}

// Mobile layout (width < 768 px)
function MobileLayout({ width, height, shows, nowPlaying }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.6rem 0.75rem',
          background: '#12121f',
          borderRadius: '10px',
        }}
      >
        <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1rem' }}>
          StreamVibe
        </span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Menu</span>
      </div>

      {/* Player */}
      <VideoPlayer isMobile />

      {/* Now playing info — compact */}
      <div style={{ padding: '0 0.25rem' }}>
        <div style={{ color: '#a78bfa', fontSize: '0.7rem', fontWeight: 600, marginBottom: '2px' }}>
          NOW PLAYING
        </div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{nowPlaying.title}</div>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
          {nowPlaying.genre} · {nowPlaying.duration}
        </div>

        {/* Playback controls */}
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.6rem' }}>
          {['Prev', 'Pause', 'Next', 'Vol'].map((label) => (
            <button
              key={label}
              style={{
                background: '#1e1e2e',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '0.35rem 0.6rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Up next — vertical list */}
      <div>
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}
        >
          UP NEXT
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} compact />
          ))}
        </div>
      </div>

      {/* Dimension badge */}
      <DimensionBadge width={width} height={height} isMobile />
    </div>
  )
}

// Desktop layout (width >= 768 px)
function DesktopLayout({ width, height, shows, nowPlaying }) {
  const [activeNav, setActiveNav] = useState('Home')

  return (
    <div style={{ display: 'flex', gap: '1.25rem', minHeight: '500px' }}>
      {/* Sidebar nav */}
      <aside
        style={{
          width: '160px',
          flexShrink: 0,
          background: '#12121f',
          borderRadius: '14px',
          padding: '1.25rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
          StreamVibe
        </div>
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActiveNav(link)}
            style={{
              background: activeNav === link ? 'rgba(167,139,250,0.15)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: activeNav === link ? '#a78bfa' : 'rgba(255,255,255,0.5)',
              fontWeight: activeNav === link ? 600 : 400,
              fontSize: '0.82rem',
              padding: '0.5rem 0.6rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {link}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>
        {/* Player + info row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '1rem', alignItems: 'start' }}>
          <VideoPlayer isMobile={false} />

          {/* Now playing panel */}
          <div
            style={{
              background: '#12121f',
              borderRadius: '14px',
              padding: '1.25rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ color: '#a78bfa', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              NOW PLAYING
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}>
                {nowPlaying.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginTop: '4px' }}>
                {nowPlaying.genre}
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>
              {nowPlaying.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[nowPlaying.duration, nowPlaying.rating].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.75rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Controls */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              {['Prev', 'Pause', 'Next', 'Vol'].map((label) => (
                <button
                  key={label}
                  style={{
                    background: '#1e1e2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '0.4rem 0.65rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    flex: 1,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Browse grid */}
        <div>
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '0.65rem',
            }}
          >
            CONTINUE WATCHING
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '0.65rem',
            }}
          >
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} compact={false} />
            ))}
          </div>
        </div>

        <DimensionBadge width={width} height={height} isMobile={false} />
      </div>
    </div>
  )
}

// Shows current dimensions and active layout
function DimensionBadge({ width, height, isMobile }) {
  return (
    <div
      style={{
        background: '#12121f',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        padding: '0.6rem 0.85rem',
        fontFamily: 'monospace',
        fontSize: '0.78rem',
        color: 'rgba(255,255,255,0.55)',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <span>
        <span style={{ opacity: 0.5 }}>width: </span>
        <strong style={{ color: '#a78bfa' }}>{width}px</strong>
      </span>
      <span>
        <span style={{ opacity: 0.5 }}>height: </span>
        <strong style={{ color: '#a78bfa' }}>{height}px</strong>
      </span>
      <span>
        <span style={{ opacity: 0.5 }}>layout: </span>
        <strong style={{ color: isMobile ? '#f472b6' : '#34d399' }}>
          {isMobile ? 'mobile' : 'desktop'}
        </strong>
      </span>
      <span style={{ opacity: 0.5 }}>
        breakpoint: &lt; {MOBILE_BREAKPOINT}px = mobile
      </span>
    </div>
  )
}

// StreamingLayout — main exported component
export default function StreamingLayout() {
  // useWindowSize provides live width and height — no duplicated listener logic needed.
  const { width, height } = useWindowSize()

  const isMobile = width < MOBILE_BREAKPOINT

  return (
    <section className="component-section">
      <h2>Streaming Layout — <code>useWindowSize</code></h2>
      <p style={{ color: '#888', marginBottom: '0.5rem' }}>
        A custom hook tracks <code>window.innerWidth</code> and <code>window.innerHeight</code>.
        Any component that calls <code>useWindowSize()</code> automatically re-renders when the
        viewport changes — no duplicated event-listener logic required.
      </p>
      <p style={{ color: '#888', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        Resize this browser window below {MOBILE_BREAKPOINT}px to switch to
        the compact mobile player, or widen it to restore the full desktop layout.
      </p>

      <div
        style={{
          background: '#0d0d1a',
          borderRadius: '16px',
          padding: isMobile ? '1rem' : '1.5rem',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'padding 0.3s ease',
        }}
      >
        {isMobile ? (
          <MobileLayout
            width={width}
            height={height}
            shows={SHOWS}
            nowPlaying={NOW_PLAYING}
          />
        ) : (
          <DesktopLayout
            width={width}
            height={height}
            shows={SHOWS}
            nowPlaying={NOW_PLAYING}
          />
        )}
      </div>
    </section>
  )
}
