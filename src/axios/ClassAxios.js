/* eslint-disable camelcase */
/* eslint-disable camelcase */
import axios from 'axios';
import url from 'src/axios/url';
import history from '@history';

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_AXIOS_API,
      timeout: 30000,
    });
    this.refreshTokenRequest = null;
    this.instance.interceptors.request.use(
      (config) => {
        const access_token = localStorage.getItem('access_token');
        const access_scrum = localStorage.getItem('access_scrum');
        const language = localStorage.getItem('language');

        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
          // eslint-disable-next-line dot-notation
          config.headers['AccessScrum'] = `${access_scrum}`;
          config.headers['Accept-Language'] = language || 'EN';
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.instance.interceptors.response.use(
      (config) => config.data,
      (error) => {
        console.log('loi', error);
        if (
          error.response.status === 401 &&
          error.response.data.errors &&
          error.response.data.errors[0].code === '4010006'
        ) {
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

  get(urlPass, body) {
    return this.instance.get(urlPass, body);
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
    const { access_token } = res.data;
    localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    localStorage.clear();
    history.push('/login');
    throw error.response;
  }
};

const http = new Http();

export default http;

// import axios from 'axios';
// import url from 'src/axios/url';
// import history from '@history';

// const http = () => {
//   const instance = axios.create({
//     baseURL: process.env.REACT_APP_AXIOS_API,
//     timeout: 10000,
//   });

//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refresh_token');

//     try {
//       const response = await instance.post(url.refresh, {
//         idRefreshToken: refreshToken,
//       });
//       const { access_token } = response.data;
//       localStorage.setItem('access_token', access_token);
//       return access_token;
//     } catch (error) {
//       localStorage.clear();
//       history.push('/login');
//       throw error.response;
//     }
//   };

//   instance.interceptors.request.use(
//     (config) => {
//       const language = localStorage.getItem('language');
//       const accessToken = localStorage.getItem('access_token');
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         config.headers['Accept-Language'] = language || 'EN';
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   instance.interceptors.response.use(
//     (response) => response.data,
//     (error) => {
//       console.log('loi', error);
//       if (
//         error.response.status === 401 &&
//         error.response.data.errors &&
//         error.response.data.errors[0].code === '4010006'
//       ) {
//         return refreshAccessToken()
//           .then((access_token) => {
//             error.response.config.headers.Authorization = `Bearer ${access_token}`;
//             return instance(error.response.config);
//           })
//           .catch((refreshTokenerror) => {
//             throw refreshTokenerror;
//           });
//       }
//       return Promise.reject(error);
//     }
//   );

//   return {
//     get: (urlPass, body) => instance.get(urlPass, body),
//     post: (urlPass, body) => instance.post(urlPass, body),
//     put: (urlPass, body) => instance.put(urlPass, body),
//     delete: (urlPass, body) => instance.delete(urlPass, body),
//   };
// };

// export default http();
