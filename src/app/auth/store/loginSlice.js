import { createSlice } from '@reduxjs/toolkit';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import jwtService from 'src/app/services/jwtService';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import history from '@history';

import _ from 'lodash';
import { setUser } from './userSlice';
import authRoles from '../authRoles';

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
export const submitLoginByEmail =
  ({ username, password, rememberMe }) =>
  async (dispatch) => {
    return jwtService
      .signInWithEmailAndPassword(username, password, rememberMe)
      .then(async (user) => {
        dispatch(setDefaultSettings(user.settings));
        const redirectUrl = createRedirectUrlWithRole(user);

        dispatch(setUser(user));
        dispatch(loginSuccess());
        history.push(redirectUrl);
      })
      .catch((errors) => {
        console.log('errors', errors);
        return dispatch(loginError(errors));
      });
  };

// export const submitLoginByPhoneNumber =
//   ({ phoneNumber, verifierID }) =>
//   async (dispatch) => {
//     return firebaseService
//       .signInWithPhoneNumber(phoneNumber, verifierID)
//       .then(async (confirmationResult) => {
//         dispatch(setConfirmationResult(confirmationResult));
//         dispatch(verify(true));
//       })
//       .catch((error) => {
//         console.log(error);
//         return dispatch(firebaseError([error]));
//       });
//   };

// export const submitOTP =
//   ({ otp }) =>
//   async (dispatch, getState) => {
//     try {
//       const { confirmationResult } = getState().auth.login;
//       await confirmationResult.confirm(otp);
//       const idToken = await firebaseService.auth.currentUser.getIdToken();
//       return jwtService.signInWithFirebaseToken(idToken).then(async (user) => {
//         dispatch(setDefaultSettings(user.settings));
//         const redirectUrl = createRedirectUrlWithRole(user);
//         dispatch(setUser(user));
//         dispatch(loginSuccess());
//         history.push(redirectUrl);
//       });
//     } catch (error) {
//       console.log(error);
//       return dispatch(firebaseError([error]));
//     }
//   };

// export const submitLoginWithFireBase =
//   ({ email, password }) =>
//   async (dispatch) => {
//     if (!firebaseService.auth) {
//       console.warn("Firebase Service didn't initialize, check your configuration");

//       return () => false;
//     }
//     return firebaseService.auth
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         return dispatch(loginSuccess());
//       })
//       .catch((error) => {
//         const emailErrorCodes = [
//           'auth/email-already-in-use',
//           'auth/invalid-email',
//           'auth/operation-not-allowed',
//           'auth/user-not-found',
//           'auth/user-disabled',
//         ];
//         const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
//         const response = [];

//         if (emailErrorCodes.includes(error.code)) {
//           response.push({
//             type: 'email',
//             message: error.message,
//           });
//         }

//         if (passwordErrorCodes.includes(error.code)) {
//           response.push({
//             type: 'password',
//             message: error.message,
//           });
//         }

//         if (error.code === 'auth/invalid-api-key') {
//           dispatch(showMessage({ message: error.message }));
//         }

//         return dispatch(loginError(response));
//       });
//   };

const initialState = {
  success: false,
  errors: [],
  firebaseErrors: [],
  isVerified: false,
  confirmationResult: null,
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
    firebaseError: (state, action) => {
      state.success = false;
      state.firebaseErrors = action.payload;
    },
    verify: (state, action) => {
      state.isVerified = action.payload;
    },
    setConfirmationResult: (state, action) => {
      state.confirmationResult = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError, verify, setConfirmationResult, firebaseError } =
  loginSlice.actions;

export default loginSlice.reducer;
