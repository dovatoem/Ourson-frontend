import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    hhSize: 3,
    kidsCount: 1,
    kidsArray: [],
    savedWeeklyRecipes: { baby: [], adult: [] },
    likedRecipes: [],
    createdAt: Date.now() - 605000000,
  },
};git 

export const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    addHousehold: (state, action) => {
      state.value.hhSize = action.payload.hhSize;
      state.value.kidsCount = action.payload.kidsCount;
      state.value.kidsArray.push(action.payload.kidsArray);
    },
    getHousehold: (state, action) => {      
      state.value.hhSize = action.payload.hhSize;
      state.value.kidsCount = action.payload.kidsCount;
      state.value.kidsArray.push(action.payload.kidsArray);
      state.value.savedWeeklyRecipes = action.payload;
      state.value.likedRecipes.push(action.payload.likedRecipes);
      state.value.createdAt = action.payload.createdAt;
    },
    addWeeklyRecipes: (state, action) => {
      state.value.savedWeeklyRecipes = action.payload;
    },
    resetCreatedAt: (state, action) => {
      state.value.createdAt = action.payload;
    },
    addLikedRecipe: (state, action) => {
      state.value.likedRecipes.push(action.payload);
    },
    removeLikedRecipe: (state, action) => {
      state.value.likedRecipes = state.value.likedRecipes.filter(
        (e) => e._id === action.payload
      );
    },
  },
});

export const {
  addHousehold,
  getHousehold,
  addWeeklyRecipes,
  resetCreatedAt,
  addLikedRecipe,
  removeLikedRecipe,
} = householdSlice.actions;
export default householdSlice.reducer;
