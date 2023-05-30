import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
/* eslint-disable camelcase */
import jwtDecode from 'jwt-decode';
import http from 'src/axios/ClassAxios';
import { HTTP_AUTH } from 'src/axios/host';
import url from 'src/axios/url';

class JwtServiceCustom extends FuseUtils.EventEmitter {
  init() {
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    const access_token = this.getBothToken().accessToken;
    const refresh_token = this.getBothToken().refreshToken;
    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    // console.log('thisthis', this.isAuthTokenValid(access_token));
    if (this?.isAuthTokenValid(access_token)) {
      // this.setSession(access_token, refresh_token);
      this.emit('onAutoLogin', true);
    } else {
      // this.setSession(null, null);
      this.emit('onAutoLogin', true);

      // this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  middlewareSetUser = async (response, type) => {
    return new Promise((resolve, reject) => {
      // this.setSession(response.data.data.access_token, response.data.data.refresh_token);

      // const user = { ...response.data.data.user };
      // resolve(user);

      // this.setSession(response.data.access_token, response.data.refresh_token);

      const user = { ...response };
      resolve(user);
    });
  };

  signInWithEmailAndPassword = (username, password, rememberMe) => {
    return new Promise((resolve, reject) => {
      http
        .post(url.login, {
          username,
          password,
          rememberMe,
        })
        .then((res) => {
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          resolve(this.middlewareSetUser(res.data.user));
          this.emit('onLogin', res.data.user);
        })
        .catch((err) => {
          console.log(err);
          if (err && err.response && err.response.data && err.response.data.errors)
            // reject(FuseUtils.convertError(err.response.data.errors[0].message));
            reject(err.response.data.errors[0].message);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      http
        .get(url.profile, {
          headers: {
            Authorization: `Bearer ${this.getBothToken().accessToken}`,
          },
        })
        .then((response) => {
          resolve(this.middlewareSetUser(response.data));
          const language = localStorage.getItem('language');
          if (language) {
            localStorage.setItem('language', 'EN');
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = (access, refresh) => {
    if (access && refresh) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      HTTP_AUTH.defaults.headers.common.Authorization = `Bearer ${access}`;
      // HTTP_HUB.defaults.headers.common.Authorization = `Bearer ${access}`;

      axios.defaults.headers.common.Authorization = `Bearer ${access}`;
    } else {
      console.log('REMOVE');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      delete HTTP_AUTH.defaults.headers.common.Authorization;
      // delete HTTP_HUB.defaults.headers.common.Authorization;

      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null, null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getBothToken = () => {
    if (process.env.REACT_APP_DEVELOPER)
      console.log('ACCESS TOKEN', window?.localStorage?.getItem('access_token'));
    return {
      refreshToken: window.localStorage.getItem('refresh_token'),
      accessToken: window.localStorage.getItem('access_token'),
    };
  };
}

const instance = new JwtServiceCustom();

export default instance;
