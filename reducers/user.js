import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { token: null, email: null, firstName: null },
};

export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   login: (state, action) => {
    state.value.token = action.payload.token;
    state.value.email = action.payload.email;
    state.value.firstName = action.payload.firstName;
   },
   
  }});

export const { login } = userSlice.actions;
export default userSlice.reducer;