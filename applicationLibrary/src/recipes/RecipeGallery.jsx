import { Link } from 'react-router-dom'
import { recipes } from './recipes'

export default function RecipeGallery() {
  return (
    <div className="recipe-page">
      <h2 className="recipe-heading">All Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link
            to={`/recipes/recipe/${recipe.id}`}
            className="recipe-thumb"
            key={recipe.id}
          >
            <img src={recipe.url} alt={recipe.title} />
            <div className="recipe-thumb-label">{recipe.title}</div>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" className="recipe-btn recipe-btn-secondary">
          ← Return to Application Library
        </Link>
      </div>
    </div>
  )
}
