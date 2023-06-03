import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';

const initialState = {
  systemSettings: [],
  content: [],
  userContent: [],
  assContent: [],
  targetId: '',
};

export const getSystemSettings = createAsyncThunk(
  'systemSettings/getSystemSettings',
  async (data, { dispatch, getState }) => {
    try {
      const response = await http.get('/api/v1/system-setting');
      dispatch(setSystemSettings(response.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateSystemSettings = createAsyncThunk(
  'systemSettings/updateSystemSettings',
  async (data, { dispatch, getState }) => {
    try {
      const response = await http.post('/api/v1/system-setting', data);
      dispatch(setSystemSettings(response.data));
      toast.success('Update system settings successfully!');
    } catch (err) {
      console.log(err);
    }
  }
);
export const getChatContent = createAsyncThunk(
  'systemSettings/getChatContent',
  async (data, { dispatch, getState }) => {
    try {
      const response = await http.get('/api/v1/chat-content');
      dispatch(setContent(response.data));
    } catch (err) {
      console.log(err);
    }
  }
);
export const createChatContent = createAsyncThunk(
  'systemSettings/createChatContent',
  async (data, { dispatch, getState }) => {
    try {
      const response = await http.post('/api/v1/chat-content', {
        role: 'user',
        content: data.data.contentUser,
      });
      const response2 = await http.post('/api/v1/chat-content', {
        role: 'assistant',
        content: data.data.contentAssistant,
      });
      dispatch(getChatContent());
      toast.success('Create chat content successfully!');
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateChatContent = createAsyncThunk(
  'systemSettings/updateChatContent',
  async (data, { dispatch, getState }) => {
    try {
      console.log(data);
      const response = await http.put('/api/v1/chat-content', {
        role: data.role,
        id: data.id,
        content: data.content,
      });

      toast.success('Update chat content successfully!');
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteChatContent = createAsyncThunk(
  'systemSettings/deleteChatContent',
  async (idc, { dispatch, getState }) => {
    try {
      const id = getState().systemSettingsApp.systemSettings.targetId;

      const response = await http.delete(`/api/v1/chat-content/${id}`);
      dispatch(getChatContent());
    } catch (err) {
      console.log(err);
    }
  }
);
const systemSettingsSlice = createSlice({
  name: 'systemSettings',
  initialState,
  reducers: {
    setSystemSettings: (state, action) => {
      state.systemSettings = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setTargetId: (state, action) => {
      state.targetId = action.payload;
    },
  },
});

export const { setSystemSettings, setContent, setTargetId } = systemSettingsSlice.actions;

export default systemSettingsSlice.reducer;
