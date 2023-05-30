import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import http from 'src/axios/ClassAxios';

export const getTags = createAsyncThunk(
  'contactsApp/tags/getTags',
  async (params, { getState }) => {
    const response = await http.get('/api/v1/contacts/tags');

    const data = await response.data;

    return data;
  }
);

export const addTag = createAsyncThunk('contactsApp/tags/addTag', async (newTag, { dispatch }) => {
  const response = await http.post('/api/v1/contacts/tags', newTag);
  const data = await response.data;

  return data;
});

export const updateTag = createAsyncThunk(
  'contactsApp/tags/updateTag',
  async (tag, { dispatch }) => {
    const response = await http.put(`/api/v1/contacts/tags`, tag);
    const data = await response.data;

    return data;
  }
);

export const removeTag = createAsyncThunk(
  'contactsApp/tags/removeTag',
  async (tagId, { dispatch }) => {
    const response = await http.delete(`/api/v1/contacts/tags/${tagId}`);
    const data = await response.data;

    return tagId;
  }
);

export const getListEmails = createAsyncThunk(
  'contactsApp/tags/getListEmails',
  async (params, { dispatch }) => {
    const response = await http.get('/api/v1/contacts/email');
    const data = await response.data;
    dispatch(setListEmails(data));
    return data;
  }
);

const tagsAdapter = createEntityAdapter({});

export const {
  selectAll: selectTags,
  selectIds: selectTagIds,
  selectById: selectTagById,
} = tagsAdapter.getSelectors((state) => state.contactsApp.tags);

const tagsSlice = createSlice({
  name: 'contactsApp/tags',
  initialState: tagsAdapter.getInitialState({
    selectedTags: [],
    tagsDialogOpen: false,
    listEmails: [],
    emailSelected: null,
  }),
  reducers: {
    toggleSelectedTags: (state, action) => {
      state.selectedTags = _.xor(state.selectedTags, [action.payload]);
    },
    openTagsDialog: (state, action) => {
      state.tagsDialogOpen = true;
    },
    closeTagsDialog: (state, action) => {
      state.tagsDialogOpen = false;
    },
    setListEmails: (state, action) => {
      state.listEmails = action.payload;
    },
    setEmailSeleted: (state, action) => {
      state.emailSelected = action.payload;
    },
  },
  extraReducers: {
    [getTags.fulfilled]: (state, action) => {
      tagsAdapter.setAll(state, action.payload);
      state.selectedTags = action.payload.map((item) => item.id);
    },
    [addTag.fulfilled]: tagsAdapter.addOne,
    [updateTag.fulfilled]: tagsAdapter.upsertOne,
    [removeTag.fulfilled]: tagsAdapter.removeOne,
  },
});

export const selectSelectedTags = ({ contactsApp }) => contactsApp.tags.selectedTags;
export const selectFirstTagId = ({ contactsApp }) => contactsApp.tags.ids[0];
export const selectTagsDialogOpen = ({ contactsApp }) => contactsApp.tags.tagsDialogOpen;

export const {
  toggleSelectedTags,
  openTagsDialog,
  closeTagsDialog,
  setListEmails,
  setEmailSeleted,
} = tagsSlice.actions;

export default tagsSlice.reducer;
