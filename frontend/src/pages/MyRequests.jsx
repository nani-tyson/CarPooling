import React from "react";
import RiderLayout from "../layouts/RiderLayout";

const MyRequests = () => {
  return (
    <RiderLayout>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Your Ride Requests</h2>
      <p className="text-gray-500">🛠 Coming soon: view pending, approved, or rejected ride requests.</p>
    </RiderLayout>
  );
};

export default MyRequests;
