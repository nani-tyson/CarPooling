import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      // Clear both driver and rider user data
      localStorage.removeItem("user_driver");
      localStorage.removeItem("user_rider");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
