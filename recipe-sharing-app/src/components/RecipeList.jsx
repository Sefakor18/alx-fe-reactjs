import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import useRecipeStore from '../store/recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  return (
    <button
      onClick={() =>
        isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId)
      }
      style={{
        padding: '5px 10px',
        backgroundColor: isFavorite ? 'red' : 'lightgray',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
    </button>
  );
};

export default FavoriteButton;


const RecipeList = () => {
  const recipes = useRecipeStore((state) =>
    state.filteredRecipes.length > 0 ? state.filteredRecipes : state.recipes
  );

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px' }}
          >
            {/* ✅ Use Link instead of just <h3> */}
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
