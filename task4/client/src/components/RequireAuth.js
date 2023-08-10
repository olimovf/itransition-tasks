import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ component: Component }) => {
  const { auth } = useAuth();

  return auth?.email ? (
    <Component currUser={auth?.email} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
