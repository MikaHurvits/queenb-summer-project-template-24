import axios from 'axios';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
    //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY5NGQ1ZmI3MDQxNDFkODlhMTk3NDgiLCJpYXQiOjE3Mjc2MzUwMzEsImV4cCI6MTcyNzg5NDIzMX0.CgqDPHUnj-DmAXQ5VyJb7DRcfWNXRw7PTbpJlk1HAmI'
  },
});

export default axiosInstance;
