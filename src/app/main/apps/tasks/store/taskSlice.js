import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import http from 'src/axios/ClassAxios';
import SectionModel from '../model/SectionModel';
import TaskModel from '../model/TaskModel';

export const getTask = createAsyncThunk(
  'tasksApp/task/getTask',
  async (id, { dispatch, getState }) => {
    try {
      const response = await http.get(`/api/v1/tasks/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      history.push({ pathname: `/apps/tasks` });

      return null;
    }
  }
);

export const addTask = createAsyncThunk(
  'tasksApp/tasks/addTask',
  async (task, { dispatch, getState }) => {
    const response = await http.post('/api/v1/tasks', task);

    const data = await response.data;

    return data;
  }
);

export const updateTask = createAsyncThunk(
  'tasksApp/tasks/updateTask',
  async (task, { dispatch, getState }) => {
    const response = await http.put(`/api/v1/tasks`, task);

    const data = await response.data;

    return data;
  }
);

export const removeTask = createAsyncThunk(
  'tasksApp/tasks/removeTask',
  async (id, { dispatch, getState }) => {
    const response = await http.delete(`/api/v1/tasks/${id}`);

    await response.data;

    return id;
  }
);

export const selectTask = ({ tasksApp }) => tasksApp.task;

const taskSlice = createSlice({
  name: 'tasksApp/task',
  initialState: null,
  reducers: {
    newTask: (state, action) => {
      const type = action.payload;
      if (type === 'section') {
        return SectionModel();
      }
      if (type === 'task') {
        return TaskModel();
      }
      return null;
    },
    resetTask: () => null,
  },
  extraReducers: {
    [getTask.pending]: (state, action) => null,
    [getTask.fulfilled]: (state, action) => action.payload,
    [updateTask.fulfilled]: (state, action) => action.payload,
    [removeTask.fulfilled]: (state, action) => null,
  },
});

export const { resetTask, newTask } = taskSlice.actions;

export default taskSlice.reducer;
