import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: { token: null, email: null, firstName: null },
  currentScreen: "", // initial value
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
    logout: (state, action) => {
      state.value.token = null;
      state.value.email = null;
      state.value.firstName = null;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { login, logout, setCurrentScreen } = userSlice.actions;
export default userSlice.reducer;
