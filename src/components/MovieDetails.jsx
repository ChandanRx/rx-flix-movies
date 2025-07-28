import { useEffect, useState } from "react";
import { X, Star, TicketPlus, User } from "lucide-react";
import StarRating from "./StarRating";

const MovieDetails = ({ selectedId, onClose, onAddWatched, watched, apiKey }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.some((m) => m.imdbID === selectedId);
  const watchedUserRating = watched.find((m) => m.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Year: year,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    fetchDetails();
  }, [selectedId, apiKey]);

  useEffect(() => {
    document.title = title || "usePopcorn";
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    const handleEsc = (e) => e.code === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(" ")?.[0]),
      userRating: Number(userRating),
    };
    onAddWatched(newMovie);
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Star className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="aspect-video w-full bg-gray-100 overflow-hidden">
              <img
                src={poster !== "N/A" ? poster : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKgcKLmTBYAMoilRUPZqFTaoXjs1fxAIS5gQ&s"}
                className="w-full h-full object-cover"
                alt={`Poster of ${title}`}
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-sm hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {title} <span className="text-gray-500">({year})</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
              <span>{released}</span> <span>•</span> <span>{runtime}</span>{" "}
              <span>•</span> <span>{genre}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="font-medium">{imdbRating}</span>
                <span className="text-xs">/10</span>
              </div>
              <span className="text-sm text-gray-500">IMDb Rating</span>
            </div>

            <p className="text-gray-700 mb-6">{plot}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-600" /> Director
                </h3>
                <p className="text-gray-600">{director}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-600" /> Cast
                </h3>
                <p className="text-gray-600">{actors}</p>
              </div>
            </div>

            {!isWatched ? (
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Rate this movie</h3>
                <StarRating
                  maxRating={10}
                  size={28}
                  onSetRating={setUserRating}
                />

                {userRating > 0 && (
                  <button onClick={handleAdd} className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                    <TicketPlus className="h-4 w-4 inline mr-1" />
                    Add to Watchlist
                  </button>
                )}
              </div>
            ) : (
              <div className="border-t pt-6">
                <p className="text-gray-700 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  You rated this movie <strong>{watchedUserRating}</strong> stars
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
