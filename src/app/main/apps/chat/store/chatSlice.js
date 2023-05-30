import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from 'src/axios/ClassAxios';
import { getChats } from './chatsSlice';

export const getChat = createAsyncThunk(
  'chatApp/chat/getChat',
  async (contactId, { dispatch, getState }) => {
    const response = await http.get(`/api/v1/chat/chats/${contactId}`);

    const data = await response.data;

    return data;
  }
);

export const sendMessage = createAsyncThunk(
  'chatApp/chat/sendMessage',
  async ({ messageText, chatId, contactId, createdAt }, { dispatch, getState }) => {
    const messageData = {
      chatId,
      contactId,
      createdAt,
      value: messageText,
    };
    const response = await http.post(`/api/v1/chat`, messageData);

    const data = await response.data;

    dispatch(getChats());

    return data;
  }
);

const chatSlice = createSlice({
  name: 'chatApp/chat',
  initialState: [],
  reducers: {
    removeChat: (state, action) => action.payload,
  },
  extraReducers: {
    [getChat.fulfilled]: (state, action) => action.payload,
    [sendMessage.fulfilled]: (state, action) => [...state, action.payload],
  },
});

export const selectChat = ({ chatApp }) => chatApp.chat;

export default chatSlice.reducer;
