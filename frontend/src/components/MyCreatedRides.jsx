import React, { useEffect, useState } from "react";
import api from "../api/axios";

const MyCreatedRides = ({ refreshTrigger }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRides = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/rides/driver");
      
      if (!res.data?.rides) {
        throw new Error("Invalid response format");
      }
      
      setRides(res.data.rides);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
      let errorMsg = "Failed to load rides";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMsg = "Please login again";
        } else if (err.response.data?.message) {
          errorMsg = err.response.data.message;
        }
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [refreshTrigger]);

  if (loading) {
    return <div className="text-center py-4">Loading rides...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
        <button 
          onClick={fetchRides}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rides.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          You haven't created any rides yet
        </div>
      ) : (
        rides.map(ride => (
          <div key={ride._id} className="border p-4 rounded shadow bg-gray-100">
            <h3 className="text-lg font-bold">{ride.pickupLocation} ➜ {ride.dropLocation}</h3>
            <p>Time: {new Date(ride.departureDateTime).toLocaleString()}</p>
            <p>Seats: {ride.availableSeats}/{ride.totalSeats}</p>
            <p>Vehicle: {ride.vehicleDetails?.carModel}</p>
            <p>Requests: {ride.joinRequests?.length || 0}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default MyCreatedRides;
