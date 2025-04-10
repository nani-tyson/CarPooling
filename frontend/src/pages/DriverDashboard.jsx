import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DriverLayout from "../layouts/DriverLayout";
import MyCreatedRides from "../components/MyCreatedRides";

const DriverDashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.refreshRides) {
      setRefreshTrigger(prev => prev + 1);
      // Clear the state to prevent unnecessary refreshes
      window.history.replaceState({}, document.title);
    }
    const userData = localStorage.getItem("current_user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'driver') {
        console.log("Driver User:", user);
      } else {
        console.log("Not a driver account");
      }
    }
  }, []);

  const handleRideCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DriverLayout>
      <h2 className="text-xl font-bold mb-4">Your Rides</h2>
      <MyCreatedRides refreshTrigger={refreshTrigger} />
    </DriverLayout>
  );
};

export default DriverDashboard;
