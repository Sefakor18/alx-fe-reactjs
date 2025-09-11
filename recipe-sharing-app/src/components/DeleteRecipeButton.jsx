import { useRecipeStore } from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Delete this recipe?')) {
      deleteRecipe(id);
      navigate('/');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteRecipeButton;
