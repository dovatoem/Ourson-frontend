import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    hhSize: null,
    kidsCount: null,
    kidsArray: [],
    savedWeeklyRecipes: { baby: [], adult: [] },
    likedRecipes: { baby: [], adult: [] },
    createdAt: Date.now() - 605000000,
  },
};

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
      state.value.savedWeeklyRecipes = action.payload.savedWeeklyRecipes;
      state.value.likedRecipes = action.payload.likedRecipes;     
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
    emptyHousehold: (state, action) => {
      state.value.hhSize = null;
      state.value.kidsCount = null;
      state.value.kidsArray = [];
      state.value.savedWeeklyRecipes = { baby: [], adult: [] };
      state.value.likedRecipes = [];
      state.value.createdAt = null;
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
  emptyHousehold,
} = householdSlice.actions;
export default householdSlice.reducer;
