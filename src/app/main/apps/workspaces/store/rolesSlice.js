import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HTTP_AUTH } from 'src/axios/host';
import url from 'src/axios/url';

const initialState = {
  listRole: [],
};

const roleSlices = createSlice({
  name: 'workspaces/role',
  initialState,
  reducers: {
    setListRole: (state, action) => {
      state.listRole = action.payload;
    },
  },
});

export const renderListRole = createAsyncThunk(
  'workspaces/renderListRole',
  async (params, { dispatch, getState }) => {
    HTTP_AUTH.get(url.roles)
      .then((res) => {
        dispatch(setListRole(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const { setListRole } = roleSlices.actions;

export default roleSlices.reducer;
