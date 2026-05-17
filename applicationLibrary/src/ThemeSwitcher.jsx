import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="theme-switcher-btn"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-switcher-icon">{isDark ? '☀️' : '🌙'}</span>
      <span className="theme-switcher-label">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  )
}
