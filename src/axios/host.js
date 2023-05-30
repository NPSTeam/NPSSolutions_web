import axios from 'axios';

export const HTTP_AUTH = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_AUTH,
});

export const HTTP_HUB = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_HUB,
});

export default { HTTP_AUTH, HTTP_HUB };
