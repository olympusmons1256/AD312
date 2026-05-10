import { NavLink, Outlet, Link } from 'react-router-dom'

export default function RecipeLayout() {
  return (
    <div className="recipe-shell">
      <nav className="recipe-nav">
        <span className="recipe-brand">🍽️ Recipe Gallery</span>
        <NavLink
          to="/recipes"
          end
          className={({ isActive }) =>
            isActive ? 'recipe-nav-link active' : 'recipe-nav-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/recipes/gallery"
          className={({ isActive }) =>
            isActive ? 'recipe-nav-link active' : 'recipe-nav-link'
          }
        >
          Gallery
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
