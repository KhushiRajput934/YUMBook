import logo from "../assets/logo.webp";

export default function Header({ searchTerm, setSearchTerm, handleSearch, toggleForm }) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-400 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center p-4">
        
        <h1 className="text-4xl font-extrabold tracking-wide flex items-center gap-2 justify-center sm:justify-start">
          <img 
          src={logo} 
          alt="Logo" 
          className="w-8 h-8 object-cover rounded-full"/>
          <span className="font-yum">The YummyBook</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-white rounded-lg overflow-hidden w-full sm:w-72 shadow-sm">
            <span
              onClick={handleSearch}
              className="px-3 text-gray-500 cursor-pointer hover:text-green-500"
            >
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 p-2 outline-none text-black text-sm"
            />
          </div>

          <button
            onClick={toggleForm}
            className="bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-50 transition w-full sm:w-auto"
          >
            Add Recipe
          </button>
        </div>
      </div>
    </header>
  );
}
