import Counter from './Counter'
import Gallery from './Gallery'
import UserProfile from './UserProfile'
import TaskManager from './TaskManager'
import ShoppingListWithImmer from './ShoppingListWithImmer'

function App() {
  return (
    <main className="app-shell">
      <h1>React State Dashboard</h1>
      <p className="subtitle">
        Explore state snapshots, asynchronous updates, image navigation, nested objects, task arrays, and Immer drafts.
      </p>
      <div className="section-stack">
        <Counter />
        <Gallery />
        <UserProfile />
        <TaskManager />
        <ShoppingListWithImmer />
      </div>
    </main>
  )
}

export default App
