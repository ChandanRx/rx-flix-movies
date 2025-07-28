// components/MovieList.jsx
import { Film, Loader } from "lucide-react";

const MovieList = ({ movies, isLoading, error, onSelect }) => {
  return (
    <section className="flex-1">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Film className="h-5 w-5 text-indigo-600" />
            Movies & TV
          </h2>
          {!isLoading && !error && movies.length > 0 && (
            <span className="text-sm text-gray-500">{movies.length} results</span>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader className="animate-spin h-8 w-8 text-indigo-600" />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-gray-500">⚠️ {error}</div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => onSelect(movie.imdbID)}
                className="cursor-pointer group transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                    className="w-full h-full object-cover group-hover:opacity-90"
                    alt={`${movie.Title} poster`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 p-3 flex items-end transition-opacity">
                    <div>
                      <h3 className="text-white font-medium text-sm">{movie.Title}</h3>
                      <p className="text-gray-300 text-xs">{movie.Year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieList;
