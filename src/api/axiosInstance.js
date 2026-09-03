// import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;
//     if (status === 401) {
//       // clear token
//       localStorage.removeItem("token");
//       // redirect to login
//       window.location.href = "/login";  
//     }
//     return Promise.reject(error);
//   }
// );
// export default axiosInstance;
import axios from "axios";


// Safe redirect function (prevents redirect loop)
const redirectToLogin = () => {
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------
// 🔹 REQUEST INTERCEPTOR
// ------------------------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------------------
// 🔹 RESPONSE INTERCEPTOR
// ------------------------------
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Remove token
      localStorage.removeItem("token");

      // Redirect
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;



