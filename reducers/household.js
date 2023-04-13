import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { hhSize: null, kidsCount: null, kidsArray: [] },
};

export const householdSlice = createSlice({
 name: 'household',
 initialState,
 reducers: {
   addHousehold: (state, action) => {
    state.value.hhSize = action.payload.hhSize;
    state.value.kidsCount = action.payload.kidsCount;
    state.value.kidsArray.push(action.payload.kidsArray);
   },   
  }});

export const { addHousehold } = householdSlice.actions;
export default householdSlice.reducer;