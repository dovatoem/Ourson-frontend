import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    hhSize: null,
    kidsCount: null,
    kidsArray: [],
    savedWeeklyRecipes: { baby: [], adult: [] },
    likedRecipes: { baby: [], adult: [] },
    createdAt: "",
    diet: null,
    tastedFoods: [],
    shoppingList: [],
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
      state.value.kidsArray = action.payload.kidsArray;
      state.value.savedWeeklyRecipes = action.payload.savedWeeklyRecipes;
      state.value.likedRecipes = action.payload.likedRecipes;
      state.value.createdAt = action.payload.createdAt;   
      state.value.diet = action.payload.diet;
      state.value.tastedFoods = action.payload.tastedFoods;
      state.value.shoppingList = action.payload.shoppingList;
    },
    addWeeklyRecipes: (state, action) => {
      state.value.savedWeeklyRecipes = action.payload;
    },
    resetCreatedAt: (state, action) => {
      state.value.createdAt = action.payload;
    },
    addLikedRecipe: (state, action) => {
      state.value.likedRecipes.baby.push(action.payload.baby);
      state.value.likedRecipes.adult.push(action.payload.adult);
    },
    removeLikedRecipe: (state, action) => {
      state.value.likedRecipes.baby = state.value.likedRecipes.baby.filter(
        (e) => e._id !== action.payload.baby
      );

      state.value.likedRecipes.adult = state.value.likedRecipes.adult.filter(
        (e) => e._id !== action.payload.adult
      );
    },
    emptyHousehold: (state, action) => {
      state.value.hhSize = null;
      state.value.kidsCount = null;
      state.value.kidsArray = [];
      state.value.savedWeeklyRecipes = { baby: [], adult: [] };
      state.value.likedRecipes = { baby: [], adult: [] };
      state.value.createdAt = ""; 
      state.value.diet = null;    
    },
    addShoppingList: (state, action) => {
      state.value.shoppingList.push(action.payload);      
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
  addShoppingList
} = householdSlice.actions;
export default householdSlice.reducer;
