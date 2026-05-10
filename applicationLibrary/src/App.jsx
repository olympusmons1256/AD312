import { Routes, Route, Link } from 'react-router-dom'
import Counter from './Counter'
import Gallery from './Gallery'
import UserProfile from './UserProfile'
import TaskManager from './TaskManager'
import ShoppingListWithImmer from './ShoppingListWithImmer'
import UserProfileWithImmer from './UserProfileWithImmer'
import DogQueryExplorer from './DogQueryExplorer'
import CrudQueryExplorer from './ManagingBlogPostTanStack'
import BlogLayout from './blog/BlogLayout'
import BlogHome from './blog/BlogHome'
import BlogAbout from './blog/BlogAbout'
import BlogPostView from './blog/BlogPostView'
import RecipeLayout from './recipes/RecipeLayout'
import RecipeHome from './recipes/RecipeHome'
import RecipeGallery from './recipes/RecipeGallery'
import RecipeDetail from './recipes/RecipeDetail'

function Dashboard() {
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
      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/blog" className="blog-entry-link">Open Blog App →</Link>
        <Link to="/recipes" className="blog-entry-link">Open Recipe Gallery →</Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<BlogHome />} />
        <Route path="about" element={<BlogAbout />} />
        <Route path="post/:postId" element={<BlogPostView />} />
      </Route>
      <Route path="/recipes" element={<RecipeLayout />}>
        <Route index element={<RecipeHome />} />
        <Route path="gallery" element={<RecipeGallery />} />
        <Route path="recipe/:id" element={<RecipeDetail />} />
      </Route>
    </Routes>
  )
}

export default App
