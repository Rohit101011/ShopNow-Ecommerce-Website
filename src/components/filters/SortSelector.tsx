import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SortOption } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSort } from '../../store/slices/filterSlice';

const sortOptions: SortOption[] = [
  { id: 'featured', name: 'Featured', direction: 'desc', field: null },
  { id: 'price-low-high', name: 'Price: Low to High', direction: 'asc', field: 'price' },
  { id: 'price-high-low', name: 'Price: High to Low', direction: 'desc', field: 'price' },
  { id: 'rating-high-low', name: 'Highest Rated', direction: 'desc', field: 'rating' },
  { id: 'name-a-z', name: 'Name: A to Z', direction: 'asc', field: 'title' },
  { id: 'name-z-a', name: 'Name: Z to A', direction: 'desc', field: 'title' },
];

const SortSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = useAppSelector((state) => state.filter.sort);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortChange = (option: SortOption) => {
    dispatch(setSort(option));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-auto btn btn-outline min-w-[180px]"
      >
        <span>Sort: {currentSort.name}</span>
        <ChevronDown size={16} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 divide-y divide-gray-100 animate-fade-in">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSortChange(option)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentSort.id === option.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortSelector;