import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  role: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  token: null,
  role: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; role: string; userId: number }>
    ) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.role = null;
      state.userId = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
