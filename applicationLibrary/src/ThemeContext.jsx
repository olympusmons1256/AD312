import { createContext, useState, useEffect } from 'react'

// --- Theme definitions ---
export const themes = {
  light: {
    name: 'light',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#111827',
    subtext: '#4b5563',
    border: '#e5e7eb',
    accent: '#2563eb',
  },
  dark: {
    name: 'dark',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    subtext: '#94a3b8',
    border: '#334155',
    accent: '#60a5fa',
  },
}

// --- Create the Context ---
export const ThemeContext = createContext({
  theme: 'light',
  themeValues: themes.light,
  toggleTheme: () => {},
})

// --- Provider Component ---
export function ThemeProvider({ children }) {
  // Persist preference via localStorage (Optional requirement)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('app-theme')
      return saved === 'dark' || saved === 'light' ? saved : 'light'
    } catch {
      return 'light'
    }
  })

  // Keep localStorage in sync and apply class to <body>
  useEffect(() => {
    try {
      localStorage.setItem('app-theme', theme)
    } catch {
      // ignore
    }
    // Apply dark/light class to body so the page background also transitions
    document.body.classList.toggle('dark-mode', theme === 'dark')
    document.body.classList.toggle('light-mode', theme === 'light')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const value = {
    theme,
    themeValues: themes[theme],
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
