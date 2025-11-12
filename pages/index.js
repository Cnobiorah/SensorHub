import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import SensorCard from "../components/SensorCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    iface: [],
    priceMax: "",
  });
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light"); // ✅ Dark / light mode

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams({ q: query });
    if (filters.category?.length) params.set("category", filters.category.join("|"));
    if (filters.iface?.length) params.set("iface", filters.iface.join("|"));
    if (filters.priceMax) params.set("priceMax", String(filters.priceMax));

    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  // Auto-search when filters or query change
  useEffect(() => {
    handleSearch();
  }, [filters, query]);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } p-6`}
    >
      <div className="max-w-7xl mx-auto">
        {/* 🌿 Header: title + theme toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-green-400" : "text-gray-900"
            }`}
          >
            Sensor.Ai
          </h1>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isDark
                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {isDark ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters panel */}
          <div className="md:w-1/4">
            <Filters value={filters} onChange={setFilters} theme={theme} />
          </div>

          {/* Main results section */}
          <div className="flex-1">
            {/* 🔍 Search bar and button */}
            <div className="flex items-center gap-2 mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a sensor..."
                className={`flex-1 border rounded-lg p-2 transition ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                onClick={handleSearch}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  isDark
                    ? "bg-green-500 hover:bg-green-400 text-black"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                Search
              </button>
            </div>

            {/* Results status line */}
            {loading ? (
              <p className="text-gray-400 mb-3">Searching...</p>
            ) : (
              <p className="text-sm text-gray-500 mb-3">
                {results.length} sensor{results.length !== 1 ? "s" : ""} found
              </p>
            )}

            {/* Results grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((sensor, index) => (
                  <SensorCard key={index} sensor={sensor} theme={theme} />
                ))}
              </div>
            ) : (
              !loading && <p className="text-gray-400 mt-2">No sensors found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
