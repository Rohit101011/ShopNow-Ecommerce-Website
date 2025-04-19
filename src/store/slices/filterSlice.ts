import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, SortOption, ViewMode } from '../../types';

interface FilterSliceState {
  filter: FilterState;
  sort: SortOption;
  viewMode: ViewMode;
}

const initialState: FilterSliceState = {
  filter: {
    categories: [],
    priceRange: {
      min: 0,
      max: null,
    },
    rating: null,
    search: '',
  },
  sort: {
    id: 'featured',
    name: 'Featured',
    direction: 'desc',
    field: null,
  },
  viewMode: 'grid',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.filter.categories = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number | null }>) => {
      state.filter.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.filter.rating = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filter.search = action.payload;
    },
    setSort: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.filter = initialState.filter;
    },
  },
});

export const {
  setCategories,
  setPriceRange,
  setRating,
  setSearch,
  setSort,
  setViewMode,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;