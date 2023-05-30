import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';

/**
 * Get Members
 */
export const getMembers = createAsyncThunk('scrumboardApp/members/getMembers', async (params) => {
  // const response = await axios.get(`/api/scrumboard/members`);
  const response = await http.get(url.listUserInWorkspace(params.id));
  const data = await response.data;

  // replace id by userId
  data.forEach((item) => {
    item.id = item.userId;
  });

  return data;
});

const membersAdapter = createEntityAdapter({});

export const { selectAll: selectMembers, selectById: selectMemberById } =
  membersAdapter.getSelectors((state) => state.scrumboardApp.members);

const membersSlice = createSlice({
  name: 'scrumboardApp/members',
  initialState: membersAdapter.getInitialState({}),
  reducers: {
    resetMembers: (state, action) => {},
  },
  extraReducers: {
    [getMembers.fulfilled]: membersAdapter.setAll,
  },
});

export const { resetMembers } = membersSlice.actions;

export default membersSlice.reducer;
