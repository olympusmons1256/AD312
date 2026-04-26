import { useState } from 'react'
import { useImmer } from 'use-immer'

function UserProfileWithImmer() {
  const [userProfile, updateUserProfile] = useImmer({
    name: 'Reid Torres',
    email: 'reid.torres@example.com',
    contactDetails: {
      phone: '+1 (555) 123-4567',
      address: '123 Maple Street, Austin, TX'
    },
    preferences: {
      newsletter: true,
      notifications: true
    }
  })

  const [nameInput, setNameInput] = useState(userProfile.name)
  const [phoneInput, setPhoneInput] = useState(userProfile.contactDetails.phone)
  const [addressInput, setAddressInput] = useState(userProfile.contactDetails.address)

  const updateName = (newName) => {
    updateUserProfile((draft) => {
      draft.name = newName
    })
  }

  const updateContactDetails = (newPhone, newAddress) => {
    updateUserProfile((draft) => {
      draft.contactDetails.phone = newPhone
      draft.contactDetails.address = newAddress
    })
  }

  const toggleNewsletterSubscription = () => {
    updateUserProfile((draft) => {
      draft.preferences.newsletter = !draft.preferences.newsletter
    })
  }

  const handleApplyUpdates = () => {
    updateName(nameInput.trim() || userProfile.name)
    updateContactDetails(phoneInput.trim(), addressInput.trim())
  }

  return (
    <section className="immer-profile-card">
      <h2>User Profile with `useImmer`</h2>

      <div className="immer-profile-grid">
        <label>
          Name
          <input
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder="Full name"
          />
        </label>

        <label>
          Phone
          <input
            type="text"
            value={phoneInput}
            onChange={(event) => setPhoneInput(event.target.value)}
            placeholder="Phone number"
          />
        </label>

        <label className="span-2">
          Address
          <input
            type="text"
            value={addressInput}
            onChange={(event) => setAddressInput(event.target.value)}
            placeholder="Address"
          />
        </label>
      </div>

      <div className="immer-profile-actions">
        <button onClick={handleApplyUpdates}>Apply Profile Updates</button>
        <label className="newsletter-toggle">
          <input
            type="checkbox"
            checked={userProfile.preferences.newsletter}
            onChange={toggleNewsletterSubscription}
          />
          Newsletter subscription
        </label>
      </div>

      <pre className="immer-profile-preview">{JSON.stringify(userProfile, null, 2)}</pre>
    </section>
  )
}

export default UserProfileWithImmer