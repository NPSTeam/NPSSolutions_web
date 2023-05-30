import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkDefined, checkedBackPaging } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { saveAs } from 'file-saver';
import httpExport from 'src/axios/ClassAxiosExport';

const initialState = {
  totalRoleApp: 0,
  pageSize: 5,
  pageIndex: 0,
  listRoleAppByPagination: [],
  targetRoleApp: {},
  targetRoleAppId: '',
  searchContent: '',
  columnSearch: '',
  isEditRoleApp: false,
  isLoadingListRoleApp: false,
};

const manageRolesAppSlice = createSlice({
  name: 'manageRolesApp',
  initialState,
  reducers: {
    setTotalRoleApp: (state, action) => {
      state.totalRoleApp = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setListRoleAppByPagination: (state, action) => {
      state.listRoleAppByPagination = action.payload;
    },
    setTargetRoleApp: (state, action) => {
      state.targetRoleApp = action.payload;
    },
    setTargetRoleAppId: (state, action) => {
      state.targetRoleAppId = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },

    setIsEditRoleApp: (state, action) => {
      state.isEditRoleApp = action.payload;
    },
    setIsLoadingListRoleApp: (state, action) => {
      state.isLoadingListRoleApp = action.payload;
    },
  },
});

// Dang lam
export const setRoleAppsByPagination = createAsyncThunk(
  'manageRolesApp/setRoleAppsByPagination',
  async (params, { dispatch, getState }) => {
    try {
      const keySearch = getState().manageRolesApp.manageRolesApp.searchContent;
      dispatch(setIsLoadingListRoleApp(true));
      const response = await http.get(url.listRolesApp, {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().manageRolesApp.manageRolesApp.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().manageRolesApp.manageRolesApp.pageIndex ||
            initialState.pageIndex,
          keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListRoleAppByPagination(response.data.datas));
      dispatch(setTotalRoleApp(response.data.totalData));
      dispatch(setIsLoadingListRoleApp(false));
    } catch (error) {
      dispatch(setIsLoadingListRoleApp(false));
      console.log(error);
    }
  }
);

export const addRoleApp = createAsyncThunk(
  'manageRolesApp/addRoleApp',
  async ({ data, showNotification, t }, { dispatch }) => {
    http
      .post(url.addRoleApp, {
        name: data.name,
        code: data.code,
        actived: data.actived,
      })
      .then(() => {
        dispatch(setRoleAppsByPagination());
        showNotification(t('SUCCESSFUL_ADD_ITEM_APP'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_ADD_ITEM_APP'), 'error');
        console.log(error);
      });
  }
);

export const updateRoleApp = createAsyncThunk(
  'manageRolesApp/updateRoleApp',
  async (data, { dispatch, getState }) => {
    try {
      const res = await http.put(url.updateRoleApp, {
        id: data.id,
        actived: data.actived,
        name: data.name,
      });
      dispatch(setRoleAppsByPagination());
      data.showNotification(data.t('SUCCESSFUL_EDIT_ITEM_APP'), 'success');
    } catch (error) {
      data.showNotification(data.t('FAILED_EDIT_ITEM_APP'), 'error');
      console.log(error);
    }
  }
);

export const deleteRoleApp = createAsyncThunk(
  'manageRolesApp/deleteRoleApp',
  async ({ id, showNotification, t }, { dispatch, getState }) => {
    http
      .delete(url.deleteRoleApp(id))
      .then(() => {
        const _pageIndex = getState().manageRolesApp.manageRolesApp.pageIndex;
        const _pageSize = getState().manageRolesApp.manageRolesApp.pageSize;
        const checkedBack = checkedBackPaging(
          _pageIndex,
          _pageSize,
          getState().manageRolesApp.manageRolesApp.totalRoleApp - 1
        );
        if (checkedBack && _pageIndex > 0)
          dispatch(setRoleAppsByPagination({ pageIndex: _pageIndex - 1 }));
        else dispatch(setRoleAppsByPagination({ pageIndex: _pageIndex }));

        showNotification(t('SUCCESSFUL_DELETE_ITEM_APP'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_DELETE_ITEM_APP'), 'error');
        console.log(error);
      });
  }
);

export const exportRoleApp = createAsyncThunk(
  'manageRolesApp/exportRoleApp',
  async (params, { dispatch, getState }) => {
    try {
      const search = getState().manageRolesApp.manageRolesApp.searchContent;
      const response = await httpExport.get(url.exportRoleApp, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `ExportRoleApp_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  setTotalRoleApp,
  setPageSize,
  setPageIndex,
  setListRoleAppByPagination,
  setTargetRoleApp,
  setTargetRoleAppId,
  setSearchContent,
  setIsEditRoleApp,
  setIsLoadingListRoleApp,
} = manageRolesAppSlice.actions;
export default manageRolesAppSlice.reducer;
