import { useState } from "react";

export default function RecipeForm({ setLocalRecipes, closeForm }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState([""]);
  const [image, setImage] = useState("");


  const addStep = () => setSteps([...steps, ""]);
  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !ingredients || !steps) return alert("Please fill all fields");

    const newRecipe = {
      id: Date.now(),
      name,
      ingredients,
      steps,
      image: image || "https://via.placeholder.com/150",
    };

    setLocalRecipes((prev) => [...prev, newRecipe]);
    setName("");
    setIngredients("");
    setSteps("");
    setImage("");

    closeForm(); // hide the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100"
    >
    <h2 className="text-xl font-semibold text-gray-700">Add Your Recipe</h2>
    <input
      type="text"
      placeholder="Recipe Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <textarea
      placeholder="Ingredients (comma separated)"
      value={ingredients}
      onChange={(e) => setIngredients(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      rows="3"
    />
      <textarea
        placeholder="Preparation Steps"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        rows="4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-green-50 file:text-green-700 
                  hover:file:bg-green-100"
      />
      <div className="mb-4">
        <label className="block font-medium">Steps:</label>
        {steps.map((step, idx) => (
          <input
            key={idx}
            type="text"
            value={step}
            onChange={(e) => updateStep(idx, e.target.value)}
            placeholder={`Step ${idx + 1}`}
            className="border p-2 rounded w-full mt-1"
          />
        ))}
        <button
          type="button"
          onClick={addStep}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          + Add Step
        </button>
      </div>

      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
        Add Recipe
      </button>
   </form>
  );
}
