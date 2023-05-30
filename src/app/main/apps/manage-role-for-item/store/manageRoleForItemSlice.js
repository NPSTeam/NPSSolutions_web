import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';

const initialState = {
  listRoles: [],
  listItems: [],
  isLoadingListRolesAndItems: false,
  isLoadingRoleForItems: false,
};

export const fetchListRolesAndItems = createAsyncThunk(
  'manageRoleForItem/fetchListRolesAndItems',
  async (payload, { dispatch }) => {
    dispatch(setIsLoadingListRolesAndItems(true));
    const res = await http.get(url.listRolesAndItems);
    dispatch(setListRoles(res.data.roles));
    dispatch(setListItems(res.data.listItemCheck));

    dispatch(setIsLoadingListRolesAndItems(false));
  }
);

export const getRoleForItems = createAsyncThunk(
  'manageRoleForItem/getRoleForItems',
  async (roleId, { dispatch }) => {
    dispatch(setIsLoadingRoleForItems(true));
    const res = await http.get(url.getRoleForItems(roleId));
    dispatch(setListItems(res.data.listItemCheck));

    dispatch(setIsLoadingRoleForItems(false));
  }
);

export const updateRoleForItems = createAsyncThunk(
  'manageRoleForItem/updateRoleForItems',
  async (payload, { dispatch }) => {
    dispatch(setIsLoadingListRolesAndItems(true));
    const res = await http.post(url.updateRoleForItems, payload);
    dispatch(setListItems(res.data.listItemCheck));
    dispatch(setIsLoadingListRolesAndItems(false));

    toast.success('Update role for items successfully');
  }
);

const manageRoleForItemSlice = createSlice({
  name: 'manageRoleForItem',
  initialState,
  reducers: {
    setListRoles: (state, action) => {
      state.listRoles = action.payload;
    },
    setListItems: (state, action) => {
      state.listItems = action.payload;
    },
    setIsLoadingListRolesAndItems: (state, action) => {
      state.isLoadingListRolesAndItems = action.payload;
    },
    setIsLoadingRoleForItems: (state, action) => {
      state.isLoadingRoleForItems = action.payload;
    },
  },
});

export const {
  setListRoles,
  setListItems,
  setIsLoadingListRolesAndItems,
  setIsLoadingRoleForItems,
} = manageRoleForItemSlice.actions;
export default manageRoleForItemSlice.reducer;
