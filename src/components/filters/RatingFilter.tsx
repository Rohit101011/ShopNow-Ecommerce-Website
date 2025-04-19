import React from 'react';
import { Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setRating } from '../../store/slices/filterSlice';

const RatingFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedRating = useAppSelector((state) => state.filter.filter.rating);

  const handleRatingChange = (rating: number) => {
    if (selectedRating === rating) {
      // If clicking the same rating, clear the filter
      dispatch(setRating(null));
    } else {
      dispatch(setRating(rating));
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Customer Ratings</h3>
      <div className="space-y-2">
        {[4, 3, 2, 1].map((rating) => (
          <div 
            key={rating} 
            className={`flex items-center cursor-pointer p-2 rounded-md transition ${
              selectedRating === rating ? 'bg-primary-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleRatingChange(rating)}
          >
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={`${
                    index < rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {rating} Star{rating > 1 ? 's' : ''} & Above
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;