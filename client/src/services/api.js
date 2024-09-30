import axios from 'axios';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
    //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY5NGQ1ZmI3MDQxNDFkODlhMTk3NDgiLCJpYXQiOjE3Mjc3MDU3ODksImV4cCI6MTcyNzk2NDk4OX0.kM1IFEQ1VHqeOzwP9Btjy9luj0ppnq1CmRmAaoZBB50'
}
});

export default axiosInstance;
