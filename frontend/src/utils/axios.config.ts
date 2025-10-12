import axios from "axios";
import { baseUrl } from "./constant";

const serverUrl = baseUrl;

//basic axios instance
const axiosInstance = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // currently this is empty
    return config;
  },
  (error : unknown) => {
     if (error instanceof Error) {
      console.log("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: unknown) => {
    console.log("Error caught in Interceptor : ", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          console.log("Server Error:", error.response.data);
          console.log("Status:", error.response.status);

          // You can handle specific status codes here
          if (error.response.status === 401) {
            // Redirect to login
            window.location.href = "/login";
          }

          // Throw a custom error message
          const errorMessage =
            error.response.data?.message ||
            `Server error: ${error.response.status}`;
          return Promise.reject(new Error(errorMessage));
        } else if (error.request) {
          // Request was made but no response
          console.log("Network Error:", error.message);
          return Promise.reject(
            new Error("Network error. Please check your connection.")
          );
        }
        
        else {
          // Something else happened
          console.log("Error:", error.message);
          return Promise.reject(new Error("An error occurred"));
        }
      }

          // if it's standard error
        else if( error instanceof Error){
          console.log("Standard Error:", error.message);
      return Promise.reject(error);
        }
        
      
       else {
        // Non-axios error
        console.log("Unknown Error:", error);
        return Promise.reject(new Error("An unexpected error occurred"));
      }
    
  }
);

export default axiosInstance