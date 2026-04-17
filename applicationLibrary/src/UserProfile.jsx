import { useState } from 'react'

function UserProfile() {
  const [userProfile, setUserProfile] = useState({
    name: 'Reid Torres',
    email: 'reid.torres@example.com',
    address: {
      street: '123 Maple Street',
      city: 'Austin',
      country: 'USA'
    }
  })

  const [streetInput, setStreetInput] = useState(userProfile.address.street)
  const [cityInput, setCityInput] = useState(userProfile.address.city)
  const [countryInput, setCountryInput] = useState(userProfile.address.country)

  const updateAddress = (street, city, country) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      address: {
        ...prevProfile.address,
        street,
        city,
        country
      }
    }))
  }

  const handleUpdateAddress = () => {
    updateAddress(streetInput, cityInput, countryInput)
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
          <strong>Name:</strong> {userProfile.name}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Street:</strong> {userProfile.address.street}
        </p>
        <p>
          <strong>City:</strong> {userProfile.address.city}
        </p>
        <p>
          <strong>Country:</strong> {userProfile.address.country}
        </p>
      </div>
    </section>
  )
}

export default UserProfile