import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import recipeReducer from './recipeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    recipes: recipeReducer,
  },
});

export default store;