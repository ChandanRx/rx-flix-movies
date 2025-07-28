import { Star } from "lucide-react";
import { useState } from "react";

export default function StarRating({
  maxRating = 5,
  size = 24,
  className = "",
  onSetRating,
}) {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);

  function handleRate(r) {
    setRating(r);
    onSetRating?.(r); // Lift the rating up
  }

  return (
    <div className={`flex gap-1 items-center ${className}`}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={`cursor-pointer transition-colors ${
            (tempRating || rating) > i
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
          onMouseEnter={() => setTempRating(i + 1)}
          onMouseLeave={() => setTempRating(0)}
          onClick={() => handleRate(i + 1)}
        />
      ))}
    </div>
  );
}
