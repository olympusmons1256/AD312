# AD312 Assignment Application Library

This project contains a React app in [applicationLibrary](applicationLibrary) built with Vite.

It so far demonstrates:
- state updates and snapshot behavior (`Counter`)
- index-based image navigation with boundary checks (`Gallery`)
- immutable nested object updates (`UserProfile`)

---

## Run the app

1. Open [applicationLibrary](applicationLibrary)
2. Install packages: `npm install`
3. Start dev server: `npm run dev`

---

### User Profile
- `UserProfile` updates nested `address` state immutably using functional updates and spread syntax.
- `UserProfile` keeps top-level profile fields (`name`, `email`) intact while updating nested address fields.

#### Test Cases

##### Normal cases (3)
- Initial profile render shows default name, email, street, city, and country values.
- Updating street, city, and country then clicking Update Address displays the new values correctly.
- Performing two address updates in sequence keeps the latest values in the profile display.
##### Edge cases (3)
- Submitting with one or more empty address inputs updates the profile without crashing.
- Entering special characters like Apt #4-B or St. John's renders correctly after update.
- Updating nested address fields does not change top-level name or email values.

---

