import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobileFilterOpen: boolean;
  isQuickViewOpen: boolean;
  activeProduct: number | null;
}

const initialState: UiState = {
  isMobileFilterOpen: false,
  isQuickViewOpen: false,
  activeProduct: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileFilter: (state) => {
      state.isMobileFilterOpen = !state.isMobileFilterOpen;
    },
    openQuickView: (state, action: PayloadAction<number>) => {
      state.isQuickViewOpen = true;
      state.activeProduct = action.payload;
    },
    closeQuickView: (state) => {
      state.isQuickViewOpen = false;
      state.activeProduct = null;
    },
  },
});

export const { toggleMobileFilter, openQuickView, closeQuickView } = uiSlice.actions;
export default uiSlice.reducer;