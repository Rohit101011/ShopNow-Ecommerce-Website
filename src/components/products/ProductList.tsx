import React, { useEffect } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts, loadMoreProducts } from '../../store/slices/productsSlice';
import { setSort, setViewMode } from '../../store/slices/filterSlice';
import { toggleMobileFilter } from '../../store/slices/uiSlice';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import ProductSkeleton from './ProductSkeleton';
import SortSelector from '../filters/SortSelector';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, hasMore } = useAppSelector((state) => state.products);
  const viewMode = useAppSelector((state) => state.filter.viewMode);
  const { filteredProducts, totalResults } = useFilteredProducts();

  useEffect(() => {
    // Fetch products if they haven't been loaded yet
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleLoadMore = () => {
    dispatch(loadMoreProducts());
  };

  return (
    <div className="flex-1">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0">All Products</h1>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <button
            onClick={() => dispatch(toggleMobileFilter())}
            className="flex items-center justify-center md:hidden btn btn-outline"
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters
          </button>
          
          <SortSelector />
          
          <div className="hidden sm:flex border border-gray-300 rounded-md">
            <button
              onClick={() => dispatch(setViewMode('grid'))}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => dispatch(setViewMode('list'))}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {status === 'loading' && (
        <div className={`grid ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        } gap-6`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} viewMode={viewMode} />
          ))}
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
          <button
            onClick={() => dispatch({ type: 'filter/resetFilters' })}
            className="btn btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length > 0 && (
        <>
          <p className="text-sm text-gray-500 mb-6">
            Showing {filteredProducts.length} of {totalResults} products
          </p>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-8 text-center">
              <button onClick={handleLoadMore} className="btn btn-outline">
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {status === 'failed' && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-500 mb-6">There was an error loading products. Please try again.</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;