import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";

export default function RecipeList({ searchTerm, recipes, setRecipes, localRecipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch API recipes when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [searchTerm, setRecipes]);

  // Filter local recipes
  const filteredLocal = searchTerm
    ? localRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : localRecipes;

  // Merge local + API
  const allRecipes = [
    ...filteredLocal,
    ...recipes.map((meal) => ({
    name: meal.strMeal,
    image: meal.strMealThumb,
    ingredients: meal.strIngredients || meal.strIngredient1 || "",
    steps: meal.strInstructions
      ? meal.strInstructions.split(/\. |\n/).filter(s => s.trim() !== "")
      : []
    }))
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500 border-solid mb-3"></div>
        Loading recipes...
      </div>
    );
  }

  // No results
  // No results
if (allRecipes.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png"
        alt="No recipes"
        className="mx-auto mb-6 w-40 sm:w-48"
      />
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
        No Recipes Found
      </h2>
      <p className="text-gray-500 max-w-sm">
        We couldn’t find any recipes matching your search. Try different keywords
        or browse our featured recipes.
      </p>
    </div>
  );
}

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 px-4">
        {allRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            onSelect={setSelectedRecipe}
          />
        ))}
      </div>

      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}
