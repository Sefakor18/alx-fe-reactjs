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
        padding: '6px 12px',
        backgroundColor: isFavorite ? '#d9534f' : '#5bc0de',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
    </button>
  );
};

export default FavoriteButton;
