import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';

export const getLabels = createAsyncThunk('scrumboardApp/labels/getLabels', async (boardId) => {
  const response = await http.get(`/api/v1/scrumboards/boards/${boardId}/labels`);
  const data = await response.data;

  return data;
});

export const createLabel = createAsyncThunk(
  'scrumboardApp/labels/createLabel',
  async (title, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;
    const LabelModel = {
      title,
      boardId: board.id,
    };
    const response = await http.post(`/api/v1/scrumboards/boards/${board.id}/labels`, LabelModel);
    dispatch(getLabels(board.id));
    toast.success('Create label success');
    const data = await response.data;

    return data;
  }
);

const labelsAdapter = createEntityAdapter({});

export const { selectAll: selectLabels, selectById: selectLabelById } = labelsAdapter.getSelectors(
  (state) => state.scrumboardApp.labels
);

const labelsSlice = createSlice({
  name: 'scrumboardApp/labels',
  initialState: labelsAdapter.getInitialState({}),
  reducers: {
    resetLabels: (state, action) => {},
  },
  extraReducers: {
    [getLabels.fulfilled]: labelsAdapter.setAll,
  },
});

export const { resetLabels } = labelsSlice.actions;

export default labelsSlice.reducer;
