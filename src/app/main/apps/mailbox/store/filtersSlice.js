import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';

export const getFilters = createAsyncThunk('mailboxApp/filters/getFilters', async () => {
  const response = await http.get('/api/v1/mailbox/filters');
  const data = await response.data;

  return data;
});

const filtersAdapter = createEntityAdapter({});

export const { selectAll: selectFilters, selectById: selectFilterById } =
  filtersAdapter.getSelectors((state) => state.mailboxApp.filters);

const filtersSlice = createSlice({
  name: 'mailboxApp/filters',
  initialState: filtersAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getFilters.fulfilled]: filtersAdapter.setAll,
  },
});

export default filtersSlice.reducer;
