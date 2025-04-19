import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchProducts } from './store/slices/productsSlice';
import Header from './components/Header';
import FilterSidebar from './components/filters/FilterSidebar';
import ProductList from './components/products/ProductList';
import QuickViewModal from './components/products/QuickViewModal';
import CartSidebar from './components/cart/CartSidebar';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.products.status);

  useEffect(() => {
    // Fetch products on initial load
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          <ProductList />
        </div>
      </main>
      <QuickViewModal />
      <CartSidebar />
    </>
  );
};

export default App;