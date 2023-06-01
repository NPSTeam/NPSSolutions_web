import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';

export const getNotifications = createAsyncThunk('notificationPanel/getData', async () => {
  const response = await http.get('/api/v1/notifications');
  const data = await response.data;

  return data;
});

export const dismissAll = createAsyncThunk('notificationPanel/dismissAll', async () => {
  const response = await http.delete('/api/v1/notifications');
  await response.data;

  return true;
});

export const dismissItem = createAsyncThunk('notificationPanel/dismissItem', async (id) => {
  const response = await http.delete(`/api/v1/notifications/${id}`);
  await response.data;

  return id;
});

export const addNotification = createAsyncThunk(
  'notificationPanel/addNotification',
  async (item) => {
    const response = await http.post(`/api/notifications`, { ...item });
    const data = await response.data;

    return data;
  }
);

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
  notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState,
  reducers: {},
  extraReducers: {
    [dismissItem.fulfilled]: (state, action) =>
      notificationsAdapter.removeOne(state, action.payload),
    [dismissAll.fulfilled]: (state, action) => notificationsAdapter.removeAll(state),
    [getNotifications.fulfilled]: (state, action) =>
      notificationsAdapter.addMany(state, action.payload),
    [addNotification.fulfilled]: (state, action) =>
      notificationsAdapter.addOne(state, action.payload),
  },
});

export default dataSlice.reducer;
