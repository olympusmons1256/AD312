import { useContext, useState } from 'react'
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
import ThemeSwitcher from './ThemeSwitcher'
import { ThemeContext } from './ThemeContext'
import { UserProvider } from './UserContext'
import UserRegistrationForm from './UserRegistrationForm'
import ProfileFormTanStack from './ProfileFormTanStack'
import PollDashboard from './PollDashboard'
import ResponsiveCard from './ResponsiveCard'
import StreamingLayout from './StreamingLayout'
import ThemePreferenceDemo from './ThemePreferenceDemo'

function Dashboard() {
  const { theme, themeValues } = useContext(ThemeContext)
  const [showCard, setShowCard] = useState(true)
  return (
    <main
      className={`app-shell ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
      style={{
        background: themeValues.surface,
        color: themeValues.text,
        border: `1px solid ${themeValues.border}`,
        transition: 'background 0.3s ease, color 0.3s ease',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeSwitcher />
      </div>
      <h1>React State Dashboard</h1>
      <p className="subtitle" style={{ color: themeValues.subtext }}>
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
        <UserRegistrationForm />
        <ProfileFormTanStack />
        <PollDashboard />
        <button
          onClick={() => setShowCard((s) => !s)}
          style={{ margin: '0.5rem 0', padding: '0.4rem 1rem', cursor: 'pointer' }}
        >
          {showCard ? 'Unmount' : 'Mount'} ResponsiveCard
        </button>
        {showCard && <ResponsiveCard />}
        <StreamingLayout />
        <ThemePreferenceDemo />
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
      <Route path="/" element={<UserProvider><Dashboard /></UserProvider>} />
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
