import axios from 'axios';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
    //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY5NGQ1ZmI3MDQxNDFkODlhMTk3NDgiLCJpYXQiOjE3Mjc2MzUwMzEsImV4cCI6MTcyNzg5NDIzMX0.CgqDPHUnj-DmAXQ5VyJb7DRcfWNXRw7PTbpJlk1HAmI'
  },
});

//Add a request interceptor to include the Authorization token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

    // If a token is found, include it in the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Ensure the Content-Type header is set
    config.headers['Content-Type'] = 'application/json';

    console.log('Request headers:', config.headers); // Logs the headers before the request is made

    return config;
  },
  (error) => {
    // Handle any errors in the request
    return Promise.reject(error);
  }
);

// Make a sample request using `axiosInstance` to verify headers
axiosInstance.get('/some-endpoint') // Replace with your API endpoint
  .then(response => {
    console.log('Response headers:', response.headers); // Logs the response headers
  })
  .catch(error => {
    console.error('Error fetching headers:', error);
  });

export default axiosInstance;
