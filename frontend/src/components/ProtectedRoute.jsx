import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";

const ProtectedRoute = ({ allowedRole, children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setChecking(false);
      }
    };
    checkUser();
  }, []);

  if (checking) return <p className="p-6">Checking access...</p>;

  if (!user) return <Navigate to="/login" />;

  if (allowedRole === "driver" && !user.isDriver) return <Navigate to="/rider" />;
  if (allowedRole === "rider" && user.isDriver) return <Navigate to="/driver" />;

  return children;
};

export default ProtectedRoute;
