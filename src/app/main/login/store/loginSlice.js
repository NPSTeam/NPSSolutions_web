import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginMethod: 'BY_EMAIL',
};

const modelSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginMethod: (state, action) => {
      state.loginMethod = action.payload;
    },
  },
});

export const { setLoginMethod } = modelSlice.actions;

export default modelSlice.reducer;
