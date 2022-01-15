import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from './cookies';

const environment = process.env.NODE_ENV;

const requests = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // baseURL: 'https://shareshell.test/api/',
  // baseURL: 'http://64.227.9.209/api/',
  baseURL: 'http://127.0.0.1:8000/api/',
});

requests.interceptors.response.use(
  function (response) {
    // console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      window.localStorage.removeItem('user-data');
      return window.location.replace('/login');
      // Swal.fire({
      //   title: 'Session Expired',
      //   text: 'Your session has expired. Would you like to be redirected to the login page?',
      //   type: 'warning',
      //   confirmButtonColor: '#A55954',
      //   confirmButtonText: 'Yes',
      //   closeOnConfirm: false,
      // }).then((result) => {
      //   if (result.dismiss !== 'cancel') {
      //     window.localStorage.removeItem('user-data');
      //     return window.location.replace('/login');
      //   }
      // });
    } else if (400 === error.response.status) {
      Swal.fire({
        title: 'Bad Request',
        text: error.response.data.message,
        type: 'error',
        timerProgressBar: true,
        timer: 2000,
        allowOutsideClick: true,
        showConfirmButton: false,
      });
    } else {
      return Promise.reject(error.response);
    }
  }
);

requests.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
    };

    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default requests;

export const useAxiosInterceptors = () => {
  requests.interceptors.request.use(
    function (config) {
      config.headers = {
        ...config.headers,
      };

      const token = getToken();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export const _protectedRequest = async (url) => {
  useAxiosInterceptors();
  const res = await requests.get(url);
  return res.data;
};
