import { combineReducers } from '@reduxjs/toolkit';
import workspaces from './workspacesSlice';
import userInWorkspace from './manageUserInWorkspaceSlice';
import roles from './rolesSlice';

const reducer = combineReducers({
  workspaces,
  userInWorkspace,
  roles,
});

export default reducer;
