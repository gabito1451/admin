import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-2">
      {showValue && <span className="text-xl text-neutrals-10 font-normal">{rating}</span>}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;

          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                filled || halfFilled
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'fill-gray-200 text-gray-200'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
