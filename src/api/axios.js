import axios from "axios";

const axiosWithCredentials = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default axiosWithCredentials;