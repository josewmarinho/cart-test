import { PiStarFill } from 'react-icons/pi';

interface ProductRatingProps {
  rating: number;
}

export const Rating = ({ rating }: ProductRatingProps) => {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-base ${
            star <= roundedRating ? 'text-yellow-500' : 'text-white-300'
          }`}
        >
          <PiStarFill />
        </span>
      ))}
    </div>
  );
};
