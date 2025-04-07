import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ongoingRecipe: null
};

const cookingSlice = createSlice({
  name: 'cooking',
  initialState,
  reducers: {
    setOngoingRecipe: (state, action) => {
      state.ongoingRecipe = action.payload;  // set the ongoing recipe
    },
    clearOngoingRecipe: (state) => {
      state.ongoingRecipe = null;  // reset to null when cooking is finished or canceled
    },
  },
});

export const { setOngoingRecipe, clearOngoingRecipe } = cookingSlice.actions;

export default cookingSlice.reducer;
