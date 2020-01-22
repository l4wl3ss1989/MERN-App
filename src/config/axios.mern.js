import axios from 'axios';

import { REACT_APP_API_BASE_URL } from './config';

const instance = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  timeout: 30000 //default 0
});

export default instance;
