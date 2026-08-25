import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { token } = useContext(AuthContext);

  // If NOT logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If logged in
  return children;
};

export default ProtectedRoute;