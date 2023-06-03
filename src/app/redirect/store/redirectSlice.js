import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import { authRoles } from 'src/app/auth';
import _ from 'lodash';

const initialState = {};

const userSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {},
  extraReducers: {},
});
const createRedirectUrlWithRole = (roles) => {
  if (_.some(roles, (item) => authRoles.admin.includes(item))) {
    return '/admin/system-settings';
  }
  if (_.some(roles, (item) => authRoles.user.includes(item))) {
    return '/apps/my-profile';
  }
  return '/login';
};

export const checkUser = createAsyncThunk(
  'redirect/checkUser',
  (params, { dispatch, getState }) => {
    const { roles } = getState().auth.user;
    // const roles = 'admin';
    console.log('roles', roles);
    const url = createRedirectUrlWithRole(roles);
    console.log('url', url);
    history.push(url);
  }
);

export default userSlice.reducer;
