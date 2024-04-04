import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <h1>Loading....</h1>;
  } else if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;
