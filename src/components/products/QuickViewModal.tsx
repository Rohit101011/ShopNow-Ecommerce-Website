import React, { useEffect, useState } from 'react';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeQuickView } from '../../store/slices/uiSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { Product } from '../../types';

const QuickViewModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isQuickViewOpen, activeProduct } = useAppSelector((state) => state.ui);
  const products = useAppSelector((state) => state.products.items);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (activeProduct && products.length > 0) {
      const foundProduct = products.find((p) => p.id === activeProduct);
      if (foundProduct) {
        setProduct(foundProduct);
        setQuantity(1);
      }
    }
  }, [activeProduct, products]);

  useEffect(() => {
    if (isQuickViewOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isQuickViewOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      dispatch(closeQuickView());
    }, 300);
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      handleClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isQuickViewOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative transition-all duration-300 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition z-10"
          aria-label="Close quick view"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex items-center justify-center bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-[400px] object-contain"
            />
          </div>

          <div className="p-8">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4 capitalize">
              {product.category}
            </span>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h2>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(product.rating.rate)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating.count} reviews)
              </span>
            </div>
            
            <p className="text-2xl font-bold text-gray-800 mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-y border-gray-300 py-1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                className="btn btn-outline flex items-center justify-center p-3"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;