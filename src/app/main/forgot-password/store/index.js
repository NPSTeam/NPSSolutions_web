import { combineReducers } from '@reduxjs/toolkit';
import email from './submitEmailSlice';

const reducer = combineReducers({
  email,
});

export default reducer;
