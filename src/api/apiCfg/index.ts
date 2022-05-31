import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || process.env.REACT_APP_BACK_REMOTE_URL, // if u run local backend process.env.REACT_APP_BACK_LOCAL_URL
  withCredentials: true,
});
