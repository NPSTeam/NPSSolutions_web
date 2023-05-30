import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';

export const changePassword = createAsyncThunk(
  'myProfile/information/changePassword',
  async (params, { dispatch, getState }) => {
    http
      .put(url.changePassword, {
        password: params.password,
        confirmPassword: params.confirmPassword,
      })
      .then(async (res) => {
        params.showNotification(params.t('SUCCESSFUL_CHANGE_PASSWORD'), 'success');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        params.showNotification(params.t('FAILED_CHANGE_PASSWORD'), 'error');
      });
  }
);

export const changeAvatar = createAsyncThunk(
  'myProfile/information/changeAvatar',
  async (params, { dispatch, getState }) => {
    const { fileContent } = getState().myProfile.information;
    const { fileName } = getState().myProfile.information;
    const { user } = getState().auth;
    const { birthDay } = user;
    const { phoneNumber } = user;
    console.log('user', user);
    http
      .put(url.updateProfile, {
        fileContent,
        fileName,
        birthDay,
        phoneNumber,
      })
      .then(async (res) => {
        console.log(res);
        // params.showNotification(params.t('SUCCESSFUL_CHANGE_AVATAR'), 'success');
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // params.showNotification(params.t('FAILED_CHANGE_AVATAR'), 'error');
      });
  }
);

export const changeInformation = createAsyncThunk(
  'myProfile/information/changeInformation',
  async (params, { dispatch, getState }) => {
    const { user } = getState().auth;
    const { birthDay } = user;
    const { phoneNumber } = user;
    http
      .put(url.updateProfile, {
        birthDay: params.birthDay,
        phoneNumber: params.phoneNumber,
      })
      .then(async (res) => {
        console.log(res);
        // params.showNotification(params.t('SUCCESSFUL_CHANGE_INFORMATION'), 'success');
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);

        // params.showNotification(params.t('FAILED_CHANGE_INFORMATION'), 'error');
      });
  }
);

const informationSlice = createSlice({
  name: 'myProfile/information',
  initialState: {
    fileName: '',
    fileContent: '',
  },
  reducers: {
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setFileContent: (state, action) => {
      state.fileContent = action.payload;
    },
  },
});

export const { setFileName, setFileContent } = informationSlice.actions;

export default informationSlice.reducer;
