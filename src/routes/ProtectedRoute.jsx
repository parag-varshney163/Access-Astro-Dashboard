import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import axiosInstance from "../api/axiosInstance";
import ROUTES from "../constants/Routes";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const isValid =
    token &&
    token !== "undefined" &&
    token !== "null" &&
    token.trim() !== "";

  if (!isValid) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axiosInstance.get("/api/v1/admin/check-session");

        const isActive = res.data?.data?.active;

        if (!isActive) {
          localStorage.clear();
          window.location.href = ROUTES.LOGIN;
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          window.location.href = ROUTES.LOGIN;
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return children;
};

export default ProtectedRoute;
