import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';

const initialState = {
  listRoles: [],
  listTeams: [],
  isLoadingListTeamsAndRoles: false,
  isLoadingTeamForRoles: false,
};

export const fetchListTeamsAndRoles = createAsyncThunk(
  'manageTeamForRole/fetchListTeamsAndRoles',
  async (payload, { dispatch }) => {
    dispatch(setIsLoadingListTeamsAndRoles(true));
    const res = await http.get(url.listTeamsAndRoles);
    dispatch(setListRoles(res.data.listRoleCheck));
    dispatch(setListTeams(res.data.teams));

    dispatch(setIsLoadingListTeamsAndRoles(false));
  }
);

export const getTeamForRoles = createAsyncThunk(
  'manageTeamForRole/getTeamForRoles',
  async (teamId, { dispatch }) => {
    dispatch(setIsLoadingTeamForRoles(true));
    const res = await http.get(url.getTeamForRoles(teamId));
    dispatch(setListRoles(res.data.listRoleCheck));
    dispatch(setIsLoadingTeamForRoles(false));
  }
);

export const updateTeamForRoles = createAsyncThunk(
  'manageTeamForRole/updateTeamForRoles',
  async (payload, { dispatch }) => {
    dispatch(setIsLoadingListTeamsAndRoles(true));
    const res = await http.post(url.updateTeamForRoles, payload);
    dispatch(setListRoles(res.data.listRoleCheck));
    dispatch(setIsLoadingListTeamsAndRoles(false));

    toast.success('Update teams for roles successfully');
  }
);

const manageTeamForRoleSlice = createSlice({
  name: 'manageTeamForRole',
  initialState,
  reducers: {
    setListRoles: (state, action) => {
      state.listRoles = action.payload;
    },
    setListTeams: (state, action) => {
      state.listTeams = action.payload;
    },
    setIsLoadingListTeamsAndRoles: (state, action) => {
      state.isLoadingListTeamsAndRoles = action.payload;
    },
    setIsLoadingTeamForRoles: (state, action) => {
      state.isLoadingTeamForRoles = action.payload;
    },
  },
});

export const {
  setListRoles,
  setListTeams,
  setIsLoadingListTeamsAndRoles,
  setIsLoadingTeamForRoles,
} = manageTeamForRoleSlice.actions;
export default manageTeamForRoleSlice.reducer;
