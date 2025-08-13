export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col"
      onClick={() => onSelect(recipe)}
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 sm:h-56 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {recipe.name}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base mt-2 line-clamp-3">
          {recipe.ingredients}
        </p>
      </div>
    </div>
  );
}
