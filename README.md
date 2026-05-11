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
