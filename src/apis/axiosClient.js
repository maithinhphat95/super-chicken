import axios from "axios";

export const BASE_URL = "http://localhost:8000";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
