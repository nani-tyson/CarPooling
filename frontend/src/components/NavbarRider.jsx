import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LogoutButton from "./LogoutButton";

const NavbarRider = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_rider");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.isDriver) {
        setUser(userData);
      } else {
        localStorage.removeItem("user_rider");
        setUser(null);
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/rider" className="text-xl font-bold">CoDrive Rider</Link>
      <div className="flex items-center gap-4">
        <Link to="/rider" className="hover:underline">Dashboard</Link>
        <Link to="/rider/requests" className="hover:underline">My Requests</Link>
        {user && <span className="text-sm">Hi, {user.name}</span>}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavbarRider;
