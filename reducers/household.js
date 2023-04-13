import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { hhSize: null, kidsCount: null, firstName: null },
};

export const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstName = action.payload.firstName;
    },
  },
});

export const { login } = householdSlice.actions;
export default householdSlice.reducer;
