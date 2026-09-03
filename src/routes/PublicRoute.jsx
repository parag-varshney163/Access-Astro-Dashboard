import { Navigate } from "react-router-dom";
import React from "react";

import ROUTES from "../constants/Routes";


const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const isValid =
    token &&
    token !== "undefined" &&
    token !== "null" &&
    token.trim() !== "";

  return isValid ? <Navigate to={ROUTES.DASHBOARD} replace /> : children;
};

export default PublicRoute;
