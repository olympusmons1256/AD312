// ThemePreferenceDemo — demonstrates useLocalStorage by persisting user
// preferences (theme, font size, language) across page refreshes.
import { useLocalStorage } from './hooks/useLocalStorage'

// Theme definitions
const THEMES = {
  light: {
    label: 'Light',
    bg: '#ffffff',
    surface: '#f3f4f6',
    card: '#ffffff',
    text: '#111827',
    subtext: '#6b7280',
    border: '#e5e7eb',
    accent: '#4f46e5',
    accentText: '#ffffff',
  },
  dark: {
    label: 'Dark',
    bg: '#0f172a',
    surface: '#1e293b',
    card: '#1e293b',
    text: '#f1f5f9',
    subtext: '#94a3b8',
    border: '#334155',
    accent: '#818cf8',
    accentText: '#0f172a',
  },
  sepia: {
    label: 'Sepia',
    bg: '#fdf6e3',
    surface: '#f5ead0',
    card: '#fdf6e3',
    text: '#3b2f1e',
    subtext: '#7c6040',
    border: '#d9c9a8',
    accent: '#b45309',
    accentText: '#ffffff',
  },
}

const FONT_SIZES = [
  { label: 'Small',  value: '0.85rem' },
  { label: 'Medium', value: '1rem'    },
  { label: 'Large',  value: '1.15rem' },
]

const LANGUAGES = ['English', 'Spanish', 'French', 'Japanese']

// StorageRow — shows a key/value pair from localStorage in a readable way
function StorageRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
      <span style={{ opacity: 0.5, minWidth: '80px', fontSize: '0.75rem' }}>{label}:</span>
      <code style={{ fontSize: '0.8rem' }}>{JSON.stringify(value)}</code>
    </div>
  )
}

export default function ThemePreferenceDemo() {
  // Each call to useLocalStorage works like useState but auto-saves to the
  // browser. Refresh the page — every preference will already be loaded.
  const [theme,    setTheme]    = useLocalStorage('pref-theme',     'light')
  const [fontSize, setFontSize] = useLocalStorage('pref-fontSize',  '1rem')
  const [language, setLanguage] = useLocalStorage('pref-language',  'English')
  const [autoplay, setAutoplay] = useLocalStorage('pref-autoplay',  true)

  const t = THEMES[theme] ?? THEMES.light

  return (
    <section className="component-section">
      <h2>Theme Preferences — <code>useLocalStorage</code></h2>
      <p style={{ color: '#888', marginBottom: '0.25rem' }}>
        Each preference is saved to <code>localStorage</code> automatically.
        Change any setting, then refresh the page — your choices will still be here.
      </p>
      <p style={{ color: '#888', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        Open DevTools &rarr; Application &rarr; Local Storage to watch the keys update in real time.
      </p>

      {/* Simulated settings panel */}
      <div
        style={{
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: '14px',
          padding: '1.5rem',
          transition: 'background 0.3s ease, color 0.3s ease',
          fontSize: fontSize,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            paddingBottom: '0.75rem',
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <span style={{ color: t.text, fontWeight: 700, fontSize: '1.05em' }}>
            Settings
          </span>
          <span style={{ color: t.subtext, fontSize: '0.8em' }}>
            {language}
          </span>
        </div>

        {/* Theme selector */}
        <SettingRow label="Theme" color={t.subtext}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.keys(THEMES).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '8px',
                  border: `2px solid ${theme === key ? t.accent : t.border}`,
                  background: theme === key ? t.accent : t.surface,
                  color: theme === key ? t.accentText : t.text,
                  fontWeight: theme === key ? 600 : 400,
                  cursor: 'pointer',
                  fontSize: '0.85em',
                  transition: 'all 0.15s ease',
                }}
              >
                {THEMES[key].label}
              </button>
            ))}
          </div>
        </SettingRow>

        {/* Font size selector */}
        <SettingRow label="Font Size" color={t.subtext}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {FONT_SIZES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFontSize(value)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '8px',
                  border: `2px solid ${fontSize === value ? t.accent : t.border}`,
                  background: fontSize === value ? t.accent : t.surface,
                  color: fontSize === value ? t.accentText : t.text,
                  fontWeight: fontSize === value ? 600 : 400,
                  cursor: 'pointer',
                  fontSize: '0.85em',
                  transition: 'all 0.15s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </SettingRow>

        {/* Language selector */}
        <SettingRow label="Language" color={t.subtext}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: t.surface,
              color: t.text,
              border: `1px solid ${t.border}`,
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              fontSize: '0.85em',
              cursor: 'pointer',
            }}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </SettingRow>

        {/* Autoplay toggle */}
        <SettingRow label="Autoplay" color={t.subtext} last>
          <button
            onClick={() => setAutoplay((prev) => !prev)}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '8px',
              border: `2px solid ${autoplay ? t.accent : t.border}`,
              background: autoplay ? t.accent : t.surface,
              color: autoplay ? t.accentText : t.text,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85em',
              minWidth: '70px',
              transition: 'all 0.15s ease',
            }}
          >
            {autoplay ? 'On' : 'Off'}
          </button>
        </SettingRow>

        {/* localStorage inspector */}
        <div
          style={{
            marginTop: '1.25rem',
            padding: '0.85rem 1rem',
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: '10px',
            fontFamily: 'monospace',
            color: t.subtext,
            lineHeight: 1.8,
          }}
        >
          <div style={{ fontSize: '0.7em', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.35rem', color: t.accent }}>
            LOCALSTORAGE
          </div>
          <StorageRow label="pref-theme"    value={theme}    />
          <StorageRow label="pref-fontSize" value={fontSize} />
          <StorageRow label="pref-language" value={language} />
          <StorageRow label="pref-autoplay" value={autoplay} />
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            setTheme('light')
            setFontSize('1rem')
            setLanguage('English')
            setAutoplay(true)
          }}
          style={{
            marginTop: '1rem',
            padding: '0.4rem 1rem',
            borderRadius: '8px',
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.subtext,
            cursor: 'pointer',
            fontSize: '0.8em',
          }}
        >
          Reset to defaults
        </button>
      </div>
    </section>
  )
}

// Small layout helper — one labeled row in the settings panel
function SettingRow({ label, color, children, last }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.65rem 0',
        borderBottom: last ? 'none' : `1px solid rgba(128,128,128,0.15)`,
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color, fontSize: '0.85em', minWidth: '80px' }}>{label}</span>
      {children}
    </div>
  )
}
