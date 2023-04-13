import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: { token: null, email: null, firstName: null },
  lastTabUsedIndex: 1, // initial value
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstName = action.payload.firstName;
    },
    setLastTabUsedIndex: (state, action) => {
      state.lastTabUsedIndex = action.payload;
    },
  },
});

export const { login, setLastTabUsedIndex } = userSlice.actions;
export default userSlice.reducer;
