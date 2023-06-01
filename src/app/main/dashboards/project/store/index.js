import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import workspaces from './workspacesSlice';

const reducer = combineReducers({
  widgets,
  projects,
  workspaces,
});

export default reducer;
