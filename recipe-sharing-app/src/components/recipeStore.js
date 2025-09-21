import create from 'zustand';

const LOCAL_STORAGE_KEY = 'recipes_v1';

const load = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useRecipeStore = create((set, get) => ({
  recipes: load(),
  searchTerm: '',
  filteredRecipes: load(),
  favorites: [],
  recommendations: [],

  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
      return {
        recipes,
        filteredRecipes: get().applyFilter(recipes, state.searchTerm),
      };
    }),

  updateRecipe: (id, updatedFields) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedFields } : r
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
      return {
        recipes,
        filteredRecipes: get().applyFilter(recipes, state.searchTerm),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
      return {
        recipes,
        filteredRecipes: get().applyFilter(recipes, state.searchTerm),
        favorites: state.favorites.filter((fid) => fid !== id),
      };
    }),

  setSearchTerm: (term) => {
    const { recipes } = get();
    set({
      searchTerm: term,
      filteredRecipes: get().applyFilter(recipes, term),
    });
  },

  applyFilter: (recipes, term) => {
    if (!term) return recipes;
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase()) ||
        recipe.description.toLowerCase().includes(term.toLowerCase())
    );
  },

  // ----- FAVORITES -----
  addFavorite: (recipeId) =>
    set((state) =>
      state.favorites.includes(recipeId)
        ? {}
        : { favorites: [...state.favorites, recipeId] }
    ),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ----- RECOMMENDATIONS (mock logic) -----
  generateRecommendations: () =>
    set((state) => {
      // Simple mock: recommend random subset of all recipes not already favorited
      const pool = state.recipes.filter(
        (r) => !state.favorites.includes(r.id)
      );
      const recommended = pool.filter(() => Math.random() > 0.5);
      return { recommendations: recommended };
    }),
}));
