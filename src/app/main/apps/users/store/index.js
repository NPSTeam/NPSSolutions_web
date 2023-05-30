import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice';
import roles from './rolesSlice';

const reducer = combineReducers({
  users,
  roles,
});

export default reducer;
