import Counter from './Counter'
import Gallery from './Gallery'
import UserProfile from './UserProfile'
import TaskManager from './TaskManager'
import ShoppingListWithImmer from './ShoppingListWithImmer'
import UserProfileWithImmer from './UserProfileWithImmer'
import DogQueryExplorer from './DogQueryExplorer'
import CrudQueryExplorer from './ManagingBlogPostTanStack'

function App() {
  return (
    <main className="app-shell">
      <h1>React State Dashboard</h1>
      <p className="subtitle">
        Explore state snapshots, async updates, nested state, Immer, TanStack Query reads, and full CRUD mutations.
      </p>
      <div className="section-stack">
        <Counter />
        <Gallery />
        <UserProfile />
        <UserProfileWithImmer />
        <TaskManager />
        <ShoppingListWithImmer />
        <DogQueryExplorer />
        <CrudQueryExplorer />
      </div>
    </main>
  )
}

export default App
