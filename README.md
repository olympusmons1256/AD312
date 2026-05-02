# AD312 Assignment Application Library

This project contains a React app in [applicationLibrary](applicationLibrary) built with Vite.

It so far demonstrates:
- state updates and snapshot behavior (`Counter`)
- index-based image navigation with boundary checks (`Gallery`)
- immutable nested object updates (`UserProfile`)
- complex nested profile updates using `useImmer` (`UserProfileWithImmer`)
- complex immutable updates using `useImmer` (`ShoppingListWithImmer`)
- asynchronous API data fetching and caching with TanStack Query (`DogQueryExplorer`)
- full CRUD server-state management with TanStack Query (`ManagingBlogPostTanStack`)

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

### Task Manager
- `TaskManager` stores tasks as an array of objects with `id`, `title`, and `completed`.
- New tasks are added immutably using array spread.
- Task completion is toggled immutably using `.map()` and object spread.

#### Test Cases

##### Normal cases (3)
- Adding a task with text creates a new task with Pending status.
- Adding multiple tasks keeps previously added tasks and appends new ones.
- Clicking Mark Complete on a Pending task changes it to Completed.

##### Edge cases (3)
- Clicking Add Task with an empty or whitespace-only title does not add a task.
- Toggling the same task repeatedly flips between Completed and Pending each time.
- Toggling one task does not change the completion state of other tasks.

---

### Shopping List with Immer
- `ShoppingListWithImmer` uses `useImmer` to manage an array of shopping items with nested `details`.
- `addItem` adds a new item by pushing to the draft state.
- `updateItem` updates top-level fields (like `quantity`) and nested fields (like `details.notes`) directly on the draft.
- `removeItem` removes items by id using draft index lookup and `splice`.

#### Test Cases

##### Normal cases (3)
- Adding a valid item name, quantity, category, and notes creates a new list item immediately.
- Clicking `+1 Qty` on an item increases only that item's quantity by exactly 1.
- Entering a new note and clicking `Update Note` updates that item’s nested `details.notes` in real time.

##### Edge cases (3)
- Clicking `Add Item` with an empty or whitespace-only name does not create a new item.
- Clicking `Remove` on an item deletes it from the list without affecting remaining items.
- Attempting to update note with an empty input stores an empty note and UI still renders safely.

---

### User Profile with Immer
- `UserProfileWithImmer` uses `useImmer` to manage nested `contactDetails` and `preferences`.
- `updateContactDetails` directly updates `phone` and `address` on the draft state.
- `toggleNewsletterSubscription` flips the nested `preferences.newsletter` boolean.
- The profile is displayed as formatted JSON so updates can be verified in real time.

#### Test Cases

##### Normal cases (3)
- Editing name, phone, and address then clicking `Apply Profile Updates` updates those fields in the preview.
- Clicking the newsletter checkbox once toggles `preferences.newsletter` from true to false (or false to true).
- Updating contact details multiple times keeps only the latest values in state.

##### Edge cases (3)
- Entering a blank name and applying updates preserves the previous non-empty name.
- Entering blank phone/address values applies safely and the component continues rendering without errors.
- Rapidly toggling newsletter repeatedly always flips the boolean correctly and remains in sync with the checkbox.

---

### Dog API Explorer with TanStack Query
- `DogQueryExplorer` uses TanStack Query (`useQuery`) to fetch and cache data from Dog API endpoints.
- The module handles `isPending`, `isError`, and `isSuccess` states for breeds, breed details, facts, and groups.
- The selected breed drives a detail request (`/breeds/{id}`) and displays structured attributes.

#### Test Cases

##### Normal cases (3)
- On initial load, breeds are fetched and rendered, and a default breed is selected for detail display.
- Selecting a different breed from the dropdown fetches and shows that breed’s details (name, description, life, weight).
- Facts and groups sections load and render list items when their requests succeed.

##### Edge cases (3)
- While data is loading, each section displays a clear loading message and does not crash.
- If any endpoint fails, the related section shows an error message and other successful sections still render.
- If optional attributes are missing in API data, fallback text like `N/A` or `No description available.` is shown safely.

---

### Managing Blog Posts with TanStack Query (CRUD)
- `ManagingBlogPostTanStack` uses TanStack Query query/mutation hooks to perform `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` on JSONPlaceholder posts.
- The module supports filtering posts by `userId` and updates cached list data after mutations for responsive UI behavior.
- Mutation forms are split by action (create, replace, patch title, delete) to clearly demonstrate each HTTP method.

#### Test Cases

##### Normal cases (3)
- Fetching posts loads and displays a list of posts successfully (`GET`).
- Submitting the create form adds a new post entry to the displayed list (`POST`).
- Updating a post with full replacement (`PUT`) and title-only update (`PATCH`) reflects changed values in the UI.

##### Edge cases (3)
- Applying a user filter with no matching records renders an empty/small list without crashing.
- Submitting mutation forms with missing required inputs does not send invalid requests.
- Deleting a post removes only the targeted post while leaving all other posts unchanged.

---

