import { combineReducers } from '@reduxjs/toolkit';
import manageWorkspaceForRoleSlice from './manageWorkspaceForRoleSlice';

const reducer = combineReducers({
  manageWorkspaceForRoleSlice,
});

export default reducer;
