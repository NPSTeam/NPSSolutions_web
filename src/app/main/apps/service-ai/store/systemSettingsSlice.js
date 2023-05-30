import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';

const initialState = {
  systemSettings: [],
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
const systemSettingsSlice = createSlice({
  name: 'systemSettings',
  initialState,
  reducers: {
    setSystemSettings: (state, action) => {
      state.systemSettings = action.payload;
    },
  },
});

export const { setSystemSettings } = systemSettingsSlice.actions;

export default systemSettingsSlice.reducer;
