import { useMemo } from 'react';
import { useAppSelector } from './useAppSelector';
import { Product } from '../types';

export const useFilteredProducts = () => {
  const { items } = useAppSelector((state) => state.products);
  const { filter, sort } = useAppSelector((state) => state.filter);
  const { page, itemsPerPage } = useAppSelector((state) => state.products);

  return useMemo(() => {
    let filteredProducts = [...items];

    // Apply category filter
    if (filter.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filter.categories.includes(product.category)
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filter.priceRange.min &&
        (filter.priceRange.max === null || product.price <= filter.priceRange.max)
    );

    // Apply rating filter
    if (filter.rating !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating.rate >= filter.rating
      );
    }

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sort.field) {
      filteredProducts.sort((a, b) => {
        let valueA = a[sort.field as keyof Product];
        let valueB = b[sort.field as keyof Product];

        // Handle nested properties like rating.rate
        if (sort.field === 'rating') {
          valueA = (a.rating as any).rate;
          valueB = (b.rating as any).rate;
        }

        if (valueA < valueB) {
          return sort.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sort.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else if (sort.id === 'featured') {
      // Default featured sorting by rating count and rate
      filteredProducts.sort((a, b) => {
        const scoreA = a.rating.rate * a.rating.count;
        const scoreB = b.rating.rate * b.rating.count;
        return scoreB - scoreA;
      });
    }

    // Apply pagination for display
    const paginatedProducts = filteredProducts.slice(0, page * itemsPerPage);
    
    // Check if there are more products to load
    const hasMore = paginatedProducts.length < filteredProducts.length;

    return {
      filteredProducts: paginatedProducts,
      hasMore,
      totalResults: filteredProducts.length,
    };
  }, [items, filter, sort, page, itemsPerPage]);
};