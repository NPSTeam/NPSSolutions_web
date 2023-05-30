import { combineReducers } from '@reduxjs/toolkit';
import manageRoleForItemSlice from './manageRoleForItemSlice';

const reducer = combineReducers({
  manageRoleForItemSlice,
});

export default reducer;
