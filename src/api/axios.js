import axios from "axios";

export default axios.create({
 // baseURL: "http://localhost:3000/api",
 baseURL:`${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
