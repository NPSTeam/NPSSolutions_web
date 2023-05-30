import { combineReducers } from '@reduxjs/toolkit';
import systemSettings from './systemSettingsSlice';

const reducer = combineReducers({
  systemSettings,
});

export default reducer;
