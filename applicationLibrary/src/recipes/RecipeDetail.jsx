import { useParams, Link } from 'react-router-dom'
import { recipes } from './recipes'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = recipes.find((r) => r.id === Number(id))

  if (!recipe) {
    return (
      <div className="recipe-page">
        <div className="recipe-not-found">
          <h2>Recipe Not Found</h2>
          <p>No recipe exists with ID &ldquo;{id}&rdquo;.</p>
          <Link to="/recipes/gallery" className="recipe-btn">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="recipe-page">
      <div className="recipe-detail">
        <img src={recipe.url} alt={recipe.title} className="recipe-detail-img" />
        <h2>{recipe.title}</h2>
        <p className="recipe-detail-desc">{recipe.description}</p>
        <h3>Cooking Instructions</h3>
        <ol className="recipe-instructions">
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <Link to="/recipes/gallery" className="recipe-btn">
          ← Back to Gallery
        </Link>
      </div>
    </div>
  )
}
