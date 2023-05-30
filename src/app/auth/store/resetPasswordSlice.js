import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { HTTP_AUTH } from 'src/axios/host';
import url from 'src/axios/url';

export const submitResetPassword = createAsyncThunk(
  'auth/resetPassword',

  // Check OTP
  async ({ data, showNotification, t }, { dispatch, getState }) => {
    try {
      const { otp } = data;
      const checkOTP = await HTTP_AUTH.post(url.checkOTP, {
        otp,
      });

      console.log('checkOTP', checkOTP);

      if (checkOTP.data.status === 200) {
        const updatePasswordForgot = await HTTP_AUTH.put(url.updatePasswordForgot, {
          password: data.password,
          confirmPassword: data.confirmPassword,
          otp,
        });
        dispatch(setErrorsReponse(null));

        dispatch(setSuccessReponse(updatePasswordForgot.data.message));
      }

      showNotification(t('SUCCESSFUL_ADD_NEW_PROJECT'), 'success');
    } catch (err) {
      dispatch(setErrorsReponse(err.response.data.errors[0].message));
      //   console.log('err.response.data.errors[0].message', err.response.data.errors[0].message);
      showNotification(err.response.data.errors[0].message, 'error');
    }
  }
);

const initialState = {
  errorsResponse: null,
  successReponse: null,
};

const resetPasswordSlice = createSlice({
  name: 'auth/resetPassword',
  initialState,
  reducers: {
    setErrorsReponse: (state, action) => {
      state.errorsResponse = action.payload;
    },
    setSuccessReponse: (state, action) => {
      state.successReponse = action.payload;
    },
  },
  extraReducers: {},
});

export const { setErrorsReponse, setSuccessReponse } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
