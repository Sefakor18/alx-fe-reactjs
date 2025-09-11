import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === id));

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <div style={{ marginTop: 12 }}>
        <Link to={`/recipes/${id}/edit`} style={{ marginRight: 8 }}>Edit</Link>
        <DeleteRecipeButton id={recipe.id} />
      </div>
      <div style={{ marginTop: 16 }}>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
