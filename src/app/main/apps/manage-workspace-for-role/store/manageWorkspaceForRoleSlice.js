import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';

const initialState = {
  listRoles: [],
  listWorkspaces: [],
  isLoadingListWorkspacesAndRoles: false,
  isLoadingWorkspaceForRoles: false,
};

export const fetchListWorkspacesAndRoles = createAsyncThunk(
  'manageWorkspaceForRole/fetchListWorkspacesAndRoles',
  async (payload, { dispatch }) => {
    dispatch(setIsLoadingListWorkspacesAndRoles(true));
    const res = await http.get(url.listWorkspacesAndRoles);
    dispatch(setListRoles(res.data.listRoleCheck));
    dispatch(setListWorkspaces(res.data.workspaces));

    dispatch(setIsLoadingListWorkspacesAndRoles(false));
  }
);

export const getWorkspaceForRoles = createAsyncThunk(
  'manageWorkspaceForRole/getWorkspaceForRoles',
  async (workspaceId, { dispatch }) => {
    dispatch(setIsLoadingWorkspaceForRoles(true));
    const res = await http.get(url.getWorkspaceForRoles(workspaceId));
    dispatch(setListRoles(res.data.listRoleCheck));
    dispatch(setIsLoadingWorkspaceForRoles(false));
  }
);

export const updateWorkspaceForRoles = createAsyncThunk(
  'manageWorkspaceForRole/updateWorkspaceForRoles',
  async (payload, { dispatch }) => {
    dispatch(setIsLoadingListWorkspacesAndRoles(true));
    const res = await http.post(url.updateWorkspaceForRoles, payload);
    dispatch(setListRoles(res.data.listRoleCheck));
    dispatch(setIsLoadingListWorkspacesAndRoles(false));

    toast.success('Update workspaces for roles successfully');
  }
);

const manageWorkspaceForRoleSlice = createSlice({
  name: 'manageWorkspaceForRole',
  initialState,
  reducers: {
    setListRoles: (state, action) => {
      state.listRoles = action.payload;
    },
    setListWorkspaces: (state, action) => {
      state.listWorkspaces = action.payload;
    },
    setIsLoadingListWorkspacesAndRoles: (state, action) => {
      state.isLoadingListWorkspacesAndRoles = action.payload;
    },
    setIsLoadingWorkspaceForRoles: (state, action) => {
      state.isLoadingWorkspaceForRoles = action.payload;
    },
  },
});

export const {
  setListRoles,
  setListWorkspaces,
  setIsLoadingListWorkspacesAndRoles,
  setIsLoadingWorkspaceForRoles,
} = manageWorkspaceForRoleSlice.actions;
export default manageWorkspaceForRoleSlice.reducer;
