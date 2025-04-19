import React from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleMobileFilter } from '../../store/slices/uiSlice';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import RatingFilter from './RatingFilter';
import { resetFilters } from '../../store/slices/filterSlice';

const FilterSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobileFilterOpen = useAppSelector((state) => state.ui.isMobileFilterOpen);
  const productsCount = useAppSelector((state) => state.products.items.length);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 pr-8">
        <div className="sticky top-28">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Filters</h2>
            <button 
              onClick={handleResetFilters}
              className="text-sm text-primary-600 hover:text-primary-700 transition"
            >
              Reset All
            </button>
          </div>
          
          <CategoryFilter />
          <PriceRangeFilter />
          <RatingFilter />
        </div>
      </aside>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch(toggleMobileFilter())}></div>
        
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Filters</h2>
              <button
                onClick={() => dispatch(toggleMobileFilter())}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <button 
                onClick={handleResetFilters}
                className="btn btn-outline w-full mb-4"
              >
                Reset All Filters
              </button>
              
              <p className="text-sm text-gray-500 mb-4">
                {productsCount} Products Available
              </p>
            </div>
            
            <CategoryFilter />
            <PriceRangeFilter />
            <RatingFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;