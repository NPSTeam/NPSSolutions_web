import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import resetPassword from './resetPasswordSlice';

const authReducers = combineReducers({
  user,
  login,
  register,
  resetPassword,
});

export default authReducers;
