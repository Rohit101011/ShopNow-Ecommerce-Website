import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSearch } from '../store/slices/filterSlice';
import { toggleCart } from '../store/slices/cartSlice';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(searchValue));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">ShopNow</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="/" className="text-gray-800 hover:text-primary-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-800 hover:text-primary-600 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-800 hover:text-primary-600 transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-800 hover:text-primary-600 transition">
                  About
                </a>
              </li>
            </ul>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="input pl-10 pr-4 py-2 w-64"
              />
              <Search
                size={18}
                className="absolute left-3 text-gray-400"
              />
            </form>
            
            <button 
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search (always visible) */}
        <div className="mt-4 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center relative"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input pl-10 pr-4 py-2 w-full"
            />
            <Search
              size={18}
              className="absolute left-3 text-gray-400"
            />
          </form>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 animate-fade-in">
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="#" className="text-gray-800 hover:text-primary-600 transition block py-2">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-primary-600 transition block py-2">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-primary-600 transition block py-2">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-primary-600 transition block py-2">
                  About
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;