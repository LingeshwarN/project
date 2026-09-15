import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  totalSpent: number;
  totalSavings: number;
  healthMeterInput: number; // overall calculated average score
  ordersPlacedCount: number;
}

const initialState: ProgressState = {
  totalSpent: 0,
  totalSavings: 0,
  healthMeterInput: 75, // initial default score
  ordersPlacedCount: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    recordPurchase: (state, action: PayloadAction<{ spend: number; savings: number }>) => {
      state.totalSpent += action.payload.spend;
      state.totalSavings += action.payload.savings;
      state.ordersPlacedCount += 1;
    },
    updateHealthMeter: (state, action: PayloadAction<number>) => {
      state.healthMeterInput = action.payload;
    },
    resetProgress: (state) => {
      state.totalSpent = 0;
      state.totalSavings = 0;
      state.healthMeterInput = 75;
      state.ordersPlacedCount = 0;
    },
  },
});

export const { recordPurchase, updateHealthMeter, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
