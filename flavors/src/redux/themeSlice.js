import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTheme: 'light',  // 'light' or 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    },
    // for set a specific theme
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
