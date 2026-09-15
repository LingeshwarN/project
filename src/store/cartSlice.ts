import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dish } from '../data/mockData';

export interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  flaggedDealIds: string[];
}

const initialState: CartState = {
  items: [],
  flaggedDealIds: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reduxAddToCart: (state, action: PayloadAction<Dish>) => {
      const existing = state.items.find((item) => item.dish.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ dish: action.payload, quantity: 1 });
      }
    },
    reduxUpdateQuantity: (state, action: PayloadAction<{ dishId: string; delta: number }>) => {
      const item = state.items.find((i) => i.dish.id === action.payload.dishId);
      if (item) {
        item.quantity += action.payload.delta;
      }
      state.items = state.items.filter((i) => i.quantity > 0);
    },
    reduxClearCart: (state) => {
      state.items = [];
    },
    reduxToggleFlashDeal: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.flaggedDealIds.includes(id)) {
        state.flaggedDealIds = state.flaggedDealIds.filter((item) => item !== id);
      } else {
        state.flaggedDealIds.push(id);
      }
    },
  },
});

export const { reduxAddToCart, reduxUpdateQuantity, reduxClearCart, reduxToggleFlashDeal } = cartSlice.actions;
export default cartSlice.reducer;
