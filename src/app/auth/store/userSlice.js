/* eslint import/no-extraneous-dependencies: off */
import history from '@history';
import _ from '@lodash';
import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Auth0Service from 'src/app/services/auth0Service';
import JwtService from 'src/app/services/jwtService';
import { HTTP_AUTH } from 'src/axios/host';
import url from 'src/axios/url';
import authRoles from '../authRoles';
// KHONGDUNG
export const setUserDataAuth0 = (tokenData) => async (dispatch) => {
  const user = {
    role: ['admin'],
    from: 'auth0',
    data: {
      displayName: tokenData.username || tokenData.name,
      photoURL: tokenData.picture,
      email: tokenData.email,
      settings:
        tokenData.user_metadata && tokenData.user_metadata.settings
          ? tokenData.user_metadata.settings
          : {},
      shortcuts:
        tokenData.user_metadata && tokenData.user_metadata.shortcuts
          ? tokenData.user_metadata.shortcuts
          : [],
    },
  };

  return dispatch(setUserData(user));
};

export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
  if (
    user &&
    user.data &&
    user.data.settings &&
    user.data.settings.theme &&
    user.data.settings.layout &&
    user.data.settings.layout.style
  ) {
    // Set user data but do not update
    return dispatch(setUserData(user));
  }

  // Create missing user settings
  return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = (authUser) => async (dispatch, getState) => {
  const guestUser = getState().auth.user;
  const fuseDefaultSettings = getState().fuse.settings.defaults;
  const { currentUser } = firebase.auth();

  /**
   * Merge with current Settings
   */
  const user = _.merge({}, guestUser, {
    uid: authUser.uid,
    from: 'firebase',
    role: ['admin'],
    data: {
      displayName: authUser.displayName,
      email: authUser.email,
      settings: { ...fuseDefaultSettings },
    },
  });
  currentUser.updateProfile(user.data);

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

const createRedirectUrlWithRole = (user) => {
  const { roles } = user;
  if (_.some(roles, (item) => authRoles.admin.includes(item))) {
    return '/apps/workspaces';
  }
  if (_.some(roles, (item) => authRoles.user.includes(item))) {
    return '/example';
  }
  return '/login';
};

export const setUserData = (user) => async (dispatch, getState) => {
  /*
  You can redirect the logged-in user to a specific route depending on his role
  */

  // history.location.state = {
  //   redirectUrl: createRedirectUrlWithRole(user),
  // };
  const redirectUrl = createRedirectUrlWithRole(user);

  /*
    Set User Settings
     */
  // dispatch(setDefaultSettings(user?.settings));
  console.log('setUSER');
  dispatch(setUser(user));
  // history.push(redirectUrl);
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  HTTP_AUTH.patch(url.me, {
    settingsString: JSON.stringify(settings),
  })
    .then((res) => {
      console.log(res.message);
    })
    .catch((err) => {
      console.log(err);
    });

  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { settings });

  dispatch(updateUserData(user));
  return dispatch(setUserData(user));
};

export const updateUserShortcuts = (shortcuts) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const newUser = {
    ...user,
    data: {
      ...user?.data,
      shortcuts,
    },
  };

  dispatch(updateUserData(newUser));

  return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.roles || user.roles.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/login',
  });

  switch (user.from) {
    case 'firebase': {
      break;
    }
    case 'auth0': {
      Auth0Service.logout();
      break;
    }
    default: {
      JwtService.logout();
    }
  }

  dispatch(setInitialSettings());

  window.location.reload();

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.roles || user.roles.length === 0) {
    // is guest
    return;
  }
  switch (user.from) {
    case 'auth0': {
      Auth0Service.updateUserData({
        settings: user?.data?.settings,
        shortcuts: user?.data?.shortcuts,
      })
        .then(() => {
          dispatch(showMessage({ message: 'User data saved to auth0' }));
        })
        .catch((error) => {
          dispatch(showMessage({ message: error.message }));
        });
      break;
    }
    default: {
      JwtService.updateUserData(user)
        .then(() => {
          dispatch(showMessage({ message: 'User data saved with api odm' }));
        })
        .catch((error) => {
          dispatch(showMessage({ message: error.message }));
        });
      break;
    }
  }
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
  },
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
