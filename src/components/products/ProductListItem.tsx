import React from 'react';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useAppDispatch } from '../../hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { openQuickView } from '../../store/slices/uiSlice';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleQuickView = () => {
    dispatch(openQuickView(product.id));
  };

  return (
    <div 
      className="product-card flex flex-col sm:flex-row animate-fade-in"
      onClick={handleQuickView}
    >
      <div className="w-full sm:w-56 h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>
      <div className="flex-1 p-4">
        <div className="flex flex-wrap items-start justify-between mb-2">
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full capitalize mb-2">
            {product.category}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-xl font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleQuickView}
              className="btn btn-outline flex items-center"
              aria-label="Quick view"
            >
              <Eye size={18} className="mr-2" />
              Quick View
            </button>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex items-center"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;