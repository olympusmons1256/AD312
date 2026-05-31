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
- multi-page routing with React Router, persistent layout via `<Outlet />`, dynamic routes, and programmatic navigation (`Blog App`)
- file-based style routing with React Router, dynamic recipe detail pages via `useParams`, and a persistent nav layout (`Recipe Gallery`)
- uncontrolled, ref-based form architecture with client-side validation, localStorage draft caching, and async submission lifecycle (`UserRegistrationForm`)
- server-state form integration combining React Hook Form with TanStack Query for `useQuery` seeding, `useMutation` PUT updates, cache invalidation, `isDirty` gating, and server-error field mapping (`ProfileFormTanStack`)
- integrating a vanilla Chart.js bar chart into the React lifecycle using `useEffect` as an escape hatch: imperative instantiation via `canvasRef`, real-time state synchronization via `.update()`, and mandatory cleanup via `.destroy()` to prevent canvas context errors (`PollDashboard`)
- synchronizing React state with a browser-native side effect using `useEffect`: attaching a `resize` event listener on mount, updating `windowSize` state in real-time, and returning a cleanup function to remove the listener on unmount (`ResponsiveCard`)

Also includes a standalone Python algorithm in [isHealthRecordSymmetric/](isHealthRecordSymmetric):
- `isHealthRecordSymmetric` checks whether a singly linked list of patient health metrics forms a palindrome.
- Uses slow/fast pointer midpoint detection and in-place second-half reversal for O(n) time and O(1) space.
- The list is restored to its original order after the check.

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

### Blog App with React Router
- The Blog App uses `react-router-dom` with nested routes under `/blog`, rendered inside a persistent `BlogLayout` shell via `<Outlet />`.
- `BlogHome` maps over a local `posts.js` data source and renders each post title as a `<Link>` to its dynamic route.
- `BlogPostView` uses `useParams()` to extract the post ID from the URL and `.find()` to locate the matching post, and `useNavigate()` to power the "Return to Feed" button.
- Invalid post IDs (e.g. `/blog/post/999`) are handled gracefully with a "Post Not Found" message instead of crashing.

#### Test Cases

##### Normal cases (3)
- Navigating to `/blog` renders the Home feed listing all three post titles as clickable links.
- Clicking a post title navigates to `/blog/post/{id}` and displays that post's full title and content.
- Navigating to `/blog/about` renders the About page with descriptive content about the blog.

##### Edge cases (3)
- Visiting `/blog/post/999` (a non-existent ID) shows a "Post Not Found" message and a button to return to the feed without crashing.
- Visiting `/blog/post/abc` (a non-numeric ID) also shows the "Post Not Found" fallback since `Number("abc")` returns `NaN` and `.find()` returns `undefined`.
- Clicking "← Return to Feed" from a post view navigates back to `/blog` using `useNavigate()` without triggering a full page reload.

---

### Recipe Gallery with React Router
- The Recipe Gallery uses nested routes under `/recipes` with a persistent `RecipeLayout` nav shell and `<Outlet />` for child content.
- `RecipeGallery` renders all recipes as clickable image thumbnails using `<Link to="/recipes/recipe/{id}">` — replacing the old previous/next button approach.
- `RecipeDetail` uses `useParams()` to extract the recipe `id` from the URL and `.find()` to locate the matching recipe object from the data source.
- Each detail page displays the recipe image, title, description, and full numbered cooking instructions.
- Invalid or non-existent recipe IDs are handled with a "Recipe Not Found" fallback page.

#### Test Cases

##### Normal cases (3)
- Navigating to `/recipes/gallery` renders all four recipe thumbnails with titles as clickable links.
- Clicking a recipe thumbnail navigates to `/recipes/recipe/{id}` and displays that recipe's image, title, and cooking instructions.
- Clicking "← Back to Gallery" from a recipe detail page returns the user to the gallery grid.

##### Edge cases (3)
- Visiting `/recipes/recipe/999` (a non-existent ID) shows a "Recipe Not Found" message with a back button and does not crash.
- Visiting `/recipes/recipe/abc` (a non-numeric ID) shows the "Recipe Not Found" fallback since `Number("abc")` is `NaN` and `.find()` returns `undefined`.
- Navigating directly to `/recipes` renders the Home welcome page with a "Browse Recipes →" link, confirming the index route is correctly configured.

---

### User Registration Form with React Hook Form

##### Normal cases (3)
- Filling all fields with valid data enables the submit button, shows "Registering..." for 2 seconds, then displays a success banner and resets every field to its default empty value.
- Typing a valid email like `user@example.com` shows no error; changing it to `notanemail` immediately shows the email validation error in real time due to `mode: 'onChange'`.
- Selecting a role from the dropdown clears the role error; resetting the dropdown back to "Select a role..." re-triggers the required error without submitting.

##### Edge cases (3)
- Submitting with the Full Name field containing only whitespace (e.g. `"   "`) triggers the `minLength` error because the field value does not meet the 3-character minimum after React Hook Form evaluates it.
- Entering a matching confirm password then changing the primary password to something different immediately re-triggers the mismatch error on the confirm field via the live `watch` cross-reference.
- Refreshing the page mid-form preserves all previously typed values because the `useEffect` + `watch` subscription continuously writes to `localStorage` and the mount effect rehydrates via `setValue`.

---

### isHealthRecordSymmetric (Code-Interview)

**Problem:** Given a singly linked list of patient health metrics, determine whether the sequence is a palindrome (reads the same forwards and backwards).

**Clarifying Questions:**
- Q1: Can the list be empty? = Yes. An empty list (`head = None`) is considered symmetric (trivially).

- Q2: Can the list have a single node? = Yes. A single-node list is always symmetric.

- Q3: Are values integers, floats, or strings? = Integers or floats for health metrics. Comparison uses `==`.

- Q4: Should the original list structure be preserved after the check? = Yes — the list is restored after comparison.

- Q5: Can there be negative values? = Yes (e.g., temperature deltas). The algorithm is value-agnostic.

**Algorithm — Two-Pointer + In-Place Reversal:**
1. Use slow/fast pointers to find the midpoint of the list.

2. Reverse the second half of the list in-place.

3. Walk both halves simultaneously, comparing values node by node.

4. Restore the list to its original order.

5. Return `True` if all values matched, `False` otherwise.

**Complexity:**
- Time: O(n) — three linear passes (find midpoint, reverse, compare)
- Space: O(1) — no extra data structures; reversal is performed in-place


##### Normal cases (3)
- An even-length palindrome list `[90, 85, 85, 90]` returns `True`.
- An odd-length palindrome list `[70, 80, 90, 80, 70]` returns `True`.
- A non-symmetric list `[100, 95, 90, 85]` returns `False`.

##### Edge cases (3)
- An empty list (`None` head) returns `True` — trivially symmetric.
- A single-node list returns `True` — one value is always a palindrome.
- Two different values `[75, 80]` returns `False`; two equal values `[75, 75]` returns `True`.

---

### Dynamic Poll Dashboard (Chart.js + useEffect)

##### Normal cases (3)
- Clicking the React vote button once increments the React bar by exactly 1 and updates the vote count label in the button without affecting any other framework's bar.
- Voting for multiple frameworks in sequence produces a bar chart where each bar height corresponds precisely to that framework's vote count, verified visually and by the counter labels on each button.
- Clicking Reset returns all vote counts to 0 and renders all bars at the baseline, confirming that the chart's `.update()` method correctly repaints on a full state reset.

##### Edge cases (3)
- Voting for the same framework many times in rapid succession keeps the chart in sync — no stale renders or duplicate chart instances are created because the effect branches on `chartInstanceRef.current` rather than always constructing a new `Chart()`.
- If the component unmounts and remounts (e.g., navigating away and back), the cleanup `.destroy()` call prevents the "Canvas is already in use" error that would occur if the old instance were left alive on the same canvas node.
- Resetting immediately after a vote (two state updates in quick succession) does not leave the chart in an inconsistent visual state, because each effect run either creates or synchronizes the single shared instance.

---

### Responsive Card (useEffect + window resize)
- `ResponsiveCard` uses `useEffect` with an empty dependency array `[]` to register a single `resize` event listener on `window` when the component mounts.
- The `handleResize` handler calls `setWindowSize` with the current `window.innerWidth` and `window.innerHeight`, keeping the displayed dimensions in sync with the real viewport.
- The effect returns a cleanup function that calls `window.removeEventListener` to detach the handler on unmount, preventing stale state updates and memory leaks.
- The card switches layout direction (`row` ↔ `column`) and background color when crossing the 768px mobile/desktop breakpoint.

#### Test Cases

##### Normal cases (3)
- On initial render, the card displays the correct current `window.innerWidth` and `window.innerHeight` values without requiring a resize event.
- Resizing the browser window above 768px shows the Desktop label with a horizontal (`row`) layout and cyan background; resizing below 768px switches to the Mobile label, vertical (`column`) layout, and indigo background.
- The displayed width and height values update continuously and accurately as the window is dragged to different sizes, confirming the `resize` listener fires on every dimension change.

##### Edge cases (3)
- The event listener is registered exactly once regardless of how many times React re-renders the component, because the empty `[]` dependency array ensures the effect runs only on mount — not on every state update triggered by `setWindowSize`.
- When the component unmounts (e.g., if conditionally removed from the tree), the cleanup function fires and removes the `resize` listener, so no further `setWindowSize` calls occur and no "Can't perform a React state update on an unmounted component" warning is triggered.
- Resizing the window to exactly 768px (the breakpoint boundary) displays the Mobile layout since the condition is `width < 768`, confirming strict less-than boundary behavior.

---

### Profile Form — RHF + TanStack Query

##### Normal cases (3)
- On mount, all four fields (username, email, bio, notifications checkbox) are pre-populated with the values returned from `GET /profile`, and the Save button is disabled because `isDirty` is false.
- Changing any field value enables the Save button; clicking Save sends a `PUT /profile` with the full payload, shows "Saving..." during the 2-second request, then re-disables the button and shows the success banner once the server responds.
- After a successful save, editing the email field back to its original server value returns `isDirty` to false and re-disables the Save button, confirming that `reset(updatedData)` correctly resets the dirty baseline to the latest server state.

##### Edge cases (3)
- Entering `conflict@example.com` in the email field and clicking Save triggers the simulated 409 rejection, which surfaces an inline error message on the email field via `setError` without resetting or clearing any other field.
- If JSON Server is not running, `useQuery` enters an error state and the form renders the error banner ("Could not reach the mock API") instead of showing empty broken inputs.
- Toggling the notifications checkbox on and off in sequence — returning it to its original server value — correctly reflects `isDirty: false` and re-disables the Save button, confirming boolean field dirty-tracking works correctly.

---
