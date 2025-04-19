import React, { useEffect, useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleCart, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { CartItem } from '../../types';

const CartSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      dispatch(toggleCart());
    }, 300);
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h2 className="text-lg font-medium">Shopping Cart ({items.length})</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X size={24} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
              <button
                onClick={handleClose}
                className="btn btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 animate-fade-in">
                      <div className="flex items-center">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain object-center p-2"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-2 py-1 text-sm text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <button className="btn btn-primary w-full">
                  Checkout
                </button>
                <button
                  onClick={handleClose}
                  className="btn btn-outline w-full"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;