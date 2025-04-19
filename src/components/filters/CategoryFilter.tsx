import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCategories } from '../../store/slices/filterSlice';
import { fetchCategories } from '../../store/slices/productsSlice';

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const availableCategories = useAppSelector((state) => state.products.categories);
  const selectedCategories = useAppSelector((state) => state.filter.filter.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      dispatch(setCategories(selectedCategories.filter((c) => c !== category)));
    } else {
      dispatch(setCategories([...selectedCategories, category]));
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      <div className="space-y-2">
        {availableCategories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label
              htmlFor={`category-${category}`}
              className="ml-3 text-sm text-gray-700 capitalize"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;