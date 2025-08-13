import { useState, useEffect } from "react";
import Header from "./components/Header";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import demoRecipes from "./data/demoRecipes";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [localRecipes, setLocalRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);

   const handleSearch = () => {
    if (!searchTerm.trim()) {
      setRecipes([]); // clear API results if empty
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
      })
      .catch((err) => console.error("API Error:", err));
  };

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("localRecipes")) || [];
     if (stored.length === 0) {
    setLocalRecipes(demoRecipes);
    localStorage.setItem("localRecipes", JSON.stringify(demoRecipes));
  } else {
    setLocalRecipes(stored);
  }
  }, []);

  // Save to localStorage when localRecipes changes
  useEffect(() => {
    localStorage.setItem("localRecipes", JSON.stringify(localRecipes));
  }, [localRecipes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch}
        toggleForm={() => setShowForm(!showForm)} 
      />
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {showForm && (
        <RecipeForm 
          setLocalRecipes={setLocalRecipes} 
          closeForm={() => setShowForm(false)} 
        />
)}
        <RecipeList
          searchTerm={searchTerm}
          recipes={recipes}
          setRecipes={setRecipes}
          localRecipes={localRecipes}
        />
      </div>
    </div>
  );
}
