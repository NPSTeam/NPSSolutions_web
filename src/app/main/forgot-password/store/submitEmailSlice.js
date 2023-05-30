import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url, { HTTP_AUTH } from '../../../../axios/axios-config';

export const submitEmail = createAsyncThunk(
  'forgotPassword/submitEmail',
  async (params, { dispatch, getState }) => {
    HTTP_AUTH.post(url.forgotPassword, {
      email: params.email,
    })
      .then(async (res) => {
        dispatch(setChecked(true));
        params.navigate('/forgot-password/checked');
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const submitEmailSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    checked: false,
  },
  reducers: {
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
  },
});

export const { setChecked } = submitEmailSlice.actions;

export default submitEmailSlice.reducer;
