import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === id));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) return <p>Recipe not found.</p>;

  const handleSubmit = (event) => {
  event.preventDefault();   // ✅ use "event" not "e"
  updateRecipe(recipe.id, { title, description });
  navigate(`/recipes/${recipe.id}`);
};


  return (
    <form onSubmit={handleSubmit} style={{ padding: 16 }}>
      <div>
        <label>Title</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
