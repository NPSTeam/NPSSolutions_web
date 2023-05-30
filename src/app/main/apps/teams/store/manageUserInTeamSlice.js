import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { checkDefined } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { toast } from 'react-toastify';

const initialState = {
  targetTeamId: '',
  targetUserId: '',
  pageSize: 5,
  pageIndex: 0,
  listUserInSystem: [],
  listUsersByPagination: [],
  listUserNotInCurrentTeam: [],
  totalUsersInTeam: null,
  selectedItem: [],

  listUsersSelected: [],

  isLoading: false,
  isLoadingTableListUser: false,

  isLoadingTableListUserWithChecked: false,
  targetTeamUser: null,
  listUserWithCheckedInSystem: [],
  originalListUserWithCheckedInSystem: [],
};

const manageUserInTeamSlice = createSlice({
  name: 'teams/manageUser',
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
    setTargetTeamId: (state, action) => {
      state.targetTeamId = action.payload;
    },

    setListUserInSystem: (state, action) => {
      state.listUserInSystem = action.payload;
    },
    setListUsersByPagination: (state, action) => {
      state.listUsersByPagination = action.payload;
    },
    setTotalUsersInTeam: (state, action) => {
      state.totalUsersInTeam = action.payload;
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
    setTargetTeamUser: (state, action) => {
      state.targetTeamUser = action.payload;
    },
    setListUserNotInCurrentTeam: (state, action) => {
      state.listUserNotInCurrentTeam = action.payload;
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
      state.targetTeamId = initialState.targetTeamId;
      state.pageSize = initialState.pageSize;
      state.pageIndex = initialState.pageIndex;
      state.listUserInSystem = initialState.listUserInSystem;
      state.listUsersByPagination = initialState.listUsersByPagination;
      state.totalUsersInTeam = initialState.totalUsersInTeam;
      state.selectedItem = initialState.selectedItem;
      state.listUsersSelected = initialState.listUsersSelected;
      state.isLoading = initialState.isLoading;
      state.isLoadingTableListUser = initialState.isLoadingTableListUser;
      state.targetTeamUser = initialState.targetTeamUser;
      state.listUserNotInCurrentTeam = initialState.listUserNotInCurrentTeam;
      state.originalListUserWithCheckedInSystem = initialState.originalListUserWithCheckedInSystem;
    },
  },
});

export const fetchUsersInTeamByPagination = createAsyncThunk(
  'teams/manageUser/fetchUsersInTeamByPagination',
  async (params, { dispatch, getState }) => {
    try {
      dispatch(setIsLoading(true));
      // const keySearch = getState().teams.userInTeam.searchContent;
      const response = await http.get(url.listUserCheckedInTeam(params.id), {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().teams.userInTeam.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().teams.userInTeam.pageIndex ||
            initialState.pageIndex,
          // keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListUsersByPagination(response.data));
      dispatch(setTotalUsersInTeam(response.data.length));

      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));

      console.log(error);
    }
  }
);

export const fetchUsersWithCheckedInSystem = createAsyncThunk(
  'teams/manageUser/fetchUsersWithCheckedInSystem',
  async (dispatch, getState) => {
    try {
      const id = getState.getState().teams.teams.targetTeam;
      dispatch.dispatch(setIsLoadingTableListUserWithChecked(true));
      const res = await http.get(url.listUserInTeam(id));
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
  'teams/manageUser/assignUser',
  async (params, { dispatch, getState }) => {
    try {
      const targetTeamId = getState().teams.teams.targetTeam;
      const res = await http.post(url.assignUserToTeam, {
        userIds: params.data,
        teamId: targetTeamId,
      });
      dispatch(fetchUsersInTeamByPagination({ id: targetTeamId }));
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

export const {
  setPageSize,
  setPageIndex,
  setUserIDs,
  setDefaultValue,
  setTargetUserId,
  setEmailType,
  setTargetTeamId,
  setListUserInSystem,
  setListUsersByPagination,
  setTotalUsersInTeam,
  setSelectedItem,
  setListUsersSelected,
  setIsLoading,
  setIsLoadingTableListUser,
  setTargetTeamUser,
  setListUserNotInCurrentTeam,
  setListUserWithCheckedInSystem,
  setIsLoadingTableListUserWithChecked,
  setOriginalListUserWithCheckedInSystem,
} = manageUserInTeamSlice.actions;
export default manageUserInTeamSlice.reducer;
