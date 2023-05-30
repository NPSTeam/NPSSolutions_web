import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import http from 'src/axios/ClassAxios';
import ContactModel from '../model/ContactModel';

export const getContact = createAsyncThunk(
  'contactsApp/task/getContact',
  async (id, { dispatch, getState }) => {
    try {
      const response = await http.get(`/api/v1/contacts/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      history.push({ pathname: `/apps/contacts` });

      return null;
    }
  }
);

export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    const response = await http.post('/api/v1/contacts', contact);

    const data = await response.data;

    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    const response = await http.put(`/api/v1/contacts`, contact);

    const data = await response.data;

    return data;
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (id, { dispatch, getState }) => {
    const response = await http.delete(`/api/v1/contacts/${id}`);

    await response.data;

    return id;
  }
);

export const selectContact = ({ contactsApp }) => contactsApp.contact;

const contactSlice = createSlice({
  name: 'contactsApp/contact',
  initialState: null,
  reducers: {
    newContact: (state, action) => ContactModel(),
    resetContact: () => null,
  },
  extraReducers: {
    [getContact.pending]: (state, action) => null,
    [getContact.fulfilled]: (state, action) => action.payload,
    [updateContact.fulfilled]: (state, action) => action.payload,
    [removeContact.fulfilled]: (state, action) => null,
  },
});

export const { resetContact, newContact } = contactSlice.actions;

export default contactSlice.reducer;
