import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { STAFF_ROLE_ID } from 'constants/index';
import { HTTP_AUTH } from 'src/axios/host';
import url from 'src/axios/url';

export const submitRegister = createAsyncThunk(
  'login/signUp',

  async (
    { birthDay, confirmPassword, email, password, phoneNumber, username },
    { dispatch, getState }
  ) => {
    const { fileContent } = getState().auth.register;
    const { fileName } = getState().auth.register;
    try {
      const authRes = await HTTP_AUTH.post(url.signUpByEmail, {
        birthDay,
        confirmPassword,
        email,
        password,
        phoneNumber,
        username,
        fileContent,
        fileName,
      });

      dispatch(setSuccess(true));
    } catch (err) {
      dispatch(setSuccess(false));
      dispatch(setErrorsReponse(err.response.data.errors[0].message));
      console.log(err);
    }
  }
);

// export const registerWithFirebase = (model) => async (dispatch) => {
//   if (!firebaseService.auth) {
//     console.warn("Firebase Service didn't initialize, check your configuration");

//     return () => false;
//   }
//   const { email, password, displayName } = model;

//   return firebaseService.auth
//     .createUserWithEmailAndPassword(email, password)
//     .then((response) => {
//       dispatch(
//         createUserSettingsFirebase({
//           ...response.user,
//           displayName,
//           email,
//         })
//       );

//       return dispatch(registerSuccess());
//     })
//     .catch((error) => {
//       const usernameErrorCodes = [
//         'auth/operation-not-allowed',
//         'auth/user-not-found',
//         'auth/user-disabled',
//       ];

//       const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

//       const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

//       const response = [];

//       if (usernameErrorCodes.includes(error.code)) {
//         response.push({
//           type: 'username',
//           message: error.message,
//         });
//       }

//       if (emailErrorCodes.includes(error.code)) {
//         response.push({
//           type: 'email',
//           message: error.message,
//         });
//       }

//       if (passwordErrorCodes.includes(error.code)) {
//         response.push({
//           type: 'password',
//           message: error.message,
//         });
//       }

//       if (error.code === 'auth/invalid-api-key') {
//         dispatch(showMessage({ message: error.message }));
//       }

//       return dispatch(registerError(response));
//     });
// };

const initialState = {
  success: null,
  errors: [],
  errorsResponse: null,
  fileName: null,
  fileContent: null,
};

const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setErrorsReponse: (state, action) => {
      state.errorsResponse = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setFileContent: (state, action) => {
      state.fileContent = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  registerSuccess,
  registerError,
  setSuccess,
  setErrorsReponse,
  setFileContent,
  setFileName,
} = registerSlice.actions;

export default registerSlice.reducer;
