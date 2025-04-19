import React from 'react';
import { ViewMode } from '../../types';

interface ProductSkeletonProps {
  viewMode: ViewMode;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <div className="product-card animate-pulse">
        <div className="bg-gray-200 h-64 w-full rounded-t-lg"></div>
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            <div className="h-5 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-7 bg-gray-200 rounded w-1/4 mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card flex flex-col sm:flex-row animate-pulse">
      <div className="w-full sm:w-56 h-56 bg-gray-200 rounded-l-lg"></div>
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center mt-6">
          <div className="h-7 bg-gray-200 rounded w-20"></div>
          <div className="flex space-x-3">
            <div className="h-10 bg-gray-200 rounded w-28"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;