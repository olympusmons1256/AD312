import { createContext, useState } from 'react'

// Create the context
export const UserContext = createContext(null)

// Default user state
const defaultUser = {
  name: 'Reid Torres',
  email: 'reid.torres@example.com',
  role: 'Admin',
  themePreference: 'light',
  joinDate: 'January 2024',
  address: {
    street: '123 Maple Street',
    city: 'Austin',
    country: 'USA',
  },
}

// Provider component — holds user state and an updater
export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser)

  const updateUser = (fields) => {
    setUser(prev => ({ ...prev, ...fields }))
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}
