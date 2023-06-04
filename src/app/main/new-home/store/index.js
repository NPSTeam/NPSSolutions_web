import { combineReducers } from '@reduxjs/toolkit';
import home from './homeSlice';

const reducer = combineReducers({
  home,
});

export default reducer;
