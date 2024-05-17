import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  isLoggedIn: Cookies.get('isLoggedIn') === 'true',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      Cookies.set('user', JSON.stringify(action.payload));
      Cookies.set('isLoggedIn', true);
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      // Set the user info in a cookie when logging in
      Cookies.set('user', JSON.stringify(action.payload));
      Cookies.set('isLoggedIn', true);
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      Cookies.remove('user');
      Cookies.remove('isLoggedIn');
    },
  },
});

export const { registerUser, loginUser, logout } = userSlice.actions;

export default userSlice.reducer;