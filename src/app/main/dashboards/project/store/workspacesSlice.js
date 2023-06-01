/* eslint-disable no-nested-ternary */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import formatISO from 'date-fns/formatISO';
import { toast } from 'react-toastify';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getWorkspace = createAsyncThunk(
  'calendarApp/events/getWorkspace',
  async ({ dispatch }) => {
    const response = await http.get(url.userForWorkspace);
    const data = await response.data;
    dispatch(setListWorkspace(data));
    return data;
  }
);

export const getEvents = createAsyncThunk(
  'calendarApp/events/getEvents',
  async (dataGet, { dispatch, getState }) => {
    const { modeCalendarFilter } = getState().calendarApp.events;

    const response =
      modeCalendarFilter === 'workspaceId'
        ? await http.get(`/api/v1/calendar/events?workspaceId=${dataGet}`)
        : modeCalendarFilter === 'userId'
        ? await http.get(`/api/v1/calendar/events?userId=${dataGet}`)
        : await http.get(`/api/v1/calendar/events`);
    const data = await response.data;

    return data;
  }
);

export const addEvent = createAsyncThunk(
  'calendarApp/events/addEvent',
  async (newEvent, { dispatch }) => {
    const response = await http.post('/api/v1/calendar/events', newEvent);
    const data = await response.data;

    toast.success('SUCCESS', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    return data;
  }
);

export const updateEvent = createAsyncThunk(
  'calendarApp/events/updateEvent',
  async (event, { dispatch }) => {
    const response = await http.put(`/api/v1/calendar/events`, event);
    const data = await response.data;

    return data;
  }
);

export const removeEvent = createAsyncThunk(
  'calendarApp/events/removeEvent',
  async (eventId, { dispatch }) => {
    const response = await http.delete(`/api/v1/calendar/events/${eventId}`);
    const data = await response.data;

    // return data
    return eventId;
  }
);

const eventsAdapter = createEntityAdapter({});

export const {
  selectAll: selectEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
} = eventsAdapter.getSelectors((state) => state.calendarApp.events);

const workspacesSlice = createSlice({
  name: 'calendarApp/events',
  initialState: eventsAdapter.getInitialState({
    listWorkspace: [],
    targetWorkspace: null,
    modeCalendarFilter: null,
    eventDialog: {
      type: 'new',
      props: {
        open: false,
        anchorPosition: { top: 200, left: 400 },
      },
      data: null,
    },
  }),
  reducers: {
    setListWorkspace: (state, action) => {
      state.listWorkspace = action.payload;
    },
    setTargetWorkspace: (state, action) => {
      state.targetWorkspace = action.payload;
    },
    setModeCalendarFilter: (state, action) => {
      state.modeCalendarFilter = action.payload;
    },
    openNewEventDialog: {
      prepare: (selectInfo) => {
        const { start, end, jsEvent } = selectInfo;
        const payload = {
          type: 'new',
          props: {
            open: true,
            anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX },
          },
          data: {
            start: formatISO(new Date(start)),
            end: formatISO(new Date(end)),
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    openEditEventDialog: {
      prepare: (clickInfo) => {
        const { jsEvent, event } = clickInfo;
        const { id, title, allDay, start, end, extendedProps } = event;

        const payload = {
          type: 'edit',
          props: {
            open: true,
            anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX },
          },
          data: {
            id,
            title,
            allDay,
            extendedProps,
            start: formatISO(new Date(start)),
            end: formatISO(new Date(end)),
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    closeNewEventDialog: (state, action) => {
      state.eventDialog = {
        type: 'new',
        props: {
          open: false,
          anchorPosition: { top: 200, left: 400 },
        },
        data: null,
      };
    },
    closeEditEventDialog: (state, action) => {
      state.eventDialog = {
        type: 'edit',
        props: {
          open: false,
          anchorPosition: { top: 200, left: 400 },
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getEvents.fulfilled]: eventsAdapter.setAll,
    [addEvent.fulfilled]: eventsAdapter.addOne,
    [updateEvent.fulfilled]: eventsAdapter.upsertOne,
    [removeEvent.fulfilled]: eventsAdapter.removeOne,
  },
});

export const {
  openNewEventDialog,
  closeNewEventDialog,
  openEditEventDialog,
  closeEditEventDialog,
  setListWorkspace,
  setTargetWorkspace,
  setModeCalendarFilter,
} = workspacesSlice.actions;

export const selectFilteredEvents = createSelector([selectEvents], (selectedLabels, events) => {
  return events.filter((item) => selectedLabels.includes(item.extendedProps.label));
});

export const selectEventDialog = ({ calendarApp }) => calendarApp.events.eventDialog;

export default workspacesSlice.reducer;
