import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';

export const getTags = createAsyncThunk('tasksApp/tags/getTags', async (params, { getState }) => {
  const response = await http.get('/api/v1/tasks/tags');

  const data = await response.data;

  return data;
});

export const createTags = createAsyncThunk(
  'tasksApp/tags/createTags',
  async (title, { dispatch, getState }) => {
    const LabelModel = {
      title,
    };
    const response = await http.post(`/api/v1/tasks/tags`, LabelModel);
    dispatch(getTags());
    toast.success('Create label success');
    const data = await response.data;

    return data;
  }
);

const tagsAdapter = createEntityAdapter({});

export const { selectAll: selectTags, selectById: selectTagsById } = tagsAdapter.getSelectors(
  (state) => state.tasksApp.tags
);

const tagsSlice = createSlice({
  name: 'tasksApp/tags',
  initialState: tagsAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getTags.fulfilled]: tagsAdapter.setAll,
  },
});

export default tagsSlice.reducer;
