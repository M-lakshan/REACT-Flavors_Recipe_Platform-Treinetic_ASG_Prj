import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  recipes: [],
  favorites: [],
  loading: false,
  error: null,
};

// POST API call
export const addNewRecipe = createAsyncThunk(
  'recipes/addNewRecipe', 
  async (newRecipe, { rejectWithValue }) => {
    try {
      // append the new recipe
      const response = await axios.post('#', newRecipe);
      return response.data;
    } catch (error) {
      // error message if the API call fails
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((recipe) => recipe.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // handle the start of the addNewRecipe action (loading state)
      .addCase(addNewRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // handle the success of the addNewRecipe action
      .addCase(addNewRecipe.fulfilled, (state, action) => {
        state.loading = false;
        // Add the newly created recipe to the existing list of recipes
        state.recipes.push(action.payload);
      })
      // handle the error of the addNewRecipe action
      .addCase(addNewRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRecipes, addFavorite, removeFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;