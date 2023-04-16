import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { searchedRecipes: [] },
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addSearchedRecipe: (state, action) => {
      state.value.searchedRecipes.push(action.payload);
    },
  },
});

export const { addSearchedRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
