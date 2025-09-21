import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);

  return (
    <div>
      <h2>Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p>No matching recipes found.</p>
      ) : (
        filteredRecipes.map((r) => (
          <div key={r.id} style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
            <h3>
              <Link to={`/recipes/${r.id}`}>{r.title}</Link>
            </h3>
            <p>{r.description}</p>
            <div>
              <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
              {' | '}
              <DeleteRecipeButton recipeId={r.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
