// App.jsx
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import StarRating from "@/components/StarRating"; // still needed inside MovieDetails
import { Input } from "@/components/ui/input";
import { Search, Clapperboard } from "lucide-react";

const apiKey = "717e10c1";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const stored = localStorage.getItem("watched");
    return JSON.parse(stored) ?? [];
  });

  function handleSelectMovie(id) {
    setSelectedId((s) => (s === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((m) => m.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movies found");
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleSelectMovie(null);
    fetchMovies();

    return () => controller.abort();
  }, [query]);


  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="animated-gradient-navbar shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-wider funky-logo text-white bg-clip-text">
              🎬Rx-Flix
            </h1>
          </div>


          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#E0D6FF]" />
            </div>

            <Input
              className="w-full pl-10 bg-white text-black placeholder-[#D1C4FF] 
         border-none border-b-2 border-[#B9A9FF] rounded
         focus:outline-none focus:border-white 
         transition-all duration-300"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>




      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <MovieList
            movies={movies}
            isLoading={isLoading}
            error={error}
            onSelect={handleSelectMovie}
          />
          {selectedId ? (
            <MovieDetails
              apiKey={apiKey}
              selectedId={selectedId}
              onClose={() => setSelectedId(null)}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <WatchedSummary
              watched={watched}
              handleDeleteWatched={handleDeleteWatched}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
