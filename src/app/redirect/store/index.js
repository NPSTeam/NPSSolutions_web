import { combineReducers } from '@reduxjs/toolkit';
import redirect from './redirectSlice';

const reducer = combineReducers({
  redirect,
});

export default reducer;
