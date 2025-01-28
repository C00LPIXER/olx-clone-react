import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user) {
      navigate("/");
    }
  }, [user.user, navigate]);

  return user.user ? children : null;
};

export default ProtectedRoute;
