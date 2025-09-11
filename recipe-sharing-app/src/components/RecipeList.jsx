import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((r) => (
          <div key={r.id} style={{ border: '1px solid #ccc', padding: 8, margin: 8 }}>
            <Link to={`/recipes/${r.id}`}>
              <h3>{r.title}</h3>
            </Link>
            <p>{r.description}</p>
            <Link to={`/recipes/${r.id}/edit`} style={{ marginRight: 8 }}>Edit</Link>
            <DeleteRecipeButton id={r.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
