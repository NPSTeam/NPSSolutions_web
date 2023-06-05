import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkDefined, checkedBackPaging } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { saveAs } from 'file-saver';
import httpExport from 'src/axios/ClassAxiosExport';
import { toast } from 'react-toastify';

const initialState = {
  totalWorkspace: 0,
  pageSize: 5,
  pageIndex: 0,
  listWorkspaceByPagination: [],
  targetWorkspace: {},
  targetWorkspaceId: '',
  searchContent: '',
  columnSearch: '',
  listService: [],
  isEditWorkspace: false,
  isLoadingListWorkspace: false,
};

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setTotalWorkspace: (state, action) => {
      state.totalWorkspace = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setListWorkspaceByPagination: (state, action) => {
      state.listWorkspaceByPagination = action.payload;
    },
    setTargetWorkspace: (state, action) => {
      state.targetWorkspace = action.payload;
    },
    setTargetWorkspaceId: (state, action) => {
      state.targetWorkspaceId = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },

    setListService: (state, action) => {
      state.listService = action.payload;
    },
    setIsEditWorkspace: (state, action) => {
      state.isEditWorkspace = action.payload;
    },
    setIsLoadingListWorkspace: (state, action) => {
      state.isLoadingListWorkspace = action.payload;
    },
  },
});

export const getListService = createAsyncThunk(
  'workspaces/getListService',
  async (params, { dispatch, getState }) => {
    try {
      const response = await http.get(url.getListService);
      dispatch(setListService(response.data));
    } catch (error) {
      console.log(error);
    }
  }
);

// Dang lam
export const setWorkspacesByPagination = createAsyncThunk(
  'workspaces/setWorkspacesByPagination',
  async (params, { dispatch, getState }) => {
    try {
      const keySearch = getState().workspaces.workspaces.searchContent;
      dispatch(setIsLoadingListWorkspace(true));
      const response = await http.get(url.workspaces, {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().workspaces.workspaces.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().workspaces.workspaces.pageIndex ||
            initialState.pageIndex,
          keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListWorkspaceByPagination(response.data.datas));
      dispatch(setTotalWorkspace(response.data.totalData));
      dispatch(setIsLoadingListWorkspace(false));
    } catch (error) {
      dispatch(setIsLoadingListWorkspace(false));
      console.log(error);
    }
  }
);

export const addWorkspace = createAsyncThunk(
  'workspaces/addWorkspace',
  async ({ data, showNotification, t }, { dispatch }) => {
    http
      .post(url.addWorkspace, {
        name: data.name,
        code: data.code,
        address: data.address,
        registerServices: data.registerServices,
        description: data.description,
        fileName: data.fileName,
        image: data.image,
        technology: data.technology,
      })
      .then(() => {
        dispatch(setWorkspacesByPagination());
        toast.success(t('SUCCESSFUL_ADD_WORKSPACE'));
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

export const updateWorkspace = createAsyncThunk(
  'workspaces/updateWorkspace',
  async (data, { dispatch, getState }) => {
    try {
      const res = await http.put(url.updateWorkspace, {
        id: data.id,
        name: data.name,
        address: data.address,
        registerServices: data.registerServices,
        technology: data.technology,
        description: data.description,
        fileName: data.fileName,
        image: data.image,
      });
      dispatch(setWorkspacesByPagination());
      data.showNotification(data.t('SUCCESSFUL_EDIT_WORKSPACE'), 'success');
    } catch (error) {
      data.showNotification(data.t('FAILED_EDIT_WORKSPACE'), 'error');
      console.log(error);
    }
  }
);

export const deleteWorkspace = createAsyncThunk(
  'workspaces/deleteWorkspace',
  async ({ id, showNotification, t }, { dispatch, getState }) => {
    http
      .delete(url.deleteWorkspace(id))
      .then(() => {
        const _pageIndex = getState().workspaces.workspaces.pageIndex;
        const _pageSize = getState().workspaces.workspaces.pageSize;
        const checkedBack = checkedBackPaging(
          _pageIndex,
          _pageSize,
          getState().workspaces.workspaces.totalWorkspace - 1
        );
        if (checkedBack && _pageIndex > 0)
          dispatch(setWorkspacesByPagination({ pageIndex: _pageIndex - 1 }));
        else dispatch(setWorkspacesByPagination({ pageIndex: _pageIndex }));

        showNotification(t('SUCCESSFUL_DELETE_WORKSPACE'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_DELETE_WORKSPACE'), 'error');
        console.log(error);
      });
  }
);

export const exportWorkspace = createAsyncThunk(
  'workspaces/exportWorkspace',
  async (params, { dispatch, getState }) => {
    try {
      const search = getState().workspaces.workspaces.searchContent;
      const response = await httpExport.get(url.exportWorkspace, {
        responseType: 'blob',
      });
      console.log('responseCustom', response);
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `ExportWorkspace_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  setTotalWorkspace,
  setPageSize,
  setPageIndex,
  setListWorkspaceByPagination,
  setTargetWorkspace,
  setTargetWorkspaceId,
  setSearchContent,
  setListService,
  setIsEditWorkspace,
  setIsLoadingListWorkspace,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
