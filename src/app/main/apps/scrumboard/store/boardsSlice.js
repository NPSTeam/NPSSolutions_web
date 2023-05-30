import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { toast } from 'react-toastify';
import { showMessage } from 'app/store/fuse/messageSlice';
import BoardModel from '../model/BoardModel';

export const getWorkspace = createAsyncThunk(
  'scrumboardApp/boards/getWorkspace',
  async ({ dispatch }) => {
    const response = await http.get(url.userForWorkspace);
    const data = await response.data;
    dispatch(setListWorkspace(data));
    return data;
  }
);

export const getUserRoleWorkspace = createAsyncThunk(
  'scrumboardApp/boards/getUserRoleWorkspace',
  async (dispatch, getState) => {
    const { targetWorkspace } = getState.getState().scrumboardApp.boards;
    const response = await http.get(url.userRoleWorkspace(targetWorkspace));
    const data = await response.data;
    console.log('data', data);
    localStorage.setItem('access_scrum', data);
    return data;
  }
);
/**
 * Get Boards
 */
export const getBoards = createAsyncThunk(
  'scrumboardApp/boards/getBoards',
  async (dispatch, getState) => {
    // const response = await axios.get('/api/scrumboard/boards');
    const { targetWorkspace } = getState.getState().scrumboardApp.boards;

    const response = await http.get(url.listBoards(targetWorkspace));

    const data = await response.data;

    return data;
  }
);

/**
 * Create New Board
 */
export const newBoard = createAsyncThunk(
  'scrumboardApp/boards/newBoard',
  async (board, { dispatch, getState }) => {
    try {
      const { targetWorkspace } = getState().scrumboardApp.boards;
      const response = await http.post(
        '/api/v1/scrumboards/boards',
        BoardModel(board, targetWorkspace)
      );
      const data = await response.data;
      const idBoard = data.id;
      console.log(idBoard);
      history.push({
        pathname: `/apps/scrumboard/boards/${idBoard}`,
      });

      toast.success('SUCCESS', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      dispatch(
        showMessage({
          message: `${error?.response?.data?.errors[0].field} ${error?.response?.data?.errors[0].message}`,
        })
      );
    }
  }
);

const boardsAdapter = createEntityAdapter({});

export const { selectAll: selectBoards, selectById: selectBoardById } = boardsAdapter.getSelectors(
  (state) => state.scrumboardApp.boards
);

const boardsSlice = createSlice({
  name: 'scrumboardApp/boards',
  initialState: boardsAdapter.getInitialState({
    listWorkspace: [],
    targetWorkspace: null,
  }),
  reducers: {
    resetBoards: (state, action) => {
      state.listWorkspace = [];
    },
    setListWorkspace: (state, action) => {
      state.listWorkspace = action.payload;
    },
    setTargetWorkspace: (state, action) => {
      state.targetWorkspace = action.payload;
    },
  },
  extraReducers: {
    [getBoards.fulfilled]: boardsAdapter.setAll,
  },
});

export const { resetBoards, setListWorkspace, setTargetWorkspace } = boardsSlice.actions;

export default boardsSlice.reducer;
