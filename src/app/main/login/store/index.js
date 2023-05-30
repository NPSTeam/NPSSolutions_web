import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';

const reducer = combineReducers({
  login,
});

export default reducer;
