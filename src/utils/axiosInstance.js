import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 5000,
  timeoutErrorMessage:
    'Request Timeout. Please try after sometime',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('@token');
    if (token) {
      const jsonToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${jsonToken.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.data) {
      return Promise.reject(
        new Error(error?.response?.data),
      );
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
