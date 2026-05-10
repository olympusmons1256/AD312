import { NavLink, Outlet } from 'react-router-dom'

export default function BlogLayout() {
  return (
    <div className="blog-shell">
      <nav className="blog-nav">
        <NavLink to="/blog" end className={({ isActive }) => isActive ? 'blog-nav-link active' : 'blog-nav-link'}>
          Home
        </NavLink>
        <NavLink to="/blog/about" className={({ isActive }) => isActive ? 'blog-nav-link active' : 'blog-nav-link'}>
          About
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
