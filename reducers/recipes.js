import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { searchedRecipes: [], savedWeeklyRecipes: { baby: [], adult: [] } },
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addSearchedRecipe: (state, action) => {
      state.value.searchedRecipes.push(action.payload);
    },
    addWeeklyRecipes: (state, action) => {
      state.value.savedWeeklyRecipes = action.payload;
    },
  },
});

export const { addSearchedRecipe, addWeeklyRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
