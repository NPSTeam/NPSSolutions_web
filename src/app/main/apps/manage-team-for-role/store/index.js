import { combineReducers } from '@reduxjs/toolkit';
import manageTeamForRoleSlice from './manageTeamForRoleSlice';

const reducer = combineReducers({
  manageTeamForRoleSlice,
});

export default reducer;
