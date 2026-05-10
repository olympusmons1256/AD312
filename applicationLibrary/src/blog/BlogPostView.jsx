import { useParams, useNavigate } from 'react-router-dom'
import { posts } from './posts'

export default function BlogPostView() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = posts.find((p) => p.id === Number(postId))

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-card blog-not-found">
          <h2>Post Not Found</h2>
          <p>No post exists with ID &ldquo;{postId}&rdquo;.</p>
          <button className="blog-btn" onClick={() => navigate('/blog')}>
            ← Return to Feed
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-page">
      <div className="blog-card">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button className="blog-btn" onClick={() => navigate('/blog')}>
          ← Return to Feed
        </button>
      </div>
    </div>
  )
}
