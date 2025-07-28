import { Heart, List, Star, Clock, Film, X } from "lucide-react";

const average = (arr) => arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched, handleDeleteWatched }) => {
  const avgImdbRating = average(watched.map((m) => m.imdbRating)).toFixed(1);
  const totalRuntime = watched.reduce((acc, m) => acc + m.runtime, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <Heart className="h-5 w-5 text-indigo-600" />
          Your Watchlist
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<List className="h-4 w-4" />} label="Movies & TV" value={watched.length} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard icon={<Star className="h-4 w-4" />} label="Avg. IMDB Rating" value={avgImdbRating || "0.0"} color="text-amber-600" bg="bg-amber-50" />
          <StatCard icon={<Clock className="h-4 w-4" />} label="Total Runtime" value={`${totalRuntime} min`} color="text-blue-600" bg="bg-blue-50" />
        </div>

        {watched.length === 0 ? (
          <div className="text-center py-12 border-t border-gray-200">
            <Film className="h-12 w-12 text-gray-400 mb-4 mx-auto" />
            <h3 className="text-gray-900 font-medium">Your watchlist is empty</h3>
            <p className="text-gray-500 mt-1">Search for movies and add them to your watchlist</p>
          </div>
        ) : (
          <ul className="space-y-2 border-t border-gray-200 pt-6">
            {watched.map((movie) => (
              <li key={movie.imdbID} className="flex gap-4 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={
                    movie.poster !== "N/A"
                      ? movie.poster
                      : "https://via.placeholder.com/100x150?text=No+Poster"
                  }
                  alt={movie.title}
                  className="h-30 w-20 object-cover rounded-sm"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{movie.imdbRating} IMDB</span>
                    <span className="text-gray-400">•</span>
                    <span>{movie.runtime} min</span>
                    <span className="text-indigo-600 ml-2 font-medium">⭐ {movie.userRating}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteWatched(movie.imdbID)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div className={`${bg} rounded-lg p-4`}>
    <div className={`flex items-center gap-2 ${color} mb-1`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default WatchedSummary;
