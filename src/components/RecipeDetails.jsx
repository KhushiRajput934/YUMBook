export default function RecipeDetails({ recipe, onClose }) {
    const stepsArray = Array.isArray(recipe.steps)
    ? recipe.steps
    : recipe.steps?.split(/\. |\n/).filter(step => step.trim() !== "");
    
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>

          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full rounded mb-4 object-cover"
          />

          <h3 className="font-semibold mb-1">Ingredients:</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {recipe.ingredients}
          </p>

          {recipe.steps && (
            <>
               <h3 className="font-semibold mt-4">Steps:</h3>
               <ol className="list-decimal pl-5 space-y-2">
                {stepsArray.map((step, idx) => (
                    <li key={idx} className="text-gray-700">{step}</li>
                ))}
                </ol>
            </>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
