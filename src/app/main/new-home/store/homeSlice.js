import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'HomeNew',
  targetIndustryCategory: {},
};

const homeSlice = createSlice({
  name: 'homePageNew',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setTargetIndustryCategory: (state, action) => {
      state.targetIndustryCategory = action.payload;
    },
  },
});

export const { setTitle, setTargetIndustryCategory } = homeSlice.actions;

export default homeSlice.reducer;
