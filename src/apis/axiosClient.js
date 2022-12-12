import axios from "axios";

export const BASE_URL = "http://localhost:8000";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosClient.interceptors.request.use(async (config) => {
//   // Handle token...
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     // Handle error...
//     throw error;
//   }
// );

export default axiosClient;
