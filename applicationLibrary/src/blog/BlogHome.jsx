import { Link } from 'react-router-dom'
import { posts } from './posts'

export default function BlogHome() {
  return (
    <div className="blog-page">
      <h2 className="blog-heading">Latest Posts</h2>
      {posts.map((post) => (
        <div className="blog-card" key={post.id}>
          <h3>
            <Link to={`/blog/post/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="blog-meta">Post #{post.id}</p>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/" className="blog-entry-link">← Return to Application Library</Link>
      </div>
    </div>
  )
}
