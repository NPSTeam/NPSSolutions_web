import { combineReducers } from '@reduxjs/toolkit';
import manageRolesApp from './manageRolesAppSlice';

const reducer = combineReducers({
  manageRolesApp,
});

export default reducer;
