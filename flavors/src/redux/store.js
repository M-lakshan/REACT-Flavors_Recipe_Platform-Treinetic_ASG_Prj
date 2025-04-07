import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import recipeReducer from './recipeSlice';
import cookingReducer from './cookingSlice';

const store = configureStore({
  reducer: {
    cur_theme: themeReducer,
    cur_user: userReducer,
    cur_recipes: recipeReducer,
    cur_cooking: cookingReducer
  },
});

export default store;