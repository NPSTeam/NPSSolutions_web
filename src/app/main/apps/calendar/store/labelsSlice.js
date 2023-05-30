/* eslint-disable no-nested-ternary */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import http from 'src/axios/ClassAxios';

export const getLabels = createAsyncThunk(
  'calendarApp/labels/getLabels',
  async (dataGet, { dispatch, getState }) => {
    const { modeCalendarFilter } = getState().calendarApp.events;

    const response =
      modeCalendarFilter === 'workspaceId'
        ? await http.get(`/api/v1/calendar/labels?workspaceId=${dataGet}`)
        : modeCalendarFilter === 'userId'
        ? await http.get(`/api/v1/calendar/labels?userId=${dataGet}`)
        : await http.get(`/api/v1/calendar/labels`);
    const data = await response.data;

    return data;
  }
);

export const addLabel = createAsyncThunk(
  'calendarApp/labels/addLabel',
  async (newLabel, { dispatch }) => {
    const response = await http.post('/api/v1/calendar/labels', newLabel);
    const data = await response.data;

    return data;
  }
);

export const updateLabel = createAsyncThunk(
  'calendarApp/labels/updateLabel',
  async (label, { dispatch }) => {
    const response = await http.put(`/api/v1/calendar/labels`, label);
    const data = await response.data;

    return data;
  }
);

export const removeLabel = createAsyncThunk(
  'calendarApp/labels/removeLabel',
  async (labelId, { dispatch }) => {
    const response = await http.delete(`/api/v1/calendar/labels/${labelId}`);
    const data = await response.data;

    return labelId;
  }
);

const labelsAdapter = createEntityAdapter({});

export const {
  selectAll: selectLabels,
  selectIds: selectLabelIds,
  selectById: selectLabelById,
} = labelsAdapter.getSelectors((state) => state.calendarApp.labels);

const labelsSlice = createSlice({
  name: 'calendarApp/labels',
  initialState: labelsAdapter.getInitialState({
    selectedLabels: [],
    labelsDialogOpen: false,
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

export const selectSelectedLabels = ({ calendarApp }) => calendarApp.labels.selectedLabels;
export const selectFirstLabelId = ({ calendarApp }) => calendarApp.labels.ids[0];
export const selectLabelsDialogOpen = ({ calendarApp }) => calendarApp.labels.labelsDialogOpen;

export const { toggleSelectedLabels, openLabelsDialog, closeLabelsDialog } = labelsSlice.actions;

export default labelsSlice.reducer;
