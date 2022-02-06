import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});
export default API;
