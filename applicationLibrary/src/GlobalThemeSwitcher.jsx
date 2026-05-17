import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'

export default function GlobalThemeSwitcher() {
  const { theme, themeValues } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const cardStyle = {
    background: themeValues.surface,
    color: themeValues.text,
    border: `1px solid ${themeValues.border}`,
    borderRadius: '16px',
    padding: '28px',
    transition: 'background 0.3s ease, color 0.3s ease',
  }

  const subtextStyle = { color: themeValues.subtext }

  const sampleBtnStyle = {
    background: themeValues.accent,
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    cursor: 'default',
    fontWeight: 600,
  }

  const inputStyle = {
    border: `1px solid ${themeValues.border}`,
    borderRadius: '10px',
    padding: '10px 12px',
    font: 'inherit',
    background: themeValues.background,
    color: themeValues.text,
    width: '100%',
    transition: 'background 0.3s ease, color 0.3s ease',
  }

  return (
    <div
      className={`theme-demo-root ${isDark ? 'dark-mode' : 'light-mode'}`}
      style={{ background: themeValues.background, transition: 'background 0.3s ease', padding: '28px', borderRadius: '16px' }}
    >
      {/* Header row */}
      <div className="theme-demo-header">
        <div>
          <h2 style={{ margin: 0, color: themeValues.text }}>🎨 Global Theme Switcher</h2>
          <p style={{ margin: '6px 0 0', ...subtextStyle }}>
            Using React Context API — current theme: <strong>{theme}</strong>
          </p>
        </div>
        <ThemeSwitcher />
      </div>

      {/* Preview cards */}
      <div className="theme-demo-grid">
        {/* Card 1 – Typography preview */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 8px' }}>Typography</h3>
          <p style={{ margin: '0 0 6px', ...subtextStyle }}>
            Body text adapts to the active theme automatically via Context.
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', ...subtextStyle }}>
            Subtext / caption level
          </p>
        </div>

        {/* Card 2 – Interactive elements */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 12px' }}>UI Elements</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <button style={sampleBtnStyle}>Primary</button>
            <button style={{ ...sampleBtnStyle, background: 'transparent', color: themeValues.accent, border: `1px solid ${themeValues.accent}` }}>
              Outline
            </button>
          </div>
          <input
            style={inputStyle}
            placeholder="Sample input field…"
            readOnly
          />
        </div>

        {/* Card 3 – Status badges */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 12px' }}>Status Badges</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Active', 'Pending', 'Error'].map((label, i) => {
              const colors = ['#16a34a', '#d97706', '#dc2626']
              return (
                <span
                  key={label}
                  style={{
                    background: colors[i] + (isDark ? '33' : '22'),
                    color: colors[i],
                    border: `1px solid ${colors[i]}55`,
                    borderRadius: '999px',
                    padding: '4px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  {label}
                </span>
              )
            })}
          </div>
        </div>

        {/* Card 4 – Context info */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 12px' }}>Context Values</h3>
          <pre
            style={{
              margin: 0,
              fontSize: '0.78rem',
              color: themeValues.subtext,
              background: themeValues.background,
              border: `1px solid ${themeValues.border}`,
              borderRadius: '8px',
              padding: '10px',
              overflowX: 'auto',
            }}
          >
            {JSON.stringify({ theme, ...themeValues }, null, 2)}
          </pre>
        </div>
      </div>

      <p style={{ margin: '20px 0 0', fontSize: '0.82rem', ...subtextStyle, textAlign: 'center' }}>
        💾 Your preference is saved to <code>localStorage</code> and restored on next visit.
      </p>
    </div>
  )
}
