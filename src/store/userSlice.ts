import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
  phone: string;
  address: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: '',
  name: '',
  phone: '+91 98765 43210',
  address: 'Flat 402, Springdale Apartments, Indiranagar, Bengaluru - 560038',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      if (!state.name) {
        state.name = action.payload.split('@')[0];
      }
      state.isLoggedIn = true;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload.name !== undefined) state.name = action.payload.name;
      if (action.payload.email !== undefined) state.email = action.payload.email;
      if (action.payload.phone !== undefined) state.phone = action.payload.phone;
      if (action.payload.address !== undefined) state.address = action.payload.address;
    },
    clearUserLogin: (state) => {
      state.email = '';
      state.name = '';
      state.phone = '';
      state.address = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUserLogin, updateUserProfile, clearUserLogin } = userSlice.actions;
export default userSlice.reducer;
