import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  categories: string[];
  page: number;
  hasMore: boolean;
  itemsPerPage: number;
  cachedTimestamp: number | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  categories: [],
  page: 1,
  hasMore: true,
  itemsPerPage: 8,
  cachedTimestamp: null,
};

// Cache expiration time: 5 minutes
const CACHE_EXPIRATION = 5 * 60 * 1000;
const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { products: ProductsState };
    
    // Check if cache is valid
    if (
      state.products.items.length > 0 &&
      state.products.cachedTimestamp &&
      Date.now() - state.products.cachedTimestamp < CACHE_EXPIRATION
    ) {
      return { usedCache: true, products: state.products.items };
    }
    
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      return { usedCache: false, products: data };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/products/categories`);
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadMoreProducts: (state) => {
      state.page += 1;
      if (state.page * state.itemsPerPage >= state.items.length) {
        state.hasMore = false;
      }
    },
    resetPage: (state) => {
      state.page = 1;
      state.hasMore = true;
    },
    invalidateCache: (state) => {
      state.cachedTimestamp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.items.length === 0) {
          state.status = 'loading';
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ usedCache: boolean; products: Product[] }>) => {
        state.status = 'succeeded';
        if (!action.payload.usedCache) {
          state.items = action.payload.products;
          state.cachedTimestamp = Date.now();
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { loadMoreProducts, resetPage, invalidateCache } = productsSlice.actions;
export default productsSlice.reducer;