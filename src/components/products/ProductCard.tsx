import React from 'react';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useAppDispatch } from '../../hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { openQuickView } from '../../store/slices/uiSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
      className="product-card group animate-fade-in" 
      onClick={handleQuickView}
    >
      <div className="relative w-full h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="btn bg-white text-gray-800 hover:bg-primary-50 shadow-md flex items-center space-x-1 p-2 rounded-full"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
            <button
              onClick={handleQuickView}
              className="btn bg-white text-gray-800 hover:bg-primary-50 shadow-md flex items-center space-x-1 p-2 rounded-full"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
          <div className="ml-auto flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {product.rating.rate}
            </span>
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10">
          {product.title}
        </h3>
        <p className="text-lg font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;