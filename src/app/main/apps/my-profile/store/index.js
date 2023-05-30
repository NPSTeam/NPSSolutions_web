import { combineReducers } from '@reduxjs/toolkit';
import information from './informationSlice';

const reducer = combineReducers({
  information,
});

export default reducer;
