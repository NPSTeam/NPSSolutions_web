import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import _ from '@lodash';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import { selectFolders } from './foldersSlice';
import { selectLabels } from './labelsSlice';
import { selectFilters } from './filtersSlice';

export const getMails = createAsyncThunk(
  'mailboxApp/mails/getMails',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().mailboxApp.mails.routeParams;

    let urlEmail = '/api/v1/mailbox/mails/';
    if (routeParams.folderHandle) {
      urlEmail += routeParams.folderHandle;
    }

    if (routeParams.labelHandle) {
      urlEmail += `labels/${routeParams.labelHandle}`;
    }

    if (routeParams.filterHandle) {
      urlEmail += `filters/${routeParams.filterHandle}`;
    }
    const response = await http.get(urlEmail);
    const data = await response.data;

    return { data, routeParams };
  }
);

export const setActionToMails = createAsyncThunk(
  'mailboxApp/mails/setActionToMails',
  async ({ type, value, ids }, { dispatch, getState }) => {
    const { mails } = getState().mailboxApp;
    const { selectedMailIds } = mails;

    const response = await http.post('/api/v1/mailbox/actions', {
      type,
      value,
      ids,
    });

    const data = await response.data;

    dispatch(getMails());

    return data;
  }
);

export const sendEmail = createAsyncThunk(
  'mailboxApp/mails/sendEmail',
  async (mail, { dispatch }) => {
    console.log('mail', mail);
    const response = await http.post('/api/v1/mailbox/mails', mail);

    const data = await response.data;

    // dispatch(getMails(routeParams));

    return data;
  }
);

export const setUsersByPagination = createAsyncThunk(
  'users/setUsersByPagination',
  async (params, { dispatch, getState }) => {
    try {
      const response = await http.get(url.listUsers, {
        params: {},
      });

      dispatch(setListUsersInSystem(response.data.datas));
      console.log('response', response.data.datas);
    } catch (error) {
      console.log(error);
    }
  }
);

const mailsAdapter = createEntityAdapter({});

export const { selectAll: selectMails, selectById: selectMailById } = mailsAdapter.getSelectors(
  (state) => state.mailboxApp.mails
);

const mailsSlice = createSlice({
  name: 'mailboxApp/mails',
  initialState: mailsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    selectedMailIds: [],
    listUsersInSystem: [],
  }),
  reducers: {
    setMailsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    selectAllMails: (state, action) => {
      state.selectedMailIds = state.ids;
    },
    deselectAllMails: (state, action) => {
      state.selectedMailIds = [];
    },
    selectMailsByParameter: (state, action) => {
      const [parameter, value] = action.payload;
      state.selectedMailIds = state.ids.filter((id) => state.entities[id][parameter] === value);
    },
    toggleInSelectedMails: (state, action) => {
      const mailId = action.payload;
      state.selectedMailIds = state.selectedMailIds.includes(mailId)
        ? state.selectedMailIds.filter((id) => id !== mailId)
        : [...state.selectedMailIds, mailId];
    },
    setListUsersInSystem: (state, action) => {
      state.listUsersInSystem = action.payload;
    },
  },
  extraReducers: {
    [getMails.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      mailsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.selectedMailIds = [];
    },
  },
});

export const {
  setMailsSearchText,
  selectAllMails,
  deselectAllMails,
  selectMailsByParameter,
  toggleInSelectedMails,
  setListUsersInSystem,
} = mailsSlice.actions;

export const selectMailsTitle = (routeParams) =>
  createSelector([selectFolders, selectLabels, selectFilters], (folders, labels, filters) => {
    let title;
    if (routeParams.folderHandle) {
      title = _.find(folders, { slug: routeParams.folderHandle })?.title;
    }

    if (routeParams.labelHandle) {
      title = _.find(labels, { slug: routeParams.labelHandle })?.title;
    }

    if (routeParams.filterHandle) {
      title = _.find(filters, { slug: routeParams.filterHandle })?.title;
    }
    return title;
  });

export const selectSearchText = ({ mailboxApp }) => mailboxApp.mails.searchText;

export const selectSelectedMailIds = ({ mailboxApp }) => mailboxApp.mails.selectedMailIds;

export default mailsSlice.reducer;
