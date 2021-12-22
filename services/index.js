import axios from 'axios';

const environment = process.env.NODE_ENV;

const requests = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // baseURL: 'https://shareshell.test/api/',
  baseURL: 'https://shareshell-api.herokuapp.com/api/',
});

export default requests;

// export const useAxiosInterceptors = () => {
//   api.interceptors.request.use(
//     function (config) {
//       config.headers = {
//         ...config.headers,
//       };

//       let visitorID = localStorage.getItem("visitor_id");
//       const token = getToken();
//       if (visitorID) {
//         config.headers["Visitor-ID"] = visitorID;
//       }

//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }

//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );
// };
