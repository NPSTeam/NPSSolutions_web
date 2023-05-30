import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkDefined, checkedBackPaging } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { saveAs } from 'file-saver';
import httpExport from 'src/axios/ClassAxiosExport';

const initialState = {
  totalTeam: 0,
  pageSize: 5,
  pageIndex: 0,
  listTeamByPagination: [],
  targetTeam: {},
  targetTeamId: '',
  searchContent: '',
  columnSearch: '',
  isEditTeam: false,
  isLoadingListTeam: false,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTotalTeam: (state, action) => {
      state.totalTeam = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setListTeamByPagination: (state, action) => {
      state.listTeamByPagination = action.payload;
    },
    setTargetTeam: (state, action) => {
      state.targetTeam = action.payload;
    },
    setTargetTeamId: (state, action) => {
      state.targetTeamId = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },

    setIsEditTeam: (state, action) => {
      state.isEditTeam = action.payload;
    },
    setIsLoadingListTeam: (state, action) => {
      state.isLoadingListTeam = action.payload;
    },
  },
});

export const setTeamsByPagination = createAsyncThunk(
  'teams/setTeamsByPagination',
  async (params, { dispatch, getState }) => {
    try {
      const keySearch = getState().teams.teams.searchContent;
      dispatch(setIsLoadingListTeam(true));
      const response = await http.get(url.teams, {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().teams.teams.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().teams.teams.pageIndex ||
            initialState.pageIndex,
          keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListTeamByPagination(response.data.datas));
      dispatch(setTotalTeam(response.data.totalData));
      dispatch(setIsLoadingListTeam(false));
    } catch (error) {
      dispatch(setIsLoadingListTeam(false));
      console.log(error);
    }
  }
);

export const addTeam = createAsyncThunk(
  'teams/addTeam',
  async ({ data, showNotification, t }, { dispatch }) => {
    http
      .post(url.addTeam, {
        name: data.name,
        code: data.code,
        actived: data.actived,
      })
      .then(() => {
        dispatch(setTeamsByPagination());
        showNotification(t('SUCCESSFUL_ADD_TEAM'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_ADD_TEAM'), 'error');
        console.log(error);
      });
  }
);

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async (data, { dispatch, getState }) => {
    try {
      const res = await http.put(url.updateTeam, {
        id: data.id,
        name: data.name,
        actived: data.actived,
      });
      dispatch(setTeamsByPagination());
      data.showNotification(data.t('SUCCESSFUL_EDIT_TEAM'), 'success');
    } catch (error) {
      data.showNotification(data.t('FAILED_EDIT_TEAM'), 'error');
      console.log(error);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async ({ id, showNotification, t }, { dispatch, getState }) => {
    http
      .delete(url.deleteTeam(id))
      .then(() => {
        const _pageIndex = getState().teams.teams.pageIndex;
        const _pageSize = getState().teams.teams.pageSize;
        const checkedBack = checkedBackPaging(
          _pageIndex,
          _pageSize,
          getState().teams.teams.totalTeam - 1
        );
        if (checkedBack && _pageIndex > 0)
          dispatch(setTeamsByPagination({ pageIndex: _pageIndex - 1 }));
        else dispatch(setTeamsByPagination({ pageIndex: _pageIndex }));

        showNotification(t('SUCCESSFUL_DELETE_TEAM'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_DELETE_TEAM'), 'error');
        console.log(error);
      });
  }
);

export const exportTeam = createAsyncThunk(
  'teams/exportTeam',
  async (params, { dispatch, getState }) => {
    try {
      const search = getState().teams.teams.searchContent;
      const response = await httpExport.get(url.exportTeam, {
        responseType: 'blob',
      });
      console.log('responseCustom', response);
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `ExportTeam_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  setTotalTeam,
  setPageSize,
  setPageIndex,
  setListTeamByPagination,
  setTargetTeam,
  setTargetTeamId,
  setSearchContent,
  setListService,
  setIsEditTeam,
  setIsLoadingListTeam,
} = teamSlice.actions;
export default teamSlice.reducer;
