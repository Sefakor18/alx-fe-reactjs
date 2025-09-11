import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';

function Home() {
  return (
    <>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <SearchBar />   {/* ✅ Added here */}
      <RecipeList />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
