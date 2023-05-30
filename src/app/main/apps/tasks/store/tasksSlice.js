import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import http from 'src/axios/ClassAxios';
import { addTask, removeTask, updateTask } from './taskSlice';

export const getTasks = createAsyncThunk(
  'tasksApp/tasks/getTasks',
  async (params, { getState }) => {
    const response = await http.get('/api/v1/tasks/list');

    const data = await response.data;

    return data;
  }
);

// dang lam
export const reorderList = createAsyncThunk(
  'tasksApp/tasks/reorder',
  async ({ body }, { dispatch, getState }) => {
    const response = await http.put('/api/v1/tasks/reorder-task', { taskOrders: body });

    const data = await response.data;
    // dispatch(getTasks());
    dispatch(
      showMessage({
        message: 'List Order Saved',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    );

    return data;
  }
);

const tasksAdapter = createEntityAdapter({});

export const { selectAll: selectTasks, selectById: selectTasksById } = tasksAdapter.getSelectors(
  (state) => state.tasksApp.tasks
);

export const selectRemainingTasks = createSelector([selectTasks], (tasks) => {
  return tasks.filter((item) => item.type === 'task' && !item.completed).length;
});

const tasksSlice = createSlice({
  name: 'tasksApp/tasks',
  initialState: tasksAdapter.getInitialState(),
  extraReducers: {
    [reorderList.fulfilled]: tasksAdapter.setAll,
    [updateTask.fulfilled]: tasksAdapter.upsertOne,
    [addTask.fulfilled]: tasksAdapter.addOne,
    [removeTask.fulfilled]: (state, action) => tasksAdapter.removeOne(state, action.payload),
    [getTasks.fulfilled]: tasksAdapter.setAll,
  },
});

export const { setTasksSearchText } = tasksSlice.actions;

export default tasksSlice.reducer;
