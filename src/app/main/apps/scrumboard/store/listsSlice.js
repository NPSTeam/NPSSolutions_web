import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';
import ListModel from '../model/ListModel';

/**
 * Get Board Lists
 */
export const getLists = createAsyncThunk('scrumboardApp/lists/get', async (boardId) => {
  const response = await http.get(`/api/v1/scrumboards/boards/${boardId}/lists`);

  const data = await response.data;
  return data;
});

/**
 * Create List
 */
export const newList = createAsyncThunk(
  'scrumboardApp/lists/new',
  async (list, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;

    const response = await http.post(
      `/api/v1/scrumboards/boards/${board.id}/lists`,
      ListModel(list)
    );

    const data = await response.data;

    return data;
  }
);

/**
 * Update list
 */
export const updateList = createAsyncThunk(
  'scrumboardApp/lists/update',
  async ({ id, newDataTwo }, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;

    const response = await http.put(
      `/api/v1/scrumboards/boards/${board.id}/lists/${id}`,
      newDataTwo
    );

    const data = await response.data;

    return data;
  }
);

/**
 * Remove list
 */
export const removeList = createAsyncThunk(
  'scrumboardApp/lists/remove',
  async (id, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;

    const response = await http.delete(`/api/v1/scrumboards/boards/${board.id}/lists/${id}`);

    await response.data;

    return id;
  }
);
const listsAdapter = createEntityAdapter({});

export const { selectAll: selectLists, selectById: selectListById } = listsAdapter.getSelectors(
  (state) => state.scrumboardApp.lists
);

const listsSlice = createSlice({
  name: 'scrumboardApp/lists',
  initialState: listsAdapter.getInitialState({}),
  reducers: {
    resetLists: (state, action) => {},
  },
  extraReducers: {
    [getLists.fulfilled]: listsAdapter.setAll,
    [updateList.fulfilled]: listsAdapter.setOne,
    [removeList.fulfilled]: listsAdapter.removeOne,
    [newList.fulfilled]: listsAdapter.addOne,
  },
});

export const { resetLists } = listsSlice.actions;

export default listsSlice.reducer;
