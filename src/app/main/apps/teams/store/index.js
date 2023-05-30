import { combineReducers } from '@reduxjs/toolkit';
import teams from './teamsSlice';
import userInTeam from './manageUserInTeamSlice';
import roles from './rolesSlice';

const reducer = combineReducers({
  teams,
  userInTeam,
  roles,
});

export default reducer;
