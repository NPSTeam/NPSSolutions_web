import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';

export const getWidgets = createAsyncThunk('projectDashboardApp/widgets/getWidgets', async () => {
  const response = await http.get('/api/v1/api/dashboards/project/widgets');
  const data = await response.data;

  return data;
});

const widgetsSlice = createSlice({
  name: 'projectDashboardApp/widgets',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ projectDashboardApp }) => projectDashboardApp.widgets;

export default widgetsSlice.reducer;
