import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkDefined, checkedBackPaging } from 'app/store/method';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { saveAs } from 'file-saver';
import httpExport from 'src/axios/ClassAxiosExport';

const initialState = {
  totalUser: 0,
  pageSize: 5,
  pageIndex: 0,
  listUserByPagination: [],
  targetUser: {},
  targetUserId: '',
  searchContent: '',
  columnSearch: '',
  isEditUser: false,
  isLoadingListUser: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setTotalUser: (state, action) => {
      state.totalUser = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setListUserByPagination: (state, action) => {
      state.listUserByPagination = action.payload;
    },
    setTargetUser: (state, action) => {
      state.targetUser = action.payload;
    },
    setTargetUserId: (state, action) => {
      state.targetUserId = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },

    setIsEditUser: (state, action) => {
      state.isEditUser = action.payload;
    },
    setIsLoadingListUser: (state, action) => {
      state.isLoadingListUser = action.payload;
    },
  },
});

export const setUsersByPagination = createAsyncThunk(
  'users/setUsersByPagination',
  async (params, { dispatch, getState }) => {
    try {
      const keySearch = getState().users.users.searchContent;
      dispatch(setIsLoadingListUser(true));
      const response = await http.get(url.listUsers, {
        params: {
          size:
            checkDefined(params?.pageSize) ||
            getState().users.users.pageSize ||
            initialState.pageSize,
          page:
            checkDefined(params?.pageIndex) ||
            getState().users.users.pageIndex ||
            initialState.pageIndex,
          keySearch,
        },
      });
      if (checkDefined(params?.pageIndex) || checkDefined(params?.pageIndex) === 0)
        dispatch(setPageIndex(params.pageIndex));
      if (checkDefined(params?.pageSize) || checkDefined(params?.pageSize) === 0)
        dispatch(setPageSize(params.pageSize));

      dispatch(setListUserByPagination(response.data.datas));
      dispatch(setTotalUser(response.data.totalData));
      dispatch(setIsLoadingListUser(false));
    } catch (error) {
      dispatch(setIsLoadingListUser(false));
      console.log(error);
    }
  }
);

// export const addUser = createAsyncThunk(
//   'users/addUser',
//   async ({ data, showNotification, t }, { dispatch }) => {
//     http
//       .post(url.addUser, {
//         name: data.name,
//         code: data.code,
//         actived: data.actived,
//       })
//       .then(() => {
//         dispatch(setUsersByPagination());
//         showNotification(t('SUCCESSFUL_ADD_USER'), 'success');
//       })
//       .catch((error) => {
//         showNotification(t('FAILED_ADD_USER'), 'error');
//         console.log(error);
//       });
//   }
// );

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data, { dispatch, getState }) => {
    try {
      const res = await http.put(url.updateUser, {
        id: data.id,
        name: data.name,
        actived: data.actived,
      });
      dispatch(setUsersByPagination());
      data.showNotification(data.t('SUCCESSFUL_EDIT_USER'), 'success');
    } catch (error) {
      data.showNotification(data.t('FAILED_EDIT_USER'), 'error');
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ id, showNotification, t }, { dispatch, getState }) => {
    http
      .delete(url.deleteUser(id))
      .then(() => {
        const _pageIndex = getState().users.users.pageIndex;
        const _pageSize = getState().users.users.pageSize;
        const checkedBack = checkedBackPaging(
          _pageIndex,
          _pageSize,
          getState().users.users.totalUser - 1
        );
        if (checkedBack && _pageIndex > 0)
          dispatch(setUsersByPagination({ pageIndex: _pageIndex - 1 }));
        else dispatch(setUsersByPagination({ pageIndex: _pageIndex }));

        showNotification(t('SUCCESSFUL_DELETE_USER'), 'success');
      })
      .catch((error) => {
        showNotification(t('FAILED_DELETE_USER'), 'error');
        console.log(error);
      });
  }
);

export const exportUser = createAsyncThunk(
  'users/exportUser',
  async (params, { dispatch, getState }) => {
    try {
      const search = getState().users.users.searchContent;
      const response = await httpExport.get(url.exportUser, {
        responseType: 'blob',
      });
      console.log('responseCustom', response);
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `ExportUser_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  setTotalUser,
  setPageSize,
  setPageIndex,
  setListUserByPagination,
  setTargetUser,
  setTargetUserId,
  setSearchContent,
  setListService,
  setIsEditUser,
  setIsLoadingListUser,
} = userSlice.actions;
export default userSlice.reducer;
