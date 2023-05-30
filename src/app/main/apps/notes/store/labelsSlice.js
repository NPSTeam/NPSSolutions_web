import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';

export const getLabels = createAsyncThunk('notesApp/labels/getLabels', async () => {
  const response = await http.get('/api/v1/notes/labels');
  const data = await response.data;

  return data;
});

export const createLabel = createAsyncThunk('notesApp/labels/createLabel', async (label) => {
  const response = await http.post(`/api/v1/notes/labels`, label);
  const data = await response.data;

  return data;
});

export const updateLabel = createAsyncThunk('notesApp/labels/updateLabel', async (label) => {
  const response = await http.put(`/api/v1/notes/labels`, label);
  const data = await response.data;

  return data;
});

export const removeLabel = createAsyncThunk('notesApp/labels/removeLabel', async (id) => {
  const response = await http.delete(`/api/v1/notes/labels/${id}`);
  const data = await response.data;

  return id;
});

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectEntities: selectLabelsEntities,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.notesApp.labels);

const labelsSlice = createSlice({
  name: 'notesApp/labels',
  initialState: labelsAdapter.getInitialState({ labelsDialogOpen: false }),
  reducers: {
    openLabelsDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
  },
  extraReducers: {
    [getLabels.fulfilled]: labelsAdapter.setAll,
    [updateLabel.fulfilled]: labelsAdapter.upsertOne,
    [removeLabel.fulfilled]: labelsAdapter.removeOne,
    [createLabel.fulfilled]: labelsAdapter.addOne,
  },
});

export const { openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export const selectLabelsDialogOpen = ({ notesApp }) => notesApp.labels.labelsDialogOpen;

export default labelsSlice.reducer;
