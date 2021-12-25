import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken } from './cookies';

const environment = process.env.NODE_ENV;

const requests = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // baseURL: 'https://shareshell.test/api/',
  baseURL: 'https://shareshell-api.herokuapp.com/api/',
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

      Swal(
        {
          title: 'Session Expired',
          text: 'Your session has expired. Would you like to be redirected to the login page?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes',
          closeOnConfirm: false,
        },
        function () {
          window.location = '/login';
        }
      );
    } else {
      return Promise.reject(error);
    }
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
