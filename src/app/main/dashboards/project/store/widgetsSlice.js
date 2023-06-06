import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';

export const getWidgets = createAsyncThunk(
  'projectDashboardApp/widgets/getWidgets',
  async (workspaceId) => {
    const response = await http.get(`/api/v1/api/dashboards/project/widgets/${workspaceId}`);
    const data = await response.data;

    return data;
  }
);

export const getDetailUser = createAsyncThunk(
  'projectDashboardApp/widgets/getDetailUser',
  async (params, { dispatch, getState }) => {
    const response = await http.get(
      `/api/v1/workspace/${params.workspaceId}/user/${params.userId}`
    );

    console.log('response', response);

    const data = await response.data;
    dispatch(setProfileData(data));

    return data;
  }
);

const initialState = {
  profileData: {},
};

const widgetsSlice = createSlice({
  name: 'projectDashboardApp/widgets',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ projectDashboardApp }) => projectDashboardApp.widgets;

export const { setProfileData } = widgetsSlice.actions;

export default widgetsSlice.reducer;
