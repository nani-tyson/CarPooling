import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import LogoutButton from "./LogoutButton";

const NavbarDriver = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_driver");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.isDriver) {
        setUser(userData);
      } else {
        localStorage.removeItem("user_driver");
        setUser(null);
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/driver")}>
        CoDrive Driver
      </h1>

      <div className="flex items-center gap-4">
        <Link to="/driver" className="hover:underline">Dashboard</Link>
        <Link to="/driver/create" className="hover:underline">Create Ride</Link>
        {user && <span className="text-sm font-medium text-white">Hi, {user.name}</span>}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default NavbarDriver;
