import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { checkDefined } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { toast } from 'react-toastify';

const initialState = {
  targetWorkspaceId: '',
  targetUserId: '',
  pageSize: 5,
  pageIndex: 0,
  listUserInSystem: [],
  listUsersByPagination: [],
  listUserNotInCurrentWorkspace: [],
  totalUsersInWorkspace: null,
  selectedItem: [],

  listUsersSelected: [],

  isLoading: false,
  isLoadingTableListUser: false,

  isLoadingTableListUserWithChecked: false,
  targetWorkspaceUser: null,
  listUserWithCheckedInSystem: [],
  originalListUserWithCheckedInSystem: [],
};

const manageUserInWorkspaceSlice = createSlice({
  name: 'workspaces/manageUser',
  initialState,
  reducers: {
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setTargetUserId: (state, action) => {
      state.targetUserId = action.payload;
    },
    setTargetWorkspaceId: (state, action) => {
      state.targetWorkspaceId = action.payload;
    },

    setListUserInSystem: (state, action) => {
      state.listUserInSystem = action.payload;
    },
    setListUsersByPagination: (state, action) => {
      state.listUsersByPagination = action.payload;
    },
    setTotalUsersInWorkspace: (state, action) => {
      state.totalUsersInWorkspace = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setListUsersSelected: (state, action) => {
      state.listUsersSelected = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingTableListUser: (state, action) => {
      state.isLoadingTableListUser = action.payload;
    },
    setTargetWorkspaceUser: (state, action) => {
      state.targetWorkspaceUser = action.payload;
    },
    setListUserNotInCurrentWorkspace: (state, action) => {
      state.listUserNotInCurrentWorkspace = action.payload;
    },
    setListUserWithCheckedInSystem: (state, action) => {
      state.listUserWithCheckedInSystem = action.payload;
    },
    setIsLoadingTableListUserWithChecked: (state, action) => {
      state.isLoadingTableListUserWithChecked = action.payload;
    },
    setOriginalListUserWithCheckedInSystem: (state, action) => {
      state.originalListUserWithCheckedInSystem = action.payload;
    },

    setDefaultValue: (state, action) => {
      state.targetWorkspaceId = initialState.targetWorkspaceId;
      state.pageSize = initialState.pageSize;
      state.pageIndex = initialState.pageIndex;
      state.listUserInSystem = initialState.listUserInSystem;
      state.listUsersByPagination = initialState.listUsersByPagination;
      state.totalUsersInWorkspace = initialState.totalUsersInWorkspace;
      state.selectedItem = initialState.selectedItem;
      state.listUsersSelected = initialState.listUsersSelected;
      state.isLoading = initialState.isLoading;
      state.isLoadingTableListUser = initialState.isLoadingTableListUser;
      state.targetWorkspaceUser = initialState.targetWorkspaceUser;
      state.listUserNotInCurrentWorkspace = initialState.listUserNotInCurrentWorkspace;
      state.originalListUserWithCheckedInSystem = initialState.originalListUserWithCheckedInSystem;
    },
  },
});

export const fetchUsersInWorkspaceByPagination = createAsyncThunk(
  'workspaces/manageUser/fetchUsersInWorkspaceByPagination',
  async (params, { dispatch, getState }) => {
    try {
      dispatch(setIsLoading(true));
      // const keySearch = getState().workspaces.userInWorkspace.searchContent;
      const response = await http.get(url.listUserInWorkspace(params.id), {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().workspaces.userInWorkspace.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().workspaces.userInWorkspace.pageIndex ||
            initialState.pageIndex,
          // keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListUsersByPagination(response.data));
      dispatch(setTotalUsersInWorkspace(response.data.length));

      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));

      console.log(error);
    }
  }
);

export const fetchUsersWithCheckedInSystem = createAsyncThunk(
  'workspaces/manageUser/fetchUsersWithCheckedInSystem',
  async (dispatch, getState) => {
    try {
      const id = getState.getState().workspaces.workspaces.targetWorkspace;
      dispatch.dispatch(setIsLoadingTableListUserWithChecked(true));
      const res = await http.get(url.listUserChecked(id));
      dispatch.dispatch(setListUserWithCheckedInSystem(res.data));
      dispatch.dispatch(setOriginalListUserWithCheckedInSystem(res.data));
      dispatch.dispatch(setIsLoadingTableListUserWithChecked(false));
    } catch (error) {
      dispatch.dispatch(setIsLoadingTableListUserWithChecked(false));
      console.log(error);
    }
  }
);

export const assignUser = createAsyncThunk(
  'workspaces/manageUser/assignUser',
  async (params, { dispatch, getState }) => {
    try {
      const targetWorkspaceId = getState().workspaces.workspaces.targetWorkspace;
      const res = await http.post(url.assignUser, {
        userList: params.data,
        workspaceId: targetWorkspaceId,
      });
      dispatch(fetchUsersInWorkspaceByPagination({ id: targetWorkspaceId }));
      toast.success('User has been assigned successfully.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      dispatch(closeDialog());
    } catch (err) {
      params.showNotification(params.t('FAILED_ASSIGN_USER'), 'error');
      console.log(err);
    }
  }
);

export const getListUserInSystem = createAsyncThunk(
  'workspaces/manageUser/getListUserInSystem',
  async (params, { dispatch, getState }) => {
    try {
      dispatch(setIsLoadingTableListUser(true));
      const res = await http.get(url.listUser);
      dispatch(setListUserInSystem(res.data.datas));
      dispatch(setIsLoadingTableListUser(false));
    } catch (err) {
      dispatch(setIsLoadingTableListUser(false));
      console.log(err);
    }
  }
);

export const {
  setPageSize,
  setPageIndex,
  setUserIDs,
  setDefaultValue,
  setTargetUserId,
  setEmailType,
  setTargetWorkspaceId,
  setListUserInSystem,
  setListUsersByPagination,
  setTotalUsersInWorkspace,
  setSelectedItem,
  setListUsersSelected,
  setIsLoading,
  setIsLoadingTableListUser,
  setTargetWorkspaceUser,
  setListUserNotInCurrentWorkspace,
  setListUserWithCheckedInSystem,
  setIsLoadingTableListUserWithChecked,
  setOriginalListUserWithCheckedInSystem,
} = manageUserInWorkspaceSlice.actions;
export default manageUserInWorkspaceSlice.reducer;
