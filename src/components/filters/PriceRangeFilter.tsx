import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPriceRange } from '../../store/slices/filterSlice';

const PriceRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { priceRange } = useAppSelector((state) => state.filter.filter);
  const products = useAppSelector((state) => state.products.items);
  
  const [minPrice, setMinPrice] = useState<string>(priceRange.min.toString());
  const [maxPrice, setMaxPrice] = useState<string>(priceRange.max?.toString() || '');

  // Find the minimum and maximum prices in the product catalog
  const lowestPrice = Math.min(...products.map((product) => product.price));
  const highestPrice = Math.max(...products.map((product) => product.price));

  useEffect(() => {
    // Update the input fields when the price range in the store changes
    setMinPrice(priceRange.min.toString());
    setMaxPrice(priceRange.max?.toString() || '');
  }, [priceRange]);

  const handleApplyPriceRange = () => {
    const min = parseFloat(minPrice) || 0;
    const max = maxPrice === '' ? null : parseFloat(maxPrice) || null;
    dispatch(setPriceRange({ min, max }));
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Price Range</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
              Min
            </label>
            <input
              type="number"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min={0}
              step={1}
              className="input w-full"
              placeholder={`Min $${lowestPrice.toFixed(2)}`}
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
              Max
            </label>
            <input
              type="number"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min={0}
              step={1}
              className="input w-full"
              placeholder={`Max $${highestPrice.toFixed(2)}`}
            />
          </div>
        </div>
        <button
          onClick={handleApplyPriceRange}
          className="btn btn-outline w-full"
        >
          Apply Price Range
        </button>
      </div>
    </div>
  );
};

export default PriceRangeFilter;