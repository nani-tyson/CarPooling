import React, { useEffect } from "react";
import RiderLayout from "../layouts/RiderLayout";
import RideSearch from "../components/RideSearch";

const RiderDashboard = () => {
  useEffect(() => {
    const userData = localStorage.getItem("current_user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'rider') {
        console.log("Rider User:", user);
      } else {
        console.log("Not a rider account");
      }
    }
  }, []);

  return (
    <RiderLayout>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Search Available Rides</h2>
      <RideSearch />
    </RiderLayout>
  );
};

export default RiderDashboard;
