import axios from "axios";


const API = axios.create({
  baseURL: "http://ec2-52-66-53-59.ap-south-1.compute.amazonaws.com/",
  // baseURL: "http://localhost:1000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});
export default API;
