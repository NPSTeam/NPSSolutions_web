import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkDefined, checkedBackPaging } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { saveAs } from 'file-saver';
import httpExport from 'src/axios/ClassAxiosExport';

const initialState = {
  totalItemApp: 0,
  pageSize: 5,
  pageIndex: 0,
  listItemAppByPagination: [],
  targetItemApp: {},
  targetItemAppId: '',
  searchContent: '',
  columnSearch: '',
  isEditItemApp: false,
  isLoadingListItemApp: false,
};

const manageItemsAppSlice = createSlice({
  name: 'manageItemsApp',
  initialState,
  reducers: {
    setTotalItemApp: (state, action) => {
      state.totalItemApp = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setListItemAppByPagination: (state, action) => {
      state.listItemAppByPagination = action.payload;
    },
    setTargetItemApp: (state, action) => {
      state.targetItemApp = action.payload;
    },
    setTargetItemAppId: (state, action) => {
      state.targetItemAppId = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },

    setIsEditItemApp: (state, action) => {
      state.isEditItemApp = action.payload;
    },
    setIsLoadingListItemApp: (state, action) => {
      state.isLoadingListItemApp = action.payload;
    },
  },
});

// Dang lam
export const setItemAppsByPagination = createAsyncThunk(
  'manageItemsApp/setItemAppsByPagination',
  async (params, { dispatch, getState }) => {
    try {
      const keySearch = getState().manageItemsApp.manageItemsApp.searchContent;
      dispatch(setIsLoadingListItemApp(true));
      const response = await http.get(url.listItemsApp, {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().manageItemsApp.manageItemsApp.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().manageItemsApp.manageItemsApp.pageIndex ||
            initialState.pageIndex,
          keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListItemAppByPagination(response.data.datas));
      dispatch(setTotalItemApp(response.data.totalData));
      dispatch(setIsLoadingListItemApp(false));
    } catch (error) {
      dispatch(setIsLoadingListItemApp(false));
      console.log(error);
    }
  }
);

export const addItemApp = createAsyncThunk(
  'manageItemsApp/addItemApp',
  async ({ data, showNotification, t }, { dispatch }) => {
    http
      .post(url.addItemApp, {
        name: data.name,
        code: data.code,
        actived: data.actived,
      })
      .then(() => {
        dispatch(setItemAppsByPagination());
        showNotification(t('SUCCESSFUL_ADD_ITEM_APP'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_ADD_ITEM_APP'), 'error');
        console.log(error);
      });
  }
);

export const updateItemApp = createAsyncThunk(
  'manageItemsApp/updateItemApp',
  async (data, { dispatch, getState }) => {
    try {
      const res = await http.put(url.updateItemApp, {
        id: data.id,
        actived: data.actived,
        name: data.name,
      });
      dispatch(setItemAppsByPagination());
      data.showNotification(data.t('SUCCESSFUL_EDIT_ITEM_APP'), 'success');
    } catch (error) {
      data.showNotification(data.t('FAILED_EDIT_ITEM_APP'), 'error');
      console.log(error);
    }
  }
);

export const deleteItemApp = createAsyncThunk(
  'manageItemsApp/deleteItemApp',
  async ({ id, showNotification, t }, { dispatch, getState }) => {
    http
      .delete(url.deleteItemApp(id))
      .then(() => {
        const _pageIndex = getState().manageItemsApp.manageItemsApp.pageIndex;
        const _pageSize = getState().manageItemsApp.manageItemsApp.pageSize;
        const checkedBack = checkedBackPaging(
          _pageIndex,
          _pageSize,
          getState().manageItemsApp.manageItemsApp.totalItemApp - 1
        );
        if (checkedBack && _pageIndex > 0)
          dispatch(setItemAppsByPagination({ pageIndex: _pageIndex - 1 }));
        else dispatch(setItemAppsByPagination({ pageIndex: _pageIndex }));

        showNotification(t('SUCCESSFUL_DELETE_ITEM_APP'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_DELETE_ITEM_APP'), 'error');
        console.log(error);
      });
  }
);

export const exportItemApp = createAsyncThunk(
  'manageItemsApp/exportItemApp',
  async (params, { dispatch, getState }) => {
    try {
      const search = getState().manageItemsApp.manageItemsApp.searchContent;
      const response = await httpExport.get(url.exportItemApp, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `ExportItemApp_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  setTotalItemApp,
  setPageSize,
  setPageIndex,
  setListItemAppByPagination,
  setTargetItemApp,
  setTargetItemAppId,
  setSearchContent,
  setIsEditItemApp,
  setIsLoadingListItemApp,
} = manageItemsAppSlice.actions;
export default manageItemsAppSlice.reducer;
