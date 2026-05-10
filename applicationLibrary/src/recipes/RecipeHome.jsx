import { Link } from 'react-router-dom'

export default function RecipeHome() {
  return (
    <div className="recipe-page">
      <div className="recipe-hero">
        <h1>Welcome to the Recipe Gallery</h1>
        <p>
          Discover a curated collection of delicious recipes — from wood-fired
          pizzas to vibrant garden salads. Click through to view full cooking
          instructions for each dish.
        </p>
        <Link to="/recipes/gallery" className="recipe-btn">
          Browse Recipes →
        </Link>
      </div>
    </div>
  )
}
