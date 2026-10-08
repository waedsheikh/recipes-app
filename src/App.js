import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import RecipeCard from "./components/RecipeCard";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [query, setQuery] = useState("chicken");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchRecipes(searchTerm = query) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error("Failed to load recipes");
      }

      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError("Could not load recipes. Please try another dish.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes("chicken");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (value) => {
    const term = value.trim();
    setQuery(term || "chicken");
    fetchRecipes(term || "chicken");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Discover dishes</p>
          <h1>Food Recipe App</h1>
        </div>
      </header>

      <SearchBar value={query} onSearch={handleSearch} />

      {loading && <p className="status">Loading recipes...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="status">No recipes found for “{query}”.</p>
      )}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;
