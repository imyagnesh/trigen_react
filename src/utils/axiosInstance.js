import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 5000,
  timeoutErrorMessage:
    'Request Timeout. Please try after sometime',
});

export default axiosInstance;
