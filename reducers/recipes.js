import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 value: { searchedRecipe: null },
};

export const recipesSlice = createSlice({
 name: 'recipes',
 initialState,
 reducers: {
   addSearchedRecipe: (state, action) => {
    state.value.searchedRecipe = (action.payload);
   },   
  }});

export const { addSearchedRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;