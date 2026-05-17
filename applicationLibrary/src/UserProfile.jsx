import { useState, useContext } from 'react'
import { UserContext } from './UserContext'

function UserProfile() {
  // Reads user data directly from context — no props drilled down from App or Dashboard
  const { user, updateUser } = useContext(UserContext)

  const [streetInput, setStreetInput] = useState(user.address?.street ?? '')
  const [cityInput, setCityInput] = useState(user.address?.city ?? '')
  const [countryInput, setCountryInput] = useState(user.address?.country ?? '')

  const handleUpdateAddress = () => {
    updateUser({
      address: { street: streetInput, city: cityInput, country: countryInput }
    })
  }

  return (
    <section className="profile-card">
      <h2>User Profile (Nested State)</h2>

      <div className="profile-input-grid">
        <label>
          Street
          <input
            type="text"
            value={streetInput}
            onChange={(event) => setStreetInput(event.target.value)}
            placeholder="Street"
          />
        </label>

        <label>
          City
          <input
            type="text"
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
            placeholder="City"
          />
        </label>

        <label>
          Country
          <input
            type="text"
            value={countryInput}
            onChange={(event) => setCountryInput(event.target.value)}
            placeholder="Country"
          />
        </label>
      </div>

      <button className="profile-update-button" onClick={handleUpdateAddress}>
        Update Address
      </button>

      <div className="profile-summary">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Street:</strong> {user.address?.street}
        </p>
        <p>
          <strong>City:</strong> {user.address?.city}
        </p>
        <p>
          <strong>Country:</strong> {user.address?.country}
        </p>
      </div>
    </section>
  )
}

export default UserProfile