/* eslint-disable camelcase */
import axios from 'axios';
import url from 'src/axios/url';
import history from '@history';
import http from './ClassAxios';

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_AXIOS_API,
      timeout: 10000,
    });
    this.refreshTokenRequest = null;
    this.instance.interceptors.request.use(
      (config) => {
        const language = localStorage.getItem('language');

        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
          config.responseType = 'blob';

          config.headers['Accept-Language'] = language || 'EN';
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log('loi', error);
        if (error.response.status === 401 && error.response.data.constructor.name === 'Blob') {
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : refreshToken().finally(() => {
                this.refreshTokenRequest = null;
              });
          return this.refreshTokenRequest
            .then((access_token) => {
              error.response.config.Authorization = access_token;
              return this.instance(error.response.config);
            })
            .catch((refreshTokenerror) => {
              throw refreshTokenerror;
            });
        }
        return Promise.reject(error);
      }
    );
  }

  get(urlPass) {
    return this.instance.get(urlPass);
  }

  post(urlPass, body) {
    return this.instance.post(urlPass, body);
  }

  put(urlPass, body) {
    return this.instance.put(urlPass, body);
  }

  delete(urlPass, body) {
    return this.instance.delete(urlPass, body);
  }
}

const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');

  try {
    const res = await http.post(url.refresh, {
      idRefreshToken: refresh_token,
    });
    console.log('res', res);
    const { access_token } = res.data;
    localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    localStorage.clear();
    history.push('/login');
    throw error.response;
  }
};

const httpExport = new Http();

export default httpExport;
