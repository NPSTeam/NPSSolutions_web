import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import http from 'src/axios/ClassAxios';

export const getLabels = createAsyncThunk(
  'mailboxApp/labels/getLabels',
  async (params, { getState }) => {
    const response = await http.get('/api/v1/mailbox/labels');

    const data = await response.data;

    return data;
  }
);

export const addLabel = createAsyncThunk(
  'mailboxApp/labels/addLabel',
  async (newLabel, { dispatch }) => {
    const response = await http.post('/api/v1/mailbox/labels', newLabel);
    const data = await response.data;

    return data;
  }
);

export const updateLabel = createAsyncThunk(
  'mailboxApp/labels/updateLabel',
  async (label, { dispatch }) => {
    const response = await http.put(`/api/v1/mailbox/labels`, label);
    const data = await response.data;

    return data;
  }
);

export const removeLabel = createAsyncThunk(
  'mailboxApp/labels/removeLabel',
  async (labelId, { dispatch }) => {
    const response = await http.delete(`/api/v1/mailbox/labels/${labelId}`);
    const data = await response.data;

    return labelId;
  }
);

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectIds: selectLabelIds,
  selectById: selectLabelById,
  selectEntities: selectLabelsEntities,
} = labelsAdapter.getSelectors((state) => state.mailboxApp.labels);

const labelsSlice = createSlice({
  name: 'mailboxApp/labels',
  initialState: labelsAdapter.getInitialState({
    selectedLabels: [],
    labelsDialogOpen: false,
    listEmails: [],
    emailSelected: null,
  }),
  reducers: {
    toggleSelectedLabels: (state, action) => {
      state.selectedLabels = _.xor(state.selectedLabels, [action.payload]);
    },
    openLabelsDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
    setListEmails: (state, action) => {
      state.listEmails = action.payload;
    },
    setEmailSeleted: (state, action) => {
      state.emailSelected = action.payload;
    },
  },
  extraReducers: {
    [getLabels.fulfilled]: (state, action) => {
      labelsAdapter.setAll(state, action.payload);
      state.selectedLabels = action.payload.map((item) => item.id);
    },
    [addLabel.fulfilled]: labelsAdapter.addOne,
    [updateLabel.fulfilled]: labelsAdapter.upsertOne,
    [removeLabel.fulfilled]: labelsAdapter.removeOne,
  },
});

export const selectSelectedLabels = ({ mailboxApp }) => mailboxApp.labels.selectedLabels;
export const selectFirstLabelId = ({ mailboxApp }) => mailboxApp.labels.ids[0];
export const selectLabelsDialogOpen = ({ mailboxApp }) => mailboxApp.labels.labelsDialogOpen;

export const {
  toggleSelectedLabels,
  openLabelsDialog,
  closeLabelsDialog,
  setListEmails,
  setEmailSeleted,
} = labelsSlice.actions;

export default labelsSlice.reducer;
